"'use client'"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Github, Linkedin, Twitter, Mail, Phone, MapPin } from "lucide-react"

export function Footer() {
  return (
    <footer className="w-full mt-auto bg-gray-800 text-white py-12 px-4 md:px-6">
      <div className="container mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <span className="text-xl font-bold text-white">EthPay</span>
            </div>
            <p className="text-sm">
              Revolutionizing Ethereum payments with advanced ML-based fraud detection.
            </p>
            <div className="flex space-x-4">
              <Link href="#" className="text-gray-400 hover:text-zinc-900 transition-colors dark:hover:text-zinc-50">
                <Twitter className="h-5 w-5" />
                <span className="sr-only">Twitter</span>
              </Link>
              <Link href="#" className="text-gray-400 hover:text-zinc-900 transition-colors dark:hover:text-zinc-50">
                <Linkedin className="h-5 w-5" />
                <span className="sr-only">LinkedIn</span>
              </Link>
              <Link href="#" className="text-gray-400 hover:text-zinc-900 transition-colors dark:hover:text-zinc-50">
                <Github className="h-5 w-5" />
                <span className="sr-only">GitHub</span>
              </Link>
            </div>
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-4 text-white">Quick Links</h3>
            <ul className="space-y-2">
              <li><Link href="#" className="text-sm hover:text-zinc-900 transition-colors dark:hover:text-zinc-50">Home</Link></li>
              <li><Link href="#" className="text-sm hover:text-zinc-900 transition-colors dark:hover:text-zinc-50">About Us</Link></li>
              <li><Link href="#" className="text-sm hover:text-zinc-900 transition-colors dark:hover:text-zinc-50">Services</Link></li>
              <li><Link href="#" className="text-sm hover:text-zinc-900 transition-colors dark:hover:text-zinc-50">FAQ</Link></li>
            </ul>
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-4 text-white">Contact Us</h3>
            <ul className="space-y-2">
              <li className="flex items-center space-x-2">
                <Mail className="h-4 w-4 text-zinc-900 dark:text-zinc-50" />
                <span className="text-sm">info@ethmlpay.com</span>
              </li>
              <li className="flex items-center space-x-2">
                <Phone className="h-4 w-4 text-zinc-900 dark:text-zinc-50" />
                <span className="text-sm">+1 (555) 123-4567</span>
              </li>
              <li className="flex items-center space-x-2">
                <MapPin className="h-4 w-4 text-zinc-900 dark:text-zinc-50" />
                <span className="text-sm">123 Blockchain St, Crypto City</span>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-4 text-white">Get in Touch</h3>
            <form className="space-y-2">
              <Input 
                type="text" 
                placeholder="Your Name" 
                className="bg-gray-900 border-gray-700 text-gray-300 placeholder-gray-500"
              />
              <Input 
                type="email" 
                placeholder="Your Email" 
                className="bg-gray-900 border-gray-700 text-gray-300 placeholder-gray-500"
              />
              <Textarea 
                placeholder="Your Message" 
                className="bg-gray-900 border-gray-700 text-gray-300 placeholder-gray-500"
              />
              <Button type="submit" className="w-full">Send Message</Button>
            </form>
          </div>
        </div>
        <div className="mt-8 pt-8 border-t border-gray-800 flex flex-col md:flex-row justify-between items-center">
          <p className="text-sm text-gray-400">&copy; 2023 EthML Pay. All rights reserved.</p>
          <div className="mt-4 md:mt-0">
            <Link href="#" className="text-sm text-gray-400 hover:text-zinc-900 transition-colors mr-4 dark:hover:text-zinc-50">Privacy Policy</Link>
            <Link href="#" className="text-sm text-gray-400 hover:text-zinc-900 transition-colors dark:hover:text-zinc-50">Terms of Service</Link>
          </div>
        </div>
      </div>
    </footer>
  )
}