"use client"

import React, { useState, useEffect, useRef } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import Image from 'next/image'
import Head from 'next/head'
import { motion, AnimatePresence, useScroll, useSpring, useTransform, useMotionValue } from 'framer-motion'
import {
  MapPin, ArrowRight, Zap, ShieldCheck, Star, User, Menu, Clock, Truck,
  Award, Phone, Mail, ChevronRight, X, Heart,
  Settings, LogOut, ChevronDown, Home, Info, MessageCircle,
  Globe, Gift, Coffee,
  Sparkles, ThumbsUp, Loader2
} from 'lucide-react'

// ========== TYPES ==========
interface User {
  id: number
  name: string
  email: string
  createdAt: string
}

interface City {
  id: string
  name: string
  description: string
  gradient: string
  image: string
  stats: {
    deliveryTime: string
    partners: string
    rating: string
  }
}

interface Advantage {
  icon: React.ElementType
  title: string
  description: string
  color: string
}

interface Testimonial {
  name: string
  role: string
  rating: number
  content: string
}

// ========== ICÔNES RÉSEAUX SOCIAUX ==========
const SocialIcons = {
  Facebook: ({ className = "w-4 h-4" }) => (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor">
      <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
    </svg>
  ),
  Twitter: ({ className = "w-4 h-4" }) => (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor">
      <path d="M23 3a10.9 10.9 0 0 1-3.14 1.53 4.48 4.48 0 0 0-7.86 3v1A10.66 10.66 0 0 1 3 4s-4 9 5 13a11.64 11.64 0 0 1-7 2c9 5 20 0 20-11.5a4.5 4.5 0 0 0-.08-.83A7.72 7.72 0 0 0 23 3z" />
    </svg>
  ),
  Instagram: ({ className = "w-4 h-4" }) => (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor">
      <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
      <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
      <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
    </svg>
  ),
  Linkedin: ({ className = "w-4 h-4" }) => (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor">
      <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
      <rect x="2" y="9" width="4" height="12" />
      <circle cx="4" cy="4" r="2" />
    </svg>
  ),
  Youtube: ({ className = "w-4 h-4" }) => (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor">
      <path d="M22.54 6.42a2.78 2.78 0 0 0-1.94-2C18.88 4 12 4 12 4s-6.88 0-8.6.46a2.78 2.78 0 0 0-1.94 2A29 29 0 0 0 1 11.75a29 29 0 0 0 .46 5.33A2.78 2.78 0 0 0 3.4 19c1.72.46 8.6.46 8.6.46s6.88 0 8.6-.46a2.78 2.78 0 0 0 1.94-2 29 29 0 0 0 .46-5.25 29 29 0 0 0-.46-5.33z" />
      <polygon points="9.75 15.02 15.5 11.75 9.75 8.48 9.75 15.02" />
    </svg>
  ),
  Tiktok: ({ className = "w-4 h-4" }) => (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor">
      <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5 15.58a6.34 6.34 0 0 0 10.86 4.7 6.33 6.33 0 0 0 1.72-4.31V9.49a8.25 8.25 0 0 0 4.77 1.52V7.64a4.83 4.83 0 0 1-2.76-.95z" />
    </svg>
  )
}

// ========== COMPOSANT LOGO ==========
const Logo = ({ className = "h-8 w-auto" }: { className?: string }) => {
  const [imageError, setImageError] = React.useState(false)
  const logoSrc = "/images/logo.png"
  const fallbackSrc = "/images/logo-fallback.png"

  return (
    <Link href="/" className="flex items-center gap-2 group">
      <div className="relative">
        <Image
          src={imageError ? fallbackSrc : logoSrc}
          alt="WAKA Logo"
          width={200}
          height={500}
          className={`${className} object-contain transition-all duration-300 group-hover:scale-105`}
          priority
          onError={() => setImageError(true)}
        />
      </div>
    </Link>
  )
}

// ========== COMPOSANT DE NAVIGATION (CORRIGÉ) ==========
const NavLink = ({ href, icon: Icon, label, mobile = false, onClick }: {
  href?: string;
  icon: React.ElementType;
  label: string;
  mobile?: boolean;
  onClick?: () => void;
}) => {
  const linkContent = (
    <>
      <Icon size={mobile ? 18 : 16} className={mobile ? "text-green-600" : "text-green-500"} />
      <span className={mobile ? "font-medium" : "text-sm font-medium"}>{label}</span>
    </>
  )

  // Si c'est un bouton d'action sans href (ex: dans UserMenu pour fermer le menu)
  if (onClick && !href) {
    return (
      <button onClick={onClick} className={`flex items-center gap-2 transition-colors ${mobile
        ? "py-3 text-green-700 hover:text-green-500 border-b border-green-50 w-full"
        : "text-green-700 hover:text-green-500"
        }`}>
        {linkContent}
      </button>
    )
  }

  // Gérer le clic pour fermer le menu mobile avant la navigation
  const handleLinkClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    if (onClick) {
      onClick() // Ferme le menu mobile
    }
  }

  return (
    <Link
      href={href || '#'}
      onClick={handleLinkClick}
      className={`flex items-center gap-2 transition-colors ${mobile
        ? "py-3 text-green-700 hover:text-green-500 border-b border-green-50"
        : "text-green-700 hover:text-green-500"
        }`}
    >
      {linkContent}
    </Link>
  )
}

