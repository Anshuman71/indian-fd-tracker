import BankInterestRates from "@/components/InterestTable";
import { getInterestRatesAll } from "@/utils/upstash";

export default async function HomePage() {
  const data = await getInterestRatesAll();

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Bank Interest Rates</h1>
      <BankInterestRates bankData={data} />
    </div>
  );
}
