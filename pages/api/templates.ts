import type { NextApiRequest, NextApiResponse } from "next";

const templates = [
  { id: 1, name: "Greeting", prompt: "Say hello to the user." },
  { id: 2, name: "Summary", prompt: "Summarize the following text:" },
];

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  res.status(200).json(templates);
}
