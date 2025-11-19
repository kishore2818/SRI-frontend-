







// import React, { useEffect, useMemo, useState } from "react";
// import { User, Camera, PlusCircle, Trash2, X } from "lucide-react";

// /**
//  * src/pages/MissingWanted.tsx
//  *
//  * - Default view: gallery of person cards (image + short details)
//  * - "Add new person" button (top-right) opens a modal with the form
//  * - Submitting the form adds the record to the gallery (in-memory)
//  *
//  * Notes:
//  * - Replace the data persistence (addRecord) with your API call if needed.
//  * - All inputs use explicit text color so typed letters are visible.
//  */

// type Status = "Missing" | "Wanted";

// type PersonRecord = {
//   id: string;
//   name: string;
//   age?: number | "";
//   status: Status;
//   location?: string;
//   lastSeenDate?: string;
//   crime?: string;
//   reward?: number | "";
//   contact?: string;
//   description?: string;
//   images: { id: string; url: string }[];
// };

// const SAMPLE_RECORDS: PersonRecord[] = [
//   {
//     id: "MW-001",
//     name: "Arjun Patel",
//     age: 32,
//     status: "Wanted",
//     location: "Parking Zone A",
//     crime: "Theft",
//     reward: 5000,
//     contact: "888-555-1212",
//     description: "Tall, short beard, black jacket",
//     images: [] // no image - shows placeholder
//   },
//   {
//     id: "MW-002",
//     name: "Meena Rao",
//     age: 27,
//     status: "Missing",
//     location: "Main Lobby",
//     lastSeenDate: "2025-10-29T09:15",
//     contact: "N/A",
//     description: "Blue sari, mole on cheek",
//     images: []
//   }
// ];

// function uid(prefix = "") {
//   return prefix + Date.now().toString(36) + "-" + Math.random().toString(36).slice(2, 8);
// }

// export default function MissingWanted(): JSX.Element {
//   const [records, setRecords] = useState<PersonRecord[]>(SAMPLE_RECORDS);

//   // modal + form state
//   const [open, setOpen] = useState(false);
//   const [status, setStatus] = useState<Status>("Missing");
//   const [name, setName] = useState("");
//   const [age, setAge] = useState<number | "">("");
//   const [location, setLocation] = useState("");
//   const [lastSeenDate, setLastSeenDate] = useState("");
//   const [crime, setCrime] = useState("");
//   const [reward, setReward] = useState<number | "">("");
//   const [contact, setContact] = useState("");
//   const [description, setDescription] = useState("");
//   const [images, setImages] = useState<{ id: string; file: File; preview: string }[]>([]);
//   const [errors, setErrors] = useState<Record<string, string>>({});
//   const [submitting, setSubmitting] = useState(false);

//   // cleanup previews on unmount
//   useEffect(() => {
//     return () => {
//       images.forEach((i) => URL.revokeObjectURL(i.preview));
//     };
//   }, [images]);

//   const openForm = () => {
//     setOpen(true);
//   };
//   const closeForm = () => {
//     setOpen(false);
//     resetForm();
//   };

//   const resetForm = () => {
//     setStatus("Missing");
//     setName("");
//     setAge("");
//     setLocation("");
//     setLastSeenDate("");
//     setCrime("");
//     setReward("");
//     setContact("");
//     setDescription("");
//     images.forEach((i) => URL.revokeObjectURL(i.preview));
//     setImages([]);
//     setErrors({});
//     setSubmitting(false);
//   };

//   const handleFiles = (filesList: FileList | null) => {
//     if (!filesList) return;
//     const incoming = Array.from(filesList).slice(0, 6 - images.length);
//     const newItems = incoming.map((file) => ({
//       id: uid("img-"),
//       file,
//       preview: URL.createObjectURL(file)
//     }));
//     setImages((prev) => [...prev, ...newItems]);
//   };

//   const removeImage = (id: string) => {
//     setImages((prev) => {
//       const found = prev.find((p) => p.id === id);
//       if (found) URL.revokeObjectURL(found.preview);
//       return prev.filter((p) => p.id !== id);
//     });
//   };

//   const validate = (): boolean => {
//     const e: Record<string, string> = {};
//     if (!name.trim()) e.name = "Name is required";
//     if (!age || (typeof age === "number" && (age <= 0 || age > 120))) e.age = "Enter valid age";
//     if (status === "Missing") {
//       if (!lastSeenDate) e.lastSeenDate = "Last seen date/time required";
//       if (!location.trim()) e.location = "Last seen location required";
//     } else {
//       if (!crime.trim()) e.crime = "Specify alleged crime";
//     }
//     setErrors(e);
//     return Object.keys(e).length === 0;
//   };

//   const addRecord = async () => {
//     if (!validate()) return;
//     setSubmitting(true);
//     try {
//       // build record (mock). Replace with API upload if needed.
//       const newRec: PersonRecord = {
//         id: uid("MW-"),
//         name: name.trim(),
//         age: age === "" ? "" : Number(age),
//         status,
//         location: location.trim(),
//         lastSeenDate: status === "Missing" ? lastSeenDate : undefined,
//         crime: status === "Wanted" ? crime.trim() : undefined,
//         reward: status === "Wanted" ? (reward === "" ? "" : Number(reward)) : undefined,
//         contact: contact.trim(),
//         description: description.trim(),
//         images: images.map((i) => ({ id: i.id, url: i.preview })) // using object URL as image source
//       };

//       // Simulate API delay
//       await new Promise((r) => setTimeout(r, 500));

//       // add to top
//       setRecords((prev) => [newRec, ...prev]);
//       closeForm();
//     } catch (err) {
//       // eslint-disable-next-line no-console
//       console.error("save failed", err);
//       alert("Failed to save record (mock).");
//     } finally {
//       setSubmitting(false);
//     }
//   };

//   const statusHint = useMemo(() => {
//     return status === "Missing"
//       ? "Missing: provide last seen details so security can act quickly."
//       : "Wanted: provide crime details for investigators.";
//   }, [status]);

//   return (
//     <main className="p-6">
//       <header className="mb-6 flex items-start justify-between gap-4">
//         <div>
//           <h1 className="text-2xl font-bold text-sidebar-foreground flex items-center gap-2">
//             <User className="h-5 w-5" /> Missing / Wanted Persons
//           </h1>
//           <p className="text-sm text-muted-foreground mt-1">{statusHint}</p>
//         </div>

