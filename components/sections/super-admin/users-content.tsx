"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { 
  User, 
  Plus, 
  Check, 
  X, 
  Edit, 
  Trash2, 
  Shield, 
  Building, 
  Users, 
  Clock, 
  UserPlus,
  MoreVertical,
  Mail
} from "lucide-react"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"

// Mock data for users
const mockUsers = [
  {
    id: 1,
    name: "John Smith",
    email: "john.smith@example.com",
    role: "Citizen",
    department: null,
    status: "Active",
    joined: "2024-01-15",
    petitionsCreated: 3,
    verified: true
  },
  {
    id: 2,
    name: "Michael Johnson",
    email: "michael.j@gov.org",
    role: "Department Admin",
    department: "Infrastructure",
    status: "Active",
    joined: "2023-11-20",
    petitionsCreated: 0,
    verified: true
  },
  {
    id: 3,
    name: "Sarah Williams",
    email: "sarah.w@gov.org",
    role: "Department Admin",
    department: "Education",
    status: "Active",
    joined: "2023-12-05",
    petitionsCreated: 0,
    verified: true
  },
  {
    id: 4,
    name: "Emily Parker",
    email: "emily.p@gov.org",
    role: "Staff",
    department: "Healthcare",
    status: "Active",
    joined: "2024-02-10",
    petitionsCreated: 0,
    verified: true
  },
  {
    id: 5,
    name: "Robert Wilson",
    email: "robert.w@gov.org",
    role: "Department Admin",
    department: "Public Safety",
    status: "Active",
    joined: "2023-10-18",
    petitionsCreated: 0,
    verified: true
  },
  {
    id: 6,
    name: "Anna Thompson",
    email: "anna.t@example.com",
    role: "Citizen",
    department: null,
    status: "Pending",
    joined: "2024-04-25",
    petitionsCreated: 0,
    verified: false
  },
  {
    id: 7,
    name: "James Brown",
    email: "james.b@gov.org",
    role: "Staff",
    department: "Education",
    status: "Active",
    joined: "2024-01-22",
    petitionsCreated: 0,
    verified: true
  },
  {
    id: 8,
    name: "Lisa Davis",
    email: "lisa.d@example.com",
    role: "Citizen",
    department: null,
    status: "Active",
    joined: "2023-12-12",
    petitionsCreated: 5,
    verified: true
  },
  {
    id: 9,
    name: "Mark Robinson",
    email: "mark.r@gov.org",
    role: "Staff",
    department: "Infrastructure",
    status: "Inactive",
    joined: "2023-09-05",
    petitionsCreated: 0,
    verified: true
  },
  {
    id: 10,
    name: "Patricia Garcia",
    email: "patricia.g@example.com",
    role: "Citizen",
    department: null,
    status: "Active",
    joined: "2024-03-03",
    petitionsCreated: 2,
    verified: true
  }
];

// Role options for filtering and creation
const roleOptions = [
  { value: "citizen", label: "Citizen" },
  { value: "staff", label: "Staff" },
  { value: "department-admin", label: "Department Admin" },
  { value: "super-admin", label: "Super Admin" }
];

// Department options
const departmentOptions = [
  { value: "infrastructure", label: "Infrastructure" },
  { value: "education", label: "Education" },
  { value: "healthcare", label: "Healthcare" },
  { value: "environment", label: "Environment" },
  { value: "public-safety", label: "Public Safety" }
];

// Status options
const statusOptions = [
  { value: "active", label: "Active" },
  { value: "pending", label: "Pending" },
  { value: "inactive", label: "Inactive" },
  { value: "suspended", label: "Suspended" }
];

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

