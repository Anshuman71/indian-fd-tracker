import { Redis } from "@upstash/redis";
import { Interest } from "./types";
import { BANKS } from "./constants";
import { unstable_cache } from "next/cache";

export const redis = new Redis({
  url: process.env.UPSTASH_REDIS_REST_URL,
  token: process.env.UPSTASH_REDIS_REST_TOKEN,
});

export async function setInterestRates(key: string, value: Interest) {
  await redis.set(key, JSON.stringify(value));
}

export async function getInterestRates(key: string): Promise<Interest> {
  const data = await redis.get(key);
  return data as Interest;
}

export const getInterestRatesAll = unstable_cache(
  async function () {
    const results = await Promise.all(
      BANKS.map(async (bank) => ({
        key: bank.key,
        name: bank.name,
        url: bank.url,
        interest: await getInterestRates(`interest-${bank.key}`),
      }))
    );
    return results;
  },
  ["all-interests"],
  { revalidate: 3600, tags: ["all-interests"] }
);
