'use client'

import { useState, useMemo } from "react"
import { motion } from "framer-motion"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { 
  BarChart, Bar, 
  PieChart, Pie, Cell,
  ResponsiveContainer, 
  CartesianGrid, 
  XAxis, YAxis, 
  Tooltip, Legend 
} from "recharts"

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

const COLORS = ['#8b5cf6', '#6366f1', '#3b82f6', '#ec4899'];

interface SuperAdminDashboardContentProps {
  petitions: Array<{
      id: number
      title: string
      status: string
      department: string
      created_at: string
      description: string
      severity: string,
      submitted_by: string
      assigned_to: string
  }>
}

export function SuperAdminDashboardContent({ petitions }: SuperAdminDashboardContentProps)  {
  const [searchTerm, setSearchTerm] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")

  // Calculate statistics from real data
  const stats = useMemo(() => {
    // Count petitions by status
    const statusCounts = {
      new: petitions.filter(p => p.status.toLowerCase() === 'new').length,
      inProgress: petitions.filter(p => p.status.toLowerCase() === 'in progress').length,
      completed: petitions.filter(p => p.status.toLowerCase() === 'completed').length,
      rejected: petitions.filter(p => p.status.toLowerCase() === 'rejected').length,
    }
    
    // Total count
    const total = petitions.length
    
    // Generate department data for chart
    const departmentMap = new Map()
    petitions.forEach(petition => {
      const dept = petition.department
      departmentMap.set(dept, (departmentMap.get(dept) || 0) + 1)
    })
    
    const departmentData = Array.from(departmentMap.entries()).map(([name, count]) => ({
      name,
      petitions: count,
    })).sort((a, b) => b.petitions - a.petitions).slice(0, 5) // Top 5 departments
    
    // Generate status data for pie chart
    const statusData = [
      { name: 'New', value: statusCounts.new },
      { name: 'In Progress', value: statusCounts.inProgress },
      { name: 'Completed', value: statusCounts.completed },
      { name: 'Rejected', value: statusCounts.rejected },
    ]
    
    return {
      total,
      statusCounts,
      departmentData,
      statusData
    }
  }, [petitions])

  const filteredPetitions = petitions.filter((petition) => {
    const matchesSearch =
      petition.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      petition.department.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (petition.submitted_by && petition.submitted_by.toLowerCase().includes(searchTerm.toLowerCase()))

    const matchesStatus =
      statusFilter === "all" || petition.status.toLowerCase().replace(" ", "-") === statusFilter.toLowerCase()

    return matchesSearch && matchesStatus
  })
  
  return (
    <div className="relative p-6 space-y-8 min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950">
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
                Super Admin Dashboard
              </h1>
              <p className="text-slate-400">
                Overview of all petitions across departments
              </p>
            </div>
          </motion.div>

          <motion.div variants={itemVariants}>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              <motion.div variants={statsVariants}>
                <Card className="bg-slate-900/60 backdrop-blur-sm border-slate-800/50 overflow-hidden hover:border-violet-500/30 transition-all duration-300 hover:shadow-[0_0_15px_rgba(139,92,246,0.1)]">
                  <div className="absolute inset-0 bg-gradient-to-br from-violet-600/5 to-indigo-600/5 z-0" />
                  <CardHeader className="pb-2 relative z-10">
                    <CardTitle className="text-sm font-medium text-slate-300">Total Petitions</CardTitle>
                  </CardHeader>
                  <CardContent className="relative z-10">
                    <div className="text-2xl font-bold text-white">{stats.total}</div>
                    <p className="text-xs text-violet-400 mt-1">{stats.total > 0 ? 'All time petitions' : 'No petitions yet'}</p>
                  </CardContent>
                  <div className="absolute -bottom-4 -right-4 w-16 h-16 rounded-full bg-violet-500/10 flex items-center justify-center">
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-violet-300">
                      <path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2"></path>
                      <rect width="8" height="4" x="8" y="2" rx="1" ry="1"></rect>
                    </svg>
                  </div>
                </Card>
              </motion.div>

              <motion.div variants={statsVariants}>
                <Card className="bg-slate-900/60 backdrop-blur-sm border-slate-800/50 overflow-hidden hover:border-violet-500/30 transition-all duration-300 hover:shadow-[0_0_15px_rgba(139,92,246,0.1)]">
                  <div className="absolute inset-0 bg-gradient-to-br from-violet-600/5 to-indigo-600/5 z-0" />
                  <CardHeader className="pb-2 relative z-10">
                    <CardTitle className="text-sm font-medium text-slate-300">New Petitions</CardTitle>
                  </CardHeader>
                  <CardContent className="relative z-10">
                    <div className="text-2xl font-bold text-white">{stats.statusCounts.new}</div>
                    <p className="text-xs text-violet-400 mt-1">
                      {stats.total > 0 ? `${Math.round((stats.statusCounts.new / stats.total) * 100)}% of total` : 'No petitions yet'}
                    </p>
                  </CardContent>
                  <div className="absolute -bottom-4 -right-4 w-16 h-16 rounded-full bg-indigo-500/10 flex items-center justify-center">
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-indigo-300">
                      <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
                      <path d="M14 2v6h6"></path>
                      <path d="M12 18v-6"></path>
                      <path d="M8 18v-1"></path>
                      <path d="M16 18v-3"></path>
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
                    <div className="text-2xl font-bold text-white">{stats.statusCounts.inProgress}</div>
                    <p className="text-xs text-blue-400 mt-1">
                      {stats.total > 0 ? `${Math.round((stats.statusCounts.inProgress / stats.total) * 100)}% of total` : 'No petitions yet'}
                    </p>
                  </CardContent>
                  <div className="absolute -bottom-4 -right-4 w-16 h-16 rounded-full bg-blue-500/10 flex items-center justify-center">
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-blue-300">
                      <path d="M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2 2 6.477 2 12s4.477 10 10 10z"></path>
                      <path d="M12 6v6l4 2"></path>
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
                    <div className="text-2xl font-bold text-white">{stats.statusCounts.completed}</div>
                    <p className="text-xs text-green-400 mt-1">
                      {stats.total > 0 ? `${Math.round((stats.statusCounts.completed / stats.total) * 100)}% of total` : 'No petitions yet'}
                    </p>
                  </CardContent>
                  <div className="absolute -bottom-4 -right-4 w-16 h-16 rounded-full bg-green-500/10 flex items-center justify-center">
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-green-300">
                      <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
                      <path d="m9 11 3 3L22 4"></path>
                    </svg>
                  </div>
                </Card>
              </motion.div>
            </div>
          </motion.div>

          <motion.div variants={itemVariants} className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card className="bg-slate-900/70 backdrop-blur-sm border-slate-800/50 hover:border-violet-500/30 transition-all duration-300 hover:shadow-[0_0_15px_rgba(139,92,246,0.1)] overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-br from-violet-600/5 to-indigo-600/5 z-0" />
              <CardHeader className="relative z-10">
                <CardTitle className="text-slate-100">Petitions by Department</CardTitle>
              </CardHeader>
              <CardContent className="h-80 relative z-10">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={stats.departmentData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#334155" />
                    <XAxis dataKey="name" stroke="#94a3b8" />
                    <YAxis stroke="#94a3b8" />
                    <Tooltip
                      contentStyle={{ backgroundColor: "#1e293b", borderColor: "#334155", color: "#f8fafc" }}
                      itemStyle={{ color: "#f8fafc" }}
                      labelStyle={{ color: "#f8fafc" }}
                    />
                    <Legend wrapperStyle={{ color: "#f8fafc" }} />
                    <Bar dataKey="petitions" fill="#8b5cf6" />
                  </BarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            <Card className="bg-slate-900/70 backdrop-blur-sm border-slate-800/50 hover:border-violet-500/30 transition-all duration-300 hover:shadow-[0_0_15px_rgba(139,92,246,0.1)] overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-br from-violet-600/5 to-indigo-600/5 z-0" />
              <CardHeader className="relative z-10">
                <CardTitle className="text-slate-100">Petitions by Status</CardTitle>
              </CardHeader>
              <CardContent className="h-80 relative z-10">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={stats.statusData}
                      cx="50%"
                      cy="50%"
                      labelLine={false}
                      label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                      outerRadius={80}
                      fill="#8884d8"
                      dataKey="value"
                    >
                      {stats.statusData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                      ))}
                    </Pie>
                    <Tooltip
                      contentStyle={{ backgroundColor: "#1e293b", borderColor: "#334155", color: "#f8fafc" }}
                      itemStyle={{ color: "#f8fafc" }}
                      labelStyle={{ color: "#f8fafc" }}
                    />
                    <Legend wrapperStyle={{ color: "#f8fafc" }} />
                  </PieChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </motion.div>

        </motion.div>
      </div>
  )
}