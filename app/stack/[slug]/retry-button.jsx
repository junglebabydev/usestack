"use client";

import { Button } from "@/components/ui/button";
import { RefreshCw } from "lucide-react";

export default function RetryButton() {
  const handleRetry = () => {
    window.location.reload();
  };

  return (
    <Button variant="outline" className="gap-2" onClick={handleRetry}>
      <RefreshCw className="w-4 h-4" />
      Try Again
    </Button>
  );
}
