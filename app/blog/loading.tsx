import { PublicLayout } from "@/components/layout/public-layout"

export default function BlogLoading() {
  return (
    <PublicLayout>
      <div className="mx-auto max-w-7xl px-4 py-16 lg:px-8">
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {[1, 2, 3, 4, 5, 6].map((i) => (
            <div key={i} className="h-96 animate-pulse rounded-xl bg-muted" />
          ))}
        </div>
      </div>
    </PublicLayout>
  )
}
