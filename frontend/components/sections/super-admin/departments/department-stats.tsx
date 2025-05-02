interface DepartmentStatsProps {
  staffCount: number
  activePetitions: number
}

export const DepartmentStats = ({ staffCount, activePetitions }: DepartmentStatsProps) => {
  return (
    <div className="grid grid-cols-2 gap-4 text-center my-4">
      <div className="p-2 bg-slate-800/40 rounded-md">
        <div className="text-sm text-slate-400">Staff</div>
        <div className="text-xl font-semibold text-slate-200">{staffCount}</div>
      </div>
      <div className="p-2 bg-slate-800/40 rounded-md">
        <div className="text-sm text-slate-400">Active Petitions</div>
        <div className="text-xl font-semibold text-slate-200">{activePetitions}</div>
      </div>
    </div>
  );
};