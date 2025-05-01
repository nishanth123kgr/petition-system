import type React from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { LayoutDashboard, ClipboardList, MessageSquare, Calendar, Settings, LogOut, User, Menu, ChevronRight } from "lucide-react"
import { useState, useEffect } from "react"
import { cn } from "@/lib/utils"

export function StaffDashboardLayout({ children }: { children: React.ReactNode }) {
  const [isSidebarOpen, setSidebarOpen] = useState(false);
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

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 flex flex-col text-slate-200">
      {/* Header with glass effect and subtle gradients */}
      <header className="bg-slate-900/40 backdrop-blur-xl border-b border-slate-800/60 sticky top-0 z-40 shadow-lg shadow-slate-950/30">
        <div className="container mx-auto px-4 py-3 flex justify-between items-center">
          <div className="flex items-center gap-2">
            <Button 
              variant="ghost" 
              size="icon" 
              className="md:hidden text-slate-300 hover:text-white hover:bg-slate-800/60"
              onClick={() => setSidebarOpen(!isSidebarOpen)}
              aria-label={isSidebarOpen ? "Close sidebar" : "Open sidebar"}
            >
              <Menu className="h-5 w-5" />
            </Button>
            <h1 className="text-xl md:text-2xl font-bold bg-gradient-to-r from-violet-200 to-indigo-200 text-transparent bg-clip-text">
              Petition System
            </h1>
          </div>
          <div className="flex items-center gap-4">
            <span className="hidden md:block text-sm text-slate-400">Welcome, Staff Member</span>
            <div className="relative group">
              <Button 
                variant="ghost" 
                size="icon" 
                className="relative bg-slate-800/50 hover:bg-violet-900/30 text-slate-300 hover:text-violet-100 rounded-full overflow-hidden border border-slate-700/50 hover:border-violet-500/50 transition-all duration-300"
              >
                <User className="h-5 w-5" />
                <span className="absolute inset-0 bg-gradient-to-r from-violet-600/10 to-indigo-600/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span>
              </Button>
              <span className="absolute -bottom-1 left-1/2 transform -translate-x-1/2 w-1.5 h-1.5 bg-violet-400 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span>
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
                      SM
                    </div>
                    <div className="ml-3">
                      <p className="text-sm font-medium text-slate-200">Staff Member</p>
                      <p className="text-xs text-slate-400">Infrastructure</p>
                    </div>
                  </div>
                  <div className="h-px bg-gradient-to-r from-transparent via-slate-700/50 to-transparent mb-6"></div>
                </div>

                <nav className="space-y-1.5">
                  {navItems.map((item, index) => (
                    <motion.div
                      key={item.href}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.1, duration: 0.3 }}
                    >
                      <NavItem 
                        item={item}
                        onClick={() => {
                          if (window.innerWidth < 768) {
                            setSidebarOpen(false)
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
              <Link href="/auth/login">
                <Button
                  variant="ghost"
                  className="w-full justify-start group relative overflow-hidden text-red-400 hover:text-red-300 hover:bg-red-900/20 truncate"
                >
                  <LogOut className="min-w-[16px] mr-2 h-4 w-4" />
                  <span className="truncate">Logout</span>
                  <span className="absolute inset-0 h-full w-full scale-0 rounded-md bg-red-500/10 transition-all duration-300 group-hover:scale-100 group-hover:opacity-100" />
                </Button>
              </Link>
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
              <Link href="/dashboard/staff" className="hover:text-violet-300 transition-colors flex items-center">
                <LayoutDashboard className="h-3.5 w-3.5 mr-1.5" />
                Dashboard
              </Link>
              {pathname !== "/dashboard/staff" && (
                <>
                  <ChevronRight className="h-3 w-3 text-slate-600" />
                  <span className="text-slate-200 font-medium">
                    {pathname.includes('tasks') 
                      ? 'My Tasks' 
                      : pathname.includes('messages') 
                        ? 'Messages' 
                        : pathname.includes('calendar')
                          ? 'Calendar'
                          : pathname.includes('settings') 
                            ? 'Settings' 
                            : 'Page'}
                  </span>
                </>
              )}
            </motion.div>
          </div>
          
          {/* Content Container with Animation */}
          <motion.div
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
              <div className="w-full">{children}
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

// Navigation items data for cleaner code
const navItems = [
  { href: "/dashboard/staff", label: "Dashboard", icon: LayoutDashboard, isPro: false },
  { href: "/dashboard/staff/tasks", label: "My Tasks", icon: ClipboardList, isPro: false },
  { href: "/dashboard/staff/messages", label: "Messages", icon: MessageSquare, badge: "5" },
  { href: "/dashboard/staff/calendar", label: "Calendar", icon: Calendar, isPro: false },
  { href: "/dashboard/staff/settings", label: "Settings", icon: Settings, isPro: false },
]

// Shared component for nav items
function NavItem({ item, onClick }: { 
  item: { href: string; label: string; icon: any; isPro?: boolean; badge?: string };
  onClick?: () => void;
}) {
  const pathname = usePathname();
  const isActive = pathname === item.href || 
                   (pathname.startsWith(item.href) && item.href !== "/");
                   
  return (
    <Link href={item.href} onClick={onClick}>
      <Button
        variant="ghost"
        className={cn(
          "w-full justify-start group relative overflow-hidden bg-transparent text-slate-300 hover:text-white hover:bg-slate-800/60",
          item.isPro && "bg-amber-900/10 text-amber-200",
          isActive && "bg-slate-800/80 text-white font-medium"
        )}
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
        {item.isPro && (
          <span className="ml-auto bg-gradient-to-r from-amber-500 to-orange-500 text-[10px] py-0.5 px-1.5 rounded-full font-medium text-white">
            PRO
          </span>
        )}
        {item.badge && (
          <span className="ml-auto bg-gradient-to-r from-violet-500 to-indigo-500 min-w-5 h-5 rounded-full flex items-center justify-center text-[10px] px-1 font-medium text-white">
            {item.badge}
          </span>
        )}
        <span className="absolute inset-0 h-full w-full scale-0 rounded-md bg-gradient-to-r from-violet-600/5 to-indigo-600/5 transition-all duration-300 group-hover:scale-100 group-hover:opacity-100" />
      </Button>
    </Link>
  )
}
