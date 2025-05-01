"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { StaffDashboardLayout } from "@/components/layouts/staff-dashboard-layout"

// Mock data for staff assigned petitions
const mockPetitions = [
  {
    id: 301,
    title: "Road Repair on Main Street",
    submittedBy: "John Doe",
    status: "In Progress",
    priority: "High",
    assignedDate: "2023-04-16",
    dueDate: "2023-04-30",
    description: "The road on Main Street has several potholes that need to be fixed urgently.",
  },
  {
    id: 302,
    title: "Sidewalk Repair on Oak Avenue",
    submittedBy: "Jane Smith",
    status: "Not Started",
    priority: "Medium",
    assignedDate: "2023-04-15",
    dueDate: "2023-05-05",
    description: "The sidewalk on Oak Avenue is damaged and poses a risk to pedestrians.",
  },
  {
    id: 303,
    title: "Street Light Maintenance",
    submittedBy: "Robert Johnson",
    status: "In Progress",
    priority: "Low",
    assignedDate: "2023-04-10",
    dueDate: "2023-04-25",
    description: "Several street lights on Pine Street are not working and need to be replaced.",
  },
]

// Animation variants
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      delayChildren: 0.1,
      staggerChildren: 0.1
    }
  }
}

const itemVariants = {
  hidden: { y: 20, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: { type: "spring", stiffness: 100 }
  }
}

const statsVariants = {
  hidden: { scale: 0.8, opacity: 0 },
  visible: {
    scale: 1,
    opacity: 1,
    transition: { type: "spring", stiffness: 80 }
  }
}

