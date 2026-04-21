"use client"

import React, { useState, useEffect } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import Head from 'next/head'
import { motion, AnimatePresence, useScroll, useSpring, Variants } from 'framer-motion'
import {
  Calendar, User, Clock, ChevronRight, Search,
  Heart, Share2, Bookmark, ArrowRight, Phone, Mail,
  TrendingUp, Coffee, Zap, Award, MessageCircle,
  Home, Info, MapPin, Truck, Gift, Menu, X,
  LogOut, Settings, ChevronDown, Globe, Sparkles,
  Store, Bike, ShieldCheck, Utensils, Users,
  Newspaper
} from 'lucide-react'

// ========== COMPOSANTS DE STRUCTURE (Logo AGRANDI) ==========
const Logo = ({ className = "h-8 w-auto" }) => (
  <Link href="/" className="flex items-center gap-2 group">
    <Image src="/images/logo.png" alt="WAKA Logo" width={200} height={70} className={`${className} object-contain transition-all duration-300 group-hover:scale-105`} priority />
  </Link>
)

// Composant Navbar flottante avec logo AGRANDI
const FloatingNavbar = () => {
  const [scrolled, setScrolled] = useState(false)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [activeLink, setActiveLink] = useState('/blog')

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

export default function BlogPage() {
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('all')
  const { scrollYProgress } = useScroll()
  const scaleX = useSpring(scrollYProgress, { stiffness: 100, damping: 30 })

  // Articles orientés vers ton Business Plan
  const articles = [
    {
      id: 1,
      slug: 'tu-commandes-waka-livre',
      title: 'Tu commandes, WAKA livre : Le nouveau slogan qui change tout !',
      excerpt: 'Découvrez pourquoi notre nouvelle identité reflète notre engagement pour une livraison ultra-rapide au Cameroun.',
      category: 'Actualités',
      categorySlug: 'news',
      date: '21 Avril 2024',
      author: 'Équipe WAKA',
      readTime: '3 min',
      image: '/images/blog/launch.jpg'
    },
    {
      id: 2,
      slug: 'gagner-des-points-waka',
      title: 'Comment manger gratuitement grâce aux WAKA Points ?',
      excerpt: 'Tout savoir sur notre système de fidélité : 1000F = 1 point. À 20 points, on vous offre la livraison !',
      category: 'Fidélité',
      categorySlug: 'rewards',
      date: '20 Avril 2024',
      author: 'Marie N.',
      readTime: '4 min',
      image: '/images/blog/points.jpg'
    },
    {
      id: 3,
      slug: 'devenir-livreur-securise',
      title: 'Livreurs WAKA : La sécurité avant tout (CNI et identification)',
      excerpt: 'Comment nous assurons la sécurité de vos colis en recrutant des livreurs certifiés et identifiés physiquement.',
      category: 'Recrutement',
      categorySlug: 'jobs',
      date: '18 Avril 2024',
      author: 'Service Logistique',
      readTime: '5 min',
      image: '/images/blog/driver.jpg'
    },
    {
      id: 4,
      slug: 'restos-locaux-vs-grands-maitres',
      title: 'Petits restaurants de quartier : Le moteur caché de WAKA',
      excerpt: 'Pourquoi nous avons choisi de mettre en avant les saveurs locales de Douala et Yaoundé avant les grandes enseignes.',
      category: 'Partenaires',
      categorySlug: 'partners',
      date: '15 Avril 2024',
      author: 'Équipe Business',
      readTime: '6 min',
      image: '/images/blog/local-food.jpg'
    }
  ]

  const categories = [
    { name: 'Tous', slug: 'all' },
    { name: 'Actualités', slug: 'news' },
    { name: 'Fidélité', slug: 'rewards' },
    { name: 'Recrutement', slug: 'jobs' },
    { name: 'Partenaires', slug: 'partners' }
  ]

  const filteredArticles = articles.filter(art =>
    (selectedCategory === 'all' || art.categorySlug === selectedCategory) &&
    (art.title.toLowerCase().includes(searchTerm.toLowerCase()))
  )

  return (
    <>
      <Head><title>Blog WAKA | Actualités et Conseils Livraison</title></Head>

      <div className="min-h-screen bg-white font-sans">
        {/* Progress Bar */}
        <motion.div className="fixed top-0 left-0 right-0 h-1 bg-yellow-400 z-[60]" style={{ scaleX, transformOrigin: "0%" }} />

        {/* Nouvelle Navbar flottante */}
        <FloatingNavbar />

        {/* Hero Blog */}
        <section className="relative pt-32 pb-16 px-6 bg-gradient-to-br from-green-50 to-white overflow-hidden text-center">
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }}>
            <div className="inline-flex items-center gap-2 bg-emerald-100 text-emerald-700 px-4 py-2 rounded-full text-[10px] font-black uppercase tracking-widest mb-6">
              <TrendingUp size={14} /> WAKA Insights
            </div>
            <h1 className="text-4xl md:text-6xl font-black uppercase italic tracking-tighter mb-6">
              Actualités & <span className="text-emerald-600">Conseils</span>
            </h1>

            {/* Barre de Recherche */}
            <div className="relative max-w-md mx-auto mb-10">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
              <input
                type="text"
                placeholder="Rechercher un article..."
                className="w-full pl-12 pr-4 py-4 rounded-2xl border border-green-100 shadow-sm outline-none focus:ring-2 focus:ring-green-500 transition-all"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>

            {/* Catégories */}
            <div className="flex justify-center gap-2 overflow-x-auto pb-4 scrollbar-hide">
              {categories.map(cat => (
                <button
                  key={cat.slug}
                  onClick={() => setSelectedCategory(cat.slug)}
                  className={`px-6 py-2 rounded-full text-xs font-black uppercase tracking-widest transition-all ${selectedCategory === cat.slug ? 'bg-emerald-600 text-white shadow-lg' : 'bg-white text-gray-400 border border-gray-100'}`}
                >
                  {cat.name}
                </button>
              ))}
            </div>
          </motion.div>
        </section>

        {/* Grille d'articles */}
        <section className="py-16 px-6">
          <div className="max-w-7xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
              {filteredArticles.map((art, idx) => (
                <motion.article
                  key={art.id}
                  whileHover={{ y: -10 }}
                  className="bg-white rounded-3xl overflow-hidden shadow-xl border border-gray-50 group"
                >
                  <div className="relative h-56 bg-gray-100">
                    <div className="absolute inset-0 bg-emerald-900/10 group-hover:bg-transparent transition-colors" />
                    <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-md px-3 py-1 rounded-full text-[10px] font-black uppercase text-emerald-600 shadow-sm">{art.category}</div>
                  </div>
                  <div className="p-8">
                    <div className="flex items-center gap-4 text-[10px] font-bold text-gray-400 uppercase mb-4">
                      <span className="flex items-center gap-1"><Calendar size={12} /> {art.date}</span>
                      <span className="flex items-center gap-1"><Clock size={12} /> {art.readTime}</span>
                    </div>
                    <h3 className="text-xl font-black text-gray-900 mb-4 group-hover:text-emerald-600 transition-colors leading-tight uppercase italic">{art.title}</h3>
                    <p className="text-gray-500 text-sm mb-6 leading-relaxed line-clamp-3">{art.excerpt}</p>
                    <Link href={`/blog/${art.slug}`} className="inline-flex items-center gap-2 font-black text-xs uppercase tracking-widest text-emerald-600 group-hover:gap-4 transition-all">
                      Lire l'article <ArrowRight size={16} />
                    </Link>
                  </div>
                </motion.article>
              ))}
            </div>

            {filteredArticles.length === 0 && (
              <div className="text-center py-20">
                <p className="text-gray-400 font-bold">Aucun article ne correspond à votre recherche.</p>
              </div>
            )}
          </div>
        </section>

        {/* Newsletter (Point 3 Étude : Viralité) */}
        <section className="py-20 px-6 bg-emerald-950 text-white relative overflow-hidden">
          <div className="max-w-4xl mx-auto text-center relative z-10">
            <Gift size={48} className="mx-auto mb-6 text-yellow-400 rotate-12" />
            <h2 className="text-3xl md:text-5xl font-black uppercase italic tracking-tighter mb-6">Ne rate aucune promo !</h2>
            <p className="text-emerald-200 mb-10 font-medium">Inscris-toi pour recevoir les codes promos exclusifs et <br /> les nouveaux restos ajoutés chaque semaine.</p>
            <form className="flex flex-col sm:flex-row gap-4 max-w-lg mx-auto">
              <input type="email" placeholder="Ton adresse email" className="flex-1 p-4 rounded-xl bg-white/10 border border-white/20 text-white outline-none focus:bg-white/20 transition-all" required />
              <button type="submit" className="bg-yellow-400 text-emerald-950 px-8 py-4 rounded-xl font-black uppercase text-xs tracking-widest hover:bg-white transition-colors">S'abonner</button>
            </form>
          </div>
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-emerald-800/20 rounded-full blur-[100px] pointer-events-none" />
        </section>

        {/* Footer avec logo AGRANDI */}
        <footer className="bg-white border-t border-green-100 py-16 px-6">
          <div className="max-w-7xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
              <div>
                <Logo className="h-20 w-auto mb-6" />
                <p className="text-green-600 text-sm italic font-medium leading-relaxed">
                  Tu commandes, WAKA livre. La voix de la livraison au Cameroun.
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