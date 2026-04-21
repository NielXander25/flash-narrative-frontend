'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Mail, Check } from 'lucide-react'
import Image from 'next/image'
import { useRouter } from 'next/navigation'

export default function LoginPage() {
  const router = useRouter()
  const [authMode, setAuthMode] = useState<'signin' | 'signup'>('signin')

  const handleGoogleSSO = () => {
    router.push('/dashboard/command-center')
  }

  return (
    <div className="flex min-h-screen bg-[#0A0A0F]">
      {/* Left Panel - Brand Authority with Graphics */}
      <div className="hidden lg:flex lg:w-1/2 flex-col justify-between p-12 relative overflow-hidden">
        {/* Subtle grid pattern background */}
        <div className="absolute inset-0 opacity-5">
          <div className="absolute inset-0" style={{
            backgroundImage: 'linear-gradient(90deg, #D4A017 1px, transparent 1px), linear-gradient(#D4A017 1px, transparent 1px)',
            backgroundSize: '40px 40px'
          }}></div>
        </div>

        <div className="relative z-10">
          <div className="flex items-center gap-3 mb-16">
            <div className="w-10 h-10 rounded-full overflow-hidden flex-shrink-0 flex items-center justify-center bg-gradient-to-br from-[#D4A017] to-[#B8860B]">
              <Image 
                src="/logo.png" 
                alt="Flash Narrative" 
                width={40} 
                height={40}
                className="w-10 h-10 object-contain"
                priority
              />
            </div>
            <span className="text-[#F8FAFC] font-bold text-lg">Flash Narrative</span>
          </div>

          <h1 className="text-4xl sm:text-5xl font-bold text-[#F8FAFC] mb-8 sm:mb-12 leading-tight">
            Enterprise PR Intelligence
          </h1>

          <div className="space-y-4 sm:space-y-6 mb-16">
            {[
              'Real-time media monitoring across 500+ sources',
              'AI-powered sentiment analysis & crisis detection',
              'Multi-brand white-label dashboard'
            ].map((prop, idx) => (
              <div key={idx} className="flex items-start gap-3 sm:gap-4">
                <Check className="w-5 sm:w-6 h-5 sm:h-6 text-[#D4A017] flex-shrink-0 mt-1" />
                <p className="text-[#94A3B8] text-base sm:text-lg">{prop}</p>
              </div>
            ))}
          </div>

          {/* Animated Dashboard Preview */}
          <div className="bg-[#12121A]/50 backdrop-blur rounded-xl p-8 border border-[#1E1E2E]/50 mb-12">
            <div className="space-y-6">
              {/* Header Stats - KPI Cards */}
              <div className="grid grid-cols-3 gap-4">
                <div className="bg-[#1E1E2E] rounded-lg p-4 border border-[#252535]">
                  <p className="text-[#94A3B8] text-xs font-semibold mb-2">MENTIONS</p>
                  <p className="text-[#D4A017] text-2xl font-bold">2,847</p>
                  <p className="text-[#2ECC8A] text-xs mt-1">↑ 12%</p>
                </div>
                <div className="bg-[#1E1E2E] rounded-lg p-4 border border-[#252535]">
                  <p className="text-[#94A3B8] text-xs font-semibold mb-2">SENTIMENT</p>
                  <p className="text-[#2ECC8A] text-2xl font-bold">72%</p>
                  <p className="text-[#2ECC8A] text-xs mt-1">Positive</p>
                </div>
                <div className="bg-[#1E1E2E] rounded-lg p-4 border border-[#252535]">
                  <p className="text-[#94A3B8] text-xs font-semibold mb-2">SOV</p>
                  <p className="text-[#5B8FD4] text-2xl font-bold">34.2%</p>
                  <p className="text-[#5B8FD4] text-xs mt-1">vs Competitors</p>
                </div>
              </div>

              {/* Animated Gradient Bars (SOV Simulation) */}
              <div className="space-y-3">
                <div className="flex items-center gap-3">
                  <span className="text-[#94A3B8] text-xs font-semibold w-16">FLASH</span>
                  <div className="flex-1 h-2 bg-[#1E1E2E] rounded-full overflow-hidden">
                    <div 
                      className="h-full bg-gradient-to-r from-[#D4A017] via-[#E6B420] to-[#D4A017] rounded-full"
                      style={{
                        width: '60%',
                        animation: 'pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite'
                      }}
                    ></div>
                  </div>
                  <span className="text-[#D4A017] text-xs font-bold">60%</span>
                </div>
                <div className="flex items-center gap-3">
                  <span className="text-[#94A3B8] text-xs font-semibold w-16">COMP A</span>
                  <div className="flex-1 h-2 bg-[#1E1E2E] rounded-full overflow-hidden">
                    <div 
                      className="h-full bg-gradient-to-r from-[#5B8FD4] via-[#7BA3E0] to-[#5B8FD4] rounded-full"
                      style={{
                        width: '25%',
                        animation: 'pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite 0.2s'
                      }}
                    ></div>
                  </div>
                  <span className="text-[#5B8FD4] text-xs font-bold">25%</span>
                </div>
                <div className="flex items-center gap-3">
                  <span className="text-[#94A3B8] text-xs font-semibold w-16">COMP B</span>
                  <div className="flex-1 h-2 bg-[#1E1E2E] rounded-full overflow-hidden">
                    <div 
                      className="h-full bg-gradient-to-r from-[#E8832A] via-[#F09A3F] to-[#E8832A] rounded-full"
                      style={{
                        width: '15%',
                        animation: 'pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite 0.4s'
                      }}
                    ></div>
                  </div>
                  <span className="text-[#E8832A] text-xs font-bold">15%</span>
                </div>
              </div>

              {/* Sentiment Donut Visualization */}
              <div className="mt-6 pt-6 border-t border-[#1E1E2E]">
                <p className="text-[#94A3B8] text-xs font-semibold mb-4">SENTIMENT BREAKDOWN</p>
                <div className="flex items-center justify-center gap-6">
                  <div className="relative w-24 h-24">
                    <svg viewBox="0 0 100 100" className="transform -rotate-90 w-full h-full">
                      <circle cx="50" cy="50" r="35" fill="none" stroke="#1E1E2E" strokeWidth="8" />
                      <circle 
                        cx="50" cy="50" r="35" fill="none" stroke="#2ECC8A" strokeWidth="8" 
                        strokeDasharray="56.5 113" 
                        style={{ transition: 'stroke-dasharray 0.6s ease' }}
                      />
                      <circle 
                        cx="50" cy="50" r="35" fill="none" stroke="#5B8FD4" strokeWidth="8" 
                        strokeDasharray="34 113" 
                        strokeDashoffset="-56.5"
                      />
                      <circle 
                        cx="50" cy="50" r="35" fill="none" stroke="#E8832A" strokeWidth="8" 
                        strokeDasharray="20.3 113" 
                        strokeDashoffset="-90.5"
                      />
                    </svg>
                    <div className="absolute inset-0 flex items-center justify-center">
                      <span className="text-[#D4A017] font-bold text-sm">72%</span>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <div className="flex items-center gap-2">
                      <div className="w-2 h-2 rounded-full bg-[#2ECC8A]"></div>
                      <span className="text-[#94A3B8] text-xs">Positive 45%</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-2 h-2 rounded-full bg-[#5B8FD4]"></div>
                      <span className="text-[#94A3B8] text-xs">Neutral 30%</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-2 h-2 rounded-full bg-[#E8832A]"></div>
                      <span className="text-[#94A3B8] text-xs">Negative 18%</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-2 h-2 rounded-full bg-[#E84242]"></div>
                      <span className="text-[#94A3B8] text-xs">Crisis 7%</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Footer text */}
        <div className="relative z-10 text-[#94A3B8] text-sm">
          © 2026 Flash Narrative. Enterprise-grade intelligence.
        </div>
      </div>

      {/* Right Panel - Login Form with Tabs */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-4 sm:p-6 bg-[#0A0A0F]">
        <div className="w-full max-w-md">
          <div className="lg:hidden mb-6 sm:mb-8">
            <div className="flex items-center gap-3 mb-8">
              <div className="w-10 h-10 rounded-full overflow-hidden flex-shrink-0 flex items-center justify-center bg-gradient-to-br from-[#D4A017] to-[#B8860B]">
                <Image 
                  src="/logo.png" 
                  alt="Flash Narrative" 
                  width={40} 
                  height={40}
                  className="w-10 h-10 object-contain"
                  priority
                />
              </div>
              <span className="text-[#F8FAFC] font-bold text-lg">Flash Narrative</span>
            </div>
          </div>

          <div className="bg-[#12121A] rounded-lg border border-[#1E1E2E] overflow-hidden">
            {/* Tab Navigation */}
            <div className="flex border-b border-[#1E1E2E]">
              <button
                onClick={() => setAuthMode('signin')}
                className={`flex-1 py-4 px-6 font-semibold text-sm transition-all relative ${
                  authMode === 'signin' 
                    ? 'text-[#D4A017]' 
                    : 'text-[#94A3B8] hover:text-[#F8FAFC]'
                }`}
              >
                Sign In
                {authMode === 'signin' && (
                  <div className="absolute bottom-0 left-0 right-0 h-1 bg-[#D4A017]"></div>
                )}
              </button>
              <button
                onClick={() => setAuthMode('signup')}
                className={`flex-1 py-4 px-6 font-semibold text-sm transition-all relative ${
                  authMode === 'signup' 
                    ? 'text-[#D4A017]' 
                    : 'text-[#94A3B8] hover:text-[#F8FAFC]'
                }`}
              >
                Sign Up
                {authMode === 'signup' && (
                  <div className="absolute bottom-0 left-0 right-0 h-1 bg-[#D4A017]"></div>
                )}
              </button>
            </div>

            {/* Form Content */}
            <div className="p-6 sm:p-8">
              {authMode === 'signin' ? (
                <div className="space-y-6">
                  <div>
                    <h2 className="text-xl sm:text-2xl font-bold text-[#F8FAFC] mb-2">Welcome Back</h2>
                    <p className="text-[#94A3B8] text-sm">Access the Secure Intelligence Gateway</p>
                  </div>

                  <Button
                    onClick={handleGoogleSSO}
                    className="w-full bg-[#D4A017] hover:bg-[#E6B420] text-[#0A0A0F] font-semibold h-11 rounded-lg flex items-center justify-center gap-3 transition-colors text-sm"
                  >
                    <Mail className="w-5 h-5" />
                    Continue with Google
                  </Button>

                  {/* Divider */}
                  <div className="relative my-6">
                    <div className="absolute inset-0 flex items-center">
                      <div className="w-full border-t border-[#1E1E2E]"></div>
                    </div>
                    <div className="relative flex justify-center text-sm">
                      <span className="px-2 bg-[#12121A] text-[#94A3B8]">ENTERPRISE SSO PROTOCOLS</span>
                    </div>
                  </div>

                  <div className="bg-[#1E1E2E] rounded-lg p-4 border border-[#252535]">
                    <div className="flex gap-3">
                      <div className="text-[#D4A017] flex-shrink-0">⚠️</div>
                      <div>
                        <p className="text-[#F8FAFC] text-xs font-semibold mb-1">SECURITY NOTE</p>
                        <p className="text-[#94A3B8] text-xs">Flash Narrative is a restricted, invitation-only service verified by your organization's security administrator.</p>
                      </div>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="space-y-6">
                  <div>
                    <h2 className="text-xl sm:text-2xl font-bold text-[#F8FAFC] mb-2">Create Account</h2>
                    <p className="text-[#94A3B8] text-sm">Join the intelligence network</p>
                  </div>

                  <div>
                    <label className="text-[#F8FAFC] text-xs font-semibold mb-2 block">FULL NAME</label>
                    <input 
                      type="text" 
                      placeholder="Your name"
                      className="w-full bg-[#1E1E2E] border border-[#252535] rounded-lg px-4 py-3 text-[#F8FAFC] placeholder-[#5B8FD4] focus:outline-none focus:border-[#D4A017] transition-colors"
                    />
                  </div>

                  <div>
                    <label className="text-[#F8FAFC] text-xs font-semibold mb-2 block">CORPORATE EMAIL</label>
                    <input 
                      type="email" 
                      placeholder="your@company.com"
                      className="w-full bg-[#1E1E2E] border border-[#252535] rounded-lg px-4 py-3 text-[#F8FAFC] placeholder-[#5B8FD4] focus:outline-none focus:border-[#D4A017] transition-colors"
                    />
                  </div>

                  <Button
                    onClick={handleGoogleSSO}
                    className="w-full bg-[#D4A017] hover:bg-[#E6B420] text-[#0A0A0F] font-semibold h-11 rounded-lg flex items-center justify-center gap-3 transition-colors text-sm"
                  >
                    <Mail className="w-5 h-5" />
                    Sign Up with Google
                  </Button>

                  <p className="text-center text-[#94A3B8] text-xs">
                    An invitation code is required. Contact your organization's administrator.
                  </p>
                </div>
              )}

              <div className="mt-6 sm:mt-8 text-center text-[#94A3B8] text-xs">
                <p>By signing in, you agree to our{' '}
                  <a href="#" className="text-[#D4A017] hover:text-[#E6B420] underline">
                    Terms of Service
                  </a>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
