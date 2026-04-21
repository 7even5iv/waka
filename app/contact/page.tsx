"use client"

import React, { useState, useEffect } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import Head from 'next/head'
import { motion, AnimatePresence, useScroll, useSpring, Variants } from 'framer-motion'
import {
  MapPin, Clock, Send, MessageSquare, User, ChevronRight,
  CheckCircle, AlertCircle, Phone, Mail, Loader2,
  HelpCircle, Globe, Headphones, Sparkles,
  Home, Info, Coffee, Menu, X, Store, Bike,
  LogOut, Settings, ChevronDown, Heart, Gift, Truck, ShieldCheck,
  Newspaper
} from 'lucide-react'

// ========== COMPOSANT LOGO AGRANDI ==========
const Logo = ({ className = "h-8 w-auto" }) => (
  <Link href="/" className="flex items-center gap-2 group">
    <Image src="/images/logo.png" alt="WAKA Logo" width={200} height={500} className={`${className} object-contain transition-all duration-300 group-hover:scale-105`} priority />
  </Link>
)

// Composant Navbar flottante avec logo AGRANDI
const FloatingNavbar = () => {
  const [scrolled, setScrolled] = useState(false)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [activeLink, setActiveLink] = useState('/contact')

  const navLinks = [
    { name: 'Accueil', href: '/', icon: Home },
    { name: 'Blog', href: '/blog', icon: Newspaper },
    { name: 'Devenir Partenaire', href: '/devenir-partenaire', icon: Store },
    { name: 'Devenir Livreur', href: '/recrutement-livreur', icon: Bike },
    { name: 'Services', href: '/services', icon: Coffee },
    { name: 'À propos', href: '/about', icon: Info },
    { name: 'Contact', href: '/contact', icon: HelpCircle },
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

export default function ContactPage() {
  const { scrollYProgress } = useScroll()
  const scaleX = useSpring(scrollYProgress, { stiffness: 100, damping: 30 })

  const [formData, setFormData] = useState({ name: '', email: '', subject: '', message: '' })
  const [formStatus, setFormStatus] = useState<'idle' | 'sending' | 'success'>('idle')
  const [openFAQ, setOpenFAQ] = useState<number | null>(null)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setFormStatus('sending')
    await new Promise(resolve => setTimeout(resolve, 1500))
    setFormStatus('success')
    setFormData({ name: '', email: '', subject: '', message: '' })
    setTimeout(() => setFormStatus('idle'), 3000)
  }

  const faqs = [
    {
      question: "Comment fonctionne le système de points WAKA ?",
      answer: "C'est simple : 1000 FCFA dépensés = 1 point gagné. Dès que vous atteignez 20 points, votre prochaine livraison est totalement GRATUITE !"
    },
    {
      question: "Comment devenir livreur WAKA ?",
      answer: "Nous recrutons des livreurs sérieux possédant une moto. Vous devez fournir une CNI, une photo et un plan de localisation. Inscrivez-vous via la page 'Devenir Livreur'."
    },
    {
      question: "Je suis restaurateur, comment m'inscrire ?",
      answer: "L'hébergement est gratuit pour les premiers partenaires. Nous prenons une commission de 10 à 15% uniquement sur les produits livrés. Contactez-nous via le formulaire sujet 'Partenariat'."
    },
    {
      question: "Quels sont les délais de livraison à Douala/Yaoundé ?",
      answer: "Grâce à nos livreurs locaux, nous livrons en moyenne entre 30 et 45 minutes après la validation de la commande."
    }
  ]

  return (
    <>
      <Head><title>Contact WAKA | Tu commandes, WAKA livre.</title></Head>

      <div className="min-h-screen bg-white font-sans">
        {/* Progress Bar */}
        <motion.div className="fixed top-0 left-0 right-0 h-1 bg-yellow-400 z-[60]" style={{ scaleX, transformOrigin: "0%" }} />

        {/* Nouvelle Navbar flottante */}
        <FloatingNavbar />

        {/* Hero Contact */}
        <section className="relative pt-32 pb-20 px-6 bg-emerald-950 text-white overflow-hidden text-center">
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }}>
            <div className="inline-flex items-center gap-2 bg-white/10 text-yellow-400 px-4 py-2 rounded-full text-xs font-black uppercase tracking-widest mb-6">
              <Headphones size={16} /> Support client WAKA
            </div>
            <h1 className="text-4xl md:text-6xl font-black uppercase italic tracking-tighter mb-4">Besoin d'aide ?</h1>
            <p className="text-emerald-100 max-w-2xl mx-auto font-medium italic">
              Une question sur ta commande ou envie de devenir partenaire ? <br /> Notre équipe est là pour toi 7j/7.
            </p>
          </motion.div>
          <div className="absolute top-0 right-0 w-64 h-64 bg-emerald-800/30 rounded-full blur-3xl" />
        </section>

        {/* Canaux de contact rapides */}
        <section className="py-12 px-6 -mt-10 relative z-10">
          <div className="max-w-7xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {/* WhatsApp direct */}
              <div className="bg-white p-8 rounded-3xl shadow-xl border border-green-100 flex flex-col items-center text-center group hover:bg-green-50 transition-colors">
                <div className="w-16 h-16 bg-[#25D366] text-white rounded-2xl flex items-center justify-center mb-6 rotate-3 group-hover:rotate-0 transition-transform">
                  <MessageSquare size={32} />
                </div>
                <h3 className="font-black uppercase text-sm mb-2 text-gray-900">Commander par WhatsApp</h3>
                <p className="text-xs text-gray-500 mb-6">Idéal pour ta phase de test rapide.</p>
                <a href="https://wa.me/237621004286" target="_blank" className="text-green-600 font-bold underline">+237 621 004 286</a>
              </div>

              {/* Partenariat */}
              <div className="bg-white p-8 rounded-3xl shadow-xl border border-green-100 flex flex-col items-center text-center group hover:bg-yellow-50 transition-colors">
                <div className="w-16 h-16 bg-yellow-400 text-emerald-950 rounded-2xl flex items-center justify-center mb-6 -rotate-3 group-hover:rotate-0 transition-transform">
                  <Store size={32} />
                </div>
                <h3 className="font-black uppercase text-sm mb-2 text-gray-900">Devenir Partenaire</h3>
                <p className="text-xs text-gray-500 mb-6">Pour restaurants & commerces.</p>
                <Link href="/devenir-partenaire" className="px-6 py-2 bg-emerald-950 text-white rounded-xl text-[10px] font-black uppercase tracking-widest">Inscrire mon resto</Link>
              </div>

              {/* Recrutement */}
              <div className="bg-white p-8 rounded-3xl shadow-xl border border-green-100 flex flex-col items-center text-center group hover:bg-emerald-50 transition-colors">
                <div className="w-16 h-16 bg-emerald-600 text-white rounded-2xl flex items-center justify-center mb-6 rotate-3 group-hover:rotate-0 transition-transform">
                  <Bike size={32} />
                </div>
                <h3 className="font-black uppercase text-sm mb-2 text-gray-900">Rejoindre les livreurs</h3>
                <p className="text-xs text-gray-500 mb-6">Tu as une moto et tu es sérieux ?</p>
                <Link href="/recrutement-livreur" className="px-6 py-2 bg-emerald-600 text-white rounded-xl text-[10px] font-black uppercase tracking-widest">Postuler</Link>
              </div>
            </div>
          </div>
        </section>

        {/* Formulaire & FAQ */}
        <section className="py-20 px-6 bg-white">
          <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-20">
            {/* FAQ */}
            <div className="space-y-8">
              <h2 className="text-3xl font-black uppercase italic tracking-tighter text-emerald-950">Questions fréquentes</h2>
              <div className="space-y-4">
                {faqs.map((faq, idx) => (
                  <div key={idx} className="border border-green-100 rounded-2xl overflow-hidden">
                    <button onClick={() => setOpenFAQ(openFAQ === idx ? null : idx)} className="w-full p-6 text-left flex justify-between items-center bg-white hover:bg-green-50 transition-all">
                      <span className="font-bold text-gray-700 text-sm">{faq.question}</span>
                      <ChevronRight size={18} className={`text-green-500 transition-transform ${openFAQ === idx ? 'rotate-90' : ''}`} />
                    </button>
                    <AnimatePresence>
                      {openFAQ === idx && (
                        <motion.div initial={{ height: 0 }} animate={{ height: 'auto' }} exit={{ height: 0 }} className="bg-green-50/50 px-6 pb-6 text-xs text-gray-600 leading-relaxed italic">
                          {faq.answer}
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                ))}
              </div>
            </div>

            {/* Form */}
            <div className="bg-gray-50 p-10 rounded-[3rem] border border-green-100 shadow-sm">
              <h2 className="text-3xl font-black uppercase italic tracking-tighter text-emerald-950 mb-8">Écris-nous</h2>
              <form onSubmit={handleSubmit} className="space-y-4">
                <input type="text" placeholder="Nom complet" className="w-full p-4 rounded-xl border-none outline-none focus:ring-2 focus:ring-green-500 text-sm shadow-sm" required value={formData.name} onChange={e => setFormData({ ...formData, name: e.target.value })} />
                <input type="email" placeholder="Email" className="w-full p-4 rounded-xl border-none outline-none focus:ring-2 focus:ring-green-500 text-sm shadow-sm" required value={formData.email} onChange={e => setFormData({ ...formData, email: e.target.value })} />
                <select className="w-full p-4 rounded-xl border-none outline-none focus:ring-2 focus:ring-green-500 text-sm shadow-sm bg-white" value={formData.subject} onChange={e => setFormData({ ...formData, subject: e.target.value })}>
                  <option value="">Sujet du message</option>
                  <option value="commande">Ma commande</option>
                  <option value="partenariat">Devenir Partenaire</option>
                  <option value="livreur">Devenir Livreur</option>
                  <option value="autre">Autre</option>
                </select>
                <textarea placeholder="Ton message..." rows={5} className="w-full p-4 rounded-xl border-none outline-none focus:ring-2 focus:ring-green-500 text-sm shadow-sm resize-none" required value={formData.message} onChange={e => setFormData({ ...formData, message: e.target.value })}></textarea>
                <button type="submit" className="w-full py-4 bg-emerald-600 text-white font-black uppercase text-xs tracking-widest rounded-xl hover:bg-emerald-700 transition-all flex items-center justify-center gap-2">
                  {formStatus === 'sending' ? <Loader2 className="animate-spin" /> : <><Send size={16} /> Envoyer</>}
                </button>
                {formStatus === 'success' && <p className="text-center text-green-600 font-bold text-xs mt-4">Message envoyé ! On te répond vite.</p>}
              </form>
            </div>
          </div>
        </section>

        {/* Map Placeholder */}
        <section className="py-20 px-6 bg-emerald-950 text-white text-center relative overflow-hidden">
          <MapPin size={48} className="mx-auto mb-4 text-yellow-400" />
          <h2 className="text-2xl font-black uppercase italic">Retrouve-nous sur le terrain</h2>
          <p className="text-emerald-200 mt-2 font-medium">Bureaux à Bonapriso (Douala) et Bastos (Yaoundé)</p>
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-emerald-800/10 rounded-full blur-[100px] pointer-events-none" />
        </section>

        {/* Footer avec logo AGRANDI */}
        <footer className="bg-white border-t border-green-100 py-16 px-6">
          <div className="max-w-7xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
              <div>
                <Logo className="h-20 w-auto mb-6" /> {/* Changé de h-10 à h-20 */}
                <p className="text-green-600 text-sm italic font-medium leading-relaxed">
                  Tu commandes, WAKA livre. La proximité au service de ta faim.
                </p>
              </div>
              <div>
                <h4 className="font-black text-gray-900 mb-6 uppercase text-xs tracking-widest">Navigation</h4>
                <ul className="space-y-4">
                  <li><Link href="/" className="text-gray-500 text-sm hover:text-emerald-600 flex items-center gap-2"><Home size={14} /> Accueil</Link></li>
                  <li><Link href="/blog" className="text-gray-500 text-sm hover:text-emerald-600 flex items-center gap-2"><Newspaper size={14} /> Blog</Link></li>
                  <li><Link href="/services" className="text-gray-500 text-sm hover:text-emerald-600 flex items-center gap-2"><Coffee size={14} /> Services</Link></li>
                  <li><Link href="/about" className="text-gray-500 text-sm hover:text-emerald-600 flex items-center gap-2"><Info size={14} /> À propos</Link></li>
                  <li><Link href="/contact" className="text-gray-500 text-sm hover:text-emerald-600 flex items-center gap-2"><HelpCircle size={14} /> Contact</Link></li>
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