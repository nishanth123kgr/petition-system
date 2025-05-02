'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog'
import { Label } from '@/components/ui/label'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { Search, Plus, MoreHorizontal, Mail, Phone, UserPlus } from 'lucide-react'
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuTrigger } from '@/components/ui/dropdown-menu'

// Sample staff data for demonstration
const mockStaffData = [
  {
    id: '1',
    name: 'John Smith',
    email: 'john.smith@infrastructure.gov',
    role: 'Senior Analyst',
    department: 'Engineering',
    status: 'active',
    joinedOn: '2023-05-15',
    avatar: '/placeholder-user.jpg',
  },
  {
    id: '2',
    name: 'Sarah Johnson',
    email: 'sarah.johnson@infrastructure.gov',
    role: 'Project Manager',
    department: 'Planning',
    status: 'active',
    joinedOn: '2023-02-10',
    avatar: '',
  },
  {
    id: '3',
    name: 'Michael Chen',
    email: 'michael.chen@infrastructure.gov',
    role: 'Technical Officer',
    department: 'IT Support',
    status: 'active',
    joinedOn: '2022-11-22',
    avatar: '/placeholder-user.jpg',
  },
  {
    id: '4',
    name: 'Emily Rodriguez',
    email: 'emily.rodriguez@infrastructure.gov',
    role: 'Administrative Assistant',
    department: 'Admin',
    status: 'on-leave',
    joinedOn: '2024-01-08',
    avatar: '',
  },
  {
    id: '5',
    name: 'David Patel',
    email: 'david.patel@infrastructure.gov',
    role: 'Civil Engineer',
    department: 'Engineering',
    status: 'active',
    joinedOn: '2023-09-30',
    avatar: '/placeholder-user.jpg',
  },
]

