'use client'

import { useState } from "react"
import { motion } from "framer-motion"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

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

interface UserDashboardContentProps {
  petitions: Array<{
    id: number
    title: string
    status: string
    department: string
    created_at: string
    description: string
  }>      
}

export function UserDashboardContent({ petitions = [] }: UserDashboardContentProps) {
  // const [searchTerm, setSearchTerm] = useState("")
  // const [statusFilter, setStatusFilter] = useState("all")

  // const filteredPetitions = petitions.filter((petition) => {
  //   const matchesSearch =
  //     petition.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
  //     petition.department.toLowerCase().includes(searchTerm.toLowerCase())

  //   const matchesStatus =
  //     statusFilter === "all" || petition.status.toLowerCase().replace(" ", "-") === statusFilter.toLowerCase()

  //   return matchesSearch && matchesStatus
  // })

  // Safely handle petitions if it's undefined or not an array
  const petitionsArray = Array.isArray(petitions) ? petitions : []
  
  console.log("Petitions:", petitionsArray)
  
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
              User Dashboard
            </h1>
            <p className="text-slate-400">
              Track and manage your petition requests
            </p>
          </div>
        </motion.div>

        <motion.div variants={itemVariants}>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <motion.div variants={statsVariants}>
              <Card className="bg-slate-900/60 backdrop-blur-sm border-slate-800/50 overflow-hidden hover:border-violet-500/30 transition-all duration-300 hover:shadow-[0_0_15px_rgba(139,92,246,0.1)]">
                <div className="absolute inset-0 bg-gradient-to-br from-violet-600/5 to-indigo-600/5 z-0" />
                <CardHeader className="pb-2 relative z-10">
                  <CardTitle className="text-sm font-medium text-slate-300">My Petitions</CardTitle>
                </CardHeader>
                <CardContent className="relative z-10">
                  <div className="text-2xl font-bold text-white">{petitionsArray.length}</div>
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
                    {petitionsArray.filter((p) => p.status === "In Progress" || p.status === "Assigned").length}
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
                  <CardTitle className="text-sm font-medium text-slate-300">Completed</CardTitle>
                </CardHeader>
                <CardContent className="relative z-10">
                  <div className="text-2xl font-bold text-white">
                    {petitionsArray.filter(p => p.status === "Completed").length}
                  </div>
                  <div className="text-xs text-slate-400 mt-1">Resolved petitions</div>
                </CardContent>
                <div className="absolute -bottom-4 -right-4 w-16 h-16 rounded-full bg-green-500/10 flex items-center justify-center">
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-green-300">
                    <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
                    <polyline points="22 4 12 14.01 9 11.01"></polyline>
                  </svg>
                </div>
              </Card>
            </motion.div>
          </div>
        </motion.div>
      </motion.div>
    </div>
  )
}