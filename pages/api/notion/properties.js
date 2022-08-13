const { Client } = require("@notionhq/client");

const notion = new Client({
  auth: process.env.NOTION_KEY,
});

export default async function handler(req, res) {
  const { page_id, property_id } = req.query;

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
