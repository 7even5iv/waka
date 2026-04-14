"use client"

import React, { useState, useEffect, useRef } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { motion, AnimatePresence, useScroll, useSpring } from 'framer-motion'
import {
  ArrowLeft, Search, Clock, Star, Minus, Plus, ShoppingBag,
  MessageCircle, CheckCircle, X, Flame, Tag, Store, ChevronRight,
  Heart, Zap, Shield, Award, Home, Info, Coffee, MapPin, Truck, Gift,
  Phone, Mail, User, LogOut, Settings, ChevronDown, Globe
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
          width={180}
          height={60}
          className={`${className} object-contain transition-all duration-300 group-hover:scale-105`}
          priority
          onError={() => setImageError(true)}
        />
      </div>
    </Link>
  )
}

// ========== DONNÉES DES PARTENAIRES (MÊMES IDs QUE LA PAGE VILLE) ==========
interface Product {
  id: number;
  name: string;
  price: number;
  desc: string;
  partnerId: number;
  popular: boolean;
  image: string;
  category: string;
}

interface Partner {
  id: number;
  name: string;
  category: string;
  city: string;
  cover: string;
  rating: number;
  deliveryTime: string;
  products: Product[];
}

const PARTNERS: Partner[] = [
  {
    id: 1,
    name: "The Yard",
    category: "Restaurant",
    city: "douala",
    cover: "/images/restaurant_1.jpg",
    rating: 4.9,
    deliveryTime: "25-35 min",
    products: [
      { id: 101, name: "Croissant Maison", price: 800, desc: "Croissant pur beurre", partnerId: 1, popular: true, image: "https://images.unsplash.com/photo-1555507036-ab1f4038808a?q=80&w=600", category: "Viennoiseries" },
      { id: 102, name: "Salade Niçoise", price: 3500, desc: "Thon, œuf, olives, tomates", partnerId: 1, popular: true, image: "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?q=80&w=600", category: "Salades" },
      { id: 103, name: "Steak Frites", price: 4500, desc: "Entrecôte grillée, frites maison", partnerId: 1, popular: true, image: "https://images.unsplash.com/photo-1544025162-d76694265947?q=80&w=600", category: "Plats" },
      { id: 104, name: "Soupe à l'oignon", price: 2500, desc: "Gratinée au fromage", partnerId: 1, popular: false, image: "https://images.unsplash.com/photo-1547592166-23ac45744acd?q=80&w=600", category: "Entrées" },
      { id: 105, name: "Crème Brûlée", price: 2000, desc: "Vanille de Madagascar", partnerId: 1, popular: false, image: "https://images.unsplash.com/photo-1470124182917-cc6e71b22ecc?q=80&w=600", category: "Desserts" },
      { id: 106, name: "Escargots", price: 4000, desc: "6 escargots au beurre persillé", partnerId: 1, popular: false, image: "https://images.unsplash.com/photo-1580476262798-bddd9f4b7369?q=80&w=600", category: "Entrées" }
    ]
  },
  {
    id: 2,
    name: "Super U Douala",
    category: "Supermarché",
    city: "douala",
    cover: "/images/supermarket1.jpg",
    rating: 4.7,
    deliveryTime: "30-40 min",
    products: [
      { id: 201, name: "Riz 5kg", price: 3500, desc: "Riz long grain de qualité supérieure", partnerId: 2, popular: true, image: "https://images.unsplash.com/photo-1586201375761-83865001e8ac?q=80&w=600", category: "Épicerie" },
      { id: 202, name: "Huile d'olive", price: 2500, desc: "Huile d'olive extra vierge 1L", partnerId: 2, popular: false, image: "https://images.unsplash.com/photo-1474979266404-7eaacbcd87c5?q=80&w=600", category: "Huiles" },
      { id: 203, name: "Pâtes Spaghetti", price: 800, desc: "Pâtes italiennes 500g", partnerId: 2, popular: true, image: "https://images.unsplash.com/photo-1556761175-5973dc0f32e7?q=80&w=600", category: "Épicerie" },
      { id: 204, name: "Lait 1L", price: 1200, desc: "Lait frais pasteurisé", partnerId: 2, popular: true, image: "https://images.unsplash.com/photo-1563636619-e9143da7973b?q=80&w=600", category: "Produits laitiers" },
      { id: 205, name: "Farine de blé 1kg", price: 900, desc: "Farine de qualité supérieure", partnerId: 2, popular: false, image: "https://images.unsplash.com/photo-1583926742463-4b6b5f3c4f8f?q=80&w=600", category: "Épicerie" },
      { id: 206, name: "Sucre 1kg", price: 1000, desc: "Sucre blanc cristallisé", partnerId: 2, popular: false, image: "https://images.unsplash.com/photo-1583926742463-4b6b5f3c4f8f?q=80&w=600", category: "Épicerie" }
    ]
  },
  {
    id: 3,
    name: "La Pizzeria",
    category: "Restaurant",
    city: "douala",
    cover: "/images/pizzeria.jpg",
    rating: 4.8,
    deliveryTime: "30-45 min",
    products: [
      { id: 301, name: "Margherita", price: 3500, desc: "Sauce tomate, mozzarella, basilic", partnerId: 3, popular: true, image: "https://images.unsplash.com/photo-1604382354936-07c5d9983bd3?q=80&w=600", category: "Pizzas" },
      { id: 302, name: "Pepperoni", price: 4500, desc: "Sauce tomate, mozzarella, pepperoni", partnerId: 3, popular: true, image: "https://images.unsplash.com/photo-1628840042765-356cda07504e?q=80&w=600", category: "Pizzas" },
      { id: 303, name: "4 Fromages", price: 5000, desc: "Mozzarella, chèvre, roquefort, parmesan", partnerId: 3, popular: false, image: "https://images.unsplash.com/photo-1513104890138-7c749659a591?q=80&w=600", category: "Pizzas" },
      { id: 304, name: "Calzone", price: 4800, desc: "Pizza pliée au jambon et fromage", partnerId: 3, popular: false, image: "https://images.unsplash.com/photo-1628840042765-356cda07504e?q=80&w=600", category: "Pizzas" },
      { id: 305, name: "Pâtes Carbonara", price: 4000, desc: "Pâtes fraîches à la carbonara", partnerId: 3, popular: false, image: "https://images.unsplash.com/photo-1645112411344-6f1f3f8e5c8f?q=80&w=600", category: "Pâtes" },
      { id: 306, name: "Tiramisu", price: 2500, desc: "Tiramisu maison", partnerId: 3, popular: true, image: "https://images.unsplash.com/photo-1571877227200-a0d98ea607e9?q=80&w=600", category: "Desserts" }
    ]
  },
  {
    id: 4,
    name: "Carrefour Market",
    category: "Supermarché",
    city: "douala",
    cover: "/images/market.jpg",
    rating: 4.6,
    deliveryTime: "35-45 min",
    products: [
      { id: 401, name: "Miel Bio", price: 2500, desc: "Miel de montagne 500g", partnerId: 4, popular: true, image: "https://images.unsplash.com/photo-1587049352846-4a222e784d38?q=80&w=600", category: "Épicerie fine" },
      { id: 402, name: "Confiture Artisanale", price: 1800, desc: "Confiture de fraises", partnerId: 4, popular: false, image: "https://images.unsplash.com/photo-1587049352846-4a222e784d38?q=80&w=600", category: "Épicerie fine" },
      { id: 403, name: "Fromage Locaux", price: 3000, desc: "Assortiment de fromages", partnerId: 4, popular: true, image: "https://images.unsplash.com/photo-1486297678162-eb2a19b0a32d?q=80&w=600", category: "Crémerie" },
      { id: 404, name: "Pain Artisanal", price: 800, desc: "Pain au levain", partnerId: 4, popular: true, image: "https://images.unsplash.com/photo-1509440159596-0249085222b9?q=80&w=600", category: "Boulangerie" },
      { id: 405, name: "Olives Noires", price: 1500, desc: "Olives de Provence", partnerId: 4, popular: false, image: "https://images.unsplash.com/photo-1532622785990-d2c36a76f5a6?q=80&w=600", category: "Apéritif" }
    ]
  },
  {
    id: 5,
    name: "Saveurs d'Asie",
    category: "Restaurant",
    city: "yaounde",
    cover: "/images/asian.jpg",
    rating: 4.9,
    deliveryTime: "25-35 min",
    products: [
      { id: 501, name: "Sushi Mix", price: 5500, desc: "12 pièces assorties", partnerId: 5, popular: true, image: "https://images.unsplash.com/photo-1579871494447-9811cf80d66c?q=80&w=600", category: "Sushis" },
      { id: 502, name: "Pad Thaï", price: 4500, desc: "Nouilles sautées aux crevettes", partnerId: 5, popular: true, image: "https://images.unsplash.com/photo-1559314809-0d155014e29e?q=80&w=600", category: "Nouilles" },
      { id: 503, name: "Boeuf Lok Lak", price: 5000, desc: "Bœuf mariné sauce poivre", partnerId: 5, popular: false, image: "https://images.unsplash.com/photo-1512058564366-18510be2db19?q=80&w=600", category: "Plats" },
      { id: 504, name: "Riz Cantonais", price: 3000, desc: "Riz sauté aux légumes", partnerId: 5, popular: true, image: "https://images.unsplash.com/photo-1512058564366-18510be2db19?q=80&w=600", category: "Riz" },
      { id: 505, name: "Nems", price: 2000, desc: "4 nems au porc", partnerId: 5, popular: false, image: "https://images.unsplash.com/photo-1547571454-70c7b5d6f6b5?q=80&w=600", category: "Entrées" }
    ]
  },
  {
    id: 6,
    name: "Super U Yaoundé",
    category: "Supermarché",
    city: "yaounde",
    cover: "/images/supermarket2.jpg",
    rating: 4.8,
    deliveryTime: "30-40 min",
    products: [
      { id: 601, name: "Pack Eau 6x1.5L", price: 1500, desc: "Eau minérale naturelle", partnerId: 6, popular: true, image: "https://images.unsplash.com/photo-1548839148-2a5c74830f5a?q=80&w=600", category: "Boissons" },
      { id: 602, name: "Oeufs x12", price: 1200, desc: "Oeufs frais fermiers", partnerId: 6, popular: false, image: "https://images.unsplash.com/photo-1582722872445-44dc5f7e3c8f?q=80&w=600", category: "Frais" },
      { id: 603, name: "Tomates 1kg", price: 800, desc: "Tomates fraîches", partnerId: 6, popular: true, image: "https://images.unsplash.com/photo-1546094096-0df4bcaaa0e6?q=80&w=600", category: "Fruits & Légumes" },
      { id: 604, name: "Savon Ménager", price: 500, desc: "Savon liquide multi-usage", partnerId: 6, popular: false, image: "https://images.unsplash.com/photo-1583947581924-860bda5b3b2d?q=80&w=600", category: "Entretien" },
      { id: 605, name: "Jus d'orange 1L", price: 1200, desc: "Jus pur fruit", partnerId: 6, popular: true, image: "https://images.unsplash.com/photo-1600271886742-f049cd451bba?q=80&w=600", category: "Boissons" },
      { id: 606, name: "Bananes plantain", price: 600, desc: "Régime de bananes", partnerId: 6, popular: false, image: "https://images.unsplash.com/photo-1600271886742-f049cd451bba?q=80&w=600", category: "Fruits & Légumes" }
    ]
  }
]

