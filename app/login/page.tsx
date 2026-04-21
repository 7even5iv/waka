"use client"

import React, { useState, useEffect } from 'react'
import Link from 'next/link'
import { motion, AnimatePresence } from 'framer-motion'
import { useRouter } from 'next/navigation'
import Image from 'next/image'
import {
  Mail, Lock, Eye, EyeOff, ArrowRight, CheckCircle,
  AlertCircle, User, Phone, Shield, Award, Zap, Truck,
  Star, TrendingUp, Clock, Headphones, ChevronLeft, ChevronRight, ArrowLeft
} from 'lucide-react'

// ========== ICÔNES PERSONNALISÉES ==========
const GoogleIcon = () => (
  <svg className="w-5 h-5" viewBox="0 0 24 24">
    <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4" />
    <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853" />
    <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05" />
    <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335" />
  </svg>
)

const FacebookIcon = () => (
  <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
    <path d="M24 12.07C24 5.41 18.63 0 12 0S0 5.41 0 12.07C0 18.1 4.39 23.1 10.13 24v-8.44H7.08v-3.49h3.05V9.41c0-3.02 1.79-4.7 4.54-4.7 1.31 0 2.68.24 2.68.24v2.96h-1.51c-1.49 0-1.96.93-1.96 1.88v2.26h3.33l-.53 3.49h-2.8V24c5.74-.9 10.13-5.9 10.13-11.93z" />
  </svg>
)

const AppleIcon = () => (
  <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
    <path d="M14.94 5.19A4.38 4.38 0 0 0 16 2.5a4.44 4.44 0 0 0-2.77.96 4.2 4.2 0 0 0-1.18 2.69 3.73 3.73 0 0 0 2.89-.96zM18.51 12.79a5.78 5.78 0 0 1 2.87-5 6 6 0 0 0-4.87-2.63c-2.07-.21-4.05 1.22-5.09 1.22-1 0-2.64-1.19-4.33-1.16a6.31 6.31 0 0 0-5.33 3.17c-2.27 3.94-.58 9.77 1.62 13 1.06 1.55 2.31 3.29 3.96 3.22 1.59-.07 2.19-1 4.11-1 1.91 0 2.46 1 4.13.96 1.71-.02 2.8-1.56 3.85-3.12a13 13 0 0 0 1.67-3.48 5.77 5.77 0 0 1-3.48-5.31z" />
  </svg>
)

// ========== DONNÉES DU CARROUSEL ==========
const slides = [
  {
    id: 1,
    title: "Bienvenue sur WAKA",
    subtitle: "Votre plateforme de confiance",
    description: "Découvrez une expérience d'achat unique avec des produits de qualité et un service irréprochable.",
    icon: Star,
    color: "from-green-500 to-emerald-600",
    image: "/images/slide-bienvenue.jpg"
  },
  {
    id: 2,
    title: "Livraison Express",
    subtitle: "Recevez vos colis en 24h",
    description: "Profitez de notre service de livraison ultra-rapide dans toute la France.",
    icon: Truck,
    color: "from-blue-500 to-cyan-600",
    image: "/images/slide-livraison.jpg"
  },
  {
    id: 3,
    title: "Paiement Sécurisé",
    subtitle: "Transactions 100% protégées",
    description: "Vos données bancaires sont cryptées et vos transactions sont sécurisées.",
    icon: Shield,
    color: "from-purple-500 to-pink-600",
    image: "/images/slide-securite.jpg"
  },
  {
    id: 4,
    title: "Programme Fidélité",
    subtitle: "Gagnez des points à chaque achat",
    description: "Accumulez des points et bénéficiez d'avantages exclusifs.",
    icon: Award,
    color: "from-orange-500 to-red-600",
    image: "/images/slide-fidelite.jpg"
  }
]

// ========== COMPOSANT LOGO AGRANDI ET CENTRÉ ==========
const Logo = ({ className = "h-8 w-auto", variant = "dark" }) => {
  const logoSrc = "/images/logo.png"

  return (
    <div className="flex items-center justify-center">
      <Image
        src={logoSrc}
        alt="WAKA Logo"
        width={240}
        height={80}
        className={`${className} object-contain transition-all duration-300`}
        priority
      />
    </div>
  )
}

// ========== COMPOSANT BOUTON SOCIAL ==========
const SocialButton = ({ icon: Icon, text, color, bgColor, onClick }: any) => {
  return (
    <motion.button
      whileHover={{ scale: 1.02, y: -2 }}
      whileTap={{ scale: 0.98 }}
      onClick={onClick}
      className={`w-full py-3 px-4 ${bgColor} ${color} font-semibold rounded-xl flex items-center justify-center gap-3 shadow-md hover:shadow-lg transition-all border border-gray-200`}
    >
      <Icon />
      <span className="text-sm">{text}</span>
    </motion.button>
  )
}

