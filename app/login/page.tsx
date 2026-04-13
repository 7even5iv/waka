"use client"

import React, { useState } from 'react'
import Link from 'next/link'
import { motion, AnimatePresence } from 'framer-motion'
import { useRouter } from 'next/navigation'
import Image from 'next/image'
import { 
  Mail, Lock, Eye, EyeOff, ArrowRight, CheckCircle, 
  AlertCircle, User, Phone, Shield, Award, Zap, Truck
} from 'lucide-react'

// ========== ICÔNES PERSONNALISÉES ==========
const GoogleIcon = () => (
  <svg className="w-5 h-5" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
    <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
    <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
    <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
    <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
  </svg>
)

const FacebookIcon = () => (
  <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
    <path d="M24 12.07C24 5.41 18.63 0 12 0S0 5.41 0 12.07C0 18.1 4.39 23.1 10.13 24v-8.44H7.08v-3.49h3.05V9.41c0-3.02 1.79-4.7 4.54-4.7 1.31 0 2.68.24 2.68.24v2.96h-1.51c-1.49 0-1.96.93-1.96 1.88v2.26h3.33l-.53 3.49h-2.8V24c5.74-.9 10.13-5.9 10.13-11.93z" />
  </svg>
)

const AppleIcon = () => (
  <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
    <path d="M14.94 5.19A4.38 4.38 0 0 0 16 2.5a4.44 4.44 0 0 0-2.77.96 4.2 4.2 0 0 0-1.18 2.69 3.73 3.73 0 0 0 2.89-.96zM18.51 12.79a5.78 5.78 0 0 1 2.87-5 6 6 0 0 0-4.87-2.63c-2.07-.21-4.05 1.22-5.09 1.22-1 0-2.64-1.19-4.33-1.16a6.31 6.31 0 0 0-5.33 3.17c-2.27 3.94-.58 9.77 1.62 13 1.06 1.55 2.31 3.29 3.96 3.22 1.59-.07 2.19-1 4.11-1 1.91 0 2.46 1 4.13.96 1.71-.02 2.8-1.56 3.85-3.12a13 13 0 0 0 1.67-3.48 5.77 5.77 0 0 1-3.48-5.31z"/>
  </svg>
)

// ========== COMPOSANT LOGO ==========
const Logo = ({ className = "h-8 w-auto" }) => {
  const logoSrc = "/images/logo.png"
  
  return (
    <Link href="/" className="flex items-center gap-2 group">
      <div className="relative">
        <Image
          src={logoSrc}
          alt="WAKA Logo"
          width={180}
          height={60}
          className={`${className} object-contain transition-all duration-300 group-hover:scale-105`}
          priority
        />
      </div>
    </Link>
  )
}

// ========== COMPOSANT BOUTON SOCIAL ==========
const SocialButton = ({ icon: Icon, text, color, bgColor, onClick }: any) => {
  return (
    <motion.button
      whileHover={{ scale: 1.02, y: -2 }}
      whileTap={{ scale: 0.98 }}
      onClick={onClick}
      className={`w-full py-3 px-4 ${bgColor} ${color} font-semibold rounded-xl flex items-center justify-center gap-3 shadow-md hover:shadow-lg transition-all border border-gray-100`}
    >
      <Icon />
      <span className="text-sm">{text}</span>
    </motion.button>
  )
}