interface CartItem {
  id: number;
  name: string;
  price: number;
  quantity: number;
  image?: string;
}

// ========== COMPOSANT PRODUIT ==========
const ProductCard = ({ product, quantity, onAdd, onRemove, cityColor }: any) => {
  const [isHovered, setIsHovered] = useState(false)
  const [imageError, setImageError] = useState(false)
  const fallbackImage = "/images/fallback-product.jpg"

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ y: -5 }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className="bg-white rounded-2xl shadow-lg border border-green-100 hover:shadow-xl transition-all overflow-hidden group"
    >
      <div className="flex flex-col sm:flex-row">
        <div className="relative h-40 sm:h-auto sm:w-40 flex-shrink-0 overflow-hidden bg-gray-100">
          <img
            src={imageError ? fallbackImage : product.image}
            alt={product.name}
            className="w-full h-full object-cover transition-transform duration-500"
            style={{ transform: isHovered ? 'scale(1.1)' : 'scale(1)' }}
            onError={() => setImageError(true)}
          />
          {product.popular && (
            <div className={`absolute top-3 left-3 bg-gradient-to-r ${cityColor} text-white text-[10px] font-black px-2 py-1 rounded-full flex items-center gap-1 shadow-md`}>
              <Flame size={10} />
              POPULAIRE
            </div>
          )}
        </div>

        <div className="flex-1 p-4">
          <div className="flex justify-between items-start mb-2">
            <div>
              <h3 className="font-bold text-lg text-gray-900">{product.name}</h3>
              {product.category && (
                <span className="inline-flex items-center gap-1 text-[10px] text-green-500 mt-1">
                  <Tag size={10} />
                  {product.category}
                </span>
              )}
            </div>
            <span className={`text-xl font-black bg-gradient-to-r ${cityColor} bg-clip-text text-transparent`}>
              {product.price.toLocaleString()} <span className="text-sm">FCFA</span>
            </span>
          </div>

          <p className="text-sm text-gray-500 mb-4 line-clamp-2">{product.desc}</p>

          <div className="flex justify-end">
            <div className="flex items-center bg-gray-50 rounded-xl p-1 gap-2 border border-gray-200">
              {quantity > 0 ? (
                <>
                  <motion.button
                    whileTap={{ scale: 0.9 }}
                    onClick={onRemove}
                    className="w-10 h-10 rounded-lg bg-gray-100 text-green-600 font-bold hover:bg-gray-200 transition-colors flex items-center justify-center"
                  >
                    <Minus size={16} />
                  </motion.button>
                  <span className="font-bold text-gray-900 text-lg px-3 min-w-[40px] text-center">{quantity}</span>
                  <motion.button
                    whileTap={{ scale: 0.9 }}
                    onClick={onAdd}
                    className={`w-10 h-10 rounded-lg bg-gradient-to-r ${cityColor} text-white font-bold shadow-sm transition-colors flex items-center justify-center`}
                  >
                    <Plus size={16} />
                  </motion.button>
                </>
              ) : (
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={onAdd}
                  className={`px-5 py-2.5 bg-gradient-to-r ${cityColor} text-white font-bold rounded-xl shadow-sm transition-all text-sm`}
                >
                  Ajouter au panier
                </motion.button>
              )}
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  )
}

