"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"

interface SuperAdminPetitionContentProps {
    petitions: Array<{
        id: number
        title: string
        submittedBy?: string
        department: string
        status: string
        priority?: string
        createdAt: string
    }>
}

const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
        y: 0,
        opacity: 1,
        transition: { type: "spring", stiffness: 100 }
    }
}

export function SuperAdminPetitionContent({ petitions }: SuperAdminPetitionContentProps) {

    const [petition, setPetition] = useState(petitions)
      const [searchTerm, setSearchTerm] = useState("")
      const [departmentFilter, setDepartmentFilter] = useState("all")
      const [statusFilter, setStatusFilter] = useState("all")
    
      const filteredPetitions = petitions.filter((petition) => {
        const matchesSearch =
          petition.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
          (petition.submittedBy?.toLowerCase() || '').includes(searchTerm.toLowerCase())
    
        const matchesDepartment =
          departmentFilter === "all" || petition.department.toLowerCase() === departmentFilter.toLowerCase()
    
        const matchesStatus = statusFilter === "all" || petition.status.toLowerCase() === statusFilter.toLowerCase()
    
        return matchesSearch && matchesDepartment && matchesStatus
      })

    return (<motion.div variants={itemVariants}>
        <Card className="bg-slate-900/70 backdrop-blur-sm border-slate-800/50 hover:border-violet-500/30 transition-all duration-300 hover:shadow-[0_0_15px_rgba(139,92,246,0.1)] overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-violet-600/5 to-indigo-600/5 z-0" />
            {/* <CardHeader className="relative z-10">
                <CardTitle className="text-slate-100">All Petitions</CardTitle>
                <CardDescription className="text-slate-400">
                    View and manage petitions across all departments
                </CardDescription>
            </CardHeader> */}
            <CardContent className="relative z-10 mt-6">
                <div className="p-4 bg-slate-900/60 backdrop-blur-sm border border-slate-800/50 rounded-lg shadow-lg mb-6">
                    <div className="flex flex-col sm:flex-row gap-4">
                        <div className="flex-1 relative">
                            <Input
                                placeholder="Search petitions..."
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                className="bg-slate-800/70 border-slate-700/50 text-slate-200 focus-visible:ring-violet-500/70 focus-visible:ring-offset-slate-900 placeholder:text-slate-500 pr-10"
                            />
                            <div className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-500">
                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                    <circle cx="11" cy="11" r="8"></circle>
                                    <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
                                </svg>
                            </div>
                        </div>
                        <Select value={departmentFilter} onValueChange={setDepartmentFilter}>
                            <SelectTrigger className="w-[180px] bg-slate-800/70 border-slate-700/50 text-slate-200 focus:ring-violet-500/70 focus:ring-offset-slate-900">
                                <SelectValue placeholder="Department" />
                            </SelectTrigger>
                            <SelectContent className="bg-slate-800 border-slate-700 text-slate-200">
                                <SelectItem value="all">All Departments</SelectItem>
                                <SelectItem value="infrastructure">Infrastructure</SelectItem>
                                <SelectItem value="education">Education</SelectItem>
                                <SelectItem value="healthcare">Healthcare</SelectItem>
                                <SelectItem value="environment">Environment</SelectItem>
                                <SelectItem value="public safety">Public Safety</SelectItem>
                            </SelectContent>
                        </Select>
                        <Select value={statusFilter} onValueChange={setStatusFilter}>
                            <SelectTrigger className="w-[180px] bg-slate-800/70 border-slate-700/50 text-slate-200 focus:ring-violet-500/70 focus:ring-offset-slate-900">
                                <SelectValue placeholder="Status" />
                            </SelectTrigger>
                            <SelectContent className="bg-slate-800 border-slate-700 text-slate-200">
                                <SelectItem value="all">All Statuses</SelectItem>
                                <SelectItem value="new">New</SelectItem>
                                <SelectItem value="in progress">In Progress</SelectItem>
                                <SelectItem value="completed">Completed</SelectItem>
                            </SelectContent>
                        </Select>
                    </div>
                </div>

                <div className="overflow-x-auto bg-slate-900/60 backdrop-blur-sm border border-slate-800/50 rounded-lg shadow-lg">
                    <table className="w-full">
                        <thead>
                            <tr className="border-b border-slate-800">
                                <th className="text-left py-3 px-4 text-slate-300 font-medium">ID</th>
                                <th className="text-left py-3 px-4 text-slate-300 font-medium">Title</th>
                                <th className="text-left py-3 px-4 text-slate-300 font-medium">Department</th>
                                <th className="text-left py-3 px-4 text-slate-300 font-medium">Submitted By</th>
                                <th className="text-left py-3 px-4 text-slate-300 font-medium">Status</th>
                                <th className="text-left py-3 px-4 text-slate-300 font-medium">Priority</th>
                                <th className="text-left py-3 px-4 text-slate-300 font-medium">Date</th>
                                <th className="text-left py-3 px-4 text-slate-300 font-medium">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {filteredPetitions.map((petition) => (
                                <tr key={petition.id} className="border-b border-slate-800 hover:bg-slate-800/30 transition-colors">
                                    <td className="py-3 px-4 text-slate-300">{petition.id}</td>
                                    <td className="py-3 px-4 text-slate-300">{petition.title}</td>
                                    <td className="py-3 px-4 text-slate-300">{petition.department}</td>
                                    <td className="py-3 px-4 text-slate-300">{petition.submittedBy}</td>
                                    <td className="py-3 px-4">
                                        <StatusBadge status={petition.status} />
                                    </td>
                                    <td className="py-3 px-4">
                                        <PriorityBadge priority={petition.priority} />
                                    </td>
                                    <td className="py-3 px-4 text-slate-300">{petition.createdAt}</td>
                                    <td className="py-3 px-4">
                                        <Button
                                            variant="outline"
                                            size="sm"
                                            className="relative overflow-hidden group border-slate-700 text-slate-300 hover:border-violet-500/50 hover:text-slate-100"
                                        >
                                            <span className="relative z-10">View</span>
                                            <span className="absolute inset-0 h-full w-full scale-0 rounded-md bg-violet-500/10 transition-all duration-300 group-hover:scale-100 group-hover:opacity-100" />
                                        </Button>
                                    </td>
                                </tr>
                            ))}
                            {filteredPetitions.length === 0 && (
                                <tr>
                                    <td colSpan={8} className="py-8 text-center text-slate-400">
                                        No petitions found matching your criteria
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </CardContent>
        </Card>
    </motion.div>)
}


function StatusBadge({ status }: { status: string }) {
    let bgColor = "bg-slate-700"
    let textColor = "text-slate-200"
  
    switch (status) {
      case "New":
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
  
  function PriorityBadge({ priority }: { priority?: string }) {
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
        {priority || "N/A"}
      </span>
    )
  }
