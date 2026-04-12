'use client'

import { Button } from '@/components/ui/button'
import { Mail, Check } from 'lucide-react'
import Image from 'next/image'
import { useRouter } from 'next/navigation'

export default function LoginPage() {
  const router = useRouter()

  const handleGoogleSSO = () => {
    // In production, redirect to backend: window.location.href = '/api/auth/google/login'
    // For now, redirect to command center to preview
    router.push('/dashboard/command-center')
  }

  return (
    <div className="flex min-h-screen bg-[#0A0A0F]">
      {/* Left Panel - Brand Authority */}
      <div className="hidden lg:flex lg:w-1/2 flex-col justify-between p-12 relative overflow-hidden">
        {/* Subtle grid pattern background */}
        <div className="absolute inset-0 opacity-5">
          <div className="absolute inset-0" style={{
            backgroundImage: 'linear-gradient(90deg, #D4A017 1px, transparent 1px), linear-gradient(#D4A017 1px, transparent 1px)',
            backgroundSize: '40px 40px'
          }}></div>
        </div>

        <div className="relative z-10">
          {/* Logo */}
          <div className="flex items-center gap-3 mb-16">
            <Image 
              src="/logo.png" 
              alt="Flash Narrative" 
              width={40} 
              height={40}
              className="rounded-lg"
              style={{ width: 'auto', height: 'auto' }}
            />
            <span className="text-[#F8FAFC] font-bold text-lg">Flash Narrative</span>
          </div>

          {/* Headline */}
          <h1 className="text-5xl font-bold text-[#F8FAFC] mb-12 leading-tight">
            Enterprise PR Intelligence
          </h1>

          {/* Value Props */}
          <div className="space-y-6">
            {[
              'Real-time media monitoring across 500+ sources',
              'AI-powered sentiment analysis & crisis detection',
              'Multi-brand white-label dashboard'
            ].map((prop, idx) => (
              <div key={idx} className="flex items-start gap-4">
                <Check className="w-6 h-6 text-[#D4A017] flex-shrink-0 mt-1" />
                <p className="text-[#94A3B8] text-lg">{prop}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Footer text */}
        <div className="relative z-10 text-[#94A3B8] text-sm">
          © 2026 Flash Narrative. Enterprise-grade intelligence.
        </div>
      </div>

      {/* Right Panel - Login Form */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-6 bg-[#0A0A0F]">
        <div className="w-full max-w-md">
          {/* Mobile Logo */}
          <div className="lg:hidden mb-8">
            <div className="flex items-center gap-3 mb-8">
              <Image 
                src="/logo.png" 
                alt="Flash Narrative" 
                width={40} 
                height={40}
                className="rounded-lg"
                style={{ width: 'auto', height: 'auto' }}
              />
              <span className="text-[#F8FAFC] font-bold text-lg">Flash Narrative</span>
            </div>
          </div>

          {/* Card Content */}
          <div className="bg-[#12121A] rounded-lg p-8 border border-[#1E1E2E]">
            <h2 className="text-2xl font-bold text-[#F8FAFC] mb-2">Welcome Back</h2>
            <p className="text-[#94A3B8] mb-8 text-sm">Sign in to your enterprise dashboard</p>

            {/* Google SSO Button */}
            <Button
              onClick={handleGoogleSSO}
              className="w-full bg-[#D4A017] hover:bg-[#E6B420] text-[#0A0A0F] font-semibold h-11 rounded-lg flex items-center justify-center gap-3 transition-colors"
            >
              <Mail className="w-5 h-5" />
              Continue with Google
            </Button>

            {/* Divider */}
            <div className="relative my-8">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-[#1E1E2E]"></div>
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-2 bg-[#12121A] text-[#94A3B8]">OR</span>
              </div>
            </div>

            {/* Additional option */}
            <p className="text-center text-[#94A3B8] text-sm">
              SSO provisioned by your administrator
            </p>
          </div>

          {/* Footer */}
          <div className="mt-8 text-center text-[#94A3B8] text-xs">
            <p>By signing in, you agree to our{' '}
              <a href="#" className="text-[#D4A017] hover:text-[#E6B420] underline">
                Terms of Service
              </a>
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
