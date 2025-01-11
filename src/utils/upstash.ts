import { Redis } from "@upstash/redis";
import { Interest } from "./types";

export const redis = new Redis({
  url: process.env.UPSTASH_REDIS_REST_URL,
  token: process.env.UPSTASH_REDIS_REST_TOKEN,
});

export async function setInterestRates(key: string, value: Interest) {
  await redis.set(key, JSON.stringify(value));
}

export async function getInterestRates(key: string) {
  const data = await redis.get(key);
  return data ? JSON.parse(String(data)) : null;
}
