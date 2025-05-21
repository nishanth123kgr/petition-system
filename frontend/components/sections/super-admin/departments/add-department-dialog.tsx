import React from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Loader2, Plus } from "lucide-react"
import { NewDepartmentData } from "./types"

interface AddDepartmentDialogProps {
  open: boolean
  setOpen: (open: boolean) => void
  newDepartment: NewDepartmentData
  setNewDepartment: (data: NewDepartmentData) => void
  handleAddDepartment: () => void
  isCreating?: boolean
}

export const AddDepartmentDialog = ({ 
  open,
  setOpen,
  newDepartment,
  setNewDepartment,
  handleAddDepartment,
  isCreating = false
}: AddDepartmentDialogProps) => {
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button 
          className="bg-gradient-to-r from-purple-600 to-fuchsia-600 hover:from-purple-500 hover:to-fuchsia-500 text-white shadow-lg shadow-purple-900/30 group relative overflow-hidden"
        >
          <Plus className="mr-2 h-4 w-4" />
          <span>Add Department</span>
          <span className="absolute inset-0 h-full w-full scale-0 rounded-md bg-white/10 transition-all duration-300 group-hover:scale-100 group-hover:opacity-100" />
        </Button>
      </DialogTrigger>
      <DialogContent className="bg-slate-900 border-slate-800/50">
        <DialogHeader>
          <DialogTitle className="text-slate-100">Add New Department</DialogTitle>
          <DialogDescription className="text-slate-400">
            Create a new department and assign an administrator. The admin will receive login credentials via email.
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <label htmlFor="name" className="text-right text-slate-400 text-sm">
              Name
            </label>
            <Input
              id="name"
              value={newDepartment.name}
              onChange={(e) => setNewDepartment({...newDepartment, name: e.target.value})}
              className="col-span-3 bg-slate-800/70 border-slate-700/50 text-slate-200 focus-visible:ring-purple-500/70 focus-visible:border-purple-500/50 transition-all"
              placeholder="Department name"
              disabled={isCreating}
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <label htmlFor="admin-name" className="text-right text-slate-400 text-sm">
              Admin Name
            </label>
            <Input
              id="admin-name"
              value={newDepartment.adminName}
              onChange={(e) => setNewDepartment({...newDepartment, adminName: e.target.value})}
              className="col-span-3 bg-slate-800/70 border-slate-700/50 text-slate-200 focus-visible:ring-purple-500/70 focus-visible:border-purple-500/50 transition-all"
              placeholder="Department admin name"
              disabled={isCreating}
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <label htmlFor="admin-email" className="text-right text-slate-400 text-sm">
              Admin Email
            </label>
            <Input
              id="admin-email"
              value={newDepartment.adminEmail}
              onChange={(e) => setNewDepartment({...newDepartment, adminEmail: e.target.value})}
              className="col-span-3 bg-slate-800/70 border-slate-700/50 text-slate-200 focus-visible:ring-purple-500/70 focus-visible:border-purple-500/50 transition-all"
              placeholder="admin@example.gov"
              disabled={isCreating}
            />
          </div>
        </div>
        <DialogFooter>
          <Button 
            variant="outline" 
            onClick={() => setOpen(false)}
            className="bg-transparent border-violet-500/50 text-violet-300 hover:bg-violet-600/10 hover:border-violet-400 hover:text-white transition-all duration-300"
            disabled={isCreating}
          >
            Cancel
          </Button>
          <Button 
            onClick={handleAddDepartment}
            className="bg-gradient-to-r from-purple-600 to-fuchsia-600 hover:from-purple-500 hover:to-fuchsia-500 text-white"
            disabled={!newDepartment.name || !newDepartment.adminName || !newDepartment.adminEmail || isCreating}
          >
            {isCreating ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Creating...
              </>
            ) : (
              'Add Department'
            )}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};