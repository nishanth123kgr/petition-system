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

export default function StaffContent() {
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

        {/* <Button 
          onClick={() => setIsAddStaffOpen(true)}
          className="bg-gradient-to-r from-violet-600 to-indigo-600 hover:from-violet-500 hover:to-indigo-500 text-white flex items-center gap-2"
        >
          <UserPlus className="h-4 w-4" />
          Add New Staff
        </Button> */}
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
                  <TableHead className="text-slate-300 w-[250px] text-center">Name</TableHead>
                  <TableHead className="text-slate-300 text-center">Assigned</TableHead>
                  <TableHead className="text-slate-300 text-center">In Progress</TableHead>
                  <TableHead className="text-slate-300 text-center">Completed</TableHead>
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
                    <TableCell className="text-slate-300 text-center">12</TableCell>
                    <TableCell className="text-slate-300 text-center">5</TableCell>
                    <TableCell className="text-slate-300 text-center">7</TableCell>
                  </TableRow>
                ))}

                {filteredStaff.length === 0 && (
                  <TableRow>
                    <TableCell colSpan={4} className="text-center py-8 text-slate-400">
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
        <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-violet-600 to-indigo-600"></div>
        <DialogHeader className="space-y-3 pb-2">
          <div className="h-12 w-12 rounded-full bg-violet-500/20 flex items-center justify-center mx-auto mb-1">
            <UserPlus className="h-6 w-6 text-violet-400" />
          </div>
          <DialogTitle className="text-xl font-semibold text-center">Add New Staff Member</DialogTitle>
          <DialogDescription className="text-slate-400 text-center max-w-sm mx-auto">
            Add a new staff member to your department
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-5 mt-4">
          <div className="grid grid-cols-1 sm:grid-cols-1 gap-4">
            <div className="space-y-2">
              <Label htmlFor="name" className="text-slate-300 flex items-center gap-1.5">
                <span className="h-1.5 w-1.5 rounded-full bg-violet-500"></span>
                Full Name
              </Label>
              <Input
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="Enter staff member's full name"
                className="bg-slate-800/60 border-slate-700/50 text-slate-200 focus:border-violet-500/70 focus:ring-violet-500/20"
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="email" className="text-slate-300 flex items-center gap-1.5">
                <span className="h-1.5 w-1.5 rounded-full bg-violet-500"></span>
                Email Address
              </Label>
              <Input
                id="email"
                name="email"
                type="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="Enter work email address"
                className="bg-slate-800/60 border-slate-700/50 text-slate-200 focus:border-violet-500/70 focus:ring-violet-500/20"
                required
              />
            </div>
          </div>

          

          <div className="pt-3 border-t border-slate-800">
            <DialogFooter>
              <Button
                type="button"
                variant="outline"
                onClick={() => setOpen(false)}
                className="bg-transparent border-violet-500/50 text-violet-300 hover:bg-violet-600/10 hover:border-violet-400 hover:text-white transition-all duration-300"
                >
                Cancel
              </Button>
              <Button
                type="submit"
                className="bg-gradient-to-r from-violet-600 to-indigo-600 hover:from-violet-500 hover:to-indigo-500 text-white shadow-md hover:shadow-lg hover:shadow-violet-900/20 transition-all duration-300"
              >
                <UserPlus className="mr-2 h-4 w-4" />
                Add Staff Member
              </Button>
            </DialogFooter>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  )
}