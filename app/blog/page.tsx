"use client"

import React, { useState, useEffect } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import Head from 'next/head'
import { motion, AnimatePresence, useScroll, useSpring } from 'framer-motion'
import {
  Calendar, User, Clock, ChevronRight, Search,
  Heart, Share2, Bookmark, ArrowRight, Phone, Mail,
  TrendingUp, Coffee, Zap, Award, MessageCircle,
  Home, Info, MapPin, Truck, Gift, Menu, X,
  LogOut, Settings, ChevronDown, Globe, Sparkles
} from 'lucide-react'

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
// ========== COMPOSANT NAV LINK (CORRIGÉ) ==========
const NavLink = ({ href, icon: Icon, label, mobile = false, onClick }: any) => {
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
      href={href}
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

// ========== COMPOSANT ARTICLE CARD ==========
const ArticleCard = ({ article, index }: any) => {
  const [liked, setLiked] = useState(false)
  const [saved, setSaved] = useState(false)
  const [imageError, setImageError] = useState(false)
  const fallbackImage = "/images/blog/fallback.jpg"

  return (
    <motion.article
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.1 }}
      whileHover={{ y: -5 }}
      className="bg-white rounded-2xl overflow-hidden shadow-lg border border-green-100 hover:shadow-xl transition-all duration-300 group"
    >
      <div className="relative h-56 overflow-hidden">
        <Image
          src={imageError ? fallbackImage : article.image}
          alt={article.title}
          fill
          className="object-cover transition-transform duration-500 group-hover:scale-110"
          onError={() => setImageError(true)}
        />
        <div className="absolute top-4 left-4">
          <span className="px-3 py-1 bg-white/90 backdrop-blur-sm rounded-full text-xs font-medium text-green-600">
            {article.category}
          </span>
        </div>
      </div>

      <div className="p-6">
        <div className="flex items-center gap-4 text-xs text-green-500 mb-3">
          <span className="flex items-center gap-1">
            <Calendar size={12} />
            {article.date}
          </span>
          <span className="flex items-center gap-1">
            <User size={12} />
            {article.author}
          </span>
          <span className="flex items-center gap-1">
            <Clock size={12} />
            {article.readTime}
          </span>
        </div>

        <h3 className="text-xl font-bold text-green-900 mb-2 line-clamp-2">
          {article.title}
        </h3>

        <p className="text-green-600 text-sm mb-4 line-clamp-3">
          {article.excerpt}
        </p>

        <div className="flex items-center justify-between pt-4 border-t border-green-100">
          <Link href={`/blog/${article.slug}`}>
            <button className="text-green-600 text-sm font-medium hover:text-green-500 transition-colors flex items-center gap-1 group">
              Lire la suite
              <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
            </button>
          </Link>

          <div className="flex items-center gap-3">
            <button
              onClick={() => setLiked(!liked)}
              className={`transition-colors ${liked ? 'text-red-500' : 'text-green-400 hover:text-red-500'}`}
              aria-label="J'aime"
            >
              <Heart size={18} fill={liked ? "currentColor" : "none"} />
            </button>
            <button
              onClick={() => setSaved(!saved)}
              className={`transition-colors ${saved ? 'text-yellow-500' : 'text-green-400 hover:text-yellow-500'}`}
              aria-label="Sauvegarder"
            >
              <Bookmark size={18} fill={saved ? "currentColor" : "none"} />
            </button>
            <button className="text-green-400 hover:text-green-500 transition-colors" aria-label="Partager">
              <Share2 size={18} />
            </button>
          </div>
        </div>
      </div>
    </motion.article>
  )
}

