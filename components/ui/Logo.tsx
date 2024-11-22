import React from 'react'

const Logo = () => {
  return (
              <svg
              className="w-full h-32 max-w-[400px] p-4 text-zinc-500"
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

              <path d="M150,25 L225,125 L150,165 L75,125 Z" fill="grey" className="text-primary" />
              <path d="M150,175 L225,135 L150,275 L75,135 Z" fill="grey" className="text-primary" />

              <rect x="135" y="140" width="30" height="40" rx="5" fill="black" className="text-primary" />
              <path d="M130,140 V120 C130,100 170,100 170,120 V140" stroke="black" strokeWidth="8" className="text-black" fill="none" />

            </svg>
  )
}

export default Logo