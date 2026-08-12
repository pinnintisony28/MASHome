type StatusBadgeProps = {
  status: string;
};

export default function StatusBadge({
  status,
}: StatusBadgeProps) {
  let style =
    "bg-slate-100 text-slate-700";

  switch (status.toLowerCase()) {
    case "successful":
    case "approved":
      style = "bg-green-100 text-green-700";
      break;

    case "clinical trial":
    case "phase 3":
    case "phase iii":
      style = "bg-blue-100 text-blue-700";
      break;

    case "preclinical":
      style = "bg-yellow-100 text-yellow-700";
      break;

    case "discontinued":
    case "terminated":
      style = "bg-red-100 text-red-700";
      break;
  }

  return (
    <span
      className={`rounded-full px-3 py-1 text-xs font-semibold ${style}`}
    >
      {status}
    </span>
  );
}