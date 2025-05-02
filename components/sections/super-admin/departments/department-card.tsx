"use client"

import { motion } from "framer-motion"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Building } from "lucide-react"
import { Department } from "./types"
import { itemVariants } from "./types"
import { DepartmentStatusBadge } from "./department-status-badge"
import { DepartmentAdmin } from "./department-admin"
import { DepartmentStats } from "./department-stats"
import { DepartmentActions } from "./department-actions"

interface DepartmentCardProps {
  department: Department
}

export const DepartmentCard = ({ department }: DepartmentCardProps) => {
  return (
    <motion.div variants={itemVariants}>
      <Card className="bg-slate-900/70 backdrop-blur-sm border-slate-800/50 hover:border-violet-500/30 transition-all duration-300 hover:shadow-[0_0_15px_rgba(139,92,246,0.1)] overflow-hidden group">
        <div className="absolute inset-0 bg-gradient-to-br from-violet-600/5 to-indigo-600/5 z-0" />
        <CardHeader className="relative z-10 pb-2">
          <div className="flex justify-between items-start">
            <div className="flex items-center">
              <div className="mr-4 p-2 bg-violet-900/30 rounded-lg">
                <Building className="h-6 w-6 text-violet-300" />
              </div>
              <CardTitle className="text-xl text-slate-100">{department.name}</CardTitle>
            </div>
            <DepartmentStatusBadge status={department.status} />
          </div>
          <CardDescription className="text-slate-400 mt-2">
            {department.description}
          </CardDescription>
        </CardHeader>
        <CardContent className="relative z-10 pt-0">
          <div className="my-2 h-px bg-slate-800/70"></div>
          
          <DepartmentAdmin 
            name={department.adminName} 
            email={department.adminEmail}
          />
          
          <DepartmentStats 
            staffCount={department.staffCount} 
            activePetitions={department.activePetitions} 
          />
          
          <DepartmentActions />
        </CardContent>
      </Card>
    </motion.div>
  );
};