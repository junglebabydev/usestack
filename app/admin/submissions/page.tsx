"use client"

import { useState } from "react"
import { Search, Filter, Eye, Check, X } from "lucide-react"
import { AdminLayout } from "@/components/layout/admin-layout"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import type { Submission } from "@/lib/types"

// Mock data
const submissions: Submission[] = [
  {
    id: "1",
    tool_name: "AI Writer Pro",
    tagline: "Advanced AI writing assistant",
    website_url: "https://aiwriter.com",
    company_name: "WriteTech Inc",
    categories: ["Text Generation"],
    subcategories: [],
    tags: ["writing", "content"],
    submitter_name: "John Doe",
    submitter_email: "john@example.com",
    status: "pending",
    submitted_at: "2024-01-15T10:30:00Z",
  },
]

export default function AdminSubmissionsPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [statusFilter, setStatusFilter] = useState<"all" | "pending" | "approved" | "rejected">("all")
  const [selectedSubmission, setSelectedSubmission] = useState<Submission | null>(null)
  const [rejectReason, setRejectReason] = useState("")
  const [showRejectDialog, setShowRejectDialog] = useState(false)

  const filteredSubmissions = submissions.filter((sub) => {
    if (statusFilter !== "all" && sub.status !== statusFilter) return false
    if (searchQuery && !sub.tool_name.toLowerCase().includes(searchQuery.toLowerCase())) return false
    return true
  })

  const handleApprove = (submission: Submission) => {
    console.log("Approving:", submission)
    // In production: convert to tool, create company if needed, etc.
  }

  const handleReject = () => {
    console.log("Rejecting with reason:", rejectReason)
    setShowRejectDialog(false)
    setRejectReason("")
  }

  return (
    <AdminLayout>
      <div className="space-y-6">
        {/* Header */}
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Submissions</h1>
          <p className="text-muted-foreground">Review and manage tool submissions</p>
        </div>

        {/* Filters */}
        <div className="flex flex-col gap-4">
          <Tabs value={statusFilter} onValueChange={(v) => setStatusFilter(v as any)}>
            <TabsList>
              <TabsTrigger value="all">All</TabsTrigger>
              <TabsTrigger value="pending">
                Pending
                <Badge variant="secondary" className="ml-2">
                  {submissions.filter((s) => s.status === "pending").length}
                </Badge>
              </TabsTrigger>
              <TabsTrigger value="approved">Approved</TabsTrigger>
              <TabsTrigger value="rejected">Rejected</TabsTrigger>
            </TabsList>
          </Tabs>

          <Card>
            <CardHeader className="pb-3">
              <div className="flex flex-col gap-4 sm:flex-row">
                <div className="relative flex-1">
                  <Search className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
                  <Input
                    placeholder="Search submissions..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-9"
                  />
                </div>
                <Button variant="outline">
                  <Filter className="mr-2 size-4" />
                  More Filters
                </Button>
              </div>
            </CardHeader>
          </Card>
        </div>

        {/* Submissions Table */}
        <Card>
          <CardContent className="p-0">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Tool Name</TableHead>
                  <TableHead>Website</TableHead>
                  <TableHead>Submitter</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Submitted</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredSubmissions.map((submission) => (
                  <TableRow key={submission.id}>
                    <TableCell>
                      <div>
                        <p className="font-medium">{submission.tool_name}</p>
                        <p className="text-sm text-muted-foreground line-clamp-1">{submission.tagline}</p>
                      </div>
                    </TableCell>
                    <TableCell>
                      <a
                        href={submission.website_url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-sm text-primary hover:underline"
                      >
                        {new URL(submission.website_url).hostname}
                      </a>
                    </TableCell>
                    <TableCell>
                      <div>
                        <p className="text-sm">{submission.submitter_name}</p>
                        <p className="text-xs text-muted-foreground">{submission.submitter_email}</p>
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge
                        variant={
                          submission.status === "approved"
                            ? "success"
                            : submission.status === "rejected"
                              ? "destructive"
                              : "secondary"
                        }
                      >
                        {submission.status}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <span className="text-sm text-muted-foreground">
                        {new Date(submission.submitted_at).toLocaleDateString()}
                      </span>
                    </TableCell>
                    <TableCell className="text-right">
                      <div className="flex justify-end gap-2">
                        <Button variant="ghost" size="icon" onClick={() => setSelectedSubmission(submission)}>
                          <Eye className="size-4" />
                        </Button>
                        {submission.status === "pending" && (
                          <>
                            <Button
                              variant="ghost"
                              size="icon"
                              className="text-green-600 hover:text-green-700"
                              onClick={() => handleApprove(submission)}
                            >
                              <Check className="size-4" />
                            </Button>
                            <Button
                              variant="ghost"
                              size="icon"
                              className="text-destructive hover:text-destructive"
                              onClick={() => {
                                setSelectedSubmission(submission)
                                setShowRejectDialog(true)
                              }}
                            >
                              <X className="size-4" />
                            </Button>
                          </>
                        )}
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>

        {/* Submission Detail Dialog */}
        <Dialog open={!!selectedSubmission && !showRejectDialog} onOpenChange={() => setSelectedSubmission(null)}>
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle>{selectedSubmission?.tool_name}</DialogTitle>
              <DialogDescription>{selectedSubmission?.tagline}</DialogDescription>
            </DialogHeader>
            {selectedSubmission && (
              <div className="space-y-4">
                <div className="grid gap-4 sm:grid-cols-2">
                  <div>
                    <Label>Website</Label>
                    <p className="text-sm">{selectedSubmission.website_url}</p>
                  </div>
                  <div>
                    <Label>Company</Label>
                    <p className="text-sm">{selectedSubmission.company_name || "—"}</p>
                  </div>
                </div>
                <div>
                  <Label>Categories</Label>
                  <div className="mt-2 flex flex-wrap gap-2">
                    {selectedSubmission.categories.map((cat) => (
                      <Badge key={cat} variant="secondary">
                        {cat}
                      </Badge>
                    ))}
                  </div>
                </div>
                <div>
                  <Label>Tags</Label>
                  <div className="mt-2 flex flex-wrap gap-2">
                    {selectedSubmission.tags.map((tag) => (
                      <Badge key={tag} variant="outline">
                        {tag}
                      </Badge>
                    ))}
                  </div>
                </div>
                <div>
                  <Label>Submitter</Label>
                  <p className="text-sm">
                    {selectedSubmission.submitter_name} ({selectedSubmission.submitter_email})
                  </p>
                </div>
              </div>
            )}
            <DialogFooter>
              <Button variant="outline" onClick={() => setSelectedSubmission(null)}>
                Close
              </Button>
              {selectedSubmission?.status === "pending" && (
                <>
                  <Button
                    variant="destructive"
                    onClick={() => {
                      setShowRejectDialog(true)
                    }}
                  >
                    Reject
                  </Button>
                  <Button onClick={() => selectedSubmission && handleApprove(selectedSubmission)}>
                    Approve & Publish
                  </Button>
                </>
              )}
            </DialogFooter>
          </DialogContent>
        </Dialog>

        {/* Reject Dialog */}
        <Dialog open={showRejectDialog} onOpenChange={setShowRejectDialog}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Reject Submission</DialogTitle>
              <DialogDescription>Provide a reason for rejecting this submission (optional)</DialogDescription>
            </DialogHeader>
            <div className="space-y-4">
              <div>
                <Label htmlFor="reject-reason">Reason</Label>
                <Textarea
                  id="reject-reason"
                  value={rejectReason}
                  onChange={(e) => setRejectReason(e.target.value)}
                  placeholder="e.g., Incomplete information, duplicate entry..."
                  rows={4}
                />
              </div>
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setShowRejectDialog(false)}>
                Cancel
              </Button>
              <Button variant="destructive" onClick={handleReject}>
                Reject Submission
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
    </AdminLayout>
  )
}