export function UsersContent() {
  const [activeTab, setActiveTab] = useState("all")
  const [users, setUsers] = useState(mockUsers)
  const [searchTerm, setSearchTerm] = useState("")
  const [roleFilter, setRoleFilter] = useState("all")
  const [statusFilter, setStatusFilter] = useState("all")
  const [openAddDialog, setOpenAddDialog] = useState(false)
  const [newUser, setNewUser] = useState({
    name: "",
    email: "",
    role: "citizen",
    department: "",
    status: "active"
  })

  // Get filtered users based on search term, role and status
  const filteredUsers = users.filter((user) => {
    // Match search term
    const matchesSearch =
      user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (user.department && user.department.toLowerCase().includes(searchTerm.toLowerCase()))

    // Match role filter
    const matchesRole =
      roleFilter === "all" || user.role.toLowerCase() === roleFilter.toLowerCase()

    // Match status filter
    const matchesStatus =
      statusFilter === "all" || user.status.toLowerCase() === statusFilter.toLowerCase()

    // Match tab selection
    let matchesTab = true
    if (activeTab === "verified") {
      matchesTab = user.verified === true
    } else if (activeTab === "pending") {
      matchesTab = user.status === "Pending"
    } else if (activeTab === "staff") {
      matchesTab = user.role === "Staff" || user.role === "Department Admin"
    } else if (activeTab === "citizens") {
      matchesTab = user.role === "Citizen"
    }

    return matchesSearch && matchesRole && matchesStatus && matchesTab
  })

  // Add new user
  const handleAddUser = () => {
    const newUserObj = {
      id: users.length + 1,
      name: newUser.name,
      email: newUser.email,
      role: newUser.role.charAt(0).toUpperCase() + newUser.role.slice(1),
      department: newUser.role === "citizen" ? null : departmentOptions.find(d => d.value === newUser.department)?.label || null,
      status: newUser.status.charAt(0).toUpperCase() + newUser.status.slice(1),
      joined: new Date().toISOString().split('T')[0],
      petitionsCreated: 0,
      verified: newUser.status === "active"
    }

    setUsers([...users, newUserObj])
    setOpenAddDialog(false)
    setNewUser({
      name: "",
      email: "",
      role: "citizen",
      department: "",
      status: "active"
    })
  }

  // Get stats for users
  const totalUsers = users.length
  const activeUsers = users.filter(user => user.status === "Active").length
  const pendingVerification = users.filter(user => user.status === "Pending").length
  const totalCitizens = users.filter(user => user.role === "Citizen").length
  const totalStaff = users.filter(user => user.role === "Staff" || user.role === "Department Admin").length

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
              Users Management
            </h1>
            <p className="text-slate-400 mt-1">
              Manage users and their permissions
            </p>
          </div>
          
          <Dialog open={openAddDialog} onOpenChange={setOpenAddDialog}>
            <DialogTrigger asChild>
              <Button 
                className="bg-gradient-to-r from-purple-600 to-fuchsia-600 hover:from-purple-500 hover:to-fuchsia-500 text-white shadow-lg shadow-purple-900/30 group relative overflow-hidden"
              >
                <UserPlus className="mr-2 h-4 w-4" />
                <span>Add User</span>
                <span className="absolute inset-0 h-full w-full scale-0 rounded-md bg-white/10 transition-all duration-300 group-hover:scale-100 group-hover:opacity-100" />
              </Button>
            </DialogTrigger>
            <DialogContent className="bg-slate-900 border-slate-800/50 shadow-xl overflow-hidden max-w-md">
              <div className="absolute inset-0 bg-gradient-to-br from-purple-800/10 to-fuchsia-800/10 z-0" />
              <div className="absolute -top-24 -right-24 w-48 h-48 bg-purple-600 rounded-full opacity-10 blur-3xl" />
              <div className="absolute -bottom-24 -left-24 w-48 h-48 bg-fuchsia-600 rounded-full opacity-10 blur-3xl" />
              
              <DialogHeader className="relative z-10">
                <div className="flex items-center space-x-2">
                  <div className="p-2 rounded-full bg-gradient-to-r from-purple-600/20 to-fuchsia-600/20">
                    <UserPlus className="h-5 w-5 text-purple-300" />
                  </div>
                  <DialogTitle className="text-xl bg-gradient-to-r from-purple-200 to-fuchsia-200 bg-clip-text text-transparent font-bold">
                    Add New User
                  </DialogTitle>
                </div>
                <DialogDescription className="text-slate-400 mt-2">
                  Create a new user account and assign appropriate roles and permissions.
                </DialogDescription>
              </DialogHeader>
              
              <div className="grid gap-5 py-6 relative z-10">
                <div className="grid grid-cols-4 items-center gap-4 group">
                  <label htmlFor="name" className="text-right text-slate-400 text-sm group-focus-within:text-purple-300 transition-colors">
                    Name
                  </label>
                  <div className="col-span-3 relative">
                    <Input
                      id="name"
                      value={newUser.name}
                      onChange={(e) => setNewUser({...newUser, name: e.target.value})}
                      className="bg-slate-800/70 border-slate-700/50 text-slate-200 focus-visible:ring-purple-500/70 focus-visible:border-purple-500/50 transition-all"
                      placeholder="User name"
                    />
                    <div className="absolute inset-0 border border-purple-500/0 rounded-md pointer-events-none transition-all duration-300 group-focus-within:border-purple-500/30"></div>
                  </div>
                </div>
                
                <div className="grid grid-cols-4 items-center gap-4 group">
                  <label htmlFor="email" className="text-right text-slate-400 text-sm group-focus-within:text-purple-300 transition-colors">
                    Email
                  </label>
                  <div className="col-span-3 relative">
                    <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-500 group-focus-within:text-purple-400 transition-colors" />
                    <Input
                      id="email"
                      type="email"
                      value={newUser.email}
                      onChange={(e) => setNewUser({...newUser, email: e.target.value})}
                      className="bg-slate-800/70 border-slate-700/50 text-slate-200 pl-10 focus-visible:ring-purple-500/70 focus-visible:border-purple-500/50 transition-all"
                      placeholder="user@example.com"
                    />
                    <div className="absolute inset-0 border border-purple-500/0 rounded-md pointer-events-none transition-all duration-300 group-focus-within:border-purple-500/30"></div>
                  </div>
                </div>
                
                <div className="grid grid-cols-4 items-center gap-4">
                  <label htmlFor="role" className="text-right text-slate-400 text-sm">
                    Role
                  </label>
                  <div className="col-span-3">
                    <Select 
                      value={newUser.role} 
                      onValueChange={(value) => setNewUser({...newUser, role: value, department: value === "citizen" ? "" : newUser.department})}
                    >
                      <SelectTrigger className="bg-slate-800/70 border-slate-700/50 text-slate-200 focus:ring-purple-500/70 focus:ring-offset-slate-900 transition-all">
                        <SelectValue placeholder="Select role" />
                      </SelectTrigger>
                      <SelectContent className="bg-slate-800 border-slate-700 text-slate-200">
                        {roleOptions.map((role) => (
                          <SelectItem 
                            key={role.value} 
                            value={role.value}
                            className="focus:bg-purple-900/30 focus:text-purple-200"
                          >
                            <div className="flex items-center">
                              {role.value === "super-admin" && <Shield className="h-3.5 w-3.5 mr-2 text-purple-400" />}
                              {role.value === "department-admin" && <Building className="h-3.5 w-3.5 mr-2 text-amber-400" />}
                              {role.value === "staff" && <Users className="h-3.5 w-3.5 mr-2 text-blue-400" />}
                              {role.value === "citizen" && <User className="h-3.5 w-3.5 mr-2 text-slate-400" />}
                              {role.label}
                            </div>
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                
                {(newUser.role !== "citizen" && newUser.role !== "super-admin") && (
                  <motion.div 
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.2 }}
                    className="grid grid-cols-4 items-center gap-4"
                  >
                    <label htmlFor="department" className="text-right text-slate-400 text-sm">
                      Department
                    </label>
                    <div className="col-span-3">
                      <Select 
                        value={newUser.department} 
                        onValueChange={(value) => setNewUser({...newUser, department: value})}
                      >
                        <SelectTrigger className="bg-slate-800/70 border-slate-700/50 text-slate-200 focus:ring-purple-500/70 focus:ring-offset-slate-900">
                          <SelectValue placeholder="Select department" />
                        </SelectTrigger>
                        <SelectContent className="bg-slate-800 border-slate-700 text-slate-200">
                          {departmentOptions.map((dept) => (
                            <SelectItem 
                              key={dept.value} 
                              value={dept.value}
                              className="focus:bg-purple-900/30 focus:text-purple-200"
                            >
                              {dept.label}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                  </motion.div>
                )}
                
              </div>
              
              <DialogFooter className="relative z-10 flex space-x-2 pt-2 border-t border-slate-800/50">
                <Button 
                  variant="outline" 
                  onClick={() => setOpenAddDialog(false)}
                  className="bg-transparent border-violet-500/50 text-violet-300 hover:bg-violet-600/10 hover:border-violet-400 hover:text-white transition-all duration-300"
                  >
                  Cancel
                </Button>
                <Button 
                  onClick={handleAddUser}
                  className="bg-gradient-to-r from-purple-600 to-fuchsia-600 hover:from-purple-500 hover:to-fuchsia-500 text-white shadow-lg shadow-purple-600/20 transition-all duration-300"
                  disabled={!newUser.name || !newUser.email || (!newUser.department && newUser.role !== "citizen" && newUser.role !== "super-admin")}
                >
                  <span>Add User</span>
                  <div className="ml-2 h-4 w-4">
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M5 12h14"></path>
                      <path d="M12 5l7 7-7 7"></path>
                    </svg>
                  </div>
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>
      </motion.div>
      
      {/* Statistics Cards */}
      <motion.div variants={itemVariants}>
        <div className="grid grid-cols-1 md:grid-cols-5 gap-4 mb-6">
          <Card className="bg-slate-900/60 backdrop-blur-sm border-slate-800/50 overflow-hidden hover:border-purple-500/30 transition-all duration-300">
            <div className="absolute inset-0 bg-gradient-to-br from-purple-600/5 to-fuchsia-600/5 z-0" />
            <CardHeader className="pb-2 relative z-10">
              <CardTitle className="text-sm font-medium text-slate-300">Total Users</CardTitle>
            </CardHeader>
            <CardContent className="relative z-10">
              <div className="text-2xl font-bold text-white">{totalUsers}</div>
              <div className="text-xs text-slate-400 mt-1">System accounts</div>
            </CardContent>
          </Card>
          
          <Card className="bg-slate-900/60 backdrop-blur-sm border-slate-800/50 overflow-hidden hover:border-purple-500/30 transition-all duration-300">
            <div className="absolute inset-0 bg-gradient-to-br from-purple-600/5 to-fuchsia-600/5 z-0" />
            <CardHeader className="pb-2 relative z-10">
              <CardTitle className="text-sm font-medium text-slate-300">Citizens</CardTitle>
            </CardHeader>
            <CardContent className="relative z-10">
              <div className="text-2xl font-bold text-white">{totalCitizens}</div>
              <div className="text-xs text-slate-400 mt-1">{Math.round((totalCitizens / totalUsers) * 100)}% of users</div>
            </CardContent>
          </Card>
          
          <Card className="bg-slate-900/60 backdrop-blur-sm border-slate-800/50 overflow-hidden hover:border-purple-500/30 transition-all duration-300">
            <div className="absolute inset-0 bg-gradient-to-br from-purple-600/5 to-fuchsia-600/5 z-0" />
            <CardHeader className="pb-2 relative z-10">
              <CardTitle className="text-sm font-medium text-slate-300">Staff & Admins</CardTitle>
            </CardHeader>
            <CardContent className="relative z-10">
              <div className="text-2xl font-bold text-white">{totalStaff}</div>
              <div className="text-xs text-slate-400 mt-1">{Math.round((totalStaff / totalUsers) * 100)}% of users</div>
            </CardContent>
          </Card>
        </div>
      </motion.div>
      
      <motion.div variants={itemVariants}>
        <Tabs defaultValue="all" value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="bg-slate-800/50 border border-slate-700/50 mb-6">
            <TabsTrigger 
              value="all" 
              className="data-[state=active]:bg-slate-700/50 data-[state=active]:text-slate-200 text-slate-400"
            >
              All Users
            </TabsTrigger>
            <TabsTrigger 
              value="citizens"
              className="data-[state=active]:bg-slate-700/50 data-[state=active]:text-slate-200 text-slate-400"
            >
              Citizens
            </TabsTrigger>
            <TabsTrigger 
              value="staff"
              className="data-[state=active]:bg-slate-700/50 data-[state=active]:text-slate-200 text-slate-400"
            >
              Staff & Admins
            </TabsTrigger>
          </TabsList>

          <div className="p-4 bg-slate-900/60 backdrop-blur-sm border border-slate-800/50 rounded-lg shadow-lg mb-6">
            <div className="flex flex-col sm:flex-row gap-4">
              <div className="flex-1 relative">
                <Input
                  placeholder="Search users..."
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
              <Select value={roleFilter} onValueChange={setRoleFilter}>
                <SelectTrigger className="w-[180px] bg-slate-800/70 border-slate-700/50 text-slate-200 focus:ring-violet-500/70 focus:ring-offset-slate-900">
                  <SelectValue placeholder="Role" />
                </SelectTrigger>
                <SelectContent className="bg-slate-800 border-slate-700 text-slate-200">
                  <SelectItem value="all">All Roles</SelectItem>
                  <SelectItem value="citizen">Citizen</SelectItem>
                  <SelectItem value="staff">Staff</SelectItem>
                  <SelectItem value="department admin">Department Admin</SelectItem>
                  <SelectItem value="super admin">Super Admin</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <TabsContent value="all" className="mt-0">
            <UsersTable users={filteredUsers} />
          </TabsContent>
          
          <TabsContent value="citizens" className="mt-0">
            <UsersTable users={filteredUsers} />
          </TabsContent>
          
          <TabsContent value="staff" className="mt-0">
            <UsersTable users={filteredUsers} />
          </TabsContent>
          
          <TabsContent value="verified" className="mt-0">
            <UsersTable users={filteredUsers} />
          </TabsContent>
          
          <TabsContent value="pending" className="mt-0">
            <UsersTable users={filteredUsers} />
          </TabsContent>
        </Tabs>
      </motion.div>
    </motion.div>
  )
}

function UsersTable({ users }: { users: any[] }) {
  return (
    <div className="overflow-x-auto bg-slate-900/60 backdrop-blur-sm border border-slate-800/50 rounded-lg shadow-lg">
      <table className="w-full">
        <thead>
          <tr className="border-b border-slate-800">
            <th className="text-left py-3 px-4 text-slate-300 font-medium">User</th>
            <th className="text-left py-3 px-4 text-slate-300 font-medium">Email</th>
            <th className="text-left py-3 px-4 text-slate-300 font-medium">Role</th>
            <th className="text-left py-3 px-4 text-slate-300 font-medium">Department</th>
            <th className="text-left py-3 px-4 text-slate-300 font-medium">Joined</th>
          </tr>
        </thead>
        <tbody>
          {users.length > 0 ? (
            users.map((user) => (
              <tr key={user.id} className="border-b border-slate-800 hover:bg-slate-800/30 transition-colors">
                <td className="py-3 px-4">
                  <div className="flex items-center">
                    <Avatar className="h-8 w-8 mr-2">
                      <AvatarFallback className={`
                        ${user.role === "Department Admin" ? "bg-amber-900/30 text-amber-200" : 
                         user.role === "Super Admin" ? "bg-purple-900/30 text-purple-200" :
                         user.role === "Staff" ? "bg-blue-900/30 text-blue-200" :
                         "bg-slate-700 text-slate-200"}
                      `}>
                        {user.name.split(" ").map((n: any[]) => n[0]).join("")}
                      </AvatarFallback>
                    </Avatar>
                    <span className="text-slate-300">{user.name}</span>
                  </div>
                </td>
                <td className="py-3 px-4 text-slate-300">{user.email}</td>
                <td className="py-3 px-4">
                  <div className="flex items-center">
                    {user.role === "Super Admin" && <Shield className="h-3.5 w-3.5 mr-1.5 text-purple-400" />}
                    {user.role === "Department Admin" && <Building className="h-3.5 w-3.5 mr-1.5 text-amber-400" />}
                    {user.role === "Staff" && <Users className="h-3.5 w-3.5 mr-1.5 text-blue-400" />}
                    {user.role === "Citizen" && <User className="h-3.5 w-3.5 mr-1.5 text-slate-400" />}
                    <span className={`
                      ${user.role === "Department Admin" ? "text-amber-300" : 
                       user.role === "Super Admin" ? "text-purple-300" :
                       user.role === "Staff" ? "text-blue-300" :
                       "text-slate-300"}
                    `}>
                      {user.role}
                    </span>
                  </div>
                </td>
                <td className="py-3 px-4 text-slate-300">
                  {user.department || <span className="text-slate-500">-</span>}
                </td>
                <td className="py-3 px-4">
                  <div className="flex items-center text-slate-400">
                    <Clock className="h-3.5 w-3.5 mr-1.5" />
                    <span>{user.joined}</span>
                  </div>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan={7} className="py-8 text-center text-slate-400">
                No users found matching your criteria
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  )
}

