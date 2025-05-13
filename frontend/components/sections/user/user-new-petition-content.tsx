'use client'

import React, { useState } from "react"
import { motion } from "framer-motion"
import { Card, CardContent, CardHeader, CardTitle } from "../../../components/ui/card"
import { Button } from "../../../components/ui/button"
import { Input } from "../../../components/ui/input"
import { Label } from "../../../components/ui/label"
import { Textarea } from "../../../components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../../../components/ui/select"
import { AlertCircle, FileText, Loader2 } from "lucide-react"
import callAPI from "../../../app/utils/apiCaller"
import { useToast } from "@/hooks/use-toast"

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

export function UserNewPetitionContent() {
  const [title, setTitle] = useState("")
  const [department, setDepartment] = useState("")
  const [description, setDescription] = useState("")
  const [location, setLocation] = useState("")
  const [formError, setFormError] = useState<string | null>(null)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const { toast } = useToast()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    // Basic validation - department is now optional
    if (!title || !description) {
      setFormError("Please fill in all required fields")
      return
    }
    
    // Clear error if form is valid
    setFormError(null)
    
    // Set loading state to true when starting submission
    setIsSubmitting(true)
    
    try {
      // Here you would typically send the data to your API
      const result = await callAPI('/api/petitions', 'POST', {
        title,
        departmentName: department,
        description,
        location
      } as any)
      
      if (result.error) {
        setFormError("Failed to submit petition. Please try again.")
        return
      }
      
      // Reset form after submission (in real app, you might redirect)
      setTitle("")
      setDepartment("")
      setDescription("")
      setLocation("")
      
      toast({
        title: "Petition submitted successfully",
        description: "Your petition has been submitted.",
        variant: "success",
      })
    } catch (error) {
      setFormError("An error occurred while submitting the petition.")
    } finally {
      // Set loading state back to false regardless of outcome
      setIsSubmitting(false)
    }
  }

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
              Create New Petition
            </h1>
            <p className="text-slate-400">
              Submit a new petition request to the relevant department
            </p>
          </div>
        </motion.div>

        <motion.div variants={itemVariants}>
          <Card className="bg-slate-900/60 backdrop-blur-sm border-slate-800/50 overflow-hidden transition-all duration-300">
            <div className="absolute inset-0 bg-gradient-to-br from-violet-600/5 to-indigo-600/5 z-0" />
            <CardHeader className="relative z-10 pb-0">
              <CardTitle className="flex items-center gap-2 text-lg font-medium text-slate-100">
                <FileText className="h-5 w-5 text-violet-400" />
                Petition Details
              </CardTitle>
            </CardHeader>
            <CardContent className="relative z-10 pt-6">
              <form onSubmit={handleSubmit} className="space-y-6">
                {formError && (
                  <div className="bg-red-900/20 border border-red-800 text-red-300 px-4 py-3 rounded-md flex items-center gap-2 text-sm">
                    <AlertCircle className="h-4 w-4" />
                    {formError}
                  </div>
                )}
                
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="title" className="text-slate-200">
                      Petition Title <span className="text-red-400">*</span>
                    </Label>
                    <Input
                      id="title"
                      value={title}
                      onChange={(e) => setTitle(e.target.value)}
                      placeholder="Brief title for your petition"
                      className="bg-slate-800/50 border-slate-700 text-slate-200 focus:border-violet-500/50"
                      required
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="department" className="text-slate-200">
                      Department
                    </Label>
                    <Select value={department} onValueChange={setDepartment}>
                      <SelectTrigger 
                        id="department"
                        className="bg-slate-800/50 border-slate-700 text-slate-200 focus:border-violet-500/50"
                      >
                        <SelectValue placeholder="Select a department (optional)" />
                      </SelectTrigger>
                      <SelectContent className="bg-slate-800 border-slate-700 text-slate-200">
                        <SelectItem value="infrastructure">Infrastructure</SelectItem>
                        <SelectItem value="environment">Environment</SelectItem>
                        <SelectItem value="public-safety">Public Safety</SelectItem>
                        <SelectItem value="education">Education</SelectItem>
                        <SelectItem value="health">Health</SelectItem>
                        <SelectItem value="other">Other</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="location" className="text-slate-200">
                      Location (if applicable)
                    </Label>
                    <Input
                      id="location"
                      value={location}
                      onChange={(e) => setLocation(e.target.value)}
                      placeholder="Specific location relevant to the petition"
                      className="bg-slate-800/50 border-slate-700 text-slate-200 focus:border-violet-500/50"
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="description" className="text-slate-200">
                      Description <span className="text-red-400">*</span>
                    </Label>
                    <Textarea
                      id="description"
                      value={description}
                      onChange={(e) => setDescription(e.target.value)}
                      placeholder="Detailed description of the issue or request"
                      className="bg-slate-800/50 border-slate-700 text-slate-200 focus:border-violet-500/50 min-h-[120px]"
                      required
                    />
                  </div>
                </div>
                
                <div className="pt-4">
                  <Button 
                    type="submit" 
                    className="bg-gradient-to-r from-violet-600 to-indigo-600 hover:from-violet-500 hover:to-indigo-500 text-white shadow-lg shadow-violet-900/30 transition-all duration-300 relative group overflow-hidden"
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? (
                      <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        Submitting...
                      </>
                    ) : (
                      "Submit Petition"
                    )}
                    <span className="absolute inset-0 h-full w-full scale-0 rounded-md bg-white/10 transition-all duration-300 group-hover:scale-100 group-hover:opacity-100" />
                  </Button>
                </div>
              </form>
            </CardContent>
          </Card>
        </motion.div>
      </motion.div>
    </div>
  )
}