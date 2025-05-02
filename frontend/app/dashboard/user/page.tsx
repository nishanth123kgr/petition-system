"use client"

import { useState } from "react"
import { UserDashboardLayout } from "@/components/layouts/user-dashboard-layout"
import { UserDashboardContent } from "@/components/sections/user/user-dashboard-content"

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

export default function UserDashboardPage() {
  return (
    <UserDashboardLayout>
      <UserDashboardContent petitions={mockPetitions} />
    </UserDashboardLayout>
  )
}
