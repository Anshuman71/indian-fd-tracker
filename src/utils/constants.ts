import { canaraBank, hdfcBank } from "./fns";

export const REDIS_KEYS = {
  interest: `interest-`,
  lastModified: `last-modified-at`,
  lastCrawled: `last-crawled-at`,
};

export const BANKS = [
  {
    key: "canara",
    name: "Canara Bank",
    url: "https://canarabank.com/pages/deposit-interest-rates",
    fn: canaraBank,
  },
  {
    key: "hdfc",
    name: "HDFC Bank",
    url: "https://www.hdfcbank.com/personal/resources/rates",
    fn: hdfcBank,
  },
];
