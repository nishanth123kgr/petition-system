'use client'

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { useState } from "react"

interface SettingsContentProps {
  userProfile?: {
    name: string;
    email: string;
    avatar: string;
  };
}

export function SettingsContent({ userProfile }: SettingsContentProps) {
  const [emailNotifications, setEmailNotifications] = useState(true)
  const [pushNotifications, setPushNotifications] = useState(true)
  
  // Extract first and last name from the full name
  const nameParts = userProfile?.name ? userProfile.name.split(' ') : ['John', 'Doe'];
  const firstName = nameParts[0] || 'John';
  const lastName = nameParts.slice(1).join(' ') || 'Doe';
  const email = userProfile?.email || 'staff@infrastructure.gov';

  return (
    <div className="p-6">
      <div className="mb-6">
        <h2 className="text-2xl font-bold bg-gradient-to-r from-violet-200 to-indigo-200 bg-clip-text text-transparent mb-4">Settings</h2>
        <p className="text-slate-400">Manage your account settings and preferences</p>
      </div>
      
      <div className="space-y-6">
        <Card className="bg-slate-900/70 backdrop-blur-sm border-slate-800/50 overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-violet-600/5 to-indigo-600/5 z-0" />
          <CardHeader className="relative z-10">
            <CardTitle className="text-slate-100">Profile Information</CardTitle>
            <CardDescription className="text-slate-400">
              Update your personal details
            </CardDescription>
          </CardHeader>
          <CardContent className="relative z-10 space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="firstName" className="text-slate-300">First Name</Label>
                <Input 
                  id="firstName" 
                  placeholder="First name" 
                  defaultValue={firstName}
                  className="bg-slate-800/70 border-slate-700/50 text-slate-200 focus-visible:ring-violet-500/70 focus-visible:ring-offset-slate-900"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="lastName" className="text-slate-300">Last Name</Label>
                <Input 
                  id="lastName" 
                  placeholder="Last name" 
                  defaultValue={lastName}
                  className="bg-slate-800/70 border-slate-700/50 text-slate-200 focus-visible:ring-violet-500/70 focus-visible:ring-offset-slate-900"
                />
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="email" className="text-slate-300">Email</Label>
              <Input 
                id="email" 
                type="email" 
                placeholder="Email address" 
                defaultValue={email}
                className="bg-slate-800/70 border-slate-700/50 text-slate-200 focus-visible:ring-violet-500/70 focus-visible:ring-offset-slate-900"
              />
            </div>
          </CardContent>
          <CardFooter className="relative z-10">
            <Button className="relative overflow-hidden group bg-gradient-to-r from-violet-600 to-indigo-600 hover:from-violet-500 hover:to-indigo-500 text-white shadow-lg shadow-violet-900/30 transition-all duration-300">
              <span className="relative z-10">Save Changes</span>
              <span className="absolute inset-0 h-full w-full scale-0 rounded-full bg-white/10 transition-all duration-300 group-hover:scale-100 group-hover:opacity-100" />
            </Button>
          </CardFooter>
        </Card>

        <Card className="bg-slate-900/70 backdrop-blur-sm border-slate-800/50 overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-violet-600/5 to-indigo-600/5 z-0" />
          <CardHeader className="relative z-10">
            <CardTitle className="text-slate-100">Notification Preferences</CardTitle>
            <CardDescription className="text-slate-400">
              Configure how you receive notifications
            </CardDescription>
          </CardHeader>
          <CardContent className="relative z-10">
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-slate-300 font-medium">Email Notifications</p>
                  <p className="text-slate-400 text-sm">Receive updates via email</p>
                </div>
                <Switch 
                  checked={emailNotifications} 
                  onCheckedChange={setEmailNotifications}
                  className="data-[state=checked]:bg-violet-600"
                />
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-slate-300 font-medium">Push Notifications</p>
                  <p className="text-slate-400 text-sm">Receive updates via push notifications</p>
                </div>
                <Switch 
                  checked={pushNotifications} 
                  onCheckedChange={setPushNotifications}
                  className="data-[state=checked]:bg-violet-600"
                />
              </div>
            </div>
          </CardContent>
          <CardFooter className="relative z-10">
            <Button className="relative overflow-hidden group bg-gradient-to-r from-violet-600 to-indigo-600 hover:from-violet-500 hover:to-indigo-500 text-white shadow-lg shadow-violet-900/30 transition-all duration-300">
              <span className="relative z-10">Save Preferences</span>
              <span className="absolute inset-0 h-full w-full scale-0 rounded-full bg-white/10 transition-all duration-300 group-hover:scale-100 group-hover:opacity-100" />
            </Button>
          </CardFooter>
        </Card>

        <Card className="bg-slate-900/70 backdrop-blur-sm border-slate-800/50 overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-violet-600/5 to-indigo-600/5 z-0" />
          <CardHeader className="relative z-10">
            <CardTitle className="text-slate-100">Password</CardTitle>
            <CardDescription className="text-slate-400">
              Update your password
            </CardDescription>
          </CardHeader>
          <CardContent className="relative z-10 space-y-4">
            <div className="space-y-2">
              <Label htmlFor="currentPassword" className="text-slate-300">Current Password</Label>
              <Input 
                id="currentPassword" 
                type="password" 
                placeholder="Current password"
                className="bg-slate-800/70 border-slate-700/50 text-slate-200 focus-visible:ring-violet-500/70 focus-visible:ring-offset-slate-900"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="newPassword" className="text-slate-300">New Password</Label>
              <Input 
                id="newPassword" 
                type="password" 
                placeholder="New password"
                className="bg-slate-800/70 border-slate-700/50 text-slate-200 focus-visible:ring-violet-500/70 focus-visible:ring-offset-slate-900"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="confirmPassword" className="text-slate-300">Confirm Password</Label>
              <Input 
                id="confirmPassword" 
                type="password" 
                placeholder="Confirm new password"
                className="bg-slate-800/70 border-slate-700/50 text-slate-200 focus-visible:ring-violet-500/70 focus-visible:ring-offset-slate-900"
              />
            </div>
          </CardContent>
          <CardFooter className="relative z-10">
            <Button className="relative overflow-hidden group bg-gradient-to-r from-violet-600 to-indigo-600 hover:from-violet-500 hover:to-indigo-500 text-white shadow-lg shadow-violet-900/30 transition-all duration-300">
              <span className="relative z-10">Change Password</span>
              <span className="absolute inset-0 h-full w-full scale-0 rounded-full bg-white/10 transition-all duration-300 group-hover:scale-100 group-hover:opacity-100" />
            </Button>
          </CardFooter>
        </Card>
      </div>
    </div>
  )
}