// import {
//   CheckCircle2,
//   Clock3,
//   Sparkles,
// } from "lucide-react";

// const updates = [
//   {
//     title: "Targets Module Completed",
//     description:
//       "Advanced search, filtering, detailed target profiles, and related drug exploration are now available.",
//     status: "Completed",
//     icon: CheckCircle2,
//     color: "text-green-600",
//     bg: "bg-green-100",
//   },
//   {
//     title: "Drugs Module",
//     description:
//       "The Drugs module is the next major component under active development.",
//     status: "In Progress",
//     icon: Clock3,
//     color: "text-amber-600",
//     bg: "bg-amber-100",
//   },
//   {
//     title: "Future Enhancements",
//     description:
//       "Genes, Biomarkers, Bioactives, Clinical Trials, Literature, and Dashboard analytics are planned.",
//     status: "Upcoming",
//     icon: Sparkles,
//     color: "text-blue-600",
//     bg: "bg-blue-100",
//   },
// ];

// export default function RecentUpdates() {
//   return (
//     <section className="mt-24">
//       <div className="text-center">
//         <h2
//           className="text-4xl font-bold text-slate-900"
//           style={{ fontFamily: "Roboto Slab" }}
//         >
//           Project Progress
//         </h2>

//         <p className="mt-3 text-lg text-slate-600">
//           Current development milestones of the MASHome platform.
//         </p>
//       </div>

//       <div className="mt-12 grid gap-8 lg:grid-cols-3">
//         {updates.map((item) => {
//           const Icon = item.icon;

//           return (
//             <div
//               key={item.title}
//               className="rounded-2xl border border-slate-200 bg-white p-8 shadow-sm transition-all duration-300 hover:-translate-y-2 hover:shadow-lg"
//             >
//               <div
//                 className={`inline-flex rounded-xl ${item.bg} p-4`}
//               >
//                 <Icon
//                   size={30}
//                   className={item.color}
//                 />
//               </div>

//               <h3
//                 className="mt-6 text-2xl font-bold text-slate-900"
//                 style={{ fontFamily: "Roboto Slab" }}
//               >
//                 {item.title}
//               </h3>

//               <p className="mt-4 leading-7 text-slate-600">
//                 {item.description}
//               </p>

//               <span
//                 className={`mt-6 inline-block rounded-full ${item.bg} px-4 py-2 text-sm font-semibold ${item.color}`}
//               >
//                 {item.status}
//               </span>
//             </div>
//           );
//         })}
//       </div>
//     </section>
//   );
// }