//         <div className="flex items-center gap-2">
//           <button
//             onClick={openForm}
//             className="inline-flex items-center gap-2 px-4 py-2 rounded-md bg-threat text-white hover:opacity-95"
//             title="Add new person"
//           >
//             <PlusCircle className="h-4 w-4" />
//             Add new person
//           </button>
//         </div>
//       </header>

//       {/* Gallery */}
//       <section>
//         {records.length === 0 ? (
//           <div className="text-sm text-muted-foreground">No records yet.</div>
//         ) : (
//           <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
//             {records.map((r) => (
//               <article key={r.id} className="bg-card-bg border border-sidebar-border rounded-lg overflow-hidden">
//                 <div className="h-44 bg-slate-800 flex items-end">
//                   {/* show first image if present else placeholder */}
//                   {r.images && r.images.length > 0 ? (
//                     // use first image as cover
//                     <img src={r.images[0].url} alt={r.name} className="h-44 w-full object-cover" />
//                   ) : (
//                     <div className="h-44 w-full flex items-center justify-center text-white/90">
//                       <div className="flex flex-col items-center gap-1">
//                         <User className="h-10 w-10" />
//                         <div className="text-sm">{r.name}</div>
//                       </div>
//                     </div>
//                   )}
//                 </div>

//                 <div className="p-3">
//                   <div className="flex items-start justify-between">
//                     <div>
//                       <h3 className="text-lg font-semibold text-sidebar-foreground">{r.name}</h3>
//                       <div className="text-xs text-muted-foreground">
//                         {r.status} • {typeof r.age === "number" && r.age ? `${r.age} yrs` : "Age N/A"}
//                       </div>
//                     </div>

//                     <div>
//                       <span
//                         className={
//                           "text-xs px-2 py-1 rounded-full " + (r.status === "Wanted" ? "bg-red-600 text-white" : "bg-yellow-500 text-black")
//                         }
//                       >
//                         {r.status}
//                       </span>
//                     </div>
//                   </div>

//                   <div className="mt-2 text-sm text-sidebar-foreground">
//                     {r.status === "Missing" ? (
//                       <>
//                         <div className="text-xs text-muted-foreground">Last seen:</div>
//                         <div className="text-sm">{r.lastSeenDate ? new Date(r.lastSeenDate).toLocaleString() : "N/A"}</div>
//                         <div className="text-xs text-muted-foreground mt-1">Location</div>
//                         <div className="text-sm">{r.location || "N/A"}</div>
//                       </>
//                     ) : (
//                       <>
//                         <div className="text-xs text-muted-foreground">Alleged crime</div>
//                         <div className="text-sm">{r.crime || "N/A"}</div>
//                         <div className="text-xs text-muted-foreground mt-1">Reward</div>
//                         <div className="text-sm">{r.reward ? `₹ ${r.reward}` : "N/A"}</div>
//                       </>
//                     )}
//                   </div>

//                   <div className="mt-3 flex items-center justify-between">
//                     <div className="text-xs text-muted-foreground">{r.contact || "Contact N/A"}</div>
//                     <div className="flex items-center gap-2">
//                       <button
//                         className="text-xs px-2 py-1 rounded-md border border-sidebar-border hover:bg-sidebar-accent"
//                         onClick={() => alert(`Open details for ${r.id} (not implemented)`)}
//                       >
//                         View
//                       </button>
//                     </div>
//                   </div>
//                 </div>
//               </article>
//             ))}
//           </div>
//         )}
//       </section>

//       {/* Modal */}
//       {open && (
//         <div className="fixed inset-0 z-50 flex items-center justify-center">
//           <div className="absolute inset-0 bg-black/60" onClick={closeForm} />
//           <div className="relative w-full max-w-3xl mx-4 bg-sidebar rounded-md shadow-lg overflow-auto" style={{ maxHeight: "90vh" }}>
//             <div className="p-4 border-b border-sidebar-border flex items-center justify-between">
//               <h2 className="text-lg font-semibold text-sidebar-foreground">Add Missing / Wanted Person</h2>
//               <button onClick={closeForm} className="p-2 rounded-md hover:bg-sidebar-accent">
//                 <X className="h-4 w-4" />
//               </button>
//             </div>

//             <form
//               onSubmit={(ev) => {
//                 ev.preventDefault();
//                 addRecord();
//               }}
//               className="p-4 space-y-4"
//             >
//               <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
//                 <div>
//                   <label className="text-xs text-muted-foreground">Status</label>
//                   <select
//                     value={status}
//                     onChange={(e) => setStatus(e.target.value as Status)}
//                     className="mt-1 block w-full rounded-md px-3 py-2 bg-input-bg border border-sidebar-border text-white placeholder:text-muted-foreground"
//                   >
//                     <option value="Missing">Missing</option>
//                     <option value="Wanted">Wanted</option>
//                   </select>
//                 </div>

//                 <div className="md:col-span-2">
//                   <label className="text-xs text-muted-foreground">Full name</label>
//                   <input
//                     value={name}
//                     onChange={(e) => setName(e.target.value)}
//                     className="mt-1 block w-full rounded-md px-3 py-2 bg-input-bg border border-sidebar-border text-white placeholder:text-muted-foreground"
//                     placeholder="Name"
//                   />
//                   {errors.name && <div className="text-xs text-red-400 mt-1">{errors.name}</div>}
//                 </div>

//                 <div>
//                   <label className="text-xs text-muted-foreground">Age</label>
//                   <input
//                     type="number"
//                     min={0}
//                     value={age}
//                     onChange={(e) => setAge(e.target.value === "" ? "" : Number(e.target.value))}
//                     className="mt-1 block w-full rounded-md px-3 py-2 bg-input-bg border border-sidebar-border text-white placeholder:text-muted-foreground"
//                     placeholder="Age"
//                   />
//                   {errors.age && <div className="text-xs text-red-400 mt-1">{errors.age}</div>}
//                 </div>

//                 <div>
//                   <label className="text-xs text-muted-foreground">Contact</label>
//                   <input
//                     value={contact}
//                     onChange={(e) => setContact(e.target.value)}
//                     className="mt-1 block w-full rounded-md px-3 py-2 bg-input-bg border border-sidebar-border text-white placeholder:text-muted-foreground"
//                     placeholder="Phone or reference"
//                   />
//                 </div>

