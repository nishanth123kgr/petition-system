"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Avatar } from "@/components/ui/avatar"
import { User, Calendar, Tag, MessageSquare, ThumbsUp, Share2, Flag, ChevronLeft, Clock, AlertCircle } from "lucide-react"
import callAPI from "@/app/utils/apiCaller"
import { useToast } from "@/hooks/use-toast"
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { DepartmentPetitionCard } from "./DepartmentPetitionCard"

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

// Mock detailed petition data for petition view
const mockDetailedPetition = {
    id: "1",
    title: "Improve Public Transportation in Downtown Area",
    description: "Our city's downtown area is experiencing significant congestion due to inadequate public transportation options. We propose expanding bus routes, increasing frequency of service, and adding dedicated bus lanes to improve mobility for all citizens.",
    longDescription: `
    <p>The current public transportation system in our downtown area is insufficient to meet the growing demands of our community. With increasing population density and business development in the city center, the existing infrastructure is becoming strained.</p>
    
    <p>Key issues include:</p>
    <ul>
      <li>Limited bus routes that don't adequately cover all neighborhoods</li>
      <li>Infrequent service during peak hours leading to overcrowding</li>
      <li>Lack of dedicated lanes causing delays due to traffic congestion</li>
      <li>Insufficient connections between different transportation modes</li>
    </ul>
    
    <p>We propose the following solutions:</p>
    <ol>
      <li>Expand bus routes to cover underserved areas, particularly in the eastern and western sectors of downtown</li>
      <li>Increase service frequency to every 10 minutes during peak hours</li>
      <li>Implement dedicated bus lanes on major arteries to bypass congestion</li>
      <li>Develop better integration between bus services and other transportation options</li>
    </ol>
    
    <p>These improvements would benefit thousands of daily commuters, reduce traffic congestion, decrease carbon emissions, and make our city more accessible to all residents.</p>
  `,
    department: "Transportation Department",
    category: "Infrastructure",
    status: "In Review",
    createdBy: "Jane Smith",
    createdAt: "2025-04-15T10:30:00Z",
    updatedAt: "2025-04-28T14:45:00Z",
    supportCount: 1247,
    commentCount: 38,
    targetSupport: 5000,
    attachments: [
        { id: 1, name: "traffic_analysis.pdf", type: "application/pdf", size: "2.4 MB" },
        { id: 2, name: "proposed_routes.jpg", type: "image/jpeg", size: "1.1 MB" }
    ],
    updates: [
        {
            id: 1,
            date: "2025-04-28T14:45:00Z",
            content: "The Transportation Department has begun reviewing this petition and assigned it to the Urban Planning division for initial assessment."
        },
        {
            id: 2,
            date: "2025-04-20T09:15:00Z",
            content: "This petition has reached 1,000 signatures and qualifies for official review."
        }
    ],
    priority: "High",
    assignedTo: "Urban Planning Division"
};

const statusColors = {
    "Draft": "bg-slate-500",
    "Submitted": "bg-blue-500",
    "In Review": "bg-amber-500",
    "Approved": "bg-green-500",
    "Rejected": "bg-red-500",
    "Implemented": "bg-violet-500",
    "Archived": "bg-slate-700",
    "New": "bg-indigo-900/60",
    "In Progress": "bg-violet-900/60",
    "Completed": "bg-emerald-900/60"
};

const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
        y: 0,
        opacity: 1,
        transition: { type: "spring", stiffness: 100 }
    }
}

// Format date
const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat('en-US', {
        month: 'short',
        day: 'numeric',
        year: 'numeric'
    }).format(date);
};

// Parse HTML content (very simple implementation)
const createMarkup = (htmlContent: string) => {
    return { __html: htmlContent };
};

interface PetitionDetailViewProps {
    petition: any;
    onBackToList: () => void;
    hasSupportedPetition: boolean;
    onSupport: () => void;
}

