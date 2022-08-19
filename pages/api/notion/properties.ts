import type { NextApiRequest, NextApiResponse } from "next";
import { Client } from "@notionhq/client";

const notion = new Client({
  auth: process.env.NOTION_KEY,
});

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { page_id, property_id }: any = req.query;

  try {
    const response = await notion.pages.properties.retrieve({
      page_id: page_id,
      property_id: property_id,
    });
    res.status(200).send(response);
  } catch (error) {
    res.status(500).send(error);
  }
}
