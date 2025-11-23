import React from 'react'
import AdminLayout from '@/components/admin-layout'
function layout({children}) {
  return (
    <AdminLayout>{children}</AdminLayout>
  )
}

export default layout