"use client"

import React, { useState, useEffect } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import Image from 'next/image'
import Head from 'next/head'
import { motion, AnimatePresence, Variants } from 'framer-motion'
import {
  MapPin, ArrowRight, Zap, ShieldCheck, Star, User, Menu, Clock, Truck,
  Award, Phone, Mail, ChevronRight, X, Heart,
  Settings, LogOut, ChevronDown, Home, Info, MessageCircle,
  Globe, Gift, Coffee, Store, Bike,
  Sparkles, ThumbsUp, TrendingUp, Users, ShoppingBag, CheckCircle,
  Leaf, Rocket, Smartphone, CreditCard, Headphones, Calendar, Utensils,
  Newspaper
} from 'lucide-react'

// ========== TYPES ==========
interface User {
  id: number; name: string; email: string; createdAt: string;
}

interface City {
  id: string; name: string; description: string; gradient: string; image: string;
  stats: { deliveryTime: string; partners: string; rating: string; }
}

interface Advantage {
  icon: React.ElementType; title: string; description: string; color: string; gradient: string;
}

// ========== COMPOSANT LOGO AGrandi ==========
const Logo = ({ className = "h-8 w-auto" }: { className?: string }) => (
  <Link href="/" className="flex items-center gap-2 group">
    <Image src="/images/logo.png" alt="WAKA Logo" width={200} height={500} className={`${className} object-contain transition-all duration-300 group-hover:scale-105`} priority />
  </Link>
)

// ========== NAVBAR COMPONENT ==========
const FloatingNavbar = () => {
  const [scrolled, setScrolled] = useState(false)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [activeLink, setActiveLink] = useState('/')

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
    const handleScroll = () => {
      setScrolled(window.scrollY > 50)
    }
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
          <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
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

            <Link href="/login">
              <motion.button
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.95 }}
                className="ml-4 bg-gradient-to-r from-emerald-600 to-green-600 text-white px-6 py-2 rounded-xl text-xs font-black uppercase shadow-lg hover:shadow-xl transition-all"
              >
                Connexion
              </motion.button>
            </Link>
          </div>

          {/* Mobile Menu Button */}
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
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              onClick={() => setMobileMenuOpen(false)}
              className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40 md:hidden"
            />

            <motion.div
              variants={menuVariants}
              initial="closed"
              animate="open"
              exit="closed"
              className="fixed top-0 right-0 bottom-0 w-full max-w-sm bg-white z-40 md:hidden shadow-2xl"
            >
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

                <div className="my-8 h-px bg-gradient-to-r from-transparent via-gray-200 to-transparent" />

                <motion.div variants={menuItemVariants}>
                  <Link href="/login" onClick={() => setMobileMenuOpen(false)}>
                    <motion.button
                      whileTap={{ scale: 0.95 }}
                      className="w-full bg-gradient-to-r from-emerald-600 to-green-600 text-white px-6 py-4 rounded-xl font-black uppercase text-sm shadow-lg"
                    >
                      Connexion
                    </motion.button>
                  </Link>
                </motion.div>

                <motion.div variants={menuItemVariants} className="mt-8 p-4 bg-gray-50 rounded-xl">
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

// ========== CARTE VILLE ==========
const CityCard = ({ city, onClick }: { city: City; onClick: () => void }) => (
  <motion.div className="relative h-80 rounded-3xl overflow-hidden cursor-pointer group shadow-xl" onClick={onClick} whileHover={{ y: -10 }}>
    <Image src={city.image} alt={city.name} fill className="object-cover transition-transform duration-500 group-hover:scale-110" />
    <div className={`absolute inset-0 bg-gradient-to-t ${city.gradient} opacity-60 group-hover:opacity-70 transition-opacity`} />
    <div className="absolute inset-0 p-8 flex flex-col justify-end text-white">
      <h3 className="text-4xl font-black mb-2 uppercase tracking-tighter">{city.name}</h3>
      <p className="text-white/90 text-sm mb-4 font-bold">{city.description}</p>
      <div className="flex gap-3">
        <div className="bg-white/20 backdrop-blur-md px-3 py-1 rounded-full text-[10px] font-black uppercase flex items-center gap-1"><Truck size={12} /> {city.stats.deliveryTime}</div>
        <div className="bg-white/20 backdrop-blur-md px-3 py-1 rounded-full text-[10px] font-black uppercase flex items-center gap-1"><Store size={12} /> {city.stats.partners}</div>
      </div>
    </div>
  </motion.div>
)

