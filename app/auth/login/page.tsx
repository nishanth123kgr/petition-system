"use client"

import { useState } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

export default function LoginPage() {
  const router = useRouter()
  const [userEmail, setUserEmail] = useState("")
  const [userPassword, setUserPassword] = useState("")
  const [isLoading, setIsLoading] = useState(false)

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        delayChildren: 0.3,
        staggerChildren: 0.2
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

  const handleUserLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    
    // Simulate authentication delay
    await new Promise(resolve => setTimeout(resolve, 800))
    
    // In a real app, you would authenticate the user here
    router.push("/dashboard/user")
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-950 via-slate-900 to-violet-950 p-4">
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="w-full max-w-md"
      >
        <Card className="bg-slate-900/70 backdrop-blur-xl border-slate-800/50 shadow-2xl shadow-violet-900/20 overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-violet-600/5 to-indigo-600/5 z-0" />
          
          <motion.div variants={itemVariants}>
            <CardHeader className="relative z-10 text-center pb-2">
              <CardTitle className="text-2xl font-bold bg-gradient-to-r from-violet-200 to-indigo-200 bg-clip-text text-transparent">
                Sign In
              </CardTitle>
              <CardDescription className="text-slate-400">
                Access your account to manage petitions
              </CardDescription>
            </CardHeader>
          </motion.div>
          
          <motion.div variants={itemVariants}>
            <CardContent className="relative z-10">
              <form onSubmit={handleUserLogin} className="space-y-5 mt-4">
                <div className="space-y-2">
                  <Label htmlFor="user-email" className="text-slate-300 text-sm font-medium">
                    Email address
                  </Label>
                  <div className="relative">
                    <Input
                      id="user-email"
                      type="email"
                      placeholder="user@example.com"
                      value={userEmail}
                      onChange={(e) => setUserEmail(e.target.value)}
                      required
                      className="bg-slate-800/70 border-slate-700/50 text-slate-200 focus-visible:ring-violet-500/70 focus-visible:ring-offset-slate-900 placeholder:text-slate-500 pr-10"
                    />
                    <div className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-500">
                      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-mail">
                        <rect width="20" height="16" x="2" y="4" rx="2"/>
                        <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/>
                      </svg>
                    </div>
                  </div>
                </div>
                
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <Label htmlFor="user-password" className="text-slate-300 text-sm font-medium">
                      Password
                    </Label>
                    <Link
                      href="/forgot-password"
                      className="inline-block text-xs text-violet-400 hover:text-violet-300 transition-colors duration-200"
                    >
                      Forgot password?
                    </Link>
                  </div>
                  <div className="relative">
                    <Input
                      id="user-password"
                      type="password"
                      value={userPassword}
                      onChange={(e) => setUserPassword(e.target.value)}
                      required
                      className="bg-slate-800/70 border-slate-700/50 text-slate-200 focus-visible:ring-violet-500/70 focus-visible:ring-offset-slate-900 pr-10"
                    />
                    <div className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-500">
                      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-lock">
                        <rect width="18" height="11" x="3" y="11" rx="2" ry="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/>
                      </svg>
                    </div>
                  </div>
                </div>
                
                <Button
                  type="submit"
                  disabled={isLoading}
                  className="w-full relative overflow-hidden group bg-gradient-to-r from-violet-600 to-indigo-600 hover:from-violet-500 hover:to-indigo-500 text-white shadow-lg shadow-violet-900/30 transition-all duration-300 font-medium"
                >
                  <span className="relative z-10">{isLoading ? "Signing in..." : "Sign in"}</span>
                  <span className="absolute inset-0 h-full w-full scale-0 rounded-full bg-white/10 transition-all duration-300 group-hover:scale-100 group-hover:opacity-100" />
                </Button>
              </form>
            </CardContent>
          </motion.div>
          
          <motion.div variants={itemVariants}>
            <CardFooter className="relative z-10 flex justify-center pb-8 pt-2">
              <p className="text-sm text-slate-400">
                Don't have an account?{" "}
                <Link 
                  href="/auth/register" 
                  className="text-violet-400 hover:text-violet-300 font-medium transition-colors duration-200 hover:underline decoration-2 underline-offset-2"
                >
                  Register
                </Link>
              </p>
            </CardFooter>
          </motion.div>
          
          <div className="absolute w-40 h-40 bg-violet-600/10 -bottom-20 -left-20 rounded-full blur-2xl z-0" />
          <div className="absolute w-40 h-40 bg-indigo-600/10 -top-20 -right-20 rounded-full blur-2xl z-0" />
        </Card>
        
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5, duration: 0.8 }}
          className="mt-8 text-center text-xs text-slate-500"
        >
          &copy; {new Date().getFullYear()} Petition System. All rights reserved.
        </motion.div>
      </motion.div>
    </div>
  )
}
