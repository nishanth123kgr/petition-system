'use client'

import { ReactNode } from 'react'
import { StaffDashboardLayout } from '@/components/layouts/staff-dashboard-layout'

export default function StaffDashboardPage() {
  const content: ReactNode = (
    <div>
      {/* Content is now managed by the layout component */}
    </div>
  )
  
  return (
    <StaffDashboardLayout children={content} />
  )
}
