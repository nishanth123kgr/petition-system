"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { showSuccessToast, showErrorToast, showWarningToast, showInfoToast } from "@/app/utils/toastUtils";

export default function ToastTestPage() {
  const { toast } = useToast();

  // Function to test React toast directly
  const showReactToast = (variant: "default" | "destructive" | "success" | "warning") => {
    toast({
      title: `${variant.charAt(0).toUpperCase() + variant.slice(1)} Toast`,
      description: `This is a ${variant} toast message using React hook directly.`,
      variant: variant
    });
  };

  // Function to test non-React toast through event system
  const showNonReactToast = (type: "success" | "error" | "warning" | "info") => {
    const typeToFunc = {
      success: showSuccessToast,
      error: showErrorToast,
      warning: showWarningToast,
      info: showInfoToast
    };

    typeToFunc[type](
      `${type.charAt(0).toUpperCase() + type.slice(1)} Toast`, 
      `This is a ${type} toast message using the event system.`
    );
  };

  return (
    <div className="container mx-auto py-10">
      <Card>
        <CardHeader>
          <CardTitle>Toast Notification Test</CardTitle>
          <CardDescription>Click the buttons below to test different toast notifications</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            <div>
              <h3 className="text-lg font-medium mb-3">Direct React Hooks</h3>
              <div className="flex flex-wrap gap-3">
                <Button onClick={() => showReactToast("default")}>Default Toast</Button>
                <Button onClick={() => showReactToast("destructive")} variant="destructive">Error Toast</Button>
                <Button onClick={() => showReactToast("success")} className="bg-green-600 hover:bg-green-700">Success Toast</Button>
                <Button onClick={() => showReactToast("warning")} className="bg-amber-600 hover:bg-amber-700">Warning Toast</Button>
              </div>
            </div>
            
            <div>
              <h3 className="text-lg font-medium mb-3">Event-based System (Non-React Context)</h3>
              <div className="flex flex-wrap gap-3">
                <Button onClick={() => showNonReactToast("info")} variant="outline">Info Toast</Button>
                <Button onClick={() => showNonReactToast("error")} variant="destructive">Error Toast</Button>
                <Button onClick={() => showNonReactToast("success")} className="bg-green-600 hover:bg-green-700">Success Toast</Button>
                <Button onClick={() => showNonReactToast("warning")} className="bg-amber-600 hover:bg-amber-700">Warning Toast</Button>
              </div>
            </div>
          </div>
        </CardContent>
        <CardFooter>
          <p className="text-sm text-muted-foreground">
            These tests help ensure that toast notifications are visible in both React components and non-React code.
          </p>
        </CardFooter>
      </Card>
    </div>
  );
}