// ========== COMPOSANT CATEGORY BADGE ==========
const CategoryBadge = ({ name, count, active, onClick }: any) => {
  return (
    <button
      onClick={onClick}
      className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${active
        ? 'bg-gradient-to-r from-green-500 to-emerald-600 text-white shadow-md'
        : 'bg-green-50 text-green-700 hover:bg-green-100'
        }`}
    >
      {name} {count && `(${count})`}
    </button>
  )
}

export default function BlogPage() {
  const [scrolled, setScrolled] = useState(false)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [user, setUser] = useState<any>(null)
  const [showUserMenu, setShowUserMenu] = useState(false)
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('all')
  const [newsletterEmail, setNewsletterEmail] = useState('')
  const [newsletterStatus, setNewsletterStatus] = useState<'idle' | 'sending' | 'success' | 'error'>('idle')
  const userMenuRef = React.useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll()
  const scaleX = useSpring(scrollYProgress, { stiffness: 100, damping: 30 })

  const categories = [
    { name: 'Tous', slug: 'all', count: 12 },
    { name: 'Actualités', slug: 'news', count: 4 },
    { name: 'Conseils', slug: 'tips', count: 3 },
    { name: 'Partenaires', slug: 'partners', count: 2 },
    { name: 'Technologie', slug: 'tech', count: 2 },
    { name: 'Événements', slug: 'events', count: 1 }
  ]

  const articles = [
    {
      id: 1,
      slug: 'waka-lancement-douala',
      title: 'WAKA arrive à Douala ! Découvrez notre nouveau service',
      excerpt: 'Nous sommes fiers d\'annoncer le lancement de WAKA dans la capitale économique du Cameroun. Découvrez tous nos services et offres exclusives.',
      category: 'Actualités',
      categorySlug: 'news',
      date: '15 Mars 2024',
      author: 'Équipe WAKA',
      readTime: '3 min de lecture',
      image: '/images/blog/douala-launch.jpg'
    },
    {
      id: 2,
      slug: 'astuces-livraison-express',
      title: '5 astuces pour optimiser votre livraison express',
      excerpt: 'Découvrez nos meilleurs conseils pour recevoir vos commandes encore plus rapidement et profiter pleinement du service WAKA.',
      category: 'Conseils',
      categorySlug: 'tips',
      date: '10 Mars 2024',
      author: 'Marie N.',
      readTime: '5 min de lecture',
      image: '/images/blog/delivery-tips.jpg'
    },
    {
      id: 3,
      slug: 'partenariat-restaurants-yaounde',
      title: 'Nos nouveaux partenaires restaurants à Yaoundé',
      excerpt: 'WAKA s\'associe aux meilleurs restaurants de Yaoundé pour vous offrir une expérience culinaire exceptionnelle.',
      category: 'Partenaires',
      categorySlug: 'partners',
      date: '5 Mars 2024',
      author: 'Jean-Paul K.',
      readTime: '4 min de lecture',
      image: '/images/blog/restaurant-partners.jpg'
    },
    {
      id: 4,
      slug: 'technologie-livraison-gps',
      title: 'La technologie derrière WAKA : suivi GPS en temps réel',
      excerpt: 'Plongez dans les coulisses technologiques de WAKA et découvrez comment nous assurons un suivi précis de vos livraisons.',
      category: 'Technologie',
      categorySlug: 'tech',
      date: '28 Février 2024',
      author: 'Tech Team',
      readTime: '6 min de lecture',
      image: '/images/blog/gps-tracking.jpg'
    },
    {
      id: 5,
      slug: 'evenement-waka-day',
      title: 'WAKA Day : Célébrons ensemble la livraison moderne',
      excerpt: 'Rejoignez-nous pour notre premier événement dédié à la célébration de la livraison moderne au Cameroun.',
      category: 'Événements',
      categorySlug: 'events',
      date: '20 Février 2024',
      author: 'Équipe Événements',
      readTime: '2 min de lecture',
      image: '/images/blog/waka-day.jpg'
    },
    {
      id: 6,
      slug: 'top-10-plats-commandes',
      title: 'Top 10 des plats les plus commandés sur WAKA',
      excerpt: 'Découvrez les plats préférés des Camerounais et laissez-vous tenter par nos suggestions culinaires.',
      category: 'Conseils',
      categorySlug: 'tips',
      date: '15 Février 2024',
      author: 'Marie N.',
      readTime: '4 min de lecture',
      image: '/images/blog/top-dishes.jpg'
    }
  ]

  const navLinks = [
    { name: 'Accueil', href: '/', icon: Home },
    { name: 'Services', href: '/services', icon: Coffee },
    { name: 'À propos', href: '/about', icon: Info },
    { name: 'Contact', href: '/contact', icon: MessageCircle },
    { name: 'Blog', href: '/blog', icon: Globe }
  ]

  const filteredArticles = articles.filter(article => {
    const matchesSearch = article.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      article.excerpt.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesCategory = selectedCategory === 'all' || article.categorySlug === selectedCategory
    return matchesSearch && matchesCategory
  })

  const featuredArticles = articles.slice(0, 2)

  const handleNewsletterSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!newsletterEmail) return

    setNewsletterStatus('sending')
    try {
      await new Promise(resolve => setTimeout(resolve, 1000))
      setNewsletterStatus('success')
      setNewsletterEmail('')
      setTimeout(() => setNewsletterStatus('idle'), 3000)
    } catch (error) {
      setNewsletterStatus('error')
      setTimeout(() => setNewsletterStatus('idle'), 3000)
    }
  }

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
        <title>Blog | WAKA - Actualités et conseils sur la livraison au Cameroun</title>
        <meta name="description" content="Découvrez les dernières actualités, conseils et événements de WAKA, la première plateforme de livraison ultra-rapide au Cameroun." />
        <meta name="keywords" content="blog waka, actualités cameroun, livraison douala, livraison yaoundé, conseils livraison" />
        <meta name="author" content="WAKA Delivery Service" />
        <meta property="og:title" content="Blog | WAKA Delivery" />
        <meta property="og:description" content="Découvrez les dernières actualités et conseils de WAKA." />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://waka.cm/blog" />
        <meta name="twitter:card" content="summary_large_image" />
        <link rel="canonical" href="https://waka.cm/blog" />
      </Head>

      <div className="min-h-screen bg-white">
        {/* Progress Bar */}
        <motion.div
          className="fixed top-0 left-0 right-0 h-1 bg-gradient-to-r from-green-500 to-emerald-600 z-50"
          style={{ scaleX, transformOrigin: "0%" }}
        />

        {/* Header - Sans recherche ni panier dans la navbar */}
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

        {/* Hero Section - Garde la barre de recherche dans le contenu */}
        <section className="relative pt-32 pb-16 bg-gradient-to-br from-green-50 via-white to-green-50 overflow-hidden">
          <div className="absolute inset-0 bg-[linear-gradient(45deg,rgba(34,197,94,0.02)_1px,transparent_1px)] bg-[size:40px_40px]" />
          <div className="absolute top-20 -right-40 w-96 h-96 bg-green-200 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob" />
          <div className="absolute bottom-20 -left-40 w-96 h-96 bg-yellow-200 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-2000" />

          <div className="max-w-7xl mx-auto px-6">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-center max-w-3xl mx-auto relative"
            >
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ type: "spring", delay: 0.2 }}
                className="inline-flex items-center gap-2 bg-green-100 px-4 py-2 rounded-full mb-6"
              >
                <TrendingUp size={16} className="text-green-600" />
                <span className="text-sm font-medium text-green-700">Blog & Actualités</span>
              </motion.div>

              <h1 className="text-5xl md:text-6xl font-black tracking-tighter mb-6">
                Dernières actualités
                <br />
                <span className="bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent">
                  et conseils WAKA
                </span>
              </h1>

              <p className="text-green-600 text-lg mb-8">
                Restez informé des dernières nouveautés, astuces et événements
                de la première plateforme de livraison au Cameroun.
              </p>

              {/* Barre de recherche dans le contenu (conservée) */}
              <div className="relative max-w-md mx-auto">
                <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-green-400" size={20} />
                <input
                  type="text"
                  placeholder="Rechercher un article..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-12 pr-4 py-3 rounded-full border border-green-200 focus:ring-2 focus:ring-green-500 focus:border-transparent outline-none bg-white/80 backdrop-blur-sm"
                />
              </div>
            </motion.div>
          </div>
        </section>

        {/* Featured Articles */}
        <section className="py-12 bg-white">
          <div className="max-w-7xl mx-auto px-6">
            <h2 className="text-3xl font-bold text-green-900 mb-8">Articles à la une</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {featuredArticles.map((article, index) => (
                <motion.div
                  key={article.id}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.2 }}
                  className="group relative h-96 rounded-2xl overflow-hidden cursor-pointer"
                >
                  <Image
                    src={article.image}
                    alt={article.title}
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />
                  <div className="absolute bottom-0 left-0 right-0 p-8 text-white">
                    <span className="inline-block px-3 py-1 bg-green-500 rounded-full text-xs font-medium mb-3">
                      {article.category}
                    </span>
                    <h3 className="text-2xl font-bold mb-2">{article.title}</h3>
                    <p className="text-white/80 text-sm mb-4 line-clamp-2">{article.excerpt}</p>
                    <Link href={`/blog/${article.slug}`}>
                      <button className="text-white font-medium flex items-center gap-2 group-hover:gap-3 transition-all">
                        Lire la suite
                        <ArrowRight size={16} />
                      </button>
                    </Link>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Categories & Articles Grid */}
        <section className="py-12 bg-white">
          <div className="max-w-7xl mx-auto px-6">
            {/* Categories */}
            <div className="flex flex-wrap gap-3 mb-12">
              {categories.map((category) => (
                <CategoryBadge
                  key={category.slug}
                  name={category.name}
                  count={category.count}
                  active={selectedCategory === category.slug}
                  onClick={() => setSelectedCategory(category.slug)}
                />
              ))}
            </div>

            {/* Articles Grid */}
            {filteredArticles.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {filteredArticles.map((article, index) => (
                  <ArticleCard key={article.id} article={article} index={index} />
                ))}
              </div>
            ) : (
              <div className="text-center py-12">
                <p className="text-green-600">Aucun article trouvé pour cette recherche.</p>
              </div>
            )}
          </div>
        </section>

        {/* Newsletter Section */}
        <section className="py-20 bg-gradient-to-r from-green-500 to-emerald-600">
          <div className="max-w-4xl mx-auto px-6 text-center">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <div className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-sm px-4 py-2 rounded-full mb-6">
                <Sparkles size={16} className="text-white" />
                <span className="text-sm font-medium text-white">Newsletter</span>
              </div>
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
                Ne manquez aucune actualité
              </h2>
              <p className="text-green-100 text-lg mb-8">
                Inscrivez-vous à notre newsletter pour recevoir nos derniers articles et offres exclusives
              </p>
              <form onSubmit={handleNewsletterSubmit} className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
                <input
                  type="email"
                  placeholder="Votre adresse email"
                  value={newsletterEmail}
                  onChange={(e) => setNewsletterEmail(e.target.value)}
                  required
                  className="flex-1 px-4 py-3 rounded-full border-0 focus:ring-2 focus:ring-white outline-none"
                />
                <button
                  type="submit"
                  disabled={newsletterStatus === 'sending'}
                  className="px-6 py-3 rounded-full bg-white text-green-600 font-bold hover:shadow-lg transition-all disabled:opacity-50"
                >
                  {newsletterStatus === 'sending' ? 'Envoi...' : "S'inscrire"}
                </button>
              </form>
              {newsletterStatus === 'success' && (
                <p className="text-green-100 text-sm mt-4">✓ Inscription réussie !</p>
              )}
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
          .line-clamp-2 {
            display: -webkit-box;
            -webkit-line-clamp: 2;
            -webkit-box-orient: vertical;
            overflow: hidden;
          }
          .line-clamp-3 {
            display: -webkit-box;
            -webkit-line-clamp: 3;
            -webkit-box-orient: vertical;
            overflow: hidden;
          }
        `}</style>
      </div>
    </>
  )
}