'use client'

import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

interface StaffPetitionCardProps {
  petition: {
    id: number
    title: string
    submittedBy: string
    status: string
    priority: string
    assignedDate: string
    dueDate: string
    description: string
  }
  onUpdateStatus: (id: number, status: string) => void
  onViewDetails?: (id: number) => void
}

export function StaffPetitionCard({ petition, onUpdateStatus, onViewDetails }: StaffPetitionCardProps) {
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
                            </svg> {petition.submittedBy}
                            <span className="mx-2 text-slate-500">•</span>
                            <span className="flex items-center">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-violet-400 mr-1" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                    <rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect>
                                    <line x1="16" y1="2" x2="16" y2="6"></line>
                                    <line x1="8" y1="2" x2="8" y2="6"></line>
                                    <line x1="3" y1="10" x2="21" y2="10"></line>
                                </svg>
                                <span className="text-violet-300">Assigned on: <span className="font-medium">{petition.assignedDate}</span></span>
                            </span>
                        </CardDescription>
          </div>
          <div className="flex flex-wrap gap-2">
            <PriorityBadge priority={petition.priority} />
            <StatusBadge status={petition.status} />
          </div>
        </div>
      </CardHeader>
      <CardContent className="relative z-10 text-slate-300">
        <div className="space-y-4">
          <p>{petition.description}</p>
          <div className="flex items-center justify-between p-3 bg-slate-800/50 rounded-md border border-slate-700/30">
            <div className="text-sm">
              <span className="text-slate-400">Due Date: </span>
              <span className="font-medium text-slate-200">{petition.dueDate}</span>
            </div>
            <div>
              {new Date(petition.dueDate) < new Date(Date.now() + 7 * 24 * 60 * 60 * 1000) && (
                <Badge className="bg-red-900/60 text-red-200 border-0">Due Soon</Badge>
              )}
            </div>
          </div>
        </div>
      </CardContent>
      <CardFooter className="relative z-10 flex flex-wrap justify-between gap-2">
        <div>
          <Select
            defaultValue={petition.status.toLowerCase().replace(" ", "-")}
            onValueChange={(value) => {
              const statusMap: Record<string, string> = {
                "not-started": "Not Started",
                "in-progress": "In Progress",
                completed: "Completed",
              }
              onUpdateStatus(petition.id, statusMap[value])
            }}
          >
            <SelectTrigger className="w-[180px] bg-slate-800/70 border-slate-700/50 text-slate-200 focus:ring-violet-500/70 focus:ring-offset-slate-900">
              <SelectValue placeholder="Update status" />
            </SelectTrigger>
            <SelectContent className="bg-slate-800 border-slate-700 text-slate-200">
              <SelectItem value="not-started">Not Started</SelectItem>
              <SelectItem value="in-progress">In Progress</SelectItem>
              <SelectItem value="completed">Completed</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div className="flex gap-2">
          <Button 
            className="relative overflow-hidden group bg-gradient-to-r from-violet-600 to-indigo-600 hover:from-violet-500 hover:to-indigo-500 text-white shadow-lg shadow-violet-900/30 transition-all duration-300"
            onClick={() => onViewDetails && onViewDetails(petition.id)}
          >
            <span className="relative z-10">View Details</span>
            <span className="absolute inset-0 h-full w-full scale-0 rounded-full bg-white/10 transition-all duration-300 group-hover:scale-100 group-hover:opacity-100" />
          </Button>
        </div>
      </CardFooter>
    </Card>
  )
}

function StatusBadge({ status }: { status: string }) {
  let bgColor = "bg-slate-700"
  let textColor = "text-slate-200"

  switch (status) {
    case "Not Started":
      bgColor = "bg-indigo-900/60"
      textColor = "text-indigo-200"
      break
    case "In Progress":
      bgColor = "bg-violet-900/60"
      textColor = "text-violet-200"
      break
    case "Completed":
      bgColor = "bg-emerald-900/60"
      textColor = "text-emerald-200"
      break
  }

  return <Badge className={`${bgColor} ${textColor} border-0`}>{status}</Badge>
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