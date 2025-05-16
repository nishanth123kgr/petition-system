import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { StatusBadge } from "./petitions-content"
import { Calendar } from "@/components/ui/calendar"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { format } from "date-fns"
import { CalendarIcon } from "lucide-react"
import { useState } from "react"


export function DepartmentPetitionCard({
    petition,
    onUpdateStatus,
    onViewDetails,
    isLoading,
    onAssignStaff,
    onUpdateDueDate
}: {
    petition: any
    onUpdateStatus: (id: number, status: string) => void
    onViewDetails: (id: number) => void
    isLoading: boolean
    onAssignStaff: () => void
    onUpdateDueDate?: (id: number, dueDate: Date) => void
}) {
    const [dueDate, setDueDate] = useState<Date | undefined>(
        petition.due_date ? new Date(petition.due_date) : undefined
    );
    const [isDatePickerOpen, setIsDatePickerOpen] = useState(false);

    const handleDueDateChange = (date: Date | undefined) => {
        if (date && onUpdateDueDate) {
            setDueDate(date);
            onUpdateDueDate(petition.id, date);
            setIsDatePickerOpen(false);
        }
    };

    return (
        <Card className="bg-slate-900/70 backdrop-blur-sm border-slate-800/50 hover:border-violet-500/30 transition-all duration-300 hover:shadow-[0_0_15px_rgba(139,92,246,0.1)] overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-violet-600/5 to-indigo-600/5 z-0" />

            <CardHeader className="relative z-10">
                <div className="flex flex-col sm:flex-row justify-between items-start gap-2">
                    <div>
                        <CardTitle className="text-slate-100">{petition.title}</CardTitle>
                        <CardDescription className="text-slate-400 mt-2 flex items-center gap-2">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-slate-500" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
                                <circle cx="12" cy="7" r="4"></circle>
                            </svg> {petition.submitted_by}
                            <span className="mx-2 text-slate-500">•</span>
                            <span className="flex items-center">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-violet-400 mr-1" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                    <path d="M16 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path>
                                    <circle cx="8.5" cy="7" r="4"></circle>
                                    <line x1="20" y1="8" x2="20" y2="14"></line>
                                    <line x1="23" y1="11" x2="17" y2="11"></line>
                                </svg>
                                {petition.assigned_to ? (
                                    <span className="text-violet-300">Assigned to: <span className="font-medium">{petition.assigned_to}</span></span>
                                ) : (
                                    <span className="ml-2">Not Assigned</span>
                                )}
                            </span>
                        </CardDescription>
                    </div>
                    <div className="flex flex-wrap gap-2">
                        <PriorityBadge priority={petition.severity} />
                        <StatusBadge status={petition.status} />
                    </div>
                </div>
            </CardHeader>
            <CardContent className="relative z-10 text-slate-300">
                <p>{petition.description}</p>
            </CardContent>
            <CardFooter className="relative z-10 flex flex-wrap justify-between gap-2">
                <div>
                    <Select
                        defaultValue={petition.status.toLowerCase().replace(" ", "-")}
                        onValueChange={(value) => {
                            const statusMap: Record<string, string> = {
                                new: "New",
                                "in-progress": "In Progress",
                                completed: "Completed",
                                rejected: "Rejected",
                            }
                            onUpdateStatus(petition.id, statusMap[value])
                        }}
                        disabled={isLoading}
                    >
                        <SelectTrigger className="w-[180px] bg-slate-800/70 border-slate-700/50 text-slate-200 focus:ring-violet-500/70 focus:ring-offset-slate-900">
                            {isLoading ? (
                                <div className="flex items-center justify-center">
                                    <svg className="animate-spin h-4 w-4 text-violet-400 mr-2" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                    </svg>
                                    <span>Updating...</span>
                                </div>
                            ) : (
                                <SelectValue placeholder="Update status" />
                            )}
                        </SelectTrigger>
                        <SelectContent className="bg-slate-800 border-slate-700 text-slate-200">
                            <SelectItem value="new">New</SelectItem>
                            <SelectItem value="in-progress">In Progress</SelectItem>
                            <SelectItem value="completed">Completed</SelectItem>
                            <SelectItem value="rejected">Rejected</SelectItem>
                        </SelectContent>
                    </Select>
                </div>
                <div className="flex gap-2">
                    <Popover open={isDatePickerOpen} onOpenChange={setIsDatePickerOpen}>
                        <PopoverTrigger asChild>
                            <Button
                                variant="outline"
                                className="bg-transparent border-violet-500/50 text-violet-300 hover:bg-violet-600/10 hover:border-violet-400 hover:text-white transition-all duration-300"
                                disabled={isLoading}
                                aria-label={`Set due date for petition: ${petition.title}`}
                            >
                                <CalendarIcon className="mr-2 h-4 w-4" />
                                {dueDate ? format(dueDate, "PPP") : "Set Due Date"}
                            </Button>
                        </PopoverTrigger>
                        <PopoverContent className="w-auto p-0" align="start">
                            <Calendar
                                mode="single"
                                selected={dueDate}
                                onSelect={handleDueDateChange}
                                disabled={isLoading}
                                initialFocus
                            />
                        </PopoverContent>
                    </Popover>
                    
                    <Button
                        variant="outline"
                        className="bg-transparent border-violet-500/50 text-violet-300 hover:bg-violet-600/10 hover:border-violet-400 hover:text-white transition-all duration-300"
                        onClick={onAssignStaff}
                        disabled={isLoading}
                        aria-label={`Reassign staff for petition: ${petition.title}`}
                    >
                        {petition.assigned_to ? "Reassign Staff" : "Assign Staff"}
                    </Button>
                    <Button
                        className="relative overflow-hidden group bg-gradient-to-r from-violet-600 to-indigo-600 hover:from-violet-500 hover:to-indigo-500 text-white shadow-lg shadow-violet-900/30 transition-all duration-300"
                        onClick={() => onViewDetails(petition.id)}
                        disabled={isLoading}
                    >
                        <span className="relative z-10">View Details</span>
                        <span className="absolute inset-0 h-full w-full scale-0 rounded-full bg-white/10 transition-all duration-300 group-hover:scale-100 group-hover:opacity-100" />
                    </Button>
                </div>
            </CardFooter>
        </Card>
    )
}

function PriorityBadge({ priority }: { priority: string }) {
    let className = "bg-slate-700 text-slate-200"

    switch (priority) {
        case "High":
            className = "bg-red-900/60 text-red-200"
            break
        case "Medium":
            className = "bg-amber-900/60 text-amber-200"
            break
        case "Low":
            className = "bg-green-900/60 text-green-200"
            break
    }

    return (
        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${className}`}>
            {priority}
        </span>
    )
}
