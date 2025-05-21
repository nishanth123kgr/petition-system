"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { DepartmentCard } from "./departments/department-card"
import { SearchAndFilterBar } from "./departments/search-and-filter-bar"
import { EmptyState } from "./departments/empty-state"
import { AddDepartmentDialog } from "./departments/add-department-dialog"
import { Department, NewDepartmentData, containerVariants, itemVariants } from "./departments/types"
import callAPI from "@/app/utils/apiCaller"
import { useToast } from "@/hooks/use-toast"
import { Loader2 } from "lucide-react"

export function DepartmentsContent() {
  const [departments, setDepartments] = useState<Department[]>([])
  const [searchTerm, setSearchTerm] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")
  const [openAddDialog, setOpenAddDialog] = useState(false)
  const [loading, setLoading] = useState(true)
  const [creating, setCreating] = useState(false)
  const { toast } = useToast()
  
  const [newDepartment, setNewDepartment] = useState<NewDepartmentData>({
    name: "",
    description: "",
    adminName: "",
    adminEmail: ""
  })

  // Fetch departments from API
  useEffect(() => {
    fetchDepartments()
  }, [])

  const fetchDepartments = async () => {
    setLoading(true)
    try {
      const response = await callAPI('/api/departments', 'GET')
      
      if (response.success) {
        // Transform the data to match our component needs
        const formattedDepartments = response.data.map((dept: any) => ({
          id: dept.id,
          name: dept.name,
          description: dept.description || "No description available",
          adminName: dept.adminName,
          adminEmail: dept.adminEmail,
          staffCount: dept.staffCount || 0,
          activePetitions: dept.petitionCount || 0,
          status: dept.status || "Active"
        }))
        
        setDepartments(formattedDepartments)
      } else {
        toast({
          variant: "destructive",
          title: "Error fetching departments",
          description: response.message || "Failed to load departments"
        })
      }
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Error fetching departments",
        description: "An unexpected error occurred"
      })
    } finally {
      setLoading(false)
    }
  }
  
  // Filter departments based on search term and status
  const filteredDepartments = departments.filter((department) => {
    const matchesSearch =
      department.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (department.description?.toLowerCase().includes(searchTerm.toLowerCase()) ?? false) ||
      department.adminName.toLowerCase().includes(searchTerm.toLowerCase())

    const matchesStatus =
      statusFilter === "all" || department.status.toLowerCase() === statusFilter.toLowerCase()

    return matchesSearch && matchesStatus
  })

  // Add new department
  const handleAddDepartment = async () => {
    setCreating(true)
    try {
      // Send the department creation request with admin details
      const departmentResponse = await callAPI('/api/departments', 'POST', {
        name: newDepartment.name,
        adminName: newDepartment.adminName,
        adminEmail: newDepartment.adminEmail
      } as any)
      
      if (departmentResponse.success) {
        toast({
          title: "Department created",
          description: `${newDepartment.name} has been created successfully. An email with login credentials has been sent to ${newDepartment.adminEmail}.`
        })
        
        // Refresh departments list
        fetchDepartments()
        
        // Close dialog and reset form
        setOpenAddDialog(false)
        setNewDepartment({ name: "", description: "", adminName: "", adminEmail: "" })
      } else {
        toast({
          variant: "destructive",
          title: "Error creating department",
          description: departmentResponse.message || "Failed to create department"
        })
      }
    } catch (error) {
      console.error("Error creating department:", error)
      toast({
        variant: "destructive",
        title: "Error creating department",
        description: error instanceof Error ? error.message : "An unexpected error occurred"
      })
    } finally {
      setCreating(false)
    }
  }
  
  // Generate a random temporary password
  const generateTempPassword = () => {
    const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*"
    let password = ""
    for (let i = 0; i < 10; i++) {
      password += chars.charAt(Math.floor(Math.random() * chars.length))
    }
    return password
  }

  return (
    <motion.div 
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="space-y-6 p-6"
    >
      <motion.div variants={itemVariants}>
        <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-4">
          <div>
            <h1 className="text-3xl font-bold bg-gradient-to-r from-purple-200 to-fuchsia-200 bg-clip-text text-transparent">
              Departments
            </h1>
            <p className="text-slate-400 mt-1">
              Manage departments and their administrators
            </p>
          </div>
          
          <AddDepartmentDialog
            open={openAddDialog}
            setOpen={setOpenAddDialog}
            newDepartment={newDepartment}
            setNewDepartment={setNewDepartment}
            handleAddDepartment={handleAddDepartment}
            isCreating={creating}
          />
        </div>
      </motion.div>
      
      <motion.div variants={itemVariants}>
        <SearchAndFilterBar
          searchTerm={searchTerm}
          setSearchTerm={setSearchTerm}
          statusFilter={statusFilter}
          setStatusFilter={setStatusFilter}
        />
        
        {loading ? (
          <div className="flex justify-center items-center py-20">
            <Loader2 className="h-10 w-10 animate-spin text-purple-500" />
            <span className="ml-2 text-slate-400">Loading departments...</span>
          </div>
        ) : (
          <>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 mt-4">
              {filteredDepartments.map((department) => (
                <DepartmentCard key={department.id} department={department} />
              ))}
            </div>
            
            {filteredDepartments.length === 0 && <EmptyState />}
          </>
        )}
      </motion.div>
    </motion.div>
  )
}