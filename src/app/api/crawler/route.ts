import { BANKS } from "@/utils/constants";
import { formatInterest } from "@/utils/fns";
import * as cheerio from "cheerio";
import { NextResponse } from "next/server";

export async function GET() {
  const crawledList = BANKS.map(async (bank) => {
    const data = await fetch(bank.url);
    const html = await data.text();
    const $ = cheerio.load(html);
    const interests = bank.fn($);
    const formattedInterest = await formatInterest(interests);
    return { bank, interests: formattedInterest };
  });

  const results = await Promise.allSettled(crawledList);

  let success = 0;
  results.map((result) => {
    if (result.status === "fulfilled") {
      success++;
      // write to database
      console.log(result.value);
      return result.value;
    }
    if (result.status === "rejected") {
      // notify admin that crawling didn't work
      return result.reason;
    }
  });

  return NextResponse.json(
    {
      success,
      total: BANKS.length,
      failed: BANKS.length - success,
    },
    { status: 200 }
  );
}
