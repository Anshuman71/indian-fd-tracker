export interface BankData {
  id: string;
  name: string;
  interestRates: {
    period: string;
    seniorCitizen: number;
    normalCitizen: number;
  }[];
}

export const bankData: BankData[] = [
  {
    id: "bank1",
    name: "ABC Bank",
    interestRates: [
      { period: "1 year", seniorCitizen: 5.5, normalCitizen: 5.0 },
      { period: "2 years", seniorCitizen: 6.0, normalCitizen: 5.5 },
      { period: "3 years", seniorCitizen: 6.5, normalCitizen: 6.0 },
    ],
  },
  {
    id: "bank2",
    name: "XYZ Bank",
    interestRates: [
      { period: "1 year", seniorCitizen: 5.7, normalCitizen: 5.2 },
      { period: "2 years", seniorCitizen: 6.2, normalCitizen: 5.7 },
      { period: "3 years", seniorCitizen: 6.7, normalCitizen: 6.2 },
    ],
  },
  {
    id: "bank3",
    name: "123 Bank",
    interestRates: [
      { period: "1 year", seniorCitizen: 5.6, normalCitizen: 5.1 },
      { period: "2 years", seniorCitizen: 6.1, normalCitizen: 5.6 },
      { period: "3 years", seniorCitizen: 6.6, normalCitizen: 6.1 },
    ],
  },
];

