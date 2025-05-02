"use client"

import React, { useState } from "react"
import { motion } from "framer-motion"
import { Button } from "../../../components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../../../components/ui/card"
import { Input } from "../../../components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../../../components/ui/select"
import { Badge } from "../../../components/ui/badge"
import { SuperAdminLayout } from "../../../components/layouts/super-admin-layout"
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
} from "recharts"

// Mock data for analytics
const departmentData = [
  { name: "Infrastructure", petitions: 45 },
  { name: "Education", petitions: 30 },
  { name: "Healthcare", petitions: 25 },
  { name: "Environment", petitions: 20 },
  { name: "Public Safety", petitions: 35 },
  { name: "Other", petitions: 15 },
]

const statusData = [
  { name: "New", value: 35 },
  { name: "In Progress", value: 45 },
  { name: "Completed", value: 90 },
]

const COLORS = ["#8b5cf6", "#6366f1", "#a78bfa", "#818cf8", "#c4b5fd", "#a5b4fc"]

// Mock data for all petitions
const mockPetitions = [
  {
    id: 201,
    title: "Road Repair on Main Street",
    department: "Infrastructure",
    submittedBy: "John Doe",
    status: "In Progress",
    priority: "High",
    createdAt: "2023-04-15",
  },
  {
    id: 202,
    title: "New Textbooks for Elementary School",
    department: "Education",
    submittedBy: "Jane Smith",
    status: "New",
    priority: "Medium",
    createdAt: "2023-04-12",
  },
  {
    id: 203,
    title: "Hospital Equipment Upgrade",
    department: "Healthcare",
    submittedBy: "Robert Johnson",
    status: "Completed",
    priority: "High",
    createdAt: "2023-04-10",
  },
  {
    id: 204,
    title: "Park Cleanup Initiative",
    department: "Environment",
    submittedBy: "Emily Wilson",
    status: "In Progress",
    priority: "Medium",
    createdAt: "2023-04-08",
  },
  {
    id: 205,
    title: "Street Light Installation",
    department: "Public Safety",
    submittedBy: "Michael Brown",
    status: "New",
    priority: "High",
    createdAt: "2023-04-05",
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

export default function SuperAdminDashboardPage() {
  const [petitions, setPetitions] = useState(mockPetitions)
  const [searchTerm, setSearchTerm] = useState("")
  const [departmentFilter, setDepartmentFilter] = useState("all")
  const [statusFilter, setStatusFilter] = useState("all")

  const filteredPetitions = petitions.filter((petition) => {
    const matchesSearch =
      petition.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      petition.submittedBy.toLowerCase().includes(searchTerm.toLowerCase())

    const matchesDepartment =
      departmentFilter === "all" || petition.department.toLowerCase() === departmentFilter.toLowerCase()

    const matchesStatus = statusFilter === "all" || petition.status.toLowerCase() === statusFilter.toLowerCase()

    return matchesSearch && matchesDepartment && matchesStatus
  })

  return (
    <SuperAdminLayout>
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
                    <div className="text-2xl font-bold text-white">170</div>
                    <p className="text-xs text-violet-400 mt-1">+12% from last month</p>
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
                    <div className="text-2xl font-bold text-white">35</div>
                    <p className="text-xs text-violet-400 mt-1">+5% from last month</p>
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
                    <div className="text-2xl font-bold text-white">45</div>
                    <p className="text-xs text-red-400 mt-1">-3% from last month</p>
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
                    <div className="text-2xl font-bold text-white">90</div>
                    <p className="text-xs text-violet-400 mt-1">+15% from last month</p>
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
                  <BarChart data={departmentData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
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
                      data={statusData}
                      cx="50%"
                      cy="50%"
                      labelLine={false}
                      label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                      outerRadius={80}
                      fill="#8884d8"
                      dataKey="value"
                    >
                      {statusData.map((entry, index) => (
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

          <motion.div variants={itemVariants}>
            <Card className="bg-slate-900/70 backdrop-blur-sm border-slate-800/50 hover:border-violet-500/30 transition-all duration-300 hover:shadow-[0_0_15px_rgba(139,92,246,0.1)] overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-br from-violet-600/5 to-indigo-600/5 z-0" />
              <CardHeader className="relative z-10">
                <CardTitle className="text-slate-100">All Petitions</CardTitle>
                <CardDescription className="text-slate-400">
                  View and manage petitions across all departments
                </CardDescription>
              </CardHeader>
              <CardContent className="relative z-10">
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
          </motion.div>
        </motion.div>
      </div>
    </SuperAdminLayout>
  )
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
