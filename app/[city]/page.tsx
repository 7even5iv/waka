"use client"

import React, { useState, useEffect } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { motion, AnimatePresence } from 'framer-motion'
import {
  MapPin, Search, Heart, Star, Clock, ChevronRight,
  ArrowLeft, ArrowRight, Sparkles, Compass, TrendingUp, Award,
  Sliders, LayoutGrid, List, Zap, Shield, Coffee,
  ShoppingBag, X, UtensilsCrossed, Gift, Store, Phone, Users,
  Truck, BadgeCheck, Flame, CircleDollarSign, Timer, ThumbsUp,
  Crown, Gem, Rocket, Leaf
} from 'lucide-react'

// ========== DONNÉES SIMULÉES ==========
const PARTNERS = [
  {
    id: 1,
    name: "Chez Maman Ndolé",
    desc: "Cuisine locale authentique - Le goût du pays",
    category: "Restaurant",
    type: "local",
    city: "douala",
    cover: "/images/restaurant1.jpg",
    rating: 4.9,
    deliveryTime: "20-30 min",
    priceRange: "💰💰",
    isOpen: true,
    featured: true,
    ordersCount: 1250
  },
  {
    id: 2,
    name: "Super U Akwa",
    desc: "Vos courses livrées en un temps record",
    category: "Supermarché",
    type: "grand",
    city: "douala",
    cover: "/images/supermarket1.jpg",
    rating: 4.7,
    deliveryTime: "30-40 min",
    priceRange: "💰💰💰",
    isOpen: true,
    featured: false,
    ordersCount: 890
  },
  {
    id: 3,
    name: "The Famous",
    desc: "Grands Maîtres de la Grillade",
    category: "Restaurant",
    type: "grand",
    city: "yaounde",
    cover: "/images/pizzeria.jpg",
    rating: 4.8,
    deliveryTime: "35-50 min",
    priceRange: "💰💰💰",
    isOpen: true,
    featured: true,
    ordersCount: 2100
  },
  {
    id: 4,
    name: "Délices de Bastos",
    desc: "Petit déjeuner et plats locaux",
    category: "Restaurant",
    type: "local",
    city: "yaounde",
    cover: "/images/restaurant_1.jpg",
    rating: 4.6,
    deliveryTime: "15-25 min",
    priceRange: "💰",
    isOpen: false,
    featured: false,
    ordersCount: 567
  }
]

const Logo = ({ className = "h-8 w-auto" }) => (
  <Link href="/" className="flex items-center gap-2 group">
    <Image src="/images/logo.png" alt="WAKA Logo" width={180} height={60} className={`${className} object-contain`} priority />
  </Link>
)

