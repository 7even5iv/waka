"use client"

import React, { useState, useEffect } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import Head from 'next/head'
import { motion, useScroll, useSpring, useInView, AnimatePresence } from 'framer-motion'
import {
  Coffee, Truck, Clock, ShieldCheck, Star, Award, Zap,
  CreditCard, Headphones, Gift, Sparkles,
  MapPin, ChevronRight, Phone, Mail, ArrowRight, Heart, Users,
  Loader2, CheckCircle,
  Info, Home, MessageCircle, Globe, Menu, X, User,
  LogOut, Settings, Package
} from 'lucide-react'

// ========== TYPES ==========
interface Service {
  icon: React.ElementType
  title: string
  description: string
  features: string[]
  color: string
  stats?: {
    partners: string
    deliveryTime: string
    rating: string
  }
}

interface Advantage {
  icon: React.ElementType
  title: string
  description: string
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

// ========== COMPOSANT NAV LINK ==========
const NavLink = ({ href, icon: Icon, label, mobile = false, onClick }: any) => {
  const linkContent = (
    <>
      <Icon size={mobile ? 18 : 16} className={mobile ? "text-green-600" : "text-green-500"} />
      <span className={mobile ? "font-medium" : "text-sm font-medium"}>{label}</span>
    </>
  )

  if (onClick) {
    return (
      <button onClick={onClick} className={`flex items-center gap-2 transition-colors ${mobile
        ? "py-3 text-green-700 hover:text-green-500 border-b border-green-50 w-full"
        : "text-green-700 hover:text-green-500"
        }`}>
        {linkContent}
      </button>
    )
  }

  return (
    <Link href={href} className={`flex items-center gap-2 transition-colors ${mobile
      ? "py-3 text-green-700 hover:text-green-500 border-b border-green-50"
      : "text-green-700 hover:text-green-500"
      }`}>
      {linkContent}
    </Link>
  )
}

// ========== COMPOSANT LOGO OPTIMISÉ ==========
const Logo = ({ className = "h-8 w-auto" }: { className?: string }) => {
  const [imageError, setImageError] = useState(false)
  const logoSrc = "/images/logo.png"
  const fallbackSrc = "/images/logo-fallback.png"

  return (
    <Link href="/" className="flex items-center gap-2 group" aria-label="WAKA Accueil">
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

// ========== COMPOSANT SERVICE CARD OPTIMISÉ ==========
const ServiceCard = ({
  icon: Icon,
  title,
  description,
  features,
  color,
  delay,
  stats
}: Service & { delay: number; stats?: Service['stats'] }) => {
  const [isHovered, setIsHovered] = useState(false)
  const ref = React.useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 30 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
      transition={{ delay, duration: 0.5 }}
      whileHover={{ y: -10 }}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
      className="bg-white rounded-2xl overflow-hidden shadow-lg border border-green-100 hover:shadow-2xl transition-all duration-300 group"
    >
      <div className={`bg-gradient-to-r ${color} p-6 text-white relative overflow-hidden`}>
        <motion.div
          className="absolute inset-0 bg-white/10"
          initial={{ x: '-100%' }}
          animate={{ x: isHovered ? '100%' : '-100%' }}
          transition={{ duration: 0.6 }}
        />
        <div className="relative z-10">
          <motion.div
            className="w-16 h-16 rounded-xl bg-white/20 backdrop-blur-sm flex items-center justify-center mb-4"
            whileHover={{ rotate: 5, scale: 1.1 }}
            transition={{ type: "spring", stiffness: 300 }}
          >
            <Icon size={32} />
          </motion.div>
          <h3 className="text-2xl font-bold mb-2">{title}</h3>
          <p className="text-white/90 text-sm">{description}</p>
        </div>
      </div>
      <div className="p-6">
        {stats && (
          <div className="flex justify-around mb-4 pb-4 border-b border-green-100">
            <div className="text-center">
              <div className="text-xs text-green-500">Partenaires</div>
              <div className="font-bold text-green-900">{stats.partners}</div>
            </div>
            <div className="text-center">
              <div className="text-xs text-green-500">Livraison</div>
              <div className="font-bold text-green-900">{stats.deliveryTime}</div>
            </div>
            <div className="text-center">
              <div className="text-xs text-green-500">Note</div>
              <div className="font-bold text-green-900 flex items-center gap-1">
                {stats.rating}
                <Star size={12} className="text-yellow-400 fill-yellow-400" />
              </div>
            </div>
          </div>
        )}
        <ul className="space-y-3 mb-6">
          {features.map((feature, index) => (
            <motion.li
              key={index}
              className="flex items-center gap-3 text-green-700"
              initial={{ opacity: 0, x: -20 }}
              animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -20 }}
              transition={{ delay: delay + 0.1 + (index * 0.05) }}
            >
              <CheckCircle size={16} className="text-green-500 flex-shrink-0" />
              <span className="text-sm">{feature}</span>
            </motion.li>
          ))}
        </ul>
        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          className="w-full py-2 rounded-lg border-2 border-green-200 text-green-700 font-medium hover:bg-green-50 transition-all flex items-center justify-center gap-2 group"
          aria-label={`En savoir plus sur ${title}`}
        >
          En savoir plus
          <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
        </motion.button>
      </div>
    </motion.div>
  )
}