//                 <div className="md:col-span-2">
//                   <label className="text-xs text-muted-foreground">Description</label>
//                   <textarea
//                     value={description}
//                     onChange={(e) => setDescription(e.target.value)}
//                     rows={2}
//                     className="mt-1 block w-full rounded-md px-3 py-2 bg-input-bg border border-sidebar-border text-white placeholder:text-muted-foreground"
//                     placeholder="Physical features, clothing..."
//                   />
//                 </div>
//               </div>

//               {status === "Missing" ? (
//                 <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//                   <div>
//                     <label className="text-xs text-muted-foreground">Last seen date & time</label>
//                     <input
//                       type="datetime-local"
//                       value={lastSeenDate}
//                       onChange={(e) => setLastSeenDate(e.target.value)}
//                       className="mt-1 block w-full rounded-md px-3 py-2 bg-input-bg border border-sidebar-border text-white placeholder:text-muted-foreground"
//                     />
//                     {errors.lastSeenDate && <div className="text-xs text-red-400 mt-1">{errors.lastSeenDate}</div>}
//                   </div>

//                   <div>
//                     <label className="text-xs text-muted-foreground">Last seen location</label>
//                     <input
//                       value={location}
//                       onChange={(e) => setLocation(e.target.value)}
//                       className="mt-1 block w-full rounded-md px-3 py-2 bg-input-bg border border-sidebar-border text-white placeholder:text-muted-foreground"
//                     />
//                     {errors.location && <div className="text-xs text-red-400 mt-1">{errors.location}</div>}
//                   </div>
//                 </div>
//               ) : (
//                 <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//                   <div>
//                     <label className="text-xs text-muted-foreground">Alleged crime / reason</label>
//                     <input
//                       value={crime}
//                       onChange={(e) => setCrime(e.target.value)}
//                       className="mt-1 block w-full rounded-md px-3 py-2 bg-input-bg border border-sidebar-border text-white placeholder:text-muted-foreground"
//                     />
//                     {errors.crime && <div className="text-xs text-red-400 mt-1">{errors.crime}</div>}
//                   </div>

//                   <div>
//                     <label className="text-xs text-muted-foreground">Reward (optional)</label>
//                     <input
//                       type="number"
//                       min={0}
//                       value={reward}
//                       onChange={(e) => setReward(e.target.value === "" ? "" : Number(e.target.value))}
//                       className="mt-1 block w-full rounded-md px-3 py-2 bg-input-bg border border-sidebar-border text-white placeholder:text-muted-foreground"
//                     />
//                   </div>
//                 </div>
//               )}

//               {/* Images upload */}
//               <div>
//                 <label className="text-xs text-muted-foreground">Images (up to 6)</label>
//                 <div className="mt-2 flex items-center gap-3">
//                   <label
//                     htmlFor="modal-image-upload"
//                     className="inline-flex items-center gap-2 px-3 py-2 rounded-md border border-dashed border-sidebar-border cursor-pointer bg-input-bg text-sm text-white"
//                   >
//                     <Camera className="h-4 w-4" />
//                     Upload images
//                     <input
//                       id="modal-image-upload"
//                       type="file"
//                       accept="image/*"
//                       multiple
//                       onChange={(e) => {
//                         handleFiles(e.target.files);
//                         (e.target as HTMLInputElement).value = "";
//                       }}
//                       className="hidden"
//                     />
//                   </label>

//                   <div className="text-xs text-muted-foreground">Accepted JPG/PNG — max recommended 5MB each</div>
//                 </div>

//                 <div className="mt-3 grid grid-cols-3 sm:grid-cols-4 gap-2">
//                   {images.length === 0 ? (
//                     <div className="text-xs text-muted-foreground col-span-full">No images selected</div>
//                   ) : (
//                     images.map((img) => (
//                       <div key={img.id} className="relative bg-card-bg rounded-md overflow-hidden border border-sidebar-border">
//                         <img src={img.preview} alt="preview" className="h-24 w-full object-cover" />
//                         <button
//                           type="button"
//                           onClick={() => removeImage(img.id)}
//                           className="absolute top-1 right-1 p-1 rounded-full bg-black/40 hover:bg-black/60"
//                           title="Remove"
//                         >
//                           <Trash2 className="h-4 w-4 text-white" />
//                         </button>
//                       </div>
//                     ))
//                   )}
//                 </div>
//               </div>

//               <div className="flex items-center justify-between gap-3">
//                 <div className="text-xs text-muted-foreground">Preview images remain in browser memory only.</div>
//                 <div className="flex items-center gap-2">
//                   <button
//                     type="button"
//                     onClick={closeForm}
//                     className="px-3 py-2 rounded-md border border-sidebar-border text-sm text-sidebar-foreground"
//                     disabled={submitting}
//                   >
//                     Cancel
//                   </button>

//                   <button
//                     type="submit"
//                     className="inline-flex items-center gap-2 px-4 py-2 rounded-md bg-threat text-white"
//                     disabled={submitting}
//                   >
//                     <PlusCircle className="h-4 w-4" />
//                     {submitting ? "Saving..." : "Save record"}
//                   </button>
//                 </div>
//               </div>
//             </form>
//           </div>
//         </div>
//       )}
//     </main>
//   );
// }








// import React, { useEffect, useMemo, useState } from "react";
// import { User, Camera, PlusCircle, Trash2, X } from "lucide-react";

// /**
//  * Missing / Wanted Page
//  * ---------------------
//  * - Default view: gallery of person cards
//  * - Add New Person button opens modal
//  * - Modal is fully dark-themed (no white background)
//  * - Image upload with preview
//  * - Conditional form fields for Missing / Wanted
//  */

// type Status = "Missing" | "Wanted";

// type PersonRecord = {
//   id: string;
//   name: string;
//   age?: number | "";
//   status: Status;
//   location?: string;
//   lastSeenDate?: string;
//   crime?: string;
//   reward?: number | "";
//   contact?: string;
//   description?: string;
//   images: { id: string; url: string }[];
// };

// const SAMPLE_RECORDS: PersonRecord[] = [];