export default function StaffDashboardPage() {
  const [petitions, setPetitions] = useState(mockPetitions)
  const [searchTerm, setSearchTerm] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")

  const filteredPetitions = petitions.filter((petition) => {
    const matchesSearch =
      petition.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      petition.submittedBy.toLowerCase().includes(searchTerm.toLowerCase())

    const matchesStatus =
      statusFilter === "all" || petition.status.toLowerCase().replace(" ", "-") === statusFilter.toLowerCase()

    return matchesSearch && matchesStatus
  })

  const handleUpdateStatus = (id: number, newStatus: string) => {
    setPetitions(petitions.map((petition) => (petition.id === id ? { ...petition, status: newStatus } : petition)))
  }

  return (
    <StaffDashboardLayout>
      <div className="relative p-6 space-y-6 min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950">
        {/* Background decorative elements */}
        <div className="absolute top-20 right-10 w-72 h-72 bg-violet-600/5 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-10 left-10 w-80 h-80 bg-indigo-600/5 rounded-full blur-3xl pointer-events-none" />
        
        <motion.div 
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="relative z-10 space-y-8"
        >
          <motion.div variants={itemVariants}>
            <div className="space-y-2">
              <h1 className="text-3xl font-bold bg-gradient-to-r from-violet-200 to-indigo-200 bg-clip-text text-transparent">
                Staff Dashboard
              </h1>
              <p className="text-slate-400">
                Manage your assigned petitions and track your progress
              </p>
            </div>
          </motion.div>

          <motion.div variants={itemVariants}>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <motion.div variants={statsVariants}>
                <Card className="bg-slate-900/60 backdrop-blur-sm border-slate-800/50 overflow-hidden hover:border-violet-500/30 transition-all duration-300 hover:shadow-[0_0_15px_rgba(139,92,246,0.1)]">
                  <div className="absolute inset-0 bg-gradient-to-br from-violet-600/5 to-indigo-600/5 z-0" />
                  <CardHeader className="pb-2 relative z-10">
                    <CardTitle className="text-sm font-medium text-slate-300">Assigned Petitions</CardTitle>
                  </CardHeader>
                  <CardContent className="relative z-10">
                    <div className="text-2xl font-bold text-white">{petitions.length}</div>
                    <div className="text-xs text-slate-400 mt-1">Total petitions</div>
                  </CardContent>
                  <div className="absolute -bottom-4 -right-4 w-16 h-16 rounded-full bg-violet-500/10 flex items-center justify-center">
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-violet-300">
                      <path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2"></path>
                      <rect width="8" height="4" x="8" y="2" rx="1" ry="1"></rect>
                      <path d="M12 11h4"></path>
                      <path d="M12 16h4"></path>
                      <path d="M8 11h.01"></path>
                      <path d="M8 16h.01"></path>
                    </svg>
                  </div>
                </Card>
              </motion.div>

              <motion.div variants={statsVariants}>
                <Card className="bg-slate-900/60 backdrop-blur-sm border-slate-800/50 overflow-hidden hover:border-violet-500/30 transition-all duration-300 hover:shadow-[0_0_15px_rgba(139,92,246,0.1)]">
                  <div className="absolute inset-0 bg-gradient-to-br from-violet-600/5 to-indigo-600/5 z-0" />
                  <CardHeader className="pb-2 relative z-10">
                    <CardTitle className="text-sm font-medium text-slate-300">In Progress</CardTitle>
                  </CardHeader>
                  <CardContent className="relative z-10">
                    <div className="text-2xl font-bold text-white">
                      {petitions.filter((p) => p.status === "In Progress").length}
                    </div>
                    <div className="text-xs text-slate-400 mt-1">Active petitions</div>
                  </CardContent>
                  <div className="absolute -bottom-4 -right-4 w-16 h-16 rounded-full bg-indigo-500/10 flex items-center justify-center">
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-indigo-300">
                      <path d="M12 2v4"></path>
                      <path d="M12 18v4"></path>
                      <path d="m4.93 4.93 2.83 2.83"></path>
                      <path d="m16.24 16.24 2.83 2.83"></path>
                      <path d="M2 12h4"></path>
                      <path d="M18 12h4"></path>
                      <path d="m4.93 19.07 2.83-2.83"></path>
                      <path d="m16.24 7.76 2.83-2.83"></path>
                    </svg>
                  </div>
                </Card>
              </motion.div>

              <motion.div variants={statsVariants}>
                <Card className="bg-slate-900/60 backdrop-blur-sm border-slate-800/50 overflow-hidden hover:border-violet-500/30 transition-all duration-300 hover:shadow-[0_0_15px_rgba(139,92,246,0.1)]">
                  <div className="absolute inset-0 bg-gradient-to-br from-violet-600/5 to-indigo-600/5 z-0" />
                  <CardHeader className="pb-2 relative z-10">
                    <CardTitle className="text-sm font-medium text-slate-300">Due Soon</CardTitle>
                  </CardHeader>
                  <CardContent className="relative z-10">
                    <div className="text-2xl font-bold text-white">2</div>
                    <div className="text-xs text-slate-400 mt-1">Within 7 days</div>
                  </CardContent>
                  <div className="absolute -bottom-4 -right-4 w-16 h-16 rounded-full bg-red-500/10 flex items-center justify-center">
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-red-300">
                      <circle cx="12" cy="12" r="10"></circle>
                      <line x1="12" x2="12" y1="8" y2="12"></line>
                      <line x1="12" x2="12.01" y1="16" y2="16"></line>
                    </svg>
                  </div>
                </Card>
              </motion.div>
            </div>
          </motion.div>

          <motion.div variants={itemVariants}>
            <div className="p-4 bg-slate-900/60 backdrop-blur-sm border border-slate-800/50 rounded-lg shadow-lg">
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
                      <circle cx="11" cy="11" r="8"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line>
                    </svg>
                  </div>
                </div>
                <Select value={statusFilter} onValueChange={setStatusFilter}>
                  <SelectTrigger className="w-[180px] bg-slate-800/70 border-slate-700/50 text-slate-200 focus:ring-violet-500/70 focus:ring-offset-slate-900">
                    <SelectValue placeholder="Filter by status" />
                  </SelectTrigger>
                  <SelectContent className="bg-slate-800 border-slate-700 text-slate-200">
                    <SelectItem value="all">All Statuses</SelectItem>
                    <SelectItem value="not-started">Not Started</SelectItem>
                    <SelectItem value="in-progress">In Progress</SelectItem>
                    <SelectItem value="completed">Completed</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </motion.div>

          <motion.div variants={itemVariants} className="space-y-4">
            {filteredPetitions.length > 0 ? (
              filteredPetitions.map((petition, index) => (
                <motion.div 
                  key={petition.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 * index, duration: 0.5 }}
                >
                  <StaffPetitionCard petition={petition} onUpdateStatus={handleUpdateStatus} />
                </motion.div>
              ))
            ) : (
              <div className="text-center py-12 bg-slate-900/60 backdrop-blur-sm border border-slate-800/50 rounded-lg shadow-lg">
                <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-slate-800/80 mb-4">
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-slate-400">
                    <circle cx="11" cy="11" r="8"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line>
                  </svg>
                </div>
                <p className="text-slate-400 font-medium">No petitions found matching your criteria</p>
                <p className="text-slate-500 text-sm mt-1">Try adjusting your search or filter settings</p>
              </div>
            )}
          </motion.div>
        </motion.div>
      </div>
    </StaffDashboardLayout>
  )
}

function StaffPetitionCard({
  petition,
  onUpdateStatus,
}: {
  petition: any
  onUpdateStatus: (id: number, status: string) => void
}) {
  return (
    <Card className="bg-slate-900/70 backdrop-blur-sm border-slate-800/50 hover:border-violet-500/30 transition-all duration-300 hover:shadow-[0_0_15px_rgba(139,92,246,0.1)] overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-violet-600/5 to-indigo-600/5 z-0" />
      
      <CardHeader className="relative z-10">
        <div className="flex flex-col sm:flex-row justify-between items-start gap-2">
          <div>
            <CardTitle className="text-slate-100">{petition.title}</CardTitle>
            <CardDescription className="text-slate-400">
              Submitted by {petition.submittedBy} • Assigned on {petition.assignedDate}
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
          <Button variant="outline" className="border-slate-700 text-slate-300 hover:bg-slate-800 hover:text-slate-100">
            Add Notes
          </Button>
          <Button className="relative overflow-hidden group bg-gradient-to-r from-violet-600 to-indigo-600 hover:from-violet-500 hover:to-indigo-500 text-white shadow-lg shadow-violet-900/30 transition-all duration-300">
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
