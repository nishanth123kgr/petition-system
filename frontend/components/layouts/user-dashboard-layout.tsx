'use client'

import React, { useState, useEffect } from "react"
import { usePathname, useRouter } from "next/navigation"
import Link from "next/link"
import { motion } from "framer-motion"
import { Plus, Settings, Menu, User, LogOut, FileText, LayoutDashboard, ChevronRight, History } from "lucide-react"

import { Button } from "../ui/button"
import { cn } from "../../lib/utils"
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuTrigger } from "../ui/dropdown-menu"
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover"
import { UserDashboardContent } from "../sections/user/user-dashboard-content"
import { UserNewPetitionContent } from "../sections/user/user-new-petition-content"
import { UserMyPetitionsContent } from "../sections/user/user-my-petitions-content"
import { UserSettingsContent } from "../sections/user/user-settings-content"
import { SettingsContent } from "../sections/settings/settings-content"
import callAPI from "@/app/utils/apiCaller"
import { getUserRoleWithID } from "@/app/utils/userUtils"
import { useToast } from "@/hooks/use-toast"
import { set } from "date-fns"

// Navigation items data for cleaner code
const navItems = [
  { id: "dashboard", label: "Dashboard", icon: LayoutDashboard, isPro: false },
  { id: "new-petition", label: "New Petition", icon: Plus, isPro: false, badge: "Create" },
  { id: "my-petitions", label: "My Petitions", icon: History, isPro: false },
  { id: "settings", label: "Settings", icon: Settings, isPro: false },
]