// function uid(prefix = "") {
//   return prefix + Date.now().toString(36) + "-" + Math.random().toString(36).slice(2, 8);
// }

// export default function MissingWanted() {
//   // Records shown in gallery
//   const [records, setRecords] = useState<PersonRecord[]>(SAMPLE_RECORDS);

//   // Modal control
//   const [open, setOpen] = useState(false);

//   // Form fields
//   const [status, setStatus] = useState<Status>("Missing");
//   const [name, setName] = useState("");
//   const [age, setAge] = useState<number | "">("");
//   const [location, setLocation] = useState("");
//   const [lastSeenDate, setLastSeenDate] = useState("");
//   const [crime, setCrime] = useState("");
//   const [reward, setReward] = useState<number | "">("");
//   const [contact, setContact] = useState("");
//   const [description, setDescription] = useState("");

//   const [images, setImages] = useState<{ id: string; file: File; preview: string }[]>([]);
//   const [errors, setErrors] = useState<Record<string, string>>({});
//   const [submitting, setSubmitting] = useState(false);

//   // cleanup previews on unmount
//   useEffect(() => {
//     return () => images.forEach((i) => URL.revokeObjectURL(i.preview));
//   }, [images]);

//   const openForm = () => setOpen(true);
//   const closeForm = () => {
//     setOpen(false);
//     resetForm();
//   };

//   const resetForm = () => {
//     setStatus("Missing");
//     setName("");
//     setAge("");
//     setLocation("");
//     setLastSeenDate("");
//     setCrime("");
//     setReward("");
//     setContact("");
//     setDescription("");
//     images.forEach((i) => URL.revokeObjectURL(i.preview));
//     setImages([]);
//     setErrors({});
//     setSubmitting(false);
//   };

//   // Image upload
//   const handleFiles = (filesList: FileList | null) => {
//     if (!filesList) return;
//     const incoming = Array.from(filesList).slice(0, 6 - images.length);
//     const newItems = incoming.map((file) => ({
//       id: uid("img-"),
//       file,
//       preview: URL.createObjectURL(file),
//     }));
//     setImages((prev) => [...prev, ...newItems]);
//   };

//   const removeImage = (id: string) => {
//     setImages((prev) => {
//       const remove = prev.find((p) => p.id === id);
//       if (remove) URL.revokeObjectURL(remove.preview);
//       return prev.filter((p) => p.id !== id);
//     });
//   };

//   const validate = () => {
//     const e: Record<string, string> = {};
//     if (!name.trim()) e.name = "Name is required";
//     if (!age || (typeof age === "number" && (age <= 0 || age > 120))) e.age = "Enter valid age";

//     if (status === "Missing") {
//       if (!lastSeenDate) e.lastSeenDate = "Last seen date/time required";
//       if (!location.trim()) e.location = "Last seen location required";
//     } else {
//       if (!crime.trim()) e.crime = "Crime detail required";
//     }

//     setErrors(e);
//     return Object.keys(e).length === 0;
//   };

//   const addRecord = async () => {
//     if (!validate()) return;
//     setSubmitting(true);

//     const newRec: PersonRecord = {
//       id: uid("MW-"),
//       name,
//       age,
//       status,
//       location,
//       lastSeenDate: status === "Missing" ? lastSeenDate : undefined,
//       crime: status === "Wanted" ? crime : undefined,
//       reward: status === "Wanted" ? reward : undefined,
//       contact,
//       description,
//       images: images.map((i) => ({ id: i.id, url: i.preview })),
//     };

//     await new Promise((r) => setTimeout(r, 400));

//     setRecords((prev) => [newRec, ...prev]);
//     closeForm();
//   };

//   const statusHint = useMemo(
//     () =>
//       status === "Missing"
//         ? "Missing: Add last seen details for rapid response."
//         : "Wanted: Add crime details for investigation.",
//     [status]
//   );

//   return (
//     <main className="p-6">
//       {/* HEADER */}
//       <div className="flex justify-between items-start mb-6">
//         <div>
//           <h1 className="text-2xl font-bold text-sidebar-foreground flex items-center gap-2">
//             <User className="h-5 w-5" />
//             Missing / Wanted Persons
//           </h1>
//           <p className="text-sm text-muted-foreground mt-1">{statusHint}</p>
//         </div>

//         <button
//           onClick={openForm}
//           className="flex items-center gap-2 px-4 py-2 bg-threat text-white rounded-md hover:opacity-90"
//         >
//           <PlusCircle className="h-4 w-4" />
//           Add Person
//         </button>
//       </div>

//       {/* GALLERY */}
//       <section>
//         {records.length === 0 ? (
//           <p className="text-muted-foreground text-sm">No persons added yet.</p>
//         ) : (
//           <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
//             {records.map((r) => (
//               <div
//                 key={r.id}
//                 className="bg-card-bg rounded-lg border border-sidebar-border overflow-hidden"
//               >
//                 <div className="h-40 bg-slate-800">
//                   {r.images.length ? (
//                     <img
//                       src={r.images[0].url}
//                       className="h-40 w-full object-cover"
//                       alt={r.name}
//                     />
//                   ) : (
//                     <div className="h-40 w-full flex items-center justify-center text-white/80">
//                       <User className="h-10 w-10" />
//                     </div>
//                   )}
//                 </div>

//                 <div className="p-3">
//                   <div className="flex justify-between">
//                     <h3 className="text-lg font-semibold text-sidebar-foreground">{r.name}</h3>
//                     <span
//                       className={`text-xs px-2 py-1 rounded-full ${
//                         r.status === "Wanted"
//                           ? "bg-red-600 text-white"
//                           : "bg-yellow-400 text-black"
//                       }`}
//                     >
//                       {r.status}
//                     </span>
//                   </div>

//                   <p className="text-xs text-muted-foreground mt-1">
//                     Age: {r.age || "N/A"}
//                   </p>

