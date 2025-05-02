"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { DepartmentAdminLayout } from "@/components/layouts/department-admin-layout"
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

// Mock data for department petitions
const mockPetitions = [
  {
    id: 101,
    title: "Road Repair on Main Street",
    submittedBy: "John Doe",
    status: "New",
    priority: "High",
    createdAt: "2023-04-15",
    description: "The road on Main Street has several potholes that need to be fixed urgently.",
    assignedTo: "Sarah Johnson",
    department: "Roads"
  },
  {
    id: 102,
    title: "Sidewalk Repair on Oak Avenue",
    submittedBy: "Jane Smith",
    status: "In Progress",
    priority: "Medium",
    createdAt: "2023-04-10",
    description: "The sidewalk on Oak Avenue is damaged and poses a risk to pedestrians.",
    assignedTo: "Mike Anderson",
    department: "Roads"
  },
  {
    id: 103,
    title: "Traffic Light Installation at Junction",
    submittedBy: "Robert Johnson",
    status: "In Progress",
    priority: "High",
    createdAt: "2023-04-05",
    description: "A traffic light is needed at the junction of Main Street and Oak Avenue to improve safety.",
    assignedTo: "Sarah Johnson",
    department: "Electricity"
  },
  {
    id: 104,
    title: "Street Cleaning Request",
    submittedBy: "Emily Wilson",
    status: "Completed",
    priority: "Low",
    createdAt: "2023-03-28",
    description: "Regular street cleaning is needed in the downtown area.",
    assignedTo: "Dave Williams",
    department: "Waste"
  },
  {
    id: 105,
    title: "Park Bench Replacement",
    submittedBy: "Lisa Rogers",
    status: "New",
    priority: "Medium",
    createdAt: "2023-04-12",
    description: "Several park benches in Central Park are damaged and need replacement.",
    assignedTo: "Tom Clark",
    department: "Parks"
  },
  {
    id: 106,
    title: "Water Main Leak on Elm Street",
    submittedBy: "Mark Evans",
    status: "In Progress",
    priority: "High",
    createdAt: "2023-04-08",
    description: "There is a significant water leak from the main on Elm Street requiring immediate attention.",
    assignedTo: "Jennifer Lee",
    department: "Water"
  },
]

// Mock data for charts
const staffData = [
  { name: "Sarah Johnson", petitions: 28 },
  { name: "Mike Anderson", petitions: 22 },
  { name: "Dave Williams", petitions: 19 },
  { name: "Jennifer Lee", petitions: 15 },
  { name: "Tom Clark", petitions: 12 },
]

const departmentData = [
  { name: "Roads", petitions: 65 },
  { name: "Water", petitions: 40 },
  { name: "Electricity", petitions: 30 },
  { name: "Waste", petitions: 25 },
  { name: "Parks", petitions: 10 },
]

const statusData = [
  { name: "New", value: 35 },
  { name: "In Progress", value: 45 },
  { name: "Completed", value: 90 },
]

const COLORS = ["#6366f1", "#8b5cf6", "#10b981"]

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
  hidden: { y: 20, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: { type: "spring", stiffness: 100 }
  }
}

