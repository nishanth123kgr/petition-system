import { Badge } from "@/components/ui/badge"

interface DepartmentStatusBadgeProps {
  status: string
}

export const DepartmentStatusBadge = ({ status }: DepartmentStatusBadgeProps) => {
  return (
    <Badge 
      variant={status === "Active" ? "default" : "secondary"}
      className={status === "Active" 
        ? "bg-green-900/60 text-green-200 hover:bg-green-900/80 border-0" 
        : "bg-slate-700 text-slate-300 hover:bg-slate-600 border-0"}
    >
      {status}
    </Badge>
  );
};