function PetitionDetailView({ 
    petition, 
    onBackToList, 
    hasSupportedPetition, 
    onSupport 
}: PetitionDetailViewProps) {

    return (
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
                    onClick={onBackToList}
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
                    <StatusBadge status={petition.status} />
                    <div className="text-sm text-slate-400 flex items-center">
                        <Calendar className="inline h-3.5 w-3.5 mr-1" />
                        Submitted on {formatDate(petition.created_at)}
                    </div>
                </div>

                <h1 className="text-2xl md:text-3xl font-bold text-slate-100">{petition.title}</h1>

                <div className="flex flex-wrap items-center gap-x-6 gap-y-2 text-sm text-slate-400">
                    <div className="flex items-center">
                        <User className="inline h-4 w-4 mr-1.5 text-slate-500" />
                        <span>Created by {petition.submitted_by}</span>
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
                    <h2 className="text-lg font-medium text-slate-100 mb-4">Petition Details</h2>
                    <div
                        className="prose prose-sm prose-invert max-w-none text-slate-300"
                        dangerouslySetInnerHTML={createMarkup(petition.description)}
                    />
                </div>

                {/* Attachments section */}
                {petition.attachments && petition.attachments.length > 0 && (
                    <div className="border-t border-slate-700/50 p-6">
                        <h3 className="text-sm font-medium text-slate-300 mb-3">Attachments</h3>
                        <div className="space-y-2">
                            {petition.attachments.map((attachment: any) => (
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
            {petition.updates && petition.updates.length > 0 && (
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.3, delay: 0.3 }}
                    className="bg-slate-800/30 rounded-lg border border-slate-700/50 p-6"
                >
                    <h3 className="text-lg font-medium text-slate-100 mb-4">Status Updates</h3>
                    <div className="space-y-4">
                        {petition.updates.map((update: any) => (
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

            {/* Action buttons */}
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: 0.4 }}
                className="flex flex-wrap gap-3 justify-center sm:justify-end pt-4 border-t border-slate-800"
            >
                <Button variant="outline" size="sm" className="text-slate-300">
                    <Share2 className="mr-1.5 h-4 w-4" />
                    Share
                </Button>
                <Button variant="outline" size="sm" className="text-slate-300">
                    <Flag className="mr-1.5 h-4 w-4" />
                    Report Issue
                </Button>
            </motion.div>
        </div>
    );
}

interface PetitionsContentProps {
    petitions?: Array<{
        id: number
        title: string
        status: string
        department: string
        created_at: string
        description: string
        severity: string,
        submitted_by: string
        assigned_to: string
    }>,
    staffs?: Array<{
        id: string
        name: string
        email: string
        department: string
        assignedCount: number
        inProgressCount: number
        completedCount: number
    }>,
    setStaff?: (staff: any) => void
}

export default function PetitionsContent({ petitions = [], staffs = [], setStaff }: PetitionsContentProps) {
    const [searchTerm, setSearchTerm] = useState("")
    const [statusFilter, setStatusFilter] = useState("all")
    const [selectedPetition, setSelectedPetition] = useState<any>(null)
    const [hasSupportedPetition, setHasSupportedPetition] = useState(false)
    const [loadingStatusUpdate, setLoadingStatusUpdate] = useState<number | null>(null)
    const [isAssignDialogOpen, setIsAssignDialogOpen] = useState(false)
    const [assigningPetition, setAssigningPetition] = useState<any>(null)
    const [petitionsData, setPetitionsData] = useState(petitions)

    const { toast } = useToast()

    // Update petitionsData when petitions prop changes
    useEffect(() => {
        setPetitionsData(petitions);
    }, [petitions]);

    // Handle petition status updates
    const handleUpdateStatus = async (id: number, status: string) => {
        // Set loading state for this specific petition
        setLoadingStatusUpdate(id);
        
        // In a real app, this would update the database
        console.log(`Updating petition ${id} status to: ${status}`);
        const result = await callAPI(`/api/petitions/${id}`, "PUT", { updateMap: { status } } as any);

        // Clear loading state
        setLoadingStatusUpdate(null);

        if (result.error) {
            toast({ title: "Error", description: "Failed to update status.", variant: "destructive" });
            return;
        }

        // Update local state
        setPetitionsData(prevPetitions => 
            prevPetitions.map(petition => 
                petition.id === id ? { ...petition, status } : petition
            )
        );

        toast({ title: "Success", description: `Petition status updated to ${status}.`, variant: "success" });
    }

    // Handle petition due date updates
    const handleUpdateDueDate = async (id: number, dueDate: Date) => {
        // Set loading state for this specific petition
        setLoadingStatusUpdate(id);
        
        try {
            // Fix timezone issue by creating a new date with the same day/month/year
            // but with time set to noon (to avoid timezone issues)
            const adjustedDate = new Date(
                dueDate.getFullYear(),
                dueDate.getMonth(),
                dueDate.getDate(),
                12, 0, 0
            );
            
            // Format the due date as ISO string for the database
            const due_date = adjustedDate.toISOString();
            console.log(`Updating petition ${id} due date to: ${due_date}`);
            
            // Call the API to update the due date
            const result = await callAPI(`/api/petitions/${id}`, "PUT", { 
                updateMap: { due_date } 
            } as any);

            if (result.error) {
                toast({ title: "Error", description: "Failed to update due date.", variant: "destructive" });
                return;
            }

            // Update local state
            setPetitionsData(prevPetitions => 
                prevPetitions.map(petition => 
                    petition.id === id ? { ...petition, due_date } : petition
                )
            );

            toast({ title: "Success", description: `Due date updated successfully.`, variant: "success" });
        } catch (error) {
            console.error("Error updating due date:", error);
            toast({ title: "Error", description: "Failed to update due date.", variant: "destructive" });
        } finally {
            // Clear loading state
            setLoadingStatusUpdate(null);
        }
    }

    // Filter petitions based on search term and status filter
    const filteredPetitions = petitionsData.filter(petition => {
        const matchesSearch = petition.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
            petition.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
            petition.submitted_by.toLowerCase().includes(searchTerm.toLowerCase());

        const matchesStatus = statusFilter === "all" ||
            petition.status.toLowerCase() === statusFilter.toLowerCase();

        return matchesSearch && matchesStatus;
    });

    const handleViewDetails = (petitionId: number) => {
        // In a real app, you would fetch the petition details from the API
        // For now, we'll use our mock data
        setSelectedPetition(petitionsData.find(p => p.id === petitionId) || mockDetailedPetition);
    };

    const handleBackToList = () => {
        setSelectedPetition(null);
    };

    const handleSupport = () => {
        if (hasSupportedPetition) return;

        // In a real app, you would send this to your API
        setSelectedPetition((prev: any) => ({
            ...prev,
            supportCount: prev.supportCount + 1
        }));
        setHasSupportedPetition(true);
    };

    const handleAssignStaff = async (petitionId: number, staffId: string) => {
        // Set loading state for this specific petition
        setLoadingStatusUpdate(petitionId);
        
        try {
            // Call the API to assign the staff member to the petition
            const result = await callAPI(`/api/staff/${staffId}/petitions/assign`, 'POST', { petitionId } as any);

            if (result.success) {
                toast({ 
                    title: "Success", 
                    description: result.message || `Staff assigned to petition successfully.`, 
                    variant: "success" 
                });
                
                // Fetch the staff name from the response if available
                const staffName = staffs.find(staff=>staff.id===staffId)?.name || "Staff Member";
                
                // Update the local petition data with the newly assigned staff
                setPetitionsData(prevPetitions => 
                    prevPetitions.map(petition => {
                        if(petition.id === petitionId )
                        {
                            // Only call setStaff if it exists
                            if (setStaff) {
                                setStaff((prevStaffs: any[]) =>
                                    prevStaffs.map(staff => {
                                        if (staff.id === staffId) {
                                            return { ...staff, assignedCount: staff.assignedCount + 1, inProgressCount: petition.status === "In Progress" ? staff.inProgressCount + 1 : staff.inProgressCount, completedCount: petition.status === "Completed" ? staff.completedCount + 1 : staff.completedCount };
                                        }
                                        return staff;
                                    })
                                );
                            }
                            
                            return { ...petition, assigned_to: staffName };
                        }
                            return petition;
                    })
                );

            } else {
                toast({ 
                    title: "Error", 
                    description: result.message || "Failed to assign staff to petition.", 
                    variant: "destructive" 
                });
            }
        } catch (error) {
            console.error("Error assigning staff:", error);
            toast({ 
                title: "Error", 
                description: "An unexpected error occurred.", 
                variant: "destructive" 
            });
        } finally {
            // Clear loading state
            setLoadingStatusUpdate(null);
            setIsAssignDialogOpen(false);
            setAssigningPetition(null);
        }
    };

    return (
        <div className="relative p-6 space-y-6 min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950">
            {/* Background decorative elements */}
            <div className="absolute top-20 right-10 w-72 h-72 bg-violet-600/5 rounded-full blur-3xl pointer-events-none" />
            <div className="absolute bottom-10 left-10 w-80 h-80 bg-indigo-600/5 rounded-full blur-3xl pointer-events-none" />

            {!selectedPetition ? (
                // Petitions List View
                <>
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
                                        <SelectItem value="rejected">Rejected</SelectItem>
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
                                    <DepartmentPetitionCard
                                        petition={petition}
                                        onUpdateStatus={handleUpdateStatus}
                                        onViewDetails={handleViewDetails}
                                        isLoading={loadingStatusUpdate === petition.id}
                                        onAssignStaff={() => {
                                            setAssigningPetition(petition);
                                            setIsAssignDialogOpen(true);
                                        }}
                                        onUpdateDueDate={handleUpdateDueDate}
                                    />
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
                </>
            ) : (
                // Use the PetitionDetailView component instead of duplicating the code
                <PetitionDetailView 
                    petition={selectedPetition}
                    onBackToList={handleBackToList}
                    hasSupportedPetition={hasSupportedPetition}
                    onSupport={handleSupport}
                />
            )}

            {assigningPetition && (
                <AssignStaffDialog
                    open={isAssignDialogOpen}
                    setOpen={setIsAssignDialogOpen}
                    petition={assigningPetition}
                    onAssignStaff={handleAssignStaff}
                    isLoading={loadingStatusUpdate === assigningPetition.id}
                    staffs={staffs}
                />
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



// Interface for staff member
interface StaffMember {
  id: string
  name: string
  email: string
  assignedCount?: number
  inProgressCount?: number
  completedCount?: number
}

// AssignStaffDialog component for assigning staff to petitions
function AssignStaffDialog({ 
  open, 
  setOpen, 
  petition,
  onAssignStaff,
  isLoading,
  staffs = []
}: { 
  open: boolean
  setOpen: (open: boolean) => void
  petition: any
  onAssignStaff: (petitionId: number, staffId: string) => void
  isLoading: boolean
  staffs?: StaffMember[]
}) {
  const [selectedStaffId, setSelectedStaffId] = useState("")
  const [staffList, setStaffList] = useState<StaffMember[]>(staffs)
  const [searchTerm, setSearchTerm] = useState("")
  const [isLoadingStaff, setIsLoadingStaff] = useState(false)
  const { toast } = useToast()
  
  // Fetch staff list when dialog opens
//   const fetchStaff = async () => {
//     try {
//       setIsLoadingStaff(true)
//       const response = await callAPI('/api/staff', 'GET')
//       if (response && !response.error) {
//         setStaffList(response)
//       } else {
//         toast({
//           title: "Error",
//           description: "Failed to load staff members",
//           variant: "destructive"
//         })
//       }
//     } catch (error) {
//       console.error("Error fetching staff:", error)
//       toast({
//         title: "Error",
//         description: "Failed to load staff members",
//         variant: "destructive"
//       })
//     } finally {
//       setIsLoadingStaff(false)
//     }
//   }
  
  // Call fetchStaff when dialog is opened
//   const handleDialogOpenChange = (isOpen: boolean) => {
//     if (isOpen) {
//       fetchStaff()
//     }
//     setOpen(isOpen)
//   }
  
  // Handle staff assignment
  const handleAssign = () => {
    if (selectedStaffId) {
      onAssignStaff(petition.id, selectedStaffId)
    } else {
      toast({
        title: "Error",
        description: "Please select a staff member",
        variant: "destructive"
      })
    }
  }
  
  // Filter staff based on search term
  const filteredStaff = staffList.filter(staff => 
    (staff.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    staff.email.toLowerCase().includes(searchTerm.toLowerCase())) && petition.assigned_to !== staff.name
  )
  
  return (
    <Dialog open={open} onOpenChange={()=>console.log("Dialog Opened")}>
      <DialogContent className="bg-slate-900 border-slate-800 text-slate-200 sm:max-w-[525px]">
        <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-violet-600 to-indigo-600"></div>
        <DialogHeader className="space-y-3 pb-2">
          <DialogTitle className="text-xl font-semibold">Assign Staff Member</DialogTitle>
          <DialogDescription className="text-slate-400">
            Assign a staff member to handle petition: <span className="text-indigo-300 font-medium">{petition?.title}</span>
          </DialogDescription>
        </DialogHeader>
        
        <div className="my-2">
          <Input
            placeholder="Search staff members..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="bg-slate-800/60 border-slate-700/50 text-slate-200 focus-visible:ring-violet-500"
          />
        </div>
        
        <div className="max-h-[240px] overflow-y-auto pr-1 space-y-2">
          {isLoadingStaff ? (
            <div className="flex justify-center items-center py-8">
              <div className="animate-spin rounded-full h-6 w-6 border-t-2 border-b-2 border-violet-500"></div>
            </div>
          ) : filteredStaff.length > 0 ? (
            filteredStaff.map(staff => (
              <div 
                key={staff.id}
                className={`p-3 rounded-md border cursor-pointer transition-all ${
                  selectedStaffId === staff.id 
                    ? "bg-violet-900/30 border-violet-500/50" 
                    : "bg-slate-800/50 border-slate-700/50 hover:border-violet-500/30"
                }`}
                onClick={() => setSelectedStaffId(staff.id)}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="h-10 w-10 rounded-full bg-indigo-900/60 flex items-center justify-center text-indigo-200 font-medium">
                      {staff.name.split(' ').map(n => n[0]).join('')}
                    </div>
                    <div>
                      <div className="font-medium text-slate-200">{staff.name}</div>
                      <div className="text-xs text-slate-400">{staff.email}</div>
                    </div>
                  </div>
                  
                  {staff.assignedCount !== undefined && (
                    <div className="text-right">
                      <div className="text-sm text-slate-300">{staff.assignedCount} assigned</div>
                      <div className="text-xs text-slate-400">{staff.inProgressCount} in progress</div>
                    </div>
                  )}
                </div>
              </div>
            ))
          ) : (
            <div className="text-center py-8 text-slate-400">
              No staff members found
            </div>
          )}
        </div>
        
        <DialogFooter className="pt-3 border-t border-slate-800 mt-4">
          <Button
            variant="outline"
            onClick={() => setOpen(false)}
            className="bg-transparent border-violet-500/50 text-violet-300 hover:bg-violet-600/10 hover:border-violet-400 hover:text-white transition-all duration-300"
          >
            Cancel
          </Button>
          <Button
            onClick={handleAssign}
            disabled={!selectedStaffId || isLoading}
            className="bg-gradient-to-r from-violet-600 to-indigo-600 hover:from-violet-500 hover:to-indigo-500 text-white shadow-md hover:shadow-lg hover:shadow-violet-900/20 transition-all duration-300"
          >
            {isLoading ? (
              <>
                <div className="animate-spin rounded-full h-4 w-4 border-t-2 border-b-2 border-white mr-2"></div>
                Assigning...
              </>
            ) : "Assign Staff"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
