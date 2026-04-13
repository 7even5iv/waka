"use client"

import React, { useState, useEffect } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import Head from 'next/head'
import { motion, AnimatePresence, useScroll, useSpring } from 'framer-motion'
import {
  ChevronLeft, MapPin, Calendar, Star, Users, Target, Shield, Zap,
  Phone, Mail,
  Award, Clock, Truck, Heart, Globe, Briefcase,
  Home, Info, MessageCircle, Coffee, Menu, X,
  User, LogOut, Settings, ChevronDown, Sparkles,
  Gift
} from 'lucide-react'

// ========== ICÔNES SVG PERSONNALISÉES ==========
const MissionIcon = ({ className = "w-12 h-12" }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
    <path d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z" strokeLinecap="round" strokeLinejoin="round" />
    <circle cx="12" cy="12" r="4" strokeLinecap="round" />
  </svg>
)

const VisionIcon = ({ className = "w-12 h-12" }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
    <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" strokeLinecap="round" />
    <circle cx="12" cy="12" r="3" strokeLinecap="round" />
  </svg>
)

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

// ========== COMPOSANT LOGO ==========
const Logo = ({ className = "h-8 w-auto" }) => {
  const [imageError, setImageError] = useState(false)
  const logoSrc = "/images/logo.png"
  const fallbackSrc = "/images/logo-fallback.png"

  return (
    <Link href="/" className="flex items-center gap-2 group">
      <div className="relative">
        <Image
          src={imageError ? fallbackSrc : logoSrc}
          alt="WAKA Logo"
          width={200}
          height={70}
          className={`${className} object-contain transition-all duration-300 group-hover:scale-105`}
          priority
          onError={() => setImageError(true)}
        />
      </div>
    </Link>
  )
}

// ========== COMPOSANT CARTE ÉQUIPE ==========
const TeamCard = ({ name, role, icon: Icon, description, delay }: any) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay }}
      whileHover={{ y: -5 }}
      className="bg-white rounded-2xl p-6 shadow-lg border border-green-100 hover:shadow-xl transition-all text-center group"
    >
      <div className="w-20 h-20 rounded-full bg-gradient-to-r from-green-500 to-emerald-600 flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform shadow-md">
        <Icon size={32} className="text-white" />
      </div>
      <h3 className="text-lg font-bold text-green-900 mb-1">{name}</h3>
      <p className="text-xs font-bold text-green-500 uppercase tracking-wider mb-3">{role}</p>
      <p className="text-green-600 text-sm leading-relaxed">{description}</p>
    </motion.div>
  )
}

// ========== COMPOSANT VALEUR ==========
const ValueCard = ({ icon: Icon, title, description, delay }: any) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay }}
      whileHover={{ y: -5 }}
      className="bg-green-50 rounded-2xl p-6 border border-green-100 text-center group hover:bg-green-100 transition-all cursor-pointer"
    >
      <div className="w-14 h-14 rounded-full bg-gradient-to-r from-green-500 to-emerald-600 flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform">
        <Icon size={24} className="text-white" />
      </div>
      <h3 className="font-bold text-green-900 mb-2 text-lg">{title}</h3>
      <p className="text-green-600 text-sm leading-relaxed">{description}</p>
    </motion.div>
  )
}

// ========== COMPOSANT TIMELINE ==========
const TimelineItem = ({ year, title, description, delay }: any) => {
  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true }}
      transition={{ delay }}
      className="relative pl-8 pb-8 border-l-2 border-green-200 last:border-0"
    >
      <div className="absolute left-[-9px] top-0 w-4 h-4 rounded-full bg-gradient-to-r from-green-500 to-emerald-600" />
      <div className="mb-2">
        <span className="inline-block px-3 py-1 bg-green-100 text-green-700 rounded-full text-sm font-bold">
          {year}
        </span>
      </div>
      <h3 className="text-xl font-bold text-green-900 mb-2">{title}</h3>
      <p className="text-green-600">{description}</p>
    </motion.div>
  )
}