// ========== COMPOSANT AVANTAGE ITEM ==========
const AdvantageItem = ({ icon: Icon, title, description }: Advantage) => {
  const ref = React.useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-50px" })

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, scale: 0.8 }}
      animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.8 }}
      transition={{ duration: 0.5 }}
      whileHover={{ scale: 1.05 }}
      className="text-center group cursor-pointer"
    >
      <motion.div
        className="w-20 h-20 rounded-full bg-gradient-to-r from-green-500 to-emerald-600 flex items-center justify-center mx-auto mb-4 shadow-lg group-hover:shadow-xl transition-all"
        whileHover={{ rotate: 360 }}
        transition={{ duration: 0.6 }}
      >
        <Icon size={32} className="text-white" />
      </motion.div>
      <h3 className="text-lg font-bold text-white mb-2">{title}</h3>
      <p className="text-green-200 text-sm">{description}</p>
    </motion.div>
  )
}

// ========== COMPOSANT STATS COUNTER ==========
const StatsCounter = ({ value, label, icon: Icon }: { value: string; label: string; icon: React.ElementType }) => {
  const ref = React.useRef(null)
  const isInView = useInView(ref, { once: true })
  const [count, setCount] = useState(0)

  const numericValue = parseInt(value.replace(/[^0-9]/g, ''))
  const suffix = value.replace(/[0-9]/g, '')

  useEffect(() => {
    if (isInView && count < numericValue) {
      const timer = setInterval(() => {
        setCount(prev => {
          const increment = Math.ceil(numericValue / 50)
          if (prev + increment >= numericValue) {
            clearInterval(timer)
            return numericValue
          }
          return prev + increment
        })
      }, 30)
      return () => clearInterval(timer)
    }
  }, [isInView, numericValue, count])

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 30 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
      className="text-center"
    >
      <div className="w-16 h-16 rounded-full bg-white/10 flex items-center justify-center mx-auto mb-4">
        <Icon size={32} className="text-yellow-400" />
      </div>
      <div className="text-4xl font-bold text-white mb-2">
        {count.toLocaleString()}{suffix}
      </div>
      <div className="text-green-200">{label}</div>
    </motion.div>
  )
}

