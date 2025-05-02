'use client'

import React from "react"
import { useState } from "react"
import { motion } from "framer-motion"
import { Card, CardContent, CardHeader, CardTitle } from "../../../components/ui/card"
import { Badge } from "../../../components/ui/badge"
import { Input } from "../../../components/ui/input"
import { Button } from "../../../components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../../../components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../../../components/ui/tabs"
import { Search, FileText, Calendar, Building2, Clock, ChevronRight, Eye } from "lucide-react"

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

const cardVariants = {
  hidden: { opacity: 0, scale: 0.95 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: { type: "spring", stiffness: 100 }
  }
}

// Mock data for user petitions
const mockPetitions = [
  {
    id: 1,
    title: "Road Repair on Main Street",
    department: "Infrastructure",
    status: "Under Review",
    createdAt: "2023-04-15",
    description: "The road on Main Street has several potholes that need to be fixed urgently.",
  },
  {
    id: 2,
    title: "Improve Street Lighting in Downtown Area",
    department: "Public Safety",
    status: "Assigned",
    createdAt: "2023-03-28",
    description: "The downtown area needs better street lighting to improve safety at night.",
  },
  {
    id: 3,
    title: "Request for Public Park Maintenance",
    department: "Environment",
    status: "Completed",
    createdAt: "2023-02-10",
    description: "The public park needs maintenance, including lawn mowing and trash removal.",
  },
]

// Helper function to get badge color based on status
const getStatusBadgeColor = (status: string) => {
  switch (status.toLowerCase()) {
    case 'completed':
      return "bg-green-900/30 border-green-800 text-green-300"
    case 'assigned':
    case 'in progress':
      return "bg-amber-900/30 border-amber-800 text-amber-300"
    case 'under review':
      return "bg-blue-900/30 border-blue-800 text-blue-300"
    case 'rejected':
      return "bg-red-900/30 border-red-800 text-red-300"
    default:
      return "bg-slate-800 border-slate-700 text-slate-300"
  }
}

interface UserMyPetitionsContentProps {
  petitions?: Array<{
    id: number
    title: string
    status: string
    department: string
    createdAt: string
    description: string
  }>
}

