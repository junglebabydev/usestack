"use client"

import { useState } from "react"
import Header from "@/components/header"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"
import { Plus, X } from "lucide-react"
import { categories } from "@/lib/data"
import { supabase } from "@/lib/supabase"

export default function SubmitToolPage() {
  const [formData, setFormData] = useState({
    toolName: "",
    websiteUrl: "",
    description: "",
    category: "",
    type: "",
    imageUrl: "",
    apiAvailable: false,
    keyFeatures: [""],
    demoVideoUrl: "",
    providerName: "",
    contactEmail: "",
  })

  const [isSubmitted, setIsSubmitted] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitError, setSubmitError] = useState("");
  const [toolUrl, setToolUrl] = useState('');
  const [scrapping, setScrapping] = useState(false);

  const handleAddToolAutomatically = async()=>{
      
  };

  const handleInputChange = (field, value) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }))
  }

  const handleArrayChange = (field, index, value) => {
    setFormData((prev) => ({
      ...prev,
      [field]: prev[field].map((item, i) => (i === index ? value : item)),
    }))
  }

  const addArrayItem = (field) => {
    setFormData((prev) => ({
      ...prev,
      [field]: [...prev[field], ""],
    }))
  }

  const removeArrayItem = (field, index) => {
    setFormData((prev) => ({
      ...prev,
      [field]: prev[field].filter((_, i) => i !== index),
    }))
  }

  const resetForm = () => {
    setFormData({
      toolName: "",
      websiteUrl: "",
      description: "",
      category: "",
      type: "",
      imageUrl: "",
      apiAvailable: false,
      keyFeatures: [""],
      demoVideoUrl: "",
      providerName: "",
      contactEmail: "",
    })
    setSubmitError("")
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setIsSubmitting(true)
    setSubmitError("")

    try {
      // Filter out empty key features
      const filteredKeyFeatures = formData.keyFeatures.filter(feature => feature.trim() !== "")
      
      // Ensure website URL has protocol
      let websiteUrl = formData.websiteUrl
      if (websiteUrl && !websiteUrl.startsWith('http://') && !websiteUrl.startsWith('https://')) {
        websiteUrl = 'https://' + websiteUrl
      }
      
      // Ensure image URL has protocol if provided
      let imageUrl = formData.imageUrl
      if (imageUrl && !imageUrl.startsWith('http://') && !imageUrl.startsWith('https://')) {
        imageUrl = 'https://' + imageUrl
      }
      
      // Ensure demo video URL has protocol if provided
      let demoVideoUrl = formData.demoVideoUrl
      if (demoVideoUrl && !demoVideoUrl.startsWith('http://') && !demoVideoUrl.startsWith('https://')) {
        demoVideoUrl = 'https://' + demoVideoUrl
      }
      
      // Prepare data for Supabase
      const submissionData = {
        tool_name: formData.toolName,
        website_url: websiteUrl,
        description: formData.description,
        category: formData.category,
        type: formData.type,
        image_url: imageUrl || null,
        api_available: formData.apiAvailable,
        key_features: filteredKeyFeatures.length > 0 ? filteredKeyFeatures : null,
        demo_video_url: demoVideoUrl || null,
        provider_name: formData.providerName,
        contact_email: formData.contactEmail,
        status: 'pending'
      }

      // Insert data into Supabase
      const { data, error } = await supabase
        .from('tool_submissions')
        .insert([submissionData])
        .select()

      if (error) {
        console.error('Supabase error:', error)
        throw new Error(`Failed to submit tool: ${error.message}`)
      }

      console.log("Tool submitted successfully:", data)
      
      // Show success screen immediately after Supabase success
      setIsSubmitted(true)
      
      // Send email notification asynchronously (don't wait for it)
      fetch('/api/send-notification', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          toolName: formData.toolName,
          providerName: formData.providerName,
          contactEmail: formData.contactEmail,
          description: formData.description
        })
      })
      .then(response => {
        if (response.ok) {
          console.log('Email notification sent successfully')
        } else {
          console.warn('Failed to send email notification')
        }
      })
      .catch(error => {
        console.warn('Error sending email notification:', error)
        // Email failure doesn't affect the user experience
      })
    } catch (err) {
      console.error('Submission error:', err)
      setSubmitError(err.message || 'Failed to submit tool. Please try again.')
    } finally {
      setIsSubmitting(false)
    }
  }

  if (isSubmitted) {
    return (
      <div className="min-h-screen bg-white">
        <Header />
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="text-center">
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <h1 className="text-3xl font-bold text-gray-900 mb-4">Thank You!</h1>
            <p className="text-lg text-gray-600 mb-8">
              Your tool submission has been received successfully. Our team will review it within 2-3 business days.
            </p>
            <p className="text-gray-500 mb-8">We'll contact you via email with updates on your tool's status.</p>
            <Button onClick={() => {
              setIsSubmitted(false)
              resetForm()
            }} variant="outline">
              Submit Another Tool
            </Button>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-white">
      <Header />

      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        {/* Page Header */}
        <div className="mb-6">
          <h1 className="text-2xl font-bold text-gray-900 mb-2">Submit Your AI Tool</h1>
          <p className="text-gray-600">
            Share your AI tool with thousands of users. Fill out the form below to get your tool featured on obase.
          </p>
        </div>
        {/* Fecth Tool by URL Block */}
           <div className="space-y-3 p-5 border rounded-xl shadow-sm bg-white">
        <span className="text-lg font-semibold">Add Tool Automatically</span>
        <form className="flex flex-row items-center gap-3" onSubmit={(e) => handleAddToolAutomatically(e)}>
          <Input
            id="autofetch-url"
            placeholder="Enter Tool Website URL…"
            className="flex-1"
            disabled={scrapping}
            value={toolUrl}
            onChange={(e) => setToolUrl(e.target.value)}
          />
          <Button type="submit" className="px-5" disabled={scrapping}> {scrapping ? <><Loader2 className="animate-spin" /> Fetching </> : "Fetch Tool"}</Button>
        </form>
      </div>
       {/* Separator */}
      <div className="flex items-center justify-center gap-3 mt-3 mb-3">
        <div className="flex-1 border-t" />
        <span className="text-gray-500 text-sm">or</span>
        <div className="flex-1 border-t" />
      </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Basic Information */}
           <fieldset disabled={scrapping} className="space-y-6 opacity-100">
          <Card>
            <CardHeader>
              <CardTitle>Basic Information</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Tool Name <span className="text-red-500">*</span>
                  </label>
                  <Input
                    placeholder="Enter your AI tool name"
                    value={formData.toolName}
                    onChange={(e) => handleInputChange("toolName", e.target.value)}
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Website URL <span className="text-red-500">*</span>
                  </label>
                  <Input
                    type="text"
                    placeholder="https://your-tool.com or www.your-tool.com"
                    value={formData.websiteUrl}
                    onChange={(e) => handleInputChange("websiteUrl", e.target.value)}
                    required
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Description <span className="text-red-500">*</span>
                </label>
                <Textarea
                  placeholder="Describe what your AI tool does and how it helps users..."
                  rows={4}
                  value={formData.description}
                  onChange={(e) => handleInputChange("description", e.target.value)}
                  required
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Category <span className="text-red-500">*</span>
                  </label>
                  <Select value={formData.category} onValueChange={(value) => handleInputChange("category", value)}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select category" />
                    </SelectTrigger>
                    <SelectContent>
                      {categories.map((category) => (
                        <SelectItem key={category.id} value={category.id}>
                          {category.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Type <span className="text-red-500">*</span>
                  </label>
                  <Select value={formData.type} onValueChange={(value) => handleInputChange("type", value)}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="tool">Tool</SelectItem>
                      <SelectItem value="agent">Agent</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Image URL</label>
                <Input
                  type="text"
                  placeholder="https://example.com/image.jpg or www.example.com/image.jpg"
                  value={formData.imageUrl}
                  onChange={(e) => handleInputChange("imageUrl", e.target.value)}
                />
              </div>

              <div className="flex items-center space-x-2">
                <Checkbox
                  id="apiAvailable"
                  checked={formData.apiAvailable}
                  onCheckedChange={(checked) => handleInputChange("apiAvailable", checked)}
                />
                <label htmlFor="apiAvailable" className="text-sm font-medium text-gray-700">
                  API Available
                </label>
              </div>
            </CardContent>
          </Card>



          {/* Features & Tags */}
          <Card>
            <CardHeader>
              <CardTitle>Features & Tags</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Key Features</label>
                <div className="space-y-3">
                  {formData.keyFeatures.map((feature, index) => (
                    <div key={index} className="flex gap-2">
                      <Input
                        placeholder="Enter a key feature"
                        value={feature}
                        onChange={(e) => handleArrayChange("keyFeatures", index, e.target.value)}
                      />
                      {formData.keyFeatures.length > 1 && (
                        <Button
                          type="button"
                          variant="outline"
                          size="sm"
                          onClick={() => removeArrayItem("keyFeatures", index)}
                        >
                          <X className="w-4 h-4" />
                        </Button>
                      )}
                    </div>
                  ))}
                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    onClick={() => addArrayItem("keyFeatures")}
                    className="flex items-center gap-2"
                  >
                    <Plus className="w-4 h-4" />
                    Add Feature
                  </Button>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Demo Video URL</label>
                <Input
                  type="text"
                  placeholder="https://youtube.com/watch?v=... or www.youtube.com/watch?v=..."
                  value={formData.demoVideoUrl}
                  onChange={(e) => handleInputChange("demoVideoUrl", e.target.value)}
                />
              </div>
            </CardContent>
          </Card>

          {/* Contact Information */}
          <Card>
            <CardHeader>
              <CardTitle>Contact Information</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Provider/Company Name <span className="text-red-500">*</span>
                  </label>
                  <Input
                    placeholder="Your company or personal name"
                    value={formData.providerName}
                    onChange={(e) => handleInputChange("providerName", e.target.value)}
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Contact Email <span className="text-red-500">*</span>
                  </label>
                  <Input
                    type="email"
                    placeholder="contact@yourcompany.com"
                    value={formData.contactEmail}
                    onChange={(e) => handleInputChange("contactEmail", e.target.value)}
                    required
                  />
                </div>
              </div>
            </CardContent>
          </Card>



          {/* Error Display */}
          {submitError && (
            <div className="bg-red-50 border border-red-200 rounded-md p-4">
              <div className="flex">
                <div className="flex-shrink-0">
                  <svg className="h-5 w-5 text-red-400" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                  </svg>
                </div>
                <div className="ml-3">
                  <h3 className="text-sm font-medium text-red-800">Submission Failed</h3>
                  <div className="mt-2 text-sm text-red-700">
                    <p>{submitError}</p>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Submit Button */}
          <div className="text-center">
            <Button 
              type="submit" 
              size="lg" 
              className="bg-blue-600 hover:bg-blue-700 px-12"
              disabled={isSubmitting}
            >
              {isSubmitting ? (
                <>
                  <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Submitting...
                </>
              ) : (
                "Submit Tool for Review"
              )}
            </Button>
            <p className="text-sm text-gray-500 mt-4">
              Your submission will be reviewed by our team within 2-3 business days. We'll contact you via email with
              updates on your tool's status.
            </p>
          </div>
        </fieldset>
        </form>
        
      </div>
    </div>
  )
}
