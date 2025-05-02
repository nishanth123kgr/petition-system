'use client'

import { useState } from "react"
import { motion } from "framer-motion"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { User, Bell, Shield, Key, Mail, LogOut, Lock, Save, AlertCircle } from "lucide-react"

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

export function UserSettingsContent() {
  const [activeTab, setActiveTab] = useState("profile")
  const [saveStatus, setSaveStatus] = useState<{ show: boolean, success: boolean, message: string }>({
    show: false,
    success: false,
    message: ""
  })

  // Form states
  const [firstName, setFirstName] = useState("John")
  const [lastName, setLastName] = useState("Doe")
  const [email, setEmail] = useState("john.doe@example.com")
  const [phone, setPhone] = useState("(555) 123-4567")
  const [emailNotifications, setEmailNotifications] = useState(true)
  const [statusUpdates, setStatusUpdates] = useState(true)
  const [newPetitionAlerts, setNewPetitionAlerts] = useState(false)
  
  // Password change states
  const [currentPassword, setCurrentPassword] = useState("")
  const [newPassword, setNewPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")
  const [passwordError, setPasswordError] = useState("")

  // Handle profile form submission
  const handleProfileSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    
    // Simulate API call
    setTimeout(() => {
      setSaveStatus({
        show: true,
        success: true,
        message: "Profile updated successfully!"
      })
      
      // Auto-hide message after 3 seconds
      setTimeout(() => {
        setSaveStatus({ show: false, success: false, message: "" })
      }, 3000)
    }, 500)
  }

  // Handle password change submission
  const handlePasswordSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setPasswordError("")
    
    // Validate passwords
    if (newPassword.length < 8) {
      setPasswordError("Password must be at least 8 characters long")
      return
    }
    
    if (newPassword !== confirmPassword) {
      setPasswordError("Passwords do not match")
      return
    }
    
    // Simulate API call
    setTimeout(() => {
      setSaveStatus({
        show: true,
        success: true,
        message: "Password changed successfully!"
      })
      
      // Reset form fields
      setCurrentPassword("")
      setNewPassword("")
      setConfirmPassword("")
      
      // Auto-hide message after 3 seconds
      setTimeout(() => {
        setSaveStatus({ show: false, success: false, message: "" })
      }, 3000)
    }, 500)
  }

  // Handle notifications settings submission
  const handleNotificationsSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    
    // Simulate API call
    setTimeout(() => {
      setSaveStatus({
        show: true,
        success: true,
        message: "Notification preferences updated!"
      })
      
      // Auto-hide message after 3 seconds
      setTimeout(() => {
        setSaveStatus({ show: false, success: false, message: "" })
      }, 3000)
    }, 500)
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
              Settings
            </h1>
            <p className="text-slate-400">
              Manage your account preferences and settings
            </p>
          </div>
        </motion.div>

        <motion.div variants={itemVariants}>
          <Card className="bg-slate-900/60 backdrop-blur-sm border-slate-800/50 overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-violet-600/5 to-indigo-600/5 z-0" />
            <CardHeader className="relative z-10 pb-2">
              <Tabs defaultValue="profile" className="w-full" value={activeTab} onValueChange={setActiveTab}>
                <TabsList className="bg-slate-800/60 w-full justify-start">
                  <TabsTrigger value="profile" className="data-[state=active]:bg-violet-600 gap-2">
                    <User className="h-4 w-4" />
                    Profile
                  </TabsTrigger>
                  <TabsTrigger value="security" className="data-[state=active]:bg-violet-600 gap-2">
                    <Lock className="h-4 w-4" />
                    Security
                  </TabsTrigger>
                  <TabsTrigger value="notifications" className="data-[state=active]:bg-violet-600 gap-2">
                    <Bell className="h-4 w-4" />
                    Notifications
                  </TabsTrigger>
                </TabsList>
                
                {/* Status messages */}
                {saveStatus.show && (
                  <div className={`mt-4 p-3 rounded-md flex items-center gap-2 text-sm ${
                    saveStatus.success ? 'bg-green-900/20 border border-green-800 text-green-300' : 'bg-red-900/20 border border-red-800 text-red-300'
                  }`}>
                    {saveStatus.success ? (
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
                        <polyline points="22 4 12 14.01 9 11.01"></polyline>
                      </svg>
                    ) : (
                      <AlertCircle className="h-4 w-4" />
                    )}
                    {saveStatus.message}
                  </div>
                )}
                
                {/* Profile Tab Content */}
                <TabsContent value="profile" className="mt-6 space-y-6">
                  <form onSubmit={handleProfileSubmit}>
                    {/* Profile Photo */}
                    <div className="mb-6 flex flex-col items-center sm:flex-row sm:items-start gap-6">
                      <div className="flex flex-col items-center gap-2">
                        <Avatar className="h-24 w-24 border-4 border-slate-800">
                          <AvatarImage src="/placeholder-user.jpg" alt="Profile" />
                          <AvatarFallback className="bg-violet-900 text-violet-100 text-xl">JD</AvatarFallback>
                        </Avatar>
                        <Button type="button" variant="outline" size="sm" className="mt-2 text-xs bg-slate-800/60 border-slate-700 text-slate-300 hover:bg-slate-700/60">
                          Change Photo
                        </Button>
                      </div>
                      
                      <div className="flex-1">
                        <h3 className="text-lg font-medium text-slate-100 mb-2">Profile Information</h3>
                        <p className="text-sm text-slate-400 mb-4">
                          Update your personal information and how it appears on your profile
                        </p>
                        
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-4">
                          <div className="space-y-2">
                            <Label htmlFor="firstName" className="text-slate-200">First Name</Label>
                            <Input 
                              id="firstName"
                              value={firstName}
                              onChange={(e) => setFirstName(e.target.value)}
                              className="bg-slate-800/50 border-slate-700 text-slate-200 focus:border-violet-500/50"
                            />
                          </div>
                          <div className="space-y-2">
                            <Label htmlFor="lastName" className="text-slate-200">Last Name</Label>
                            <Input 
                              id="lastName"
                              value={lastName}
                              onChange={(e) => setLastName(e.target.value)}
                              className="bg-slate-800/50 border-slate-700 text-slate-200 focus:border-violet-500/50"
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                    
                    {/* Contact Information */}
                    <div className="space-y-4 mb-6">
                      <h3 className="text-lg font-medium text-slate-100">Contact Information</h3>
                      
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label htmlFor="email" className="text-slate-200">Email Address</Label>
                          <Input 
                            id="email"
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="bg-slate-800/50 border-slate-700 text-slate-200 focus:border-violet-500/50"
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="phone" className="text-slate-200">Phone Number</Label>
                          <Input 
                            id="phone"
                            value={phone}
                            onChange={(e) => setPhone(e.target.value)}
                            className="bg-slate-800/50 border-slate-700 text-slate-200 focus:border-violet-500/50"
                          />
                        </div>
                      </div>
                    </div>
                    
                    <Button 
                      type="submit" 
                      className="bg-gradient-to-r from-violet-600 to-indigo-600 hover:from-violet-500 hover:to-indigo-500 text-white shadow-lg shadow-violet-900/30 transition-all duration-300 relative group overflow-hidden flex items-center gap-2"
                    >
                      <Save className="h-4 w-4" />
                      Save Changes
                      <span className="absolute inset-0 h-full w-full scale-0 rounded-md bg-white/10 transition-all duration-300 group-hover:scale-100 group-hover:opacity-100" />
                    </Button>
                  </form>
                </TabsContent>
                
                {/* Security Tab Content */}
                <TabsContent value="security" className="mt-6">
                  <form onSubmit={handlePasswordSubmit} className="space-y-6">
                    <div className="space-y-4">
                      <h3 className="text-lg font-medium text-slate-100">Change Password</h3>
                      <p className="text-sm text-slate-400">
                        Ensure your account is using a long, random password to stay secure
                      </p>
                      
                      {passwordError && (
                        <div className="bg-red-900/20 border border-red-800 text-red-300 px-4 py-3 rounded-md flex items-center gap-2 text-sm">
                          <AlertCircle className="h-4 w-4" />
                          {passwordError}
                        </div>
                      )}
                      
                      <div className="space-y-4">
                        <div className="space-y-2">
                          <Label htmlFor="currentPassword" className="text-slate-200">Current Password</Label>
                          <Input 
                            id="currentPassword"
                            type="password"
                            value={currentPassword}
                            onChange={(e) => setCurrentPassword(e.target.value)}
                            className="bg-slate-800/50 border-slate-700 text-slate-200 focus:border-violet-500/50"
                          />
                        </div>
                        
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                          <div className="space-y-2">
                            <Label htmlFor="newPassword" className="text-slate-200">New Password</Label>
                            <Input 
                              id="newPassword"
                              type="password"
                              value={newPassword}
                              onChange={(e) => setNewPassword(e.target.value)}
                              className="bg-slate-800/50 border-slate-700 text-slate-200 focus:border-violet-500/50"
                            />
                          </div>
                          <div className="space-y-2">
                            <Label htmlFor="confirmPassword" className="text-slate-200">Confirm New Password</Label>
                            <Input 
                              id="confirmPassword"
                              type="password"
                              value={confirmPassword}
                              onChange={(e) => setConfirmPassword(e.target.value)}
                              className="bg-slate-800/50 border-slate-700 text-slate-200 focus:border-violet-500/50"
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                    
                    <Button 
                      type="submit" 
                      className="bg-gradient-to-r from-violet-600 to-indigo-600 hover:from-violet-500 hover:to-indigo-500 text-white shadow-lg shadow-violet-900/30 transition-all duration-300 relative group overflow-hidden flex items-center gap-2"
                    >
                      <Key className="h-4 w-4" />
                      Update Password
                      <span className="absolute inset-0 h-full w-full scale-0 rounded-md bg-white/10 transition-all duration-300 group-hover:scale-100 group-hover:opacity-100" />
                    </Button>
                  </form>
                  
                  <div className="border-t border-slate-800 my-6 pt-6">
                    <h3 className="text-lg font-medium text-slate-100 mb-4">Account Actions</h3>
                    
                    <Button
                      variant="destructive"
                      className="bg-red-900/20 hover:bg-red-900/40 text-red-400 hover:text-red-300 border border-red-800/50 shadow-none flex items-center gap-2"
                    >
                      <LogOut className="h-4 w-4" />
                      Log Out of All Sessions
                    </Button>
                  </div>
                </TabsContent>
                
                {/* Notifications Tab Content */}
                <TabsContent value="notifications" className="mt-6">
                  <form onSubmit={handleNotificationsSubmit} className="space-y-6">
                    <div className="space-y-4">
                      <h3 className="text-lg font-medium text-slate-100">Notification Preferences</h3>
                      <p className="text-sm text-slate-400">
                        Choose what notifications you want to receive
                      </p>
                      
                      <div className="space-y-4 mt-4">
                        <div className="flex items-center justify-between py-3">
                          <div>
                            <h4 className="text-sm font-medium text-slate-200">Email Notifications</h4>
                            <p className="text-xs text-slate-400">Receive notifications via email</p>
                          </div>
                          <Switch 
                            checked={emailNotifications}
                            onCheckedChange={setEmailNotifications}
                            className="data-[state=checked]:bg-violet-600"
                          />
                        </div>
                        
                        <div className="flex items-center justify-between py-3 border-t border-slate-800">
                          <div>
                            <h4 className="text-sm font-medium text-slate-200">Petition Status Updates</h4>
                            <p className="text-xs text-slate-400">Get notified when your petition status changes</p>
                          </div>
                          <Switch 
                            checked={statusUpdates}
                            onCheckedChange={setStatusUpdates}
                            className="data-[state=checked]:bg-violet-600"
                          />
                        </div>
                        
                        <div className="flex items-center justify-between py-3 border-t border-slate-800">
                          <div>
                            <h4 className="text-sm font-medium text-slate-200">New Petition Alerts</h4>
                            <p className="text-xs text-slate-400">Receive alerts about new petitions in your area</p>
                          </div>
                          <Switch 
                            checked={newPetitionAlerts}
                            onCheckedChange={setNewPetitionAlerts}
                            className="data-[state=checked]:bg-violet-600"
                          />
                        </div>
                      </div>
                    </div>
                    
                    <Button 
                      type="submit" 
                      className="bg-gradient-to-r from-violet-600 to-indigo-600 hover:from-violet-500 hover:to-indigo-500 text-white shadow-lg shadow-violet-900/30 transition-all duration-300 relative group overflow-hidden flex items-center gap-2"
                    >
                      <Save className="h-4 w-4" />
                      Save Preferences
                      <span className="absolute inset-0 h-full w-full scale-0 rounded-md bg-white/10 transition-all duration-300 group-hover:scale-100 group-hover:opacity-100" />
                    </Button>
                  </form>
                </TabsContent>
              </Tabs>
            </CardHeader>
          </Card>
        </motion.div>
      </motion.div>
    </div>
  )
}