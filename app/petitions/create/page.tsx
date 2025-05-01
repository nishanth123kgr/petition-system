"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

export default function CreatePetitionPage() {
  const router = useRouter()
  const [title, setTitle] = useState("")
  const [description, setDescription] = useState("")
  const [category, setCategory] = useState("")
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    // Simulate API call for petition submission and classification
    try {
      // In a real app, you would submit the petition to your backend here
      // The backend would classify the petition based on its content
      await new Promise((resolve) => setTimeout(resolve, 1500))
      router.push("/dashboard/user")
    } catch (error) {
      console.error("Error submitting petition:", error)
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="min-h-screen bg-slate-950 py-12 px-4">
      <div className="max-w-3xl mx-auto">
        <Card className="bg-slate-900 border-slate-800 shadow-xl shadow-violet-900/10">
          <CardHeader>
            <CardTitle className="text-2xl text-white">Create a New Petition</CardTitle>
            <CardDescription className="text-slate-400">
              Fill out the form below to submit your petition. Our system will automatically classify it to the
              appropriate department.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="title" className="text-slate-300">
                  Petition Title
                </Label>
                <Input
                  id="title"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="Enter a clear, concise title for your petition"
                  required
                  className="bg-slate-800 border-slate-700 text-slate-200 focus:border-violet-500"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="category" className="text-slate-300">
                  Category (Optional)
                </Label>
                <Select value={category} onValueChange={setCategory}>
                  <SelectTrigger className="bg-slate-800 border-slate-700 text-slate-200 focus:ring-violet-500">
                    <SelectValue placeholder="Select a category (optional)" />
                  </SelectTrigger>
                  <SelectContent className="bg-slate-800 border-slate-700 text-slate-200">
                    <SelectItem value="infrastructure">Infrastructure</SelectItem>
                    <SelectItem value="education">Education</SelectItem>
                    <SelectItem value="healthcare">Healthcare</SelectItem>
                    <SelectItem value="environment">Environment</SelectItem>
                    <SelectItem value="public-safety">Public Safety</SelectItem>
                    <SelectItem value="other">Other</SelectItem>
                  </SelectContent>
                </Select>
                <p className="text-sm text-slate-500">
                  You can select a category, but our system will also analyze your petition content for accurate
                  classification.
                </p>
              </div>

              <div className="space-y-2">
                <Label htmlFor="description" className="text-slate-300">
                  Petition Details
                </Label>
                <Textarea
                  id="description"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="Describe your petition in detail. Include all relevant information to help with classification."
                  className="min-h-[200px] bg-slate-800 border-slate-700 text-slate-200 focus:border-violet-500"
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="attachments" className="text-slate-300">
                  Attachments (Optional)
                </Label>
                <Input
                  id="attachments"
                  type="file"
                  multiple
                  className="bg-slate-800 border-slate-700 text-slate-200 file:bg-slate-700 file:text-slate-200 file:border-0"
                />
                <p className="text-sm text-slate-500">
                  You can attach relevant documents, images, or other files to support your petition.
                </p>
              </div>
            </form>
          </CardContent>
          <CardFooter className="flex justify-between">
            <Button
              variant="outline"
              onClick={() => router.back()}
              className="border-slate-700 text-slate-300 hover:bg-slate-800 hover:text-slate-100"
            >
              Cancel
            </Button>
            <Button
              onClick={handleSubmit}
              disabled={isSubmitting || !title || !description}
              className="bg-gradient-to-r from-violet-600 to-indigo-600 hover:from-violet-700 hover:to-indigo-700 text-white"
            >
              {isSubmitting ? "Submitting..." : "Submit Petition"}
            </Button>
          </CardFooter>
        </Card>
      </div>
    </div>
  )
}
