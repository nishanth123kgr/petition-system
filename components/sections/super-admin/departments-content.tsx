"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { DepartmentCard } from "./departments/department-card"
import { SearchAndFilterBar } from "./departments/search-and-filter-bar"
import { EmptyState } from "./departments/empty-state"
import { AddDepartmentDialog } from "./departments/add-department-dialog"
import { Department, NewDepartmentData, containerVariants, itemVariants, mockDepartments } from "./departments/types"

export function DepartmentsContent() {
  const [departments, setDepartments] = useState<Department[]>(mockDepartments)
  const [searchTerm, setSearchTerm] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")
  const [openAddDialog, setOpenAddDialog] = useState(false)
  const [newDepartment, setNewDepartment] = useState<NewDepartmentData>({
    name: "",
    description: "",
    adminName: "",
    adminEmail: ""
  })

  // Filter departments based on search term and status
  const filteredDepartments = departments.filter((department) => {
    const matchesSearch =
      department.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      department.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      department.adminName.toLowerCase().includes(searchTerm.toLowerCase())

    const matchesStatus =
      statusFilter === "all" || department.status.toLowerCase() === statusFilter.toLowerCase()

    return matchesSearch && matchesStatus
  })

  // Add new department
  const handleAddDepartment = () => {
    const newDept: Department = {
      id: departments.length + 1,
      name: newDepartment.name,
      description: newDepartment.description,
      adminName: newDepartment.adminName,
      adminEmail: newDepartment.adminEmail,
      staffCount: 0,
      activePetitions: 0,
      status: "Active"
    }

    setDepartments([...departments, newDept])
    setOpenAddDialog(false)
    setNewDepartment({ name: "", description: "", adminName: "", adminEmail: "" })
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
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          {filteredDepartments.map((department) => (
            <DepartmentCard key={department.id} department={department} />
          ))}
        </div>
        
        {filteredDepartments.length === 0 && <EmptyState />}
      </motion.div>
    </motion.div>
  )
}