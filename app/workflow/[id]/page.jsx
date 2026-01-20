"use client";

import React, { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import Header from "@/components/header";
import { 
  CheckCircle2, 
  Loader2, 
  Sparkles, 
  ArrowLeft, 
  Bookmark, 
  Share2,
  ChevronRight,
  ExternalLink,
  Calendar
} from "lucide-react";
import Link from "next/link";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import ShareModal from "@/components/ui/share-modal";
import { supabase } from "@/lib/supabase";

const loadingSteps = [
  { id: 1, text: "Retrieving workflow data" },
  { id: 2, text: "Loading tool details" },
  { id: 3, text: "Preparing your view..." },
];

const WorkflowPage = () => {
  const params = useParams();
  const router = useRouter();
  const { data: session, status } = useSession();
  const workflowId = params.id;
  
  const [isLoading, setIsLoading] = useState(true);
  const [workflowData, setWorkflowData] = useState(null);
  const [error, setError] = useState(null);
  const [showShareModal, setShowShareModal] = useState(false);
  const [currentStep, setCurrentStep] = useState(0);
  const [completedSteps, setCompletedSteps] = useState([]);

  // Simulate step progression for smooth transition
  useEffect(() => {
    if (!isLoading) return;

    // Quickly complete steps to show progress
    const timer1 = setTimeout(() => {
      setCompletedSteps([0]);
      setCurrentStep(1);
    }, 300);

    const timer2 = setTimeout(() => {
      setCompletedSteps([0, 1]);
      setCurrentStep(2);
    }, 600);

    return () => {
      clearTimeout(timer1);
      clearTimeout(timer2);
    };
  }, [isLoading]);

  // Fetch workflow data
  useEffect(() => {
    if (!workflowId) {
      router.push("/");
      return;
    }

    const fetchWorkflow = async () => {
      try {
        const { data, error: fetchError } = await supabase
          .from("workflows")
          .select("*")
          .eq("id", workflowId)
          .single();
          console.log("workflow is ", data);
        if (fetchError) {
          throw fetchError;
        }

        if (!data) {
          setError("Workflow not found");
          setIsLoading(false);
          return;
        }

        // Mark all steps complete
        setCompletedSteps([0, 1, 2]);
        setCurrentStep(2);
        
        setWorkflowData(data);
        
        // Small delay for smooth transition
        setTimeout(() => {
          setIsLoading(false);
        }, 400);
      } catch (err) {
        console.error("Error fetching workflow:", err);
        setError("Failed to load workflow. Please try again.");
        setIsLoading(false);
      }
    };

    fetchWorkflow();
  }, [workflowId, router]);

  if (!workflowId) {
    return null;
  }

  // Parse the response JSON
  const response = workflowData?.response ? 
    (typeof workflowData.response === 'string' ? JSON.parse(workflowData.response) : workflowData.response) 
    : null;
  const workflow = response?.workflow;
  const allTools = response?.tools || [];

  // Format date
  const formatDate = (dateString) => {
    if (!dateString) return "";
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50/50 to-white">
      <Header />
      
      <main className="pt-20 pb-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          {isLoading ? (
            <div className="flex flex-col items-center justify-center text-center py-20">
              {/* Simple Spinner */}
              <div className="w-12 h-12 mb-6 rounded-full border-4 border-blue-100 border-t-blue-500 animate-spin" />

              {/* Title */}
              <h1 className="text-2xl sm:text-3xl font-semibold text-gray-900 mb-2">
                Loading workflow...
              </h1>
              
              {/* Subtitle */}
              <p className="text-gray-500">
                Please wait
              </p>
            </div>
          ) : error ? (
            <div className="flex flex-col items-center justify-center text-center py-20">
              <h1 className="text-2xl font-bold text-gray-900 mb-4">
                {error}
              </h1>
              <p className="text-gray-500 mb-6">
                The workflow you're looking for might have been removed or doesn't exist.
              </p>
              <button
                onClick={() => router.push("/")}
                className="px-6 py-2.5 bg-blue-500 hover:bg-blue-600 text-white rounded-lg transition-colors"
              >
                Go to Home
              </button>
            </div>
          ) : workflow ? (
            <div className="w-full">
              {/* Back to Home */}
              <button
                onClick={() => router.push("/")}
                className="flex items-center gap-2 text-gray-500 hover:text-gray-700 mb-6 transition-colors"
              >
                <ArrowLeft className="w-4 h-4" />
                <span>Back to Home</span>
              </button>

              {/* Header Section */}
              <div className="flex items-start justify-between mb-6">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center">
                    <Sparkles className="w-5 h-5 text-blue-500" />
                  </div>
                  <Badge className="bg-gray-100 text-gray-700 hover:bg-gray-100 border-0 text-sm font-medium">
                    AI Generated
                  </Badge>
                </div>
                <div className="flex items-center gap-2">
                  {session ? (
                    <Button 
                      variant="outline" 
                      className="flex items-center gap-2 border-gray-200"
                    >
                      <Bookmark className="w-4 h-4" />
                      Save
                    </Button>
                  ) : (
                    <Button 
                      variant="outline" 
                      className="flex items-center gap-2 border-gray-200"
                      onClick={() => router.push('/login')}
                    >
                      <Bookmark className="w-4 h-4" />
                      Login to save
                    </Button>
                  )}
                  <Button 
                    variant="outline" 
                    className="flex items-center gap-2 border-gray-200"
                    onClick={() => setShowShareModal(true)}
                  >
                    <Share2 className="w-4 h-4" />
                    Share
                  </Button>
                </div>
              </div>

              {/* Workflow Title & Description */}
              <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
                {workflow.title}
              </h1>
              <p className="text-lg text-gray-600 mb-4">
                {workflow.description}
              </p>
              
              {/* Created date and query */}
              <div className="flex flex-wrap items-center gap-4 text-sm text-gray-500 mb-8">
                {workflowData?.created_at && (
                  <div className="flex items-center gap-1.5">
                    <Calendar className="w-4 h-4" />
                    <span>Created {formatDate(workflowData.created_at)}</span>
                  </div>
                )}
                {workflowData?.query && (
                  <div className="flex items-center gap-1.5">
                    <span className="text-gray-400">•</span>
                    <span>Based on: "{workflowData.query}"</span>
                  </div>
                )}
              </div>

              {/* Getting Started Section */}
              <h2 className="text-2xl font-bold text-gray-900 mb-6">
                Getting Started
              </h2>

              {/* Workflow Steps */}
              <div className="space-y-6">
                {workflow.steps.map((step) => {
                  // Get tools for this step - check step.tools first, fallback to allTools distributed across steps
                  const stepTools = step.tools?.length > 0 
                    ? step.tools 
                    : allTools.length > 0 
                      ? allTools.filter((_, idx) => Math.floor(idx / Math.ceil(allTools.length / workflow.steps.length)) === step.stepNumber - 1)
                      : [];
                  
                  return (
                  <Card key={step.stepNumber} className="border border-gray-200 overflow-hidden">
                    <CardContent className="p-6">
                      {/* Step Header */}
                      <div className="flex items-start gap-4 mb-6">
                        <div className="w-10 h-10 rounded-full bg-blue-500 flex items-center justify-center flex-shrink-0">
                          <span className="text-white font-bold">{step.stepNumber}</span>
                        </div>
                        <div>
                          <h3 className="text-lg font-bold text-gray-900 mb-1">
                            {step.title}
                          </h3>
                          <p className="text-gray-600">
                            {step.description}
                          </p>
                        </div>
                      </div>

                      {/* Recommended Tools */}
                      {stepTools.length > 0 && (
                        <div className="mb-6">
                          <h4 className="text-sm font-semibold text-gray-900 mb-4">
                            Recommended Tools:
                          </h4>
                          <div className="space-y-3">
                            {stepTools.map((tool) => (
                              <div 
                                key={tool.id}
                                className="flex items-center justify-between p-4 bg-white border border-gray-200 rounded-xl"
                              >
                                <div className="flex items-center gap-4">
                                  {/* Tool Logo - Square */}
                                  <div className="w-14 h-14 rounded-xl bg-gray-100 flex items-center justify-center overflow-hidden flex-shrink-0">
                                    {tool.tool_thumbnail_url || tool.logo_url ? (
                                      <img 
                                        src={tool.tool_thumbnail_url || tool.logo_url} 
                                        alt={tool.name}
                                        className="w-full h-full object-cover"
                                      />
                                    ) : (
                                      <div className="w-full h-full bg-gradient-to-br from-blue-500 to-purple-500 flex items-center justify-center">
                                        <span className="text-white font-bold text-xl">
                                          {tool.name?.charAt(0)?.toUpperCase()}
                                        </span>
                                      </div>
                                    )}
                                  </div>
                                  {/* Tool Info */}
                                  <div>
                                    <div className="flex items-center gap-2 mb-0.5">
                                      <h5 className="font-semibold text-gray-900">
                                        {tool.name}
                                      </h5>
                                      {tool.is_verified && (
                                        <Badge className="bg-gray-100 text-gray-600 hover:bg-gray-100 border-0 text-xs px-2 py-0.5 rounded-md">
                                          Verified
                                        </Badge>
                                      )}
                                    </div>
                                    <p className="text-sm text-gray-500">
                                      {tool.stepDescription || tool.tagline || tool.description?.substring(0, 60)}
                                    </p>
                                  </div>
                                </div>
                                {/* Actions */}
                                <div className="flex items-center gap-2 flex-shrink-0">
                                  <Link href={`/tool/${tool.slug || tool.id}`}>
                                    <Button 
                                      variant="outline" 
                                      size="sm"
                                      className="border-gray-200 text-gray-700 rounded-lg"
                                    >
                                      Details
                                    </Button>
                                  </Link>
                                  {tool.website_url && (
                                    <a 
                                      href={tool.website_url} 
                                      target="_blank" 
                                      rel="noopener noreferrer"
                                    >
                                      <Button 
                                        size="sm"
                                        className="bg-blue-500 hover:bg-blue-600 text-white flex items-center gap-1.5 rounded-lg"
                                      >
                                        Visit
                                        <ExternalLink className="w-3.5 h-3.5" />
                                      </Button>
                                    </a>
                                  )}
                                </div>
                              </div>
                            ))}
                          </div>
                        </div>
                      )}

                      {/* Pro Tips */}
                      {step.proTips?.length > 0 && (
                        <div className="bg-blue-50 rounded-xl p-4">
                          <div className="flex items-center gap-2 mb-3">
                            <Sparkles className="w-4 h-4 text-blue-500" />
                            <h4 className="text-sm font-semibold text-gray-900">
                              Pro Tips
                            </h4>
                          </div>
                          <ul className="space-y-2">
                            {step.proTips.map((tip, idx) => (
                              <li key={idx} className="flex items-start gap-2 text-sm text-gray-700">
                                <ChevronRight className="w-4 h-4 text-blue-500 flex-shrink-0 mt-0.5" />
                                <span>{tip}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      )}
                    </CardContent>
                  </Card>
                  );
                })}
              </div>

              {/* Complete Tool Stack */}
              {allTools.length > 0 && (
                <Card className="border border-gray-200 mt-8">
                  <CardContent className="p-6">
                    <h3 className="text-lg font-bold text-gray-900 mb-1">
                      Complete Tool Stack
                    </h3>
                    <p className="text-sm text-gray-500 mb-6">
                      All {allTools.length} tools recommended for this workflow
                    </p>
                    <div className="grid sm:grid-cols-2 gap-4">
                      {allTools.map((tool) => (
                        <Link 
                          key={tool.id}
                          href={`/tool/${tool.slug || tool.id}`}
                          className="flex items-center justify-between p-4 bg-white border border-gray-200 rounded-xl hover:border-blue-200 hover:shadow-sm transition-all"
                        >
                          <div className="flex items-center gap-3">
                            {/* Tool Logo */}
                            <div className="w-10 h-10 rounded-lg bg-gray-100 flex items-center justify-center overflow-hidden">
                              {tool.logo_url || tool.tool_thumbnail_url ? (
                                <img 
                                  src={tool.logo_url || tool.tool_thumbnail_url} 
                                  alt={tool.name}
                                  className="w-full h-full object-cover"
                                />
                              ) : (
                                <div className="w-full h-full bg-gradient-to-br from-blue-500 to-purple-500 flex items-center justify-center">
                                  <span className="text-white font-bold text-sm">
                                    {tool.name?.charAt(0)?.toUpperCase()}
                                  </span>
                                </div>
                              )}
                            </div>
                            {/* Tool Info */}
                            <div>
                              <div className="flex items-center gap-1.5">
                                <h5 className="font-semibold text-gray-900 text-sm">
                                  {tool.name}
                                </h5>
                                {tool.is_verified && (
                                  <CheckCircle2 className="w-3.5 h-3.5 text-blue-500" />
                                )}
                              </div>
                              <p className="text-xs text-gray-500 line-clamp-1">
                                {tool.tagline || tool.description?.substring(0, 40)}
                              </p>
                            </div>
                          </div>
                          <ChevronRight className="w-5 h-5 text-gray-400" />
                        </Link>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              )}

              {/* CTA Section */}
              <Card className="bg-blue-50 border-0 mt-8">
                <CardContent className="flex flex-col items-center text-center py-10">
                  <div className="w-12 h-12 rounded-full bg-blue-100 flex items-center justify-center mb-4">
                    <Sparkles className="w-6 h-6 text-blue-500" />
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-2">
                    Need a different workflow?
                  </h3>
                  <p className="text-gray-600 mb-6">
                    Create a new AI-powered workflow tailored to your needs
                  </p>
                  <div className="flex items-center gap-3">
                    <Button 
                      className="bg-blue-500 hover:bg-blue-600 text-white px-6 flex items-center gap-2"
                      onClick={() => router.push("/")}
                    >
                      Create New Workflow
                      <ChevronRight className="w-4 h-4" />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>
          ) : (
            <div className="text-center py-12">
              <p className="text-gray-500">No workflow data found.</p>
              <button
                onClick={() => router.push("/")}
                className="mt-4 px-6 py-2.5 bg-blue-500 hover:bg-blue-600 text-white rounded-lg transition-colors"
              >
                Go to Home
              </button>
            </div>
          )}
        </div>
      </main>

      {/* Share Modal */}
      <ShareModal
        isOpen={showShareModal}
        onClose={() => setShowShareModal(false)}
        title={workflow?.title}
        description={workflow?.description}
      />
    </div>
  );
};

export default WorkflowPage;
