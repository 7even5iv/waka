"use client"

import React, { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Link from 'next/link'
import Image from 'next/image'
import { 
  ArrowLeft, MapPin, Truck, Clock, CheckCircle, 
  Package, Store, Navigation, User, Phone, MessageCircle,
  AlertCircle, ChevronRight, Star, RefreshCw, Home,
  Navigation2, Compass, Target, Shield, Award, Zap,
  Thermometer, Wind, Cloud, Droplets, Sun
} from 'lucide-react'

// ========== COMPOSANT LOGO ==========
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

// ========== CARTE MODERNE AVEC MAPBOX STYLE ==========
const ModernTrackingMap = ({ driverLocation, restaurantLocation, customerLocation, progress }: any) => {
  const [selectedView, setSelectedView] = useState('standard')
  const [showWeather, setShowWeather] = useState(true)
  
  // Positions sur la carte (%)
  const restaurantPos = { x: 15, y: 45 }
  const customerPos = { x: 85, y: 55 }
  const driverPos = {
    x: restaurantPos.x + (customerPos.x - restaurantPos.x) * (progress / 100),
    y: restaurantPos.y + (customerPos.y - restaurantPos.y) * (progress / 100) + Math.sin(progress * 0.05) * 2
  }
  
  // Calcul de la distance restante
  const distanceRemaining = Math.floor((100 - progress) * 0.12)
  
  return (
    <div className="relative rounded-2xl overflow-hidden shadow-2xl">
      {/* Contrôles de la carte */}
      <div className="absolute top-4 right-4 z-20 flex gap-2">
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => setSelectedView('standard')}
          className={`p-2 rounded-lg backdrop-blur-md transition-all ${
            selectedView === 'standard' 
              ? 'bg-gradient-to-r from-green-500 to-emerald-600 text-white shadow-lg' 
              : 'bg-white/80 text-gray-600 hover:bg-white'
          }`}
        >
          <Navigation2 size={16} />
        </motion.button>
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => setSelectedView('satellite')}
          className={`p-2 rounded-lg backdrop-blur-md transition-all ${
            selectedView === 'satellite' 
              ? 'bg-gradient-to-r from-green-500 to-emerald-600 text-white shadow-lg' 
              : 'bg-white/80 text-gray-600 hover:bg-white'
          }`}
        >
          <Compass size={16} />
        </motion.button>
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => setShowWeather(!showWeather)}
          className="p-2 rounded-lg bg-white/80 backdrop-blur-md text-gray-600 hover:bg-white transition-all"
        >
          <Cloud size={16} />
        </motion.button>
      </div>
      
      {/* Carte principale */}
      <div className="relative w-full h-[500px] overflow-hidden">
        {/* Fond de carte avec effet 3D */}
        <div className={`absolute inset-0 transition-all duration-700 ${
          selectedView === 'standard' 
            ? 'bg-gradient-to-br from-gray-100 via-gray-50 to-gray-100' 
            : 'bg-gradient-to-br from-green-900 via-emerald-800 to-green-900'
        }`}>
          {/* Effet de relief */}
          <svg className="absolute inset-0 w-full h-full opacity-10" preserveAspectRatio="none">
            <defs>
              <pattern id="topography" patternUnits="userSpaceOnUse" width="40" height="40">
                <path d="M0,20 Q20,10 40,20 T80,20" fill="none" stroke="currentColor" strokeWidth="0.5"/>
                <path d="M0,30 Q20,25 40,30 T80,30" fill="none" stroke="currentColor" strokeWidth="0.5"/>
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#topography)" />
          </svg>
          
          {/* Zones d'activité */}
          <div className="absolute inset-0">
            <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-green-400/10 rounded-full blur-3xl animate-pulse" />
            <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-blue-400/10 rounded-full blur-3xl animate-pulse" />
          </div>
        </div>
        
        {/* Routes animées */}
        <svg className="absolute inset-0 w-full h-full" preserveAspectRatio="none">
          <defs>
            <linearGradient id="routeGradient" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#10b981" stopOpacity="0.6">
                <animate attributeName="offset" values="0;1" dur="2s" repeatCount="indefinite" />
              </stop>
              <stop offset="100%" stopColor="#f59e0b" stopOpacity="0.6" />
            </linearGradient>
            <filter id="glow">
              <feGaussianBlur stdDeviation="3" result="coloredBlur"/>
              <feMerge>
                <feMergeNode in="coloredBlur"/>
                <feMergeNode in="SourceGraphic"/>
              </feMerge>
            </filter>
          </defs>
          
          {/* Ligne de route principale avec animation */}
          <path
            d={`M ${restaurantPos.x}% ${restaurantPos.y}% 
                C ${restaurantPos.x + 20}% ${restaurantPos.y - 5}%,
                  ${customerPos.x - 20}% ${customerPos.y + 5}%,
                  ${customerPos.x}% ${customerPos.y}%`}
            stroke="url(#routeGradient)"
            strokeWidth="6"
            fill="none"
            strokeDasharray="8 8"
            className="opacity-60"
          />
          
          {/* Particules en mouvement */}
          <circle
            r="4"
            fill="#f59e0b"
            filter="url(#glow)"
          >
            <animateMotion
              dur="3s"
              repeatCount="indefinite"
              path={`M ${restaurantPos.x}% ${restaurantPos.y}% 
                     C ${restaurantPos.x + 20}% ${restaurantPos.y - 5}%,
                       ${customerPos.x - 20}% ${customerPos.y + 5}%,
                       ${customerPos.x}% ${customerPos.y}%`}
            />
          </circle>
        </svg>
        
        {/* Restaurant */}
        <motion.div 
          className="absolute z-20"
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ type: "spring", delay: 0.2 }}
          style={{ left: `${restaurantPos.x}%`, top: `${restaurantPos.y}%`, transform: 'translate(-50%, -50%)' }}
        >
          <div className="relative group cursor-pointer">
            <div className="w-14 h-14 bg-gradient-to-br from-orange-500 to-red-500 rounded-2xl flex items-center justify-center shadow-2xl rotate-45">
              <Store size={24} className="text-white -rotate-45" />
            </div>
            <div className="absolute -top-12 left-1/2 -translate-x-1/2 whitespace-nowrap bg-gray-900 text-white text-xs px-3 py-1.5 rounded-lg opacity-0 group-hover:opacity-100 transition-all shadow-lg">
              <p className="font-bold">{restaurantLocation?.name || 'Restaurant'}</p>
              <p className="text-[10px] opacity-75">Prêt à servir</p>
            </div>
            <motion.div
              animate={{ scale: [1, 1.2, 1] }}
              transition={{ duration: 2, repeat: Infinity }}
              className="absolute inset-0 rounded-2xl bg-orange-400/30 -z-10"
            />
          </div>
        </motion.div>
        
        {/* Livreur - Effet 3D */}
        <motion.div 
          className="absolute z-30"
          animate={{ 
            left: `${driverPos.x}%`, 
            top: `${driverPos.y}%`
          }}
          transition={{ 
            left: { type: "spring", damping: 20, stiffness: 100 },
            top: { type: "spring", damping: 20, stiffness: 100 }
          }}
          style={{ transform: 'translate(-50%, -50%)' }}
        >
          <div className="relative group">
            <motion.div 
              animate={{ 
                scale: [1, 1.1, 1],
                boxShadow: [
                  "0 0 0 0 rgba(16, 185, 129, 0.4)",
                  "0 0 0 20px rgba(16, 185, 129, 0)",
                  "0 0 0 0 rgba(16, 185, 129, 0)"
                ]
              }}
              transition={{ duration: 2, repeat: Infinity }}
              className="w-16 h-16 bg-gradient-to-r from-green-500 to-emerald-600 rounded-2xl flex items-center justify-center shadow-2xl rotate-45"
            >
              <Truck size={28} className="text-white -rotate-45" />
            </motion.div>
            <div className="absolute -top-14 left-1/2 -translate-x-1/2 whitespace-nowrap bg-gray-900 text-white text-xs px-3 py-1.5 rounded-lg opacity-0 group-hover:opacity-100 transition-all">
              <p className="font-bold">{driverLocation?.name || 'Livreur'}</p>
              <p className="text-[10px] opacity-75">Distance: {distanceRemaining} km</p>
            </div>
            {/* Effet de sillage */}
            <motion.div
              className="absolute inset-0 rounded-2xl bg-green-400/50"
              animate={{ scale: [1, 1.5], opacity: [0.5, 0] }}
              transition={{ duration: 1, repeat: Infinity }}
            />
          </div>
        </motion.div>
        
        {/* Client */}
        <motion.div 
          className="absolute z-20"
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ type: "spring", delay: 0.4 }}
          style={{ left: `${customerPos.x}%`, top: `${customerPos.y}%`, transform: 'translate(-50%, -50%)' }}
        >
          <div className="relative group cursor-pointer">
            <div className="w-14 h-14 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-2xl flex items-center justify-center shadow-2xl rotate-45">
              <Home size={24} className="text-white -rotate-45" />
            </div>
            <div className="absolute -top-12 left-1/2 -translate-x-1/2 whitespace-nowrap bg-gray-900 text-white text-xs px-3 py-1.5 rounded-lg opacity-0 group-hover:opacity-100 transition-all">
              <p className="font-bold">Votre adresse</p>
              <p className="text-[10px] opacity-75">Arrivée dans {Math.max(0, distanceRemaining * 2)} min</p>
            </div>
          </div>
        </motion.div>
        
        {/* Zone d'effet radar */}
        <div className="absolute bottom-4 left-4 z-20">
          <div className="bg-black/40 backdrop-blur-md rounded-lg px-3 py-2 text-white text-xs">
            <div className="flex items-center gap-2">
              <Navigation2 size={12} />
              <span>Radar actif • {Math.round(progress)}% du trajet</span>
            </div>
          </div>
        </div>
        
        {/* Météo */}
        {showWeather && (
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="absolute bottom-4 right-4 z-20 bg-white/90 backdrop-blur-md rounded-xl p-3 shadow-lg"
          >
            <div className="flex items-center gap-3">
              <div className="text-center">
                <Sun size={24} className="text-yellow-500" />
                <p className="text-[10px] text-gray-600">28°C</p>
              </div>
              <div className="h-8 w-px bg-gray-200" />
              <div className="flex gap-2">
                <div className="text-center">
                  <Wind size={16} className="text-gray-500 mx-auto" />
                  <p className="text-[8px] text-gray-500">12 km/h</p>
                </div>
                <div className="text-center">
                  <Droplets size={16} className="text-blue-500 mx-auto" />
                  <p className="text-[8px] text-gray-500">65%</p>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </div>
      
      {/* Légende moderne */}
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 z-20 bg-black/60 backdrop-blur-md rounded-full px-4 py-2">
        <div className="flex gap-4 text-white text-xs">
          <div className="flex items-center gap-1">
            <div className="w-2 h-2 bg-orange-500 rounded-full" />
            <span>Restaurant</span>
          </div>
          <div className="flex items-center gap-1">
            <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
            <span>Livreur</span>
          </div>
          <div className="flex items-center gap-1">
            <div className="w-2 h-2 bg-blue-500 rounded-full" />
            <span>Client</span>
          </div>
          <div className="flex items-center gap-1">
            <div className="w-2 h-2 bg-gradient-to-r from-green-500 to-yellow-500" />
            <span>Trajet</span>
          </div>
        </div>
      </div>
    </div>
  )
}