export function UserMyPetitionsContent({ petitions = mockPetitions }: UserMyPetitionsContentProps) {
  const [searchTerm, setSearchTerm] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")
  const [activeTab, setActiveTab] = useState("all")

  // Filter petitions based on search, status, and active tab
  const filteredPetitions = petitions.filter((petition) => {
    // Filter by search term
    const matchesSearch =
      petition.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      petition.department.toLowerCase().includes(searchTerm.toLowerCase())

    // Filter by status
    const matchesStatus = statusFilter === "all" || petition.status.toLowerCase().includes(statusFilter.toLowerCase())

    // Filter by tab
    const matchesTab = activeTab === "all" || 
      (activeTab === "active" && (petition.status === "Under Review" || petition.status === "Assigned")) ||
      (activeTab === "completed" && petition.status === "Completed")

    return matchesSearch && matchesStatus && matchesTab
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
              My Petitions
            </h1>
            <p className="text-slate-400">
              View and manage all your submitted petitions
            </p>
          </div>
        </motion.div>

        <motion.div variants={itemVariants}>
          <Card className="bg-slate-900/60 backdrop-blur-sm border-slate-800/50 overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-violet-600/5 to-indigo-600/5 z-0" />
            <CardHeader className="relative z-10">
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <CardTitle className="text-lg font-medium text-slate-100">Your Petitions</CardTitle>
                
                {/* Search and filter */}
                <div className="flex flex-col sm:flex-row gap-3 w-full md:w-auto">
                  <div className="relative flex-1">
                    <Search className="absolute left-3 top-2.5 h-4 w-4 text-slate-500" />
                    <Input
                      placeholder="Search petitions..."
                      className="pl-9 bg-slate-800/50 border-slate-700 text-slate-200 w-full"
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                    />
                  </div>
                  
                  <Select value={statusFilter} onValueChange={setStatusFilter}>
                    <SelectTrigger className="bg-slate-800/50 border-slate-700 text-slate-200 w-full sm:w-40">
                      <SelectValue placeholder="Filter by status" />
                    </SelectTrigger>
                    <SelectContent className="bg-slate-800 border-slate-700">
                      <SelectItem value="all">All Statuses</SelectItem>
                      <SelectItem value="under review">Under Review</SelectItem>
                      <SelectItem value="assigned">Assigned</SelectItem>
                      <SelectItem value="completed">Completed</SelectItem>
                      <SelectItem value="rejected">Rejected</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </CardHeader>
            
            <CardContent className="relative z-10">
              <Tabs defaultValue="all" className="w-full" value={activeTab} onValueChange={setActiveTab}>
                <TabsList className="bg-slate-800/60 mb-6">
                  <TabsTrigger value="all" className="data-[state=active]:bg-violet-600">All</TabsTrigger>
                  <TabsTrigger value="active" className="data-[state=active]:bg-violet-600">Active</TabsTrigger>
                  <TabsTrigger value="completed" className="data-[state=active]:bg-violet-600">Completed</TabsTrigger>
                </TabsList>
                
                <TabsContent value="all" className="mt-0">
                  <div className="space-y-4">
                    {filteredPetitions.length > 0 ? (
                      filteredPetitions.map((petition, index) => (
                        <PetitionCard key={petition.id} petition={petition} index={index} />
                      ))
                    ) : (
                      <div className="text-center p-6 border border-dashed border-slate-700 rounded-md">
                        <div className="text-slate-400">No petitions found matching your filters.</div>
                      </div>
                    )}
                  </div>
                </TabsContent>
                
                <TabsContent value="active" className="mt-0">
                  {/* Content for active tab is handled by the filtered list */}
                </TabsContent>
                
                <TabsContent value="completed" className="mt-0">
                  {/* Content for completed tab is handled by the filtered list */}
                </TabsContent>
              </Tabs>
            </CardContent>
          </Card>
        </motion.div>
      </motion.div>
    </div>
  )
}

// Petition card component
function PetitionCard({ petition, index }: { 
  petition: { 
    id: number
    title: string
    status: string
    department: string
    createdAt: string
    description: string 
  },
  index: number
}) {
  return (
    <motion.div
      variants={cardVariants}
      initial="hidden"
      animate="visible"
      transition={{ delay: index * 0.1 }}
    >
      <Card className="bg-slate-800/50 border-slate-700/50 hover:border-violet-500/30 transition-colors duration-300 overflow-hidden">
        <CardContent className="p-5">
          <div className="flex flex-col gap-4">
            <div className="flex justify-between items-start gap-4">
              <div className="space-y-1.5">
                <h3 className="font-medium text-slate-100">{petition.title}</h3>
                <div className="flex flex-wrap items-center gap-2 text-xs">
                  <Badge variant="outline" className="bg-slate-800/80 border-slate-700 text-slate-300 flex items-center gap-1 font-normal">
                    <Building2 className="h-3 w-3" />
                    {petition.department}
                  </Badge>
                  <Badge variant="outline" className="bg-slate-800/80 border-slate-700 text-slate-300 flex items-center gap-1 font-normal">
                    <Calendar className="h-3 w-3" />
                    {petition.createdAt}
                  </Badge>
                </div>
              </div>
              
              <Badge variant="outline" className={`${getStatusBadgeColor(petition.status)} flex items-center gap-1 font-normal`}>
                <Clock className="h-3 w-3" />
                {petition.status}
              </Badge>
            </div>
            
            <p className="text-sm text-slate-400 line-clamp-2">{petition.description}</p>
            
            <div className="flex justify-end">
              <Button variant="ghost" className="text-xs text-violet-400 hover:text-violet-300 hover:bg-violet-900/20 flex items-center gap-1">
                View Details
                <ChevronRight className="h-3 w-3" />
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  )
}