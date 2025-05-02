export type Department = {
  id: number
  name: string
  description: string
  adminName: string
  adminEmail: string
  staffCount: number
  activePetitions: number
  status: string
}

export type NewDepartmentData = {
  name: string
  description: string
  adminName: string
  adminEmail: string
}

// Animation variants for framer motion
export const itemVariants = {
  hidden: { y: 20, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: { type: "spring", stiffness: 100 }
  }
}

export const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      delayChildren: 0.1,
      staggerChildren: 0.1
    }
  }
}

// Mock data for departments
export const mockDepartments: Department[] = [
  {
    id: 1,
    name: "Infrastructure",
    description: "Responsible for city infrastructure and public works",
    adminName: "Michael Johnson",
    adminEmail: "michael.j@gov.org",
    staffCount: 12,
    activePetitions: 8,
    status: "Active"
  },
  {
    id: 2,
    name: "Education",
    description: "Manages educational institutions and programs",
    adminName: "Sarah Williams",
    adminEmail: "sarah.w@gov.org",
    staffCount: 15,
    activePetitions: 5,
    status: "Active"
  },
  {
    id: 3,
    name: "Healthcare",
    description: "Oversees public health initiatives and medical facilities",
    adminName: "David Brown",
    adminEmail: "david.b@gov.org",
    staffCount: 18,
    activePetitions: 10,
    status: "Active"
  },
  {
    id: 4,
    name: "Environment",
    description: "Focuses on environmental conservation and sustainability",
    adminName: "Emily Davis",
    adminEmail: "emily.d@gov.org",
    staffCount: 9,
    activePetitions: 6,
    status: "Active"
  },
  {
    id: 5,
    name: "Public Safety",
    description: "Responsible for community safety and emergency services",
    adminName: "Robert Wilson",
    adminEmail: "robert.w@gov.org",
    staffCount: 20,
    activePetitions: 12,
    status: "Active"
  }
];