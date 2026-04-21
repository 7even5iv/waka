"use client"

import React, { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Link from 'next/link'
import Image from 'next/image'
import {
  ArrowLeft, MapPin, Truck, Clock, CheckCircle,
  Package, Store, Navigation, User, Phone, MessageCircle,
  AlertCircle, ChevronRight, Star, RefreshCw, Home,
  Navigation2, Compass, Target, Shield, Award, Zap,
  Sun, Wind, Droplets, Gift, Users, Share2
} from 'lucide-react'

// ========== COMPOSANT LOGO ==========
const Logo = ({ className = "h-8 w-auto" }) => (
  <Link href="/" className="flex items-center gap-2 group">
    <Image src="/images/logo.png" alt="WAKA Logo" width={180} height={60} className={`${className} object-contain transition-all duration-300 group-hover:scale-105`} priority />
  </Link>
)

// ========== CARTE DE SUIVI MODERNE ==========
const ModernTrackingMap = ({ progress, cityName }: any) => {
  const restaurantPos = { x: 15, y: 45 }
  const customerPos = { x: 85, y: 55 }
  const driverPos = {
    x: restaurantPos.x + (customerPos.x - restaurantPos.x) * (progress / 100),
    y: restaurantPos.y + (customerPos.y - restaurantPos.y) * (progress / 100) + Math.sin(progress * 0.05) * 2
  }

  return (
    <div className="relative rounded-[2.5rem] overflow-hidden shadow-2xl border-4 border-white h-[400px] bg-gray-100">
      <div className="absolute inset-0 bg-[linear-gradient(45deg,rgba(34,197,94,0.05)_1px,transparent_1px)] bg-[size:30px_30px]" />

      {/* Route */}
      <svg className="absolute inset-0 w-full h-full">
        <path
          d={`M ${restaurantPos.x}% ${restaurantPos.y}% L ${customerPos.x}% ${customerPos.y}%`}
          stroke="#10b981" strokeWidth="4" fill="none" strokeDasharray="8 8" className="opacity-20"
        />
      </svg>

      {/* Restaurant */}
      <div className="absolute" style={{ left: `${restaurantPos.x}%`, top: `${restaurantPos.y}%`, transform: 'translate(-50%, -50%)' }}>
        <div className="w-10 h-10 bg-orange-500 rounded-xl flex items-center justify-center shadow-lg"><Store size={20} className="text-white" /></div>
      </div>

      {/* Livreur (Bensikin) */}
      <motion.div
        className="absolute z-30"
        animate={{ left: `${driverPos.x}%`, top: `${driverPos.y}%` }}
        style={{ transform: 'translate(-50%, -50%)' }}
      >
        <div className="relative">
          <div className="w-12 h-12 bg-emerald-600 rounded-2xl flex items-center justify-center shadow-2xl rotate-45 border-2 border-white">
            <Truck size={24} className="text-white -rotate-45" />
          </div>
          <div className="absolute -top-10 left-1/2 -translate-x-1/2 bg-black text-white text-[8px] font-black px-2 py-1 rounded-full whitespace-nowrap uppercase tracking-tighter">Livreur en mouvement</div>
        </div>
      </motion.div>

      {/* Client */}
      <div className="absolute" style={{ left: `${customerPos.x}%`, top: `${customerPos.y}%`, transform: 'translate(-50%, -50%)' }}>
        <div className="w-10 h-10 bg-blue-600 rounded-xl flex items-center justify-center shadow-lg border-2 border-white"><Home size={20} className="text-white" /></div>
      </div>

      <div className="absolute bottom-6 left-6 bg-white/90 backdrop-blur-md px-4 py-2 rounded-full shadow-lg border border-green-100">
        <p className="text-[10px] font-black text-green-700 uppercase tracking-widest flex items-center gap-2">
          <Navigation2 size={12} className="animate-pulse" /> Radar WAKA actif à {cityName}
        </p>
      </div>
    </div>
  )
}

// ========== PAGE PRINCIPALE ==========
export default function TrackingPage({ params }: { params: any }) {
  const [orderId, setOrderId] = useState<string>('')
  const [progress, setProgress] = useState(0)
  const [estimatedTime, setEstimatedTime] = useState(35)
  const [showContact, setShowContact] = useState(false)

  // Simulation d'une commande (Point 4 de ton étude)
  const order = {
    id: '#WAKA-842',
    restaurant: 'The Yard Douala',
    driver: {
      name: 'Jean-Paul',
      phone: '+237 621 00 00 00',
      rating: 4.9,
      verified: true // Sécurité : CNI enregistrée
    },
    total: 5800,
    pointsToEarn: 5 // 1 point par 1000F
  }

  useEffect(() => {
    const resolve = async () => setOrderId((await params).orderId)
    resolve()

    const interval = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) return 100
        const next = prev + 0.5
        setEstimatedTime(Math.max(5, Math.floor(35 - (next * 0.35))))
        return next
      })
    }, 1000)
    return () => clearInterval(interval)
  }, [params])

  return (
    <div className="min-h-screen bg-gray-50 font-sans pb-24">
      {/* Header Navigation */}
      <header className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-gray-100 px-6 py-4">
        <div className="max-w-2xl mx-auto flex items-center justify-between">
          <Link href="/orders" className="p-2 hover:bg-gray-100 rounded-full transition-colors"><ArrowLeft size={20} /></Link>
          <Logo />
          <div className="w-10" />
        </div>
      </header>

      <main className="max-w-2xl mx-auto px-6 py-8">

        {/* Statut & Points (Business Motivation) */}
        <div className="flex justify-between items-start mb-8">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="bg-green-100 text-green-700 text-[10px] font-black px-2 py-0.5 rounded-full uppercase tracking-tighter">En route</span>
              <span className="text-gray-400 text-[10px] font-bold uppercase">{orderId}</span>
            </div>
            <h1 className="text-2xl font-black text-gray-900 uppercase tracking-tighter italic">Arrivée dans <span className="text-emerald-600">{estimatedTime} min</span></h1>
          </div>
          <div className="bg-yellow-400 p-3 rounded-2xl shadow-lg rotate-3 text-center">
            <p className="text-[8px] font-black uppercase text-emerald-950">Points à gagner</p>
            <p className="text-xl font-black text-emerald-950">+{order.pointsToEarn}</p>
          </div>
        </div>

        {/* Map */}
        <ModernTrackingMap progress={progress} cityName="Douala" />

        {/* Driver Profile (Sécurité Planifiée) */}
        <motion.div
          initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
          className="mt-8 bg-white p-6 rounded-[2rem] shadow-xl border border-green-100 flex items-center justify-between"
        >
          <div className="flex items-center gap-4">
            <div className="relative">
              <div className="w-16 h-16 bg-emerald-100 rounded-2xl flex items-center justify-center text-emerald-600 font-black text-xl">JP</div>
              <div className="absolute -bottom-1 -right-1 bg-blue-500 text-white p-1 rounded-full border-2 border-white shadow-lg" title="Identité vérifiée (CNI)">
                <Shield size={10} fill="currentColor" />
              </div>
            </div>
            <div>
              <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Ton Livreur WAKA</p>
              <h3 className="font-black text-gray-900 text-lg uppercase">{order.driver.name}</h3>
              <div className="flex items-center gap-1">
                <Star size={12} className="fill-yellow-400 text-yellow-400 border-none" />
                <span className="text-xs font-bold text-gray-600">{order.driver.rating} • Identité vérifiée</span>
              </div>
            </div>
          </div>
          <div className="flex gap-2">
            <button onClick={() => setShowContact(true)} className="w-12 h-12 bg-green-500 text-white rounded-xl flex items-center justify-center shadow-lg hover:bg-green-600 transition-colors">
              <Phone size={20} />
            </button>
            <a href={`https://wa.me/${order.driver.phone.replace(/\s/g, '')}`} className="w-12 h-12 bg-[#25D366] text-white rounded-xl flex items-center justify-center shadow-lg hover:opacity-90 transition-opacity">
              <MessageCircle size={20} />
            </a>
          </div>
        </motion.div>

        {/* Parrainage pendant l'attente (Viralité Business Plan) */}
        <div className="mt-8 bg-emerald-900 rounded-[2rem] p-8 text-white relative overflow-hidden shadow-2xl">
          <div className="relative z-10">
            <p className="text-[10px] font-black text-yellow-400 uppercase tracking-[0.2em] mb-2">Gagne du temps & de l'argent</p>
            <h3 className="text-xl font-black mb-4">Profite de l'attente pour <br /> parrainer un ami !</h3>
            <p className="text-emerald-200 text-sm mb-6 leading-relaxed">Offre une livraison gratuite à un ami et <br />reçois <span className="text-white font-bold underline">500F cash</span> dès sa première commande.</p>
            <Link href="/profile" className="inline-flex items-center gap-2 bg-yellow-400 text-emerald-950 px-6 py-3 rounded-xl font-black text-xs uppercase tracking-widest shadow-xl hover:scale-105 transition-transform">
              <Share2 size={16} /> Partager mon code
            </Link>
          </div>
          <Users size={120} className="absolute -right-4 -bottom-4 text-white/5 rotate-12" />
        </div>

        {/* Détails Commande */}
        <div className="mt-8 space-y-4">
          <h3 className="text-xs font-black text-gray-400 uppercase tracking-widest ml-2">Récapitulatif</h3>
          <div className="bg-white p-6 rounded-[2rem] border border-gray-100 shadow-sm">
            <div className="flex justify-between items-center mb-4">
              <span className="text-sm font-bold text-gray-600">{order.restaurant}</span>
              <span className="font-black text-emerald-600">{order.total} F</span>
            </div>
            <div className="flex items-center gap-2 text-[10px] text-gray-400 font-bold uppercase italic">
              <Package size={12} /> Commande scellée par WAKA pour ta sécurité
            </div>
          </div>
        </div>

      </main>

      {/* Modal Contact */}
      <AnimatePresence>
        {showContact && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 z-[100] bg-black/60 backdrop-blur-sm flex items-end sm:items-center justify-center p-4">
            <motion.div initial={{ y: 100 }} animate={{ y: 0 }} className="bg-white w-full max-w-sm rounded-[2.5rem] p-8 text-center shadow-2xl">
              <div className="w-20 h-20 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto mb-6"><Phone size={32} /></div>
              <h3 className="text-xl font-black mb-2 uppercase italic">{order.driver.name}</h3>
              <p className="text-gray-500 text-sm mb-8 font-medium">Livreur certifié WAKA</p>
              <div className="flex flex-col gap-3">
                <a href={`tel:${order.driver.phone}`} className="w-full py-4 bg-green-600 text-white rounded-2xl font-black uppercase text-xs tracking-widest shadow-lg">Appeler le livreur</a>
                <button onClick={() => setShowContact(false)} className="w-full py-4 bg-gray-100 text-gray-600 rounded-2xl font-black uppercase text-xs tracking-widest">Fermer</button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

    </div>
  )
}