"use client"

import React, { useState, useEffect, useRef } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { motion, AnimatePresence } from 'framer-motion'
import { 
  MapPin, Search, Heart, Star, Clock, ChevronRight, 
  ArrowLeft, Sparkles, Compass, TrendingUp, Award, 
  Sliders, LayoutGrid, List, Zap, Shield, Coffee,
  ShoppingBag, X
} from 'lucide-react'

// ========== DONNÉES SIMULÉES ==========
const PARTNERS = [
  {
    id: 1,
    name: "Le Bistrot Parisien",
    desc: "Cuisine française authentique",
    category: "Restaurant",
    city: "douala",
    cover: "/images/restaurant1.jpg",
    rating: 4.9,
    deliveryTime: "25-35 min"
  },
  {
    id: 2,
    name: "Super U Douala",
    desc: "Supermarché - Produits frais",
    category: "Supermarché",
    city: "douala",
    cover: "/images/supermarket1.jpg",
    rating: 4.7,
    deliveryTime: "30-40 min"
  },
  {
    id: 3,
    name: "La Pizzeria",
    desc: "Pizzas artisanales",
    category: "Restaurant",
    city: "douala",
    cover: "/images/pizzeria.jpg",
    rating: 4.8,
    deliveryTime: "30-45 min"
  },
  {
    id: 4,
    name: "Marché Central",
    desc: "Épicerie fine et produits locaux",
    category: "Supermarché",
    city: "douala",
    cover: "/images/market.jpg",
    rating: 4.6,
    deliveryTime: "35-45 min"
  },
  {
    id: 5,
    name: "Saveurs d'Asie",
    desc: "Cuisine asiatique et sushi",
    category: "Restaurant",
    city: "yaounde",
    cover: "/images/asian.jpg",
    rating: 4.9,
    deliveryTime: "25-35 min"
  },
  {
    id: 6,
    name: "Super U Yaoundé",
    desc: "Supermarché - Tout pour la maison",
    category: "Supermarché",
    city: "yaounde",
    cover: "/images/supermarket2.jpg",
    rating: 4.8,
    deliveryTime: "30-40 min"
  }
]

// ========== COMPOSANT LOGO ANIMÉ ==========
const Logo = ({ className = "h-8 w-auto" }) => {
  const logoSrc = "/images/logo.png"
  
  return (
    <Link href="/" className="flex items-center gap-2 group">
      <div className="relative">
        <Image
          src={logoSrc}
          alt="WAKA Logo"
          width={180}
          height={60}
          className={`${className} object-contain transition-all duration-300 group-hover:scale-105`}
          priority
        />
      </div>
    </Link>
  )
}

