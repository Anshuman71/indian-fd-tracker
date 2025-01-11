"use client";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Interest } from "@/utils/types";
import clsx from "clsx";
import { useSearchParams, useRouter } from "next/navigation";

export default function BankInterestRates({
  bankData,
}: {
  bankData: { name: string; key: string; url: string; interest: Interest }[];
}) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const selectedBank = searchParams.get("bank") || bankData[0].key;
  const handleBankChange = (value: string) => {
    const selected = bankData.find((bank) => bank.key === value)?.key;
    if (selected) {
      router.push(`?bank=${value}`, { scroll: false });
    }
  };

  const interestObject = bankData.find(
    (bank) => bank.key === selectedBank
  )?.interest;

  const tableFormat = Object.keys(interestObject || {});

  return (
    <div>
      <div className="mb-4">
        <Select value={selectedBank} onValueChange={handleBankChange}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Select a bank" />
          </SelectTrigger>
          <SelectContent>
            {bankData.map((bank) => (
              <SelectItem key={bank.key} value={bank.key}>
                {bank.name}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
      <Table>
        <TableHeader>
          <TableRow className="bg-muted">
            <TableHead>Period (in days)</TableHead>
            <TableHead>Senior Citizen Interest</TableHead>
            <TableHead>Normal Citizen Interest</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {interestObject &&
            tableFormat.map((period) => (
              <TableRow key={period}>
                <TableCell>{period}</TableCell>
                <InterestCell value={interestObject[period].senior} />
                <InterestCell value={interestObject[period].normal} />
              </TableRow>
            ))}
        </TableBody>
      </Table>
    </div>
  );
}

function InterestCell({ value }: { value: string }) {
  return (
    <TableCell
      className={clsx({
        "font-bold": Number(value) >= 7,
      })}
    >
      {value}%
    </TableCell>
  );
}
