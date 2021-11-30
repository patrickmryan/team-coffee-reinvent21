// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";

type Savings = {
  kwhPerM2PerDay: number;
  co2eqSavedPerYearPerM2: number;
  costsSavedPerYearPerM2: number;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Savings>
) {
  const address = req.query?.address || "4816%20norbeck%20rd%20rockville%20md";
  const result = await fetch(
    `https://8q8cmfcev5.execute-api.us-east-1.amazonaws.com/lambda?address=${address}`,
    {
      mode: "no-cors",
    }
  );
  const json = (await result.json()) as Savings;
  res.json(json);
}
