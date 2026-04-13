"use client"

import React, { useState, useEffect } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import Head from 'next/head'
import { motion, AnimatePresence, useScroll, useSpring } from 'framer-motion'
import {
  MapPin, Clock, Send, MessageSquare, User, ChevronRight,
  CheckCircle, AlertCircle, Phone, Mail, Loader2,
  HelpCircle, Globe, Headphones, Sparkles,
  Home, Info, Coffee, Menu, X,
  LogOut, Settings, ChevronDown, Heart, Gift, Truck
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

// ========== COMPOSANT CARTE CONTACT ==========
const ContactCard = ({ icon: Icon, title, content, subContent, color, delay, onClick }: any) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay }}
      whileHover={{ y: -5 }}
      onClick={onClick}
      className={`bg-white rounded-2xl p-6 shadow-lg border border-green-100 hover:shadow-xl transition-all group ${onClick ? 'cursor-pointer' : ''}`}
    >
      <div className={`w-14 h-14 rounded-xl bg-gradient-to-r ${color} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}>
        <Icon size={28} className="text-white" />
      </div>
      <h3 className="text-xl font-bold text-green-900 mb-2">{title}</h3>
      <p className="text-green-700 font-medium mb-1">{content}</p>
      {subContent && <p className="text-green-500 text-sm">{subContent}</p>}
    </motion.div>
  )
}

// ========== COMPOSANT FAQ ==========
const FAQItem = ({ question, answer, isOpen, onToggle, index }: any) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1 }}
      className="border border-green-100 rounded-xl overflow-hidden"
    >
      <button
        onClick={onToggle}
        className="w-full px-6 py-4 flex justify-between items-center text-left bg-white hover:bg-green-50 transition-colors"
      >
        <div className="flex items-center gap-3">
          <HelpCircle size={20} className="text-green-500" />
          <span className="font-semibold text-green-900">{question}</span>
        </div>
        <ChevronRight
          size={20}
          className={`text-green-500 transition-transform duration-300 ${isOpen ? 'rotate-90' : ''}`}
        />
      </button>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="overflow-hidden"
          >
            <div className="px-6 py-4 bg-green-50/50 text-green-700 text-sm leading-relaxed">
              {answer}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  )
}

// ========== COMPOSANT TOAST NOTIFICATION ==========
const Toast = ({ message, type, onClose }: any) => {
  useEffect(() => {
    const timer = setTimeout(onClose, 5000)
    return () => clearTimeout(timer)
  }, [onClose])

  return (
    <motion.div
      initial={{ opacity: 0, x: 100 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: 100 }}
      className={`fixed bottom-4 right-4 z-50 flex items-center gap-3 px-4 py-3 rounded-lg shadow-lg ${type === 'success' ? 'bg-green-500' : 'bg-red-500'
        } text-white`}
    >
      {type === 'success' ? <CheckCircle size={20} /> : <AlertCircle size={20} />}
      <span className="text-sm font-medium">{message}</span>
    </motion.div>
  )
}

export default function ContactPage() {
  const [scrolled, setScrolled] = useState(false)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [user, setUser] = useState<any>(null)
  const [showUserMenu, setShowUserMenu] = useState(false)
  const userMenuRef = React.useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll()
  const scaleX = useSpring(scrollYProgress, { stiffness: 100, damping: 30 })

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  })
  const [formStatus, setFormStatus] = useState<'idle' | 'sending' | 'success' | 'error'>('idle')
  const [openFAQ, setOpenFAQ] = useState<number | null>(null)
  const [toast, setToast] = useState<{ message: string; type: 'success' | 'error' } | null>(null)

  const navLinks = [
    { name: 'Accueil', href: '/', icon: Home },
    { name: 'Services', href: '/services', icon: Coffee },
    { name: 'À propos', href: '/about', icon: Info },
    { name: 'Contact', href: '/contact', icon: MessageSquare },
    { name: 'Blog', href: '/blog', icon: Globe }
  ]

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setFormStatus('sending')

    try {
      await new Promise(resolve => setTimeout(resolve, 1500))

      if (formData.name && formData.email && formData.message) {
        setFormStatus('success')
        setToast({ message: 'Message envoyé avec succès ! Nous vous répondrons dans les 24h.', type: 'success' })
        setFormData({ name: '', email: '', subject: '', message: '' })

        setTimeout(() => {
          setFormStatus('idle')
        }, 3000)
      } else {
        throw new Error('Veuillez remplir tous les champs obligatoires')
      }
    } catch (error) {
      setFormStatus('error')
      setToast({ message: 'Erreur lors de l\'envoi. Veuillez réessayer.', type: 'error' })
      setTimeout(() => {
        setFormStatus('idle')
      }, 3000)
    }
  }

  const handlePhoneClick = () => {
    window.location.href = 'tel:+237621004286'
  }

  const handleEmailClick = () => {
    window.location.href = 'mailto:contact@waka.cm'
  }

  const faqs = [
    {
      question: "Comment puis-je passer une commande ?",
      answer: "Pour passer une commande, il vous suffit de sélectionner votre ville (Douala ou Yaoundé), choisir votre restaurant ou supermarché préféré, ajouter les articles à votre panier, puis valider votre commande. Vous recevrez une confirmation par SMS et email. Le suivi en temps réel vous permet de savoir où se trouve votre livreur."
    },
    {
      question: "Quels sont les délais de livraison ?",
      answer: "Nos délais de livraison varient entre 30 et 45 minutes selon votre localisation et l'heure de la commande. En heure de pointe (12h-14h et 19h-21h), le délai peut être légèrement plus long. Nous vous tenons informé en temps réel via l'application et par SMS. Vous pouvez suivre votre livreur sur une carte interactive."
    },
    {
      question: "Comment fonctionne le paiement ?",
      answer: "Nous acceptons plusieurs modes de paiement sécurisés : carte bancaire (Visa, Mastercard, American Express), Mobile Money (MTN Money, Orange Money, Free Money), et paiement à la livraison en espèces. Tous les paiements en ligne sont cryptés avec la technologie SSL et conformes aux normes PCI DSS."
    },
    {
      question: "Que faire en cas de problème avec ma commande ?",
      answer: "En cas de problème, contactez immédiatement notre service client via ce formulaire de contact, par téléphone au +237 621 004 286, ou via notre chat en ligne disponible 24h/24. Notre équipe s'engage à résoudre votre problème dans les plus brefs délais. Nous proposons également une garantie satisfait ou remboursé."
    },
    {
      question: "Comment devenir partenaire WAKA ?",
      answer: "Pour devenir partenaire, veuillez remplir le formulaire de contact en sélectionnant 'Partenariat' comme sujet. Notre équipe commerciale vous recontactera dans les 48h pour discuter des conditions et opportunités de collaboration. Nous recherchons des restaurants, supermarchés et commerces de qualité partageant nos valeurs d'excellence."
    },
    {
      question: "Puis-je modifier ou annuler ma commande ?",
      answer: "Vous pouvez modifier ou annuler votre commande dans les 5 premières minutes suivant sa validation via votre espace client. Après ce délai, la commande est en cours de préparation et ne peut plus être modifiée. Contactez notre service client pour toute assistance exceptionnelle."
    },
    {
      question: "Comment fonctionne la livraison ?",
      answer: "Une fois votre commande validée, un livreur est assigné et récupère vos articles auprès du commerçant. Vous recevez une notification avec le nom du livreur et un lien de suivi GPS. Vous pouvez communiquer directement avec le livreur via l'application. À la livraison, vous recevez un code de confirmation."
    }
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
        <title>Contact | WAKA - Livraison ultra-rapide au Cameroun</title>
        <meta name="description" content="Contactez l'équipe WAKA pour toute question, réclamation ou suggestion. Service client disponible 24h/24 à Douala et Yaoundé." />
        <meta name="keywords" content="contact waka, service client, livraison cameroun, support 24/7" />
        <meta name="author" content="WAKA Delivery Service" />
        <meta property="og:title" content="Contact | WAKA Delivery" />
        <meta property="og:description" content="Contactez notre équipe pour toute question ou assistance." />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://waka.cm/contact" />
        <meta name="twitter:card" content="summary_large_image" />
        <link rel="canonical" href="https://waka.cm/contact" />
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
                <Headphones size={16} className="text-green-600" />
                <span className="text-sm font-medium text-green-700">Support 24/7</span>
              </motion.div>
              <h1 className="text-4xl md:text-6xl font-black text-green-900 mb-4">
                Nous sommes à votre
                <br />
                <span className="bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent">
                  écoute
                </span>
              </h1>
              <p className="text-green-600 text-lg max-w-2xl mx-auto">
                Une question ? Un problème ? Notre équipe est là pour vous aider 24h/24 et 7j/7.
                Remplissez le formulaire ci-dessous ou contactez-nous directement.
              </p>
            </motion.div>
          </div>
        </section>

        {/* Toast Notifications */}
        <AnimatePresence>
          {toast && (
            <Toast
              message={toast.message}
              type={toast.type}
              onClose={() => setToast(null)}
            />
          )}
        </AnimatePresence>

        {/* Contact Cards */}
        <section className="py-12">
          <div className="max-w-7xl mx-auto px-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <ContactCard
                icon={Phone}
                title="Téléphone"
                content="+237 621 004 286"
                subContent="Lun-Ven: 8h-20h | Sam-Dim: 9h-18h"
                color="from-green-500 to-emerald-600"
                delay={0.1}
                onClick={handlePhoneClick}
              />
              <ContactCard
                icon={Mail}
                title="Email"
                content="contact@waka.cm"
                subContent="Réponse sous 24h maximum"
                color="from-yellow-400 to-amber-500"
                delay={0.2}
                onClick={handleEmailClick}
              />
              <ContactCard
                icon={MapPin}
                title="Bureau"
                content="Bonapriso, Douala"
                subContent="Cameroun"
                color="from-green-500 to-emerald-600"
                delay={0.3}
              />
            </div>
          </div>
        </section>

        {/* Form & Info Section */}
        <section className="py-12 pb-20">
          <div className="max-w-7xl mx-auto px-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
              {/* Formulaire */}
              <motion.div
                initial={{ opacity: 0, x: -30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.2 }}
                className="bg-white rounded-2xl shadow-xl border border-green-100 p-6 md:p-8"
              >
                <div className="flex items-center gap-2 mb-2">
                  <Sparkles size={24} className="text-green-500" />
                  <h2 className="text-2xl font-bold text-green-900">Envoyez-nous un message</h2>
                </div>
                <p className="text-green-600 mb-6">Nous vous répondrons dans les plus brefs délais</p>

                <form onSubmit={handleSubmit} className="space-y-5">
                  <div>
                    <label className="block text-sm font-medium text-green-700 mb-2">
                      Nom complet <span className="text-red-500">*</span>
                    </label>
                    <div className="relative">
                      <User size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-green-400" />
                      <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        required
                        className="w-full pl-10 pr-4 py-3 border border-green-200 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent outline-none transition-all"
                        placeholder="Jean Dupont"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-green-700 mb-2">
                      Email <span className="text-red-500">*</span>
                    </label>
                    <div className="relative">
                      <Mail size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-green-400" />
                      <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                        className="w-full pl-10 pr-4 py-3 border border-green-200 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent outline-none transition-all"
                        placeholder="jean@exemple.com"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-green-700 mb-2">
                      Sujet <span className="text-red-500">*</span>
                    </label>
                    <select
                      name="subject"
                      value={formData.subject}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 border border-green-200 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent outline-none transition-all bg-white"
                    >
                      <option value="">Sélectionnez un sujet</option>
                      <option value="question">Question sur les commandes</option>
                      <option value="probleme">Problème avec une commande</option>
                      <option value="partenariat">Demande de partenariat</option>
                      <option value="suggestion">Suggestion ou réclamation</option>
                      <option value="autre">Autre</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-green-700 mb-2">
                      Message <span className="text-red-500">*</span>
                    </label>
                    <textarea
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      required
                      rows={5}
                      className="w-full px-4 py-3 border border-green-200 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent outline-none transition-all resize-none"
                      placeholder="Décrivez votre demande en détail..."
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={formStatus === 'sending'}
                    className="w-full py-3 rounded-lg bg-gradient-to-r from-green-500 to-emerald-600 text-white font-bold hover:shadow-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                  >
                    {formStatus === 'sending' ? (
                      <>
                        <Loader2 size={18} className="animate-spin" />
                        Envoi en cours...
                      </>
                    ) : formStatus === 'success' ? (
                      <>
                        <CheckCircle size={18} />
                        Message envoyé !
                      </>
                    ) : (
                      <>
                        <Send size={18} />
                        Envoyer le message
                      </>
                    )}
                  </button>
                </form>
              </motion.div>

              {/* Horaires & Réseaux */}
              <motion.div
                initial={{ opacity: 0, x: 30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.3 }}
                className="space-y-6"
              >
                <div className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-2xl p-6 border border-green-100">
                  <div className="flex items-center gap-2 mb-4">
                    <Clock size={24} className="text-green-600" />
                    <h3 className="text-xl font-bold text-green-900">Horaires d'ouverture</h3>
                  </div>
                  <div className="space-y-3">
                    <div className="flex justify-between items-center py-2 border-b border-green-200">
                      <span className="text-green-700">Lundi - Vendredi</span>
                      <span className="font-semibold text-green-900">08:00 - 20:00</span>
                    </div>
                    <div className="flex justify-between items-center py-2 border-b border-green-200">
                      <span className="text-green-700">Samedi</span>
                      <span className="font-semibold text-green-900">09:00 - 18:00</span>
                    </div>
                    <div className="flex justify-between items-center py-2">
                      <span className="text-green-700">Dimanche</span>
                      <span className="font-semibold text-green-900">09:00 - 14:00</span>
                    </div>
                  </div>
                </div>

                <div className="bg-white rounded-2xl p-6 border border-green-100 shadow-lg">
                  <h3 className="text-xl font-bold text-green-900 mb-4">Suivez-nous</h3>
                  <p className="text-green-600 text-sm mb-4">
                    Restez connecté avec WAKA sur les réseaux sociaux
                  </p>
                  <div className="flex gap-3 flex-wrap">
                    <a href="#" className="w-12 h-12 rounded-full bg-green-50 flex items-center justify-center hover:bg-green-100 transition-all group hover:scale-110">
                      <SocialIcons.Facebook className="w-5 h-5 text-green-600 group-hover:scale-110 transition-transform" />
                    </a>
                    <a href="#" className="w-12 h-12 rounded-full bg-green-50 flex items-center justify-center hover:bg-green-100 transition-all group hover:scale-110">
                      <SocialIcons.Twitter className="w-5 h-5 text-green-600 group-hover:scale-110 transition-transform" />
                    </a>
                    <a href="#" className="w-12 h-12 rounded-full bg-green-50 flex items-center justify-center hover:bg-green-100 transition-all group hover:scale-110">
                      <SocialIcons.Instagram className="w-5 h-5 text-green-600 group-hover:scale-110 transition-transform" />
                    </a>
                    <a href="#" className="w-12 h-12 rounded-full bg-green-50 flex items-center justify-center hover:bg-green-100 transition-all group hover:scale-110">
                      <SocialIcons.Linkedin className="w-5 h-5 text-green-600 group-hover:scale-110 transition-transform" />
                    </a>
                    <a href="#" className="w-12 h-12 rounded-full bg-green-50 flex items-center justify-center hover:bg-green-100 transition-all group hover:scale-110">
                      <SocialIcons.Youtube className="w-5 h-5 text-green-600 group-hover:scale-110 transition-transform" />
                    </a>
                    <a href="#" className="w-12 h-12 rounded-full bg-green-50 flex items-center justify-center hover:bg-green-100 transition-all group hover:scale-110">
                      <SocialIcons.Tiktok className="w-5 h-5 text-green-600 group-hover:scale-110 transition-transform" />
                    </a>
                  </div>
                </div>

                <div className="bg-gradient-to-r from-green-500 to-emerald-600 rounded-2xl p-6 text-white">
                  <div className="flex items-center gap-2 mb-2">
                    <Globe size={24} />
                    <h3 className="text-xl font-bold">Service client prioritaire</h3>
                  </div>
                  <p className="text-green-100 text-sm mb-4">
                    Pour toute urgence, appelez-nous directement
                  </p>
                  <button
                    onClick={handlePhoneClick}
                    className="flex items-center gap-3 bg-white/20 backdrop-blur-sm rounded-xl p-3 w-full hover:bg-white/30 transition-all"
                  >
                    <Phone size={20} />
                    <span className="text-lg font-bold">+237 621 004 286</span>
                  </button>
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* FAQ Section */}
        <section className="py-20 bg-gradient-to-b from-white via-green-50/30 to-white">
          <div className="max-w-4xl mx-auto px-6">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center mb-12"
            >
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-green-100 mb-4">
                <HelpCircle size={16} className="text-green-600" />
                <span className="text-sm font-medium text-green-700">FAQ</span>
              </div>
              <h2 className="text-4xl md:text-5xl font-bold text-green-900 mb-4">
                Foire aux questions
              </h2>
              <p className="text-green-600 text-lg">
                Les réponses à vos questions les plus fréquentes
              </p>
            </motion.div>

            <div className="space-y-3">
              {faqs.map((faq, index) => (
                <FAQItem
                  key={index}
                  question={faq.question}
                  answer={faq.answer}
                  isOpen={openFAQ === index}
                  onToggle={() => setOpenFAQ(openFAQ === index ? null : index)}
                  index={index}
                />
              ))}
            </div>
          </div>
        </section>

        {/* Map Section */}
        <section className="py-12">
          <div className="max-w-7xl mx-auto px-6">
            <div className="bg-green-50 rounded-2xl overflow-hidden border border-green-100 shadow-lg">
              <div className="p-6 text-center border-b border-green-100">
                <h3 className="text-xl font-bold text-green-900">Notre emplacement</h3>
                <p className="text-green-600 text-sm">Bonapriso, Douala - Cameroun</p>
              </div>
              <div className="h-96 bg-green-100 relative">
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3979.858765383637!2d9.701640014769228!3d4.051828797204425!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x1061127b2c21bb3b%3A0x9e4b2b7b8e4c3c3!2sBonapriso%2C%20Douala%2C%20Cameroun!5e0!3m2!1sfr!2sfr!4v1700000000000!5m2!1sfr!2sfr"
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  className="grayscale hover:grayscale-0 transition-all duration-500"
                  title="WAKA Location Map"
                />
              </div>
            </div>
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
                  <li><Link href="/contact" className="text-green-600 text-sm hover:text-green-500 transition-colors flex items-center gap-2"><MessageSquare size={14} /> Contact</Link></li>
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