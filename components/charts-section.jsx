"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

export default function ChartsSection() {
  return (
    <div className="space-y-6">
      {/* AI Tools Discovery Chart */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle>AI Tools Discovery</CardTitle>
              <p className="text-sm text-muted-foreground">
                Tools discovered over the last 3 months
              </p>
            </div>
            <div className="flex items-center space-x-2">
              <Button variant="outline" size="sm" className="bg-background">
                Last 3 months
              </Button>
              <Button variant="ghost" size="sm">
                Last 30 days
              </Button>
              <Button variant="ghost" size="sm">
                Last 7 days
              </Button>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="h-[300px] w-full bg-muted/20 rounded-lg flex items-center justify-center">
            <div className="text-center">
              <div className="text-4xl mb-2">🔍</div>
              <p className="text-muted-foreground">AI Tools Discovery Chart</p>
              <p className="text-sm text-muted-foreground mt-1">
                Integration with charting library (e.g., Recharts, Chart.js)
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Recent Activity Table */}
      <Card>
        <CardHeader>
          <CardTitle>Recent Activity</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex items-center space-x-3">
              <div className="w-2 h-2 bg-green-500 rounded-full"></div>
              <span className="text-sm text-muted-foreground">
                New AI tool "ChatGPT-4" was added to Writing category
              </span>
              <span className="text-xs text-muted-foreground ml-auto">
                2 hours ago
              </span>
            </div>
            <div className="flex items-center space-x-3">
              <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
              <span className="text-sm text-muted-foreground">
                Stack "Content Creation" was updated with 3 new tools
              </span>
              <span className="text-xs text-muted-foreground ml-auto">
                1 day ago
              </span>
            </div>
            <div className="flex items-center space-x-3">
              <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
              <span className="text-sm text-muted-foreground">
                User "john@example.com" submitted new AI tool
              </span>
              <span className="text-xs text-muted-foreground ml-auto">
                2 days ago
              </span>
            </div>
            <div className="flex items-center space-x-3">
              <div className="w-2 h-2 bg-orange-500 rounded-full"></div>
              <span className="text-sm text-muted-foreground">
                New category "AI Agents" was created
              </span>
              <span className="text-xs text-muted-foreground ml-auto">
                3 days ago
              </span>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
