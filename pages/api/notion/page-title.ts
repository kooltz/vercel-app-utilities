import type { NextApiRequest, NextApiResponse } from "next";
import { Client } from "@notionhq/client";

const notion = new Client({
  auth: process.env.NOTION_KEY,
});
const DATABASE_ID: any = process.env.NOTION_POSHOOT_DATABASE_ID;

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { title }: any = req.query;

  try {
    const response = await notion.databases.query({
      database_id: DATABASE_ID,
      filter: {
        and: [
          {
            property: "title",
            rich_text: {
              contains: title,
            },
          },
        ],
      },
    });
    res.status(200).send(response);
  } catch (error) {
    res.status(500).send(error);
  }
}
