import { Building } from "lucide-react"

export const EmptyState = () => {
  return (
    <div className="text-center py-12 bg-slate-900/60 backdrop-blur-sm border border-slate-800/50 rounded-lg">
      <Building className="mx-auto h-12 w-12 text-slate-600" />
      <h3 className="mt-4 text-lg font-medium text-slate-300">No departments found</h3>
      <p className="mt-2 text-sm text-slate-400">No departments match your search criteria</p>
    </div>
  );
};