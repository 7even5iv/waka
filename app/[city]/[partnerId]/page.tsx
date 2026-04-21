"use client"

import React, { useState, useEffect, useRef } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import Head from 'next/head'
import { motion, AnimatePresence, useScroll, useSpring } from 'framer-motion'
import {
  ArrowLeft, Search, Clock, Star, Minus, Plus, ShoppingBag,
  MessageCircle, CheckCircle, X, Flame, Tag, Store, ChevronRight,
  Heart, Zap, Shield, Award, Home, Info, Coffee, MapPin, Truck, Gift,
  Phone, Mail, User, LogOut, Settings, ChevronDown, Globe, Users
} from 'lucide-react'

// ========== TYPES & INTERFACES ==========
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

interface CartItem {
  id: number;
  name: string;
  price: number;
  quantity: number;
  image?: string;
}

// ========== DONNÉES DES PARTENAIRES ==========
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
      { id: 203, name: "Pâtes Spaghetti", price: 800, desc: "Pâtes italiennes 500g", partnerId: 2, popular: true, image: "https://images.unsplash.com/photo-1556761175-5973dc0f32e7?q=80&w=600", category: "Épicerie" }
    ]
  },
  // ... Ajoute tes autres partenaires ici
]

// ========== COMPOSANTS ==========
const Logo = ({ className = "h-8 w-auto" }) => (
  <Link href="/" className="flex items-center gap-2 group">
    <Image src="/images/logo.png" alt="WAKA Logo" width={180} height={60} className={`${className} object-contain transition-all duration-300 group-hover:scale-105`} priority />
  </Link>
)