// ========== CARTE PARTENAIRE DESIGN INNOVANT ==========
const PartnerCard = ({ partner, index, cityColor, isFavorite, onToggleFavorite }: any) => {
  const [isHovered, setIsHovered] = useState(false)
  
  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.05, type: "spring", stiffness: 100 }}
      whileHover={{ y: -8 }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className="relative group"
    >
      <Link href={`/${partner.city}/${partner.id}`}>
        <div className="relative overflow-hidden rounded-3xl bg-white shadow-lg hover:shadow-2xl transition-all duration-500">
          {/* Image avec overlay dynamique */}
          <div className="relative h-64 overflow-hidden">
            <img 
              src={partner.cover} 
              alt={partner.name}
              className="w-full h-full object-cover transition-transform duration-700"
              style={{ transform: isHovered ? 'scale(1.1)' : 'scale(1)' }}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />
            
            {/* Badge premium */}
            {partner.rating >= 4.8 && (
              <motion.div 
                initial={{ x: -100, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                className="absolute top-4 left-4 bg-gradient-to-r from-yellow-400 to-amber-500 px-3 py-1.5 rounded-full shadow-lg"
              >
                <div className="flex items-center gap-1">
                  <Zap size={12} className="text-green-900" />
                  <span className="text-[10px] font-black text-green-900 uppercase">Premium</span>
                </div>
              </motion.div>
            )}
            
            {/* Bouton favoris */}
            <motion.button 
              onClick={(e) => { e.preventDefault(); e.stopPropagation(); onToggleFavorite(partner.id) }}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              className="absolute top-4 right-4 p-2.5 bg-white/90 backdrop-blur-md rounded-full shadow-lg hover:shadow-xl transition-all z-10"
            >
              <Heart 
                size={18} 
                className={isFavorite ? 'fill-red-500 text-red-500' : 'text-gray-600'}
              />
            </motion.button>
          </div>
          
          {/* Contenu */}
          <div className="relative p-5">
            <div className="flex items-start justify-between mb-3">
              <div>
                <h3 className="text-xl font-bold text-gray-900 mb-1">{partner.name}</h3>
                <p className="text-sm text-gray-500 line-clamp-1">{partner.desc}</p>
              </div>
              <div className="flex items-center gap-1 bg-green-50 px-2 py-1 rounded-lg">
                <Star size={14} className="text-yellow-400 fill-yellow-400" />
                <span className="text-sm font-semibold text-green-700">{partner.rating}</span>
              </div>
            </div>
            
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="flex items-center gap-1 text-gray-500">
                  <Clock size={14} />
                  <span className="text-xs">{partner.deliveryTime}</span>
                </div>
                <div className="w-1 h-1 rounded-full bg-gray-300" />
                <span className="text-xs text-gray-500">{partner.category}</span>
              </div>
              
              <motion.div 
                animate={{ x: isHovered ? 5 : 0 }}
                className={`w-8 h-8 rounded-full bg-gradient-to-r ${cityColor} flex items-center justify-center shadow-md`}
              >
                <ChevronRight size={16} className="text-white" />
              </motion.div>
            </div>
          </div>
          
          {/* Barre de progression animée */}
          <motion.div 
            className={`absolute bottom-0 left-0 h-1 bg-gradient-to-r ${cityColor}`}
            initial={{ width: "0%" }}
            whileHover={{ width: "100%" }}
            transition={{ duration: 0.3 }}
          />
        </div>
      </Link>
    </motion.div>
  )
}

// ========== CARTE CATÉGORIE INTERACTIVE ==========
const CategoryCard = ({ category, icon: Icon, count, isActive, onClick, color }: any) => {
  return (
    <motion.button
      onClick={onClick}
      whileHover={{ y: -4 }}
      whileTap={{ scale: 0.95 }}
      className={`relative flex-shrink-0 px-6 py-3 rounded-2xl transition-all duration-300 ${
        isActive 
          ? `bg-gradient-to-r ${color} text-white shadow-lg` 
          : 'bg-white text-gray-600 hover:bg-gray-50 border border-gray-200'
      }`}
    >
      <div className="flex items-center gap-2">
        <Icon size={18} />
        <span className="font-medium text-sm">{category}</span>
        {count > 0 && (
          <span className={`text-xs px-1.5 py-0.5 rounded-full ${
            isActive ? 'bg-white/20' : 'bg-gray-100'
          }`}>
            {count}
          </span>
        )}
      </div>
    </motion.button>
  )
}

// ========== COMPOSANT RECHERCHE AVANCÉE ==========
const SearchBar = ({ value, onChange, cityColor }: any) => {
  const [isFocused, setIsFocused] = useState(false)
  
  return (
    <motion.div 
      animate={{ scale: isFocused ? 1.02 : 1 }}
      className="relative"
    >
      <div className="absolute left-4 top-1/2 -translate-y-1/2">
        <Search size={20} className="text-gray-400" />
      </div>
      <input
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
        placeholder="Rechercher un restaurant, un supermarché..."
        className="w-full pl-12 pr-12 py-4 bg-white border border-gray-200 rounded-2xl focus:ring-2 focus:ring-green-500 focus:border-transparent outline-none transition-all text-gray-900 placeholder:text-gray-400"
      />
      {value && (
        <button 
          onClick={() => onChange('')}
          className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
        >
          <X size={18} />
        </button>
      )}
    </motion.div>
  )
}

// ========== COMPOSANT STATS VILLE ==========
const CityStats = ({ cityName, partners, rating, deliveryTime, color }: any) => {
  return (
    <div className="bg-gradient-to-br from-gray-50 to-white rounded-2xl p-6 border border-gray-100">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <div className={`w-10 h-10 rounded-xl bg-gradient-to-r ${color} flex items-center justify-center`}>
            <MapPin size={18} className="text-white" />
          </div>
          <div>
            <h3 className="font-bold text-gray-900">{cityName}</h3>
            <p className="text-xs text-gray-500">Votre ville</p>
          </div>
        </div>
        <div className="flex items-center gap-1 bg-green-50 px-3 py-1.5 rounded-full">
          <TrendingUp size={14} className="text-green-500" />
          <span className="text-xs font-semibold text-green-600">Actif</span>
        </div>
      </div>
      
      <div className="grid grid-cols-3 gap-4 mt-4">
        <div className="text-center">
          <div className="text-2xl font-bold text-gray-900">{partners}</div>
          <div className="text-[10px] text-gray-500 uppercase">Partenaires</div>
        </div>
        <div className="text-center">
          <div className="text-2xl font-bold text-gray-900">{rating}</div>
          <div className="text-[10px] text-gray-500 uppercase">Note</div>
        </div>
        <div className="text-center">
          <div className="text-2xl font-bold text-gray-900">{deliveryTime}</div>
          <div className="text-[10px] text-gray-500 uppercase">Livraison</div>
        </div>
      </div>
    </div>
  )
}

export default function CityPage({ params }: { params: Promise<{ city: string }> | { city: string } }) {
  // Gestion asynchrone des params
  const [city, setCity] = useState<string>('')
  const [searchTerm, setSearchTerm] = useState("")
  const [activeCategory, setActiveCategory] = useState("Tous")
  const [favorites, setFavorites] = useState<number[]>([])
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid')
  const [showFilters, setShowFilters] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)

  // Gestion du scroll sans useScroll
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  // Résoudre les params asynchrones
  useEffect(() => {
    const resolveParams = async () => {
      const resolved = await params
      setCity(resolved.city)
    }
    resolveParams()
  }, [params])

  useEffect(() => {
    const saved = localStorage.getItem('waka-favs')
    if (saved) setFavorites(JSON.parse(saved))
  }, [])

  const toggleFavorite = (id: number) => {
    const newFavs = favorites.includes(id) ? favorites.filter(f => f !== id) : [...favorites, id]
    setFavorites(newFavs)
    localStorage.setItem('waka-favs', JSON.stringify(newFavs))
  }

  const partners = PARTNERS.filter(p => p.city === city.toLowerCase())
  
  const categories = [
    { name: "Tous", icon: LayoutGrid, count: partners.length },
    { name: "Restaurant", icon: Coffee, count: partners.filter(p => p.category === "Restaurant").length },
    { name: "Supermarché", icon: ShoppingBag, count: partners.filter(p => p.category === "Supermarché").length },
    { name: "Favoris", icon: Heart, count: favorites.filter(id => partners.find(p => p.id === id)).length },
  ]

  const filtered = partners.filter(p => {
    const matchSearch = p.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                        p.desc.toLowerCase().includes(searchTerm.toLowerCase())
    if (activeCategory === "Favoris") return matchSearch && favorites.includes(p.id)
    return matchSearch && (activeCategory === "Tous" || p.category === activeCategory)
  })

  const cityName = city === 'douala' ? 'Douala' : city === 'yaounde' ? 'Yaoundé' : city
  const cityColor = city === 'douala' ? 'from-green-500 to-emerald-600' : 'from-yellow-400 to-amber-500'
  const cityStats = {
    douala: { partners: 156, rating: '4.8', deliveryTime: '30-45min' },
    yaounde: { partners: 142, rating: '4.7', deliveryTime: '30-45min' }
  }[city] || { partners: 0, rating: '0', deliveryTime: '0' }

  // Afficher un loader pendant le chargement de la ville
  if (!city) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-500"></div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-50">
      
      {/* Header animé */}
      <motion.header 
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.5 }}
        className={`sticky top-0 z-50 transition-all duration-300 ${
          isScrolled 
            ? 'bg-white/90 backdrop-blur-xl border-b border-gray-100 shadow-sm' 
            : 'bg-white border-b border-gray-100'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Link href="/" className="group">
                <motion.div 
                  whileHover={{ x: -3 }}
                  className="flex items-center gap-2 text-gray-600 hover:text-gray-900"
                >
                  <ArrowLeft size={20} />
                  <span className="text-sm font-medium hidden sm:inline">Retour</span>
                </motion.div>
              </Link>
              <Logo className="h-8 w-auto" />
            </div>
            
            <div className="flex items-center gap-3">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setViewMode(viewMode === 'grid' ? 'list' : 'grid')}
                className="p-2 rounded-lg bg-gray-100 hover:bg-gray-200 transition-colors"
              >
                {viewMode === 'grid' ? <List size={18} /> : <LayoutGrid size={18} />}
              </motion.button>
              
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setShowFilters(!showFilters)}
                className={`p-2 rounded-lg transition-colors ${
                  showFilters ? 'bg-green-500 text-white' : 'bg-gray-100 text-gray-600'
                }`}
              >
                <Sliders size={18} />
              </motion.button>
              
              <div className={`flex items-center gap-2 bg-gradient-to-r ${cityColor} px-3 py-1.5 rounded-full text-white font-bold text-xs shadow-md`}>
                <MapPin size={12} />
                <span>{cityName}</span>
              </div>
            </div>
          </div>
        </div>
      </motion.header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 py-8">
        
        {/* Hero Section */}
        <div className="relative mb-12">
          <div className="absolute inset-0 bg-gradient-to-r from-green-500/5 to-yellow-500/5 rounded-3xl blur-3xl" />
          <div className="relative text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-green-100 border border-green-200 mb-6"
            >
              <Sparkles size={14} className="text-green-600" />
              <span className="text-xs font-medium text-green-700 uppercase tracking-wide">
                Découvrez {cityName}
              </span>
            </motion.div>
            
            <motion.h1 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="text-4xl md:text-6xl font-black text-gray-900 mb-4"
            >
              Livraison express à
              <br />
              <span className={`bg-gradient-to-r ${cityColor} bg-clip-text text-transparent`}>
                {cityName}
              </span>
            </motion.h1>
            
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="text-gray-500 text-lg max-w-2xl mx-auto"
            >
              Les meilleurs restaurants et supermarchés livrés chez vous en moins de 45 minutes
            </motion.p>
          </div>
        </div>
        
        {/* Stats Section */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="mb-8"
        >
          <CityStats 
            cityName={cityName}
            partners={cityStats.partners}
            rating={cityStats.rating}
            deliveryTime={cityStats.deliveryTime}
            color={cityColor}
          />
        </motion.div>
        
        {/* Search Section */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="mb-8"
        >
          <SearchBar value={searchTerm} onChange={setSearchTerm} cityColor={cityColor} />
        </motion.div>
        
        {/* Categories */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="mb-8"
        >
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-bold text-gray-900">Catégories</h2>
            <span className="text-xs text-gray-400">{filtered.length} établissements</span>
          </div>
          <div className="flex gap-3 overflow-x-auto pb-2 scrollbar-hide">
            {categories.map((cat) => (
              <CategoryCard
                key={cat.name}
                category={cat.name}
                icon={cat.icon}
                count={cat.count}
                isActive={activeCategory === cat.name}
                onClick={() => setActiveCategory(cat.name)}
                color={cityColor}
              />
            ))}
          </div>
        </motion.div>
        
        {/* Results */}
        <AnimatePresence mode="wait">
          {filtered.length === 0 ? (
            <motion.div 
              key="empty"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0 }}
              className="text-center py-20"
            >
              <div className="w-32 h-32 mx-auto mb-6 bg-gradient-to-br from-gray-100 to-gray-200 rounded-full flex items-center justify-center">
                <Compass size={48} className="text-gray-400" />
              </div>
              <h3 className="text-xl font-bold text-gray-800 mb-2">Aucun résultat trouvé</h3>
              <p className="text-gray-500">
                Essayez de modifier votre recherche ou vos filtres
              </p>
            </motion.div>
          ) : (
            <motion.div 
              key="results"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className={`grid gap-6 ${
                viewMode === 'grid' 
                  ? 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3' 
                  : 'grid-cols-1'
              }`}
            >
              {filtered.map((partner, index) => (
                <PartnerCard
                  key={partner.id}
                  partner={partner}
                  index={index}
                  cityColor={cityColor}
                  isFavorite={favorites.includes(partner.id)}
                  onToggleFavorite={toggleFavorite}
                />
              ))}
            </motion.div>
          )}
        </AnimatePresence>
        
        {/* Footer Note */}
        {filtered.length > 0 && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8 }}
            className="mt-12 text-center"
          >
            <div className="flex items-center justify-center gap-2 text-gray-400 text-xs">
              <Award size={12} />
              <span>Partenaires sélectionnés avec soin</span>
              <Shield size={12} />
              <span>Livraison sécurisée</span>
            </div>
          </motion.div>
        )}
      </main>
      
      <style jsx global>{`
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }
        .scrollbar-hide {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
      `}</style>
    </div>
  )
}