// ========== MENU UTILISATEUR ==========
const UserMenuComponent = ({ user, onLogout, onClose }: { user: User; onLogout: () => void; onClose: () => void }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
      className="absolute top-full right-0 mt-2 w-64 bg-white rounded-xl shadow-xl border border-green-100 overflow-hidden z-50"
    >
      <div className="p-4 border-b border-green-100">
        <p className="font-bold text-green-900">{user.name}</p>
        <p className="text-xs text-green-500">{user.email}</p>
      </div>
      <div className="py-2">
        <NavLink href="/profile" icon={User} label="Mon profil" onClick={onClose} />
        <NavLink href="/orders" icon={Truck} label="Mes commandes" onClick={onClose} />
        <NavLink href="/favorites" icon={Heart} label="Mes favoris" onClick={onClose} />
        <NavLink href="/settings" icon={Settings} label="Paramètres" onClick={onClose} />
        <button onClick={onLogout} className="w-full flex items-center gap-3 px-4 py-2 text-sm text-red-600 hover:bg-red-50 transition-colors border-t border-green-100 mt-2 pt-2">
          <LogOut size={16} />
          Déconnexion
        </button>
      </div>
    </motion.div>
  )
}

// ========== MODAL DE CONNEXION ==========
const LoginModalComponent = ({ isOpen, onClose, onLogin }: { isOpen: boolean; onClose: () => void; onLogin: (user: User) => void }) => {
  const [email, setEmail] = React.useState('')
  const [password, setPassword] = React.useState('')
  const [isRegistering, setIsRegistering] = React.useState(false)
  const [name, setName] = React.useState('')
  const [isLoading, setIsLoading] = React.useState(false)
  const [error, setError] = React.useState('')

  const validateEmail = (email: string) => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')

    if (!validateEmail(email)) {
      setError('Veuillez entrer un email valide')
      return
    }

    if (isRegistering && !name.trim()) {
      setError('Veuillez entrer votre nom')
      return
    }

    if (!password) {
      setError('Veuillez entrer votre mot de passe')
      return
    }

    setIsLoading(true)

    await new Promise(resolve => setTimeout(resolve, 1000))

    try {
      if (isRegistering) {
        const newUser: User = {
          id: Date.now(),
          name: name.trim(),
          email: email,
          createdAt: new Date().toISOString()
        }
        localStorage.setItem('waka_user', JSON.stringify(newUser))
        onLogin(newUser)
      } else {
        const savedUser = localStorage.getItem('waka_user')
        if (savedUser) {
          const user = JSON.parse(savedUser)
          if (user.email === email) {
            onLogin(user)
          } else {
            const newUser: User = {
              id: Date.now(),
              name: email.split('@')[0],
              email: email,
              createdAt: new Date().toISOString()
            }
            localStorage.setItem('waka_user', JSON.stringify(newUser))
            onLogin(newUser)
          }
        } else {
          const newUser: User = {
            id: Date.now(),
            name: email.split('@')[0],
            email: email,
            createdAt: new Date().toISOString()
          }
          localStorage.setItem('waka_user', JSON.stringify(newUser))
          onLogin(newUser)
        }
      }
      onClose()
      setEmail('')
      setPassword('')
      setName('')
    } catch (err) {
      setError('Une erreur est survenue. Veuillez réessayer.')
    } finally {
      setIsLoading(false)
    }
  }

  if (!isOpen) return null

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm"
      onClick={onClose}
    >
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.9, opacity: 0 }}
        className="bg-white rounded-2xl max-w-md w-full p-6 shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-green-900">
            {isRegistering ? 'Créer un compte' : 'Connexion'}
          </h2>
          <button onClick={onClose} className="p-1 hover:bg-gray-100 rounded-full transition-colors">
            <X size={20} />
          </button>
        </div>

        {error && (
          <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-lg text-red-600 text-sm">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          {isRegistering && (
            <div>
              <label className="block text-sm font-medium text-green-700 mb-1">Nom complet</label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full px-4 py-2 border border-green-200 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent outline-none transition-all"
                required
                disabled={isLoading}
                placeholder="Jean Dupont"
              />
            </div>
          )}

          <div>
            <label className="block text-sm font-medium text-green-700 mb-1">Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-2 border border-green-200 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent outline-none transition-all"
              required
              disabled={isLoading}
              placeholder="exemple@email.com"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-green-700 mb-1">Mot de passe</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-2 border border-green-200 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent outline-none transition-all"
              required
              disabled={isLoading}
              placeholder="••••••••"
            />
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className="w-full py-2 rounded-lg bg-gradient-to-r from-green-500 to-emerald-600 text-white font-bold hover:shadow-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
          >
            {isLoading ? (
              <>
                <Loader2 size={18} className="animate-spin" />
                Chargement...
              </>
            ) : (
              isRegistering ? "S'inscrire" : "Se connecter"
            )}
          </button>
        </form>

        <div className="mt-4 text-center">
          <button
            onClick={() => {
              setIsRegistering(!isRegistering)
              setError('')
            }}
            className="text-sm text-green-600 hover:text-green-700 transition-colors"
            disabled={isLoading}
          >
            {isRegistering ? 'Déjà un compte ? Se connecter' : 'Pas de compte ? S\'inscrire'}
          </button>
        </div>

        {!isRegistering && (
          <div className="mt-4 text-center">
            <button
              onClick={() => {
                setEmail('demo@waka.cm')
                setPassword('demo123')
              }}
              className="text-xs text-green-500 hover:text-green-600 transition-colors"
            >
              Mode démo : remplir automatiquement
            </button>
          </div>
        )}
      </motion.div>
    </motion.div>
  )
}

