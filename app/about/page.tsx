"use client"

import React, { useState, useEffect } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import Head from 'next/head'
import { motion, AnimatePresence, useScroll, useSpring, Variants } from 'framer-motion'
import {
  MapPin, Calendar, Star, Users, Target, Shield, Zap,
  Phone, Mail, Award, Clock, Truck, Heart, Globe, Briefcase,
  Home, Info, MessageCircle, Coffee, Menu, X, Store, Bike,
  LogOut, Settings, ChevronDown, Sparkles, Gift, ShieldCheck,
  Utensils, Newspaper, ChevronRight
} from 'lucide-react'

// ========== COMPOSANT LOGO AGRANDI ==========
const Logo = ({ className = "h-8 w-auto" }) => (
  <Link href="/" className="flex items-center gap-2 group">
    <Image src="/images/logo.png" alt="WAKA Logo" width={200} height={70} className={`${className} object-contain transition-all duration-300 group-hover:scale-105`} priority />
  </Link>
)

// Composant Navbar flottante avec logo AGRANDI
const FloatingNavbar = () => {
  const [scrolled, setScrolled] = useState(false)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [activeLink, setActiveLink] = useState('/about')

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
            <Logo className="h-12 w-auto md:h-16" /> {/* Changé de h-8/h-10 à h-12/h-16 */}
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
                <Logo className="h-12 w-auto" /> {/* Changé de h-8 à h-12 */}
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

export default function AboutPage() {
  const [activeTab, setActiveTab] = useState('mission')
  const { scrollYProgress } = useScroll()
  const scaleX = useSpring(scrollYProgress, { stiffness: 100, damping: 30 })

  const values = [
    { icon: Utensils, title: "Proximité Locale", description: "Nous valorisons les petits restaurants et supermarchés de quartier pour leur donner la visibilité qu'ils méritent." },
    { icon: ShieldCheck, title: "Sécurité Garantie", description: "Chaque livreur est identifié avec CNI et plan de localisation. Vos commandes sont entre de bonnes mains." },
    { icon: Gift, title: "Argent Valorisé", description: "Grâce à nos WAKA Points (1000F = 1pt), chaque commande vous rapproche d'un repas gratuit." },
    { icon: Zap, title: "Rapidité WAKA", description: "Nos bensikineurs connaissent la ville mieux que quiconque pour livrer en moins de 45 min." },
    { icon: Heart, title: "Confiance", description: "Nous construisons une relation de transparence avec nos partenaires : seulement 10-15% de commission." },
    { icon: Users, title: "Communauté", description: "WAKA est une aventure humaine qui crée des opportunités pour les livreurs et les commerçants locaux." }
  ]

  return (
    <>
      <Head><title>À propos de WAKA | Tu commandes, WAKA livre.</title></Head>

      <div className="min-h-screen bg-white font-sans">
        {/* Progress Bar */}
        <motion.div className="fixed top-0 left-0 right-0 h-1 bg-yellow-400 z-[60]" style={{ scaleX, transformOrigin: "0%" }} />

        {/* Nouvelle Navbar flottante */}
        <FloatingNavbar />

        {/* Hero Section */}
        <section className="relative pt-32 pb-20 px-6 bg-gradient-to-br from-green-50 via-white to-yellow-50 overflow-hidden text-center">
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }}>
            <div className="inline-flex items-center gap-2 bg-emerald-100 text-emerald-700 px-4 py-2 rounded-full text-[10px] font-black uppercase tracking-widest mb-6 shadow-sm">
              <Sparkles size={14} /> Notre Histoire
            </div>
            <h1 className="text-4xl md:text-7xl font-black text-gray-900 mb-6 uppercase italic tracking-tighter leading-none">
              L'aventure <br />
              <span className="text-emerald-600">WAKA livre.</span>
            </h1>
            <p className="text-lg text-gray-500 max-w-2xl mx-auto font-medium leading-relaxed">
              WAKA est née au Cameroun avec une idée simple : <br />
              <span className="text-emerald-800 font-bold italic">"Tu commandes, WAKA livre."</span> <br />
              Simplifier la vie des citoyens tout en boostant l'économie locale.
            </p>
          </motion.div>
        </section>

        {/* Mission & Vision */}
        <section className="py-20 px-6 bg-white">
          <div className="max-w-5xl mx-auto">
            <div className="flex justify-center gap-4 mb-16">
              <button onClick={() => setActiveTab('mission')} className={`px-8 py-3 rounded-2xl font-black text-xs uppercase tracking-widest transition-all ${activeTab === 'mission' ? 'bg-emerald-600 text-white shadow-xl' : 'bg-gray-100 text-gray-400'}`}>Notre Mission</button>
              <button onClick={() => setActiveTab('vision')} className={`px-8 py-3 rounded-2xl font-black text-xs uppercase tracking-widest transition-all ${activeTab === 'vision' ? 'bg-emerald-600 text-white shadow-xl' : 'bg-gray-100 text-gray-400'}`}>Notre Vision</button>
            </div>

            <AnimatePresence mode="wait">
              {activeTab === 'mission' ? (
                <motion.div key="mission" initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: 20 }} className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
                  <div className="bg-emerald-900 p-10 rounded-[3rem] text-white shadow-2xl relative overflow-hidden">
                    <Target size={150} className="absolute -right-10 -bottom-10 text-white/5" />
                    <h3 className="text-3xl font-black uppercase italic mb-6">Soutenir le Local</h3>
                    <p className="text-emerald-100 leading-relaxed font-medium">
                      Contrairement aux géants internationaux, notre mission est d'aller vers les **petits restaurants locaux** et commerces de quartier pour leur apporter plus de clients et de visibilité. <br /><br />
                      Nous ne vendons pas qu'une application, nous construisons un pont entre les saveurs de nos quartiers et vos bureaux ou domiciles.
                    </p>
                  </div>
                  <div className="space-y-6">
                    <div className="flex items-center gap-4 p-4 bg-green-50 rounded-2xl border border-green-100">
                      <div className="w-12 h-12 bg-yellow-400 rounded-xl flex items-center justify-center text-emerald-950 shadow-lg"><Truck size={24} /></div>
                      <p className="text-sm font-bold text-emerald-900 uppercase">Livraison Rapide en Bensikin</p>
                    </div>
                    <div className="flex items-center gap-4 p-4 bg-green-50 rounded-2xl border border-green-100">
                      <div className="w-12 h-12 bg-emerald-600 rounded-xl flex items-center justify-center text-white shadow-lg"><Store size={24} /></div>
                      <p className="text-sm font-bold text-emerald-900 uppercase">Hébergement gratuit des partenaires</p>
                    </div>
                  </div>
                </motion.div>
              ) : (
                <motion.div key="vision" initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: 20 }} className="text-center max-w-3xl mx-auto">
                  <div className="w-20 h-20 bg-yellow-400 rounded-3xl flex items-center justify-center mx-auto mb-8 shadow-xl rotate-3"><Globe size={40} className="text-emerald-900" /></div>
                  <h3 className="text-4xl font-black text-gray-900 uppercase italic mb-6">Devenir le leader de la <br /> proximité en Afrique</h3>
                  <p className="text-gray-500 text-lg leading-relaxed font-medium">
                    WAKA aspire à réinventer la logistique urbaine en Afrique. Notre vision est de créer un écosystème où chaque acteur (livreur, restaurateur, client) est gagnant et valorisé grâce à la technologie.
                  </p>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </section>

        {/* Nos Valeurs */}
        <section className="py-20 px-6 bg-gray-50">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-4xl font-black uppercase tracking-tighter italic mb-4">L'ADN de WAKA</h2>
              <p className="text-gray-500 font-medium italic">Ce qui nous guide au quotidien sur le terrain.</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {values.map((val, idx) => (
                <motion.div
                  key={idx}
                  whileHover={{ y: -10 }}
                  className="bg-white p-8 rounded-[2.5rem] shadow-xl border border-green-50 group hover:bg-emerald-900 transition-all duration-300"
                >
                  <div className="w-14 h-14 bg-green-100 text-emerald-600 rounded-2xl flex items-center justify-center mb-6 group-hover:bg-yellow-400 group-hover:text-emerald-950 transition-colors shadow-md">
                    <val.icon size={28} />
                  </div>
                  <h4 className="text-xl font-black uppercase italic mb-3 text-gray-900 group-hover:text-white transition-colors">{val.title}</h4>
                  <p className="text-gray-500 text-sm leading-relaxed font-medium group-hover:text-emerald-100 transition-colors">{val.description}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Strategique */}
        <section className="py-20 px-6 bg-yellow-400 relative overflow-hidden">
          <div className="max-w-4xl mx-auto text-center relative z-10">
            <h2 className="text-3xl md:text-5xl font-black uppercase italic tracking-tighter text-emerald-950 mb-8">Rejoins l'aventure WAKA !</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div className="bg-emerald-900 p-8 rounded-[2.5rem] text-white shadow-2xl">
                <Bike size={40} className="text-yellow-400 mb-4 mx-auto" />
                <h4 className="font-black uppercase mb-2">Tu as une moto ?</h4>
                <p className="text-xs text-emerald-200 mb-6">Gagne jusqu'à 1200F par course de 1500F.</p>
                <Link href="/recrutement-livreur" className="inline-block px-8 py-3 bg-white text-emerald-900 rounded-xl font-black uppercase text-[10px] tracking-widest hover:bg-yellow-400 transition-colors">Postuler</Link>
              </div>
              <div className="bg-white p-8 rounded-[2.5rem] text-emerald-900 shadow-2xl">
                <Store size={40} className="text-emerald-600 mb-4 mx-auto" />
                <h4 className="font-black uppercase mb-2">Tu es commerçant ?</h4>
                <p className="text-xs text-gray-400 mb-6">Hébergement gratuit et commission 10%.</p>
                <Link href="/devenir-partenaire" className="inline-block px-8 py-3 bg-emerald-900 text-white rounded-xl font-black uppercase text-[10px] tracking-widest hover:bg-emerald-700 transition-colors">S'inscrire</Link>
              </div>
            </div>
          </div>
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-white/20 rounded-full blur-[100px] pointer-events-none" />
        </section>

        {/* Footer avec logo AGRANDI */}
        <footer className="bg-white border-t border-green-100 py-16 px-6">
          <div className="max-w-7xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
              <div>
                <Logo className="h-20 w-auto mb-6" /> {/* Changé de h-10 à h-20 */}
                <p className="text-green-600 text-sm italic font-medium leading-relaxed">
                  Tu commandes, WAKA livre. La voix de la proximité au Cameroun.
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
                <h4 className="font-black text-gray-900 mb-6 uppercase text-xs tracking-widest">Contact Direct</h4>
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