export default function AboutPage() {
  const [scrolled, setScrolled] = useState(false)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [user, setUser] = useState<any>(null)
  const [showUserMenu, setShowUserMenu] = useState(false)
  const [activeTab, setActiveTab] = useState('mission')
  const userMenuRef = React.useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll()
  const scaleX = useSpring(scrollYProgress, { stiffness: 100, damping: 30 })

  // Icône Heart personnalisée
  const HeartIcon = ({ size = 24, className = "" }: { size?: number, className?: string }) => (
    <svg className={className} width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
    </svg>
  )

  const team = [
    {
      name: "Développeur Web",
      role: "Architecture & Code",
      icon: Zap,
      description: "Conçoit l'infrastructure technique et assure la performance de la plateforme avec les dernières technologies."
    },
    {
      name: "Designer UI/UX",
      role: "Design & Expérience",
      icon: Star,
      description: "Crée des interfaces intuitives et une expérience utilisateur fluide pour tous les Camerounais."
    },
    {
      name: "Cyber Certifié",
      role: "Protection & Sécurité",
      icon: Shield,
      description: "Garantit la sécurité des transactions et la protection des données des utilisateurs."
    },
    {
      name: "Community Manager",
      role: "Marketing & Relations",
      icon: Users,
      description: "Développe les partenariats et anime la communauté WAKA à travers le Cameroun."
    }
  ]

  const values = [
    { icon: Zap, title: "Rapidité", description: "Livraison en moins de 45 minutes dans toute la ville" },
    { icon: Shield, title: "Fiabilité", description: "Service 24/7 avec un support client réactif" },
    { icon: Star, title: "Qualité", description: "Partenaires sélectionnés pour leur excellence" },
    { icon: HeartIcon, title: "Proximité", description: "Une équipe à l'écoute de vos besoins" },
    { icon: Globe, title: "Innovation", description: "Technologies modernes pour un service optimal" },
    { icon: Award, title: "Excellence", description: "Standards élevés de qualité de service" }
  ]

  const timeline = [
    {
      year: "2024",
      title: "Lancement officiel",
      description: "WAKA voit le jour à Douala avec une équipe passionnée et une vision claire."
    },
    {
      year: "2024",
      title: "Expansion à Yaoundé",
      description: "Extension rapide à la capitale politique pour servir plus de Camerounais."
    },
    {
      year: "2025",
      title: "100+ partenaires",
      description: "Atteinte de plus de 100 restaurants et commerces partenaires."
    },
    {
      year: "2025",
      title: "10,000 livraisons",
      description: "Franchissement du cap des 10,000 livraisons réussies."
    }
  ]

  const stats = [
    { value: "10,000+", label: "Livraisons effectuées", icon: Truck, color: "from-blue-500 to-cyan-500" },
    { value: "250+", label: "Partenaires", icon: Briefcase, color: "from-orange-500 to-red-500" },
    { value: "4.9/5", label: "Note moyenne", icon: Star, color: "from-yellow-500 to-amber-500" },
    { value: "24/7", label: "Service client", icon: Clock, color: "from-green-500 to-emerald-600" }
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
        <title>À propos | WAKA - Livraison ultra-rapide au Cameroun</title>
        <meta name="description" content="Découvrez l'histoire de WAKA, notre mission, notre vision et les valeurs qui nous guident pour révolutionner la livraison au Cameroun." />
        <meta name="keywords" content="waka, livraison cameroun, douala, yaoundé, histoire, mission, vision" />
        <meta name="author" content="WAKA Delivery Service" />
        <meta property="og:title" content="À propos | WAKA Delivery" />
        <meta property="og:description" content="Découvrez l'histoire de WAKA et notre mission pour révolutionner la livraison au Cameroun." />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://waka.cm/about" />
        <meta name="twitter:card" content="summary_large_image" />
        <link rel="canonical" href="https://waka.cm/about" />
      </Head>

      <div className="min-h-screen bg-white">
        {/* Progress Bar */}
        <motion.div
          className="fixed top-0 left-0 right-0 h-1 bg-gradient-to-r from-green-500 to-emerald-600 z-50"
          style={{ scaleX, transformOrigin: "0%" }}
        />

        {/* Header - Sans recherche ni panier */}
        <nav className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${scrolled ? 'bg-white/90 backdrop-blur-xl border-b border-green-100 shadow-sm' : 'bg-white border-b border-green-100'
          }`}>
          <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
            <Logo className="h-10 w-auto" />

            {/* Desktop Menu - Sans recherche ni panier */}
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
                    <ChevronDown size={16} className="text-green-600" />
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
                          <NavLink href="/favorites" icon={HeartIcon} label="Mes favoris" onClick={() => setShowUserMenu(false)} />
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

          {/* Mobile Menu - Sans recherche ni panier */}
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
                        <NavLink href="/favorites" icon={HeartIcon} label="Mes favoris" mobile={true} onClick={() => setMobileMenuOpen(false)} />
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
        <section className="relative bg-gradient-to-br from-green-50 via-white to-green-50 pt-32 pb-20 overflow-hidden">
          <div className="absolute inset-0 bg-[linear-gradient(45deg,rgba(34,197,94,0.02)_1px,transparent_1px)] bg-[size:40px_40px]" />
          <div className="absolute top-20 -right-40 w-96 h-96 bg-green-200 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob" />
          <div className="absolute bottom-20 -left-40 w-96 h-96 bg-yellow-200 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-2000" />

          <div className="max-w-7xl mx-auto px-6 text-center relative">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ type: "spring", delay: 0.2 }}
                className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-green-100 border border-green-200 mb-6"
              >
                <Target size={16} className="text-green-600" />
                <span className="text-sm font-medium text-green-700">Notre histoire</span>
              </motion.div>
              <h1 className="text-4xl md:text-6xl lg:text-7xl font-black text-green-900 mb-4">
                L'histoire de
                <br />
                <span className="bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent">
                  WAKA
                </span>
              </h1>
              <p className="text-green-600 text-lg md:text-xl max-w-2xl mx-auto">
                Une aventure camerounaise née de la volonté de simplifier la vie des citoyens
                à Douala et Yaoundé.
              </p>
            </motion.div>
          </div>
        </section>

        {/* Mission & Vision Tabs */}
        <section className="py-16">
          <div className="max-w-5xl mx-auto px-6">
            <div className="flex justify-center gap-4 mb-12">
              <button
                onClick={() => setActiveTab('mission')}
                className={`px-6 py-2 rounded-full font-medium transition-all ${activeTab === 'mission'
                    ? 'bg-gradient-to-r from-green-500 to-emerald-600 text-white shadow-md'
                    : 'bg-green-50 text-green-700 hover:bg-green-100'
                  }`}
              >
                Notre Mission
              </button>
              <button
                onClick={() => setActiveTab('vision')}
                className={`px-6 py-2 rounded-full font-medium transition-all ${activeTab === 'vision'
                    ? 'bg-gradient-to-r from-green-500 to-emerald-600 text-white shadow-md'
                    : 'bg-green-50 text-green-700 hover:bg-green-100'
                  }`}
              >
                Notre Vision
              </button>
            </div>

            <AnimatePresence mode="wait">
              {activeTab === 'mission' && (
                <motion.div
                  key="mission"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  className="text-center"
                >
                  <div className="flex justify-center mb-6">
                    <div className="w-24 h-24 rounded-2xl bg-gradient-to-r from-green-500 to-emerald-600 flex items-center justify-center">
                      <MissionIcon className="w-12 h-12 text-white" />
                    </div>
                  </div>
                  <h2 className="text-3xl md:text-4xl font-bold text-green-900 mb-4">
                    Simplifier la vie des Camerounais
                  </h2>
                  <p className="text-green-600 text-lg leading-relaxed max-w-3xl mx-auto">
                    Cette entreprise est née des idées novatrices de l'équipe <span className="font-bold text-green-700">WAKA</span>.
                    Notre mission est de simplifier la vie des Camerounais à Douala et Yaoundé en rendant
                    la livraison de courses et de repas accessible en un clic, 24h/24 et 7j/7.
                  </p>
                  <div className="flex flex-wrap justify-center gap-4 mt-8">
                    <div className="flex items-center gap-2 px-4 py-2 bg-green-50 rounded-full">
                      <MapPin size={14} className="text-green-500" />
                      <span className="text-sm font-medium text-green-700">Douala</span>
                    </div>
                    <div className="flex items-center gap-2 px-4 py-2 bg-green-50 rounded-full">
                      <MapPin size={14} className="text-green-500" />
                      <span className="text-sm font-medium text-green-700">Yaoundé</span>
                    </div>
                    <div className="flex items-center gap-2 px-4 py-2 bg-green-50 rounded-full">
                      <Calendar size={14} className="text-green-500" />
                      <span className="text-sm font-medium text-green-700">Depuis 2024</span>
                    </div>
                    <div className="flex items-center gap-2 px-4 py-2 bg-green-50 rounded-full">
                      <Clock size={14} className="text-green-500" />
                      <span className="text-sm font-medium text-green-700">Service 24/7</span>
                    </div>
                  </div>
                </motion.div>
              )}

              {activeTab === 'vision' && (
                <motion.div
                  key="vision"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  className="text-center"
                >
                  <div className="flex justify-center mb-6">
                    <div className="w-24 h-24 rounded-2xl bg-gradient-to-r from-green-500 to-emerald-600 flex items-center justify-center">
                      <VisionIcon className="w-12 h-12 text-white" />
                    </div>
                  </div>
                  <h2 className="text-3xl md:text-4xl font-bold text-green-900 mb-4">
                    Devenir leader de la livraison en Afrique
                  </h2>
                  <p className="text-green-600 text-lg leading-relaxed max-w-3xl mx-auto">
                    D'ici 2030, WAKA ambitionne de devenir la référence en matière de livraison
                    en Afrique centrale, en connectant des millions de consommateurs à des
                    commerces de qualité, tout en créant des emplois et en soutenant l'économie locale.
                  </p>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </section>

        {/* Timeline Section */}
        <section className="py-16 bg-gradient-to-b from-white via-green-50/30 to-white">
          <div className="max-w-4xl mx-auto px-6">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center mb-12"
            >
              <div className="flex items-center justify-center gap-3 mb-4">
                <div className="w-12 h-px bg-gradient-to-r from-transparent to-green-300" />
                <Calendar size={24} className="text-green-500" />
                <div className="w-12 h-px bg-gradient-to-l from-transparent to-green-300" />
              </div>
              <h2 className="text-3xl md:text-4xl font-bold text-green-900 mb-4">
                Notre parcours
              </h2>
              <p className="text-green-600 text-lg max-w-2xl mx-auto">
                Les étapes clés qui ont façonné WAKA
              </p>
            </motion.div>

            <div className="max-w-2xl mx-auto">
              {timeline.map((item, index) => (
                <TimelineItem key={index} {...item} delay={index * 0.1} />
              ))}
            </div>
          </div>
        </section>

        {/* Values Section */}
        <section className="py-16">
          <div className="max-w-7xl mx-auto px-6">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center mb-12"
            >
              <h2 className="text-3xl md:text-4xl font-bold text-green-900 mb-4">
                Nos valeurs fondamentales
              </h2>
              <p className="text-green-600 text-lg max-w-2xl mx-auto">
                Ce qui nous guide au quotidien
              </p>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {values.map((value, index) => (
                <ValueCard key={index} {...value} delay={index * 0.1} />
              ))}
            </div>
          </div>
        </section>

        {/* Team Section */}
        <section className="py-16 bg-gradient-to-b from-white via-green-50/30 to-white">
          <div className="max-w-7xl mx-auto px-6">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center mb-12"
            >
              <div className="flex items-center justify-center gap-3 mb-4">
                <div className="w-12 h-px bg-gradient-to-r from-transparent to-green-300" />
                <Users size={24} className="text-green-500" />
                <div className="w-12 h-px bg-gradient-to-l from-transparent to-green-300" />
              </div>
              <h2 className="text-3xl md:text-4xl font-bold text-green-900 mb-4">
                L'équipe de choc
              </h2>
              <p className="text-green-600 text-lg max-w-2xl mx-auto">
                Des passionnés unis par la même ambition
              </p>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {team.map((member, index) => (
                <TeamCard key={index} {...member} delay={index * 0.1} />
              ))}
            </div>
          </div>
        </section>

        {/* Stats Section */}
        <section className="py-20 bg-gradient-to-br from-green-900 to-emerald-900">
          <div className="max-w-7xl mx-auto px-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {stats.map((stat, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  whileHover={{ scale: 1.05 }}
                  className="text-center text-white"
                >
                  <div className={`w-20 h-20 rounded-full bg-gradient-to-r ${stat.color} flex items-center justify-center mx-auto mb-4 shadow-lg`}>
                    <stat.icon size={32} className="text-white" />
                  </div>
                  <div className="text-4xl md:text-5xl font-bold mb-2">{stat.value}</div>
                  <div className="text-green-200 font-medium">{stat.label}</div>
                </motion.div>
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
                Rejoignez l'aventure WAKA
              </h2>
              <p className="text-green-100 text-lg mb-8">
                Ensemble, réinventons la livraison au Cameroun
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link href="/contact">
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.98 }}
                    className="px-8 py-3 rounded-full bg-white text-green-600 font-bold shadow-lg hover:shadow-xl transition-all inline-flex items-center gap-2"
                  >
                    <Mail size={18} />
                    Nous contacter
                  </motion.button>
                </Link>
                <Link href="/services">
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.98 }}
                    className="px-8 py-3 rounded-full border-2 border-white text-white font-bold hover:bg-white/10 transition-all"
                  >
                    Découvrir nos services
                  </motion.button>
                </Link>
              </div>
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