// ========== CARTE PARTENAIRE ULTRA PROFESSIONNELLE ==========
const PartnerCard = ({ partner, index, cityColor, isFavorite, onToggleFavorite }: any) => {
  const [isHovered, setIsHovered] = useState(false)
  const [imageLoaded, setImageLoaded] = useState(false)

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.05, type: "spring", stiffness: 100 }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className="relative group"
    >
      <div className="relative overflow-hidden rounded-3xl bg-white shadow-lg hover:shadow-2xl transition-all duration-500 border border-gray-100">

        {/* Image Section */}
        <Link href={`/${partner.city}/${partner.id}`}>
          <div className="relative h-64 overflow-hidden bg-gradient-to-br from-gray-100 to-gray-200">
            {!imageLoaded && (
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-8 h-8 border-2 border-green-500 border-t-transparent rounded-full animate-spin" />
              </div>
            )}
            <img
              src={partner.cover}
              alt={partner.name}
              className={`w-full h-full object-cover transition-all duration-700 ${isHovered ? 'scale-110' : 'scale-100'} ${imageLoaded ? 'opacity-100' : 'opacity-0'}`}
              onLoad={() => setImageLoaded(true)}
            />

            {/* Gradient Overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />

            {/* Badges Section */}
            <div className="absolute top-4 left-4 flex gap-2">
              {partner.featured && (
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  className="bg-gradient-to-r from-yellow-400 to-orange-500 text-white text-[10px] font-black px-3 py-1.5 rounded-full flex items-center gap-1 shadow-lg"
                >
                  <Crown size={12} /> À la une
                </motion.div>
              )}
              {partner.type === 'local' && (
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: 0.1 }}
                  className="bg-emerald-500 text-white text-[10px] font-black px-3 py-1.5 rounded-full flex items-center gap-1 shadow-lg"
                >
                  <UtensilsCrossed size={10} /> Local
                </motion.div>
              )}
              {partner.rating >= 4.8 && (
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: 0.2 }}
                  className="bg-gradient-to-r from-purple-500 to-pink-500 text-white text-[10px] font-black px-3 py-1.5 rounded-full flex items-center gap-1 shadow-lg"
                >
                  <Flame size={12} /> Populaire
                </motion.div>
              )}
            </div>

            {/* Stats Overlay */}
            <div className="absolute bottom-4 left-4 right-4">
              <div className="flex items-center justify-between">
                <div className="flex gap-2">
                  <div className="bg-black/50 backdrop-blur-md rounded-full px-3 py-1.5 flex items-center gap-1">
                    <Star size={12} className="text-yellow-400 fill-yellow-400" />
                    <span className="text-white text-xs font-bold">{partner.rating}</span>
                  </div>
                  <div className="bg-black/50 backdrop-blur-md rounded-full px-3 py-1.5 flex items-center gap-1">
                    <Timer size={12} className="text-green-400" />
                    <span className="text-white text-xs font-bold">{partner.deliveryTime}</span>
                  </div>
                </div>
                <div className="bg-black/50 backdrop-blur-md rounded-full px-3 py-1.5 flex items-center gap-1">
                  <Truck size={12} className="text-blue-400" />
                  <span className="text-white text-xs font-bold">{partner.ordersCount}+ commandes</span>
                </div>
              </div>
            </div>

            {/* Favorite Button */}
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={(e) => { e.preventDefault(); onToggleFavorite(partner.id) }}
              className="absolute top-4 right-4 p-2.5 bg-white/90 backdrop-blur-md rounded-full shadow-lg hover:shadow-xl transition-all z-10"
            >
              <Heart size={18} className={`transition-all ${isFavorite ? 'fill-red-500 text-red-500' : 'text-gray-600'}`} />
            </motion.button>

            {/* Open/Closed Status */}
            {!partner.isOpen && (
              <div className="absolute inset-0 bg-black/60 flex items-center justify-center backdrop-blur-sm">
                <div className="text-center">
                  <div className="bg-red-500 text-white px-4 py-2 rounded-full text-xs font-bold">Fermé</div>
                </div>
              </div>
            )}
          </div>
        </Link>

        {/* Content Section */}
        <div className="p-6">
          <div className="flex items-start justify-between mb-3">
            <div className="flex-1">
              <Link href={`/${partner.city}/${partner.id}`}>
                <h3 className="text-xl font-bold text-gray-900 mb-1 hover:text-green-600 transition-colors">
                  {partner.name}
                </h3>
              </Link>
              <p className="text-sm text-gray-500 line-clamp-2">{partner.desc}</p>
            </div>
            <div className="ml-3">
              <span className="text-sm font-bold text-gray-700">{partner.priceRange}</span>
            </div>
          </div>

          {/* Categories Tags */}
          <div className="flex flex-wrap gap-2 mb-4">
            <span className="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded-lg">
              {partner.category}
            </span>
            {partner.type === 'local' && (
              <span className="text-xs bg-emerald-50 text-emerald-600 px-2 py-1 rounded-lg flex items-center gap-1">
                <Leaf size={10} /> Authentique
              </span>
            )}
          </div>

          {/* Action Buttons */}
          <div className="flex items-center gap-3">
            <motion.a
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              href={`https://wa.me/237621004286?text=Bonjour WAKA, je souhaite commander chez ${partner.name}`}
              target="_blank"
              className="flex-1 py-3 rounded-xl bg-gradient-to-r from-green-500 to-emerald-600 text-white font-bold text-sm flex items-center justify-center gap-2 shadow-md hover:shadow-lg transition-all"
              onClick={(e) => e.stopPropagation()}
            >
              <Phone size={16} /> Commander
            </motion.a>

            <Link href={`/${partner.city}/${partner.id}`} className="flex-1">
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className={`py-3 rounded-xl bg-gradient-to-r ${cityColor} text-white font-bold text-sm flex items-center justify-center gap-2 shadow-md hover:shadow-lg transition-all`}
              >
                Voir <ChevronRight size={16} />
              </motion.div>
            </Link>
          </div>

          {/* Delivery Info Bar */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: isHovered ? 1 : 0, y: isHovered ? 0 : 10 }}
            className="absolute bottom-0 left-0 right-0 bg-gradient-to-r from-green-600 to-emerald-600 p-3 rounded-b-3xl"
          >
            <div className="flex items-center justify-between text-white text-xs">
              <span className="flex items-center gap-1">
                <Truck size={12} /> Livraison gratuite dès 5000 FCFA
              </span>
              <span className="flex items-center gap-1">
                <BadgeCheck size={12} /> Partenaire certifié
              </span>
            </div>
          </motion.div>
        </div>
      </div>
    </motion.div>
  )
}