// ========== CUSTOM CURSOR ==========
const CustomCursor = () => {
  const cursorX = useMotionValue(0)
  const cursorY = useMotionValue(0)
  const [isVisible, setIsVisible] = React.useState(false)

  React.useEffect(() => {
    const moveCursor = (e: MouseEvent) => {
      cursorX.set(e.clientX - 16)
      cursorY.set(e.clientY - 16)
      if (!isVisible) setIsVisible(true)
    }

    const hideCursor = () => setIsVisible(false)
    const showCursor = () => setIsVisible(true)

    window.addEventListener('mousemove', moveCursor)
    window.addEventListener('mouseleave', hideCursor)
    window.addEventListener('mouseenter', showCursor)

    return () => {
      window.removeEventListener('mousemove', moveCursor)
      window.removeEventListener('mouseleave', hideCursor)
      window.removeEventListener('mouseenter', showCursor)
    }
  }, [cursorX, cursorY, isVisible])

  if (!isVisible) return null

  return (
    <motion.div
      className="fixed top-0 left-0 w-8 h-8 border-2 border-green-400 rounded-full pointer-events-none z-[999] hidden lg:flex items-center justify-center"
      style={{
        x: cursorX,
        y: cursorY,
        position: 'fixed'
      }}
      transition={{ type: "spring", damping: 25, stiffness: 300, mass: 0.5 }}
    >
      <div className="w-1 h-1 bg-green-500 rounded-full" />
    </motion.div>
  )
}

// ========== CARD VILLE OPTIMISÉE ==========
const CityCardComponent = ({ city, index, onSelect }: { city: City; index: number; onSelect: (cityId: string) => void }) => {
  const [imageError, setImageError] = React.useState(false)
  const fallbackImage = "/images/fallback-city.jpg"

  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ delay: index * 0.2 }}
      whileHover={{ y: -10 }}
      className="group cursor-pointer"
      onClick={() => onSelect(city.id)}
    >
      <div className="relative h-[520px] w-full rounded-3xl overflow-hidden shadow-xl hover:shadow-2xl transition-all duration-500">
        <div className="absolute inset-0">
          <Image
            src={imageError ? fallbackImage : city.image}
            alt={city.name}
            fill
            className="object-cover transition-transform duration-700 group-hover:scale-110"
            sizes="(max-width: 768px) 100vw, 50vw"
            onError={() => setImageError(true)}
          />
          <div className={`absolute inset-0 bg-gradient-to-t ${city.gradient} opacity-80 group-hover:opacity-70 transition-all`} />
        </div>

        <div className="relative h-full p-8 flex flex-col justify-between text-white">
          <div className="flex justify-end">
            <motion.div
              whileHover={{ scale: 1.1, x: 5 }}
              className="w-12 h-12 rounded-full bg-white/20 backdrop-blur-md border border-white/50 flex items-center justify-center"
            >
              <ArrowRight size={20} className="text-white" />
            </motion.div>
          </div>

          <div>
            <h3 className="text-5xl font-black mb-2 drop-shadow-lg">{city.name}</h3>
            <p className="text-white/90 text-sm uppercase tracking-wider mb-4">{city.description}</p>
            <div className="flex flex-wrap gap-2">
              <span className="text-xs px-3 py-1 rounded-full bg-white/20 backdrop-blur-sm flex items-center gap-1">
                <Clock size={12} />
                {city.stats.deliveryTime}
              </span>
              <span className="text-xs px-3 py-1 rounded-full bg-white/20 backdrop-blur-sm flex items-center gap-1">
                <Truck size={12} />
                {city.stats.partners} partenaires
              </span>
              <span className="text-xs px-3 py-1 rounded-full bg-white/20 backdrop-blur-sm flex items-center gap-1">
                <Star size={12} className="text-yellow-400 fill-yellow-400" />
                {city.stats.rating}
              </span>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  )
}