export function UserDashboardLayout({ children }: { children: React.ReactNode }) {
  const [isSidebarOpen, setSidebarOpen] = useState(false);
  const [activeTab, setActiveTab] = useState("dashboard");
  const [petitions, setPetitions] = useState([]);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [avatar, setAvatar] = useState("");
  const [id, setId] = useState(0);

  const router = useRouter();
  const { toast } = useToast();

  useEffect(() => {
    async function checkAuthStatus() {
      try {
        const response = await callAPI('/api/auth/me', 'GET');
        if (response && response.user && response.user.role !== 0) {
          toast({
            title: "Unauthorized",
            description: "You do not have permission to access this page",
            variant: "destructive",
          });
          router.push('/auth/login');
        }
        if (response && response.user) {
          setName(response.user.name);
          setEmail(response.user.email);
          setAvatar(response.user.name[0].toUpperCase());
          setId(response.user.id);
        } else {
          toast({
            title: "Authentication error",
            description: "Please login to continue",
            variant: "destructive",
          });
          router.push('/auth/login');
        }
      } catch (error) {
        console.log("Authentication error:", error);
        toast({
          title: "Authentication error",
          description: "Please login to continue",
          variant: "destructive",
        });
        router.push('/auth/login');
      }
    }

    checkAuthStatus();
  }, [router, toast])

  useEffect(() => {
    const fetchPetitions = async () => {
      let originalPetitions = await callAPI('/api/petitions', 'GET');
      console.log("Fetched petitions:", originalPetitions);
      if (originalPetitions && originalPetitions.success) {
        setPetitions(originalPetitions.data);
      } else {
        setPetitions([]);
      }
    };
    fetchPetitions();
  }, []);

  const pathname = usePathname();

  // Close sidebar when pressing escape key
  useEffect(() => {
    const handleEscKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setSidebarOpen(false);
      }
    };

    // Close sidebar when window resizes to desktop size
    const handleResize = () => {
      if (window.innerWidth >= 768 && isSidebarOpen) {
        setSidebarOpen(false);
      }
    };

    window.addEventListener('keydown', handleEscKey);
    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('keydown', handleEscKey);
      window.removeEventListener('resize', handleResize);
    };
  }, [isSidebarOpen]);

  // Prevent scrolling on body when mobile sidebar is open
  useEffect(() => {
    if (isSidebarOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    };

    return () => {
      document.body.style.overflow = '';
    };
  }, [isSidebarOpen]);

  async function handleLogout() {
    try {
      const response = await callAPI('/api/auth/logout');
      if (response && response.success) {
        toast({
          title: "Logged out",
          description: "You have been logged out successfully",
          variant: "default",
        });
        router.push('/auth/login');
      } else {
        toast({
          title: "Logout error",
          description: "An error occurred while logging out",
          variant: "destructive",
        });
      }
    } catch (error) {
      console.error("Logout error:", error);
      toast({
        title: "Logout error",
        description: "An error occurred while logging out",
        variant: "destructive",
      });
    }
  }


  // Function to render the active tab content
  const renderActiveContent = () => {
    switch (activeTab) {
      case "dashboard":
        return <UserDashboardContent petitions={petitions} />;
      case "new-petition":
        return <UserNewPetitionContent />;
      case "my-petitions":
        return <UserMyPetitionsContent petitions={petitions} />;
      case "settings":
        return <SettingsContent userProfile={{ name, avatar, email, id }} />;
      default:
        return <UserDashboardContent petitions={petitions} />;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 flex flex-col text-slate-200">
      {/* Enhanced Header with glass effect and subtle gradients */}
      <header className="bg-slate-900/40 backdrop-blur-xl border-b border-slate-800/60 sticky top-0 z-40 shadow-lg shadow-slate-950/30">
        <div className="container mx-auto px-4 py-3 flex items-center">
          <div className="flex items-center gap-2 mr-4">
            <Button
              variant="ghost"
              size="icon"
              className="md:hidden text-slate-300 hover:text-white hover:bg-slate-800/60"
              onClick={() => setSidebarOpen(!isSidebarOpen)}
              aria-label={isSidebarOpen ? "Close sidebar" : "Open sidebar"}
            >
              <Menu className="h-5 w-5" />
            </Button>
            <Link href="/dashboard/user" className="flex items-center" onClick={() => setActiveTab("dashboard")}>
              <div className="h-8 w-8 rounded-md bg-gradient-to-br from-violet-500 to-indigo-600 flex items-center justify-center mr-2 shadow-lg shadow-violet-900/30">
                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="text-white">
                  <path d="M18 8h1a4 4 0 0 1 0 8h-1"></path>
                  <path d="M2 8h16v9a4 4 0 0 1-4 4H6a4 4 0 0 1-4-4V8z"></path>
                  <line x1="6" y1="1" x2="6" y2="4"></line>
                  <line x1="10" y1="1" x2="10" y2="4"></line>
                  <line x1="14" y1="1" x2="14" y2="4"></line>
                </svg>
              </div>
              <h1 className="text-xl font-bold bg-gradient-to-r from-violet-200 to-indigo-200 text-transparent bg-clip-text">
                Petition System
              </h1>
            </Link>
          </div>

          <div className="flex items-center ml-auto gap-1 md:gap-3">
            {/* Create Petition Button */}
            <Popover>
              <PopoverTrigger asChild>
                <Button className="hidden md:flex items-center gap-1.5 bg-gradient-to-r from-violet-600 to-indigo-600 hover:from-violet-500 hover:to-indigo-500 text-white shadow-lg shadow-violet-900/30 transition-all duration-300 group relative overflow-hidden"
                  onClick={() => setActiveTab("new-petition")}
                >
                  <Plus className="h-4 w-4" />
                  <span>New Petition</span>
                  <span className="absolute inset-0 h-full w-full scale-0 rounded-md bg-white/10 transition-all duration-300 group-hover:scale-100 group-hover:opacity-100" />
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-56 bg-slate-900 border-slate-800 shadow-lg shadow-slate-950/50 p-0">
                <div className="flex flex-col">
                  <Button variant="ghost" className="flex items-center justify-start gap-2 rounded-none text-slate-200 hover:text-white py-6 hover:bg-slate-800">
                    <div className="h-8 w-8 rounded-full bg-indigo-600/20 flex items-center justify-center">
                      <FileText className="h-4 w-4 text-indigo-400" />
                    </div>
                    <div className="flex flex-col items-start">
                      <span className="text-sm font-medium">Submit Petition</span>
                      <span className="text-xs text-slate-400">Request a new service</span>
                    </div>
                  </Button>
                </div>
              </PopoverContent>
            </Popover>

            {/* Quick Action Button (Mobile Only) */}
            <Button
              variant="default"
              size="icon"
              className="md:hidden bg-gradient-to-r from-violet-600 to-indigo-600 text-white shadow-md"
              onClick={() => setActiveTab("new-petition")}
            >
              <Plus className="h-4 w-4" />
            </Button>

            {/* User Profile Dropdown */}
            <div className="relative ml-2">
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" className="relative h-9 w-9 rounded-full border border-slate-700/50 hover:border-violet-500/50 transition-all duration-300 p-0">
                    <Avatar>
                      <AvatarImage src="/placeholder-user.jpg" alt="User" />
                      <AvatarFallback className="bg-violet-900/60 text-violet-200">{avatar}</AvatarFallback>
                    </Avatar>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-56 bg-slate-900 border-slate-800 shadow-xl shadow-slate-950/50 mt-1">
                  <div className="flex items-center gap-2 p-3">
                    <div className="bg-violet-900/60 h-10 w-10 rounded-full flex items-center justify-center text-violet-200">
                      {avatar}
                    </div>
                    <div>
                      <div className="font-medium text-sm text-slate-200">{name}</div>
                      <div className="text-xs text-slate-400">{email}</div>
                    </div>
                  </div>
                  <DropdownMenuSeparator className="bg-slate-800" />
                  <DropdownMenuItem
                    onClick={() => setActiveTab("settings")}
                    className="text-slate-200 focus:bg-slate-800 focus:text-white cursor-pointer"
                  >
                    <Settings className="mr-2 h-4 w-4" />
                    <span>Settings</span>
                  </DropdownMenuItem>
                  <DropdownMenuSeparator className="bg-slate-800" />
                  <div onClick={handleLogout} className="w-full text-left">
                    <DropdownMenuItem className="text-red-400 focus:bg-red-900/20 focus:text-red-300 cursor-pointer">
                      <LogOut className="mr-2 h-4 w-4" />
                      <span>Log out</span>
                    </DropdownMenuItem>
                  </div>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>
        </div>
      </header>

      <div className="flex-1 flex flex-col md:flex-row">
        {/* Mobile sidebar overlay */}
        {isSidebarOpen && (
          <div
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-30 md:hidden"
            onClick={() => setSidebarOpen(false)}
            aria-hidden="true"
          ></div>
        )}

        {/* Sidebar with animated links - fixed position for both mobile and desktop */}
        <aside
          className={cn(
            "fixed inset-y-0 left-0 w-64 bg-slate-900/80 backdrop-blur-sm border-r border-slate-800/60 z-30 transition-all duration-300 ease-in-out shadow-xl shadow-slate-950/30 flex flex-col pt-16",
            isSidebarOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0"
          )}
        >
          <div className="flex flex-col h-full overflow-hidden">
            {/* Scrollable content area */}
            <div className="flex-1 overflow-y-auto scrollbar-thin scrollbar-thumb-slate-700 scrollbar-track-transparent">
              <div className="p-4">
                <div className="mb-6">
                  <div className="flex items-center px-2 mb-6">
                    <div className="w-8 h-8 rounded-full bg-gradient-to-br from-violet-500 to-indigo-500 flex items-center justify-center text-white text-sm font-bold">
                      {avatar}
                    </div>
                    <div className="ml-3">
                      <p className="text-sm font-medium text-slate-200">{name}</p>
                      <p className="text-xs text-slate-400">Citizen</p>
                    </div>
                  </div>
                  <div className="h-px bg-gradient-to-r from-transparent via-slate-700/50 to-transparent mb-6"></div>
                </div>

                <nav className="space-y-1.5">
                  {navItems.map((item, index) => (
                    <motion.div
                      key={item.id}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.1, duration: 0.3 }}
                    >
                      <NavItem
                        item={item}
                        isActive={activeTab === item.id}
                        onClick={() => {
                          setActiveTab(item.id);
                          if (window.innerWidth < 768) {
                            setSidebarOpen(false);
                          }
                        }}
                      />
                    </motion.div>
                  ))}
                </nav>
              </div>
            </div>

            {/* Fixed logout section - always at bottom and visible */}
            <div className="p-4 border-t border-slate-800/60 bg-slate-900/80 backdrop-blur-sm">
              <Button
                variant="ghost"
                className="w-full justify-start group relative overflow-hidden text-red-400 hover:text-red-300 hover:bg-red-900/20 truncate"
                onClick={handleLogout}
              >
                <LogOut className="min-w-[16px] mr-2 h-4 w-4" />
                <span className="truncate">Logout</span>
                <span className="absolute inset-0 h-full w-full scale-0 rounded-md bg-red-500/10 transition-all duration-300 group-hover:scale-100 group-hover:opacity-100" />
              </Button>
            </div>
          </div>
        </aside>

        {/* Enhanced Main Content Area */}
        <main className="flex-1 p-4 md:p-8 md:pt-6 md:ml-64 transition-all duration-300">
          {/* Breadcrumb Navigation */}
          <div className="mb-6">
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
              className="text-sm text-slate-400 flex items-center gap-1.5"
            >
              <button
                onClick={() => setActiveTab("dashboard")}
                className="hover:text-violet-300 transition-colors flex items-center"
              >
                <LayoutDashboard className="h-3.5 w-3.5 mr-1.5" />
                Dashboard
              </button>
              {activeTab !== "dashboard" && (
                <>
                  <ChevronRight className="h-3 w-3 text-slate-600" />
                  <span className="text-slate-200 font-medium">
                    {activeTab === "new-petition"
                      ? 'New Petition'
                      : activeTab === "my-petitions"
                        ? 'My Petitions'
                        : activeTab === "settings"
                          ? 'Settings'
                          : 'Page'}
                  </span>
                </>
              )}
            </motion.div>
          </div>

          {/* Content Container with Animation */}
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, ease: "easeOut" }}
            className="relative"
          >
            {/* Decorative elements */}
            <div className="absolute top-0 right-0 w-64 h-64 bg-violet-500/5 rounded-full blur-3xl -z-10" aria-hidden="true"></div>
            <div className="absolute bottom-0 left-0 w-96 h-96 bg-indigo-500/5 rounded-full blur-3xl -z-10" aria-hidden="true"></div>

            {/* Gradient border container */}
            <div className="relative rounded-xl bg-slate-900/50 backdrop-blur-sm border border-slate-800/60 shadow-lg overflow-hidden">
              {/* Top decorative gradient line */}
              <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-violet-500/40 to-transparent"></div>

              {/* Content with padding */}
              <div className="w-full">
                {renderActiveContent()}
              </div>

              {/* Bottom decorative gradient line */}
              <div className="absolute bottom-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-indigo-500/40 to-transparent"></div>
            </div>
          </motion.div>

          {/* Footer */}
          <footer className="mt-8 text-center text-xs text-slate-500 py-4">
            <p>© 2025 Petition System. All rights reserved.</p>
          </footer>
        </main>
      </div>
    </div>
  )
}