//                   {r.status === "Missing" ? (
//                     <>
//                       <p className="text-xs text-muted-foreground mt-1">
//                         Last Seen:
//                       </p>
//                       <p className="text-sm text-sidebar-foreground">
//                         {r.lastSeenDate ? new Date(r.lastSeenDate).toLocaleString() : "N/A"}
//                       </p>
//                       <p className="text-xs text-muted-foreground mt-1">Location</p>
//                       <p className="text-sm">{r.location || "N/A"}</p>
//                     </>
//                   ) : (
//                     <>
//                       <p className="text-xs text-muted-foreground mt-1">
//                         Alleged Crime:
//                       </p>
//                       <p className="text-sm">{r.crime || "N/A"}</p>
//                       <p className="text-xs text-muted-foreground mt-1">Reward</p>
//                       <p className="text-sm">
//                         {r.reward ? `₹ ${r.reward}` : "None"}
//                       </p>
//                     </>
//                   )}
//                 </div>
//               </div>
//             ))}
//           </div>
//         )}
//       </section>

//       {/* MODAL */}
//       {open && (
//         <div className="fixed inset-0 z-50 flex items-center justify-center">
//           {/* Overlay */}
//           <div
//             className="absolute inset-0 bg-black/60"
//             onClick={closeForm}
//           />

//           {/* Modal Content - DARK */}
//           <div
//             className="relative w-full max-w-3xl mx-4 bg-sidebar rounded-md shadow-lg overflow-auto"
//             style={{ maxHeight: "90vh" }}
//           >
//             {/* Modal Header - DARK */}
//             <div className="p-4 border-b border-sidebar-border flex items-center justify-between bg-sidebar">
//               <h2 className="text-lg font-semibold text-white">Add Person</h2>
//               <button onClick={closeForm} className="p-1 hover:bg-sidebar-accent rounded-md">
//                 <X className="h-4 w-4 text-white" />
//               </button>
//             </div>

//             {/* Form - DARK */}
//             <form
//               className="p-4 space-y-4 bg-sidebar"
//               onSubmit={(e) => {
//                 e.preventDefault();
//                 addRecord();
//               }}
//             >
//               {/* STATUS + NAME */}
//               <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
//                 <div>
//                   <label className="text-xs text-muted-foreground">Status</label>
//                   <select
//                     value={status}
//                     onChange={(e) => setStatus(e.target.value as Status)}
//                     className="mt-1 w-full px-3 py-2 rounded-md bg-input-bg text-white border border-sidebar-border"
//                   >
//                     <option value="Missing">Missing</option>
//                     <option value="Wanted">Wanted</option>
//                   </select>
//                 </div>

//                 <div className="md:col-span-2">
//                   <label className="text-xs text-muted-foreground">Full Name</label>
//                   <input
//                     value={name}
//                     onChange={(e) => setName(e.target.value)}
//                     className="mt-1 w-full px-3 py-2 rounded-md bg-input-bg text-white border border-sidebar-border"
//                     placeholder="Enter full name"
//                   />
//                   {errors.name && <p className="text-red-400 text-xs">{errors.name}</p>}
//                 </div>
//               </div>

//               {/* AGE + CONTACT */}
//               <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
//                 <div>
//                   <label className="text-xs text-muted-foreground">Age</label>
//                   <input
//                     type="number"
//                     value={age}
//                     onChange={(e) => setAge(e.target.value ? Number(e.target.value) : "")}
//                     className="mt-1 w-full px-3 py-2 rounded-md bg-input-bg text-white border border-sidebar-border"
//                     placeholder="Age"
//                   />
//                   {errors.age && <p className="text-red-400 text-xs">{errors.age}</p>}
//                 </div>

//                 <div className="md:col-span-2">
//                   <label className="text-xs text-muted-foreground">Contact</label>
//                   <input
//                     value={contact}
//                     onChange={(e) => setContact(e.target.value)}
//                     className="mt-1 w-full px-3 py-2 rounded-md bg-input-bg text-white border border-sidebar-border"
//                     placeholder="Phone / reference"
//                   />
//                 </div>
//               </div>

//               {/* DESCRIPTION */}
//               <div>
//                 <label className="text-xs text-muted-foreground">Description</label>
//                 <textarea
//                   value={description}
//                   onChange={(e) => setDescription(e.target.value)}
//                   className="mt-1 w-full px-3 py-2 rounded-md bg-input-bg text-white border border-sidebar-border"
//                   rows={2}
//                   placeholder="Physical traits, clothes, etc."
//                 />
//               </div>

//               {/* CONDITIONAL FIELDS */}
//               {status === "Missing" ? (
//                 <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//                   <div>
//                     <label className="text-xs text-muted-foreground">Last Seen Date & Time</label>
//                     <input
//                       type="datetime-local"
//                       value={lastSeenDate}
//                       onChange={(e) => setLastSeenDate(e.target.value)}
//                       className="mt-1 w-full px-3 py-2 rounded-md bg-input-bg text-white border border-sidebar-border"
//                     />
//                     {errors.lastSeenDate && (
//                       <p className="text-red-400 text-xs">{errors.lastSeenDate}</p>
//                     )}
//                   </div>
//                   <div>
//                     <label className="text-xs text-muted-foreground">Last Seen Location</label>
//                     <input
//                       value={location}
//                       onChange={(e) => setLocation(e.target.value)}
//                       className="mt-1 w-full px-3 py-2 rounded-md bg-input-bg text-white border border-sidebar-border"
//                     />
//                     {errors.location && (
//                       <p className="text-red-400 text-xs">{errors.location}</p>
//                     )}
//                   </div>
//                 </div>
//               ) : (
//                 <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//                   <div>
//                     <label className="text-xs text-muted-foreground">Crime / Reason</label>
//                     <input
//                       value={crime}
//                       onChange={(e) => setCrime(e.target.value)}
//                       className="mt-1 w-full px-3 py-2 rounded-md bg-input-bg text-white border border-sidebar-border"
//                     />
//                     {errors.crime && (
//                       <p className="text-red-400 text-xs">{errors.crime}</p>
//                     )}
//                   </div>
//                   <div>
//                     <label className="text-xs text-muted-foreground">Reward (optional)</label>
//                     <input
//                       type="number"
//                       value={reward}
//                       onChange={(e) => setReward(e.target.value ? Number(e.target.value) : "")}
//                       className="mt-1 w-full px-3 py-2 rounded-md bg-input-bg text-white border border-sidebar-border"
//                       placeholder="₹ amount"
//                     />
//                   </div>
//                 </div>
//               )}

//               {/* IMAGES */}
//               <div>
//                 <label className="text-xs text-muted-foreground">Images (up to 6)</label>