// ========== CARTE STATS ==========
const StatCard = ({ icon: Icon, value, label, color, gradient }: any) => (
  <motion.div
    whileHover={{ y: -5, scale: 1.02 }}
    className={`bg-gradient-to-br ${gradient} rounded-2xl p-6 text-white shadow-xl`}
  >
    <Icon size={32} className="mb-3 opacity-80" />
    <h3 className="text-3xl font-black mb-1">{value}</h3>
    <p className="text-sm opacity-90">{label}</p>
  </motion.div>
)

// ========== CARD BANNER ==========
const FeaturedBanner = ({ cityName, cityColor }: any) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-emerald-900 to-green-800 p-8 mb-10 shadow-2xl"
  >
    <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full -mr-20 -mt-20 blur-3xl" />
    <div className="absolute bottom-0 left-0 w-48 h-48 bg-yellow-400/5 rounded-full -ml-20 -mb-20 blur-2xl" />

    <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-6">
      <div className="flex items-center gap-5">
        <div className="w-20 h-20 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-2xl flex items-center justify-center shadow-xl rotate-6">
          <Gift size={40} className="text-white" />
        </div>
        <div>
          <h2 className="text-3xl font-black uppercase tracking-tight text-white flex items-center gap-2">
            <Gem className="text-yellow-400" /> WAKA Points
          </h2>
          <p className="text-emerald-100 text-sm font-medium">
            1000 FCFA = 1 point • 20 points = livraison offerte
          </p>
        </div>
      </div>

      <motion.div
        whileHover={{ scale: 1.05 }}
        className="flex gap-3"
      >
        <Link href="/profile" className="px-8 py-4 bg-white text-emerald-900 rounded-2xl font-black hover:bg-yellow-400 hover:text-black transition-all shadow-lg text-sm uppercase tracking-widest">
          Mon Solde: 15 pts
        </Link>
      </motion.div>
    </div>
  </motion.div>
)

// ========== CARD RECRUTEMENT ==========
const RecrutementCard = ({ cityName }: any) => (
  <motion.div
    initial={{ opacity: 0, scale: 0.95 }}
    whileInView={{ opacity: 1, scale: 1 }}
    viewport={{ once: true }}
    className="relative overflow-hidden rounded-[3rem] bg-gradient-to-br from-yellow-400 via-yellow-500 to-orange-500 p-12 text-center shadow-2xl"
  >
    {/* Animated Background */}
    <div className="absolute inset-0 opacity-10">
      <div className="absolute top-0 left-0 w-64 h-64 bg-white rounded-full -translate-x-1/2 -translate-y-1/2 animate-pulse" />
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-white rounded-full translate-x-1/2 translate-y-1/2 animate-pulse delay-1000" />
    </div>

    <div className="relative z-10">
      <motion.div
        animate={{ rotate: [0, 10, -10, 0] }}
        transition={{ duration: 2, repeat: Infinity }}
        className="inline-block"
      >
        <Store size={64} className="mx-auto mb-6 text-emerald-900" />
      </motion.div>

      <h2 className="text-4xl md:text-5xl font-black mb-4 uppercase tracking-tighter text-emerald-950">
        Vous avez un restaurant à {cityName} ?
      </h2>

      <p className="text-emerald-900 font-bold mb-8 max-w-2xl mx-auto text-lg">
        Hébergement GRATUIT pour les premiers partenaires.<br />
        Donnez de la visibilité à vos plats et augmentez vos revenus avec WAKA.
      </p>

      <div className="flex flex-col sm:flex-row gap-4 justify-center">
        <Link href="/devenir-partenaire">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="px-8 py-4 bg-emerald-900 text-white rounded-2xl font-black hover:bg-emerald-800 transition-all shadow-xl text-sm uppercase tracking-widest flex items-center gap-2"
          >
            Inscrire mon établissement <Rocket size={18} />
          </motion.button>
        </Link>

        <Link href="/contact">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="px-8 py-4 bg-white/20 backdrop-blur-sm text-emerald-900 rounded-2xl font-black hover:bg-white/30 transition-all shadow-xl text-sm uppercase tracking-widest"
          >
            En savoir plus
          </motion.button>
        </Link>
      </div>
    </div>
  </motion.div>
)

