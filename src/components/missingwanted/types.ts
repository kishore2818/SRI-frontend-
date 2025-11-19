export type Status = "Missing" | "Wanted";

export type PersonRecord = {
  id: string;
  name: string;
  age?: number | "";
  status: Status;
  location?: string;
  lastSeenDate?: string;
  crime?: string;
  reward?: number | "";
  contact?: string;
  description?: string;
  images: { id: string; url: string }[];
};
