import React from "react";
import PersonCard from "./PersonCard";
import { PersonRecord } from "./types";

type Props = {
  records: PersonRecord[];
};

export default function Gallery({ records }: Props) {
  if (!records.length) {
    return <p className="text-muted-foreground text-sm">No persons added yet.</p>;
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
      {records.map((r) => (
        <PersonCard key={r.id} person={r} />
      ))}
    </div>
  );
}