// ========== PAGE PRINCIPALE ==========
export default function TrackingPage({ params }: { params: Promise<{ orderId: string }> | { orderId: string } }) {
  const [orderId, setOrderId] = useState<string>('')
  const [progress, setProgress] = useState(0)
  const [currentStep, setCurrentStep] = useState(0)
  const [showContactModal, setShowContactModal] = useState(false)
  const [estimatedTime, setEstimatedTime] = useState(45)
  const [speed, setSpeed] = useState(0)
  
  const order = {
    id: '#WAKA-842',
    restaurant: {
      name: 'Dolly\'s Restaurant',
      address: 'Bonapriso, Douala',
      phone: '+237 699 123 456',
      rating: 4.9
    },
    driver: {
      name: 'Jean Livreur',
      phone: '+237 699 123 457',
      rating: 4.9,
      vehicle: 'Moto',
      plate: 'LT 123 AB'
    },
    customer: {
      name: 'Utilisateur WAKA',
      address: 'Akwa, Rue Joffre, Douala'
    },
    items: [
      { name: 'Burger WAKA', quantity: 2, price: 2500 },
      { name: 'Frites', quantity: 1, price: 800 }
    ],
    total: 5800,
    deliveryFee: 500
  }
  
  const steps = [
    { title: 'Commande confirmée', time: '12:30', icon: Package, completed: true },
    { title: 'Préparation', time: '12:35', icon: Store, completed: true },
    { title: 'En livraison', time: '12:50', icon: Truck, completed: false },
    { title: 'Livré', time: '13:15', icon: CheckCircle, completed: false }
  ]
  
  // Résoudre les params asynchrones
  useEffect(() => {
    const resolveParams = async () => {
      const resolved = await params
      setOrderId(resolved.orderId)
    }
    resolveParams()
  }, [params])
  
  useEffect(() => {
    const interval = setInterval(() => {
      setProgress(prev => {
        const newProgress = prev + 0.5
        const newStep = Math.min(Math.floor(newProgress / 33), 3)
        setCurrentStep(newStep)
        
        // Vitesse du livreur
        setSpeed(Math.floor(20 + Math.random() * 15))
        
        // Temps estimé
        if (newProgress < 33) {
          setEstimatedTime(Math.floor(45 - (newProgress / 33) * 45))
        } else if (newProgress < 66) {
          setEstimatedTime(Math.floor(25 - ((newProgress - 33) / 33) * 20))
        } else if (newProgress < 90) {
          setEstimatedTime(Math.floor(8 - ((newProgress - 66) / 24) * 5))
        } else {
          setEstimatedTime(0)
        }
        
        return newProgress >= 100 ? 100 : newProgress
      })
    }, 1000)
    
    return () => clearInterval(interval)
  }, [])
  
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 pb-24">
      
      {/* Header */}
      <div className="sticky top-0 z-40 bg-white/90 backdrop-blur-xl border-b border-gray-100 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-4">
          <div className="flex justify-between items-center">
            <Link href="/orders" className="flex items-center gap-2 text-gray-600 hover:text-gray-900 transition-colors group">
              <ArrowLeft size={18} className="group-hover:-translate-x-1 transition-transform" />
              <span className="text-sm font-medium hidden sm:inline">Mes commandes</span>
            </Link>
            <Logo className="h-8 w-auto" />
            <div className="w-8" />
          </div>
        </div>
      </div>
      
      <main className="max-w-7xl mx-auto px-4 sm:px-6 py-6 space-y-6">
        
        {/* Header de statut */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className="text-xs font-bold text-green-600 bg-green-100 px-2 py-0.5 rounded-full uppercase tracking-wider">
                En cours
              </span>
              <span className="text-xs text-gray-400">{order.id}</span>
            </div>
            <h1 className="text-2xl md:text-3xl font-black text-gray-900">
              Suivi de votre commande
            </h1>
            <p className="text-gray-500 text-sm mt-1">
              Votre repas est en route vers vous
            </p>
          </div>
          
          <div className="bg-white rounded-2xl p-4 shadow-lg border border-gray-100">
            <div className="flex items-center gap-4">
              <div className="text-center">
                <p className="text-2xl font-black text-gray-900">{estimatedTime}</p>
                <p className="text-[10px] text-gray-500">minutes restantes</p>
              </div>
              <div className="h-10 w-px bg-gray-200" />
              <div className="text-center">
                <p className="text-2xl font-black text-gray-900">{speed}</p>
                <p className="text-[10px] text-gray-500">km/h</p>
              </div>
              <div className="h-10 w-px bg-gray-200" />
              <div className="text-center">
                <Truck size={24} className="text-green-500 mx-auto" />
                <p className="text-[10px] text-gray-500">en mouvement</p>
              </div>
            </div>
          </div>
        </div>
        
        {/* Carte moderne */}
        <ModernTrackingMap
          driverLocation={order.driver}
          restaurantLocation={order.restaurant}
          customerLocation={order.customer}
          progress={progress}
        />
        
        {/* Grille d'informations */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Restaurant */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="bg-white rounded-2xl p-5 shadow-lg border border-gray-100"
          >
            <div className="flex items-center gap-3 mb-3">
              <div className="w-10 h-10 rounded-xl bg-orange-100 flex items-center justify-center">
                <Store size={18} className="text-orange-500" />
              </div>
              <div>
                <p className="text-xs text-gray-500">Restaurant</p>
                <p className="font-bold text-gray-900">{order.restaurant.name}</p>
              </div>
            </div>
            <p className="text-sm text-gray-500 flex items-center gap-2">
              <MapPin size={12} />
              {order.restaurant.address}
            </p>
          </motion.div>
          
          {/* Livreur */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="bg-white rounded-2xl p-5 shadow-lg border border-gray-100 cursor-pointer hover:shadow-xl transition-all"
            onClick={() => setShowContactModal(true)}
          >
            <div className="flex items-center gap-3 mb-3">
              <div className="w-10 h-10 rounded-xl bg-green-100 flex items-center justify-center">
                <Truck size={18} className="text-green-500" />
              </div>
              <div>
                <p className="text-xs text-gray-500">Votre livreur</p>
                <p className="font-bold text-gray-900">{order.driver.name}</p>
              </div>
              <div className="ml-auto flex items-center gap-1">
                <Star size={12} className="text-yellow-400 fill-yellow-400" />
                <span className="text-sm font-bold text-gray-900">{order.driver.rating}</span>
              </div>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-gray-500">Véhicule: {order.driver.vehicle}</span>
              <span className="text-gray-500">Immat: {order.driver.plate}</span>
            </div>
          </motion.div>
          
          {/* Client */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="bg-white rounded-2xl p-5 shadow-lg border border-gray-100"
          >
            <div className="flex items-center gap-3 mb-3">
              <div className="w-10 h-10 rounded-xl bg-blue-100 flex items-center justify-center">
                <Home size={18} className="text-blue-500" />
              </div>
              <div>
                <p className="text-xs text-gray-500">Livraison</p>
                <p className="font-bold text-gray-900">{order.customer.name}</p>
              </div>
            </div>
            <p className="text-sm text-gray-500 flex items-center gap-2">
              <MapPin size={12} />
              {order.customer.address}
            </p>
          </motion.div>
        </div>
        
        {/* Modal contact */}
        <AnimatePresence>
          {showContactModal && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm"
              onClick={() => setShowContactModal(false)}
            >
              <motion.div
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.9, opacity: 0 }}
                className="bg-white rounded-2xl max-w-sm w-full p-6 shadow-2xl"
                onClick={(e) => e.stopPropagation()}
              >
                <div className="text-center">
                  <div className="w-20 h-20 mx-auto mb-4 rounded-full bg-gradient-to-r from-green-500 to-emerald-600 flex items-center justify-center">
                    <Truck size={32} className="text-white" />
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-1">{order.driver.name}</h3>
                  <p className="text-sm text-gray-500 mb-4">Votre livreur</p>
                  
                  <div className="space-y-3 mb-6">
                    <div className="flex items-center justify-between p-3 bg-gray-50 rounded-xl">
                      <span className="text-sm text-gray-600">Immatriculation</span>
                      <span className="font-mono font-bold text-gray-900">{order.driver.plate}</span>
                    </div>
                    <div className="flex items-center justify-between p-3 bg-gray-50 rounded-xl">
                      <span className="text-sm text-gray-600">Véhicule</span>
                      <span className="font-medium text-gray-900">{order.driver.vehicle}</span>
                    </div>
                    <div className="flex items-center justify-between p-3 bg-gray-50 rounded-xl">
                      <span className="text-sm text-gray-600">Note</span>
                      <div className="flex items-center gap-1">
                        <Star size={14} className="text-yellow-400 fill-yellow-400" />
                        <span className="font-bold text-gray-900">{order.driver.rating}</span>
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex gap-3">
                    <a
                      href={`tel:${order.driver.phone}`}
                      className="flex-1 flex items-center justify-center gap-2 px-4 py-3 rounded-xl bg-green-500 text-white font-medium hover:bg-green-600 transition-colors"
                    >
                      <Phone size={16} />
                      Appeler
                    </a>
                    <a
                      href={`https://wa.me/${order.driver.phone.replace(/[^0-9]/g, '')}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex-1 flex items-center justify-center gap-2 px-4 py-3 rounded-xl bg-[#25D366] text-white font-medium hover:bg-[#20b859] transition-colors"
                    >
                      <MessageCircle size={16} />
                      WhatsApp
                    </a>
                  </div>
                  
                  <button
                    onClick={() => setShowContactModal(false)}
                    className="mt-4 w-full px-4 py-2 rounded-xl border border-gray-200 text-gray-600 font-medium hover:bg-gray-50 transition-colors"
                  >
                    Fermer
                  </button>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </main>
    </div>
  )
}