import { CheerioAPI } from "cheerio";
import { Interest } from "@/utils/types";

import { generateText } from "ai";
import { openai } from "@ai-sdk/openai";

export async function formatDays(days: string) {
  const { text, usage } = await generateText({
    model: openai("gpt-4o-mini-2024-07-18"),
    prompt: `Convert the following input text to number of days based on the higher value in the range. Only return the number of days as the final output without any other text around it.

    For example,
    Input: 30 - 45 days
    Output: 45

    Input: 270 Days to less than 1 Year
    Output: 364
    
    Input: 1 year to < 15 months
    Output: 455
    
    Input: 1 Year Only
    Output: 365
    
    Input: 21 months - 2 years
    Output: 730

    Input: ${days}`,
  });
  console.log({ usage });
  return text;
}

export function sanitizeText(text: string) {
  return text.trim().replace(/\s+/g, " ");
}

export async function formatInterest(interest: Interest) {
  const formattedInterest: Interest = {};
  const allKeys = Object.keys(interest);
  const formattedDays = await Promise.all(
    allKeys.map(async (key) => await formatDays(key))
  );
  allKeys.forEach((key, index) => {
    formattedInterest[formattedDays[index]] = { ...interest[key] };
  });
  return formattedInterest;
}

// Banks

export function canaraBank($: CheerioAPI) {
  const interests: Interest = {};
  const rows = $("table").eq(1).find("tr").slice(6).slice(0, -1); // remove last row
  rows.each((_, element) => {
    const tds = $(element).find("td").slice(0, 5);
    interests[sanitizeText(tds.eq(0).text())] = {
      normal: sanitizeText(tds.eq(1).text()),
      senior: sanitizeText(tds.eq(3).text()),
    };
  });

  return interests;
}

export function hdfcBank($: CheerioAPI) {
  const interests: Interest = {};
  const rows = $("table").eq(0).find("tr").slice(2); // remove last row
  rows.each((_, element) => {
    const tds = $(element).find("td");
    interests[sanitizeText(tds.eq(0).text())] = {
      normal: sanitizeText(tds.eq(1).text()),
      senior: sanitizeText(tds.eq(2).text()),
    };
  });

  return interests;
}