// Shared component for nav items
function NavItem({ item, isActive, onClick }: {
  item: { id: string; label: string; icon: any; isPro?: boolean; badge?: string };
  isActive: boolean;
  onClick?: () => void;
}) {
  return (
    <Button
      variant="ghost"
      className={cn(
        "w-full justify-start group relative overflow-hidden bg-transparent text-slate-300 hover:text-white hover:bg-slate-800/60",
        item.isPro && "bg-amber-900/10 text-amber-200",
        isActive && "bg-slate-800/80 text-white font-medium"
      )}
      onClick={onClick}
    >
      <div className={cn(
        "absolute left-0 top-0 bottom-0 w-[3px] bg-gradient-to-b from-violet-500 to-indigo-500 transition-transform duration-300",
        isActive ? "scale-y-100" : "scale-y-0 group-hover:scale-y-100"
      )}></div>

      <item.icon className={cn(
        "mr-2 h-4 w-4 transition-colors duration-300",
        isActive ? "text-violet-300" : "text-slate-400 group-hover:text-violet-300"
      )} />
      {item.label}
      {item.badge && (
        <span className="ml-auto bg-gradient-to-r from-violet-500 to-indigo-500 text-[10px] py-0.5 px-1.5 rounded-full font-medium text-white">
          {item.badge}
        </span>
      )}
      <span className="absolute inset-0 h-full w-full scale-0 rounded-md bg-gradient-to-r from-violet-600/5 to-indigo-600/5 transition-all duration-300 group-hover:scale-100 group-hover:opacity-100" />
    </Button>
  )
}