// ========== PAGE SERVICES ==========
export default function ServicesPage() {
  const [scrolled, setScrolled] = useState(false)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [user, setUser] = useState<any>(null)
  const [showUserMenu, setShowUserMenu] = useState(false)
  const userMenuRef = React.useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll()
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  })

  const services: Service[] = [
    {
      icon: Coffee,
      title: "Livraison de repas",
      description: "Les meilleurs restaurants à votre porte",
      features: [
        "Plus de 150 restaurants partenaires",
        "Livraison en 30-45 minutes",
        "Suivi en temps réel",
        "Paiement sécurisé"
      ],
      color: "from-orange-500 to-red-500",
      stats: {
        partners: "150+",
        deliveryTime: "30-45 min",
        rating: "4.8"
      }
    },
    {
      icon: Gift,
      title: "Cadeaux & Fleurs",
      description: "Surprenez vos proches en quelques clics",
      features: [
        "Boutiques de fleurs",
        "Coffrets cadeaux",
        "Livraison personnalisée",
        "Message d'accompagnement"
      ],
      color: "from-pink-500 to-rose-500",
      stats: {
        partners: "50+",
        deliveryTime: "1-2 heures",
        rating: "4.9"
      }
    },
    {
      icon: Truck,
      title: "Livraison express",
      description: "Service ultra-rapide pour vos urgences",
      features: [
        "Livraison en 15-20 minutes",
        "Service 24h/24",
        "Zone élargie",
        "Suivi GPS en direct"
      ],
      color: "from-blue-500 to-cyan-500",
      stats: {
        partners: "200+",
        deliveryTime: "15-20 min",
        rating: "4.9"
      }
    },
    {
      icon: Package,
      title: "Courses & Épicerie",
      description: "Faites vos courses sans bouger de chez vous",
      features: [
        "Supermarkets partenaires",
        "Produits frais garantis",
        "Livraison express",
        "Courses programmées"
      ],
      color: "from-green-500 to-emerald-600",
      stats: {
        partners: "80+",
        deliveryTime: "45-60 min",
        rating: "4.7"
      }
    }
  ]

  const advantages: Advantage[] = [
    { icon: Zap, title: "Rapidité", description: "Livraison en moins de 45 minutes" },
    { icon: ShieldCheck, title: "Sécurité", description: "Paiement 100% sécurisé" },
    { icon: Star, title: "Qualité", description: "Partenaires sélectionnés" },
    { icon: Headphones, title: "Support", description: "Service client 24/7" },
    { icon: CreditCard, title: "Paiement", description: "Multiple options de paiement" },
    { icon: Award, title: "Fidélité", description: "Programme de récompenses" }
  ]

  const stats = [
    { value: "10000", label: "Livraisons effectuées", icon: Truck },
    { value: "250", label: "Partenaires", icon: Users },
    { value: "4.9", label: "Satisfaction client", icon: Star }
  ]

  const navLinks = [
    { name: 'Accueil', href: '/', icon: Home },
    { name: 'Services', href: '/services', icon: Coffee },
    { name: 'À propos', href: '/about', icon: Info },
    { name: 'Contact', href: '/contact', icon: MessageCircle },
    { name: 'Blog', href: '/blog', icon: Globe }
  ]

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50)
    window.addEventListener('scroll', handleScroll)

    const savedUser = localStorage.getItem('waka_user')
    if (savedUser) {
      setUser(JSON.parse(savedUser))
    }

    const handleClickOutside = (e: MouseEvent) => {
      if (userMenuRef.current && !userMenuRef.current.contains(e.target as Node)) {
        setShowUserMenu(false)
      }
    }
    document.addEventListener('click', handleClickOutside)

    return () => {
      window.removeEventListener('scroll', handleScroll)
      document.removeEventListener('click', handleClickOutside)
    }
  }, [])

  const handleLogout = () => {
    localStorage.removeItem('waka_user')
    setUser(null)
    setShowUserMenu(false)
  }

  return (
    <>
      <Head>
        <title>Nos Services | WAKA - Livraison ultra-rapide au Cameroun</title>
        <meta name="description" content="Découvrez tous nos services de livraison au Cameroun : repas, courses, cadeaux, livraison express. Service rapide et fiable." />
        <meta name="keywords" content="livraison repas, courses en ligne, livraison cadeaux, livraison express, cameroun, douala, yaoundé" />
        <meta name="author" content="WAKA Delivery Service" />
        <meta property="og:title" content="Nos Services | WAKA Delivery" />
        <meta property="og:description" content="Service de livraison ultra-rapide au Cameroun. Commandez vos repas, courses et cadeaux en quelques clics." />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://waka.cm/services" />
        <meta name="twitter:card" content="summary_large_image" />
        <link rel="canonical" href="https://waka.cm/services" />
      </Head>

      <div className="min-h-screen bg-white">
        {/* Progress Bar */}
        <motion.div
          className="fixed top-0 left-0 right-0 h-1 bg-gradient-to-r from-green-500 to-emerald-600 z-50"
          style={{ scaleX, transformOrigin: "0%" }}
        />

        {/* Header */}
        <nav className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${scrolled ? 'bg-white/90 backdrop-blur-xl border-b border-green-100 shadow-sm' : 'bg-white border-b border-green-100'
          }`}>
          <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
            <Logo className="h-10 w-auto" />

            {/* Desktop Menu */}
            <div className="hidden md:flex items-center gap-6">
              {navLinks.map((link) => (
                <NavLink key={link.name} href={link.href} icon={link.icon} label={link.name} />
              ))}

              <div className="h-6 w-px bg-green-200" />

              {user ? (
                <div className="relative" ref={userMenuRef}>
                  <button
                    onClick={() => setShowUserMenu(!showUserMenu)}
                    className="flex items-center gap-2 group cursor-pointer"
                  >
                    <div className="w-9 h-9 rounded-full bg-gradient-to-r from-green-500 to-emerald-600 flex items-center justify-center text-white font-bold shadow-md group-hover:scale-110 transition-transform">
                      {user.name.charAt(0).toUpperCase()}
                    </div>
                    <span className="text-sm font-semibold text-green-800 group-hover:text-green-600 transition-colors hidden sm:inline">
                      {user.name.split(' ')[0]}
                    </span>
                  </button>

                  <AnimatePresence>
                    {showUserMenu && (
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
                          <NavLink href="/profile" icon={User} label="Mon profil" onClick={() => setShowUserMenu(false)} />
                          <NavLink href="/orders" icon={Truck} label="Mes commandes" onClick={() => setShowUserMenu(false)} />
                          <NavLink href="/favorites" icon={Heart} label="Mes favoris" onClick={() => setShowUserMenu(false)} />
                          <NavLink href="/settings" icon={Settings} label="Paramètres" onClick={() => setShowUserMenu(false)} />
                          <button onClick={handleLogout} className="w-full flex items-center gap-3 px-4 py-2 text-sm text-red-600 hover:bg-red-50 transition-colors border-t border-green-100 mt-2 pt-2">
                            <LogOut size={16} />
                            Déconnexion
                          </button>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              ) : (
                <Link href="/login">
                  <button className="bg-gradient-to-r from-green-500 to-emerald-600 text-white px-6 py-2 rounded-full text-sm font-bold shadow-md hover:shadow-lg transition-all hover:scale-105 transform flex items-center gap-2">
                    <User size={16} />
                    Connexion
                  </button>
                </Link>
              )}
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden relative w-10 h-10 rounded-lg flex items-center justify-center transition-all duration-300 hover:bg-green-50"
              aria-label="Menu"
            >
              {mobileMenuOpen ? <X size={24} className="text-green-600" /> : <Menu size={24} className="text-green-600" />}
            </button>
          </div>

          {/* Mobile Menu */}
          <AnimatePresence>
            {mobileMenuOpen && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.3 }}
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
                    transition={{ delay: 0.2 }}
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
                      <Link href="/login" onClick={() => setMobileMenuOpen(false)}>
                        <button className="w-full bg-gradient-to-r from-green-500 to-emerald-600 text-white py-3 rounded-xl font-bold flex items-center justify-center gap-2">
                          <User size={18} />
                          Connexion / Inscription
                        </button>
                      </Link>
                    )}
                  </motion.div>

                  <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.3 }}
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
                    transition={{ delay: 0.4 }}
                    className="pt-4 mt-2"
                  >
                    <p className="text-xs font-semibold text-green-500 mb-3">NOUS SUIVRE</p>
                    <div className="flex gap-3">
                      <a href="#" className="w-8 h-8 rounded-full bg-green-50 flex items-center justify-center hover:bg-green-100 transition-colors group">
                        <SocialIcons.Facebook className="w-4 h-4 text-green-600 group-hover:text-green-500" />
                      </a>
                      <a href="#" className="w-8 h-8 rounded-full bg-green-50 flex items-center justify-center hover:bg-green-100 transition-colors group">
                        <SocialIcons.Twitter className="w-4 h-4 text-green-600 group-hover:text-green-500" />
                      </a>
                      <a href="#" className="w-8 h-8 rounded-full bg-green-50 flex items-center justify-center hover:bg-green-100 transition-colors group">
                        <SocialIcons.Instagram className="w-4 h-4 text-green-600 group-hover:text-green-500" />
                      </a>
                      <a href="#" className="w-8 h-8 rounded-full bg-green-50 flex items-center justify-center hover:bg-green-100 transition-colors group">
                        <SocialIcons.Linkedin className="w-4 h-4 text-green-600 group-hover:text-green-500" />
                      </a>
                      <a href="#" className="w-8 h-8 rounded-full bg-green-50 flex items-center justify-center hover:bg-green-100 transition-colors group">
                        <SocialIcons.Youtube className="w-4 h-4 text-green-600 group-hover:text-green-500" />
                      </a>
                      <a href="#" className="w-8 h-8 rounded-full bg-green-50 flex items-center justify-center hover:bg-green-100 transition-colors group">
                        <SocialIcons.Tiktok className="w-4 h-4 text-green-600 group-hover:text-green-500" />
                      </a>
                    </div>
                  </motion.div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </nav>

        {/* Hero Section */}
        <section className="relative pt-32 pb-20 overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-green-50 via-white to-green-50" />
          <div className="absolute top-20 -right-40 w-96 h-96 bg-green-200 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob" />
          <div className="absolute bottom-20 -left-40 w-96 h-96 bg-yellow-200 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-2000" />

          <div className="relative max-w-7xl mx-auto px-6 text-center">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ type: "spring", delay: 0.2 }}
                className="inline-flex items-center gap-2 bg-green-100 px-4 py-2 rounded-full mb-6"
              >
                <Sparkles size={16} className="text-green-600" />
                <span className="text-sm font-medium text-green-700">Nos services</span>
              </motion.div>

              <h1 className="text-5xl md:text-6xl lg:text-7xl font-black tracking-tighter mb-6">
                Des services adaptés
                <br />
                <span className="bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent">
                  à tous vos besoins
                </span>
              </h1>

              <p className="text-green-600 text-lg md:text-xl max-w-2xl mx-auto">
                Découvrez notre gamme complète de services de livraison conçus pour
                vous simplifier la vie au quotidien.
              </p>
            </motion.div>
          </div>
        </section>

        {/* Services Grid */}
        <section className="py-20 bg-white">
          <div className="max-w-7xl mx-auto px-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {services.map((service, index) => (
                <ServiceCard
                  key={index}
                  {...service}
                  delay={index * 0.1}
                />
              ))}
            </div>
          </div>
        </section>

        {/* Stats Section */}
        <section className="py-20 bg-gradient-to-br from-green-900 to-emerald-900">
          <div className="max-w-7xl mx-auto px-6">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center mb-12"
            >
              <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
                WAKA en chiffres
              </h2>
              <p className="text-green-200 text-lg max-w-2xl mx-auto">
                Des résultats concrets qui parlent d'eux-mêmes
              </p>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
              {stats.map((stat, index) => (
                <StatsCounter key={index} {...stat} />
              ))}
            </div>
          </div>
        </section>

        {/* Advantages Section */}
        <section className="py-20 bg-gradient-to-br from-green-900 to-emerald-900">
          <div className="max-w-7xl mx-auto px-6">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center mb-12"
            >
              <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
                Pourquoi nous choisir ?
              </h2>
              <p className="text-green-200 text-lg max-w-2xl mx-auto">
                Des avantages exclusifs pour une expérience de livraison unique
              </p>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {advantages.map((adv, index) => (
                <AdvantageItem key={index} {...adv} />
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20 bg-white relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-r from-green-50/50 to-transparent" />
          <div className="relative max-w-4xl mx-auto px-6 text-center">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <h2 className="text-3xl md:text-4xl font-bold text-green-900 mb-4">
                Prêt à profiter de nos services ?
              </h2>
              <p className="text-green-600 text-lg mb-8">
                Rejoignez des milliers de clients satisfaits dès aujourd'hui
              </p>
              <Link href="/">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.98 }}
                  className="px-8 py-3 rounded-full bg-gradient-to-r from-green-500 to-emerald-600 text-white font-bold shadow-lg hover:shadow-xl transition-all inline-flex items-center gap-2 group"
                >
                  Commander maintenant
                  <ChevronRight size={18} className="group-hover:translate-x-1 transition-transform" />
                </motion.button>
              </Link>
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
                  <li><Link href="/services" className="text-green-600 text-sm hover:text-green-500 transition-colors flex items-center gap-2"><Coffee size={14} /> Services</Link></li>
                  <li><Link href="/about" className="text-green-600 text-sm hover:text-green-500 transition-colors flex items-center gap-2"><Info size={14} /> À propos</Link></li>
                  <li><Link href="/contact" className="text-green-600 text-sm hover:text-green-500 transition-colors flex items-center gap-2"><MessageCircle size={14} /> Contact</Link></li>
                  <li><Link href="/blog" className="text-green-600 text-sm hover:text-green-500 transition-colors flex items-center gap-2"><Globe size={14} /> Blog</Link></li>
                </ul>
              </div>

              <div>
                <h4 className="font-bold text-green-900 mb-4">Services</h4>
                <ul className="space-y-2">
                  <li><Link href="/douala" className="text-green-600 text-sm hover:text-green-500 transition-colors flex items-center gap-2"><MapPin size={14} /> Douala</Link></li>
                  <li><Link href="/yaounde" className="text-green-600 text-sm hover:text-green-500 transition-colors flex items-center gap-2"><MapPin size={14} /> Yaoundé</Link></li>
                  <li><Link href="/services" className="text-green-600 text-sm hover:text-green-500 transition-colors flex items-center gap-2"><Truck size={14} /> Livraison express</Link></li>
                  <li><Link href="/services" className="text-green-600 text-sm hover:text-green-500 transition-colors flex items-center gap-2"><Gift size={14} /> Cadeaux & fleurs</Link></li>
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
                  <a href="#" className="w-8 h-8 rounded-full bg-green-50 flex items-center justify-center hover:bg-green-100 transition-colors group" aria-label="YouTube">
                    <SocialIcons.Youtube className="w-4 h-4 text-green-600 group-hover:text-green-500" />
                  </a>
                  <a href="#" className="w-8 h-8 rounded-full bg-green-50 flex items-center justify-center hover:bg-green-100 transition-colors group" aria-label="TikTok">
                    <SocialIcons.Tiktok className="w-4 h-4 text-green-600 group-hover:text-green-500" />
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
    </>
  )
}