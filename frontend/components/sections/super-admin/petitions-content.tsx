"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { useToast } from "@/hooks/use-toast"
import { Loader2 } from "lucide-react"
import callAPI from "@/app/utils/apiCaller"

interface SuperAdminPetitionContentProps {
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
        due_date?: string
    }>
}

const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
        y: 0,
        opacity: 1,
        transition: { type: "spring", stiffness: 100 }
    }
}

export function SuperAdminPetitionContent({ petitions }: SuperAdminPetitionContentProps) {

    const [petition, setPetition] = useState(petitions)
    const [searchTerm, setSearchTerm] = useState("")
    const [departmentFilter, setDepartmentFilter] = useState("all")
    const [statusFilter, setStatusFilter] = useState("all")
    const [selectedPetition, setSelectedPetition] = useState<any>(null)
    const [dialogOpen, setDialogOpen] = useState(false)
    const [updatingStatus, setUpdatingStatus] = useState<number | null>(null)
    const { toast } = useToast()

    const updatePetitionStatus = async (petitionId: number, newStatus: string) => {
        setUpdatingStatus(petitionId);
        try {
            const response = await callAPI(`/api/petitions/${petitionId}`, 'PUT', {
                updateMap: {
                    status: newStatus
                }
            } as any);
            
            if (response && response.success) {
                // Update the local state with the new status
                setPetition(prevPetitions => prevPetitions?.map(p => 
                    p.id === petitionId ? {...p, status: newStatus} : p
                ) || []);
                
                // Update the selected petition if it's open in the dialog
                if (selectedPetition && selectedPetition.id === petitionId) {
                    setSelectedPetition({
                        ...selectedPetition,
                        status: newStatus
                    });
                }
                
                // If we're filtering by status and the new status wouldn't be visible,
                // either update the filter to show the new status or set it to "all"
                if (statusFilter !== "all" && statusFilter.toLowerCase() !== newStatus.toLowerCase()) {
                    // Option 1: Switch to the new status filter
                    setStatusFilter(newStatus.toLowerCase());
                    
                    // Option 2: Switch to "all" statuses
                    // setStatusFilter("all");
                    
                    toast({
                        title: "Filter updated",
                        description: `Status filter changed to show the updated petition`,
                    });
                }
                
                toast({
                    title: "Status updated",
                    description: `Petition #${petitionId} status changed to ${newStatus}`,
                });
            } else {
                toast({
                    title: "Update failed",
                    description: response?.message || "Failed to update petition status",
                    variant: "destructive",
                });
            }
        } catch (error) {
            console.error("Error updating petition status:", error);
            toast({
                title: "Error",
                description: "Failed to update petition status",
                variant: "destructive",
            });
        } finally {
            setUpdatingStatus(null);
        }
    };

    const filteredPetitions = petition?.filter((petition) => {
        const matchesSearch =
            petition.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
            (petition.submitted_by?.toLowerCase() || '').includes(searchTerm.toLowerCase())

        const matchesDepartment =
            departmentFilter === "all" || petition.department.toLowerCase() === departmentFilter.toLowerCase()

        const matchesStatus = statusFilter === "all" || petition.status.toLowerCase() === statusFilter.toLowerCase()

        return matchesSearch && matchesDepartment && matchesStatus
    }).sort((a, b) => a.id - b.id) || []

    const openDialog = (petition: any) => {
        setSelectedPetition(petition)
        setDialogOpen(true)
    }

    const closeDialog = () => {
        setSelectedPetition(null)
        setDialogOpen(false)
    }

    return (<motion.div variants={itemVariants}>
        <Card className="bg-slate-900/70 backdrop-blur-sm border-slate-800/50 hover:border-violet-500/30 transition-all duration-300 hover:shadow-[0_0_15px_rgba(139,92,246,0.1)] overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-violet-600/5 to-indigo-600/5 z-0" />
            {/* <CardHeader className="relative z-10">
                <CardTitle className="text-slate-100">All Petitions</CardTitle>
                <CardDescription className="text-slate-400">
                    View and manage petitions across all departments
                </CardDescription>
            </CardHeader> */}
            <CardContent className="relative z-10 mt-6">
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

                <div className="grid grid-cols-1 gap-4">
                    {filteredPetitions.length === 0 ? (
                        <div className="py-8 text-center text-slate-400 bg-slate-900/60 backdrop-blur-sm border border-slate-800/50 rounded-lg shadow-lg">
                            No petitions found matching your criteria
                        </div>
                    ) : (
                        filteredPetitions.map((petition) => (
                            <Card key={petition.id} className="bg-slate-900/70 backdrop-blur-sm border-slate-800/50 hover:border-violet-500/30 transition-all duration-300 hover:shadow-[0_0_15px_rgba(139,92,246,0.1)] overflow-hidden">
                                <div className="absolute inset-0 bg-gradient-to-br from-violet-600/5 to-indigo-600/5 z-0" />

                                <CardHeader className="relative z-10">
                                    <div className="flex flex-col sm:flex-row justify-between items-start gap-2">
                                        <div>
                                            <CardTitle className="text-slate-100">#{petition.id}: {petition.title}</CardTitle>
                                            <CardDescription className="text-slate-400 mt-2 flex items-center gap-2">
                                                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-slate-500" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                                    <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
                                                    <circle cx="12" cy="7" r="4"></circle>
                                                </svg> {petition.submitted_by}
                                                <span className="mx-2 text-slate-500">•</span>
                                                <span className="flex items-center">
                                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-violet-400 mr-1" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                                        <rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect>
                                                        <line x1="16" y1="2" x2="16" y2="6"></line>
                                                        <line x1="8" y1="2" x2="8" y2="6"></line>
                                                        <line x1="3" y1="10" x2="21" y2="10"></line>
                                                    </svg>
                                                    <span className="text-violet-300">Submitted on: <span className="font-medium">{petition.created_at.split("T")[0]}</span></span>
                                                </span>
                                            </CardDescription>
                                        </div>
                                        <div className="flex flex-wrap gap-2">
                                            <div className="flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-indigo-900/60 text-indigo-200">
                                                {petition.department}
                                            </div>
                                            <PriorityBadge priority={petition.severity} />
                                            <StatusBadge status={petition.status} />
                                        </div>
                                    </div>
                                </CardHeader>

                                <CardContent className="relative z-10 text-slate-300">
                                    <div className="space-y-4">
                                        <p className="line-clamp-2">{petition.description}</p>
                                        {petition.due_date && (
                                            <div className="flex items-center justify-between p-3 bg-slate-800/50 rounded-md border border-slate-700/30">
                                                <div className="text-sm">
                                                    <span className="text-slate-400">Due Date: </span>
                                                    <span className="font-medium text-slate-200">{petition.due_date}</span>
                                                </div>
                                                <div>
                                                    {new Date(petition.due_date) < new Date(Date.now() + 7 * 24 * 60 * 60 * 1000) && (
                                                        <Badge className="bg-red-900/60 text-red-200 border-0">Due Soon</Badge>
                                                    )}
                                                </div>
                                            </div>
                                        )}
                                    </div>
                                </CardContent>
                                <CardFooter className="relative z-10 flex flex-wrap justify-between gap-2">
                                    <div className="text-sm text-slate-400">
                                        {petition.assigned_to ? (
                                            <span>Assigned to: <span className="text-slate-300">{petition.assigned_to}</span></span>
                                        ) : (
                                            <span>Not assigned</span>
                                        )}
                                    </div>
                                    <div className="flex gap-2">
                                        <Select
                                            defaultValue={petition.status.toLowerCase().replace(" ", "-")}
                                            onValueChange={(value) => {
                                                const statusMap: Record<string, string> = {
                                                    "new": "New",
                                                    "in-progress": "In Progress",
                                                    "completed": "Completed",
                                                    "rejected": "Rejected"
                                                }
                                                updatePetitionStatus(petition.id, statusMap[value])
                                            }}
                                            disabled={updatingStatus === petition.id}
                                        >
                                            <SelectTrigger className="w-[160px] bg-slate-800/70 border-slate-700/50 text-slate-200 focus:ring-violet-500/70 focus:ring-offset-slate-900">
                                                {updatingStatus === petition.id ? (
                                                    <div className="flex items-center justify-center">
                                                        <Loader2 className="mr-2 h-4 w-4 animate-spin text-violet-400" />
                                                        <span>Updating...</span>
                                                    </div>
                                                ) : (
                                                    <SelectValue placeholder="Update status" />
                                                )}
                                            </SelectTrigger>
                                            <SelectContent className="bg-slate-800 border-slate-700 text-slate-200">
                                                <SelectItem value="new">New</SelectItem>
                                                <SelectItem value="in-progress">In Progress</SelectItem>
                                                <SelectItem value="completed">Completed</SelectItem>
                                                <SelectItem value="rejected">Rejected</SelectItem>
                                            </SelectContent>
                                        </Select>
                                    </div>
                                </CardFooter>
                            </Card>
                        ))
                    )}
                </div>

                <Dialog open={dialogOpen} onOpenChange={closeDialog}>
                    <DialogContent className="bg-slate-900/90 backdrop-blur-sm border border-slate-800/50 rounded-lg shadow-lg p-6">
                        <DialogHeader>
                            <DialogTitle className="text-slate-100">
                                Petition Details
                            </DialogTitle>
                            <DialogDescription className="text-slate-400">
                                View and manage the details of the petition
                            </DialogDescription>
                        </DialogHeader>
                        <div className="mt-4">
                            {selectedPetition && (
                                <div>
                                    <h3 className="text-slate-200 text-lg font-semibold mb-2">
                                        {selectedPetition.title}
                                    </h3>
                                    <p className="text-slate-400 text-sm mb-4">
                                        Submitted by {selectedPetition.submitted_by} on{" "}
                                        {new Date(selectedPetition.created_at).toLocaleDateString()}
                                    </p>
                                    <div className="grid grid-cols-2 gap-4">
                                        <div>
                                            <span className="text-slate-400 text-sm">Department</span>
                                            <p className="text-slate-200">
                                                {selectedPetition.department}
                                            </p>
                                        </div>
                                        <div>
                                            <span className="text-slate-400 text-sm">Status</span>
                                            <StatusBadge status={selectedPetition.status} />
                                        </div>
                                        <div>
                                            <span className="text-slate-400 text-sm">Priority</span>
                                            <PriorityBadge priority={selectedPetition.severity} />
                                        </div>
                                    </div>
                                    <div className="mt-4">
                                        <h4 className="text-slate-300 text-md font-semibold mb-2">
                                            Description
                                        </h4>
                                        <p className="text-slate-200 text-sm">
                                            {selectedPetition.description}
                                        </p>
                                    </div>
                                </div>
                            )}
                        </div>
                    </DialogContent>
                </Dialog>
            </CardContent>
        </Card>
    </motion.div>)
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

function PriorityBadge({ priority }: { priority?: string }) {
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
            {priority || "N/A"}
        </span>
    )
}
