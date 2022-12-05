import Head from "next/head";
import { useState } from "react";
import { Circles } from "react-loader-spinner";

export default function Home() {
  const [loading, setLoading] = useState(false);
  const [goalInput, setgoalInput] = useState("");
  const [seed, setSeed] = useState(0.75);

  const [result, setResult] = useState();

  async function onSubmit(event) {
    event.preventDefault();
    setLoading(true);
    const response = await fetch("/api/generate", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ goalInput, seed }),
    });
    const data = await response.json();
    setLoading(false);
    setResult(data.result);
  }

  const handleKeyDown = (event) => {
    if (!event.shiftKey && event.key === "Enter") {
      event.preventDefault();
      onSubmit(event);
    }
  };

  const tryAnother = (event) => {
    setSeed(Math.min(seed + 0.01, 1.0));
    onSubmit(event);
  };

  return (
    <div>
      <Head>
        <title>Tu meta SMART</title>
        <meta name="description" content="Mejora tu meta SMART con ayuda de un software de inteligencia artificial."/>
        <meta name="author" content="Jose Quilca <jose.quilca@pucp.edu.pe"/>
        <meta name="viewport" content="width=device-width, initial-scale=1.0"></meta>
        <link
          rel="icon"
          href="data:image/svg+xml,<svg xmlns=%22http://www.w3.org/2000/svg%22 viewBox=%220 0 100 100%22><text y=%22.9em%22 font-size=%2290%22>🎯</text></svg>"
        />
        <meta property="og:image" content="data:image/svg+xml,<svg xmlns=%22http://www.w3.org/2000/svg%22 viewBox=%220 0 100 100%22><text y=%22.9em%22 font-size=%2290%22>🎯</text></svg>"/>
      </Head>

      <main>
        <header>
          <div className="relative flex items-center justify-center px-4 pt-4 h-60">
            <h1 className="relative z-10 max-w-4xl mx-auto text-6xl font-black leading-none tracking-tight text-center mix-color-burn lg:leading-18 lg:text-7xl">
              <span className="text-8xl">🎯</span>
              <br />
              Tu meta SMART
            </h1>
          </div>
        </header>
        <div className="px-2 pb-4 text-xl">
          <form onSubmit={onSubmit}>
            <div className="flex max-w-xl p-1 mx-auto border border-black rounded-sm shadow focus-within:border-yellow">
              <textarea
                maxLength={120}
                rows={1}
                autoComplete="off"
                required="required"
                placeholder="Escribe tu meta"
                value={goalInput}
                onKeyDown={handleKeyDown}
                disabled={loading}
                onChange={(e) => setgoalInput(e.target.value)}
                className="flex-1 p-3 bg-transparent outline-none font-display max-h-20"
              />
              <button
                type="submit"
                name="send"
                disabled={loading}
                className="p-2 rounded-sm hover:bg-teal"
              >
                <svg width="14" height="10" xmlns="http://www.w3.org/2000/svg">
                  <path
                    d="M9.749 1.394l3 3a.857.857 0 010 1.212l-3 3a.857.857 0 01-1.212-1.212l1.17-1.17a.214.214 0 00-.151-.367H1.857a.857.857 0 010-1.714h7.699a.214.214 0 00.152-.366L8.537 2.606a.857.857 0 011.212-1.212z"
                    fill="#FFF"
                    fillRule="nonzero"
                    stroke="#191A1B"
                    strokeWidth=".857"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  ></path>
                </svg>
              </button>
            </div>
          </form>
        </div>
        {loading && (
          <div className="flex justify-center py-8">
            <Circles
              height="60"
              width="60"
              radius="5"
              color="black"
              ariaLabel="loading-indicator"
            />
          </div>
        )}
        {!loading && result && (
          <div className="relative max-w-xl px-2 pb-32 mx-auto mt-4 font-display">
            <div className="relative z-10 w-full p-8 text-black bg-white border border-black rounded-sm stack markdown">
              <p className="italic leading-6 whitespace-pre-line">{result}</p>
              {seed <= 1.0 && (
                <div className="pt-4 text-right">
                  <button
                    onClick={tryAnother}
                    className="text-lg font-bold text-black no-underline button"
                  >
                    Intentar otra opción
                  </button>
                </div>
              )}
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
