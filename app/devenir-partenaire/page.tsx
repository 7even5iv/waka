"use client"

import React, { useState, useEffect } from 'react'
import { motion, AnimatePresence, Variants } from 'framer-motion'
import {
    Store, TrendingUp, Zap, Users, ArrowRight, Home, Info,
    Coffee, Bike, Menu, X, ChevronRight, Phone, Mail, MapPin,
    Utensils, Sparkles, Shield, Clock, Star, CheckCircle, MessageCircle,
    Newspaper
} from 'lucide-react'
import Link from 'next/link'
import Image from 'next/image'

// ========== LOGO AGRANDI ==========
const Logo = ({ className = "h-10 w-auto" }) => (
    <Link href="/" className="flex items-center gap-2 group">
        <Image src="/images/logo.png" alt="WAKA Logo" width={200} height={500} className={`${className} object-contain transition-all duration-300 group-hover:scale-105`} priority />
    </Link>
)

// Composant Navbar flottante avec logo AGRANDI
const FloatingNavbar = () => {
    const [scrolled, setScrolled] = useState(false)
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
    const [activeLink, setActiveLink] = useState('/devenir-partenaire')

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

export default function PartnerPage() {
    const [formData, setFormData] = useState({
        restaurantName: '',
        city: '',
        district: '',
        phone: ''
    })

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault()
        console.log('Form submitted:', formData)
        alert('Merci ! Notre équipe vous contactera sous 24h.')
    }

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        })
    }

    return (
        <div className="min-h-screen bg-gradient-to-br from-white via-green-50 to-emerald-50 overflow-hidden font-sans">

            {/* Navbar flottante */}
            <FloatingNavbar />

            {/* Hero Section */}
            <div className="max-w-7xl mx-auto px-6 pt-32 pb-20 relative z-10">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
                    {/* Left Content */}
                    <motion.div
                        initial={{ opacity: 0, x: -50 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.6 }}
                    >
                        {/* Badge */}
                        <motion.div
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ delay: 0.2 }}
                            className="inline-flex items-center gap-2 bg-gradient-to-r from-emerald-100 to-green-100 px-4 py-2 rounded-full mb-6"
                        >
                            <Sparkles size={16} className="text-emerald-600" />
                            <span className="text-xs font-black text-emerald-700 uppercase tracking-wider">Opportunité Unique</span>
                        </motion.div>

                        <h1 className="text-5xl md:text-6xl lg:text-7xl font-black text-emerald-950 mb-6 leading-tight">
                            Faites grandir votre{' '}
                            <span className="bg-gradient-to-r from-emerald-600 to-green-600 bg-clip-text text-transparent">
                                restaurant
                            </span>
                            <br />
                            avec WAKA.
                        </h1>
                        <p className="text-lg text-emerald-700 mb-10 leading-relaxed">
                            Ne laissez plus vos tables vides. Rejoignez la plateforme qui apporte vos plats directement aux clients, partout au Cameroun.
                        </p>

                        {/* Avantages */}
                        <div className="space-y-4">
                            {[
                                { icon: Zap, title: "Hébergement Gratuit", desc: "Soyez visible gratuitement sur notre plateforme au lancement.", color: "from-yellow-400 to-amber-500" },
                                { icon: TrendingUp, title: "Commission Juste (10-15%)", desc: "On ne gagne que si vous gagnez. Un taux imbattable.", color: "from-emerald-500 to-green-600" },
                                { icon: Users, title: "Nouveaux Clients", desc: "Touchez ceux qui ne peuvent pas se déplacer.", color: "from-blue-500 to-cyan-600" },
                                { icon: Shield, title: "Paiements Sécurisés", desc: "Transactions transparentes et versements hebdomadaires.", color: "from-purple-500 to-pink-600" }
                            ].map((item, i) => (
                                <motion.div
                                    key={i}
                                    initial={{ opacity: 0, x: -30 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    transition={{ delay: 0.3 + i * 0.1 }}
                                    className="flex gap-4 p-4 rounded-2xl bg-white/60 backdrop-blur-sm border border-green-100 hover:shadow-lg transition-all group cursor-pointer"
                                >
                                    <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${item.color} flex items-center justify-center shrink-0 text-white shadow-lg group-hover:scale-110 transition-transform`}>
                                        <item.icon size={24} />
                                    </div>
                                    <div>
                                        <h3 className="font-black text-emerald-900">{item.title}</h3>
                                        <p className="text-sm text-emerald-600">{item.desc}</p>
                                    </div>
                                </motion.div>
                            ))}
                        </div>

                        {/* Stats */}
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 0.7 }}
                            className="mt-10 flex gap-8 pt-6 border-t border-green-200"
                        >
                            <div>
                                <div className="flex items-center gap-1 text-2xl font-black text-emerald-600">
                                    156+ <Star size={18} className="fill-yellow-400 text-yellow-400" />
                                </div>
                                <p className="text-xs text-emerald-500 font-bold">Partenaires actifs</p>
                            </div>
                            <div>
                                <div className="flex items-center gap-1 text-2xl font-black text-emerald-600">
                                    98% <CheckCircle size={18} className="text-green-500" />
                                </div>
                                <p className="text-xs text-emerald-500 font-bold">Taux de satisfaction</p>
                            </div>
                            <div>
                                <div className="flex items-center gap-1 text-2xl font-black text-emerald-600">
                                    30min <Clock size={18} className="text-emerald-500" />
                                </div>
                                <p className="text-xs text-emerald-500 font-bold">Livraison moyenne</p>
                            </div>
                        </motion.div>
                    </motion.div>

                    {/* Formulaire */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9, y: 50 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.2 }}
                        className="relative"
                    >
                        <div className="absolute -top-5 -right-5 w-24 h-24 bg-gradient-to-r from-yellow-400 to-amber-500 rounded-full blur-2xl opacity-20" />

                        <div className="bg-white p-8 md:p-10 rounded-[2.5rem] shadow-2xl border border-green-100 relative">
                            <div className="text-center mb-8">
                                <div className="w-16 h-16 bg-gradient-to-br from-emerald-500 to-green-500 rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg">
                                    <Store size={32} className="text-white" />
                                </div>
                                <h2 className="text-2xl font-black text-emerald-900 uppercase tracking-tight">
                                    Inscrire mon établissement
                                </h2>
                                <p className="text-sm text-emerald-500 mt-2">Remplissez le formulaire ci-dessous</p>
                            </div>

                            <form onSubmit={handleSubmit} className="space-y-4">
                                <div>
                                    <label className="block text-xs font-black text-emerald-700 mb-2 uppercase tracking-wider">Nom du restaurant</label>
                                    <input
                                        type="text"
                                        name="restaurantName"
                                        value={formData.restaurantName}
                                        onChange={handleChange}
                                        placeholder="ex: La Pasta Douala"
                                        className="w-full p-4 rounded-xl border-2 border-green-100 bg-green-50/30 focus:border-emerald-500 focus:bg-white outline-none transition-all"
                                        required
                                    />
                                </div>
                                <div className="grid grid-cols-2 gap-4">
                                    <div>
                                        <label className="block text-xs font-black text-emerald-700 mb-2 uppercase tracking-wider">Ville</label>
                                        <input
                                            type="text"
                                            name="city"
                                            value={formData.city}
                                            onChange={handleChange}
                                            placeholder="Douala / Yaoundé"
                                            className="w-full p-4 rounded-xl border-2 border-green-100 bg-green-50/30 focus:border-emerald-500 focus:bg-white outline-none transition-all"
                                            required
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-xs font-black text-emerald-700 mb-2 uppercase tracking-wider">Quartier</label>
                                        <input
                                            type="text"
                                            name="district"
                                            value={formData.district}
                                            onChange={handleChange}
                                            placeholder="Bonapriso, Bastos..."
                                            className="w-full p-4 rounded-xl border-2 border-green-100 bg-green-50/30 focus:border-emerald-500 focus:bg-white outline-none transition-all"
                                            required
                                        />
                                    </div>
                                </div>
                                <div>
                                    <label className="block text-xs font-black text-emerald-700 mb-2 uppercase tracking-wider">Numéro WhatsApp</label>
                                    <input
                                        type="tel"
                                        name="phone"
                                        value={formData.phone}
                                        onChange={handleChange}
                                        placeholder="+237 6XX XXX XXX"
                                        className="w-full p-4 rounded-xl border-2 border-green-100 bg-green-50/30 focus:border-emerald-500 focus:bg-white outline-none transition-all"
                                        required
                                    />
                                </div>

                                <motion.button
                                    whileHover={{ scale: 1.02 }}
                                    whileTap={{ scale: 0.98 }}
                                    type="submit"
                                    className="w-full py-5 bg-gradient-to-r from-yellow-400 to-amber-500 hover:from-yellow-500 hover:to-amber-600 text-black font-black rounded-2xl shadow-lg transition-all flex items-center justify-center gap-2 text-sm uppercase tracking-wider"
                                >
                                    DEVENIR PARTENAIRE <ArrowRight size={18} />
                                </motion.button>

                                <p className="text-center text-xs text-emerald-400 mt-4">
                                    Notre équipe vous contactera sous 24h
                                </p>
                            </form>
                        </div>
                    </motion.div>
                </div>
            </div>

            {/* Footer avec logo AGRANDI */}
            <footer className="bg-white border-t border-green-100 py-16 relative z-10 mt-10">
                <div className="max-w-7xl mx-auto px-6">
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
                        <div>
                            <Logo className="h-20 w-auto mb-6" />
                            <p className="text-emerald-600 text-sm leading-relaxed">Tu commandes, WAKA livre. La plateforme n°1 au Cameroun.</p>
                        </div>
                        <div>
                            <h4 className="font-black text-emerald-900 mb-6 uppercase text-xs tracking-widest">Navigation</h4>
                            <ul className="space-y-4">
                                <li><Link href="/" className="text-emerald-600 text-sm flex items-center gap-3 hover:text-emerald-500 transition-colors"><Home size={16} /> Accueil</Link></li>
                                <li><Link href="/blog" className="text-emerald-600 text-sm flex items-center gap-3 hover:text-emerald-500 transition-colors"><Newspaper size={16} /> Blog</Link></li>
                                <li><Link href="/services" className="text-emerald-600 text-sm flex items-center gap-3 hover:text-emerald-500 transition-colors"><Coffee size={16} /> Services</Link></li>
                                <li><Link href="/about" className="text-emerald-600 text-sm flex items-center gap-3 hover:text-emerald-500 transition-colors"><Info size={16} /> À propos</Link></li>
                                <li><Link href="/contact" className="text-emerald-600 text-sm flex items-center gap-3 hover:text-emerald-500 transition-colors"><MessageCircle size={16} /> Contact</Link></li>
                            </ul>
                        </div>
                        <div>
                            <h4 className="font-black text-emerald-900 mb-6 uppercase text-xs tracking-widest">Business</h4>
                            <ul className="space-y-4">
                                <li><Link href="/devenir-partenaire" className="text-emerald-600 text-sm flex items-center gap-3 hover:text-emerald-500 transition-colors"><Store size={16} /> Devenir Partenaire</Link></li>
                                <li><Link href="/recrutement-livreur" className="text-emerald-600 text-sm flex items-center gap-3 hover:text-emerald-500 transition-colors"><Bike size={16} /> Devenir Livreur</Link></li>
                            </ul>
                        </div>
                        <div>
                            <h4 className="font-black text-emerald-900 mb-6 uppercase text-xs tracking-widest">Contact</h4>
                            <ul className="space-y-4 text-emerald-600 text-sm">
                                <li className="flex items-center gap-3"><Phone size={16} className="text-emerald-500" /> +237 621 004 286</li>
                                <li className="flex items-center gap-3"><Mail size={16} className="text-emerald-500" /> contact@waka.cm</li>
                                <li className="flex items-center gap-3"><MapPin size={16} className="text-emerald-500" /> Douala & Yaoundé</li>
                                <li className="mt-4">
                                    <Link href="/contact" className="inline-flex items-center gap-2 text-emerald-500 hover:text-emerald-700 transition-colors text-sm font-bold">
                                        <MessageCircle size={16} /> Formulaire de contact
                                    </Link>
                                </li>
                            </ul>
                        </div>
                    </div>
                    <div className="mt-16 pt-8 border-t border-green-50 flex flex-col md:flex-row justify-between items-center gap-4">
                        <p className="text-emerald-400 text-xs">© 2024 WAKA Delivery Service. Tous droits réservés.</p>
                        <div className="flex gap-6">
                            <Link href="/terms" className="text-emerald-500 text-xs hover:text-emerald-700 transition-colors">Conditions d'utilisation</Link>
                            <Link href="/privacy" className="text-emerald-500 text-xs hover:text-emerald-700 transition-colors">Politique de confidentialité</Link>
                            <Link href="/contact" className="text-emerald-500 text-xs hover:text-emerald-700 transition-colors">Contact</Link>
                        </div>
                    </div>
                </div>
            </footer>
        </div>
    )
}