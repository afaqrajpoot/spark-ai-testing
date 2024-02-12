// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";

// pages/api/googleSearchQueryHTML.js

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { googleSearchQuery } = req.query;
  console.log(googleSearchQuery);
  if (!googleSearchQuery || Array.isArray(googleSearchQuery)) {
    return res
      .status(400)
      .json({ error: "Missing or invalid googleSearchQuery parameter" });
  }

  try {
    const googleHtml = await fetch(
      "https://www.google.com/search?q=" + encodeURIComponent(googleSearchQuery)
    );
    const googleHtmlText = await googleHtml.text();
    return res.status(200).json({ html: googleHtmlText });
  } catch (error) {
    return res
      .status(500)
      .json({ error: "Failed to fetch Google search results" });
  }
}