// ========== COMPOSANT SLIDE ==========
const SlideContent = ({ slide, isActive }: { slide: typeof slides[0], isActive: boolean }) => {
  const Icon = slide.icon

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: isActive ? 1 : 0 }}
      transition={{ duration: 0.5 }}
      className="absolute inset-0"
    >
      {/* Image de fond */}
      <div className="absolute inset-0">
        <Image
          src={slide.image}
          alt={slide.title}
          fill
          className="object-cover"
          priority={isActive}
        />
        {/* Overlay avec dégradé */}
        <div className={`absolute inset-0 bg-gradient-to-br ${slide.color} opacity-80`} />
        <div className="absolute inset-0 bg-black/40" />
      </div>

      {/* Contenu textuel */}
      <div className="relative z-10 flex flex-col items-center justify-center text-center h-full p-12">
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: isActive ? 1 : 0 }}
          transition={{ delay: 0.2, type: "spring" }}
          className="mb-8"
        >
          <div className={`w-24 h-24 rounded-2xl bg-gradient-to-br ${slide.color} flex items-center justify-center shadow-2xl backdrop-blur-sm bg-white/20`}>
            <Icon className="w-12 h-12 text-white" />
          </div>
        </motion.div>

        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: isActive ? 1 : 0, y: isActive ? 0 : 20 }}
          transition={{ delay: 0.3 }}
          className="text-4xl font-bold text-white mb-3"
        >
          {slide.title}
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: isActive ? 1 : 0, y: isActive ? 0 : 20 }}
          transition={{ delay: 0.4 }}
          className="text-green-100 font-medium text-lg mb-4"
        >
          {slide.subtitle}
        </motion.p>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: isActive ? 1 : 0, y: isActive ? 0 : 20 }}
          transition={{ delay: 0.5 }}
          className="text-white/90 text-base leading-relaxed max-w-sm"
        >
          {slide.description}
        </motion.p>
      </div>
    </motion.div>
  )
}

