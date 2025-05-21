import { Avatar, AvatarFallback } from "@/components/ui/avatar"

interface DepartmentAdminProps {
  name: string
  email: string
}

export const DepartmentAdmin = ({ name, email }: DepartmentAdminProps) => {
  return (
    <div className="flex items-center my-4">
      <Avatar className="h-10 w-10 border border-slate-700/60">
        <AvatarFallback className="bg-violet-900/30 text-violet-200">
          {name.split(" ").map(n => n[0]).join("").toUpperCase()}
        </AvatarFallback>
      </Avatar>
      <div className="ml-3">
        <p className="text-sm font-medium text-slate-200">{name}</p>
        <p className="text-xs text-slate-400">{email}</p>
      </div>
    </div>
  );
};