//                 <label
//                   htmlFor="uploadImages"
//                   className="mt-2 inline-flex items-center gap-2 px-3 py-2 border border-dashed border-sidebar-border bg-input-bg text-white rounded-md cursor-pointer text-sm"
//                 >
//                   <Camera className="h-4 w-4" />
//                   Upload Images
//                 </label>
//                 <input
//                   id="uploadImages"
//                   type="file"
//                   accept="image/*"
//                   multiple
//                   className="hidden"
//                   onChange={(e) => handleFiles(e.target.files)}
//                 />

//                 {/* Preview */}
//                 <div className="grid grid-cols-3 sm:grid-cols-4 gap-2 mt-3">
//                   {images.length === 0 ? (
//                     <p className="text-xs text-muted-foreground col-span-full">
//                       No images selected.
//                     </p>
//                   ) : (
//                     images.map((img) => (
//                       <div
//                         key={img.id}
//                         className="relative bg-card-bg rounded-md border border-sidebar-border overflow-hidden"
//                       >
//                         <img
//                           src={img.preview}
//                           className="h-24 w-full object-cover"
//                           alt=""
//                         />
//                         <button
//                           type="button"
//                           className="absolute top-1 right-1 p-1 bg-black/50 rounded-full"
//                           onClick={() => removeImage(img.id)}
//                         >
//                           <Trash2 className="h-4 w-4 text-white" />
//                         </button>
//                       </div>
//                     ))
//                   )}
//                 </div>
//               </div>

//               {/* ACTIONS */}
//               <div className="flex justify-end items-center gap-3 pt-2">
//                 <button
//                   type="button"
//                   onClick={closeForm}
//                   className="px-3 py-2 border border-sidebar-border rounded-md text-white hover:bg-sidebar-accent"
//                 >
//                   Cancel
//                 </button>

//                 <button
//                   type="submit"
//                   disabled={submitting}
//                   className="flex items-center gap-2 px-4 py-2 bg-threat text-white rounded-md hover:opacity-90"
//                 >
//                   <PlusCircle className="h-4 w-4" />
//                   {submitting ? "Saving..." : "Save Record"}
//                 </button>
//               </div>
//             </form>
//           </div>
//         </div>
//       )}
//     </main>
//   );
// }










// import React, { useEffect, useMemo, useState } from "react";
// import { User, Camera, PlusCircle, Trash2, X } from "lucide-react";

// /**
//  * Missing / Wanted Page (updated inputs: black background, white text)
//  *
//  * - Gallery of person cards
//  * - "Add Person" modal with dark (black) inputs and white text
//  * - Image upload + preview
//  *
//  * Save as: src/pages/MissingWanted.tsx
//  */

// type Status = "Missing" | "Wanted";

// type PersonRecord = {
//   id: string;
//   name: string;
//   age?: number | "";
//   status: Status;
//   location?: string;
//   lastSeenDate?: string;
//   crime?: string;
//   reward?: number | "";
//   contact?: string;
//   description?: string;
//   images: { id: string; url: string }[];
// };

// const SAMPLE_RECORDS: PersonRecord[] = [];

// function uid(prefix = "") {
//   return prefix + Date.now().toString(36) + "-" + Math.random().toString(36).slice(2, 8);
// }

// export default function MissingWanted() {
//   // Records shown in gallery
//   const [records, setRecords] = useState<PersonRecord[]>(SAMPLE_RECORDS);

//   // Modal control
//   const [open, setOpen] = useState(false);

//   // Form fields
//   const [status, setStatus] = useState<Status>("Missing");
//   const [name, setName] = useState("");
//   const [age, setAge] = useState<number | "">("");
//   const [location, setLocation] = useState("");
//   const [lastSeenDate, setLastSeenDate] = useState("");
//   const [crime, setCrime] = useState("");
//   const [reward, setReward] = useState<number | "">("");
//   const [contact, setContact] = useState("");
//   const [description, setDescription] = useState("");

//   const [images, setImages] = useState<{ id: string; file: File; preview: string }[]>([]);
//   const [errors, setErrors] = useState<Record<string, string>>({});
//   const [submitting, setSubmitting] = useState(false);

//   // cleanup previews on unmount
//   useEffect(() => {
//     return () => images.forEach((i) => URL.revokeObjectURL(i.preview));
//   }, [images]);

//   const openForm = () => setOpen(true);
//   const closeForm = () => {
//     setOpen(false);
//     resetForm();
//   };

//   const resetForm = () => {
//     setStatus("Missing");
//     setName("");
//     setAge("");
//     setLocation("");
//     setLastSeenDate("");
//     setCrime("");
//     setReward("");
//     setContact("");
//     setDescription("");
//     images.forEach((i) => URL.revokeObjectURL(i.preview));
//     setImages([]);
//     setErrors({});
//     setSubmitting(false);
//   };

//   // Image upload
//   const handleFiles = (filesList: FileList | null) => {
//     if (!filesList) return;
//     const incoming = Array.from(filesList).slice(0, 6 - images.length);
//     const newItems = incoming.map((file) => ({
//       id: uid("img-"),
//       file,
//       preview: URL.createObjectURL(file),
//     }));
//     setImages((prev) => [...prev, ...newItems]);
//   };

//   const removeImage = (id: string) => {
//     setImages((prev) => {
//       const remove = prev.find((p) => p.id === id);
//       if (remove) URL.revokeObjectURL(remove.preview);
//       return prev.filter((p) => p.id !== id);
//     });
//   };

//   const validate = () => {
//     const e: Record<string, string> = {};
//     if (!name.trim()) e.name = "Name is required";
//     if (!age || (typeof age === "number" && (age <= 0 || age > 120))) e.age = "Enter valid age";

//     if (status === "Missing") {
//       if (!lastSeenDate) e.lastSeenDate = "Last seen date/time required";
//       if (!location.trim()) e.location = "Last seen location required";
//     } else {
//       if (!crime.trim()) e.crime = "Crime detail required";
//     }

//     setErrors(e);
//     return Object.keys(e).length === 0;
//   };

//   const addRecord = async () => {
//     if (!validate()) return;
//     setSubmitting(true);

