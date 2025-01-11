import { BANKS, REDIS_KEYS } from "@/utils/constants";
import { formatInterest } from "@/utils/fns";
import { redis, setInterestRates } from "@/utils/upstash";
import * as cheerio from "cheerio";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  const secret = request.headers.get("secret");

  console.log({ Secret: request.headers.has("Secret") });
  console.log({ secret: request.headers.has("secret") });

  if (secret !== process.env.CRON_SECRET) {
    console.log("=====Invalid secret=====");
    return new Response("Invalid secret", {
      status: 200,
    });
  }

  await redis.set(REDIS_KEYS.lastCrawled, new Date().toISOString());

  const crawledList = BANKS.map(async (bank) => {
    const data = await fetch(bank.url);
    const html = await data.text();

    const $ = cheerio.load(html);
    const interests = bank.fn($);

    const formattedInterest = await formatInterest(interests);

    const key = REDIS_KEYS.interest + bank.key;
    await setInterestRates(key, formattedInterest);

    return { bank, interests: formattedInterest };
  });

  const results = await Promise.allSettled(crawledList);

  let success = 0;
  results.map((result) => {
    if (result.status === "fulfilled") {
      success++;
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
