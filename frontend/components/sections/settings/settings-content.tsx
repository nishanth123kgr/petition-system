'use client'

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useState } from "react"
import { useToast } from "@/hooks/use-toast"
import callAPI from "@/app/utils/apiCaller"
import srpClient from 'secure-remote-password/client'

interface SettingsContentProps {
  userProfile?: {
    name: string;
    email: string;
    avatar: string;
    id: number;
  };
}

export function SettingsContent({ userProfile }: SettingsContentProps) {
  const name = userProfile?.name || 'John Doe';
  const email = userProfile?.email || 'staff@infrastructure.gov';
  const id = userProfile?.id || 0;
  
  // Toast notifications
  const { toast } = useToast();
  
  // Profile form state
  const [profileName, setProfileName] = useState(name);
  const [profileEmail, setProfileEmail] = useState(email);
  const [isProfileUpdating, setIsProfileUpdating] = useState(false);
  
  // Password form state
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isPasswordUpdating, setIsPasswordUpdating] = useState(false);
  const [passwordError, setPasswordError] = useState("");

  // Handle profile update
  const handleProfileUpdate = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsProfileUpdating(true);
    
    try {
      // Call API to update user profile
      const response = await callAPI(`/api/users/${id}`, 'PUT', {
        name: profileName
      } as any);
      
      if (!response.success) {
        throw new Error(response.message || 'Failed to update profile');
      }
      
      toast({
        title: "Profile updated",
        description: "Your profile has been updated successfully",
        variant: "default"
      });
    } catch (error) {
      toast({
        title: "Update failed",
        description: error instanceof Error ? error.message : "Failed to update profile",
        variant: "destructive"
      });
    } finally {
      setIsProfileUpdating(false);
    }
  };

  // Handle password change
  const handlePasswordChange = async (e: React.FormEvent) => {
    e.preventDefault();
    setPasswordError("");
    
    // Validate passwords
    if (newPassword.length < 8) {
      setPasswordError("Password must be at least 8 characters long");
      return;
    }
    
    if (newPassword !== confirmPassword) {
      setPasswordError("Passwords do not match");
      return;
    }
    
    setIsPasswordUpdating(true);
    
    try {
      // Get salt for the user
      // @ts-ignore - ignore TypeScript error for callAPI
      const initResponse = await callAPI('/api/auth/srp/init', 'POST', { email: profileEmail });
      
      if (!initResponse.success) {
        throw new Error(initResponse.message || 'Failed to initialize password change');
      }
      
      const { salt } = initResponse.data;
      
      // Generate verifier using SRP protocol
      const oldPrivateKey = srpClient.derivePrivateKey(salt, profileEmail, currentPassword);
      const newPrivateKey = srpClient.derivePrivateKey(salt, profileEmail, newPassword);
      const newVerifier = srpClient.deriveVerifier(newPrivateKey);
      
      // Call API to change password
      // @ts-ignore - ignore TypeScript error for callAPI
      const response = await callAPI('/api/users/change-password', 'POST', {
        email: profileEmail,
        currentPassword,
        newVerifier
      });
      
      if (response.success) {
        toast({
          title: "Password changed",
          description: "Your password has been changed successfully",
          variant: "default"
        });
        
        // Clear password fields
        setCurrentPassword("");
        setNewPassword("");
        setConfirmPassword("");
      } else {
        throw new Error(response.message || 'Failed to change password');
      }
    } catch (error) {
      toast({
        title: "Password change failed",
        description: error instanceof Error ? error.message : "Failed to change password",
        variant: "destructive"
      });
    } finally {
      setIsPasswordUpdating(false);
    }
  };

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
            <div className="space-y-2">
              <Label htmlFor="name" className="text-slate-300">Full Name</Label>
              <Input 
                id="name" 
                placeholder="Full name" 
                value={profileName}
                onChange={(e) => setProfileName(e.target.value)}
                className="bg-slate-800/70 border-slate-700/50 text-slate-200 focus-visible:ring-violet-500/70 focus-visible:ring-offset-slate-900"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="email" className="text-slate-300">Email</Label>
              <Input 
                id="email" 
                type="email" 
                placeholder="Email address" 
                value={profileEmail}
                disabled
                className="bg-slate-800/70 border-slate-700/50 text-slate-200 focus-visible:ring-violet-500/70 focus-visible:ring-offset-slate-900 cursor-not-allowed opacity-70"
              />
            </div>
          </CardContent>
          <CardFooter className="relative z-10">
            <Button 
              onClick={handleProfileUpdate}
              disabled={isProfileUpdating}
              className="relative overflow-hidden group bg-gradient-to-r from-violet-600 to-indigo-600 hover:from-violet-500 hover:to-indigo-500 text-white shadow-lg shadow-violet-900/30 transition-all duration-300"
            >
              <span className="relative z-10">{isProfileUpdating ? "Saving..." : "Save Changes"}</span>
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
                value={currentPassword}
                onChange={(e) => setCurrentPassword(e.target.value)}
                className="bg-slate-800/70 border-slate-700/50 text-slate-200 focus-visible:ring-violet-500/70 focus-visible:ring-offset-slate-900"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="newPassword" className="text-slate-300">New Password</Label>
              <Input 
                id="newPassword" 
                type="password" 
                placeholder="New password"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                className="bg-slate-800/70 border-slate-700/50 text-slate-200 focus-visible:ring-violet-500/70 focus-visible:ring-offset-slate-900"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="confirmPassword" className="text-slate-300">Confirm Password</Label>
              <Input 
                id="confirmPassword" 
                type="password" 
                placeholder="Confirm new password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                className="bg-slate-800/70 border-slate-700/50 text-slate-200 focus-visible:ring-violet-500/70 focus-visible:ring-offset-slate-900"
              />
            </div>
            {passwordError && (
              <div className="text-sm text-red-400 mt-2">
                {passwordError}
              </div>
            )}
          </CardContent>
          <CardFooter className="relative z-10">
            <Button 
              onClick={handlePasswordChange}
              disabled={isPasswordUpdating}
              className="relative overflow-hidden group bg-gradient-to-r from-violet-600 to-indigo-600 hover:from-violet-500 hover:to-indigo-500 text-white shadow-lg shadow-violet-900/30 transition-all duration-300"
            >
              <span className="relative z-10">{isPasswordUpdating ? "Changing..." : "Change Password"}</span>
              <span className="absolute inset-0 h-full w-full scale-0 rounded-full bg-white/10 transition-all duration-300 group-hover:scale-100 group-hover:opacity-100" />
            </Button>
          </CardFooter>
        </Card>
      </div>
    </div>
  )
}