export default function DepartmentAdminDashboardPage() {
  const [petitions, setPetitions] = useState(mockPetitions)
  const [searchTerm, setSearchTerm] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")

  const filteredPetitions = petitions.filter((petition) => {
    const matchesSearch =
      petition.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      petition.submittedBy.toLowerCase().includes(searchTerm.toLowerCase())

    const matchesStatus = statusFilter === "all" || petition.status.toLowerCase() === statusFilter.toLowerCase()

    return matchesSearch && matchesStatus
  })

  const handleUpdateStatus = (id: number, newStatus: string) => {
    setPetitions(petitions.map((petition) => (petition.id === id ? { ...petition, status: newStatus } : petition)))
  }

  return (
    <DepartmentAdminLayout>
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
                Staff Assignment Dashboard
              </h1>
              <p className="text-slate-400">
                Manage petitions assigned to department staff members
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
                      {/* <Card className="bg-slate-900/70 backdrop-blur-sm border-slate-800/50 hover:border-violet-500/30 transition-all duration-300 hover:shadow-[0_0_15px_rgba(139,92,246,0.1)] overflow-hidden">
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
                      </Card> */}

                      <Card className="bg-slate-900/70 backdrop-blur-sm border-slate-800/50 hover:border-violet-500/30 transition-all duration-300 hover:shadow-[0_0_15px_rgba(139,92,246,0.1)] overflow-hidden">
                        <div className="absolute inset-0 bg-gradient-to-br from-violet-600/5 to-indigo-600/5 z-0" />
                        <CardHeader className="relative z-10">
                          <CardTitle className="text-slate-100">Petitions by Staff</CardTitle>
                        </CardHeader>
                        <CardContent className="h-80 relative z-10">
                          <ResponsiveContainer width="100%" height="100%">
                            <BarChart data={staffData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
                              <CartesianGrid strokeDasharray="3 3" stroke="#334155" />
                              <XAxis dataKey="name" stroke="#94a3b8" />
                              <YAxis stroke="#94a3b8" />
                              <Tooltip
                                contentStyle={{ backgroundColor: "#1e293b", borderColor: "#334155", color: "#f8fafc" }}
                                itemStyle={{ color: "#f8fafc" }}
                                labelStyle={{ color: "#f8fafc" }}
                              />
                              <Legend wrapperStyle={{ color: "#f8fafc" }} />
                              <Bar 
                                dataKey="petitions" 
                                fill="#8b5cf6"
                
                              />
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
                    <SelectItem value="new">New</SelectItem>
                    <SelectItem value="in progress">In Progress</SelectItem>
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
                  <DepartmentPetitionCard petition={petition} onUpdateStatus={handleUpdateStatus} />
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
    </DepartmentAdminLayout>
  )
}

function DepartmentPetitionCard({
  petition,
  onUpdateStatus,
}: {
  petition: any
  onUpdateStatus: (id: number, status: string) => void
}) {
  const handleReassignStaff = () => {
    // Implementation for staff reassignment functionality
    alert(`Reassigning petition: ${petition.id} - ${petition.title}`)
    // In a real implementation, this would open a modal for staff reassignment
  }

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
                  <path d="M16 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path>
                  <circle cx="8.5" cy="7" r="4"></circle>
                  <line x1="20" y1="8" x2="20" y2="14"></line>
                  <line x1="23" y1="11" x2="17" y2="11"></line>
                </svg>
                <span className="text-violet-300">Assigned to: <span className="font-medium">{petition.assignedTo}</span></span>
              </span>
            </CardDescription>
            {/* <div className="mt-2 text-sm text-slate-400">
              <span className="flex items-center">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-slate-500 mr-1" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M22 12h-4l-3 9L9 3l-3 9H2"></path>
                </svg>
                Department: {petition.department}
              </span>
            </div> */}
          </div>
          <div className="flex flex-wrap gap-2">
            <PriorityBadge priority={petition.priority} />
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
              }
              onUpdateStatus(petition.id, statusMap[value])
            }}
          >
            <SelectTrigger className="w-[180px] bg-slate-800/70 border-slate-700/50 text-slate-200 focus:ring-violet-500/70 focus:ring-offset-slate-900">
              <SelectValue placeholder="Update status" />
            </SelectTrigger>
            <SelectContent className="bg-slate-800 border-slate-700 text-slate-200">
              <SelectItem value="new">New</SelectItem>
              <SelectItem value="in-progress">In Progress</SelectItem>
              <SelectItem value="completed">Completed</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div className="flex gap-2">
          <Button 
            variant="outline"
            className="bg-transparent border-violet-500/50 text-violet-300 hover:bg-violet-600/10 hover:border-violet-400 hover:text-white transition-all duration-300"
            onClick={handleReassignStaff}
            aria-label={`Reassign staff for petition: ${petition.title}`}
          >
            Reassign Staff
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
