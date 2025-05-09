"use client"

import { useToast } from "@/hooks/use-toast"
import {
  Toast,
  ToastClose,
  ToastDescription,
  ToastTitle,
  ToastViewport,
} from "@/components/ui/toast"
import { cn } from "@/lib/utils"
import { CheckCircle, AlertCircle, Info, XCircle } from "lucide-react"

export function Toaster() {
  const { toasts } = useToast()

  return (
    <>
      {toasts.map(function ({ id, title, description, action, variant, ...props }) {
        // Choose icon based on variant
        const Icon = variant === "destructive" 
          ? XCircle 
          : variant === "success" 
            ? CheckCircle 
            : variant === "warning" 
              ? AlertCircle 
              : Info
              
        return (
          <Toast 
            key={id} 
            {...props}
            className={cn(
              "group flex gap-3 overflow-hidden rounded-lg border p-4 shadow-lg",
              "data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-80 data-[state=open]:slide-in-from-bottom-full",
              "border-slate-200 dark:border-slate-800",
              variant === "destructive" && "border-red-300 bg-red-50 dark:border-red-900 dark:bg-red-950/50 dark:text-red-100",
              variant === "success" && "border-green-300 bg-green-50 dark:border-green-900 dark:bg-green-950/50 dark:text-green-100",
              variant === "warning" && "border-amber-300 bg-amber-50 dark:border-amber-900 dark:bg-amber-950/50 dark:text-amber-100",
              !variant && "bg-white dark:bg-slate-950",
            )}
          >
            <div className={cn(
              "flex h-6 w-6 shrink-0 items-center justify-center",
              variant === "destructive" && "text-red-500 dark:text-red-400",
              variant === "success" && "text-green-500 dark:text-green-400",
              variant === "warning" && "text-amber-500 dark:text-amber-400",
              !variant && "text-slate-500 dark:text-slate-400",
            )}>
              <Icon className="h-5 w-5" />
            </div>
            
            <div className="flex-1 grid gap-1">
              {title && (
                <ToastTitle className={cn(
                  "text-sm font-medium leading-none tracking-tight",
                  variant === "destructive" && "text-red-800 dark:text-red-200",
                  variant === "success" && "text-green-800 dark:text-green-200",
                  variant === "warning" && "text-amber-800 dark:text-amber-200",
                  !variant && "text-slate-900 dark:text-slate-100",
                )}>
                  {title}
                </ToastTitle>
              )}
              {description && (
                <ToastDescription className={cn(
                  "text-xs opacity-90",
                  variant === "destructive" && "text-red-700 dark:text-red-300",
                  variant === "success" && "text-green-700 dark:text-green-300",
                  variant === "warning" && "text-amber-700 dark:text-amber-300",
                  !variant && "text-slate-700 dark:text-slate-300",
                )}>
                  {description}
                </ToastDescription>
              )}
              {action}
            </div>
            <ToastClose className={cn(
              "absolute right-2 top-2 rounded-md p-1 opacity-0 transition-opacity group-hover:opacity-100",
              variant === "destructive" && "text-red-600 hover:text-red-800 dark:text-red-400 dark:hover:text-red-300",
              variant === "success" && "text-green-600 hover:text-green-800 dark:text-green-400 dark:hover:text-green-300",
              variant === "warning" && "text-amber-600 hover:text-amber-800 dark:text-amber-400 dark:hover:text-amber-300",
              !variant && "text-slate-500 hover:text-slate-900 dark:text-slate-400 dark:hover:text-slate-100",
            )} />
          </Toast>
        )
      })}
      <ToastViewport className="fixed bottom-0 right-0 z-[9999] flex max-h-screen w-full flex-col-reverse p-4 sm:max-w-[420px]" />
    </>
  )
}