// ========== PAGE PRINCIPALE ==========
export default function HomePage() {
  const router = useRouter()

  const cities: City[] = [
    { id: 'douala', name: 'Douala', description: 'Capitale économique', gradient: 'from-green-600 to-emerald-700', image: '/images/douala.jpg', stats: { deliveryTime: '30-45 min', partners: '156+', rating: '4.8' } },
    { id: 'yaounde', name: 'Yaoundé', description: 'Ville aux 7 collines', gradient: 'from-yellow-500 to-amber-600', image: '/images/yaounde.jpg', stats: { deliveryTime: '30-45 min', partners: '142+', rating: '4.7' } }
  ]

  const advantages: Advantage[] = [
    { icon: Zap, title: 'Livraison Express', description: 'Vos commandes livrées en moins de 45 minutes.', color: 'from-yellow-400 to-amber-500', gradient: 'from-yellow-400 to-amber-500' },
    { icon: Gift, title: 'Programme de Fidélité', description: '1000F = 1 point. À 20 points, la livraison est GRATUITE !', color: 'from-green-500 to-emerald-600', gradient: 'from-green-500 to-emerald-600' },
    { icon: ShieldCheck, title: 'Sécurité Maximale', description: 'Livreurs certifiés et identifiés (CNI vérifiée).', color: 'from-emerald-500 to-teal-600', gradient: 'from-emerald-500 to-teal-600' }
  ]

  return (
    <>
      <Head><title>WAKA - Tu commandes, WAKA livre.</title></Head>

      <div className="relative min-h-screen bg-white overflow-x-hidden font-sans">

        <FloatingNavbar />

        {/* Hero Section */}
        <section className="relative min-h-screen flex items-center justify-center pt-32 pb-20 px-6 bg-[radial-gradient(circle_at_top_right,rgba(34,197,94,0.1),transparent)]">
          <div className="max-w-7xl mx-auto text-center">
            <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }}>
              {/* Hero logo encore plus grand */}
              <div className="flex justify-center mb-8"><Logo className="h-40 w-auto md:h-64" /></div>
              <h1 className="text-5xl md:text-8xl font-black tracking-tighter mb-6 leading-tight uppercase italic">
                Tu commandes,<br /><span className="bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent">WAKA livre.</span>
              </h1>
              <p className="text-xl text-green-600 mb-10 max-w-2xl mx-auto font-bold italic">L'application qui connecte les Camerounais à leurs restaurants locaux préférés.</p>

              <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                <button onClick={() => { document.getElementById('cities')?.scrollIntoView({ behavior: 'smooth' }) }} className="w-full sm:w-auto px-10 py-5 rounded-2xl bg-emerald-600 text-white font-black uppercase text-sm shadow-2xl flex items-center justify-center gap-2 hover:bg-emerald-700 transition-all">
                  Commander maintenant <ChevronRight size={20} />
                </button>
                <Link href="/devenir-partenaire" className="w-full sm:w-auto">
                  <button className="w-full px-10 py-5 rounded-2xl bg-yellow-400 text-black font-black uppercase text-sm shadow-xl border-2 border-yellow-500 hover:bg-yellow-500 flex items-center justify-center gap-2 transition-all">
                    <Store size={20} /> Devenir partenaire
                  </button>
                </Link>
              </div>

              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.5 }} className="mt-12 inline-flex items-center gap-3 px-6 py-3 bg-green-50 rounded-full border border-green-100">
                <Gift className="text-yellow-500" size={20} />
                <span className="text-xs font-black text-green-700 uppercase tracking-widest">1000F = 1 Point. Livraison offerte à 20 points !</span>
              </motion.div>
            </motion.div>
          </div>
        </section>

        {/* Section Business Engine */}
        <section className="py-20 bg-white">
          <div className="max-w-7xl mx-auto px-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
              <div className="bg-emerald-900 rounded-[3rem] p-10 text-white relative overflow-hidden group">
                <div className="relative z-10">
                  <div className="w-16 h-16 bg-yellow-400 rounded-2xl flex items-center justify-center text-black mb-6 rotate-3 group-hover:rotate-12 transition-transform shadow-xl">
                    <Bike size={32} />
                  </div>
                  <h2 className="text-3xl font-black uppercase mb-4 italic">Devenez Livreur WAKA</h2>
                  <p className="text-emerald-100 mb-8 font-bold leading-relaxed">Tu as une moto ? Gagne jusqu'à 80% sur chaque course. Nous recrutons 5 livreurs actifs par zone !</p>
                  <Link href="/recrutement-livreur" className="inline-flex items-center gap-2 bg-white text-emerald-900 px-8 py-4 rounded-xl font-black uppercase text-xs tracking-widest hover:bg-yellow-400 transition-colors">
                    Postuler maintenant <ArrowRight size={18} />
                  </Link>
                </div>
                <Truck size={200} className="absolute -right-20 -bottom-10 text-white/5 rotate-12" />
              </div>

              <div className="bg-yellow-400 rounded-[3rem] p-10 text-emerald-950 relative overflow-hidden group">
                <div className="relative z-10">
                  <div className="w-16 h-16 bg-emerald-900 rounded-2xl flex items-center justify-center text-white mb-6 -rotate-3 group-hover:-rotate-12 transition-transform shadow-xl">
                    <Utensils size={32} />
                  </div>
                  <h2 className="text-3xl font-black uppercase mb-4 italic">Boostez votre resto</h2>
                  <p className="text-emerald-900/80 mb-8 font-bold leading-relaxed">Petits restaurants & commerces : Hébergement GRATUIT. On vous apporte la visibilité et les clients.</p>
                  <Link href="/devenir-partenaire" className="inline-flex items-center gap-2 bg-emerald-900 text-white px-8 py-4 rounded-xl font-black uppercase text-xs tracking-widest hover:bg-black transition-colors">
                    Inscrire mon resto <ArrowRight size={18} />
                  </Link>
                </div>
                <Store size={200} className="absolute -right-20 -bottom-10 text-emerald-900/5 -rotate-12" />
              </div>
            </div>
          </div>
        </section>

        {/* Avantages */}
        <section className="py-20 bg-gray-50">
          <div className="max-w-7xl mx-auto px-6 text-center">
            <h2 className="text-4xl font-black uppercase tracking-tighter text-emerald-950 mb-12 italic">Pourquoi choisir WAKA ?</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {advantages.map((adv, i) => (
                <div key={i} className="bg-white p-8 rounded-3xl shadow-lg border border-green-50 hover:scale-105 transition-transform">
                  <div className={`w-14 h-14 bg-gradient-to-br ${adv.gradient} rounded-2xl flex items-center justify-center text-white mx-auto mb-6 shadow-xl`}><adv.icon size={28} /></div>
                  <h3 className="text-lg font-black text-emerald-900 mb-3 uppercase italic">{adv.title}</h3>
                  <p className="text-green-600 text-sm font-medium">{adv.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Villes */}
        <section id="cities" className="py-20 bg-white">
          <div className="max-w-7xl mx-auto px-6">
            <h2 className="text-4xl font-black uppercase tracking-tighter text-emerald-950 mb-12 italic text-center">Nos zones d'activité</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {cities.map((city) => (
                <CityCard key={city.id} city={city} onClick={() => router.push(`/${city.id}`)} />
              ))}
            </div>
          </div>
        </section>

        {/* Footer avec logo AGRANDI */}
        <footer className="bg-emerald-950 text-white py-20 px-6">
          <div className="max-w-7xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">
              <div className="space-y-6">
                <Logo className="h-20 w-auto brightness-200" />
                <p className="text-emerald-100/60 text-sm italic font-medium leading-relaxed">Tu commandes, WAKA livre. La plateforme n°1 de livraison au Cameroun.</p>
              </div>
              <div>
                <h4 className="font-black uppercase text-xs tracking-widest text-yellow-400 mb-8">Navigation</h4>
                <ul className="space-y-4">
                  <li><Link href="/" className="text-emerald-100/80 hover:text-white transition-colors text-sm font-bold flex items-center gap-2"><Home size={14} /> Accueil</Link></li>
                  <li><Link href="/blog" className="text-emerald-100/80 hover:text-white transition-colors text-sm font-bold flex items-center gap-2"><Newspaper size={14} /> Blog</Link></li>
                  <li><Link href="/devenir-partenaire" className="text-emerald-100/80 hover:text-white transition-colors text-sm font-bold flex items-center gap-2"><Store size={14} /> Devenir Partenaire</Link></li>
                  <li><Link href="/recrutement-livreur" className="text-emerald-100/80 hover:text-white transition-colors text-sm font-bold flex items-center gap-2"><Bike size={14} /> Devenir Livreur</Link></li>
                  <li><Link href="/services" className="text-emerald-100/80 hover:text-white transition-colors text-sm font-bold flex items-center gap-2"><Coffee size={14} /> Services</Link></li>
                  <li><Link href="/about" className="text-emerald-100/80 hover:text-white transition-colors text-sm font-bold flex items-center gap-2"><Info size={14} /> À propos</Link></li>
                  <li><Link href="/contact" className="text-emerald-100/80 hover:text-white transition-colors text-sm font-bold flex items-center gap-2"><MessageCircle size={14} /> Contact</Link></li>
                </ul>
              </div>
              <div>
                <h4 className="font-black uppercase text-xs tracking-widest text-yellow-400 mb-8">Business</h4>
                <ul className="space-y-4">
                  <li><Link href="/devenir-partenaire" className="text-emerald-100/80 hover:text-white transition-colors text-sm font-bold flex items-center gap-2"><Store size={14} /> Devenir Partenaire</Link></li>
                  <li><Link href="/recrutement-livreur" className="text-emerald-100/80 hover:text-white transition-colors text-sm font-bold flex items-center gap-2"><Bike size={14} /> Devenir Livreur</Link></li>
                </ul>
              </div>
              <div>
                <h4 className="font-black uppercase text-xs tracking-widest text-yellow-400 mb-8">Contact</h4>
                <ul className="space-y-4 text-sm font-bold">
                  <li className="flex items-center gap-3"><Phone size={16} className="text-emerald-400" /> +237 621 004 286</li>
                  <li className="flex items-center gap-3"><Mail size={16} className="text-emerald-400" /> contact@waka.cm</li>
                  <li className="flex items-center gap-3"><MapPin size={16} className="text-emerald-400" /> Douala & Yaoundé</li>
                  <li className="mt-4">
                    <Link href="/contact" className="inline-flex items-center gap-2 text-emerald-400 hover:text-yellow-400 transition-colors text-sm font-bold">
                      <MessageCircle size={16} /> Formulaire de contact
                    </Link>
                  </li>
                </ul>
              </div>
            </div>
            <div className="pt-8 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-6">
              <p className="text-emerald-100/40 text-[10px] font-black uppercase tracking-widest">© 2024 WAKA Delivery Service. Cameroun.</p>
              <div className="flex gap-6">
                <Link href="/terms" className="text-emerald-100/40 text-[10px] font-black uppercase hover:text-white transition-colors">Conditions</Link>
                <Link href="/privacy" className="text-emerald-100/40 text-[10px] font-black uppercase hover:text-white transition-colors">Confidentialité</Link>
                <Link href="/contact" className="text-emerald-100/40 text-[10px] font-black uppercase hover:text-white transition-colors">Contact</Link>
              </div>
            </div>
          </div>
        </footer>

      </div>
    </>
  )
}