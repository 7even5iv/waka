"use client"

import React, { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Link from 'next/link'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import { 
  User, MapPin, Package, Info, LogOut, ChevronRight, 
  Star, Award, Calendar, Phone, Mail, Settings, Heart,
  ShoppingBag, CreditCard, Bell, Shield, ChevronDown,
  Clock, HelpCircle, Gift
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

// ========== COMPOSANT CARTE STATS ==========
const StatCard = ({ value, label, icon: Icon, color }: any) => {
  return (
    <motion.div 
      whileHover={{ y: -5 }}
      className="bg-white rounded-2xl p-4 shadow-lg border border-green-100 text-center group"
    >
      <div className={`w-12 h-12 rounded-xl bg-gradient-to-r ${color} flex items-center justify-center mx-auto mb-3 group-hover:scale-110 transition-transform`}>
        <Icon size={20} className="text-white" />
      </div>
      <p className="text-2xl font-black text-gray-900">{value}</p>
      <p className="text-[10px] text-gray-500 uppercase tracking-wider font-semibold">{label}</p>
    </motion.div>
  )
}

// ========== COMPOSANT OPTION MENU ==========
const MenuOption = ({ icon: Icon, title, subtitle, href, onClick, color = "green" }: any) => {
  const content = (
    <motion.div 
      whileHover={{ scale: 1.02, x: 5 }}
      whileTap={{ scale: 0.98 }}
      className={`w-full text-left p-4 bg-white rounded-2xl flex items-center justify-between border border-green-100 hover:border-green-200 hover:shadow-md transition-all group ${
        onClick ? 'cursor-pointer' : ''
      }`}
    >
      <div className="flex items-center gap-4">
        <div className={`w-10 h-10 rounded-xl bg-gradient-to-r ${
          color === 'green' ? 'from-green-500 to-emerald-600' : 'from-red-500 to-red-600'
        } flex items-center justify-center`}>
          <Icon size={18} className="text-white" />
        </div>
        <div>
          <p className={`font-semibold ${color === 'green' ? 'text-gray-900' : 'text-red-600'} group-hover:text-green-600 transition-colors`}>
            {title}
          </p>
          {subtitle && <p className="text-xs text-gray-400">{subtitle}</p>}
        </div>
      </div>
      <ChevronRight size={18} className="text-gray-400 group-hover:text-green-500 group-hover:translate-x-1 transition-all" />
    </motion.div>
  )

  if (onClick) {
    return <button onClick={onClick} className="w-full">{content}</button>
  }
  return <Link href={href} className="block">{content}</Link>
}

// ========== COMPOSANT ADRESSE ==========
const AddressCard = ({ title, address, isDefault, onEdit }: any) => {
  return (
    <motion.div 
      whileHover={{ y: -2 }}
      className="bg-white rounded-2xl p-4 border border-green-100 hover:shadow-md transition-all"
    >
      <div className="flex items-start justify-between">
        <div className="flex gap-3">
          <div className="w-10 h-10 rounded-xl bg-green-50 flex items-center justify-center">
            <MapPin size={18} className="text-green-500" />
          </div>
          <div>
            <div className="flex items-center gap-2 flex-wrap">
              <p className="font-semibold text-gray-900">{title}</p>
              {isDefault && (
                <span className="text-[10px] bg-green-100 text-green-600 px-2 py-0.5 rounded-full">Par défaut</span>
              )}
            </div>
            <p className="text-sm text-gray-500 mt-1">{address}</p>
          </div>
        </div>
        <button onClick={onEdit} className="text-xs text-green-500 hover:text-green-600 font-medium">
          Modifier
        </button>
      </div>
    </motion.div>
  )
}

// ========== COMPOSANT COMMANDE RÉCENTE ==========
const RecentOrder = ({ id, date, total, status, items }: any) => {
  return (
    <motion.div 
      whileHover={{ y: -2 }}
      className="bg-white rounded-2xl p-4 border border-green-100 hover:shadow-md transition-all"
    >
      <div className="flex items-center justify-between mb-2">
        <div>
          <p className="font-semibold text-gray-900">Commande {id}</p>
          <div className="flex items-center gap-2 mt-1">
            <Clock size={12} className="text-gray-400" />
            <p className="text-xs text-gray-500">{date}</p>
          </div>
        </div>
        <div className="text-right">
          <p className="font-bold text-green-600">{total} FCFA</p>
          <span className="text-xs px-2 py-0.5 bg-green-100 text-green-600 rounded-full">
            {status}
          </span>
        </div>
      </div>
      <p className="text-sm text-gray-600 mt-2">{items}</p>
    </motion.div>
  )
}

export default function ProfilePage() {
  const router = useRouter()
  const [user, setUser] = useState<any>(null)
  const [showLogoutConfirm, setShowLogoutConfirm] = useState(false)
  const [showEditModal, setShowEditModal] = useState(false)
  const [editingAddress, setEditingAddress] = useState<any>(null)

  useEffect(() => {
    const savedUser = localStorage.getItem('waka_user')
    if (savedUser) {
      setUser(JSON.parse(savedUser))
    } else {
      // Utilisateur par défaut pour la démo
      setUser({ 
        name: 'Utilisateur WAKA', 
        email: 'utilisateur@waka.cm', 
        createdAt: '2024',
        phone: '+237 699 123 456'
      })
    }
  }, [])

  const handleLogout = () => {
    localStorage.removeItem('waka_user')
    router.push('/')
  }

  const stats = [
    { value: "3", label: "Commandes", icon: ShoppingBag, color: "from-green-500 to-emerald-600" },
    { value: "250", label: "Points fidélité", icon: Star, color: "from-yellow-400 to-amber-500" },
    { value: "Bronze", label: "Membre", icon: Award, color: "from-green-500 to-emerald-600" }
  ]

  const addresses = [
    { title: "Domicile", address: "Douala, Akwa - Rue Joffre, Immeuble WAKA", isDefault: true },
    { title: "Bureau", address: "Douala, Bonapriso - Avenue Charles de Gaulle", isDefault: false }
  ]

  const recentOrders = [
    { id: "#WAKA-842", date: "15 Mars 2024", total: 5800, status: "Livrée", items: "Burger WAKA (x2), Frites (x1)" },
    { id: "#WAKA-756", date: "10 Mars 2024", total: 3500, status: "Livrée", items: "Poulet DG, Riz" },
    { id: "#WAKA-721", date: "5 Mars 2024", total: 1200, status: "Livrée", items: "BH Complet" }
  ]

  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-500"></div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50 pb-24">
      
      {/* Header */}
      <div className="sticky top-0 z-20 bg-white/90 backdrop-blur-xl border-b border-green-100 shadow-sm">
        <div className="max-w-2xl mx-auto px-4 py-4">
          <div className="flex justify-between items-center">
            <Logo className="h-8 w-auto" />
            <Link href="/" className="text-sm font-medium text-green-600 hover:text-green-700 transition-colors">
              Accueil
            </Link>
          </div>
        </div>
      </div>

      <main className="max-w-2xl mx-auto px-4 py-6 space-y-6">
        
        {/* Carte Utilisateur */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-gradient-to-r from-green-500 to-emerald-600 rounded-3xl p-6 text-white shadow-xl"
        >
          <div className="flex items-center gap-4">
            <motion.div 
              whileHover={{ scale: 1.05 }}
              className="w-20 h-20 bg-white/20 backdrop-blur-md rounded-2xl flex items-center justify-center shadow-lg"
            >
              <User size={40} className="text-white" />
            </motion.div>
            <div className="flex-1">
              <h2 className="text-2xl font-bold">{user?.name}</h2>
              <p className="text-green-100 text-sm mt-1">{user?.email}</p>
              <div className="flex items-center gap-2 mt-2">
                <Calendar size={12} className="text-green-200" />
                <span className="text-xs text-green-200">Membre depuis {user?.createdAt}</span>
              </div>
            </div>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="w-10 h-10 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center hover:bg-white/30 transition-colors"
              onClick={() => router.push('/settings')}
            >
              <Settings size={18} />
            </motion.button>
          </div>
        </motion.div>

        {/* Section Statistiques */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
        >
          <h3 className="text-xs font-bold uppercase tracking-wider text-gray-400 mb-3 flex items-center gap-2">
            <Award size={12} />
            Statistiques
          </h3>
          <div className="grid grid-cols-3 gap-3">
            {stats.map((stat, index) => (
              <StatCard key={index} {...stat} />
            ))}
          </div>
        </motion.div>

        {/* Commandes récentes */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.15 }}
        >
          <div className="flex items-center justify-between mb-3">
            <h3 className="text-xs font-bold uppercase tracking-wider text-gray-400 flex items-center gap-2">
              <Package size={12} />
              Commandes récentes
            </h3>
            <Link href="/orders" className="text-xs text-green-500 font-medium hover:text-green-600">
              Voir tout
            </Link>
          </div>
          <div className="space-y-3">
            {recentOrders.map((order, index) => (
              <RecentOrder key={index} {...order} />
            ))}
          </div>
        </motion.div>

        {/* Section Adresses */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <div className="flex items-center justify-between mb-3">
            <h3 className="text-xs font-bold uppercase tracking-wider text-gray-400 flex items-center gap-2">
              <MapPin size={12} />
              Mes adresses
            </h3>
            <button className="text-xs text-green-500 font-medium hover:text-green-600">
              + Ajouter
            </button>
          </div>
          <div className="space-y-3">
            {addresses.map((address, index) => (
              <AddressCard
                key={index}
                {...address}
                onEdit={() => {
                  setEditingAddress(address)
                  setShowEditModal(true)
                }}
              />
            ))}
          </div>
        </motion.div>

        {/* Section Menu Options */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="space-y-2"
        >
          <h3 className="text-xs font-bold uppercase tracking-wider text-gray-400 mb-3 flex items-center gap-2">
            <Package size={12} />
            Mon compte
          </h3>
          
          <MenuOption
            icon={Package}
            title="Historique des commandes"
            subtitle="Voir vos commandes passées"
            href="/orders"
          />
          
          <MenuOption
            icon={Heart}
            title="Mes favoris"
            subtitle="Restaurants et produits favoris"
            href="/favorites"
          />
          
          <MenuOption
            icon={Bell}
            title="Notifications"
            subtitle="Gérer vos alertes"
            href="/notifications"
          />
          
          <MenuOption
            icon={CreditCard}
            title="Modes de paiement"
            subtitle="Cartes et Mobile Money"
            href="/payment"
          />
          
          <MenuOption
            icon={Gift}
            title="Mes récompenses"
            subtitle="Points fidélité et offres"
            href="/rewards"
          />
        </motion.div>

        {/* Section Informations */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="space-y-2"
        >
          <h3 className="text-xs font-bold uppercase tracking-wider text-gray-400 mb-3 flex items-center gap-2">
            <Info size={12} />
            À propos
          </h3>
          
          <MenuOption
            icon={Info}
            title="À propos de WAKA"
            subtitle="Découvrez notre histoire"
            href="/about"
          />
          
          <MenuOption
            icon={HelpCircle}
            title="Centre d'aide"
            subtitle="FAQ et support"
            href="/contact"
          />
          
          <MenuOption
            icon={Shield}
            title="Confidentialité et sécurité"
            subtitle="Gérer vos données"
            href="/privacy"
          />
        </motion.div>

        {/* Déconnexion */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="pt-4"
        >
          <MenuOption
            icon={LogOut}
            title="Se déconnecter"
            color="red"
            onClick={() => setShowLogoutConfirm(true)}
          />
        </motion.div>

        {/* Version App */}
        <div className="text-center pt-4 pb-8">
          <p className="text-[10px] text-gray-400">WAKA v1.0.0 • © 2024 Tous droits réservés</p>
        </div>
      </main>

      {/* Modal de confirmation de déconnexion */}
      <AnimatePresence>
        {showLogoutConfirm && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm"
            onClick={() => setShowLogoutConfirm(false)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="bg-white rounded-2xl max-w-sm w-full p-6 shadow-2xl"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="text-center">
                <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-red-100 flex items-center justify-center">
                  <LogOut size={28} className="text-red-500" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">Se déconnecter</h3>
                <p className="text-gray-500 text-sm mb-6">
                  Êtes-vous sûr de vouloir vous déconnecter de votre compte ?
                </p>
                <div className="flex gap-3">
                  <button
                    onClick={() => setShowLogoutConfirm(false)}
                    className="flex-1 px-4 py-2 rounded-xl border border-gray-200 text-gray-600 font-medium hover:bg-gray-50 transition-colors"
                  >
                    Annuler
                  </button>
                  <button
                    onClick={handleLogout}
                    className="flex-1 px-4 py-2 rounded-xl bg-gradient-to-r from-red-500 to-red-600 text-white font-medium hover:shadow-lg transition-all"
                  >
                    Déconnecter
                  </button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Modal d'édition d'adresse (simplifié) */}
      <AnimatePresence>
        {showEditModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm"
            onClick={() => setShowEditModal(false)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="bg-white rounded-2xl max-w-sm w-full p-6 shadow-2xl"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="text-center">
                <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-green-100 flex items-center justify-center">
                  <MapPin size={28} className="text-green-500" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">Modifier l'adresse</h3>
                <p className="text-gray-500 text-sm mb-4">
                  Fonctionnalité à venir
                </p>
                <button
                  onClick={() => setShowEditModal(false)}
                  className="w-full px-4 py-2 rounded-xl bg-gradient-to-r from-green-500 to-emerald-600 text-white font-medium hover:shadow-lg transition-all"
                >
                  Fermer
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

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