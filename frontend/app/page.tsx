"use client"

import React from "react"
import Link from "next/link"
import Image from "next/image"
import { motion } from "framer-motion"
import { Button } from "../components/ui/button"
import { ArrowRight, CheckCircle, Sparkles, Clock, Shield, ChevronRight, FileText } from "lucide-react"

export default function HomePage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-indigo-950 text-slate-200">
      {/* Background decorative elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-[10%] w-72 h-72 bg-violet-600/10 rounded-full blur-[100px]" />
        <div className="absolute bottom-40 right-[5%] w-96 h-96 bg-indigo-600/10 rounded-full blur-[120px]" />
      </div>
      
      {/* Header */}
      <header className="border-b border-slate-800/60 bg-slate-900/80 backdrop-blur-xl sticky top-0 z-50 shadow-lg shadow-slate-950/20">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <Link href="/" className="flex items-center gap-2">
            <div className="h-9 w-9 rounded-md bg-gradient-to-br from-violet-500 to-indigo-600 flex items-center justify-center shadow-sm shadow-violet-900/30">
              <FileText className="h-5 w-5 text-white" />
            </div>
            <h1 className="text-xl font-bold text-slate-100">
              Petition System
            </h1>
          </Link>
          <div className="flex items-center gap-4">
            <Link href="/auth/login">
              <Button variant="ghost" className="text-slate-300 hover:text-white hover:bg-slate-800/70">
                Log in
              </Button>
            </Link>
            <Link href="/auth/register">
              <Button className="relative overflow-hidden group bg-gradient-to-r from-violet-600 to-indigo-600 hover:from-violet-500 hover:to-indigo-500 text-white shadow-lg shadow-violet-900/30 transition-all duration-300">
                <span className="relative z-10">Register</span>
                <span className="absolute inset-0 h-full w-full scale-0 rounded-md bg-white/10 transition-all duration-300 group-hover:scale-100 group-hover:opacity-100" />
              </Button>
            </Link>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative py-20 md:py-28 overflow-hidden">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="max-w-xl">
              <span className="inline-block px-3 py-1 rounded-full text-sm font-medium bg-violet-900/40 text-violet-200 mb-6 border border-violet-700/40">
                Streamlined Petition Management
              </span>
              <h1 className="text-4xl md:text-5xl font-bold mb-6">
                Making civic engagement <span className="bg-gradient-to-r from-violet-400 to-indigo-300 text-transparent bg-clip-text">simple and effective</span>
              </h1>
              <p className="text-xl text-slate-400 mb-8">
                Our platform simplifies the entire petition process from submission to resolution, connecting citizens with their government efficiently.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Link href="/auth/register">
                  <Button size="lg" className="w-full sm:w-auto relative overflow-hidden group bg-gradient-to-r from-violet-600 to-indigo-600 hover:from-violet-500 hover:to-indigo-500 text-white shadow-lg shadow-violet-900/30 transition-all duration-300">
                    <span className="relative z-10">Get Started</span>
                    <ArrowRight className="ml-2 h-5 w-5 relative z-10" />
                    <span className="absolute inset-0 h-full w-full scale-0 rounded-md bg-white/10 transition-all duration-300 group-hover:scale-100 group-hover:opacity-100" />
                  </Button>
                </Link>
                <Link href="#how-it-works">
                  <Button variant="outline" size="lg" className="w-full sm:w-auto border-slate-700 text-slate-300 hover:text-white hover:border-violet-500/50">
                    Learn More
                    <ChevronRight className="ml-1 h-5 w-5" />
                  </Button>
                </Link>
              </div>

              <div className="mt-10 flex items-center gap-8">
                <div className="flex flex-col">
                  <span className="text-2xl font-bold bg-gradient-to-r from-violet-400 to-indigo-300 text-transparent bg-clip-text">98%</span>
                  <span className="text-sm text-slate-400">Resolution Rate</span>
                </div>
                <div className="h-10 w-px bg-slate-800"></div>
                <div className="flex flex-col">
                  <span className="text-2xl font-bold bg-gradient-to-r from-violet-400 to-indigo-300 text-transparent bg-clip-text">24hrs</span>
                  <span className="text-sm text-slate-400">Avg. Response Time</span>
                </div>
                <div className="h-10 w-px bg-slate-800"></div>
                <div className="flex flex-col">
                  <span className="text-2xl font-bold bg-gradient-to-r from-violet-400 to-indigo-300 text-transparent bg-clip-text">5,000+</span>
                  <span className="text-sm text-slate-400">Petitions Processed</span>
                </div>
              </div>
            </div>

            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease: "easeOut" }}
              className="relative hidden lg:block"
            >
              <div className="absolute -right-20 -top-16 w-64 h-64 rounded-full bg-violet-500/10 opacity-60 blur-3xl"></div>
              <div className="absolute -left-10 -bottom-10 w-40 h-40 rounded-full bg-indigo-500/10 opacity-60 blur-3xl"></div>
              
              <div className="bg-slate-900/70 backdrop-blur-sm border border-slate-800/50 shadow-xl shadow-violet-900/20 rounded-2xl overflow-hidden w-full max-w-md mx-auto">
                <div className="h-12 bg-slate-800/50 border-b border-slate-700/50 flex items-center px-4">
                  <div className="flex items-center space-x-2">
                    <div className="w-3 h-3 rounded-full bg-red-400"></div>
                    <div className="w-3 h-3 rounded-full bg-yellow-400"></div>
                    <div className="w-3 h-3 rounded-full bg-green-400"></div>
                  </div>
                  <div className="text-xs text-slate-400 ml-auto">Dashboard Preview</div>
                </div>
                <div className="p-6 space-y-4">
                  <div className="flex justify-between items-center">
                    <div className="space-y-1">
                      <h3 className="font-medium text-lg text-slate-200">Welcome back, Alex</h3>
                      <p className="text-sm text-slate-400">Track your petition progress</p>
                    </div>
                    <div className="h-12 w-12 bg-violet-500/20 text-violet-300 rounded-full flex items-center justify-center">
                      <span className="font-medium">A</span>
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4 pt-3">
                    <div className="border border-slate-700/50 bg-slate-800/50 rounded-lg p-4">
                      <div className="text-sm text-slate-400">Active Petitions</div>
                      <div className="text-2xl font-semibold mt-1 text-slate-200">3</div>
                    </div>
                    <div className="border border-slate-700/50 bg-slate-800/50 rounded-lg p-4">
                      <div className="text-sm text-slate-400">Completed</div>
                      <div className="text-2xl font-semibold mt-1 text-slate-200">7</div>
                    </div>
                  </div>
                  
                  <div className="border-t border-slate-700/50 pt-4">
                    <h4 className="font-medium mb-3 text-slate-200">Recent Activity</h4>
                    <div className="space-y-2">
                      <div className="p-2 rounded-md bg-slate-800/50 flex items-center">
                        <div className="w-2 h-2 rounded-full bg-violet-500 mr-3"></div>
                        <span className="text-sm text-slate-300">Road repair petition updated</span>
                      </div>
                      <div className="p-2 rounded-md bg-slate-800/50 flex items-center">
                        <div className="w-2 h-2 rounded-full bg-indigo-500 mr-3"></div>
                        <span className="text-sm text-slate-300">New comment on park cleanup</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section id="how-it-works" className="py-24 relative">
        <div className="absolute inset-0 bg-slate-900/50"></div>
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-3xl mx-auto text-center mb-16">
            <span className="inline-block px-3 py-1 rounded-full text-sm font-medium bg-violet-900/40 text-violet-200 mb-4 border border-violet-700/40">
              How It Works
            </span>
            <h2 className="text-3xl md:text-4xl font-bold mb-4 bg-gradient-to-r from-violet-200 to-indigo-300 bg-clip-text text-transparent">
              Simple process, meaningful impact
            </h2>
            <p className="text-xl text-slate-400">
              Our system makes it easy to create, track, and resolve petitions efficiently
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                icon: <Sparkles className="h-6 w-6 text-violet-400" />,
                title: "Easy Submission",
                description: "Submit your petition using our intuitive form that guides you through each step of the process."
              },
              {
                icon: <Shield className="h-6 w-6 text-violet-400" />,
                title: "Smart Routing",
                description: "Our system automatically classifies and routes your petition to the appropriate department."
              },
              {
                icon: <Clock className="h-6 w-6 text-violet-400" />,
                title: "Real-time Updates",
                description: "Track the status of your petition and receive notifications on its progress."
              }
            ].map((feature, index) => (
              <motion.div 
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="bg-slate-900/70 backdrop-blur-sm border border-slate-800/50 rounded-lg p-6 shadow-lg hover:shadow-violet-900/20 hover:border-violet-500/30 transition-all duration-300"
              >
                <div className="h-12 w-12 rounded-lg bg-violet-500/20 flex items-center justify-center mb-4">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-semibold text-slate-100 mb-2">{feature.title}</h3>
                <p className="text-slate-400">{feature.description}</p>
                <div className="mt-4 h-1 w-10 bg-gradient-to-r from-violet-500 to-indigo-500 rounded-full"></div>
              </motion.div>
            ))}
          </div>

          <div className="mt-12 text-center">
            <Link href="/auth/register">
              <Button size="lg" className="relative overflow-hidden group bg-gradient-to-r from-violet-600 to-indigo-600 hover:from-violet-500 hover:to-indigo-500 text-white shadow-lg shadow-violet-900/30 transition-all duration-300 px-8">
                <span className="relative z-10">Create a Petition</span>
                <span className="absolute inset-0 h-full w-full scale-0 rounded-md bg-white/10 transition-all duration-300 group-hover:scale-100 group-hover:opacity-100" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-24 relative">
        <div className="absolute inset-0 bg-gradient-to-br from-slate-950 via-slate-900 to-indigo-950"></div>
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-3xl mx-auto text-center mb-16">
            <span className="inline-block px-3 py-1 rounded-full text-sm font-medium bg-violet-900/40 text-violet-200 mb-4 border border-violet-700/40">
              Success Stories
            </span>
            <h2 className="text-3xl md:text-4xl font-bold mb-4 bg-gradient-to-r from-violet-200 to-indigo-300 bg-clip-text text-transparent">
              Real results from real people
            </h2>
            <p className="text-xl text-slate-400">
              See how our platform is making a difference in communities
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                quote: "The city fixed our street lighting within a week after our petition was submitted. I'm impressed by the efficiency.",
                author: "Sarah Johnson",
                role: "Community Resident"
              },
              {
                quote: "As a department manager, this system has transformed how we handle citizen requests. Everything is organized and trackable.",
                author: "Michael Chen",
                role: "Infrastructure Department"
              },
              {
                quote: "The petition system helped us get a damaged playground repaired quickly. The kids are thrilled to have their space back.",
                author: "Priya Sharma",
                role: "Parent Association"
              }
            ].map((testimonial, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="bg-slate-900/30 backdrop-blur-sm border border-slate-800/50 rounded-lg p-6 shadow-lg hover:shadow-violet-900/20 hover:border-violet-500/30 transition-all duration-300"
              >
                <div className="flex mb-4 text-violet-400">
                  {[...Array(5)].map((_, i) => (
                    <svg key={i} xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="currentColor" className="mr-1">
                      <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
                    </svg>
                  ))}
                </div>
                <p className="text-slate-300 mb-6">"{testimonial.quote}"</p>
                <div className="flex items-center">
                  <div className="h-10 w-10 rounded-full bg-violet-500/20 flex items-center justify-center text-violet-300 font-medium text-sm">
                    {testimonial.author[0]}
                  </div>
                  <div className="ml-3">
                    <p className="font-medium text-slate-200">{testimonial.author}</p>
                    <p className="text-sm text-slate-400">{testimonial.role}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto bg-gradient-to-r from-violet-600/20 to-indigo-600/20 backdrop-blur-sm rounded-2xl p-8 md:p-12 shadow-xl border border-violet-500/30 text-center">
            <h2 className="text-3xl font-bold text-slate-100 mb-4">Ready to make a difference?</h2>
            <p className="text-xl text-slate-300 mb-8 max-w-2xl mx-auto">
              Join thousands of citizens who have successfully resolved community issues through our petition platform.
            </p>
            <Link href="/auth/register">
              <Button size="lg" className="relative overflow-hidden group bg-gradient-to-r from-violet-600 to-indigo-600 hover:from-violet-500 hover:to-indigo-500 text-white shadow-lg shadow-violet-900/30 transition-all duration-300 px-10 py-6 text-lg font-medium">
                <span className="relative z-10">Register Now</span>
                <ArrowRight className="ml-2 h-5 w-5 relative z-10" />
                <span className="absolute inset-0 h-full w-full scale-0 rounded-md bg-white/10 transition-all duration-300 group-hover:scale-100 group-hover:opacity-100" />
              </Button>
            </Link>
            <div className="mt-8 flex flex-wrap justify-center gap-4 md:gap-8 text-slate-300">
              <div className="flex items-center">
                <CheckCircle className="h-5 w-5 mr-2 text-violet-400" />
                <span>Free to use</span>
              </div>
              <div className="flex items-center">
                <CheckCircle className="h-5 w-5 mr-2 text-violet-400" />
                <span>Secure & private</span>
              </div>
              <div className="flex items-center">
                <CheckCircle className="h-5 w-5 mr-2 text-violet-400" />
                <span>Quick response</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-slate-900/80 backdrop-blur-sm border-t border-slate-800/60 py-12">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="md:col-span-2">
              <div className="flex items-center gap-2 mb-4">
                <div className="h-8 w-8 rounded-md bg-gradient-to-br from-violet-500 to-indigo-600 flex items-center justify-center shadow-sm shadow-violet-900/30">
                  <FileText className="h-4 w-4 text-white" />
                </div>
                <h2 className="text-lg font-bold text-slate-100">
                  Petition System
                </h2>
              </div>
              <p className="text-slate-400 max-w-md">
                Connecting citizens with their government to resolve community issues efficiently and transparently.
              </p>
            </div>
            
            <div>
              <h3 className="font-semibold text-slate-100 mb-4">Quick Links</h3>
              <ul className="space-y-2">
                <li><Link href="/auth/login" className="text-slate-400 hover:text-violet-400 transition-colors">Log in</Link></li>
                <li><Link href="/auth/register" className="text-slate-400 hover:text-violet-400 transition-colors">Register</Link></li>
                <li><Link href="/petitions" className="text-slate-400 hover:text-violet-400 transition-colors">Browse Petitions</Link></li>
                <li><Link href="#how-it-works" className="text-slate-400 hover:text-violet-400 transition-colors">How It Works</Link></li>
              </ul>
            </div>
            
            <div>
              <h3 className="font-semibold text-slate-100 mb-4">Legal</h3>
              <ul className="space-y-2">
                <li><Link href="#" className="text-slate-400 hover:text-violet-400 transition-colors">Privacy Policy</Link></li>
                <li><Link href="#" className="text-slate-400 hover:text-violet-400 transition-colors">Terms of Service</Link></li>
                <li><Link href="#" className="text-slate-400 hover:text-violet-400 transition-colors">Cookie Policy</Link></li>
                <li><Link href="#" className="text-slate-400 hover:text-violet-400 transition-colors">Contact Us</Link></li>
              </ul>
            </div>
          </div>
          
          <div className="border-t border-slate-800/60 mt-8 pt-8 flex flex-col md:flex-row justify-between items-center">
            <p className="text-slate-500 mb-4 md:mb-0">
              © {new Date().getFullYear()} Petition System. All rights reserved.
            </p>
            <div className="flex space-x-6">
              <Link href="#" className="text-slate-500 hover:text-violet-400">
                <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path fillRule="evenodd" d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" clipRule="evenodd" />
                </svg>
              </Link>
              <Link href="#" className="text-slate-500 hover:text-violet-400">
                <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84" />
                </svg>
              </Link>
              <Link href="#" className="text-slate-500 hover:text-violet-400">
                <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path fillRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clipRule="evenodd" />
                </svg>
              </Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}
