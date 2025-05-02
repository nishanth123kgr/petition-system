import { Button } from "@/components/ui/button"
import { Edit } from "lucide-react"

export const DepartmentActions = () => {
  return (
    <div className="flex justify-between mt-4">
      <Button 
        variant="outline" 
        size="sm"
        className="bg-transparent border-violet-500/50 text-violet-300 hover:bg-violet-600/10 hover:border-violet-400 hover:text-white transition-all duration-300"
        >
        <Edit className="h-4 w-4 mr-1" />
        Edit
      </Button>
      <div className="space-x-2">
        <Button 
          variant="outline" 
          size="sm"
          className="bg-transparent border-violet-500/50 text-violet-300 hover:bg-violet-600/10 hover:border-violet-400 hover:text-white transition-all duration-300"
        >
          View Staff
        </Button>
        <Button 
          variant="outline" 
          size="sm"
          className="bg-transparent border-violet-500/50 text-violet-300 hover:bg-violet-600/10 hover:border-violet-400 hover:text-white transition-all duration-300"
        >
          View Petitions
        </Button>
      </div>
    </div>
  );
};