// ========== COMPOSANT EMPTY STATE ==========
const EmptyState = ({ onReset, category, searchTerm, selectedCategory, cityColor }: any) => {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      className="bg-white rounded-3xl p-12 text-center shadow-lg border border-green-100 mt-10"
    >
      <div className="w-32 h-32 mx-auto mb-6 bg-gradient-to-br from-gray-100 to-gray-200 rounded-full flex items-center justify-center">
        <Search size={48} className="text-gray-400" />
      </div>
      <h2 className="text-xl font-bold text-gray-800 mb-2">
        {category === "Restaurant" ? "Aucun plat trouvé" : "Aucun produit trouvé"}
      </h2>
      <p className="text-gray-500 text-sm mt-2">
        {category === "Restaurant"
          ? `Aucun plat ne correspond à "${searchTerm}" ${selectedCategory !== "Tous" && `dans la catégorie ${selectedCategory}`}`
          : `Aucun produit ne correspond à "${searchTerm}" ${selectedCategory !== "Tous" && `dans la catégorie ${selectedCategory}`}`
        }
      </p>
      <button
        onClick={onReset}
        className={`mt-6 inline-flex items-center gap-2 bg-gradient-to-r ${cityColor} text-white px-6 py-3 rounded-xl font-bold hover:shadow-lg transition-all`}
      >
        Réinitialiser la recherche
      </button>
    </motion.div>
  )
}

