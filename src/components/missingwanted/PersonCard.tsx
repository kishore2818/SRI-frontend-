import React from "react";
import { User } from "lucide-react";
import { PersonRecord } from "./types";

type Props = {
  person: PersonRecord;
};

export default function PersonCard({ person }: Props) {
  return (
    <article className="bg-card-bg rounded-lg border border-sidebar-border overflow-hidden">
      <div className="h-40 bg-slate-800">
        {person.images && person.images.length ? (
          <img src={person.images[0].url} alt={person.name} className="h-40 w-full object-cover" />
        ) : (
          <div className="h-40 w-full flex items-center justify-center text-white/80">
            <User className="h-10 w-10" />
          </div>
        )}
      </div>

      <div className="p-3">
        <div className="flex justify-between items-start gap-3">
          <div className="min-w-0">
            <h3 className="text-lg font-semibold text-sidebar-foreground truncate">{person.name}</h3>
            <div className="text-xs text-muted-foreground">
              {person.status} • {typeof person.age === "number" && person.age ? `${person.age} yrs` : "Age N/A"}
            </div>
          </div>

          <div>
            <span
              className={`text-xs px-2 py-1 rounded-full ${
                person.status === "Wanted" ? "bg-red-600 text-white" : "bg-yellow-400 text-black"
              }`}
            >
              {person.status}
            </span>
          </div>
        </div>

        <div className="mt-2 text-sm text-sidebar-foreground">
          {person.status === "Missing" ? (
            <>
              <div className="text-xs text-muted-foreground">Last seen</div>
              <div className="text-sm">{person.lastSeenDate ? new Date(person.lastSeenDate).toLocaleString() : "N/A"}</div>
              <div className="text-xs text-muted-foreground mt-1">Location</div>
              <div className="text-sm">{person.location || "N/A"}</div>
            </>
          ) : (
            <>
              <div className="text-xs text-muted-foreground">Alleged crime</div>
              <div className="text-sm">{person.crime || "N/A"}</div>
              <div className="text-xs text-muted-foreground mt-1">Reward</div>
              <div className="text-sm">{person.reward ? `₹ ${person.reward}` : "None"}</div>
            </>
          )}
        </div>
      </div>
    </article>
  );
}
