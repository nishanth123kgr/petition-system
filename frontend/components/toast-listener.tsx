"use client";

import { useEffect } from "react";
import { useToast } from "@/hooks/use-toast";

export function ToastListener() {
  const { toast } = useToast();

  useEffect(() => {
    // Function to handle custom toast events
    const handleToastEvent = (event: CustomEvent) => {
      const { title, description, variant, action } = event.detail;
      toast({
        title,
        description,
        variant,
        action
      });
    };

    // Add event listener for custom toast events
    window.addEventListener('show-toast', handleToastEvent as EventListener);

    // Clean up the event listener when the component unmounts
    return () => {
      window.removeEventListener('show-toast', handleToastEvent as EventListener);
    };
  }, [toast]);

  // This component doesn't render anything
  return null;
}