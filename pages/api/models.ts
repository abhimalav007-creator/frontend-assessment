import type { NextApiRequest, NextApiResponse } from "next";

export default function handler(req:NextApiRequest,res:NextApiResponse){
  const models = [
    {id:"gpt-3.5", name:"GPT-3.5"},
    {id:"gpt-4", name:"GPT-4"},
    {id:"custom", name:"Custom Model"}
  ];
  res.status(200).json(models);
}
