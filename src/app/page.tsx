import BankInterestRates from "@/components/InterestTable";
import { getInterestRatesAll } from "@/utils/upstash";
import { Metadata } from "next";
import { Suspense } from "react";

export const metadata: Metadata = {
  title: "Indian FD Interest Tracker",
  description: "Compare fixed deposit interest rates of various banks",
};

export default async function HomePage() {
  const data = await getInterestRatesAll();

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Bank Interest Rates</h1>
      <Suspense>
        <BankInterestRates bankData={data} />
      </Suspense>
    </div>
  );
}
