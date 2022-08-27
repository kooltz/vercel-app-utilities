import { Client } from "@notionhq/client";

const notion = new Client({
  auth: process.env.NOTION_KEY,
});

export default async function handler(req, res) {
  const { page_id } = req.query;

  try {
    const response = await notion.pages.retrieve({
      page_id: page_id,
    });
    res.status(200).send(response);
  } catch (error) {
    res.status(500).send(error);
  }
}
