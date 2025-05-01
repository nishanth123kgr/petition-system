import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

export default function HomePage() {
  return (
    <div className="min-h-screen bg-slate-950 text-slate-200">
      <header className="border-b border-slate-800 bg-slate-900/80 backdrop-blur-sm sticky top-0 z-10">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <h1 className="text-2xl font-bold bg-gradient-to-r from-slate-100 to-slate-300 text-transparent bg-clip-text">
            Petition System
          </h1>
          <div className="space-x-2">
            <Link href="/auth/login">
              <Button variant="ghost" className="text-slate-200 hover:text-white hover:bg-slate-800">
                Login
              </Button>
            </Link>
            <Link href="/auth/register">
              <Button className="bg-gradient-to-r from-violet-600 to-indigo-600 hover:from-violet-700 hover:to-indigo-700 text-white border-0">
                Register
              </Button>
            </Link>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-16">
        <div className="max-w-4xl mx-auto text-center mb-16">
          <h2 className="text-5xl font-bold mb-6 bg-gradient-to-r from-violet-400 to-indigo-300 text-transparent bg-clip-text">
            Submit Your Petition
          </h2>
          <p className="text-xl text-slate-400">
            Our advanced AI system will classify and route your petition to the appropriate department.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          <Card className="bg-slate-900 border-slate-800 hover:border-violet-500/50 transition-all duration-300 hover:shadow-[0_0_15px_rgba(139,92,246,0.15)]">
            <CardHeader>
              <CardTitle className="text-slate-100">Easy Submission</CardTitle>
              <CardDescription className="text-slate-400">Submit your petition in minutes</CardDescription>
            </CardHeader>
            <CardContent className="text-slate-300">
              <p>Our streamlined form makes it easy to submit your petition with all necessary details.</p>
            </CardContent>
          </Card>

          <Card className="bg-slate-900 border-slate-800 hover:border-violet-500/50 transition-all duration-300 hover:shadow-[0_0_15px_rgba(139,92,246,0.15)]">
            <CardHeader>
              <CardTitle className="text-slate-100">Smart Classification</CardTitle>
              <CardDescription className="text-slate-400">AI-powered routing</CardDescription>
            </CardHeader>
            <CardContent className="text-slate-300">
              <p>Our system automatically classifies your petition and routes it to the appropriate department.</p>
            </CardContent>
          </Card>

          <Card className="bg-slate-900 border-slate-800 hover:border-violet-500/50 transition-all duration-300 hover:shadow-[0_0_15px_rgba(139,92,246,0.15)]">
            <CardHeader>
              <CardTitle className="text-slate-100">Track Progress</CardTitle>
              <CardDescription className="text-slate-400">Stay updated</CardDescription>
            </CardHeader>
            <CardContent className="text-slate-300">
              <p>Track the status of your petition through our user-friendly dashboard.</p>
            </CardContent>
          </Card>
        </div>

        <div className="text-center">
          <Link href="/petitions/create">
            <Button
              size="lg"
              className="px-8 py-6 text-lg bg-gradient-to-r from-violet-600 to-indigo-600 hover:from-violet-700 hover:to-indigo-700 text-white border-0 shadow-lg shadow-violet-700/20"
            >
              Create a Petition
            </Button>
          </Link>
        </div>
      </main>

      <footer className="bg-slate-900 mt-24 py-12 border-t border-slate-800">
        <div className="container mx-auto px-4 text-center text-slate-400">
          <p>© {new Date().getFullYear()} Petition Classification System. All rights reserved.</p>
        </div>
      </footer>
    </div>
  )
}