export default function MenuPage({ params }: { params: Promise<{ city: string, partnerId: string }> | { city: string, partnerId: string } }) {
  const [resolvedParams, setResolvedParams] = useState<{ city: string, partnerId: string } | null>(null)
  const [scrolled, setScrolled] = useState(false)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [user, setUser] = useState<any>(null)
  const [showUserMenu, setShowUserMenu] = useState(false)
  const userMenuRef = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll()
  const scaleX = useSpring(scrollYProgress, { stiffness: 100, damping: 30 })

  const [cart, setCart] = useState<CartItem[]>([])
  const [showForm, setShowForm] = useState(false)
  const [isOrdered, setIsOrdered] = useState(false)
  const [customerInfo, setCustomerInfo] = useState({ name: '', area: '', phone: '' })
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("Tous")
  const [isSearchFocused, setIsSearchFocused] = useState(false)

  const navLinks = [
    { name: 'Accueil', href: '/', icon: Home },
    { name: 'Services', href: '/services', icon: Coffee },
    { name: 'À propos', href: '/about', icon: Info },
    { name: 'Contact', href: '/contact', icon: MessageCircle },
    { name: 'Blog', href: '/blog', icon: Globe }
  ]

  useEffect(() => {
    const resolveParams = async () => {
      const resolved = await params
      setResolvedParams(resolved)
    }
    resolveParams()
  }, [params])

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50)
    window.addEventListener('scroll', handleScroll)

    const savedUser = localStorage.getItem('waka_user')
    if (savedUser) setUser(JSON.parse(savedUser))

    const handleClickOutside = (e: MouseEvent) => {
      if (userMenuRef.current && !userMenuRef.current.contains(e.target as Node)) setShowUserMenu(false)
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

  if (!resolvedParams) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-500"></div>
      </div>
    )
  }

  const { city, partnerId } = resolvedParams
  const currentPartner = PARTNERS.find(p => p.id === parseInt(partnerId) && p.city === city)

  if (!currentPartner) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900">Partenaire non trouvé</h1>
          <p className="text-gray-500 mt-2">Le partenaire que vous recherchez n'existe pas ou n'est pas disponible dans cette ville.</p>
          <Link href={`/${city}`} className="mt-4 inline-block text-green-500 underline">Retour à la liste</Link>
        </div>
      </div>
    )
  }

  const cityColor = city === 'douala' ? 'from-green-500 to-emerald-600' : 'from-yellow-400 to-amber-500'
  const partnerProducts = currentPartner.products
  const popularItems = partnerProducts.filter(p => p.popular)
  const categories = ["Tous", ...new Set(partnerProducts.map(p => p.category))]

  const filteredProducts = partnerProducts.filter(product => {
    const matchSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      product.desc.toLowerCase().includes(searchTerm.toLowerCase())
    const matchCategory = selectedCategory === "Tous" || product.category === selectedCategory
    return matchSearch && matchCategory
  })

  const filteredPopularItems = popularItems.filter(product => {
    const matchSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      product.desc.toLowerCase().includes(searchTerm.toLowerCase())
    const matchCategory = selectedCategory === "Tous" || product.category === selectedCategory
    return matchSearch && matchCategory
  })

  const deliveryFee = 500;
  const subtotal = cart.reduce((acc, item) => acc + (item.price * item.quantity), 0)
  const total = subtotal + deliveryFee
  const itemCount = cart.reduce((acc, item) => acc + item.quantity, 0)

  const addToCart = (product: any) => {
    setCart(prev => {
      const existing = prev.find(item => item.id === product.id)
      if (existing) return prev.map(item => item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item)
      return [...prev, { ...product, quantity: 1 }]
    })
  }

  const removeFromCart = (productId: number) => {
    setCart(prev => {
      const existing = prev.find(item => item.id === productId)
      if (existing?.quantity === 1) return prev.filter(item => item.id !== productId)
      return prev.map(item => item.id === productId ? { ...item, quantity: item.quantity - 1 } : item)
    })
  }

  const getItemQuantity = (id: number) => cart.find(item => item.id === id)?.quantity || 0

  const sendToWhatsApp = () => {
    if (!customerInfo.name || !customerInfo.area) {
      alert("Veuillez indiquer votre nom et votre quartier")
      return
    }
    const phone = "237690316766"
    const itemsList = cart.map(i => `• ${i.quantity}x ${i.name} - ${(i.price * i.quantity).toLocaleString()} FCFA`).join('\n')
    const message = `🍽️ *NOUVELLE COMMANDE WAKA*\n\n👤 *Client:* ${customerInfo.name}\n📞 *Tél:* ${customerInfo.phone || 'Non spécifié'}\n📍 *Quartier:* ${customerInfo.area} (${city.toUpperCase()})\n🏠 *Boutique:* ${currentPartner?.name}\n\n🛒 *Détails de la commande :*\n${itemsList}\n\n📊 *Récapitulatif :*\nSous-total: ${subtotal.toLocaleString()} FCFA\n🚚 Livraison: ${deliveryFee.toLocaleString()} FCFA\n💰 *TOTAL: ${total.toLocaleString()} FCFA*\n\n🙏 Merci pour votre commande !`
    window.open(`https://wa.me/${phone}?text=${encodeURIComponent(message)}`, '_blank')
    setIsOrdered(true)
  }

  if (isOrdered) {
    return (
      <div className="min-h-screen bg-white flex flex-col items-center justify-center p-8 text-center">
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ type: "spring", damping: 10 }}
          className={`w-24 h-24 bg-gradient-to-r ${cityColor} rounded-full flex items-center justify-center text-white shadow-2xl mb-6`}
        >
          <CheckCircle size={48} />
        </motion.div>
        <motion.h1
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="text-3xl font-black text-gray-900"
        >
          Commande envoyée !
        </motion.h1>
        <motion.p
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="text-gray-500 mt-2"
        >
          Votre message WhatsApp a été généré avec succès.
        </motion.p>
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.4 }}
        >
          <Link href={`/${city}`} className={`mt-8 inline-flex items-center gap-2 bg-gradient-to-r ${cityColor} text-white px-8 py-3 rounded-2xl font-bold transition-all transform hover:scale-105`}>
            <ArrowLeft size={18} />
            Retour aux restaurants
          </Link>
        </motion.div>
      </div>
    )
  }

  return (
    <>
      <Head>
        <title>{currentPartner?.name} | WAKA - Commandez sur {city === 'douala' ? 'Douala' : 'Yaoundé'}</title>
        <meta name="description" content={`Commandez ${currentPartner?.category === 'Restaurant' ? 'vos plats préférés' : 'vos courses'} chez ${currentPartner?.name}. Livraison rapide à ${city === 'douala' ? 'Douala' : 'Yaoundé'}.`} />
        <link rel="canonical" href={`https://waka.cm/${city}/${partnerId}`} />
      </Head>

      <div className="min-h-screen bg-gray-50 pb-32">
        <motion.div
          className="fixed top-0 left-0 right-0 h-1 bg-gradient-to-r from-green-500 to-emerald-600 z-50"
          style={{ scaleX, transformOrigin: "0%" }}
        />

        {/* Header simplifié pour la page menu */}
        <div className="sticky top-0 z-40 bg-white border-b border-gray-100 shadow-sm">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 py-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <Link href={`/${city}`} className="group">
                  <ArrowLeft size={20} className="text-gray-600 hover:text-gray-900 transition-colors" />
                </Link>
                <Logo className="h-8 w-auto" />
              </div>
              <div className="flex items-center gap-3">
                <Link href="/login">
                  <button className="bg-gradient-to-r from-green-500 to-emerald-600 text-white px-4 py-2 rounded-full text-sm font-bold shadow-md hover:shadow-lg transition-all">
                    Connexion
                  </button>
                </Link>
              </div>
            </div>
          </div>
        </div>

        {/* Hero Section avec image du partenaire */}
        <div className="relative h-64 md:h-80 overflow-hidden">
          <div className="absolute inset-0">
            <img
              src={currentPartner?.cover}
              alt={currentPartner?.name}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/50 to-transparent" />
          </div>

          <div className="relative z-10 h-full flex flex-col justify-end p-6 text-white">
            <div className="space-y-2">
              <div className="flex items-center gap-2 flex-wrap">
                <span className={`bg-gradient-to-r ${cityColor} text-white text-[10px] font-black px-2 py-1 rounded-full uppercase flex items-center gap-1 shadow-md`}>
                  <Tag size={10} />
                  {currentPartner?.category === "Restaurant" ? "Restaurant" : "Supermarché"}
                </span>
                <div className="flex items-center gap-1 text-sm bg-white/20 backdrop-blur-md px-2 py-1 rounded-full">
                  <Star size={12} className="text-yellow-400 fill-yellow-400" />
                  <span>{currentPartner?.rating}</span>
                </div>
                <div className="flex items-center gap-1 text-sm bg-white/20 backdrop-blur-md px-2 py-1 rounded-full">
                  <Clock size={12} />
                  <span>{currentPartner?.deliveryTime}</span>
                </div>
              </div>
              <h1 className="text-2xl md:text-3xl font-black drop-shadow-lg">{currentPartner?.name}</h1>
              <p className="text-sm text-gray-200">Livraison gratuite à partir de 5000 FCFA</p>
            </div>
          </div>
        </div>

        {/* Barre de recherche et filtres */}
        <div className="sticky top-[73px] z-20 bg-white border-b border-gray-100 shadow-sm pt-4 pb-3">
          <div className="max-w-2xl mx-auto px-4 space-y-3">
            <motion.div animate={{ scale: isSearchFocused ? 1.02 : 1 }} className="relative">
              <div className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400">
                <Search size={18} />
              </div>
              <input
                type="text"
                placeholder={currentPartner?.category === "Restaurant" ? "Rechercher un plat..." : "Rechercher un produit..."}
                className="w-full bg-gray-50 border border-gray-200 rounded-2xl py-3 pl-12 pr-12 text-gray-900 outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                onFocus={() => setIsSearchFocused(true)}
                onBlur={() => setIsSearchFocused(false)}
              />
              {searchTerm && (
                <button onClick={() => setSearchTerm("")} className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600">
                  <X size={16} />
                </button>
              )}
            </motion.div>

            {categories.length > 1 && (
              <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide">
                {categories.map((cat) => (
                  <button
                    key={cat}
                    onClick={() => setSelectedCategory(cat)}
                    className={`px-4 py-1.5 rounded-full text-xs font-bold whitespace-nowrap transition-all ${selectedCategory === cat
                        ? `bg-gradient-to-r ${cityColor} text-white shadow-md`
                        : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                      }`}
                  >
                    {cat}
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Section des produits */}
        <div className="max-w-2xl mx-auto px-4 py-6">
          {searchTerm && (
            <p className="text-sm text-green-600 mb-4">
              {filteredProducts.length} résultat(s) pour "{searchTerm}"
            </p>
          )}

          {filteredPopularItems.length > 0 && (
            <div className="mb-8">
              <h2 className="text-lg font-bold text-gray-900 mb-3 flex items-center gap-2">
                <Flame size={18} className="text-orange-500" />
                Les plus populaires
              </h2>
              <div className="space-y-4">
                {filteredPopularItems.map(product => (
                  <ProductCard
                    key={product.id}
                    product={product}
                    quantity={getItemQuantity(product.id)}
                    onAdd={() => addToCart(product)}
                    onRemove={() => removeFromCart(product.id)}
                    cityColor={cityColor}
                  />
                ))}
              </div>
            </div>
          )}

          {filteredProducts.length > 0 ? (
            <div>
              {filteredPopularItems.length > 0 && filteredProducts.length > filteredPopularItems.length && (
                <h2 className="text-lg font-bold text-gray-900 mb-3">Notre carte</h2>
              )}
              <div className="space-y-4">
                {(filteredPopularItems.length > 0
                  ? filteredProducts.filter(p => !p.popular)
                  : filteredProducts
                ).map(product => (
                  <ProductCard
                    key={product.id}
                    product={product}
                    quantity={getItemQuantity(product.id)}
                    onAdd={() => addToCart(product)}
                    onRemove={() => removeFromCart(product.id)}
                    cityColor={cityColor}
                  />
                ))}
              </div>
            </div>
          ) : (
            <EmptyState
              onReset={() => {
                setSearchTerm("")
                setSelectedCategory("Tous")
              }}
              category={currentPartner?.category}
              searchTerm={searchTerm}
              selectedCategory={selectedCategory}
              cityColor={cityColor}
            />
          )}
        </div>

        {/* Panier flottant */}
        <AnimatePresence>
          {cart.length > 0 && (
            <motion.div
              initial={{ y: 100, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: 100, opacity: 0 }}
              className="fixed bottom-0 left-0 right-0 p-4 bg-white border-t border-gray-200 shadow-2xl rounded-t-[40px] z-[100]"
            >
              <div className="max-w-2xl mx-auto">
                {!showForm ? (
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-[10px] text-green-500 font-black uppercase tracking-wider flex items-center gap-1">
                        <ShoppingBag size={12} />
                        {itemCount} article{itemCount > 1 ? 's' : ''}
                      </p>
                      <p className="text-2xl font-black text-gray-900">{total.toLocaleString()} <span className="text-sm font-medium text-gray-500">FCFA</span></p>
                    </div>
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => setShowForm(true)}
                      className={`bg-gradient-to-r ${cityColor} text-white px-8 py-4 rounded-2xl font-bold shadow-xl flex items-center gap-2`}
                    >
                      Commander
                      <ChevronRight size={18} />
                    </motion.button>
                  </div>
                ) : (
                  <div className="space-y-4">
                    <div className="flex justify-between items-end">
                      <h3 className="font-black text-xl text-gray-900">Infos de livraison</h3>
                      <button onClick={() => setShowForm(false)} className="text-xs text-green-500 font-bold underline">
                        Modifier commande
                      </button>
                    </div>
                    <input
                      type="text"
                      placeholder="Ton nom complet"
                      className="w-full p-4 bg-gray-50 border border-gray-200 rounded-2xl outline-none focus:border-green-500 focus:ring-2 focus:ring-green-500/20"
                      onChange={(e) => setCustomerInfo({ ...customerInfo, name: e.target.value })}
                      value={customerInfo.name}
                    />
                    <input
                      type="tel"
                      placeholder="Ton numéro WhatsApp (optionnel)"
                      className="w-full p-4 bg-gray-50 border border-gray-200 rounded-2xl outline-none focus:border-green-500 focus:ring-2 focus:ring-green-500/20"
                      onChange={(e) => setCustomerInfo({ ...customerInfo, phone: e.target.value })}
                      value={customerInfo.phone}
                    />
                    <input
                      type="text"
                      placeholder="Ton quartier (ex: Akwa, Bastos...)"
                      className="w-full p-4 bg-gray-50 border border-gray-200 rounded-2xl outline-none focus:border-green-500 focus:ring-2 focus:ring-green-500/20"
                      onChange={(e) => setCustomerInfo({ ...customerInfo, area: e.target.value })}
                      value={customerInfo.area}
                    />
                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={sendToWhatsApp}
                      className="w-full bg-gradient-to-r from-[#25D366] to-[#128C7E] text-white py-4 rounded-2xl font-black text-lg shadow-xl flex items-center justify-center gap-2"
                    >
                      <MessageCircle size={20} />
                      Confirmer sur WhatsApp
                    </motion.button>
                  </div>
                )}
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        <style jsx global>{`
          .scrollbar-hide::-webkit-scrollbar { display: none; }
          .scrollbar-hide { -ms-overflow-style: none; scrollbar-width: none; }
          .line-clamp-2 {
            display: -webkit-box;
            -webkit-line-clamp: 2;
            -webkit-box-orient: vertical;
            overflow: hidden;
          }
        `}</style>
      </div>
    </>
  )
}

import Head from 'next/head'