export default function CityPage({ params }: { params: Promise<{ city: string }> | { city: string } }) {
  const [city, setCity] = useState<string>('')
  const [searchTerm, setSearchTerm] = useState("")
  const [activeCategory, setActiveCategory] = useState("Tous")
  const [favorites, setFavorites] = useState<number[]>([])
  const [isScrolled, setIsScrolled] = useState(false)
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid")

  useEffect(() => {
    const resolveParams = async () => {
      const resolved = await params
      setCity(resolved.city)
    }
    resolveParams()
    const handleScroll = () => setIsScrolled(window.scrollY > 50)
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [params])

  const partners = PARTNERS.filter(p => p.city === city.toLowerCase())
  const filtered = partners.filter(p => {
    const matchSearch = p.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      p.desc.toLowerCase().includes(searchTerm.toLowerCase())
    if (activeCategory === "Favoris") return matchSearch && favorites.includes(p.id)
    if (activeCategory === "Locaux") return matchSearch && p.type === "local"
    return matchSearch && (activeCategory === "Tous" || p.category === activeCategory)
  })

  const cityName = city === 'douala' ? 'Douala' : 'Yaoundé'
  const cityColor = city === 'douala' ? 'from-green-500 to-emerald-600' : 'from-yellow-400 to-amber-500'

  if (!city) return (
    <div className="h-screen flex items-center justify-center bg-gradient-to-br from-green-50 to-emerald-50">
      <div className="text-center">
        <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-green-500 mx-auto mb-4"></div>
        <p className="text-green-600 font-medium">Chargement de {cityName}...</p>
      </div>
    </div>
  )

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white font-sans">

      {/* Header */}
      <header className={`sticky top-0 z-50 transition-all duration-300 ${isScrolled ? 'bg-white/95 backdrop-blur-xl border-b border-gray-100 shadow-lg' : 'bg-white border-b border-gray-100'}`}>
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Link href="/">
              <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }} className="p-2 hover:bg-gray-100 rounded-full transition-colors">
                <ArrowLeft size={20} />
              </motion.div>
            </Link>
            <Logo />
          </div>

          <div className="flex items-center gap-3">
            {/* View Toggle */}
            <div className="hidden md:flex bg-gray-100 rounded-full p-1">
              <button
                onClick={() => setViewMode("grid")}
                className={`p-2 rounded-full transition-all ${viewMode === "grid" ? 'bg-white shadow-md text-green-600' : 'text-gray-400'}`}
              >
                <LayoutGrid size={18} />
              </button>
              <button
                onClick={() => setViewMode("list")}
                className={`p-2 rounded-full transition-all ${viewMode === "list" ? 'bg-white shadow-md text-green-600' : 'text-gray-400'}`}
              >
                <List size={18} />
              </button>
            </div>

            <div className={`px-5 py-2 rounded-full bg-gradient-to-r ${cityColor} text-white font-black text-xs uppercase tracking-widest shadow-md`}>
              📍 {cityName}
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-6 py-10">

        {/* FeaturedBanner */}
        <FeaturedBanner cityName={cityName} cityColor={cityColor} />

        {/* Stats Cards */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12">
          <StatCard icon={Store} value="150+" label="Partenaires actifs" color="green" gradient="from-green-500 to-emerald-600" />
          <StatCard icon={Users} value="5000+" label="Clients satisfaits" color="yellow" gradient="from-yellow-400 to-orange-500" />
          <StatCard icon={Truck} value="30min" label="Livraison moyenne" color="blue" gradient="from-blue-500 to-indigo-600" />
          <StatCard icon={Star} value="4.8" label="Note moyenne" color="purple" gradient="from-purple-500 to-pink-500" />
        </div>

        {/* Live Delivery Status */}
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-3">
            <div className="relative">
              <div className="w-3 h-3 bg-green-500 rounded-full animate-ping absolute" />
              <div className="w-3 h-3 bg-green-500 rounded-full relative" />
            </div>
            <span className="text-xs font-black text-green-700 uppercase tracking-widest">
              {filtered.length} partenaires disponibles • 5 livreurs actifs
            </span>
          </div>
          <div className="flex items-center gap-2">
            <Sparkles size={16} className="text-yellow-500" />
            <span className="text-xs font-medium text-gray-500">Service Premium</span>
          </div>
        </div>

        {/* Search & Filters */}
        <div className="mb-10 space-y-6">
          <div className="relative max-w-2xl mx-auto">
            <Search className="absolute left-5 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
            <input
              type="text"
              placeholder={`Rechercher un restaurant local à ${cityName}...`}
              className="w-full pl-14 pr-6 py-5 rounded-2xl border border-gray-200 shadow-lg focus:ring-2 focus:ring-green-500 outline-none text-gray-700 transition-all"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>

          <div className="flex gap-3 overflow-x-auto pb-4 scrollbar-hide px-2">
            {["Tous", "Locaux", "Restaurant", "Supermarché", "Favoris"].map((cat) => (
              <motion.button
                key={cat}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setActiveCategory(cat)}
                className={`px-8 py-3 rounded-2xl whitespace-nowrap font-black text-xs uppercase tracking-widest transition-all ${activeCategory === cat
                  ? `bg-gradient-to-r ${cityColor} text-white shadow-lg`
                  : 'bg-white text-gray-500 border border-gray-200 hover:border-green-300'
                  }`}
              >
                {cat === "Locaux" ? "🍲 Restos Locaux" : cat === "Tous" ? "🏠 Tous" : cat}
              </motion.button>
            ))}
          </div>
        </div>

        {/* Referral Banner */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="mb-12 p-6 bg-gradient-to-r from-emerald-600 to-green-500 rounded-2xl shadow-xl"
        >
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-white/20 rounded-xl">
                <Users className="text-white" size={24} />
              </div>
              <div>
                <p className="text-white font-black text-sm uppercase tracking-tight flex items-center gap-2">
                  <CircleDollarSign size={16} /> Gagnez 500 FCFA Cash !
                </p>
                <p className="text-green-100 text-xs font-medium">Partagez votre code de parrainage avec un proche.</p>
              </div>
            </div>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-6 py-3 bg-white text-emerald-700 text-xs font-black rounded-xl hover:bg-yellow-400 hover:text-black transition-all shadow-md uppercase tracking-widest"
            >
              Inviter un ami 🤝
            </motion.button>
          </div>
        </motion.div>

        {/* Results Grid */}
        <div className={`grid ${viewMode === "grid" ? 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3' : 'grid-cols-1'} gap-10`}>
          {filtered.length > 0 ? (
            filtered.map((p, i) => (
              <PartnerCard
                key={p.id}
                partner={p}
                index={i}
                cityColor={cityColor}
                onToggleFavorite={(id: number) => setFavorites(favorites.includes(id) ? favorites.filter(f => f !== id) : [...favorites, id])}
                isFavorite={favorites.includes(p.id)}
              />
            ))
          ) : (
            <div className="col-span-full py-20 text-center">
              <Compass size={48} className="mx-auto text-gray-300 mb-4 animate-bounce" />
              <p className="text-gray-500 font-bold uppercase text-xs tracking-widest">Aucun résultat trouvé.</p>
              <p className="text-gray-400 text-sm mt-2">Essayez de modifier votre recherche</p>
            </div>
          )}
        </div>

        {/* Recrutement Card */}
        <div className="mt-24">
          <RecrutementCard cityName={cityName} />
        </div>

      </main>

      <style jsx global>{`
        .scrollbar-hide::-webkit-scrollbar { display: none; }
        .scrollbar-hide { -ms-overflow-style: none; scrollbar-width: none; }
      `}</style>
    </div>
  )
}