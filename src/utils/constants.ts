import { canaraBank, hdfcBank } from "./fns";

export const BANKS = [
  {
    key: "canara",
    value: "Canara Bank",
    url: "https://canarabank.com/pages/deposit-interest-rates",
    fn: canaraBank,
  },
  {
    key: "hdfc",
    value: "HDFC Bank",
    url: "https://www.hdfcbank.com/personal/resources/rates",
    fn: hdfcBank,
  },
];
