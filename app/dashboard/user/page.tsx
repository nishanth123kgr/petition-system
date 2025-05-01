"use client"

import { useState } from "react"
import Link from "next/link"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { UserDashboardLayout } from "@/components/layouts/user-dashboard-layout"

// Mock data for petitions
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

export default function UserDashboardPage() {
  const [petitions, setPetitions] = useState(mockPetitions)

  return (
    <UserDashboardLayout>
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
          <motion.div variants={itemVariants} className="flex justify-between items-center">
            <div className="space-y-2">
              <h1 className="text-3xl font-bold bg-gradient-to-r from-violet-200 to-indigo-200 bg-clip-text text-transparent">
                My Petitions
              </h1>
              <p className="text-slate-400">
                View and manage all your submitted petitions
              </p>
            </div>
            <Link href="/petitions/create">
              <Button className="relative overflow-hidden group bg-gradient-to-r from-violet-600 to-indigo-600 hover:from-violet-500 hover:to-indigo-500 text-white shadow-lg shadow-violet-900/30 transition-all duration-300 font-medium">
                <span className="relative z-10">Create New Petition</span>
                <span className="absolute inset-0 h-full w-full scale-0 rounded-full bg-white/10 transition-all duration-300 group-hover:scale-100 group-hover:opacity-100" />
              </Button>
            </Link>
          </motion.div>

          <motion.div variants={itemVariants}>
            <div className="bg-slate-900/60 backdrop-blur-sm border border-slate-800/50 rounded-lg overflow-hidden">
              <Tabs defaultValue="all" className="w-full">
                <div className="px-4 pt-4">
                  <TabsList className="bg-slate-800/60 grid w-full grid-cols-3">
                    <TabsTrigger value="all" className="data-[state=active]:bg-violet-600/30 data-[state=active]:text-violet-50">
                      All Petitions
                    </TabsTrigger>
                    <TabsTrigger value="active" className="data-[state=active]:bg-violet-600/30 data-[state=active]:text-violet-50">
                      Active
                    </TabsTrigger>
                    <TabsTrigger value="completed" className="data-[state=active]:bg-violet-600/30 data-[state=active]:text-violet-50">
                      Completed
                    </TabsTrigger>
                  </TabsList>
                </div>

                <div className="p-4">
                  <TabsContent value="all" className="space-y-4 mt-0">
                    {petitions.length > 0 ? (
                      petitions.map((petition, index) => (
                        <motion.div
                          key={petition.id}
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: 0.1 * index, duration: 0.5 }}
                        >
                          <PetitionCard petition={petition} />
                        </motion.div>
                      ))
                    ) : (
                      <EmptyState message="You haven't submitted any petitions yet." />
                    )}
                  </TabsContent>

                  <TabsContent value="active" className="space-y-4 mt-0">
                    {petitions.filter((p) => p.status !== "Completed").length > 0 ? (
                      petitions
                        .filter((p) => p.status !== "Completed")
                        .map((petition, index) => (
                          <motion.div
                            key={petition.id}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.1 * index, duration: 0.5 }}
                          >
                            <PetitionCard petition={petition} />
                          </motion.div>
                        ))
                    ) : (
                      <EmptyState message="You don't have any active petitions." />
                    )}
                  </TabsContent>

                  <TabsContent value="completed" className="space-y-4 mt-0">
                    {petitions.filter((p) => p.status === "Completed").length > 0 ? (
                      petitions
                        .filter((p) => p.status === "Completed")
                        .map((petition, index) => (
                          <motion.div
                            key={petition.id}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.1 * index, duration: 0.5 }}
                          >
                            <PetitionCard petition={petition} />
                          </motion.div>
                        ))
                    ) : (
                      <EmptyState message="You don't have any completed petitions yet." />
                    )}
                  </TabsContent>
                </div>
              </Tabs>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </UserDashboardLayout>
  )
}

function PetitionCard({ petition }: { petition: any }) {
  return (
    <Card className="bg-slate-900/70 backdrop-blur-sm border-slate-800/50 hover:border-violet-500/30 transition-all duration-300 hover:shadow-[0_0_15px_rgba(139,92,246,0.1)] overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-violet-600/5 to-indigo-600/5 z-0" />
      
      <CardHeader className="relative z-10">
        <div className="flex justify-between items-start">
          <div>
            <CardTitle className="text-slate-100">{petition.title}</CardTitle>
            <CardDescription className="text-slate-400">Submitted on {petition.createdAt}</CardDescription>
          </div>
          <StatusBadge status={petition.status} />
        </div>
      </CardHeader>
      <CardContent className="relative z-10 text-slate-300">
        <div className="space-y-2">
          <div>
            <span className="font-medium text-slate-200">Department: </span>
            <span>{petition.department}</span>
          </div>
          <p>{petition.description}</p>
        </div>
      </CardContent>
      <CardFooter className="relative z-10 flex justify-end">
        <Link href={`/petitions/${petition.id}`}>
          <Button className="relative overflow-hidden group bg-gradient-to-r from-violet-600 to-indigo-600 hover:from-violet-500 hover:to-indigo-500 text-white shadow-lg shadow-violet-900/30 transition-all duration-300">
            <span className="relative z-10">View Details</span>
            <span className="absolute inset-0 h-full w-full scale-0 rounded-full bg-white/10 transition-all duration-300 group-hover:scale-100 group-hover:opacity-100" />
          </Button>
        </Link>
      </CardFooter>
    </Card>
  )
}

function StatusBadge({ status }: { status: string }) {
  let bgColor = "bg-slate-700"
  let textColor = "text-slate-200"

  switch (status) {
    case "Under Review":
      bgColor = "bg-indigo-900/60"
      textColor = "text-indigo-200"
      break
    case "Assigned":
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

function EmptyState({ message }: { message: string }) {
  return (
    <div className="text-center py-12">
      <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-slate-800/80 mb-4">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="text-slate-400"
        >
          <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
          <path d="M14 2v6h6" />
        </svg>
      </div>
      <p className="text-slate-400 font-medium">{message}</p>
      <p className="text-slate-500 text-sm mt-1">
        Create a new petition to get started.
      </p>
    </div>
  )
}
