"use client"

import React, { useState, useEffect } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import Head from 'next/head'
import { motion, AnimatePresence, useScroll, useSpring, Variants } from 'framer-motion'
import {
  Coffee, Truck, Clock, ShieldCheck, Star, Award, Zap,
  CreditCard, Headphones, Gift, Sparkles,
  MapPin, ChevronRight, Phone, Mail, ArrowRight, Heart, Users,
  CheckCircle, Store, Bike, Utensils, ShoppingCart,
  Home, Info, MessageCircle, Globe, Menu, X, User,
  LogOut, Settings, Package, Newspaper
} from 'lucide-react'

// ========== COMPOSANTS DE STRUCTURE (LOGO AGRANDI) ==========
const Logo = ({ className = "h-8 w-auto" }) => (
  <Link href="/" className="flex items-center gap-2 group">
    <Image src="/images/logo.png" alt="WAKA Logo" width={200} height={500} className={`${className} object-contain transition-all duration-300 group-hover:scale-105`} priority />
  </Link>
)

// Composant Navbar flottante avec logo AGRANDI
const FloatingNavbar = () => {
  const [scrolled, setScrolled] = useState(false)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [activeLink, setActiveLink] = useState('/services')

  const navLinks = [
    { name: 'Accueil', href: '/', icon: Home },
    { name: 'Blog', href: '/blog', icon: Newspaper },
    { name: 'Devenir Partenaire', href: '/devenir-partenaire', icon: Store },
    { name: 'Devenir Livreur', href: '/recrutement-livreur', icon: Bike },
    { name: 'Services', href: '/services', icon: Coffee },
    { name: 'À propos', href: '/about', icon: Info },
    { name: 'Contact', href: '/contact', icon: MessageCircle },
  ]

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50)
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = 'unset'
    }
    return () => {
      document.body.style.overflow = 'unset'
    }
  }, [mobileMenuOpen])

  const menuVariants: Variants = {
    closed: {
      opacity: 0,
      x: '100%',
      transition: {
        type: 'spring',
        stiffness: 400,
        damping: 40,
      }
    },
    open: {
      opacity: 1,
      x: 0,
      transition: {
        type: 'spring',
        stiffness: 400,
        damping: 40,
        staggerChildren: 0.1,
        delayChildren: 0.2,
      }
    }
  }

  const menuItemVariants: Variants = {
    closed: { opacity: 0, x: 50 },
    open: { opacity: 1, x: 0 }
  }

  return (
    <>
      {/* Navbar flottante */}
      <motion.nav
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ type: 'spring', stiffness: 100, damping: 20 }}
        className={`fixed top-4 left-4 right-4 z-50 transition-all duration-500 rounded-2xl ${scrolled
          ? 'bg-white/95 backdrop-blur-xl shadow-2xl border border-white/20'
          : 'bg-white/80 backdrop-blur-md shadow-lg border border-white/30'
          }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-3 flex justify-between items-center">
          {/* Logo AGRANDI dans la navbar */}
          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
            <Logo className="h-12 w-auto md:h-16" />
          </motion.div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-1 lg:gap-2">
            {navLinks.map((link) => (
              <Link key={link.name} href={link.href}>
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className={`relative px-4 py-2 rounded-xl transition-all duration-300 cursor-pointer group ${activeLink === link.href
                    ? 'text-emerald-600'
                    : 'text-gray-600 hover:text-emerald-600'
                    }`}
                  onClick={() => setActiveLink(link.href)}
                >
                  <div className="flex items-center gap-2">
                    <link.icon size={16} className="transition-transform group-hover:scale-110" />
                    <span className="text-sm font-bold uppercase tracking-tighter">{link.name}</span>
                  </div>
                  {activeLink === link.href && (
                    <motion.div
                      layoutId="activeIndicator"
                      className="absolute bottom-0 left-4 right-4 h-0.5 bg-gradient-to-r from-emerald-500 to-green-500 rounded-full"
                      transition={{ type: 'spring', stiffness: 500, damping: 30 }}
                    />
                  )}
                </motion.div>
              </Link>
            ))}
          </div>

          {/* Mobile Menu Button - Hamburger animé */}
          <motion.button
            whileTap={{ scale: 0.9 }}
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden relative w-10 h-10 rounded-xl bg-gradient-to-br from-emerald-500 to-green-500 shadow-lg flex items-center justify-center z-50"
          >
            <motion.div
              animate={mobileMenuOpen ? "open" : "closed"}
              className="relative w-5 h-5"
            >
              <motion.span
                variants={{
                  closed: { rotate: 0, y: -6 },
                  open: { rotate: 45, y: 0 }
                }}
                transition={{ duration: 0.3 }}
                className="absolute top-0 left-0 w-5 h-0.5 bg-white rounded-full"
              />
              <motion.span
                variants={{
                  closed: { opacity: 1 },
                  open: { opacity: 0 }
                }}
                transition={{ duration: 0.3 }}
                className="absolute top-2 left-0 w-5 h-0.5 bg-white rounded-full"
              />
              <motion.span
                variants={{
                  closed: { rotate: 0, y: 6 },
                  open: { rotate: -45, y: 0 }
                }}
                transition={{ duration: 0.3 }}
                className="absolute top-4 left-0 w-5 h-0.5 bg-white rounded-full"
              />
            </motion.div>
          </motion.button>
        </div>
      </motion.nav>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              onClick={() => setMobileMenuOpen(false)}
              className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40 md:hidden"
            />

            {/* Menu Panel */}
            <motion.div
              variants={menuVariants}
              initial="closed"
              animate="open"
              exit="closed"
              className="fixed top-0 right-0 bottom-0 w-full max-w-sm bg-white z-40 md:hidden shadow-2xl"
            >
              {/* Header du menu mobile avec logo AGRANDI */}
              <div className="flex justify-between items-center p-6 border-b border-gray-100">
                <Logo className="h-12 w-auto" />
                <motion.button
                  whileTap={{ scale: 0.9 }}
                  onClick={() => setMobileMenuOpen(false)}
                  className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center"
                >
                  <X size={20} className="text-gray-600" />
                </motion.button>
              </div>

              {/* Navigation Links */}
              <div className="flex-1 py-8 px-6">
                <div className="space-y-2">
                  {navLinks.map((link) => (
                    <motion.div
                      key={link.name}
                      variants={menuItemVariants}
                      whileTap={{ scale: 0.95 }}
                    >
                      <Link
                        href={link.href}
                        onClick={() => {
                          setActiveLink(link.href)
                          setMobileMenuOpen(false)
                        }}
                        className={`flex items-center gap-4 px-4 py-4 rounded-xl transition-all duration-300 group ${activeLink === link.href
                          ? 'bg-gradient-to-r from-emerald-50 to-green-50 text-emerald-600'
                          : 'text-gray-700 hover:bg-gray-50'
                          }`}
                      >
                        <div className={`w-10 h-10 rounded-xl flex items-center justify-center transition-all ${activeLink === link.href
                          ? 'bg-gradient-to-r from-emerald-500 to-green-500 text-white shadow-lg'
                          : 'bg-gray-100 text-gray-500 group-hover:bg-emerald-100'
                          }`}>
                          <link.icon size={20} />
                        </div>
                        <span className="font-bold text-base">{link.name}</span>
                        {activeLink === link.href && (
                          <ChevronRight size={18} className="ml-auto text-emerald-500" />
                        )}
                      </Link>
                    </motion.div>
                  ))}
                </div>

                {/* Séparateur */}
                <div className="my-8 h-px bg-gradient-to-r from-transparent via-gray-200 to-transparent" />

                {/* Infos contact rapides */}
                <motion.div variants={menuItemVariants} className="p-4 bg-gray-50 rounded-xl">
                  <p className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-3">Contact rapide</p>
                  <div className="space-y-2">
                    <div className="flex items-center gap-2 text-sm text-gray-600">
                      <Phone size={14} className="text-emerald-500" />
                      <span>+237 621 004 286</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm text-gray-600">
                      <Mail size={14} className="text-emerald-500" />
                      <span>contact@waka.cm</span>
                    </div>
                  </div>
                </motion.div>
              </div>

              {/* Footer du menu */}
              <div className="p-6 border-t border-gray-100">
                <p className="text-center text-xs text-gray-400">
                  © 2024 WAKA Delivery Service
                </p>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  )
}

export default function ServicesPage() {
  const { scrollYProgress } = useScroll()
  const scaleX = useSpring(scrollYProgress, { stiffness: 100, damping: 30 })

  const services = [
    {
      icon: Utensils,
      title: "Restaurants Locaux",
      description: "Tes plats préférés livrés en un clic.",
      features: ["Petits restaurants de quartier", "Grands Maîtres de la cuisine", "Prêt en 30-45 minutes", "Ndolé, Burgers, Grillades"],
      color: "from-orange-500 to-red-500",
      cta: "Voir les restos"
    },
    {
      icon: ShoppingCart,
      title: "Supermarchés",
      description: "Tes courses sans bouger de la maison.",
      features: ["Produits frais garantis", "Prix rayon identiques", "Livraison gros volumes", "Épicerie et produits ménagers"],
      color: "from-emerald-500 to-green-600",
      cta: "Faire mes courses"
    },
    {
      icon: Gift,
      title: "WAKA Fidélité",
      description: "Chaque commande te rapporte de l'argent.",
      features: ["1000 FCFA = 1 Point", "Livraison offerte à 20 points", "Bonus de parrainage (500F)", "Accès aux offres VIP"],
      color: "from-yellow-400 to-amber-600",
      cta: "Voir mes points"
    },
    {
      icon: Bike,
      title: "Livraison Express",
      description: "Pour tes colis urgents en ville.",
      features: ["Livreurs identifiés (CNI)", "Suivi GPS en temps réel", "Tarifs fixes par zone", "Disponible 7j/7"],
      color: "from-blue-500 to-indigo-600",
      cta: "Envoyer un colis"
    }
  ]

  return (
    <>
      <Head><title>Services WAKA | Tu commandes, WAKA livre.</title></Head>

      <div className="min-h-screen bg-white font-sans">
        {/* Progress Bar */}
        <motion.div className="fixed top-0 left-0 right-0 h-1 bg-yellow-400 z-[60]" style={{ scaleX, transformOrigin: "0%" }} />

        {/* Nouvelle Navbar flottante */}
        <FloatingNavbar />

        {/* Hero Services */}
        <section className="relative pt-32 pb-20 px-6 overflow-hidden bg-gradient-to-br from-green-50 via-white to-yellow-50">
          <div className="max-w-7xl mx-auto text-center">
            <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }}>
              <div className="inline-flex items-center gap-2 bg-emerald-100 text-emerald-700 px-4 py-2 rounded-full text-xs font-black uppercase tracking-widest mb-6 shadow-sm">
                <Sparkles size={14} /> Tu commandes, WAKA livre.
              </div>
              <h1 className="text-5xl md:text-7xl font-black text-gray-900 mb-6 uppercase italic tracking-tighter leading-none">
                Des services <br />
                <span className="text-emerald-600">sur-mesure</span>
              </h1>
              <p className="text-lg text-gray-500 max-w-2xl mx-auto font-medium">
                Qu'il s'agisse d'un Ndolé fumant de ton resto local ou de tes courses hebdomadaires,
                WAKA s'occupe de tout avec rapidité et sécurité.
              </p>
            </motion.div>
          </div>
          <div className="absolute top-0 -left-20 w-64 h-64 bg-yellow-200/30 rounded-full blur-3xl animate-pulse" />
          <div className="absolute bottom-0 -right-20 w-64 h-64 bg-green-200/30 rounded-full blur-3xl" />
        </section>

        {/* Grille des Services */}
        <section className="py-20 px-6 bg-white">
          <div className="max-w-7xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
              {services.map((service, idx) => (
                <motion.div
                  key={idx}
                  whileHover={{ y: -10 }}
                  className="bg-white rounded-[2.5rem] overflow-hidden shadow-xl border border-gray-100 group"
                >
                  <div className={`bg-gradient-to-r ${service.color} p-8 text-white relative`}>
                    <div className="relative z-10 flex items-center justify-between">
                      <div>
                        <div className="w-16 h-16 bg-white/20 backdrop-blur-md rounded-2xl flex items-center justify-center mb-4">
                          <service.icon size={32} />
                        </div>
                        <h3 className="text-3xl font-black uppercase italic tracking-tighter">{service.title}</h3>
                      </div>
                      <ArrowRight size={40} className="opacity-20 group-hover:opacity-100 group-hover:translate-x-2 transition-all" />
                    </div>
                  </div>
                  <div className="p-8">
                    <p className="text-gray-600 font-bold mb-6 italic">{service.description}</p>
                    <ul className="space-y-4 mb-8">
                      {service.features.map((feat, i) => (
                        <li key={i} className="flex items-center gap-3 text-sm font-medium text-gray-500">
                          <div className="w-5 h-5 bg-green-50 text-green-600 rounded-full flex items-center justify-center flex-shrink-0">
                            <CheckCircle size={14} />
                          </div>
                          {feat}
                        </li>
                      ))}
                    </ul>
                    <button className="w-full py-4 rounded-2xl bg-gray-900 text-white font-black uppercase text-xs tracking-widest hover:bg-emerald-600 transition-colors shadow-lg">
                      {service.cta}
                    </button>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Section Pourquoi nous ? */}
        <section className="py-20 bg-emerald-950 text-white relative overflow-hidden">
          <div className="max-w-7xl mx-auto px-6 relative z-10">
            <div className="text-center mb-16">
              <h2 className="text-4xl font-black uppercase tracking-tighter italic mb-4">La différence WAKA</h2>
              <p className="text-emerald-200">Au-delà d'une simple application, un engagement local.</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
              {[
                { icon: ShieldCheck, title: "Sécurité & Confiance", desc: "Chaque bensikineur est recruté physiquement avec CNI et plan de localisation vérifiés." },
                { icon: Award, title: "Qualité Garantie", desc: "Nous privilégions les restaurants locaux réputés pour leur hygiène et leur goût." },
                { icon: Gift, title: "Récompensé à chaque bouchée", desc: "Ton argent a de la valeur. Gagne des points à chaque commande et mange gratuitement." }
              ].map((adv, i) => (
                <div key={i} className="text-center space-y-4">
                  <div className="w-20 h-20 bg-yellow-400 text-emerald-950 rounded-3xl flex items-center justify-center mx-auto rotate-3 shadow-2xl">
                    <adv.icon size={32} />
                  </div>
                  <h4 className="text-xl font-black uppercase italic tracking-tighter">{adv.title}</h4>
                  <p className="text-emerald-100/70 text-sm leading-relaxed">{adv.desc}</p>
                </div>
              ))}
            </div>
          </div>
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-emerald-900/20 rounded-full blur-[120px] pointer-events-none" />
        </section>

        {/* Footer avec logo AGRANDI */}
        <footer className="bg-white border-t border-green-100 py-16 px-6">
          <div className="max-w-7xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
              <div>
                <Logo className="h-20 w-auto mb-6" />
                <p className="text-green-600 text-sm italic font-medium leading-relaxed">
                  Tu commandes, WAKA livre. La première plateforme de livraison au Cameroun axée sur la proximité et la confiance.
                </p>
              </div>
              <div>
                <h4 className="font-black text-gray-900 mb-6 uppercase text-xs tracking-widest">Navigation</h4>
                <ul className="space-y-4">
                  <li><Link href="/" className="text-gray-500 text-sm hover:text-emerald-600 flex items-center gap-2"><Home size={14} /> Accueil</Link></li>
                  <li><Link href="/blog" className="text-gray-500 text-sm hover:text-emerald-600 flex items-center gap-2"><Newspaper size={14} /> Blog</Link></li>
                  <li><Link href="/services" className="text-gray-500 text-sm hover:text-emerald-600 flex items-center gap-2"><Coffee size={14} /> Services</Link></li>
                  <li><Link href="/about" className="text-gray-500 text-sm hover:text-emerald-600 flex items-center gap-2"><Info size={14} /> À propos</Link></li>
                  <li><Link href="/contact" className="text-gray-500 text-sm hover:text-emerald-600 flex items-center gap-2"><MessageCircle size={14} /> Contact</Link></li>
                </ul>
              </div>
              <div>
                <h4 className="font-black text-gray-900 mb-6 uppercase text-xs tracking-widest">Business</h4>
                <ul className="space-y-4">
                  <li><Link href="/devenir-partenaire" className="text-gray-500 text-sm font-bold hover:text-emerald-600 flex items-center gap-2"><Store size={14} /> Devenir Partenaire</Link></li>
                  <li><Link href="/recrutement-livreur" className="text-gray-500 text-sm font-bold hover:text-emerald-600 flex items-center gap-2"><Bike size={14} /> Devenir Livreur</Link></li>
                </ul>
              </div>
              <div>
                <h4 className="font-black text-gray-900 mb-6 uppercase text-xs tracking-widest">Contact</h4>
                <ul className="space-y-4 text-gray-500 text-sm">
                  <li className="flex items-center gap-3 font-bold"><Phone size={16} className="text-emerald-600" /> +237 621 004 286</li>
                  <li className="flex items-center gap-3 font-bold"><Mail size={16} className="text-emerald-600" /> contact@waka.cm</li>
                  <li className="flex items-center gap-3 font-bold"><MapPin size={16} className="text-emerald-600" /> Douala & Yaoundé</li>
                  <li className="mt-4">
                    <Link href="/contact" className="inline-flex items-center gap-2 text-emerald-500 hover:text-emerald-700 transition-colors text-sm font-bold">
                      <MessageCircle size={16} /> Formulaire de contact
                    </Link>
                  </li>
                </ul>
              </div>
            </div>
            <div className="mt-16 pt-8 border-t border-green-50 flex flex-col md:flex-row justify-between items-center gap-4 text-[10px] font-black text-gray-400 uppercase tracking-widest">
              <p>© 2024 WAKA Delivery Service. Tous droits réservés.</p>
              <div className="flex gap-6">
                <Link href="/terms" className="hover:text-emerald-600">Conditions</Link>
                <Link href="/privacy" className="hover:text-emerald-600">Confidentialité</Link>
                <Link href="/contact" className="hover:text-emerald-600">Contact</Link>
              </div>
            </div>
          </div>
        </footer>
      </div>
    </>
  )
}