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

export default function SubmitToolPage() {
  const [formData, setFormData] = useState({
    toolName: "",
    websiteUrl: "",
    description: "",
    category: "",
    type: "",
    targetAudience: "",
    pricingModel: "",
    startingPrice: "",
    keyFeatures: [""],
    demoVideoUrl: "",
    providerName: "",
    contactEmail: "",
    apiAvailable: false,
    supportedLanguages: [""],
    integrations: [""],
  })

  const [isSubmitted, setIsSubmitted] = useState(false)

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

  const handleSubmit = (e) => {
    e.preventDefault()
    // Here you would typically send the data to your backend
    console.log("Form submitted:", formData)
    setIsSubmitted(true)
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
            <Button onClick={() => setIsSubmitted(false)} variant="outline">
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

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Basic Information */}
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
                    type="url"
                    placeholder="https://your-tool.com"
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

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
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
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Target Audience</label>
                  <Input
                    placeholder="e.g., Developers, Marketers"
                    value={formData.targetAudience}
                    onChange={(e) => handleInputChange("targetAudience", e.target.value)}
                  />
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Pricing Information */}
          <Card>
            <CardHeader>
              <CardTitle>Pricing Information</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Pricing Model <span className="text-red-500">*</span>
                  </label>
                  <Select
                    value={formData.pricingModel}
                    onValueChange={(value) => handleInputChange("pricingModel", value)}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select pricing model" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="free">Free</SelectItem>
                      <SelectItem value="freemium">Freemium</SelectItem>
                      <SelectItem value="subscription">Subscription</SelectItem>
                      <SelectItem value="one-time">One-time Purchase</SelectItem>
                      <SelectItem value="usage-based">Usage-based</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Starting Price</label>
                  <Input
                    placeholder="e.g., $9/month or Free"
                    value={formData.startingPrice}
                    onChange={(e) => handleInputChange("startingPrice", e.target.value)}
                  />
                </div>
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
                  type="url"
                  placeholder="https://youtube.com/watch?v=..."
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

          {/* Additional Information */}
          <Card>
            <CardHeader>
              <CardTitle>Additional Information</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
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

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Supported Languages</label>
                <div className="space-y-3">
                  {formData.supportedLanguages.map((language, index) => (
                    <div key={index} className="flex gap-2">
                      <Input
                        placeholder="e.g., English, Spanish"
                        value={language}
                        onChange={(e) => handleArrayChange("supportedLanguages", index, e.target.value)}
                      />
                      {formData.supportedLanguages.length > 1 && (
                        <Button
                          type="button"
                          variant="outline"
                          size="sm"
                          onClick={() => removeArrayItem("supportedLanguages", index)}
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
                    onClick={() => addArrayItem("supportedLanguages")}
                    className="flex items-center gap-2"
                  >
                    <Plus className="w-4 h-4" />
                    Add Language
                  </Button>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Integrations</label>
                <div className="space-y-3">
                  {formData.integrations.map((integration, index) => (
                    <div key={index} className="flex gap-2">
                      <Input
                        placeholder="e.g., Slack, Zapier, API"
                        value={integration}
                        onChange={(e) => handleArrayChange("integrations", index, e.target.value)}
                      />
                      {formData.integrations.length > 1 && (
                        <Button
                          type="button"
                          variant="outline"
                          size="sm"
                          onClick={() => removeArrayItem("integrations", index)}
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
                    onClick={() => addArrayItem("integrations")}
                    className="flex items-center gap-2"
                  >
                    <Plus className="w-4 h-4" />
                    Add Integration
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Submit Button */}
          <div className="text-center">
            <Button type="submit" size="lg" className="bg-blue-600 hover:bg-blue-700 px-12">
              Submit Tool for Review
            </Button>
            <p className="text-sm text-gray-500 mt-4">
              Your submission will be reviewed by our team within 2-3 business days. We'll contact you via email with
              updates on your tool's status.
            </p>
          </div>
        </form>
      </div>
    </div>
  )
}