export default function LoginPage() {
  const router = useRouter()
  const [showPassword, setShowPassword] = useState(false)
  const [loginMethod, setLoginMethod] = useState<'email' | 'phone'>('email')
  const [formData, setFormData] = useState({
    email: '',
    phone: '',
    password: ''
  })
  const [rememberMe, setRememberMe] = useState(false)
  const [formStatus, setFormStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle')
  const [errorMessage, setErrorMessage] = useState('')

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (loginMethod === 'email' && !formData.email) {
      setErrorMessage('Veuillez entrer votre email')
      setFormStatus('error')
      setTimeout(() => setFormStatus('idle'), 3000)
      return
    }
    
    if (loginMethod === 'phone' && !formData.phone) {
      setErrorMessage('Veuillez entrer votre numéro de téléphone')
      setFormStatus('error')
      setTimeout(() => setFormStatus('idle'), 3000)
      return
    }
    
    if (!formData.password) {
      setErrorMessage('Veuillez entrer votre mot de passe')
      setFormStatus('error')
      setTimeout(() => setFormStatus('idle'), 3000)
      return
    }
    
    setFormStatus('loading')
    
    // Simulation de connexion
    setTimeout(() => {
      const userData = {
        id: Date.now(),
        name: loginMethod === 'email' ? formData.email.split('@')[0] : 'Utilisateur',
        email: formData.email || 'user@example.com',
        phone: formData.phone || '699123456',
        createdAt: new Date().toISOString(),
        level: 'Bronze',
        points: 150
      }
      localStorage.setItem('waka_user', JSON.stringify(userData))
      setFormStatus('success')
      
      setTimeout(() => {
        router.push('/profile')
      }, 1500)
    }, 1500)
  }

  const handleSocialLogin = (provider: string) => {
    setFormStatus('loading')
    setTimeout(() => {
      const userData = {
        id: Date.now(),
        name: `Utilisateur ${provider}`,
        email: `${provider.toLowerCase()}@user.com`,
        provider: provider,
        createdAt: new Date().toISOString(),
        level: 'Bronze',
        points: 150
      }
      localStorage.setItem('waka_user', JSON.stringify(userData))
      setFormStatus('success')
      
      setTimeout(() => {
        router.push('/profile')
      }, 1500)
    }, 1000)
  }

  const advantages = [
    { icon: Zap, text: 'Livraison express' },
    { icon: Shield, text: 'Paiement sécurisé' },
    { icon: Award, text: 'Programme fidélité' }
  ]

  return (
    <div className="min-h-screen bg-white flex flex-col items-center justify-center p-6 relative overflow-hidden">
      
      {/* Pattern de fond */}
      <div className="absolute inset-0 bg-[linear-gradient(45deg,rgba(34,197,94,0.02)_1px,transparent_1px)] bg-[size:40px_40px] pointer-events-none" />
      
      {/* Orbes flottantes */}
      <div className="absolute top-20 -left-40 w-96 h-96 bg-green-200 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob" />
      <div className="absolute bottom-20 -right-40 w-96 h-96 bg-yellow-200 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-2000" />

      {/* Section Logo */}
      <motion.div 
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-8 text-center relative z-10"
      >
        <div className="flex justify-center mb-4">
          <Logo className="h-12 w-auto" />
        </div>
        <h1 className="text-3xl font-black text-gray-900">Bienvenue</h1>
        <p className="text-gray-500 text-sm mt-1">Connectez-vous à votre compte</p>
      </motion.div>

      {/* Carte de Connexion */}
      <motion.div 
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.1 }}
        className="w-full max-w-md bg-white rounded-2xl p-8 shadow-xl border border-green-100 relative z-10"
      >
        {/* Toggle de méthode de connexion */}
        <div className="flex gap-2 p-1 bg-gray-100 rounded-xl mb-6">
          <button
            onClick={() => setLoginMethod('email')}
            className={`flex-1 py-2 rounded-lg text-sm font-medium transition-all ${
              loginMethod === 'email' 
                ? 'bg-white text-green-600 shadow-sm' 
                : 'text-gray-500 hover:text-gray-700'
            }`}
          >
            Email
          </button>
          <button
            onClick={() => setLoginMethod('phone')}
            className={`flex-1 py-2 rounded-lg text-sm font-medium transition-all ${
              loginMethod === 'phone' 
                ? 'bg-white text-green-600 shadow-sm' 
                : 'text-gray-500 hover:text-gray-700'
            }`}
          >
            Téléphone
          </button>
        </div>

        <form onSubmit={handleLogin} className="space-y-5">
          {/* Email ou Téléphone */}
          <div>
            <label className="text-xs font-bold text-gray-700 uppercase tracking-wider mb-1 block">
              {loginMethod === 'email' ? 'Adresse email' : 'Numéro de téléphone'}
            </label>
            <div className="relative">
              <div className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400">
                {loginMethod === 'email' ? <Mail size={18} /> : <Phone size={18} />}
              </div>
              <input 
                type={loginMethod === 'email' ? "email" : "tel"}
                name={loginMethod === 'email' ? "email" : "phone"}
                value={loginMethod === 'email' ? formData.email : formData.phone}
                onChange={handleChange}
                placeholder={loginMethod === 'email' ? "votre@email.com" : "6xx xxx xxx"} 
                className="w-full pl-12 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-gray-900 outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent placeholder:text-gray-400"
                required 
              />
            </div>
          </div>

          {/* Mot de passe */}
          <div>
            <label className="text-xs font-bold text-gray-700 uppercase tracking-wider mb-1 block">
              Mot de passe
            </label>
            <div className="relative">
              <div className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400">
                <Lock size={18} />
              </div>
              <input 
                type={showPassword ? "text" : "password"}
                name="password"
                value={formData.password}
                onChange={handleChange}
                placeholder="Votre mot de passe" 
                className="w-full pl-12 pr-12 py-3 bg-gray-50 border border-gray-200 rounded-xl text-gray-900 outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent placeholder:text-gray-400"
                required 
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
              >
                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>
          </div>

          {/* Options */}
          <div className="flex items-center justify-between">
            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="checkbox"
                checked={rememberMe}
                onChange={(e) => setRememberMe(e.target.checked)}
                className="w-4 h-4 rounded border-gray-300 text-green-500 focus:ring-green-500"
              />
              <span className="text-xs text-gray-500">Se souvenir de moi</span>
            </label>
            <Link href="/forgot-password" className="text-xs text-green-500 hover:text-green-600 font-medium">
              Mot de passe oublié ?
            </Link>
          </div>

          {/* Message d'erreur */}
          <AnimatePresence>
            {formStatus === 'error' && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                className="bg-red-50 border border-red-200 rounded-xl p-3 flex items-center gap-2"
              >
                <AlertCircle size={16} className="text-red-500 flex-shrink-0" />
                <p className="text-xs text-red-600">{errorMessage}</p>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Message de succès */}
          <AnimatePresence>
            {formStatus === 'success' && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                className="bg-green-50 border border-green-200 rounded-xl p-3 flex items-center gap-2"
              >
                <CheckCircle size={16} className="text-green-500 flex-shrink-0" />
                <p className="text-xs text-green-600">Connexion réussie ! Redirection...</p>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Bouton de connexion */}
          <button 
            type="submit" 
            disabled={formStatus === 'loading'}
            className="w-full py-3 bg-gradient-to-r from-green-500 to-emerald-600 text-white font-bold rounded-xl shadow-md hover:shadow-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
          >
            {formStatus === 'loading' ? (
              <>
                <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                Connexion en cours...
              </>
            ) : (
              <>
                Se connecter
                <ArrowRight size={16} />
              </>
            )}
          </button>
        </form>

        {/* Séparateur */}
        <div className="relative my-6">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-gray-200"></div>
          </div>
          <div className="relative flex justify-center text-xs">
            <span className="px-3 bg-white text-gray-400">Ou continuer avec</span>
          </div>
        </div>

        {/* Boutons sociaux */}
        <div className="space-y-3">
          <SocialButton
            icon={GoogleIcon}
            text="Google"
            color="text-gray-700"
            bgColor="bg-white"
            onClick={() => handleSocialLogin('Google')}
          />
          <SocialButton
            icon={AppleIcon}
            text="Apple"
            color="text-white"
            bgColor="bg-black"
            onClick={() => handleSocialLogin('Apple')}
          />
          <SocialButton
            icon={FacebookIcon}
            text="Facebook"
            color="text-white"
            bgColor="bg-[#1877F2]"
            onClick={() => handleSocialLogin('Facebook')}
          />
        </div>

        {/* Avantages */}
        <div className="mt-6 pt-4 border-t border-gray-100">
          <div className="flex justify-center gap-4 flex-wrap">
            {advantages.map((adv, index) => (
              <div key={index} className="flex items-center gap-1">
                <adv.icon size={12} className="text-green-500" />
                <span className="text-[10px] text-gray-500">{adv.text}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Lien inscription */}
        <div className="mt-6 text-center">
          <p className="text-sm text-gray-500">
            Pas encore de compte ?{' '}
            <Link href="/register" className="text-green-500 font-semibold hover:text-green-600 transition-colors">
              Créer un compte
            </Link>
          </p>
        </div>

        {/* Version */}
        <div className="mt-4 text-center">
          <p className="text-[10px] text-gray-400">Connexion sécurisée • WAKA v1.0.0</p>
        </div>
      </motion.div>

      <style jsx global>{`
        @keyframes blob {
          0% { transform: translate(0px, 0px) scale(1); }
          33% { transform: translate(30px, -50px) scale(1.1); }
          66% { transform: translate(-20px, 20px) scale(0.9); }
          100% { transform: translate(0px, 0px) scale(1); }
        }
        .animate-blob {
          animation: blob 7s infinite;
        }
        .animation-delay-2000 {
          animation-delay: 2s;
        }
      `}</style>
    </div>
  )
}