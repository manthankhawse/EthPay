"'use client'"

import { Button } from "@/components/ui/button"
import { ArrowRight, ShieldCheck, Zap, Brain } from "lucide-react"

export function HeroSection() {
  return (
    <section className="w-full mx-auto py-24 md:py-12 lg:py-12 xl:py-32 bg-gradient-to-b from-primary/5 to-background ">
      <div className="container mx-auto px-4 md:px-6">
        <div className="grid gap-6 lg:grid-cols-[1fr_400px] xl:grid-cols-[1fr_400px] justify-between">
          <div className="flex flex-col justify-center space-y-4">
            <div className="space-y-2">
              <h1 className="text-3xl font-bold tracking-tighter sm:text-5xl xl:text-6xl/none">
                Secure Ethereum Payments 
              </h1>
              <p className="max-w-[600px] text-zinc-400 md:text-xl">
                Experience lightning-fast transactions with our ML-powered fraud detection. Say goodbye to phishing and hello to peace of mind.
              </p>
            </div>
            <div className="flex flex-col gap-2 min-[400px]:flex-row">
              <Button className="inline-flex items-center justify-center" >
                Get Started <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
              <Button variant="ghost" className="border-2 border-gray-700 hover:border-white">Learn More</Button>
            </div>
            <div className="flex justify-between w-3/5 pt-4">
              <div className="flex items-center space-x-2">
                <ShieldCheck className="h-6 w-6 text-zinc-50" />
                <span className="font-medium">Advanced Security</span>
              </div>
              <div className="flex items-center space-x-2">
                <Zap className="h-6 w-6 text-zinc-50" />
                <span className="font-medium">Instant Transactions</span>
              </div>
              <div className="flex items-center space-x-2">
                <Brain className="h-6 w-6 text-zinc-50" />
                <span className="font-medium">ML Fraud Detection</span>
              </div>
            </div>
          </div>
          <div className="flex items-center justify-center">
          <svg
              className="w-full h-auto max-w-[400px]"
              viewBox="0 0 300 300"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <defs>
                <linearGradient id="gradient1" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="currentColor" stopOpacity="0.2" />
                  <stop offset="100%" stopColor="currentColor" stopOpacity="0.1" />
                </linearGradient>
                <linearGradient id="gradient2" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="currentColor" stopOpacity="0.3" />
                  <stop offset="100%" stopColor="currentColor" stopOpacity="0.2" />
                </linearGradient>
              </defs>

              <path d="M150,25 L225,125 L150,165 L75,125 Z" fill="url(#gradient1)" className="text-primary" />
              <path d="M150,175 L225,135 L150,275 L75,135 Z" fill="url(#gradient2)" className="text-primary" />

              <rect x="135" y="140" width="30" height="40" rx="5" fill="currentColor" className="text-primary" />
              <path d="M130,140 V120 C130,100 170,100 170,120 V140" stroke="currentColor" strokeWidth="8" className="text-primary" fill="none" />

            </svg>
          </div>
        </div>
      </div>
    </section>
  )
}


