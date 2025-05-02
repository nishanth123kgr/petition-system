'use client'

import { useState } from "react"
import { motion } from "framer-motion"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { StaffPetitionCard } from "@/components/ui/staff-petition-card"

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

interface StaffDashboardContentProps {
  petitions: Array<{
    id: number
    title: string
    submittedBy: string
    status: string
    priority: string
    assignedDate: string
    dueDate: string
    description: string
  }>
  onUpdateStatus: (id: number, newStatus: string) => void
}

export function StaffDashboardContent({ petitions, onUpdateStatus }: StaffDashboardContentProps) {
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
  
  return (
    <div className="p-6 space-y-6">
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
                  <div className="text-2xl font-bold text-white">
                    {petitions.filter(p => new Date(p.dueDate) < new Date(Date.now() + 7 * 24 * 60 * 60 * 1000)).length}
                  </div>
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

        {/* <motion.div variants={itemVariants}>
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
                <StaffPetitionCard petition={petition} onUpdateStatus={onUpdateStatus} />
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
        </motion.div> */}
      </motion.div>
    </div>
  )
}