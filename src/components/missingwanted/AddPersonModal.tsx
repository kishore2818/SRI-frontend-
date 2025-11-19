import React, { useEffect, useState } from "react";
import { X, PlusCircle, Camera, Trash2 } from "lucide-react";
import { Status, PersonRecord } from "./types";

/**
 * AddPersonModal
 * - keeps all form state internal
 * - onAdd: callback receives a fully formed PersonRecord (including generated id)
 * - onClose: close modal
 */

type Props = {
  open: boolean;
  onClose: () => void;
  onAdd: (rec: PersonRecord) => void;
  uid: (prefix?: string) => string;
};

export default function AddPersonModal({ open, onClose, onAdd, uid }: Props) {
  const [status, setStatus] = useState<Status>("Missing");
  const [name, setName] = useState("");
  const [age, setAge] = useState<number | "">("");
  const [location, setLocation] = useState("");
  const [lastSeenDate, setLastSeenDate] = useState("");
  const [crime, setCrime] = useState("");
  const [reward, setReward] = useState<number | "">("");
  const [contact, setContact] = useState("");
  const [description, setDescription] = useState("");
  const [images, setImages] = useState<{ id: string; file?: File; preview: string }[]>([]);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [submitting, setSubmitting] = useState(false);

  // cleanup previews on unmount/close
  useEffect(() => {
    return () => images.forEach((i) => URL.revokeObjectURL(i.preview));
  }, [images]);

  useEffect(() => {
    if (!open) resetForm();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [open]);

  const resetForm = () => {
    setStatus("Missing");
    setName("");
    setAge("");
    setLocation("");
    setLastSeenDate("");
    setCrime("");
    setReward("");
    setContact("");
    setDescription("");
    images.forEach((i) => URL.revokeObjectURL(i.preview));
    setImages([]);
    setErrors({});
    setSubmitting(false);
  };

  const handleFiles = (filesList: FileList | null) => {
    if (!filesList) return;
    const incoming = Array.from(filesList).slice(0, 6 - images.length);
    const newItems = incoming.map((file) => ({
      id: uid("img-"),
      file,
      preview: URL.createObjectURL(file),
    }));
    setImages((prev) => [...prev, ...newItems]);
  };

  const removeImage = (id: string) => {
    setImages((prev) => {
      const rem = prev.find((p) => p.id === id);
      if (rem) URL.revokeObjectURL(rem.preview);
      return prev.filter((p) => p.id !== id);
    });
  };

  const validate = () => {
    const e: Record<string, string> = {};
    if (!name.trim()) e.name = "Name is required";
    if (!age || (typeof age === "number" && (age <= 0 || age > 120))) e.age = "Enter valid age";

    if (status === "Missing") {
      if (!lastSeenDate) e.lastSeenDate = "Last seen required";
      if (!location.trim()) e.location = "Last seen location required";
    } else {
      if (!crime.trim()) e.crime = "Crime detail required";
    }

    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const submit = async () => {
    if (!validate()) return;
    setSubmitting(true);

    const newRec: PersonRecord = {
      id: uid("MW-"),
      name: name.trim(),
      age: age === "" ? "" : Number(age),
      status,
      location: location.trim(),
      lastSeenDate: status === "Missing" ? lastSeenDate : undefined,
      crime: status === "Wanted" ? crime.trim() : undefined,
      reward: status === "Wanted" ? (reward === "" ? "" : Number(reward)) : undefined,
      contact: contact.trim(),
      description: description.trim(),
      images: images.map((i) => ({ id: i.id, url: i.preview })),
    };

    // simulate delay (optional)
    await new Promise((r) => setTimeout(r, 300));

    onAdd(newRec);
    setSubmitting(false);
    onClose();
  };

  if (!open) return null;

  const inputClass =
    "mt-1 block w-full rounded-md px-3 py-2 bg-black text-white placeholder:text-muted-foreground border border-sidebar-border";

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div className="absolute inset-0 bg-black/60" onClick={onClose} />

      <div className="relative w-full max-w-3xl mx-4 bg-sidebar rounded-md shadow-lg overflow-auto" style={{ maxHeight: "90vh" }}>
        <div className="p-4 border-b border-sidebar-border flex items-center justify-between bg-sidebar">
          <h2 className="text-lg font-semibold text-white">Add Person</h2>
          <button onClick={onClose} className="p-1 hover:bg-sidebar-accent rounded-md">
            <X className="h-4 w-4 text-white" />
          </button>
        </div>

        <form className="p-4 space-y-4 bg-sidebar" onSubmit={(e) => { e.preventDefault(); submit(); }}>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="text-xs text-muted-foreground">Status</label>
              <select value={status} onChange={(e) => setStatus(e.target.value as Status)} className={`${inputClass} appearance-none`}>
                <option value="Missing">Missing</option>
                <option value="Wanted">Wanted</option>
              </select>
            </div>

            <div className="md:col-span-2">
              <label className="text-xs text-muted-foreground">Full Name</label>
              <input value={name} onChange={(e) => setName(e.target.value)} className={inputClass} placeholder="Enter full name" />
              {errors.name && <div className="text-xs text-red-400 mt-1">{errors.name}</div>}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="text-xs text-muted-foreground">Age</label>
              <input type="number" value={age} onChange={(e) => setAge(e.target.value ? Number(e.target.value) : "")} className={inputClass} placeholder="Age" />
              {errors.age && <div className="text-xs text-red-400 mt-1">{errors.age}</div>}
            </div>

            <div className="md:col-span-2">
              <label className="text-xs text-muted-foreground">Contact</label>
              <input value={contact} onChange={(e) => setContact(e.target.value)} className={inputClass} placeholder="Phone / reference" />
            </div>
          </div>

          <div>
            <label className="text-xs text-muted-foreground">Description</label>
            <textarea value={description} onChange={(e) => setDescription(e.target.value)} className={`${inputClass} h-24 resize-none`} placeholder="Physical traits, clothes, etc." />
          </div>

          {status === "Missing" ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="text-xs text-muted-foreground">Last Seen Date & Time</label>
                <input type="datetime-local" value={lastSeenDate} onChange={(e) => setLastSeenDate(e.target.value)} className={inputClass} />
                {errors.lastSeenDate && <div className="text-xs text-red-400 mt-1">{errors.lastSeenDate}</div>}
              </div>

              <div>
                <label className="text-xs text-muted-foreground">Last Seen Location</label>
                <input value={location} onChange={(e) => setLocation(e.target.value)} className={inputClass} />
                {errors.location && <div className="text-xs text-red-400 mt-1">{errors.location}</div>}
              </div>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="text-xs text-muted-foreground">Crime / Reason</label>
                <input value={crime} onChange={(e) => setCrime(e.target.value)} className={inputClass} />
                {errors.crime && <div className="text-xs text-red-400 mt-1">{errors.crime}</div>}
              </div>

              <div>
                <label className="text-xs text-muted-foreground">Reward (optional)</label>
                <input type="number" value={reward} onChange={(e) => setReward(e.target.value ? Number(e.target.value) : "")} className={inputClass} placeholder="₹ amount" />
              </div>
            </div>
          )}

          <div>
            <label className="text-xs text-muted-foreground">Images (up to 6)</label>

            <label htmlFor="uploadImages" className="mt-2 inline-flex items-center gap-2 px-3 py-2 border border-dashed border-sidebar-border bg-black text-white rounded-md cursor-pointer text-sm">
              <Camera className="h-4 w-4" />
              Upload Images
            </label>
            <input id="uploadImages" type="file" accept="image/*" multiple className="hidden" onChange={(e) => handleFiles(e.target.files)} />

            <div className="grid grid-cols-3 sm:grid-cols-4 gap-2 mt-3">
              {images.length === 0 ? (
                <p className="text-xs text-muted-foreground col-span-full">No images selected.</p>
              ) : (
                images.map((img) => (
                  <div key={img.id} className="relative bg-card-bg rounded-md border border-sidebar-border overflow-hidden">
                    <img src={img.preview} className="h-24 w-full object-cover" alt="" />
                    <button type="button" className="absolute top-1 right-1 p-1 bg-black/50 rounded-full" onClick={() => removeImage(img.id)}>
                      <Trash2 className="h-4 w-4 text-white" />
                    </button>
                  </div>
                ))
              )}
            </div>
          </div>

          <div className="flex justify-end items-center gap-3 pt-2">
            <button type="button" onClick={onClose} className="px-3 py-2 border border-sidebar-border rounded-md text-white hover:bg-sidebar-accent">Cancel</button>

            <button type="submit" disabled={submitting} className="flex items-center gap-2 px-4 py-2 bg-threat text-white rounded-md hover:opacity-90">
              <PlusCircle className="h-4 w-4" />
              {submitting ? "Saving..." : "Save Record"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