const ProductCard = ({ product, quantity, onAdd, onRemove, cityColor }: any) => {
  const [imageError, setImageError] = useState(false)
  const fallbackImage = "/images/fallback-product.jpg"

  return (
    <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="bg-white rounded-2xl shadow-sm border border-gray-100 p-4 hover:shadow-md transition-all group">
      <div className="flex gap-4">
        <div className="relative w-24 h-24 flex-shrink-0 overflow-hidden rounded-xl bg-gray-50">
          <img src={imageError ? fallbackImage : product.image} alt={product.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" onError={() => setImageError(true)} />
          {product.popular && <div className={`absolute top-1 left-1 bg-gradient-to-r ${cityColor} text-white text-[8px] font-black px-1.5 py-0.5 rounded-full flex items-center gap-0.5`}><Flame size={8} /> TOP</div>}
        </div>
        <div className="flex-1 min-w-0">
          <h3 className="font-bold text-gray-900 truncate">{product.name}</h3>
          <p className="text-xs text-gray-500 line-clamp-2 mt-1 mb-2 leading-relaxed">{product.desc}</p>
          <div className="flex items-center justify-between mt-auto">
            <span className={`font-black text-lg bg-gradient-to-r ${cityColor} bg-clip-text text-transparent`}>{product.price.toLocaleString()} <span className="text-[10px]">FCFA</span></span>

            <div className="flex items-center bg-gray-50 rounded-lg p-1 border border-gray-100">
              {quantity > 0 ? (
                <>
                  <button onClick={onRemove} className="w-8 h-8 flex items-center justify-center text-green-600 hover:bg-white rounded-md transition-colors"><Minus size={14} /></button>
                  <span className="font-bold text-sm px-2 min-w-[24px] text-center">{quantity}</span>
                  <button onClick={onAdd} className={`w-8 h-8 flex items-center justify-center bg-gradient-to-r ${cityColor} text-white rounded-md transition-all shadow-sm`}><Plus size={14} /></button>
                </>
              ) : (
                <button onClick={onAdd} className={`px-4 py-1.5 bg-gradient-to-r ${cityColor} text-white text-xs font-bold rounded-lg shadow-sm hover:scale-105 transition-all`}>Ajouter</button>
              )}
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  )
}

export default function MenuPage({ params }: { params: any }) {
  const [resolvedParams, setResolvedParams] = useState<any>(null)
  const [cart, setCart] = useState<CartItem[]>([])
  const [showForm, setShowForm] = useState(false)
  const [isOrdered, setIsOrdered] = useState(false)
  const [customerInfo, setCustomerInfo] = useState({ name: '', area: '', phone: '' })
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("Tous")

  useEffect(() => {
    const resolve = async () => setResolvedParams(await params)
    resolve()
  }, [params])

  if (!resolvedParams) return <div className="h-screen flex items-center justify-center"><div className="animate-spin rounded-full h-10 w-10 border-b-2 border-green-500"></div></div>

  const { city, partnerId } = resolvedParams
  const currentPartner = PARTNERS.find(p => p.id === parseInt(partnerId) && p.city === city)

  if (!currentPartner) return <div className="h-screen flex items-center justify-center text-center p-6"><div><h1 className="text-xl font-bold">Partenaire introuvable</h1><Link href={`/${city}`} className="text-green-500 underline mt-4 inline-block">Retour</Link></div></div>

  const cityColor = city === 'douala' ? 'from-green-500 to-emerald-600' : 'from-yellow-400 to-amber-500'

  // LOGIQUE PANIER
  const addToCart = (p: any) => {
    setCart(prev => {
      const exists = prev.find(i => i.id === p.id)
      return exists ? prev.map(i => i.id === p.id ? { ...i, quantity: i.quantity + 1 } : i) : [...prev, { ...p, quantity: 1 }]
    })
  }
  const removeFromCart = (id: number) => {
    setCart(prev => {
      const item = prev.find(i => i.id === id)
      return item?.quantity === 1 ? prev.filter(i => i.id !== id) : prev.map(i => i.id === id ? { ...i, quantity: i.quantity - 1 } : i)
    })
  }

  const subtotal = cart.reduce((acc, i) => acc + (i.price * i.quantity), 0)
  const deliveryFee = subtotal > 0 ? 1000 : 0 // Tarif base ton étude
  const total = subtotal + deliveryFee

  // CALCUL DES POINTS (Point 3 de ton étude: 1 point par 1000 FCFA)
  const earnedPoints = Math.floor(subtotal / 1000)

  const sendToWhatsApp = () => {
    if (!customerInfo.name || !customerInfo.area) return alert("Nom et Quartier requis")
    const phone = "237621004286" // Ton numéro de réception
    const list = cart.map(i => `• ${i.quantity}x ${i.name} (${(i.price * i.quantity)}F)`).join('\n')
    const message = `🚀 *COMMANDE WAKA*\n\n👤 *Client:* ${customerInfo.name}\n📍 *Quartier:* ${customerInfo.area}\n🏠 *Boutique:* ${currentPartner.name}\n\n🛒 *Détails :*\n${list}\n\n💰 *Total:* ${total} FCFA\n🎁 *Points à cumuler:* ${earnedPoints} pts\n\n_WAKA : Tu commandes, on livre._`
    window.open(`https://wa.me/${phone}?text=${encodeURIComponent(message)}`, '_blank')
    setIsOrdered(true)
  }

  const filteredProducts = currentPartner.products.filter(p =>
    (selectedCategory === "Tous" || p.category === selectedCategory) &&
    (p.name.toLowerCase().includes(searchTerm.toLowerCase()))
  )

  if (isOrdered) return (
    <div className="h-screen bg-white flex flex-col items-center justify-center p-8 text-center">
      <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} className={`w-20 h-20 bg-gradient-to-r ${cityColor} rounded-full flex items-center justify-center text-white mb-6 shadow-xl`}><CheckCircle size={40} /></motion.div>
      <h1 className="text-2xl font-black">C'est envoyé !</h1>
      <p className="text-gray-500 text-sm mt-2">Préparez la monnaie, un livreur WAKA arrive bientôt.</p>
      <p className="mt-4 text-green-600 font-bold bg-green-50 px-4 py-2 rounded-full inline-block">+{earnedPoints} WAKA Points gagnés !</p>
      <Link href={`/${city}`} className={`mt-8 px-8 py-3 bg-gradient-to-r ${cityColor} text-white rounded-xl font-bold`}>Retour aux boutiques</Link>
    </div>
  )

  return (
    <>
      <Head><title>{currentPartner.name} | WAKA Delivery</title></Head>
      <div className="min-h-screen bg-gray-50 pb-40">

        {/* HEADER */}
        <div className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-gray-100 px-4 py-4">
          <div className="max-w-2xl mx-auto flex items-center justify-between">
            <Link href={`/${city}`} className="p-2 hover:bg-gray-100 rounded-full transition-colors"><ArrowLeft size={20} /></Link>
            <Logo />
            <div className="w-10" />
          </div>
        </div>

        {/* HERO PARTENAIRE */}
        <div className="relative h-56 overflow-hidden">
          <img src={currentPartner.cover} className="w-full h-full object-cover" alt="" />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
          <div className="absolute bottom-6 left-6 text-white">
            <div className="flex items-center gap-2 mb-1">
              <span className={`bg-gradient-to-r ${cityColor} px-2 py-0.5 rounded text-[8px] font-black uppercase tracking-widest`}>{currentPartner.category}</span>
              <span className="flex items-center gap-1 text-xs font-bold"><Star size={10} className="text-yellow-400 fill-yellow-400" /> {currentPartner.rating}</span>
            </div>
            <h1 className="text-2xl font-black">{currentPartner.name}</h1>
            <p className="text-xs text-gray-300 flex items-center gap-1"><MapPin size={10} /> Livraison à {city.toUpperCase()}</p>
          </div>
        </div>

        {/* PROMO PARRAINAGE (Point 3 Business Plan) */}
        <div className="max-w-2xl mx-auto px-4 mt-4">
          <div className="bg-emerald-900 rounded-2xl p-4 text-white flex items-center justify-between shadow-lg relative overflow-hidden">
            <div className="relative z-10">
              <p className="text-[10px] font-black text-yellow-400 uppercase tracking-widest">Offre Parrainage</p>
              <h3 className="text-xs font-bold leading-tight mt-1">Partage ton code et gagne des points <br /> dès la commande de ton ami !</h3>
            </div>
            <button className="relative z-10 bg-white text-emerald-900 px-3 py-1.5 rounded-lg text-[10px] font-black hover:bg-yellow-400 transition-colors uppercase">Partager</button>
            <Users size={60} className="absolute -right-4 -bottom-2 text-white/5" />
          </div>
        </div>

        {/* RECHERCHE & FILTRES CATEGORIES */}
        <div className="sticky top-[73px] z-40 bg-white border-b border-gray-100 px-4 py-4 shadow-sm">
          <div className="max-w-2xl mx-auto space-y-4">
            <div className="relative">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={16} />
              <input type="text" placeholder="Rechercher dans la carte..." className="w-full bg-gray-50 border-none rounded-xl py-3 pl-12 pr-4 text-sm outline-none focus:ring-2 focus:ring-green-500/20" value={searchTerm} onChange={e => setSearchTerm(e.target.value)} />
            </div>
            <div className="flex gap-2 overflow-x-auto scrollbar-hide">
              {["Tous", ...new Set(currentPartner.products.map(p => p.category))].map(cat => (
                <button key={cat} onClick={() => setSelectedCategory(cat)} className={`px-4 py-1.5 rounded-full text-[10px] font-black uppercase whitespace-nowrap transition-all ${selectedCategory === cat ? `bg-gradient-to-r ${cityColor} text-white shadow-md` : 'bg-gray-100 text-gray-400 hover:bg-gray-200'}`}>{cat}</button>
              ))}
            </div>
          </div>
        </div>

        {/* LISTE PRODUITS */}
        <div className="max-w-2xl mx-auto px-4 py-6 space-y-4">
          {filteredProducts.map(p => (
            <ProductCard key={p.id} product={p} quantity={cart.find(i => i.id === p.id)?.quantity || 0} onAdd={() => addToCart(p)} onRemove={() => removeFromCart(p.id)} cityColor={cityColor} />
          ))}
          {filteredProducts.length === 0 && <div className="text-center py-12"><p className="text-gray-400 text-sm">Aucun résultat trouvé.</p></div>}
        </div>

        {/* PANIER FLOTTANT (Point 4 Système de commande) */}
        <AnimatePresence>
          {cart.length > 0 && (
            <motion.div initial={{ y: 100 }} animate={{ y: 0 }} exit={{ y: 100 }} className="fixed bottom-0 left-0 right-0 z-[60] bg-white border-t border-gray-100 shadow-[0_-10px_40px_rgba(0,0,0,0.1)] p-6 rounded-t-[2.5rem]">
              <div className="max-w-2xl mx-auto">
                {!showForm ? (
                  <div className="flex items-center justify-between">
                    <div className="space-y-1">
                      <div className="flex items-center gap-2">
                        <span className="text-[10px] font-black text-white bg-green-500 px-2 py-0.5 rounded-full uppercase tracking-widest">{cart.reduce((a, b) => a + b.quantity, 0)} articles</span>
                        <span className="text-[10px] font-black text-emerald-600 flex items-center gap-0.5"><Award size={10} /> +{earnedPoints} pts WAKA</span>
                      </div>
                      <p className="text-2xl font-black text-gray-900">{total.toLocaleString()} <span className="text-xs font-medium text-gray-500">FCFA</span></p>
                      <p className="text-[10px] text-gray-400 italic">Livraison incluse ({deliveryFee}F)</p>
                    </div>
                    <button onClick={() => setShowForm(true)} className={`px-10 py-4 bg-gradient-to-r ${cityColor} text-white font-black rounded-2xl shadow-xl hover:scale-105 transition-transform uppercase text-xs tracking-widest flex items-center gap-2`}>Commander <ChevronRight size={16} /></button>
                  </div>
                ) : (
                  <div className="space-y-4">
                    <div className="flex justify-between items-center"><h3 className="font-black text-lg uppercase tracking-tight">Infos Livraison</h3><button onClick={() => setShowForm(false)} className="text-[10px] font-black text-green-500 underline uppercase">Modifier articles</button></div>
                    <input type="text" placeholder="Nom complet" className="w-full p-4 bg-gray-50 border-none rounded-xl outline-none focus:ring-2 focus:ring-green-500/20 text-sm" value={customerInfo.name} onChange={e => setCustomerInfo({ ...customerInfo, name: e.target.value })} />
                    <input type="text" placeholder="Ton quartier (Akwa, Bastos, etc.)" className="w-full p-4 bg-gray-50 border-none rounded-xl outline-none focus:ring-2 focus:ring-green-500/20 text-sm" value={customerInfo.area} onChange={e => setCustomerInfo({ ...customerInfo, area: e.target.value })} />
                    <button onClick={sendToWhatsApp} className="w-full py-4 bg-[#25D366] text-white font-black rounded-xl shadow-xl flex items-center justify-center gap-2 uppercase text-xs tracking-widest hover:scale-[1.02] transition-transform"><MessageCircle size={18} /> Confirmer sur WhatsApp</button>
                  </div>
                )}
              </div>
            </motion.div>
          )}
        </AnimatePresence>

      </div>
      <style jsx global>{`.scrollbar-hide::-webkit-scrollbar { display: none; } .scrollbar-hide { -ms-overflow-style: none; scrollbar-width: none; }`}</style>
    </>
  )
}