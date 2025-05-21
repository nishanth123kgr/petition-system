'use client'

import { useState } from "react"
import { motion } from "framer-motion"
import { StaffPetitionCard } from "@/components/ui/staff-petition-card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"
import { User, Calendar, Tag, MessageSquare, ThumbsUp, ChevronLeft, Clock, Loader2 } from "lucide-react"
import callAPI from "@/app/utils/apiCaller"
import { useToast } from "@/hooks/use-toast"

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
  "Not Started": "bg-indigo-900/60",
  "In Progress": "bg-violet-900/60",
  "Completed": "bg-emerald-900/60"
};

// Format date
const formatDate = (dateString: string) => {
      return dateString ? dateString.split("T")[0] : "Not Assigned";
}

// Parse HTML content
const createMarkup = (htmlContent: string) => {
  return { __html: htmlContent };
};

interface StaffPetitionsContentProps {
  petitions: Array<{
    id: number
    title: string
    submittedBy: string
    submitted_by: string
    status: string
    priority: string
    assignedDate: string
    dueDate: string
    severity: string
    assigned_date: string
    due_date: string
    description: string
  }>
  onUpdateStatus: (id: number, newStatus: string) => void
  department: string
}

export function StaffPetitionsContent({ petitions, onUpdateStatus, department }: StaffPetitionsContentProps) {
  const [selectedPetition, setSelectedPetition] = useState<any>(null)
  const [loadingStatusUpdate, setLoadingStatusUpdate] = useState<number | null>(null)
  const { toast } = useToast()
  
  // Handle viewing petition details
  const handleViewDetails = (petitionId: number) => {
    // In a real app, you would fetch the petition details from the API
    // For now, we'll use our mock data
    setSelectedPetition(petitions.find((petition)=>petition.id === petitionId));
  }

  // Handle back to list
  const handleBackToList = () => {
    setSelectedPetition(null);
  }

  // Handle updating petition status
  const handleUpdateStatus = async (id: number, status: string) => {
    try {
      // Set loading state for this petition
      setLoadingStatusUpdate(id);
      
      // Call the API to update the status
      const result = await callAPI(`/api/petitions/${id}`, "PUT", { 
        updateMap: { status } 
      } as any);
      
      if (result.success) {
        // If API call is successful, call the parent onUpdateStatus function
        onUpdateStatus(id, status);
        
        toast({
          title: "Status Updated",
          description: `Petition status changed to ${status}`,
          variant: "default"
        });
      } else {
        toast({
          title: "Error",
          description: result.message || "Failed to update petition status",
          variant: "destructive"
        });
      }
    } catch (error) {
      console.error("Error updating status:", error);
      toast({
        title: "Error",
        description: "An unexpected error occurred",
        variant: "destructive"
      });
    } finally {
      // Clear loading state
      setLoadingStatusUpdate(null);
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

  return (
    <div className="p-6 relative min-h-screen">
      <div className="absolute top-20 right-10 w-72 h-72 bg-violet-600/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-10 left-10 w-80 h-80 bg-indigo-600/5 rounded-full blur-3xl pointer-events-none" />
      
      {!selectedPetition ? (
        // Petitions List View
        <>
          <div className="mb-6">
            <h2 className="text-2xl font-bold bg-gradient-to-r from-violet-200 to-indigo-200 bg-clip-text text-transparent mb-4">My Petitions</h2>
            <p className="text-slate-400">View and manage all your assigned petitions</p>
          </div>
          
          <div className="space-y-4">
            {petitions.length > 0 ? (
              petitions.map((petition, index) => (
                <motion.div 
                  key={petition.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 * index, duration: 0.5 }}
                >
                  <StaffPetitionCard 
                    petition={petition} 
                    onUpdateStatus={handleUpdateStatus} 
                    onViewDetails={handleViewDetails}
                    isLoading={loadingStatusUpdate === petition.id}
                  />
                </motion.div>
              ))
            ) : (
              <div className="text-center py-12 bg-slate-900/60 backdrop-blur-sm border border-slate-800/50 rounded-lg shadow-lg">
                <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-slate-800/80 mb-4">
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-slate-400">
                    <path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2"></path>
                    <rect width="8" height="4" x="8" y="2" rx="1" ry="1"></rect>
                    <path d="M12 11h4"></path>
                    <path d="M12 16h4"></path>
                    <path d="M8 11h.01"></path>
                    <path d="M8 16h.01"></path>
                  </svg>
                </div>
                <p className="text-slate-400 font-medium">No assigned petitions found</p>
                <p className="text-slate-500 text-sm mt-1">Check back later for new assignments</p>
              </div>
            )}
          </div>
        </>
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
              <ChevronLeft className="mr-1 h-4 w-4" /> Back to Petitions
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
              <StatusBadge status={selectedPetition.status} />
              <div className="text-sm text-slate-400 flex items-center">
                <Calendar className="inline h-3.5 w-3.5 mr-1" />
                Submitted on {formatDate(selectedPetition.created_at)}
              </div>
            </div>
            
            <h1 className="text-2xl md:text-3xl font-bold text-slate-100">{selectedPetition.title}</h1>
            
            <div className="flex flex-wrap items-center gap-x-6 gap-y-2 text-sm text-slate-400">
              <div className="flex items-center">
                <User className="inline h-4 w-4 mr-1.5 text-slate-500" />
                <span>Created by {selectedPetition.submitted_by}</span>
              </div>
            </div>
          </motion.div>
          
          {/* Priority and Due Date */}
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
                  <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                    selectedPetition.severity === "High" 
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
                <div className="text-sm text-slate-400 mb-1">Due Date</div>
                <div className="font-medium text-slate-200 flex items-center">
                  <Calendar className="inline h-4 w-4 mr-1.5 text-slate-500" />
                  {formatDate(selectedPetition.due_date)}
                  {selectedPetition.due_date && new Date(selectedPetition.due_date) < new Date(Date.now() + 7 * 24 * 60 * 60 * 1000) && (
                    <Badge className="ml-2 bg-red-900/60 text-red-200 border-0">Due Soon</Badge>
                  )}
                </div>
              </div>
              
              <div>
                <div className="text-sm text-slate-400 mb-1">Department</div>
                <div className="font-medium text-slate-200">
                  {department}
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
          {selectedPetition.updates && selectedPetition.updates.length > 0 && (
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
          )}
        </div>
      )}
    </div>
  )
}

export function StatusBadge({ status }: { status: string }) {
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
      case "Rejected":
          bgColor = "bg-red-900/60"
          textColor = "text-red-200"
          break
  }

  return (<span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${bgColor} ${textColor}`}>
      {status}
  </span>)
}