import { Wrench, FileText, Layers, TrendingUp } from "lucide-react"
import { AdminLayout } from "@/components/layout/admin-layout"
import { KpiCard } from "@/components/ui/kpi-card"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import Link from "next/link"

const kpis = [
  {
    title: "Total Tools",
    value: "486",
    trend: { value: "+12%", isPositive: true },
    description: "vs last month",
    icon: <Wrench className="size-4" />,
  },
  {
    title: "AI Stacks",
    value: "24",
    trend: { value: "+3", isPositive: true },
    description: "new this month",
    icon: <Layers className="size-4" />,
  },
  {
    title: "Pending Submissions",
    value: "18",
    trend: { value: "-5", isPositive: true },
    description: "since yesterday",
    icon: <FileText className="size-4" />,
  },
  {
    title: "Monthly Traffic",
    value: "125K",
    trend: { value: "+24%", isPositive: true },
    description: "unique visitors",
    icon: <TrendingUp className="size-4" />,
  },
]

const recentSubmissions = [
  {
    id: "1",
    tool_name: "AI Writer Pro",
    submitter_email: "john@example.com",
    status: "pending" as const,
    submitted_at: "2024-01-15T10:30:00Z",
  },
  {
    id: "2",
    tool_name: "Code Assistant X",
    submitter_email: "sarah@example.com",
    status: "pending" as const,
    submitted_at: "2024-01-15T09:15:00Z",
  },
  {
    id: "3",
    tool_name: "Image Generator Plus",
    submitter_email: "mike@example.com",
    status: "approved" as const,
    submitted_at: "2024-01-14T16:45:00Z",
  },
]

const quickActions = [
  {
    title: "Create AI Stack",
    description: "Curate a new collection of tools",
    href: "/admin/stacks/new",
    icon: <Layers className="size-5" />,
  },
  {
    title: "Add AI Tool",
    description: "Manually add a new tool",
    href: "/admin/tools/new",
    icon: <Wrench className="size-5" />,
  },
  {
    title: "Review Submissions",
    description: "Approve or reject pending tools",
    href: "/admin/submissions",
    icon: <FileText className="size-5" />,
  },
]

export default function AdminDashboardPage() {
  return (
    <AdminLayout>
      <div className="space-y-6">
        {/* Page Header */}
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
          <p className="text-muted-foreground">Overview of your AI tool directory platform</p>
        </div>

        {/* KPIs */}
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {kpis.map((kpi) => (
            <KpiCard key={kpi.title} {...kpi} />
          ))}
        </div>

        <div className="grid gap-6 lg:grid-cols-2">
          {/* Quick Actions */}
          <Card>
            <CardHeader>
              <CardTitle>Quick Actions</CardTitle>
              <CardDescription>Common tasks and shortcuts</CardDescription>
            </CardHeader>
            <CardContent className="space-y-3">
              {quickActions.map((action) => (
                <Link key={action.title} href={action.href}>
                  <div className="flex items-center gap-4 rounded-lg border border-border p-4 transition-colors hover:bg-muted">
                    <div className="flex size-10 items-center justify-center rounded-lg bg-primary/10 text-primary">
                      {action.icon}
                    </div>
                    <div className="flex-1">
                      <p className="font-medium">{action.title}</p>
                      <p className="text-sm text-muted-foreground">{action.description}</p>
                    </div>
                  </div>
                </Link>
              ))}
            </CardContent>
          </Card>

          {/* Recent Submissions */}
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <div>
                <CardTitle>Recent Submissions</CardTitle>
                <CardDescription>Latest tool submissions for review</CardDescription>
              </div>
              <Button asChild variant="ghost" size="sm">
                <Link href="/admin/submissions">View All</Link>
              </Button>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {recentSubmissions.map((submission) => (
                  <div
                    key={submission.id}
                    className="flex items-center justify-between rounded-lg border border-border p-3"
                  >
                    <div className="min-w-0 flex-1">
                      <p className="truncate font-medium">{submission.tool_name}</p>
                      <p className="truncate text-sm text-muted-foreground">{submission.submitter_email}</p>
                    </div>
                    <Badge variant={submission.status === "approved" ? "success" : "secondary"}>
                      {submission.status}
                    </Badge>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Traffic Chart Placeholder */}
        <Card>
          <CardHeader>
            <CardTitle>Traffic Overview</CardTitle>
            <CardDescription>Visitors over the last 30 days</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex h-[300px] items-center justify-center rounded-lg border-2 border-dashed border-border">
              <p className="text-sm text-muted-foreground">Chart visualization coming soon</p>
            </div>
          </CardContent>
        </Card>
      </div>
    </AdminLayout>
  )
}