export default function StaffPage() {
  const [staff, setStaff] = useState(mockStaffData)
  const [searchTerm, setSearchTerm] = useState('')
  const [isAddStaffOpen, setIsAddStaffOpen] = useState(false)
  
  // Filter staff based on search term
  const filteredStaff = staff.filter(member =>
    member.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    member.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
    member.role.toLowerCase().includes(searchTerm.toLowerCase()) ||
    member.department.toLowerCase().includes(searchTerm.toLowerCase())
  )

  const handleAddStaff = (formData: any) => {
    // In a real application, you would send this data to an API
    const newStaff = {
      id: (staff.length + 1).toString(),
      name: formData.name,
      email: formData.email,
      role: formData.role,
      department: formData.department,
      status: 'active',
      joinedOn: new Date().toISOString().split('T')[0],
      avatar: '',
    }
    
    setStaff([...staff, newStaff])
    setIsAddStaffOpen(false)
  }

  return (
    <div className="space-y-6 p-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold text-slate-100">Staff Management</h2>
          <p className="text-slate-400 mt-1">Manage department staff members and roles</p>
        </div>
        
        <AddStaffDialog open={isAddStaffOpen} setOpen={setIsAddStaffOpen} onSubmit={handleAddStaff} />
      </div>
      
      <div className="flex flex-col sm:flex-row sm:items-center gap-4 justify-between">
        <div className="relative max-w-sm">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
          <Input
            placeholder="Search staff..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-9 bg-slate-800/60 border-slate-700/50 text-slate-300"
          />
        </div>
        
        <Button 
          onClick={() => setIsAddStaffOpen(true)}
          className="bg-gradient-to-r from-violet-600 to-indigo-600 hover:from-violet-500 hover:to-indigo-500 text-white flex items-center gap-2"
        >
          <UserPlus className="h-4 w-4" />
          Add New Staff
        </Button>
      </div>
      
      <Card className="bg-slate-900/50 border-slate-800/60">
        <CardHeader className="pb-3">
          <CardTitle className="text-slate-200">Staff Directory</CardTitle>
          <CardDescription className="text-slate-400">
            {filteredStaff.length} staff members in your department
          </CardDescription>
        </CardHeader>
        
        <CardContent>
          <div className="rounded-md border border-slate-800/60 overflow-hidden">
            <Table>
              <TableHeader className="bg-slate-800/50">
                <TableRow className="hover:bg-transparent border-slate-700/50">
                  <TableHead className="text-slate-300 w-[250px]">Name</TableHead>
                  <TableHead className="text-slate-300">Role</TableHead>
                  <TableHead className="text-slate-300 hidden md:table-cell">Department</TableHead>
                  <TableHead className="text-slate-300 hidden md:table-cell">Status</TableHead>
                  <TableHead className="text-slate-300 hidden lg:table-cell">Joined</TableHead>
                  <TableHead className="text-slate-300 text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredStaff.map((member) => (
                  <TableRow key={member.id} className="border-slate-800/40 hover:bg-slate-800/30">
                    <TableCell className="font-medium">
                      <div className="flex items-center gap-3">
                        <Avatar>
                          <AvatarImage src={member.avatar} alt={member.name} />
                          <AvatarFallback className="bg-indigo-900/60 text-indigo-200">
                            {member.name.split(' ').map(n => n[0]).join('')}
                          </AvatarFallback>
                        </Avatar>
                        <div>
                          <p className="text-slate-200 font-medium">{member.name}</p>
                          <p className="text-slate-400 text-sm">{member.email}</p>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell className="text-slate-300">{member.role}</TableCell>
                    <TableCell className="hidden md:table-cell text-slate-300">{member.department}</TableCell>
                    <TableCell className="hidden md:table-cell">
                      <Badge variant={member.status === 'active' ? 'default' : 'outline'} 
                        className={member.status === 'active' 
                          ? 'bg-green-500/20 text-green-300 hover:bg-green-500/30 border-green-500/30' 
                          : 'text-amber-300 border-amber-500/30'}>
                        {member.status === 'active' ? 'Active' : 'On Leave'}
                      </Badge>
                    </TableCell>
                    <TableCell className="hidden lg:table-cell text-slate-400">
                      {new Date(member.joinedOn).toLocaleDateString('en-US', {
                        year: 'numeric',
                        month: 'short',
                        day: 'numeric'
                      })}
                    </TableCell>
                    <TableCell className="text-right">
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="icon" className="text-slate-400 hover:text-slate-100">
                            <MoreHorizontal className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent className="bg-slate-900 border-slate-800">
                          <DropdownMenuItem className="text-slate-200 focus:text-white focus:bg-slate-800 cursor-pointer">
                            View Profile
                          </DropdownMenuItem>
                          <DropdownMenuItem className="text-slate-200 focus:text-white focus:bg-slate-800 cursor-pointer">
                            Edit Details
                          </DropdownMenuItem>
                          <DropdownMenuItem className="flex items-center text-slate-200 focus:text-white focus:bg-slate-800 cursor-pointer">
                            <Mail className="mr-2 h-4 w-4" />
                            <span>Send Email</span>
                          </DropdownMenuItem>
                          <DropdownMenuSeparator className="bg-slate-800" />
                          <DropdownMenuItem className="text-red-400 focus:text-red-300 focus:bg-red-950/50 cursor-pointer">
                            Deactivate
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </TableCell>
                  </TableRow>
                ))}
                
                {filteredStaff.length === 0 && (
                  <TableRow>
                    <TableCell colSpan={6} className="text-center py-8 text-slate-400">
                      No staff members found matching your search
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

function AddStaffDialog({ open, setOpen, onSubmit }: { 
  open: boolean,
  setOpen: (open: boolean) => void,
  onSubmit: (data: any) => void
}) {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    role: '',
    department: '',
  })
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
  }
  
  const handleSelectChange = (name: string, value: string) => {
    setFormData(prev => ({ ...prev, [name]: value }))
  }
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onSubmit(formData)
    setFormData({ name: '', email: '', role: '', department: '' })
  }
  
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button 
          className="bg-gradient-to-r from-violet-600 to-indigo-600 hover:from-violet-500 hover:to-indigo-500 text-white flex items-center gap-2"
        >
          <UserPlus className="h-4 w-4" />
          Add New Staff
        </Button>
      </DialogTrigger>
      
      <DialogContent className="bg-slate-900 border-slate-800 text-slate-200 sm:max-w-[525px]">
        <DialogHeader>
          <DialogTitle className="text-lg font-semibold">Add New Staff Member</DialogTitle>
          <DialogDescription className="text-slate-400">
            Add a new staff member to your department
          </DialogDescription>
        </DialogHeader>
        
        <form onSubmit={handleSubmit} className="space-y-4 mt-4">
          <div className="space-y-2">
            <Label htmlFor="name" className="text-slate-300">Full Name</Label>
            <Input
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Enter staff member's full name"
              className="bg-slate-800/60 border-slate-700/50 text-slate-200"
              required
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="email" className="text-slate-300">Email Address</Label>
            <Input
              id="email"
              name="email"
              type="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Enter work email address"
              className="bg-slate-800/60 border-slate-700/50 text-slate-200"
              required
            />
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="role" className="text-slate-300">Role</Label>
              <Select 
                value={formData.role} 
                onValueChange={(value) => handleSelectChange('role', value)}
              >
                <SelectTrigger className="bg-slate-800/60 border-slate-700/50 text-slate-200">
                  <SelectValue placeholder="Select role" />
                </SelectTrigger>
                <SelectContent className="bg-slate-900 border-slate-800">
                  <SelectItem value="Technical Officer" className="text-slate-200 focus:bg-slate-800 focus:text-white">Technical Officer</SelectItem>
                  <SelectItem value="Project Manager" className="text-slate-200 focus:bg-slate-800 focus:text-white">Project Manager</SelectItem>
                  <SelectItem value="Civil Engineer" className="text-slate-200 focus:bg-slate-800 focus:text-white">Civil Engineer</SelectItem>
                  <SelectItem value="Administrative Assistant" className="text-slate-200 focus:bg-slate-800 focus:text-white">Administrative Assistant</SelectItem>
                  <SelectItem value="Senior Analyst" className="text-slate-200 focus:bg-slate-800 focus:text-white">Senior Analyst</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="department" className="text-slate-300">Department</Label>
              <Select 
                value={formData.department} 
                onValueChange={(value) => handleSelectChange('department', value)}
              >
                <SelectTrigger className="bg-slate-800/60 border-slate-700/50 text-slate-200">
                  <SelectValue placeholder="Select department" />
                </SelectTrigger>
                <SelectContent className="bg-slate-900 border-slate-800">
                  <SelectItem value="Engineering" className="text-slate-200 focus:bg-slate-800 focus:text-white">Engineering</SelectItem>
                  <SelectItem value="Planning" className="text-slate-200 focus:bg-slate-800 focus:text-white">Planning</SelectItem>
                  <SelectItem value="IT Support" className="text-slate-200 focus:bg-slate-800 focus:text-white">IT Support</SelectItem>
                  <SelectItem value="Admin" className="text-slate-200 focus:bg-slate-800 focus:text-white">Admin</SelectItem>
                  <SelectItem value="Finance" className="text-slate-200 focus:bg-slate-800 focus:text-white">Finance</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          
          <DialogFooter className="pt-4">
            <Button 
              type="button" 
              variant="outline" 
              onClick={() => setOpen(false)}
              className="border-slate-700 text-slate-300 hover:bg-slate-800 hover:text-slate-100"
            >
              Cancel
            </Button>
            <Button 
              type="submit"
              className="bg-gradient-to-r from-violet-600 to-indigo-600 hover:from-violet-500 hover:to-indigo-500 text-white"
            >
              Add Staff Member
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}