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
import { Search, FileText, Calendar, Building2, Clock, ChevronRight, Eye, User, Tag, MessageSquare, ThumbsUp, ChevronLeft } from "lucide-react"

// Mock detailed petition data - in a real app this would come from an API
const mockDetailedPetition = {
  id: "1",
  title: "Road Repair on Main Street",
  description: "The road on Main Street has several potholes that need to be fixed urgently.",
  longDescription: `
    <p>Upon inspection of Main Street between Oak Avenue and Pine Boulevard, our team has identified multiple severe potholes and road surface degradation.</p>
    
    <p>Specific issues include:</p>
    <ul>
      <li>Three large potholes (>30cm diameter) near the intersection with Oak Avenue</li>
      <li>Severe cracking along a 50-meter stretch near house number 42-58</li>
      <li>Water accumulation during rain due to improper drainage</li>
      <li>Worn road markings that need repainting</li>
    </ul>
    
    <p>Recommended repairs:</p>
    <ol>
      <li>Fill and properly seal all potholes</li>
      <li>Resurface the damaged stretch of road</li>
      <li>Improve drainage by clearing blocked storm drains</li>
      <li>Repaint road markings for safety</li>
    </ol>
    
    <p>This repair work would improve road safety for all users and prevent further deterioration that would require more extensive and costly repairs in the future.</p>
  `,
  department: "Roads Department",
  category: "Infrastructure",
  status: "In Progress",
  createdBy: "John Doe",
  createdAt: "2025-04-10T09:15:00Z",
  updatedAt: "2025-04-25T14:30:00Z",
  supportCount: 86,
  commentCount: 12,
  priority: "High",
  assignedTo: "Sarah Johnson",
  dueDate: "2025-05-15T00:00:00Z",
  attachments: [
    { id: 1, name: "pothole_photos.pdf", type: "application/pdf", size: "3.1 MB" },
    { id: 2, name: "inspection_report.docx", type: "application/msword", size: "1.8 MB" },
    { id: 3, name: "location_map.jpg", type: "image/jpeg", size: "2.4 MB" }
  ],
  updates: [
    {
      id: 1,
      date: "2025-04-25T14:30:00Z",
      content: "Materials ordered for repair work. Scheduled to begin next week pending weather conditions."
    },
    {
      id: 2,
      date: "2025-04-15T11:45:00Z",
      content: "Initial assessment completed. Repair classified as high priority."
    }
  ]
};

// Status color mapping
const statusColors = {
  "Under Review": "bg-blue-900/60",
  "Assigned": "bg-amber-900/60",
  "In Progress": "bg-violet-900/60",
  "Completed": "bg-emerald-900/60",
  "Rejected": "bg-red-900/60"
};

// Format date
const formatDate = (dateString: string) => {
  const date = new Date(dateString);
  return new Intl.DateTimeFormat('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric'
  }).format(date);
};

// Parse HTML content
const createMarkup = (htmlContent: string) => {
  return { __html: htmlContent };
};

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
    created_at: string
    description: string
    severity: string
  }>
}

