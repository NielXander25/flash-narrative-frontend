'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Mail, Lock, User, ArrowRight, Check } from 'lucide-react'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import Link from 'next/link'

export default function SignupPage() {
  const router = useRouter()
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    confirmPassword: '',
    agencyName: '',
    agreeToTerms: false,
  })
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [success, setSuccess] = useState(false)

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }))
  }

  const validateForm = () => {
    if (!formData.firstName.trim()) {
      setError('First name is required')
      return false
    }
    if (!formData.lastName.trim()) {
      setError('Last name is required')
      return false
    }
    if (!formData.email.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)) {
      setError('Please enter a valid email address')
      return false
    }
    if (formData.password.length < 8) {
      setError('Password must be at least 8 characters')
      return false
    }
    if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match')
      return false
    }
    if (!formData.agreeToTerms) {
      setError('You must agree to the Terms of Service')
      return false
    }
    return true
  }

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    
    if (!validateForm()) return

    setLoading(true)
    // TODO: Replace with actual backend call
    // const response = await fetch('/api/auth/register', {
    //   method: 'POST',
    //   headers: { 'Content-Type': 'application/json' },
    //   body: JSON.stringify(formData)
    // })
    
    // Simulate API call
    setTimeout(() => {
      setSuccess(true)
      setLoading(false)
      // Redirect to login after 2 seconds
      setTimeout(() => {
        router.push('/login')
      }, 2000)
    }, 1500)
  }

  const handleGoogleSignup = () => {
    // TODO: Implement Google OAuth signup
    setLoading(true)
    setTimeout(() => {
      setLoading(false)
    }, 1000)
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

          <div className="space-y-4 sm:space-y-6">
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

          <div className="mt-12 pt-8 border-t border-[#1E1E2E]">
            <p className="text-[#94A3B8] text-sm mb-4">✓ Enterprise-grade security</p>
            <p className="text-[#94A3B8] text-sm">✓ 24/7 dedicated support</p>
            <p className="text-[#94A3B8] text-sm mt-2">✓ Custom integration available</p>
          </div>
        </div>

        {/* Footer text */}
        <div className="relative z-10 text-[#94A3B8] text-sm">
          © 2026 Flash Narrative. Enterprise-grade intelligence.
        </div>
      </div>

      {/* Right Panel - Signup Form */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-4 sm:p-6 bg-[#0A0A0F] overflow-y-auto">
        <div className="w-full max-w-md">
          <div className="lg:hidden mb-8">
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

          <div className="bg-[#12121A] rounded-lg p-6 sm:p-8 border border-[#1E1E2E]">
            <h2 className="text-xl sm:text-2xl font-bold text-[#F8FAFC] mb-2">Create Account</h2>
            <p className="text-[#94A3B8] mb-6 sm:mb-8 text-sm">Join Flash Narrative today</p>

            {/* Success Message */}
            {success && (
              <div className="mb-6 p-4 bg-[#2ECC8A]/10 border border-[#2ECC8A] rounded-lg">
                <p className="text-[#2ECC8A] text-sm font-medium">✓ Account created successfully! Redirecting...</p>
              </div>
            )}

            {/* Error Message */}
            {error && (
              <div className="mb-6 p-4 bg-[#E84242]/10 border border-[#E84242] rounded-lg">
                <p className="text-[#E84242] text-sm font-medium">{error}</p>
              </div>
            )}

            <form onSubmit={handleSignup} className="space-y-4 sm:space-y-5">
              {/* First Name & Last Name */}
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-[#F8FAFC] font-semibold text-xs mb-2 block">FIRST NAME</label>
                  <div className="relative">
                    <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#94A3B8]" />
                    <input
                      type="text"
                      name="firstName"
                      value={formData.firstName}
                      onChange={handleInputChange}
                      placeholder="John"
                      className="w-full bg-[#1E1E2E] border border-[#252535] rounded-lg pl-10 pr-4 py-3 text-[#F8FAFC] placeholder-[#5B8FD4] text-sm focus:outline-none focus:border-[#D4A017] transition-colors"
                    />
                  </div>
                </div>
                <div>
                  <label className="text-[#F8FAFC] font-semibold text-xs mb-2 block">LAST NAME</label>
                  <div className="relative">
                    <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#94A3B8]" />
                    <input
                      type="text"
                      name="lastName"
                      value={formData.lastName}
                      onChange={handleInputChange}
                      placeholder="Doe"
                      className="w-full bg-[#1E1E2E] border border-[#252535] rounded-lg pl-10 pr-4 py-3 text-[#F8FAFC] placeholder-[#5B8FD4] text-sm focus:outline-none focus:border-[#D4A017] transition-colors"
                    />
                  </div>
                </div>
              </div>

              {/* Email */}
              <div>
                <label className="text-[#F8FAFC] font-semibold text-xs mb-2 block">EMAIL ADDRESS</label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#94A3B8]" />
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    placeholder="you@example.com"
                    className="w-full bg-[#1E1E2E] border border-[#252535] rounded-lg pl-10 pr-4 py-3 text-[#F8FAFC] placeholder-[#5B8FD4] text-sm focus:outline-none focus:border-[#D4A017] transition-colors"
                  />
                </div>
              </div>

              {/* Agency Name (Optional) */}
              <div>
                <label className="text-[#F8FAFC] font-semibold text-xs mb-2 block">AGENCY NAME (OPTIONAL)</label>
                <input
                  type="text"
                  name="agencyName"
                  value={formData.agencyName}
                  onChange={handleInputChange}
                  placeholder="My PR Agency"
                  className="w-full bg-[#1E1E2E] border border-[#252535] rounded-lg px-4 py-3 text-[#F8FAFC] placeholder-[#5B8FD4] text-sm focus:outline-none focus:border-[#D4A017] transition-colors"
                />
              </div>

              {/* Password */}
              <div>
                <label className="text-[#F8FAFC] font-semibold text-xs mb-2 block">PASSWORD</label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#94A3B8]" />
                  <input
                    type="password"
                    name="password"
                    value={formData.password}
                    onChange={handleInputChange}
                    placeholder="••••••••"
                    className="w-full bg-[#1E1E2E] border border-[#252535] rounded-lg pl-10 pr-4 py-3 text-[#F8FAFC] placeholder-[#5B8FD4] text-sm focus:outline-none focus:border-[#D4A017] transition-colors"
                  />
                </div>
                <p className="text-[#5B8FD4] text-xs mt-1">Must be at least 8 characters</p>
              </div>

              {/* Confirm Password */}
              <div>
                <label className="text-[#F8FAFC] font-semibold text-xs mb-2 block">CONFIRM PASSWORD</label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#94A3B8]" />
                  <input
                    type="password"
                    name="confirmPassword"
                    value={formData.confirmPassword}
                    onChange={handleInputChange}
                    placeholder="••••••••"
                    className="w-full bg-[#1E1E2E] border border-[#252535] rounded-lg pl-10 pr-4 py-3 text-[#F8FAFC] placeholder-[#5B8FD4] text-sm focus:outline-none focus:border-[#D4A017] transition-colors"
                  />
                </div>
              </div>

              {/* Terms Checkbox */}
              <label className="flex items-start gap-3 cursor-pointer pt-2">
                <input
                  type="checkbox"
                  name="agreeToTerms"
                  checked={formData.agreeToTerms}
                  onChange={handleInputChange}
                  className="w-4 h-4 rounded cursor-pointer mt-1 bg-[#1E1E2E] border border-[#252535]"
                />
                <span className="text-[#94A3B8] text-xs">
                  I agree to the{' '}
                  <a href="#" className="text-[#D4A017] hover:text-[#E6B420] underline">
                    Terms of Service
                  </a>
                  {' '}and{' '}
                  <a href="#" className="text-[#D4A017] hover:text-[#E6B420] underline">
                    Privacy Policy
                  </a>
                </span>
              </label>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={loading}
                className="w-full bg-[#D4A017] hover:bg-[#E6B420] disabled:opacity-50 text-[#0A0A0F] font-semibold h-11 rounded-lg flex items-center justify-center gap-2 transition-colors text-sm"
              >
                {loading ? 'Creating Account...' : 'Create Account'}
                <ArrowRight className="w-4 h-4" />
              </button>
            </form>

            {/* Divider */}
            <div className="relative my-6">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-[#1E1E2E]"></div>
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-2 bg-[#12121A] text-[#94A3B8]">OR</span>
              </div>
            </div>

            {/* Google Signup Button */}
            <button
              onClick={handleGoogleSignup}
              disabled={loading}
              className="w-full bg-[#1E1E2E] hover:bg-[#252535] disabled:opacity-50 border border-[#252535] text-[#F8FAFC] font-semibold h-11 rounded-lg flex items-center justify-center gap-3 transition-colors text-sm"
            >
              <svg className="w-5 h-5" viewBox="0 0 24 24">
                <path fill="currentColor" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                <path fill="currentColor" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                <path fill="currentColor" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                <path fill="currentColor" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
              </svg>
              Sign up with Google
            </button>

            {/* Login Link */}
            <p className="text-center text-[#94A3B8] text-xs mt-6">
              Already have an account?{' '}
              <Link href="/login" className="text-[#D4A017] hover:text-[#E6B420] underline font-semibold">
                Log in
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
