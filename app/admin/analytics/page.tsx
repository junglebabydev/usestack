import { TrendingUp, Users, Eye, MousePointerClick } from "lucide-react"
import { AdminLayout } from "@/components/layout/admin-layout"
import { KpiCard } from "@/components/ui/kpi-card"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"

const analyticsKpis = [
  {
    title: "Total Visitors",
    value: "125,438",
    trend: { value: "+18.2%", isPositive: true },
    description: "vs last month",
    icon: <Users className="size-4" />,
  },
  {
    title: "Page Views",
    value: "456,234",
    trend: { value: "+24.5%", isPositive: true },
    description: "vs last month",
    icon: <Eye className="size-4" />,
  },
  {
    title: "Tool Clicks",
    value: "34,567",
    trend: { value: "+15.3%", isPositive: true },
    description: "external visits",
    icon: <MousePointerClick className="size-4" />,
  },
  {
    title: "Avg. Session",
    value: "3m 24s",
    trend: { value: "+8.1%", isPositive: true },
    description: "time on site",
    icon: <TrendingUp className="size-4" />,
  },
]

const topTools = [
  { name: "ChatGPT", views: 12543, clicks: 8234, ctr: "65.6%" },
  { name: "Midjourney", views: 9876, clicks: 5432, ctr: "55.0%" },
  { name: "GitHub Copilot", views: 8765, clicks: 4321, ctr: "49.3%" },
  { name: "Claude", views: 7654, clicks: 3987, ctr: "52.1%" },
  { name: "Notion AI", views: 6543, clicks: 3210, ctr: "49.1%" },
]

const topCategories = [
  { name: "Text Generation", tools: 42, views: 45678 },
  { name: "Image Generation", tools: 38, views: 38765 },
  { name: "Developer Tools", tools: 35, views: 32456 },
  { name: "Marketing", tools: 29, views: 28765 },
  { name: "Productivity", tools: 31, views: 25432 },
]

export default function AdminAnalyticsPage() {
  return (
    <AdminLayout>
      <div className="space-y-6">
        {/* Header */}
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Analytics</h1>
          <p className="text-muted-foreground">Platform performance and insights</p>
        </div>

        {/* KPIs */}
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {analyticsKpis.map((kpi) => (
            <KpiCard key={kpi.title} {...kpi} />
          ))}
        </div>

        {/* Charts Placeholder */}
        <div className="grid gap-6 lg:grid-cols-2">
          <Card>
            <CardHeader>
              <CardTitle>Traffic Over Time</CardTitle>
              <CardDescription>Daily visitors for the last 30 days</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex h-[300px] items-center justify-center rounded-lg border-2 border-dashed border-border">
                <p className="text-sm text-muted-foreground">Line chart visualization</p>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Category Distribution</CardTitle>
              <CardDescription>Tools by category</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex h-[300px] items-center justify-center rounded-lg border-2 border-dashed border-border">
                <p className="text-sm text-muted-foreground">Pie chart visualization</p>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Top Tools */}
        <Card>
          <CardHeader>
            <CardTitle>Top Performing Tools</CardTitle>
            <CardDescription>Most viewed and clicked tools this month</CardDescription>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Tool</TableHead>
                  <TableHead className="text-right">Views</TableHead>
                  <TableHead className="text-right">Clicks</TableHead>
                  <TableHead className="text-right">CTR</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {topTools.map((tool, index) => (
                  <TableRow key={tool.name}>
                    <TableCell>
                      <div className="flex items-center gap-3">
                        <div className="flex size-8 items-center justify-center rounded-full bg-muted text-xs font-semibold">
                          {index + 1}
                        </div>
                        <span className="font-medium">{tool.name}</span>
                      </div>
                    </TableCell>
                    <TableCell className="text-right">{tool.views.toLocaleString()}</TableCell>
                    <TableCell className="text-right">{tool.clicks.toLocaleString()}</TableCell>
                    <TableCell className="text-right font-medium text-green-600">{tool.ctr}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>

        {/* Top Categories */}
        <Card>
          <CardHeader>
            <CardTitle>Top Categories</CardTitle>
            <CardDescription>Most popular categories by views</CardDescription>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Category</TableHead>
                  <TableHead className="text-right">Tools</TableHead>
                  <TableHead className="text-right">Views</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {topCategories.map((category) => (
                  <TableRow key={category.name}>
                    <TableCell className="font-medium">{category.name}</TableCell>
                    <TableCell className="text-right">{category.tools}</TableCell>
                    <TableCell className="text-right">{category.views.toLocaleString()}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>
    </AdminLayout>
  )
}
