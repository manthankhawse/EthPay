"'use client'"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Bitcoin, Brain, Lock, LineChart, Shield, Zap, Users} from "lucide-react"

export function ServicesSection() {
  return (
    <section className="w-full py-12 md:py-12 lg:py-12 bg-gradient-to-b">
      <div className="container px-4 md:px-6 mx-auto">
        <div className="flex flex-col items-center justify-center space-y-4 text-center">
          <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl md:text-6xl">Our Services</h2>
          <p className="max-w-[900px] text-zinc-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed dark:text-zinc-400">
            Revolutionizing Ethereum payments with cutting-edge machine learning fraud detection for unparalleled security and efficiency.
          </p>
        </div>
        <div className="mx-auto grid max-w-5xl grid-cols-1 gap-6 md:grid-cols-2 lg:gap-12 mt-12">
          <Card className="transition-all hover:shadow-lg bg-neutral-900 border-none">
            <CardHeader className="flex flex-col items-center space-y-1">
              <div className="rounded-full bg-primary/10 p-3">
                <Bitcoin className="h-6 w-6 text-white" />
              </div>
              <CardTitle className="text-xl text-white">Ethereum Payments</CardTitle>
            </CardHeader>
            <CardContent className="text-center text-white">
              Seamlessly send and receive Ethereum payments with low transaction fees and fast confirmation times.
            </CardContent>
          </Card>
          <Card className="transition-all hover:shadow-lg bg-neutral-900 border-none">
            <CardHeader className="flex flex-col items-center space-y-1">
              <div className="rounded-full bg-primary/10 p-3">
                <Brain className="h-6 w-6 text-white" />
              </div>
              <CardTitle className="text-xl text-white">ML Fraud Detection</CardTitle>
            </CardHeader>
            <CardContent className="text-center text-white">
              Advanced machine learning algorithms detect and prevent phishing attempts and fraudulent transactions in real-time.
            </CardContent>
          </Card>
          <Card className="transition-all hover:shadow-lg bg-neutral-900 border-none">
            <CardHeader className="flex flex-col items-center space-y-1">
              <div className="rounded-full bg-primary/10 p-3">
                <Lock className="h-6 w-6 text-white" />
              </div>
              <CardTitle className="text-white text-xl">Secure Transactions</CardTitle>
            </CardHeader>
            <CardContent className="text-center text-white">
              Multi-factor authentication and encryption ensure your transactions and data remain secure at all times.
            </CardContent>
          </Card>
          <Card className="transition-all hover:shadow-lg border-none bg-neutral-900">
            <CardHeader className="flex flex-col items-center space-y-1">
              <div className="rounded-full bg-primary/10 p-3">
                <LineChart className="h-6 w-6 text-white" />
              </div>
              <CardTitle className="text-xl text-white">Real-time Monitoring</CardTitle>
            </CardHeader>
            <CardContent className="text-center text-white">
              Monitor your transactions and account activity in real-time with detailed analytics and reporting.
            </CardContent>
          </Card>
        </div>
        
        <div className="mt-24 space-y-12">
          <h3 className="text-2xl font-bold tracking-tighter sm:text-3xl text-center">Why Choose Us</h3>
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            <div className="flex flex-col items-center space-y-2 border-gray-800 p-4 rounded-lg">
              <Shield className="h-8 w-8 text-zinc-50" />
              <h4 className="text-xl font-semibold">Unmatched Security</h4>
              <p className="text-center text-zinc-500 dark:text-zinc-400">Our ML-powered fraud detection sets new standards in blockchain security.</p>
            </div>
            <div className="flex flex-col items-center space-y-2 border-gray-800 p-4 rounded-lg">
              <Zap className="h-8 w-8 text-zinc-50" />
              <h4 className="text-xl font-semibold">Lightning Fast</h4>
              <p className="text-center text-zinc-500 dark:text-zinc-400">Experience near-instantaneous transactions with our optimized network.</p>
            </div>
            <div className="flex flex-col items-center space-y-2 border-gray-800 p-4 rounded-lg">
              <Users className="h-8 w-8 text-zinc-50" />
              <h4 className="text-xl font-semibold">User-Centric Design</h4>
              <p className="text-center text-zinc-500 dark:text-zinc-400">Intuitive interface and robust support make blockchain accessible to all.</p>
            </div>
          </div>
        </div>
        
        <div className="mt-24 flex flex-col items-center space-y-4">
          <h3 className="text-2xl font-bold tracking-tighter sm:text-3xl text-center">Ready to Get Started?</h3>
          <p className="max-w-[600px] text-center text-zinc-500 dark:text-zinc-400">
            Join thousands of satisfied users and experience the future of secure Ethereum payments today.
          </p>
          <Button size="lg" className="mt-4 border-2 border-gray-50">
            Sign Up Now
          </Button>
        </div>
      </div>
    </section>
  )
}


