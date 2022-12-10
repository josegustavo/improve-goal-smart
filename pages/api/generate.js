import { Configuration, OpenAIApi } from "openai";

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);

export default async function (req, res) {
  const prompt = generatePrompt(req.body.goalInput)
  const completion = await openai.createCompletion({
    model: "text-davinci-003",
    prompt: prompt,
    temperature: req.body.seed || 0.77,
    max_tokens: 512,
    top_p: 1,
    frequency_penalty: 0,
    presence_penalty: 0,
  });
  console.log([prompt, req.body.seed, completion.data.choices, completion.data])
  res.status(200).json({ result: completion.data.choices[0].text });
}

function generatePrompt(goalInput) {
  const sanitizedGoalInput = goalInput;
  return `Redactar una meta SMART con propósito y detallar los pasos para lograrlo: ${sanitizedGoalInput}\n`;
}
