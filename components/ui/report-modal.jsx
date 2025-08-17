'use client'

import { useState, useEffect } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Label } from '@/components/ui/label'
import { X, CheckCircle, AlertCircle } from 'lucide-react'
import { supabase } from '@/lib/supabase'

export default function ReportModal({ isOpen, onClose, toolName, toolId }) {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSuccess, setIsSuccess] = useState(false)
  const [error, setError] = useState('')

  // Prevent scrolling when modal is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden'
      document.documentElement.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = 'unset'
      document.documentElement.style.overflow = 'unset'
    }

    return () => {
      document.body.style.overflow = 'unset'
      document.documentElement.style.overflow = 'unset'
    }
  }, [isOpen])

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    
    if (!formData.name.trim() || !formData.email.trim() || !formData.message.trim()) {
      setError('Please fill in all fields')
      return
    }

    if (!formData.email.includes('@')) {
      setError('Please enter a valid email address')
      return
    }

    setIsSubmitting(true)
    setError('')

    try {
      // First, store in Supabase
      const { data, error: supabaseError } = await supabase
        .from('reports')
        .insert([
          {
            tool_id: toolId,
            tool_name: toolName,
            reporter_name: formData.name,
            reporter_email: formData.email,
            message: formData.message,
            status: 'pending'
          }
        ])
        .select()

      if (supabaseError) {
        throw new Error(`Database error: ${supabaseError.message}`)
      }

      // Show success message immediately
      setIsSuccess(true)

      // Send email asynchronously (don't wait for it)
      sendReportEmail().catch(err => {
        console.error('Failed to send report email:', err)
        // Don't show error to user since the report was saved successfully
      })

      // Reset form
      setFormData({ name: '', email: '', message: '' })

      // Close modal after 2 seconds
      setTimeout(() => {
        onClose()
        setIsSuccess(false)
      }, 2000)

    } catch (err) {
      console.error('Error submitting report:', err)
      setError(err.message || 'Failed to submit report. Please try again.')
    } finally {
      setIsSubmitting(false)
    }
  }

  const sendReportEmail = async () => {
    try {
      const response = await fetch('/api/send-report', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          message: formData.message,
          toolName: toolName
        }),
      })

      if (!response.ok) {
        throw new Error('Failed to send report email')
      }

      const result = await response.json()
      console.log('Report email sent:', result)
    } catch (err) {
      console.error('Error sending report email:', err)
      // Don't throw error here since this is async and shouldn't affect the user experience
    }
  }

  const handleClose = () => {
    if (!isSubmitting) {
      onClose()
      setFormData({ name: '', email: '', message: '' })
      setError('')
      setIsSuccess(false)
    }
  }

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg shadow-xl max-w-md w-full max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <h3 className="text-lg font-semibold text-gray-900">Report Tool</h3>
          <button
            onClick={handleClose}
            className="text-gray-400 hover:text-gray-600 transition-colors"
            disabled={isSubmitting}
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {isSuccess ? (
          /* Success State */
          <div className="p-6 text-center">
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <CheckCircle className="w-8 h-8 text-green-600" />
            </div>
            <h4 className="text-xl font-semibold text-gray-900 mb-2">Report Sent Successfully!</h4>
            <p className="text-gray-600">Thank you for your report. We'll review it shortly.</p>
          </div>
        ) : (
          /* Form State */
                     <form onSubmit={handleSubmit} className="p-6 space-y-3">
             <div>
               <Label htmlFor="name" className="text-sm font-medium text-gray-700">
                 Your Name *
               </Label>
               <Input
                 id="name"
                 name="name"
                 type="text"
                 value={formData.name}
                 onChange={handleInputChange}
                 placeholder="Enter your name"
                 required
                 disabled={isSubmitting}
                 className="mt-1"
               />
             </div>

             <div>
               <Label htmlFor="email" className="text-sm font-medium text-gray-700">
                 Your Email *
               </Label>
               <Input
                 id="email"
                 name="email"
                 type="email"
                 value={formData.email}
                 onChange={handleInputChange}
                 placeholder="Enter your email"
                 required
                 disabled={isSubmitting}
                 className="mt-1"
               />
             </div>

             <div>
               <Label htmlFor="message" className="text-sm font-medium text-gray-700">
                 Report Message *
               </Label>
               <Textarea
                 id="message"
                 name="message"
                 value={formData.message}
                 onChange={handleInputChange}
                 placeholder="Please describe the issue or reason for reporting this tool..."
                 required
                 disabled={isSubmitting}
                 rows={3}
                 className="mt-1 resize-none"
               />
             </div>

             {error && (
               <div className="flex items-center gap-2 p-2 bg-red-50 border border-red-200 rounded-md">
                 <AlertCircle className="w-4 h-4 text-red-600 flex-shrink-0" />
                 <span className="text-sm text-red-700">{error}</span>
               </div>
             )}

             <div className="pt-2">
               <Button 
                 type="submit" 
                 className="w-full"
                 disabled={isSubmitting}
               >
                 {isSubmitting ? 'Submitting...' : 'Submit Report'}
               </Button>
             </div>
           </form>
        )}

        {/* Footer - only show when not in success state */}
        {!isSuccess && (
          <div className="px-6 pb-6">
            <Button 
              onClick={handleClose} 
              variant="outline" 
              className="w-full"
              disabled={isSubmitting}
            >
              Cancel
            </Button>
          </div>
        )}
      </div>
    </div>
  )
}