export default function LoginPage() {
  const router = useRouter()
  const [showPassword, setShowPassword] = useState(false)
  const [loginMethod, setLoginMethod] = useState<'email' | 'phone'>('email')
  const [currentSlide, setCurrentSlide] = useState(0)
  const [formData, setFormData] = useState({
    email: '',
    phone: '',
    password: ''
  })
  const [rememberMe, setRememberMe] = useState(false)
  const [formStatus, setFormStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle')
  const [errorMessage, setErrorMessage] = useState('')

  // Auto-slide
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length)
    }, 5000)
    return () => clearInterval(timer)
  }, [])

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

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % slides.length)
  }

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length)
  }

  return (
    <div className="min-h-screen bg-white flex overflow-hidden">

      {/* PARTIE GAUCHE - CARROUSEL AVEC IMAGES */}
      <div className="hidden lg:flex lg:w-1/2 relative overflow-hidden">
        {/* Slides avec images */}
        <div className="relative w-full h-full">
          <AnimatePresence mode="wait">
            {slides.map((slide, index) => (
              currentSlide === index && (
                <SlideContent key={slide.id} slide={slide} isActive={true} />
              )
            ))}
          </AnimatePresence>
        </div>

        {/* Indicateurs de slide */}
        <div className="absolute bottom-12 left-0 right-0 flex justify-center gap-2 z-20">
          {slides.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentSlide(index)}
              className={`transition-all duration-300 rounded-full ${currentSlide === index
                ? 'w-8 h-2 bg-white'
                : 'w-2 h-2 bg-white/40 hover:bg-white/60'
                }`}
            />
          ))}
        </div>

        {/* Boutons navigation */}
        <button
          onClick={prevSlide}
          className="absolute left-6 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-white/10 backdrop-blur-sm hover:bg-white/20 transition-all flex items-center justify-center z-20"
        >
          <ChevronLeft className="w-5 h-5 text-white" />
        </button>

        <button
          onClick={nextSlide}
          className="absolute right-6 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-white/10 backdrop-blur-sm hover:bg-white/20 transition-all flex items-center justify-center z-20"
        >
          <ChevronRight className="w-5 h-5 text-white" />
        </button>

        {/* Statistiques */}
        <div className="absolute bottom-8 right-8 z-20 flex gap-6">
          <div className="text-center">
            <div className="text-white font-bold text-xl">50K+</div>
            <div className="text-white/60 text-xs">Clients</div>
          </div>
          <div className="text-center">
            <div className="text-white font-bold text-xl">100K+</div>
            <div className="text-white/60 text-xs">Commandes</div>
          </div>
          <div className="text-center">
            <div className="text-white font-bold text-xl">4.9★</div>
            <div className="text-white/60 text-xs">Note</div>
          </div>
        </div>
      </div>

      {/* PARTIE DROITE - FORMULAIRE */}
      <div className="w-full lg:w-1/2 flex flex-col items-center justify-center p-6 md:p-12 overflow-y-auto">
        <div className="w-full max-w-md">
          {/* Bouton retour professionnel */}
          <motion.button
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.3 }}
            onClick={() => router.push('/')}
            className="group relative mb-8 flex items-center gap-3 px-4 py-2 rounded-full bg-gray-50 hover:bg-white border border-gray-200 hover:border-green-200 shadow-sm hover:shadow-md transition-all duration-300 w-fit"
          >
            <div className="absolute inset-0 rounded-full bg-gradient-to-r from-green-500/0 to-green-500/0 group-hover:from-green-500/10 group-hover:to-emerald-500/10 transition-all duration-300" />
            <ArrowLeft size={16} className="text-gray-500 group-hover:text-green-600 group-hover:-translate-x-1 transition-all duration-300" />
            <span className="text-sm font-medium text-gray-600 group-hover:text-green-700">Retour à l'accueil</span>
          </motion.button>

          {/* Logo AGRANDI et CENTRÉ au-dessus du formulaire */}
          <div className="mb-10">
            <Logo className="w-auto mx-auto" variant="dark" />
          </div>

          {/* Carte de Connexion */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            className="bg-white rounded-2xl"
          >
            {/* Toggle de méthode de connexion */}
            <div className="flex gap-2 p-1 bg-gray-100 rounded-xl mb-6">
              <button
                onClick={() => setLoginMethod('email')}
                className={`flex-1 py-2.5 rounded-lg text-sm font-medium transition-all ${loginMethod === 'email'
                  ? 'bg-white text-green-600 shadow-sm'
                  : 'text-gray-500 hover:text-gray-700'
                  }`}
              >
                <Mail className="w-4 h-4 inline mr-2" />
                Email
              </button>
              <button
                onClick={() => setLoginMethod('phone')}
                className={`flex-1 py-2.5 rounded-lg text-sm font-medium transition-all ${loginMethod === 'phone'
                  ? 'bg-white text-green-600 shadow-sm'
                  : 'text-gray-500 hover:text-gray-700'
                  }`}
              >
                <Phone className="w-4 h-4 inline mr-2" />
                Téléphone
              </button>
            </div>

            <form onSubmit={handleLogin} className="space-y-5">
              {/* Email ou Téléphone */}
              <div>
                <label className="text-xs font-bold text-gray-700 uppercase tracking-wider mb-2 block">
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
                    className="w-full pl-12 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-gray-900 outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all"
                    required
                  />
                </div>
              </div>

              {/* Mot de passe */}
              <div>
                <label className="text-xs font-bold text-gray-700 uppercase tracking-wider mb-2 block">
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
                    className="w-full pl-12 pr-12 py-3 bg-gray-50 border border-gray-200 rounded-xl text-gray-900 outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all"
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
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
                <Link href="/forgot-password" className="text-xs text-green-600 hover:text-green-700 font-medium transition-colors">
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
                className="w-full py-3.5 bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white font-bold rounded-xl shadow-lg hover:shadow-xl transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
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
                text="Continuer avec Google"
                color="text-gray-700"
                bgColor="bg-white"
                onClick={() => handleSocialLogin('Google')}
              />
              <SocialButton
                icon={AppleIcon}
                text="Continuer avec Apple"
                color="text-white"
                bgColor="bg-black"
                onClick={() => handleSocialLogin('Apple')}
              />
              <SocialButton
                icon={FacebookIcon}
                text="Continuer avec Facebook"
                color="text-white"
                bgColor="bg-[#1877F2]"
                onClick={() => handleSocialLogin('Facebook')}
              />
            </div>

            {/* Avantages */}
            <div className="mt-6 pt-4 border-t border-gray-100">
              <div className="flex justify-center gap-6 flex-wrap">
                <div className="flex items-center gap-2">
                  <Zap size={14} className="text-green-500" />
                  <span className="text-xs text-gray-500">Livraison express</span>
                </div>
                <div className="flex items-center gap-2">
                  <Shield size={14} className="text-green-500" />
                  <span className="text-xs text-gray-500">Paiement sécurisé</span>
                </div>
                <div className="flex items-center gap-2">
                  <Headphones size={14} className="text-green-500" />
                  <span className="text-xs text-gray-500">Support 24/7</span>
                </div>
              </div>
            </div>

            {/* Lien inscription */}
            <div className="mt-6 text-center">
              <p className="text-sm text-gray-500">
                Pas encore de compte ?{' '}
                <Link href="/register" className="text-green-600 font-semibold hover:text-green-700 transition-colors">
                  Créer un compte gratuitement
                </Link>
              </p>
            </div>

            {/* Version */}
            <div className="mt-6 text-center">
              <p className="text-[10px] text-gray-400">Connexion sécurisée • WAKA v1.0.0</p>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  )
}