// ========== AVANTAGE CARD ==========
const AdvantageCardComponent = ({ icon: Icon, title, description, color }: Advantage) => {
  return (
    <motion.div
      whileHover={{ y: -5 }}
      className="bg-white rounded-2xl p-6 shadow-lg border border-green-100 hover:shadow-xl transition-all cursor-pointer group"
    >
      <div className={`w-14 h-14 rounded-xl bg-gradient-to-r ${color} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}>
        <Icon size={28} className="text-white" />
      </div>
      <h3 className="text-xl font-bold text-green-900 mb-2">{title}</h3>
      <p className="text-green-600 text-sm leading-relaxed">{description}</p>
    </motion.div>
  )
}

// ========== TÉMOIGNAGE CARD ==========
const TestimonialCardComponent = ({ name, role, content, rating }: Testimonial) => {
  return (
    <motion.div
      whileHover={{ y: -5 }}
      className="bg-white rounded-2xl p-6 shadow-lg border border-green-100"
    >
      <div className="flex items-center gap-4 mb-4">
        <div className="w-12 h-12 rounded-full bg-gradient-to-r from-green-500 to-emerald-600 flex items-center justify-center text-white font-bold text-lg">
          {name.charAt(0)}
        </div>
        <div>
          <h4 className="font-bold text-green-900">{name}</h4>
          <p className="text-xs text-green-500">{role}</p>
        </div>
      </div>
      <div className="flex gap-1 mb-3">
        {[...Array(5)].map((_, i) => (
          <Star key={i} size={14} className={`${i < rating ? 'text-yellow-400 fill-yellow-400' : 'text-gray-300'}`} />
        ))}
      </div>
      <p className="text-green-700 text-sm leading-relaxed italic">"{content}"</p>
    </motion.div>
  )
}

// ========== PAGE PRINCIPALE ==========
export default function HomePage() {
  const router = useRouter()
  const [user, setUser] = React.useState<User | null>(null)
  const [scrolled, setScrolled] = React.useState(false)
  const [showLoginModal, setShowLoginModal] = React.useState(false)
  const [showUserMenu, setShowUserMenu] = React.useState(false)
  const [mobileMenuOpen, setMobileMenuOpen] = React.useState(false)
  const userMenuRef = React.useRef<HTMLDivElement>(null)
  const mobileMenuRef = React.useRef<HTMLDivElement>(null)

  const { scrollYProgress } = useScroll()
  const smoothY = useSpring(scrollYProgress, { stiffness: 100, damping: 30 })
  const rotate = useTransform(smoothY, [0, 1], [0, 10])

  // Données des villes avec fallback
  const cities: City[] = [
    {
      id: 'douala',
      name: 'Douala',
      description: 'Capitale économique',
      gradient: 'from-green-600 to-emerald-700',
      image: '/images/douala.jpg',
      stats: { deliveryTime: '30-45 min', partners: '156', rating: '4.8' }
    },
    {
      id: 'yaounde',
      name: 'Yaoundé',
      description: 'Capitale politique',
      gradient: 'from-yellow-500 to-amber-600',
      image: '/images/yaounde.jpg',
      stats: { deliveryTime: '30-45 min', partners: '142', rating: '4.7' }
    }
  ]

  const advantages: Advantage[] = [
    { icon: Zap, title: 'Livraison Express', description: 'Livraison en moins de 45 minutes dans toute la ville.', color: 'from-yellow-400 to-amber-500' },
    { icon: ShieldCheck, title: 'Paiement Sécurisé', description: 'Transactions 100% sécurisées avec cryptage bancaire.', color: 'from-green-500 to-emerald-600' },
    { icon: Award, title: 'Qualité Premium', description: 'Partenaires sélectionnés pour leur excellence.', color: 'from-yellow-400 to-amber-500' },
    { icon: Clock, title: 'Service 24/7', description: 'Disponible jour et nuit pour vos besoins.', color: 'from-green-500 to-emerald-600' }
  ]

  const testimonials: Testimonial[] = [
    { name: 'Marie N.', role: 'Cliente à Douala', rating: 5, content: 'Service exceptionnel ! Livraison rapide et produits frais. Je recommande vivement WAKA.' },
    { name: 'Jean-Paul K.', role: 'Client à Yaoundé', rating: 5, content: 'La meilleure application de livraison au Cameroun. Interface fluide et service fiable.' },
    { name: 'Sarah M.', role: 'Chef d\'entreprise', rating: 4, content: 'Partenariat professionnel au top. L\'équipe est réactive et professionnelle.' }
  ]

  // Navigation links
  const navLinks = [
    { name: 'Accueil', href: '/', icon: Home },
    { name: 'Services', href: '/services', icon: Coffee },
    { name: 'À propos', href: '/about', icon: Info },
    { name: 'Contact', href: '/contact', icon: MessageCircle },
    { name: 'Blog', href: '/blog', icon: Globe },
  ]

  React.useEffect(() => {
    // Charger l'utilisateur
    const savedUser = localStorage.getItem('waka_user')
    if (savedUser) {
      try {
        setUser(JSON.parse(savedUser))
      } catch (e) {
        console.error('Erreur lors du chargement de l\'utilisateur', e)
      }
    }

    const handleScroll = () => setScrolled(window.scrollY > 50)

    const handleClickOutside = (e: MouseEvent) => {
      if (userMenuRef.current && !userMenuRef.current.contains(e.target as Node)) {
        setShowUserMenu(false)
      }
      if (mobileMenuRef.current && !mobileMenuRef.current.contains(e.target as Node) && mobileMenuOpen) {
        setMobileMenuOpen(false)
      }
    }

    window.addEventListener('scroll', handleScroll)
    document.addEventListener('click', handleClickOutside)

    return () => {
      window.removeEventListener('scroll', handleScroll)
      document.removeEventListener('click', handleClickOutside)
    }
  }, [mobileMenuOpen])

  const handleLogin = (userData: User) => {
    setUser(userData)
    setShowLoginModal(false)
  }

  const handleLogout = () => {
    localStorage.removeItem('waka_user')
    setUser(null)
    setShowUserMenu(false)
  }

  const handleCitySelect = (cityId: string) => {
    router.push(`/${cityId}`)
  }

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId)
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' })
      setMobileMenuOpen(false)
    }
  }

  return (
    <>
      <Head>
        <title>WAKA - Livraison ultra-rapide au Cameroun</title>
        <meta name="description" content="La première plateforme de livraison ultra-rapide au Cameroun. Commandez vos plats et courses préférés en quelques secondes." />
        <meta name="keywords" content="livraison, cameroun, douala, yaoundé, courses, plats, delivery, waka" />
        <meta name="author" content="WAKA Delivery Service" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta property="og:title" content="WAKA - Livraison ultra-rapide au Cameroun" />
        <meta property="og:description" content="Commandez vos plats et courses préférés en quelques secondes." />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://waka.cm" />
        <meta name="twitter:card" content="summary_large_image" />
        <link rel="canonical" href="https://waka.cm" />
      </Head>

      <div className="relative min-h-screen bg-white overflow-x-hidden">

        {/* Curseur personnalisé optimisé */}
        <CustomCursor />

        {/* Pattern de fond */}
        <div className="absolute inset-0 bg-[linear-gradient(45deg,rgba(34,197,94,0.02)_1px,transparent_1px)] bg-[size:40px_40px] pointer-events-none" />

        {/* Orbes flottantes */}
        <div className="absolute top-20 -left-40 w-96 h-96 bg-green-200 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob" />
        <div className="absolute top-40 -right-40 w-96 h-96 bg-yellow-200 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-2000" />
        <div className="absolute bottom-20 left-1/2 w-96 h-96 bg-green-300 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-4000" />

        {/* Header */}
        <motion.nav
          className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled ? 'bg-white/90 backdrop-blur-xl border-b border-green-100 shadow-sm' : 'bg-transparent'
            }`}
          initial={{ y: -100 }}
          animate={{ y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
            <Logo className="h-10 w-auto md:h-12" />

            {/* Menu Desktop */}
            <div className="hidden md:flex items-center gap-8">
              {navLinks.map((link) => (
                <NavLink key={link.name} href={link.href} icon={link.icon} label={link.name} />
              ))}

              <div className="h-6 w-px bg-green-200" />

              {user ? (
                <div className="relative" ref={userMenuRef}>
                  <motion.button
                    key="user-logged"
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.9 }}
                    onClick={() => setShowUserMenu(!showUserMenu)}
                    className="flex items-center gap-2 group cursor-pointer"
                  >
                    <div className="w-9 h-9 rounded-full bg-gradient-to-r from-green-500 to-emerald-600 flex items-center justify-center text-white font-bold shadow-md group-hover:scale-110 transition-transform">
                      {user.name.charAt(0).toUpperCase()}
                    </div>
                    <span className="text-sm font-semibold text-green-800 group-hover:text-green-600 transition-colors hidden sm:inline">
                      {user.name.split(' ')[0]}
                    </span>
                    <ChevronDown size={16} className="text-green-600" />
                  </motion.button>

                  <AnimatePresence>
                    {showUserMenu && (
                      <UserMenuComponent user={user} onLogout={handleLogout} onClose={() => setShowUserMenu(false)} />
                    )}
                  </AnimatePresence>
                </div>
              ) : (
                <motion.div
                  key="user-guest"
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                >
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => setShowLoginModal(true)}
                    className="bg-gradient-to-r from-green-500 to-emerald-600 text-white px-6 py-2 rounded-full text-sm font-bold shadow-md hover:shadow-lg transition-all flex items-center gap-2"
                  >
                    <User size={16} />
                    Connexion
                  </motion.button>
                </motion.div>
              )}
            </div>

            {/* Bouton Hamburger */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden relative w-10 h-10 rounded-lg flex items-center justify-center transition-all duration-300 hover:bg-green-50"
              aria-label="Menu"
            >
              <motion.div
                animate={mobileMenuOpen ? "open" : "closed"}
                className="relative w-6 h-5"
              >
                <motion.span
                  variants={{
                    closed: { rotate: 0, y: 0 },
                    open: { rotate: 45, y: 8 }
                  }}
                  transition={{ duration: 0.3 }}
                  className="absolute top-0 left-0 w-full h-0.5 bg-green-600 rounded-full"
                />
                <motion.span
                  variants={{
                    closed: { opacity: 1 },
                    open: { opacity: 0 }
                  }}
                  transition={{ duration: 0.3 }}
                  className="absolute top-2 left-0 w-full h-0.5 bg-green-600 rounded-full"
                />
                <motion.span
                  variants={{
                    closed: { rotate: 0, y: 0 },
                    open: { rotate: -45, y: -8 }
                  }}
                  transition={{ duration: 0.3 }}
                  className="absolute top-4 left-0 w-full h-0.5 bg-green-600 rounded-full"
                />
              </motion.div>
            </button>
          </div>

          {/* Menu Mobile */}
          <AnimatePresence>
            {mobileMenuOpen && (
              <motion.div
                ref={mobileMenuRef}
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.3, ease: "easeInOut" }}
                className="md:hidden bg-white/95 backdrop-blur-xl border-b border-green-100 overflow-hidden"
              >
                <div className="px-6 py-4 space-y-1">
                  {navLinks.map((link, index) => (
                    <motion.div
                      key={link.name}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.1 }}
                    >
                      <NavLink
                        href={link.href}
                        icon={link.icon}
                        label={link.name}
                        mobile={true}
                        onClick={() => setMobileMenuOpen(false)}
                      />
                    </motion.div>
                  ))}

                  <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.3 }}
                    className="pt-4 mt-2 border-t border-green-100"
                  >
                    {user ? (
                      <div className="space-y-2">
                        <div className="flex items-center gap-3 py-2">
                          <div className="w-10 h-10 rounded-full bg-gradient-to-r from-green-500 to-emerald-600 flex items-center justify-center text-white font-bold">
                            {user.name.charAt(0).toUpperCase()}
                          </div>
                          <div>
                            <p className="font-semibold text-green-900">{user.name}</p>
                            <p className="text-xs text-green-500">{user.email}</p>
                          </div>
                        </div>
                        <NavLink href="/profile" icon={User} label="Mon profil" mobile={true} onClick={() => setMobileMenuOpen(false)} />
                        <NavLink href="/orders" icon={Truck} label="Mes commandes" mobile={true} onClick={() => setMobileMenuOpen(false)} />
                        <NavLink href="/favorites" icon={Heart} label="Mes favoris" mobile={true} onClick={() => setMobileMenuOpen(false)} />
                        <button
                          onClick={() => {
                            handleLogout()
                            setMobileMenuOpen(false)
                          }}
                          className="w-full flex items-center gap-3 py-3 text-red-600 hover:bg-red-50 rounded-lg transition-colors px-3"
                        >
                          <LogOut size={18} />
                          <span className="font-medium">Déconnexion</span>
                        </button>
                      </div>
                    ) : (
                      <motion.button
                        whileTap={{ scale: 0.98 }}
                        onClick={() => {
                          setShowLoginModal(true)
                          setMobileMenuOpen(false)
                        }}
                        className="w-full bg-gradient-to-r from-green-500 to-emerald-600 text-white py-3 rounded-xl font-bold flex items-center justify-center gap-2"
                      >
                        <User size={18} />
                        Connexion / Inscription
                      </motion.button>
                    )}
                  </motion.div>

                  <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.4 }}
                    className="pt-4 mt-2 border-t border-green-100"
                  >
                    <p className="text-xs font-semibold text-green-500 mb-3 flex items-center gap-2">
                      <Phone size={12} />
                      CONTACT RAPIDE
                    </p>
                    <div className="space-y-2">
                      <a href="tel:+237621004286" className="flex items-center gap-3 py-2 text-green-600 hover:text-green-500 transition-colors">
                        <Phone size={16} />
                        <span className="text-sm">+237 621 004 286</span>
                      </a>
                      <a href="mailto:contact@waka.cm" className="flex items-center gap-3 py-2 text-green-600 hover:text-green-500 transition-colors">
                        <Mail size={16} />
                        <span className="text-sm">contact@waka.cm</span>
                      </a>
                    </div>
                  </motion.div>

                  <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.5 }}
                    className="pt-4 mt-2"
                  >
                    <p className="text-xs font-semibold text-green-500 mb-3">NOUS SUIVRE</p>
                    <div className="flex gap-3">
                      <a href="#" className="w-8 h-8 rounded-full bg-green-50 flex items-center justify-center hover:bg-green-100 transition-colors group" aria-label="Facebook">
                        <SocialIcons.Facebook className="w-4 h-4 text-green-600 group-hover:text-green-500" />
                      </a>
                      <a href="#" className="w-8 h-8 rounded-full bg-green-50 flex items-center justify-center hover:bg-green-100 transition-colors group" aria-label="Twitter">
                        <SocialIcons.Twitter className="w-4 h-4 text-green-600 group-hover:text-green-500" />
                      </a>
                      <a href="#" className="w-8 h-8 rounded-full bg-green-50 flex items-center justify-center hover:bg-green-100 transition-colors group" aria-label="Instagram">
                        <SocialIcons.Instagram className="w-4 h-4 text-green-600 group-hover:text-green-500" />
                      </a>
                      <a href="#" className="w-8 h-8 rounded-full bg-green-50 flex items-center justify-center hover:bg-green-100 transition-colors group" aria-label="LinkedIn">
                        <SocialIcons.Linkedin className="w-4 h-4 text-green-600 group-hover:text-green-500" />
                      </a>
                      <a href="#" className="w-8 h-8 rounded-full bg-green-50 flex items-center justify-center hover:bg-green-100 transition-colors group" aria-label="YouTube">
                        <SocialIcons.Youtube className="w-4 h-4 text-green-600 group-hover:text-green-500" />
                      </a>
                      <a href="#" className="w-8 h-8 rounded-full bg-green-50 flex items-center justify-center hover:bg-green-100 transition-colors group" aria-label="TikTok">
                        <SocialIcons.Tiktok className="w-4 h-4 text-green-600 group-hover:text-green-500" />
                      </a>
                    </div>
                  </motion.div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.nav>

        {/* Hero Section */}
        <section className="relative min-h-screen flex items-center justify-center pt-32 pb-20">
          <div className="max-w-7xl mx-auto px-6 text-center">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              <motion.div
                className="flex justify-center mb-8"
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ type: "spring", delay: 0.2 }}
              >
                <div className="relative">
                  <Logo className="h-32 w-auto md:h-48 lg:h-56" />
                  <div className="absolute -inset-8 bg-gradient-to-r from-green-500/20 to-yellow-500/20 blur-3xl rounded-full -z-10 animate-pulse-slow" />
                </div>
              </motion.div>

              <motion.h1
                className="text-5xl md:text-7xl lg:text-8xl font-black tracking-tighter mb-6"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
              >
                Vos courses, notre
                <br />
                <span className="bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent">
                  prestige!
                </span>
              </motion.h1>

              <motion.p
                className="text-green-600 text-lg md:text-xl max-w-2xl mx-auto mb-8"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5 }}
              >
                La première plateforme de livraison ultra-rapide au Cameroun.
                Commandez vos plats et courses préférés en quelques secondes.
              </motion.p>

              <motion.div
                className="flex flex-col sm:flex-row gap-4 justify-center"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.7 }}
              >
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => scrollToSection('cities')}
                  className="group px-8 py-3 rounded-full bg-gradient-to-r from-green-500 to-emerald-600 text-white font-bold shadow-lg hover:shadow-xl transition-all flex items-center gap-2"
                >
                  Commander maintenant
                  <ChevronRight size={18} className="group-hover:translate-x-1 transition-transform" />
                </motion.button>
                <Link href="/about">
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.98 }}
                    className="px-8 py-3 rounded-full border-2 border-green-200 text-green-700 font-bold hover:border-green-400 hover:bg-green-50 transition-all"
                  >
                    En savoir plus
                  </motion.button>
                </Link>
              </motion.div>

              {/* Trust indicators */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.9 }}
                className="mt-16 flex flex-wrap justify-center gap-6"
              >
                {[
                  { value: "10k+", label: "Livraisons", icon: Truck },
                  { value: "250+", label: "Partenaires", icon: Award },
                  { value: "98%", label: "Satisfaction", icon: ThumbsUp },
                ].map((stat, i) => (
                  <div key={i} className="flex items-center gap-3 px-5 py-3 rounded-full bg-white shadow-sm border border-green-100">
                    <div className="w-10 h-10 rounded-full bg-green-50 flex items-center justify-center">
                      <stat.icon size={20} className="text-green-500" />
                    </div>
                    <div className="text-left">
                      <div className="font-bold text-gray-900">{stat.value}</div>
                      <div className="text-xs text-gray-500">{stat.label}</div>
                    </div>
                  </div>
                ))}
              </motion.div>
            </motion.div>
          </div>
        </section>

        {/* Cities Section */}
        <section id="cities" className="py-20 bg-gradient-to-b from-white via-green-50/30 to-white">
          <div className="max-w-7xl mx-auto px-6">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center mb-12"
            >
              <h2 className="text-4xl md:text-5xl font-bold text-green-900 mb-4 flex items-center justify-center gap-3">
                <MapPin size={40} className="text-green-500" />
                Nos villes partenaires
              </h2>
              <p className="text-green-600 text-lg max-w-2xl mx-auto">
                Découvrez nos services dans les plus grandes villes du Cameroun
              </p>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {cities.map((city, index) => (
                <CityCardComponent key={city.id} city={city} index={index} onSelect={handleCitySelect} />
              ))}
            </div>
          </div>
        </section>

        {/* Advantages Section */}
        <section className="py-20 bg-white">
          <div className="max-w-7xl mx-auto px-6">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center mb-12"
            >
              <h2 className="text-4xl md:text-5xl font-bold text-green-900 mb-4">
                Pourquoi choisir WAKA ?
              </h2>
              <p className="text-green-600 text-lg max-w-2xl mx-auto">
                Une expérience de livraison repensée pour vous
              </p>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {advantages.map((adv, index) => (
                <AdvantageCardComponent key={index} {...adv} />
              ))}
            </div>
          </div>
        </section>

        {/* Stats Section */}
        <section className="py-20 bg-gradient-to-br from-green-900 to-emerald-900">
          <div className="max-w-7xl mx-auto px-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
              {[
                { value: "10,000+", label: "Livraisons effectuées", icon: Truck },
                { value: "250+", label: "Partenaires commerçants", icon: Award },
                { value: "4.9/5", label: "Note moyenne clients", icon: Star }
              ].map((stat, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className="text-center text-white"
                >
                  <div className="flex justify-center mb-4">
                    <div className="w-20 h-20 rounded-full bg-white/10 flex items-center justify-center">
                      <stat.icon size={32} className="text-yellow-400" />
                    </div>
                  </div>
                  <div className="text-5xl font-bold mb-2">{stat.value}</div>
                  <div className="text-green-200 font-medium">{stat.label}</div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Testimonials Section */}
        <section className="py-20 bg-white">
          <div className="max-w-7xl mx-auto px-6">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center mb-12"
            >
              <h2 className="text-4xl md:text-5xl font-bold text-green-900 mb-4">
                Ce que nos clients disent
              </h2>
              <p className="text-green-600 text-lg max-w-2xl mx-auto">
                Des milliers de clients satisfaits à travers le Cameroun
              </p>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {testimonials.map((testimonial, index) => (
                <TestimonialCardComponent key={index} {...testimonial} />
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20 bg-gradient-to-r from-green-500 to-emerald-600">
          <div className="max-w-4xl mx-auto px-6 text-center">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
                Prêt à passer commande ?
              </h2>
              <p className="text-green-100 text-lg mb-8">
                Rejoignez des milliers de clients qui nous font confiance chaque jour
              </p>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => scrollToSection('cities')}
                className="px-8 py-3 rounded-full bg-white text-green-600 font-bold shadow-lg hover:shadow-xl transition-all flex items-center gap-2 mx-auto"
              >
                <Gift size={18} />
                Commander maintenant
              </motion.button>
            </motion.div>
          </div>
        </section>

        {/* Footer */}
        <footer className="bg-white border-t border-green-100 py-12">
          <div className="max-w-7xl mx-auto px-6">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
              <div>
                <Logo className="h-10 w-auto mb-4" />
                <p className="text-green-600 text-sm">
                  La première plateforme de livraison ultra-rapide au Cameroun.
                </p>
              </div>

              <div>
                <h4 className="font-bold text-green-900 mb-4">Navigation</h4>
                <ul className="space-y-2">
                  <li><Link href="/" className="text-green-600 text-sm hover:text-green-500 transition-colors flex items-center gap-2"><Home size={14} /> Accueil</Link></li>
                  <li><Link href="/about" className="text-green-600 text-sm hover:text-green-500 transition-colors flex items-center gap-2"><Info size={14} /> À propos</Link></li>
                  <li><Link href="/contact" className="text-green-600 text-sm hover:text-green-500 transition-colors flex items-center gap-2"><MessageCircle size={14} /> Contact</Link></li>
                  <li><Link href="/services" className="text-green-600 text-sm hover:text-green-500 transition-colors flex items-center gap-2"><Coffee size={14} /> Services</Link></li>
                </ul>
              </div>

              <div>
                <h4 className="font-bold text-green-900 mb-4">Services</h4>
                <ul className="space-y-2">
                  <li><Link href="/douala" className="text-green-600 text-sm hover:text-green-500 transition-colors flex items-center gap-2"><MapPin size={14} /> Douala</Link></li>
                  <li><Link href="/yaounde" className="text-green-600 text-sm hover:text-green-500 transition-colors flex items-center gap-2"><MapPin size={14} /> Yaoundé</Link></li>
                </ul>
              </div>

              <div>
                <h4 className="font-bold text-green-900 mb-4">Contact</h4>
                <ul className="space-y-2">
                  <li className="flex items-center gap-2 text-green-600 text-sm">
                    <Phone size={14} />
                    <span>+237 621 004 286</span>
                  </li>
                  <li className="flex items-center gap-2 text-green-600 text-sm">
                    <Mail size={14} />
                    <span>contact@waka.cm</span>
                  </li>
                </ul>
                <div className="flex gap-3 mt-4">
                  <a href="#" className="w-8 h-8 rounded-full bg-green-50 flex items-center justify-center hover:bg-green-100 transition-colors group" aria-label="Facebook">
                    <SocialIcons.Facebook className="w-4 h-4 text-green-600 group-hover:text-green-500" />
                  </a>
                  <a href="#" className="w-8 h-8 rounded-full bg-green-50 flex items-center justify-center hover:bg-green-100 transition-colors group" aria-label="Twitter">
                    <SocialIcons.Twitter className="w-4 h-4 text-green-600 group-hover:text-green-500" />
                  </a>
                  <a href="#" className="w-8 h-8 rounded-full bg-green-50 flex items-center justify-center hover:bg-green-100 transition-colors group" aria-label="Instagram">
                    <SocialIcons.Instagram className="w-4 h-4 text-green-600 group-hover:text-green-500" />
                  </a>
                  <a href="#" className="w-8 h-8 rounded-full bg-green-50 flex items-center justify-center hover:bg-green-100 transition-colors group" aria-label="LinkedIn">
                    <SocialIcons.Linkedin className="w-4 h-4 text-green-600 group-hover:text-green-500" />
                  </a>
                </div>
              </div>
            </div>

            <div className="border-t border-green-100 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
              <p className="text-green-500 text-xs">
                © 2024 WAKA Delivery Service. Tous droits réservés.
              </p>
              <div className="flex gap-4">
                <Link href="/terms" className="text-green-500 text-xs hover:text-green-600 transition-colors">
                  Conditions d'utilisation
                </Link>
                <Link href="/privacy" className="text-green-500 text-xs hover:text-green-600 transition-colors">
                  Politique de confidentialité
                </Link>
              </div>
            </div>
          </div>
        </footer>

        {/* Modals */}
        <AnimatePresence>
          {showLoginModal && (
            <LoginModalComponent isOpen={showLoginModal} onClose={() => setShowLoginModal(false)} onLogin={handleLogin} />
          )}
        </AnimatePresence>

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
          .animation-delay-4000 {
            animation-delay: 4s;
          }
          @keyframes pulse-slow {
            0%, 100% { opacity: 0.3; transform: scale(1); }
            50% { opacity: 0.6; transform: scale(1.05); }
          }
          .animate-pulse-slow {
            animation: pulse-slow 3s cubic-bezier(0.4, 0, 0.6, 1) infinite;
          }
        `}</style>
      </div>
    </>
  )
}