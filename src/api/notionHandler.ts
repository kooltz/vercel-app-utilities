import { iconButtonClasses } from "@mui/material";
import axios from "axios";

const PAGE_CACHE_MAP: any = {};

export async function getPage(pageId: string) {
  const response = await axios.get("/api/notion/pages", {
    params: {
      page_id: pageId,
    },
  });

  if (response.status !== 200) {
    return "ERROR";
  }

  return response.data;
}

export async function getProperty(pageId: string, propertyId: string) {
  const response = await axios.get("/api/notion/properties", {
    params: {
      page_id: pageId,
      property_id: propertyId,
    },
  });

  if (response.status !== 200) {
    return "ERROR";
  }

  const { data } = response;
  if (data.object === "property_item") {
    return data[data["type"]];
  } else if (data.object === "list") {
    const { results } = data;

    if (results.length > 0) {
      const first = results[0];

      if (first.object === "property_item") {
        const value = first[first["type"]];

        if (first.type === "relation") {
          return value.id;
        } else if (first.type === "rich_text") {
          return value.text.content;
        } else if (first.type === "title") {
          return data;
        }
      }
    }
  }
  return "";
}

export async function getPages(name: string) {
  const response = await axios.get("/api/notion/page-title", {
    params: {
      title: name,
    },
  });

  const queryResults = response.data.results || [];

  const pageQueries = queryResults.map((result: any) => {
    const { id, icon } = result;
    const emoji = icon && icon.emoji ? icon.emoji : "";

    if (PAGE_CACHE_MAP[id]) {
      return new Promise((resolve) => {
        resolve(PAGE_CACHE_MAP[id]);
      });
    }

    return new Promise((resolve, reject) => {
      getProperty(id, "title").then(({ results: [first] }) => {
        const {
          title: { plain_text },
        } = first;

        const obj = {
          id: id,
          title: plain_text,
          emoji: emoji,
        };
        PAGE_CACHE_MAP[id] = obj;
        resolve(obj);
      });
    });
  });

  const pages = await Promise.all(pageQueries);

  return pages;
}