//     const newRec: PersonRecord = {
//       id: uid("MW-"),
//       name,
//       age,
//       status,
//       location,
//       lastSeenDate: status === "Missing" ? lastSeenDate : undefined,
//       crime: status === "Wanted" ? crime : undefined,
//       reward: status === "Wanted" ? reward : undefined,
//       contact,
//       description,
//       images: images.map((i) => ({ id: i.id, url: i.preview })),
//     };

//     await new Promise((r) => setTimeout(r, 400));

//     setRecords((prev) => [newRec, ...prev]);
//     closeForm();
//   };

//   const statusHint = useMemo(
//     () =>
//       status === "Missing"
//         ? "Missing: Add last seen details for rapid response."
//         : "Wanted: Add crime details for investigation.",
//     [status]
//   );

//   // shared input class — black background + white text + visible placeholder
//   const inputClass =
//     "mt-1 w-full px-3 py-2 rounded-md bg-black text-white placeholder:text-muted-foreground border border-sidebar-border";

//   return (
//     <main className="p-6">
//       {/* HEADER */}
//       <div className="flex justify-between items-start mb-6">
//         <div>
//           <h1 className="text-2xl font-bold text-sidebar-foreground flex items-center gap-2">
//             <User className="h-5 w-5" />
//             Missing / Wanted Persons
//           </h1>
//           <p className="text-sm text-muted-foreground mt-1">{statusHint}</p>
//         </div>

//         <button
//           onClick={openForm}
//           className="flex items-center gap-2 px-4 py-2 bg-threat text-white rounded-md hover:opacity-90"
//         >
//           <PlusCircle className="h-4 w-4" />
//           Add Person
//         </button>
//       </div>

//       {/* GALLERY */}
//       <section>
//         {records.length === 0 ? (
//           <p className="text-muted-foreground text-sm">No persons added yet.</p>
//         ) : (
//           <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
//             {records.map((r) => (
//               <div
//                 key={r.id}
//                 className="bg-card-bg rounded-lg border border-sidebar-border overflow-hidden"
//               >
//                 <div className="h-40 bg-slate-800">
//                   {r.images.length ? (
//                     <img
//                       src={r.images[0].url}
//                       className="h-40 w-full object-cover"
//                       alt={r.name}
//                     />
//                   ) : (
//                     <div className="h-40 w-full flex items-center justify-center text-white/80">
//                       <User className="h-10 w-10" />
//                     </div>
//                   )}
//                 </div>

//                 <div className="p-3">
//                   <div className="flex justify-between">
//                     <h3 className="text-lg font-semibold text-sidebar-foreground">{r.name}</h3>
//                     <span
//                       className={`text-xs px-2 py-1 rounded-full ${
//                         r.status === "Wanted"
//                           ? "bg-red-600 text-white"
//                           : "bg-yellow-400 text-black"
//                       }`}
//                     >
//                       {r.status}
//                     </span>
//                   </div>

//                   <p className="text-xs text-muted-foreground mt-1">
//                     Age: {r.age || "N/A"}
//                   </p>

//                   {r.status === "Missing" ? (
//                     <>
//                       <p className="text-xs text-muted-foreground mt-1">
//                         Last Seen:
//                       </p>
//                       <p className="text-sm text-sidebar-foreground">
//                         {r.lastSeenDate ? new Date(r.lastSeenDate).toLocaleString() : "N/A"}
//                       </p>
//                       <p className="text-xs text-muted-foreground mt-1">Location</p>
//                       <p className="text-sm">{r.location || "N/A"}</p>
//                     </>
//                   ) : (
//                     <>
//                       <p className="text-xs text-muted-foreground mt-1">
//                         Alleged Crime:
//                       </p>
//                       <p className="text-sm">{r.crime || "N/A"}</p>
//                       <p className="text-xs text-muted-foreground mt-1">Reward</p>
//                       <p className="text-sm">
//                         {r.reward ? `₹ ${r.reward}` : "None"}
//                       </p>
//                     </>
//                   )}
//                 </div>
//               </div>
//             ))}
//           </div>
//         )}
//       </section>

//       {/* MODAL */}
//       {open && (
//         <div className="fixed inset-0 z-50 flex items-center justify-center">
//           {/* Overlay */}
//           <div
//             className="absolute inset-0 bg-black/60"
//             onClick={closeForm}
//           />

//           {/* Modal Content - DARK */}
//           <div
//             className="relative w-full max-w-3xl mx-4 bg-sidebar rounded-md shadow-lg overflow-auto"
//             style={{ maxHeight: "90vh" }}
//           >
//             {/* Modal Header - DARK */}
//             <div className="p-4 border-b border-sidebar-border flex items-center justify-between bg-sidebar">
//               <h2 className="text-lg font-semibold text-white">Add Person</h2>
//               <button onClick={closeForm} className="p-1 hover:bg-sidebar-accent rounded-md">
//                 <X className="h-4 w-4 text-white" />
//               </button>
//             </div>

//             {/* Form - DARK */}
//             <form
//               className="p-4 space-y-4 bg-sidebar"
//               onSubmit={(e) => {
//                 e.preventDefault();
//                 addRecord();
//               }}
//             >
//               {/* STATUS + NAME */}
//               <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
//                 <div>
//                   <label className="text-xs text-muted-foreground">Status</label>
//                   <select
//                     value={status}
//                     onChange={(e) => setStatus(e.target.value as Status)}
//                     className={`${inputClass} appearance-none`}
//                   >
//                     <option value="Missing">Missing</option>
//                     <option value="Wanted">Wanted</option>
//                   </select>
//                 </div>

//                 <div className="md:col-span-2">
//                   <label className="text-xs text-muted-foreground">Full Name</label>
//                   <input
//                     value={name}
//                     onChange={(e) => setName(e.target.value)}
//                     className={inputClass}
//                     placeholder="Enter full name"
//                   />
//                   {errors.name && <p className="text-red-400 text-xs">{errors.name}</p>}
//                 </div>
//               </div>

//               {/* AGE + CONTACT */}
//               <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
//                 <div>
//                   <label className="text-xs text-muted-foreground">Age</label>
//                   <input
//                     type="number"
//                     value={age}
//                     onChange={(e) => setAge(e.target.value ? Number(e.target.value) : "")}
//                     className={inputClass}
//                     placeholder="Age"
//                   />
//                   {errors.age && <p className="text-red-400 text-xs">{errors.age}</p>}
//                 </div>