export function UserMyPetitionsContent({ petitions = [] }: UserMyPetitionsContentProps) {
  const [searchTerm, setSearchTerm] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")
  const [activeTab, setActiveTab] = useState("all")
  const [selectedPetition, setSelectedPetition] = useState<any>(null)

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

  // Handle viewing petition details
  const handleViewDetails = (petitionId: number) => {
    setSelectedPetition(petitions.find(p => p.id === petitionId) || mockDetailedPetition);
  }

  // Handle back to list
  const handleBackToList = () => {
    setSelectedPetition(null);
  }

  return (
    <div className="p-6 relative min-h-screen">
      <div className="absolute top-20 right-10 w-72 h-72 bg-violet-600/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-10 left-10 w-80 h-80 bg-indigo-600/5 rounded-full blur-3xl pointer-events-none" />

      {!selectedPetition ? (
        // Petitions List View
        <div className="space-y-6">
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
                            <PetitionCard
                              key={petition.id}
                              petition={petition}
                              index={index}
                              onViewDetails={handleViewDetails}
                            />
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
      ) : (
        // Petition Detail View
        <div className="space-y-6">
          {/* Back button */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="inline-flex"
          >
            <Button
              variant="ghost"
              size="sm"
              className="text-slate-400 hover:text-slate-200 -ml-2 mb-2"
              onClick={handleBackToList}
            >
              <ChevronLeft className="mr-1 h-4 w-4" /> Back to My Petitions
            </Button>
          </motion.div>

          {/* Petition header */}
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
            className="space-y-3"
          >
            <div className="flex flex-wrap items-center justify-between gap-2">
            <Badge variant="outline" className={`${getStatusBadgeColor(selectedPetition.status)} flex items-center gap-1 font-normal`}>
                  <Clock className="h-3 w-3" />
                  {selectedPetition.status}
                </Badge>
              <div className="text-sm text-slate-400 flex items-center">
                <Calendar className="inline h-3.5 w-3.5 mr-1" />
                Submitted on {selectedPetition.created_at.split("T")[0]}
              </div>
            </div>

            <h1 className="text-2xl md:text-3xl font-bold text-slate-100">{selectedPetition.title}</h1>

            <div className="flex flex-wrap items-center gap-x-6 gap-y-2 text-sm text-slate-400">
              {/* <div className="flex items-center">
                <User className="inline h-4 w-4 mr-1.5 text-slate-500" />
                <span>Created by {selectedPetition.createdBy}</span>
              </div> */}
              {/* <div className="flex items-center">
                <Tag className="inline h-4 w-4 mr-1.5 text-slate-500" />
                <span>{selectedPetition.category}</span>
              </div> */}
              {/* <div className="flex items-center">
                <MessageSquare className="inline h-4 w-4 mr-1.5 text-slate-500" />
                <span>{selectedPetition.commentCount} Comments</span>
              </div> */}
            </div>
          </motion.div>

          {/* Priority and Department */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: 0.1 }}
            className="bg-slate-800/50 rounded-lg p-4 border border-slate-700/50"
          >
            <div className="flex flex-wrap justify-between gap-4">
              <div>
                <div className="text-sm text-slate-400 mb-1">Priority</div>
                <div className="flex items-center">
                  <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${selectedPetition.severity === "High"
                      ? "bg-red-900/60 text-red-200"
                      : selectedPetition.severity === "Medium"
                        ? "bg-amber-900/60 text-amber-200"
                        : "bg-green-900/60 text-green-200"
                    }`}>
                    {selectedPetition.severity}
                  </span>
                </div>
              </div>

              <div>
                <div className="text-sm text-slate-400 mb-1">Status</div>
                <div className="font-medium text-slate-200 flex items-center">
                  <Clock className="inline h-4 w-4 mr-1.5 text-slate-500" />
                  {selectedPetition.status}
                </div>
              </div>

              <div>
                <div className="text-sm text-slate-400 mb-1">Department</div>
                <div className="font-medium text-slate-200">
                  {selectedPetition.department}
                </div>
              </div>
            </div>
          </motion.div>

          {/* Petition content */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.3, delay: 0.2 }}
            className="bg-slate-800/30 rounded-lg border border-slate-700/50 overflow-hidden"
          >
            <div className="p-6">
              <h2 className="text-lg font-medium text-slate-100 mb-4">Description</h2>
              <div
                className="prose prose-sm prose-invert max-w-none text-slate-300"
                dangerouslySetInnerHTML={createMarkup(selectedPetition.description)}
              />
            </div>

            {/* Attachments section */}
            {selectedPetition.attachments && selectedPetition.attachments.length > 0 && (
              <div className="border-t border-slate-700/50 p-6">
                <h3 className="text-sm font-medium text-slate-300 mb-3">Attachments</h3>
                <div className="space-y-2">
                  {selectedPetition.attachments.map((attachment: any) => (
                    <div
                      key={attachment.id}
                      className="flex items-center p-3 rounded-md bg-slate-800/50 hover:bg-slate-800 transition-colors cursor-pointer group"
                    >
                      <div className="w-8 h-8 rounded bg-slate-700 flex items-center justify-center mr-3">
                        {attachment.type.includes('pdf') ? (
                          <svg className="w-4 h-4 text-red-400" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                            <path d="M9 2a2 2 0 00-2 2v8a2 2 0 002 2h6a2 2 0 002-2V6.414A2 2 0 0016.414 5L14 2.586A2 2 0 0012.586 2H9z" />
                            <path d="M3 8a2 2 0 012-2h2a2 2 0 012 2v8a2 2 0 01-2 2H5a2 2 0 01-2-2V8z" />
                          </svg>
                        ) : attachment.type.includes('image') ? (
                          <svg className="w-4 h-4 text-blue-400" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                            <path fillRule="evenodd" d="M4 3a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V5a2 2 0 00-2-2H4zm12 12H4l4-8 3 6 2-4 3 6z" clipRule="evenodd" />
                          </svg>
                        ) : (
                          <svg className="w-4 h-4 text-slate-400" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                            <path fillRule="evenodd" d="M4 4a2 2 0 012-2h4.586A2 2 0 0112 2.586L15.414 6A2 2 0 0116 7.414V16a2 2 0 01-2 2H6a2 2 0 01-2-2V4z" clipRule="evenodd" />
                          </svg>
                        )}
                      </div>
                      <div className="flex-1 overflow-hidden">
                        <div className="text-sm font-medium text-slate-300 truncate">{attachment.name}</div>
                        <div className="text-xs text-slate-500">{attachment.size}</div>
                      </div>
                      <Button variant="ghost" size="sm" className="ml-2 opacity-0 group-hover:opacity-100 transition-opacity text-slate-400 hover:text-slate-200">
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                        </svg>
                      </Button>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </motion.div>

          {/* Status updates */}
          {/* {selectedPetition.updates && selectedPetition.updates.length > 0 && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.3, delay: 0.3 }}
              className="bg-slate-800/30 rounded-lg border border-slate-700/50 p-6"
            >
              <h3 className="text-lg font-medium text-slate-100 mb-4">Status Updates</h3>
              <div className="space-y-4">
                {selectedPetition.updates.map((update: any) => (
                  <div key={update.id} className="relative pl-6 pb-4 last:pb-0 border-l border-slate-700">
                    <div className="absolute left-0 top-0 -translate-x-1/2 w-3 h-3 rounded-full bg-violet-500"></div>
                    <div className="text-sm text-slate-400 mb-1 flex items-center">
                      <Clock className="h-3 w-3 mr-1" />
                      {formatDate(update.date)}
                    </div>
                    <div className="text-slate-300">{update.content}</div>
                  </div>
                ))}
              </div>
            </motion.div>
          )} */}
        </div>
      )}
    </div>
  )
}

// Petition card component
function PetitionCard({ petition, index, onViewDetails }: {
  petition: {
    id: number
    title: string
    status: string
    department: string
    created_at: string
    description: string
    severity: string
  },
  index: number,
  onViewDetails: (id: number) => void
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
                    {petition.created_at.split("T")[0]}
                  </Badge>
                </div>
              </div>

              <div className="flex flex-wrap items-center gap-2">
                <Badge variant="outline" className={`${getStatusBadgeColor(petition.status)} flex items-center gap-1 font-normal`}>
                  <Clock className="h-3 w-3" />
                  {petition.status}
                </Badge>
                <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${petition.severity === "High"
                      ? "bg-red-900/60 text-red-200"
                      : petition.severity === "Medium"
                        ? "bg-amber-900/60 text-amber-200"
                        : "bg-green-900/60 text-green-200"
                    }`}>
                    {petition.severity}
                  </span>
              </div>
            </div>

            <p className="text-sm text-slate-400 line-clamp-2">{petition.description}</p>

            <div className="flex justify-end">
              <Button
                variant="ghost"
                className="text-xs text-violet-400 hover:text-violet-300 hover:bg-violet-900/20 flex items-center gap-1"
                onClick={() => onViewDetails(petition.id)}
              >
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