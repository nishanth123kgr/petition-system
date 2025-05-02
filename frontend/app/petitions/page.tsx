'use client';

import { useParams, useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { 
  User, 
  Calendar, 
  Tag, 
  MessageSquare, 
  ThumbsUp, 
  Share2, 
  Flag, 
  ChevronLeft, 
  Clock, 
  AlertCircle
} from 'lucide-react';
import { useState, useEffect } from 'react';
import Link from 'next/link';
import { UserDashboardLayout } from '@/components/layouts/user-dashboard-layout';
import { Card } from '@/components/ui/card';
import { Avatar } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';

// Mock petition data - in a real app, you would fetch this from an API
const mockPetition = {
  id: "1",
  title: "Improve Public Transportation in Downtown Area",
  description: "Our city's downtown area is experiencing significant congestion due to inadequate public transportation options. We propose expanding bus routes, increasing frequency of service, and adding dedicated bus lanes to improve mobility for all citizens.",
  longDescription: `
    <p>The current public transportation system in our downtown area is insufficient to meet the growing demands of our community. With increasing population density and business development in the city center, the existing infrastructure is becoming strained.</p>
    
    <p>Key issues include:</p>
    <ul>
      <li>Limited bus routes that don't adequately cover all neighborhoods</li>
      <li>Infrequent service during peak hours leading to overcrowding</li>
      <li>Lack of dedicated lanes causing delays due to traffic congestion</li>
      <li>Insufficient connections between different transportation modes</li>
    </ul>
    
    <p>We propose the following solutions:</p>
    <ol>
      <li>Expand bus routes to cover underserved areas, particularly in the eastern and western sectors of downtown</li>
      <li>Increase service frequency to every 10 minutes during peak hours</li>
      <li>Implement dedicated bus lanes on major arteries to bypass congestion</li>
      <li>Develop better integration between bus services and other transportation options</li>
    </ol>
    
    <p>These improvements would benefit thousands of daily commuters, reduce traffic congestion, decrease carbon emissions, and make our city more accessible to all residents.</p>
  `,
  department: "Transportation Department",
  category: "Infrastructure",
  status: "In Review",
  createdBy: "Jane Smith",
  createdAt: "2025-04-15T10:30:00Z",
  updatedAt: "2025-04-28T14:45:00Z",
  supportCount: 1247,
  commentCount: 38,
  targetSupport: 5000,
  attachments: [
    { id: 1, name: "traffic_analysis.pdf", type: "application/pdf", size: "2.4 MB" },
    { id: 2, name: "proposed_routes.jpg", type: "image/jpeg", size: "1.1 MB" }
  ],
  updates: [
    { 
      id: 1, 
      date: "2025-04-28T14:45:00Z", 
      content: "The Transportation Department has begun reviewing this petition and assigned it to the Urban Planning division for initial assessment." 
    },
    { 
      id: 2, 
      date: "2025-04-20T09:15:00Z", 
      content: "This petition has reached 1,000 signatures and qualifies for official review." 
    }
  ]
};

// Status badge colors
const statusColors = {
  "Draft": "bg-slate-500",
  "Submitted": "bg-blue-500",
  "In Review": "bg-amber-500",
  "Approved": "bg-green-500",
  "Rejected": "bg-red-500",
  "Implemented": "bg-violet-500",
  "Archived": "bg-slate-700"
};

export default function PetitionView() {
  const params = useParams();
  const router = useRouter();
  const { petitionId } = params;
  
  const [petition, setPetition] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [hasSupportedPetition, setHasSupportedPetition] = useState(false);
  
  useEffect(() => {
    // In a real application, you would fetch the petition data from an API
    // For now, we're using mock data
    setTimeout(() => {
      try {
        // Simulate API call
        setPetition(mockPetition);
        setLoading(false);
      } catch (err) {
        setError("Failed to load petition details");
        setLoading(false);
      }
    }, 600); // Simulate loading delay
  }, [petitionId]);
  
  // Calculate progress percentage
  const supportPercentage = petition ? 
    Math.min(Math.round((petition.supportCount / petition.targetSupport) * 100), 100) : 0;
  
  // Format date
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    }).format(date);
  };
  
  const handleSupport = () => {
    if (hasSupportedPetition) return;
    
    // In a real app, you would send this to your API
    setPetition((prev: typeof mockPetition) => ({
      ...prev,
      supportCount: prev.supportCount + 1
    }));
    setHasSupportedPetition(true);
  };
  
  // Parse HTML content (very simple implementation)
  const createMarkup = (htmlContent: string) => {
    return { __html: htmlContent };
  };

  return (
    <>
      <div className="p-6">
        {loading ? (
          <div className="flex flex-col items-center justify-center py-12">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="w-12 h-12 rounded-full border-4 border-slate-700 border-t-violet-500 animate-spin"
            />
            <p className="mt-4 text-slate-400">Loading petition details...</p>
          </div>
        ) : error ? (
          <div className="flex flex-col items-center justify-center py-12">
            <AlertCircle className="w-12 h-12 text-red-500" />
            <h3 className="mt-2 text-lg font-medium text-slate-200">Error Loading Petition</h3>
            <p className="mt-1 text-slate-400">{error}</p>
            <Button 
              onClick={() => router.push('/dashboard/user')}
              className="mt-6"
              variant="outline"
            >
              Return to Dashboard
            </Button>
          </div>
        ) : petition && (
          <div className="space-y-6">
            {/* Back button */}
            <Link href="/dashboard/user" className="inline-flex">
              <Button variant="ghost" size="sm" className="text-slate-400 hover:text-slate-200 -ml-2 mb-2">
                <ChevronLeft className="mr-1 h-4 w-4" /> Back to Dashboard
              </Button>
            </Link>
            
            {/* Petition header */}
            <motion.div 
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
              className="space-y-3"
            >
              <div className="flex flex-wrap items-center justify-between gap-2">
                <Badge 
                  className={`px-2.5 py-0.5 ${statusColors[petition.status as keyof typeof statusColors] || "bg-slate-500"}`}
                >
                  {petition.status}
                </Badge>
                <div className="text-sm text-slate-400 flex items-center">
                  <Calendar className="inline h-3.5 w-3.5 mr-1" />
                  Submitted on {formatDate(petition.createdAt)}
                </div>
              </div>
              
              <h1 className="text-2xl md:text-3xl font-bold text-slate-100">{petition.title}</h1>
              
              <div className="flex flex-wrap items-center gap-x-6 gap-y-2 text-sm text-slate-400">
                <div className="flex items-center">
                  <User className="inline h-4 w-4 mr-1.5 text-slate-500" />
                  <span>Created by {petition.createdBy}</span>
                </div>
                <div className="flex items-center">
                  <Tag className="inline h-4 w-4 mr-1.5 text-slate-500" />
                  <span>{petition.category}</span>
                </div>
                <div className="flex items-center">
                  <MessageSquare className="inline h-4 w-4 mr-1.5 text-slate-500" />
                  <span>{petition.commentCount} Comments</span>
                </div>
              </div>
            </motion.div>
            
            {/* Support progress */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: 0.1 }}
              className="bg-slate-800/50 rounded-lg p-4 border border-slate-700/50"
            >
              <div className="flex flex-wrap items-center justify-between gap-2">
                <div>
                  <div className="text-sm text-slate-400">Support Progress</div>
                  <div className="text-xl font-bold text-slate-100">
                    {petition.supportCount.toLocaleString()} of {petition.targetSupport.toLocaleString()}
                    <span className="ml-2 text-sm font-normal text-slate-400">
                      ({supportPercentage}%)
                    </span>
                  </div>
                </div>
                <Button
                  onClick={handleSupport}
                  disabled={hasSupportedPetition}
                  className={`${
                    hasSupportedPetition 
                      ? 'bg-slate-700 hover:bg-slate-700 text-slate-300' 
                      : 'bg-gradient-to-r from-violet-600 to-indigo-600 hover:from-violet-500 hover:to-indigo-500'
                  }`}
                >
                  <ThumbsUp className="mr-2 h-4 w-4" />
                  {hasSupportedPetition ? "Supported" : "Support Petition"}
                </Button>
              </div>
              
              {/* Progress bar */}
              <div className="mt-3 h-2 bg-slate-700/50 rounded-full overflow-hidden">
                <motion.div
                  initial={{ width: "0%" }}
                  animate={{ width: `${supportPercentage}%` }}
                  transition={{ duration: 0.8, ease: "easeOut" }}
                  className="h-full bg-gradient-to-r from-violet-500 to-indigo-500"
                />
              </div>
              
              <div className="mt-2 flex justify-between text-xs text-slate-500">
                <div>0</div>
                <div>Target: {petition.targetSupport.toLocaleString()}</div>
              </div>
            </motion.div>
            
            {/* Petition content */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.3, delay: 0.2 }}
              className="bg-slate-800/30 rounded-lg border border-slate-700/50 overflow-hidden"
            >
              <div className="p-6">
                <h2 className="text-lg font-medium text-slate-100 mb-4">Petition Details</h2>
                <div 
                  className="prose prose-sm prose-invert max-w-none text-slate-300"
                  dangerouslySetInnerHTML={createMarkup(petition.longDescription)}
                />
              </div>
              
              {/* Attachments section */}
              {petition.attachments && petition.attachments.length > 0 && (
                <div className="border-t border-slate-700/50 p-6">
                  <h3 className="text-sm font-medium text-slate-300 mb-3">Attachments</h3>
                  <div className="space-y-2">
                    {petition.attachments.map((attachment: any) => (
                      <div 
                        key={attachment.id}
                        className="flex items-center p-3 rounded-md bg-slate-800/50 hover:bg-slate-800 transition-colors cursor-pointer group"
                      >
                        <div className="w-8 h-8 rounded bg-slate-700 flex items-center justify-center mr-3">
                          {attachment.type.includes('pdf') ? (
                            <svg className="w-4 h-4 text-red-400" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                              <path d="M9 2a2 2 0 00-2 2v8a2 2 0 002 2h6a2 2 0 002-2V6.414A2 2 0 0016.414 5L14 2.586A2 2 0 0012.586 2H9z" />
                              <path d="M3 8a2 2 0 012-2h2a2 2 0 012 2v8a2 2 0 01-2 2H5a2 2 0 01-2-2V8z" />
                            </svg>
                          ) : attachment.type.includes('image') ? (
                            <svg className="w-4 h-4 text-blue-400" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                              <path fillRule="evenodd" d="M4 3a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V5a2 2 0 00-2-2H4zm12 12H4l4-8 3 6 2-4 3 6z" clipRule="evenodd" />
                            </svg>
                          ) : (
                            <svg className="w-4 h-4 text-slate-400" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                              <path fillRule="evenodd" d="M4 4a2 2 0 012-2h4.586A2 2 0 0112 2.586L15.414 6A2 2 0 0116 7.414V16a2 2 0 01-2 2H6a2 2 0 01-2-2V4z" clipRule="evenodd" />
                            </svg>
                          )}
                        </div>
                        <div className="flex-1 overflow-hidden">
                          <div className="text-sm font-medium text-slate-300 truncate">{attachment.name}</div>
                          <div className="text-xs text-slate-500">{attachment.size}</div>
                        </div>
                        <Button variant="ghost" size="sm" className="ml-2 opacity-0 group-hover:opacity-100 transition-opacity text-slate-400 hover:text-slate-200">
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                          </svg>
                        </Button>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </motion.div>
            
            {/* Status updates */}
            {petition.updates && petition.updates.length > 0 && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.3, delay: 0.3 }}
                className="bg-slate-800/30 rounded-lg border border-slate-700/50 p-6"
              >
                <h3 className="text-lg font-medium text-slate-100 mb-4">Status Updates</h3>
                <div className="space-y-4">
                  {petition.updates.map((update: any) => (
                    <div key={update.id} className="relative pl-6 pb-4 last:pb-0 border-l border-slate-700">
                      <div className="absolute left-0 top-0 -translate-x-1/2 w-3 h-3 rounded-full bg-violet-500"></div>
                      <div className="text-sm text-slate-400 mb-1 flex items-center">
                        <Clock className="h-3 w-3 mr-1" />
                        {formatDate(update.date)}
                      </div>
                      <div className="text-slate-300">{update.content}</div>
                    </div>
                  ))}
                </div>
              </motion.div>
            )}
            
            {/* Action buttons */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: 0.4 }}
              className="flex flex-wrap gap-3 justify-center sm:justify-end pt-4 border-t border-slate-800"
            >
              <Button variant="outline" size="sm" className="text-slate-300">
                <Share2 className="mr-1.5 h-4 w-4" />
                Share
              </Button>
              <Button variant="outline" size="sm" className="text-slate-300">
                <Flag className="mr-1.5 h-4 w-4" />
                Report Issue
              </Button>
            </motion.div>
          </div>
        )}
      </div>
    </>
  );
}