//                 <div className="md:col-span-2">
//                   <label className="text-xs text-muted-foreground">Contact</label>
//                   <input
//                     value={contact}
//                     onChange={(e) => setContact(e.target.value)}
//                     className={inputClass}
//                     placeholder="Phone / reference"
//                   />
//                 </div>
//               </div>

//               {/* DESCRIPTION */}
//               <div>
//                 <label className="text-xs text-muted-foreground">Description</label>
//                 <textarea
//                   value={description}
//                   onChange={(e) => setDescription(e.target.value)}
//                   className={`${inputClass} h-24 resize-none`}
//                   placeholder="Physical traits, clothes, etc."
//                 />
//               </div>

//               {/* CONDITIONAL FIELDS */}
//               {status === "Missing" ? (
//                 <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//                   <div>
//                     <label className="text-xs text-muted-foreground">Last Seen Date & Time</label>
//                     <input
//                       type="datetime-local"
//                       value={lastSeenDate}
//                       onChange={(e) => setLastSeenDate(e.target.value)}
//                       className={inputClass}
//                     />
//                     {errors.lastSeenDate && (
//                       <p className="text-red-400 text-xs">{errors.lastSeenDate}</p>
//                     )}
//                   </div>
//                   <div>
//                     <label className="text-xs text-muted-foreground">Last Seen Location</label>
//                     <input
//                       value={location}
//                       onChange={(e) => setLocation(e.target.value)}
//                       className={inputClass}
//                     />
//                     {errors.location && (
//                       <p className="text-red-400 text-xs">{errors.location}</p>
//                     )}
//                   </div>
//                 </div>
//               ) : (
//                 <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//                   <div>
//                     <label className="text-xs text-muted-foreground">Crime / Reason</label>
//                     <input
//                       value={crime}
//                       onChange={(e) => setCrime(e.target.value)}
//                       className={inputClass}
//                     />
//                     {errors.crime && (
//                       <p className="text-red-400 text-xs">{errors.crime}</p>
//                     )}
//                   </div>
//                   <div>
//                     <label className="text-xs text-muted-foreground">Reward (optional)</label>
//                     <input
//                       type="number"
//                       value={reward}
//                       onChange={(e) => setReward(e.target.value ? Number(e.target.value) : "")}
//                       className={inputClass}
//                       placeholder="₹ amount"
//                     />
//                   </div>
//                 </div>
//               )}

//               {/* IMAGES */}
//               <div>
//                 <label className="text-xs text-muted-foreground">Images (up to 6)</label>

//                 <label
//                   htmlFor="uploadImages"
//                   className="mt-2 inline-flex items-center gap-2 px-3 py-2 border border-dashed border-sidebar-border bg-black text-white rounded-md cursor-pointer text-sm"
//                 >
//                   <Camera className="h-4 w-4" />
//                   Upload Images
//                 </label>
//                 <input
//                   id="uploadImages"
//                   type="file"
//                   accept="image/*"
//                   multiple
//                   className="hidden"
//                   onChange={(e) => handleFiles(e.target.files)}
//                 />

//                 {/* Preview */}
//                 <div className="grid grid-cols-3 sm:grid-cols-4 gap-2 mt-3">
//                   {images.length === 0 ? (
//                     <p className="text-xs text-muted-foreground col-span-full">
//                       No images selected.
//                     </p>
//                   ) : (
//                     images.map((img) => (
//                       <div
//                         key={img.id}
//                         className="relative bg-card-bg rounded-md border border-sidebar-border overflow-hidden"
//                       >
//                         <img
//                           src={img.preview}
//                           className="h-24 w-full object-cover"
//                           alt=""
//                         />
//                         <button
//                           type="button"
//                           className="absolute top-1 right-1 p-1 bg-black/50 rounded-full"
//                           onClick={() => removeImage(img.id)}
//                         >
//                           <Trash2 className="h-4 w-4 text-white" />
//                         </button>
//                       </div>
//                     ))
//                   )}
//                 </div>
//               </div>

//               {/* ACTIONS */}
//               <div className="flex justify-end items-center gap-3 pt-2">
//                 <button
//                   type="button"
//                   onClick={closeForm}
//                   className="px-3 py-2 border border-sidebar-border rounded-md text-white hover:bg-sidebar-accent"
//                 >
//                   Cancel
//                 </button>

//                 <button
//                   type="submit"
//                   disabled={submitting}
//                   className="flex items-center gap-2 px-4 py-2 bg-threat text-white rounded-md hover:opacity-90"
//                 >
//                   <PlusCircle className="h-4 w-4" />
//                   {submitting ? "Saving..." : "Save Record"}
//                 </button>
//               </div>
//             </form>
//           </div>
//         </div>
//       )}
//     </main>
//   );
// }










import React, { useCallback, useState } from "react";
import { User, PlusCircle } from "lucide-react";
import { PersonRecord } from "@/components/missingwanted/types";
import Gallery from "@/components/missingwanted/Gallery";
import AddPersonModal from "@/components/missingwanted/AddPersonModal";

/* small uid helper */
const uid = (prefix = "") => prefix + Date.now().toString(36) + "-" + Math.random().toString(36).slice(2, 8);

export default function MissingWantedPage() {
  const [records, setRecords] = useState<PersonRecord[]>([]);
  const [open, setOpen] = useState(false);

  const handleAdd = useCallback((rec: PersonRecord) => {
    setRecords((prev) => [rec, ...prev]);
  }, []);

  return (
    <main className="p-6">
      <div className="flex justify-between items-start mb-6">
        <div>
          <h1 className="text-2xl font-bold text-sidebar-foreground flex items-center gap-2">
            <User className="h-5 w-5" />
            Missing / Wanted Persons
          </h1>
          <p className="text-sm text-muted-foreground mt-1">Manage missing and wanted persons</p>
        </div>

        <button onClick={() => setOpen(true)} className="flex items-center gap-2 px-4 py-2 bg-threat text-white rounded-md hover:opacity-90">
          <PlusCircle className="h-4 w-4" />
          Add Person
        </button>
      </div>

      <section>
        <Gallery records={records} />
      </section>

      <AddPersonModal open={open} onClose={() => setOpen(false)} onAdd={handleAdd} uid={uid} />
    </main>
  );
}
