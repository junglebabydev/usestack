'use client'

import { useState, useEffect } from 'react'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { 
  X, 
  MessageCircle, 
  Linkedin, 
  Link as LinkIcon, 
  Copy, 
  Check,
  Share2
} from 'lucide-react'

export default function ShareModal({ isOpen, onClose, url, title, description }) {
  const [copied, setCopied] = useState(false)

  // Prevent scrolling when modal is open
  useEffect(() => {
    if (isOpen) {
      // Disable scrolling on body
      document.body.style.overflow = 'hidden'
      // Also disable scrolling on html element for some browsers
      document.documentElement.style.overflow = 'hidden'
    } else {
      // Re-enable scrolling when modal is closed
      document.body.style.overflow = 'unset'
      document.documentElement.style.overflow = 'unset'
    }

    // Cleanup function to re-enable scrolling when component unmounts
    return () => {
      document.body.style.overflow = 'unset'
      document.documentElement.style.overflow = 'unset'
    }
  }, [isOpen])

  const getShareUrl = () => {
    if (url) return url
    if (typeof window !== 'undefined') return window.location.href
    return ''
  }

  const shareData = {
    title: title || 'Check out this AI tool',
    text: description || 'I found this amazing AI tool that you might be interested in!',
    url: getShareUrl()
  }

  const shareOnX = () => {
    const shareUrl = getShareUrl()
    const xUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(shareData.text)}&url=${encodeURIComponent(shareUrl)}`
    window.open(xUrl, '_blank')
  }

  const shareOnWhatsApp = () => {
    const shareUrl = getShareUrl()
    const whatsappUrl = `https://wa.me/?text=${encodeURIComponent(shareData.text + ' ' + shareUrl)}`
    window.open(whatsappUrl, '_blank')
  }

  const shareOnLinkedIn = () => {
    const shareUrl = getShareUrl()
    const linkedinUrl = `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(shareUrl)}`
    window.open(linkedinUrl, '_blank')
  }

  const copyUrl = async () => {
    const shareUrl = getShareUrl()
    try {
      await navigator.clipboard.writeText(shareUrl)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch (err) {
      console.error('Failed to copy URL:', err)
      // Fallback for older browsers
      const textArea = document.createElement('textarea')
      textArea.value = shareUrl
      document.body.appendChild(textArea)
      textArea.select()
      document.execCommand('copy')
      document.body.removeChild(textArea)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    }
  }

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg shadow-xl max-w-md w-full max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <h3 className="text-lg font-semibold text-gray-900">Share Tool</h3>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Share Options */}
        <div className="p-6 space-y-4">
          {/* X (Twitter) */}
          <button
            onClick={shareOnX}
            className="w-full flex items-center gap-4 p-4 rounded-lg border border-gray-200 hover:border-blue-300 hover:bg-blue-50 transition-all group"
          >
            <div className="w-12 h-12 bg-black rounded-lg flex items-center justify-center text-white">
              <X className="w-6 h-6" />
            </div>
            <div className="flex-1 text-left">
              <div className="font-medium text-gray-900">Share on X (Twitter)</div>
              <div className="text-sm text-gray-500">Share with your Twitter followers</div>
            </div>
            <Share2 className="w-5 h-5 text-gray-400 group-hover:text-blue-600 transition-colors" />
          </button>

          {/* WhatsApp */}
          <button
            onClick={shareOnWhatsApp}
            className="w-full flex items-center gap-4 p-4 rounded-lg border border-gray-200 hover:border-green-300 hover:bg-green-50 transition-all group"
          >
            <div className="w-12 h-12 bg-green-500 rounded-lg flex items-center justify-center text-white">
              <MessageCircle className="w-6 h-6" />
            </div>
            <div className="flex-1 text-left">
              <div className="font-medium text-gray-900">Share on WhatsApp</div>
              <div className="text-sm text-gray-500">Send to friends and family</div>
            </div>
            <Share2 className="w-5 h-5 text-gray-400 group-hover:text-green-600 transition-colors" />
          </button>

          {/* LinkedIn */}
          <button
            onClick={shareOnLinkedIn}
            className="w-full flex items-center gap-4 p-4 rounded-lg border border-gray-200 hover:border-blue-300 hover:bg-blue-50 transition-all group"
          >
            <div className="w-12 h-12 bg-blue-600 rounded-lg flex items-center justify-center text-white">
              <Linkedin className="w-6 h-6" />
            </div>
            <div className="flex-1 text-left">
              <div className="font-medium text-gray-900">Share on LinkedIn</div>
              <div className="text-sm text-gray-500">Share with your professional network</div>
            </div>
            <Share2 className="w-5 h-5 text-gray-400 group-hover:text-blue-600 transition-colors" />
          </button>

          {/* Copy URL */}
          <button
            onClick={copyUrl}
            className="w-full flex items-center gap-4 p-4 rounded-lg border border-gray-200 hover:border-purple-300 hover:bg-purple-50 transition-all group"
          >
            <div className="w-12 h-12 bg-purple-500 rounded-lg flex items-center justify-center text-white">
              {copied ? <Check className="w-6 h-6" /> : <LinkIcon className="w-6 h-6" />}
            </div>
            <div className="flex-1 text-left">
              <div className="font-medium text-gray-900">
                {copied ? 'URL Copied!' : 'Copy URL'}
              </div>
              <div className="text-sm text-gray-500">
                {copied ? 'Link copied to clipboard' : 'Copy link to clipboard'}
              </div>
            </div>
            {copied ? (
              <Badge className="bg-green-100 text-green-800 border-green-200">
                Copied!
              </Badge>
            ) : (
              <Copy className="w-5 h-5 text-gray-400 group-hover:text-purple-600 transition-colors" />
            )}
          </button>
        </div>

        {/* Footer */}
        <div className="p-6 border-t border-gray-200">
          <Button 
            onClick={onClose} 
            variant="outline" 
            className="w-full"
          >
            Close
          </Button>
        </div>
      </div>
    </div>
  )
}
