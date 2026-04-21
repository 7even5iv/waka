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
  Clock, HelpCircle, Gift, Copy, CheckCircle2, MessageCircle,
  Share2, ArrowLeft, Users // <--- AJOUTE Users ICI
} from 'lucide-react'

const Logo = ({ className = "h-8 w-auto" }) => (
  <Link href="/" className="flex items-center gap-2 group">
    <Image src="/images/logo.png" alt="WAKA Logo" width={180} height={60} className={`${className} object-contain transition-all duration-300 group-hover:scale-105`} priority />
  </Link>
)

export default function ProfilePage() {
  const router = useRouter()
  const [user, setUser] = useState<any>(null)
  const [copied, setCopied] = useState(false)
  const [showLogoutConfirm, setShowLogoutConfirm] = useState(false)

  useEffect(() => {
    const savedUser = localStorage.getItem('waka_user')
    if (savedUser) {
      setUser(JSON.parse(savedUser))
    } else {
      // Données par défaut pour le test (conformes à ton étude)
      setUser({
        name: 'Moussa le Gourmand',
        email: 'moussa@waka.cm',
        createdAt: '2024',
        phone: '+237 690 00 00 00',
        points: 12, // Simulation : l'utilisateur a 12 points
        referralCode: 'WAKA-MOUSSA-237',
        level: 'Client Bronze'
      })
    }
  }, [])

  const copyToClipboard = () => {
    if (user?.referralCode) {
      navigator.clipboard.writeText(user.referralCode)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    }
  }

  const shareWhatsApp = () => {
    const message = `Salut ! Utilise mon code *${user.referralCode}* sur WAKA pour gagner une réduction sur ta première commande ! 📲 Tu commandes, WAKA livre. https://waka.cm`
    window.open(`https://wa.me/?text=${encodeURIComponent(message)}`, '_blank')
  }

  const handleLogout = () => {
    localStorage.removeItem('waka_user')
    router.push('/')
  }

  if (!user) return null

  // Calcul de la barre de progression (Objectif 20 points de ton étude)
  const progress = Math.min((user.points / 20) * 100, 100)

  return (
    <div className="min-h-screen bg-gray-50 font-sans pb-24">

      {/* Header */}
      <div className="sticky top-0 z-30 bg-white/90 backdrop-blur-xl border-b border-green-100 px-6 py-4">
        <div className="max-w-2xl mx-auto flex items-center justify-between">
          <Link href="/" className="p-2 hover:bg-gray-100 rounded-full transition-colors text-gray-600">
            <ArrowLeft size={20} />
          </Link>
          <Logo />
          <button className="p-2 text-gray-400 hover:text-green-600 transition-colors">
            <Settings size={20} />
          </button>
        </div>
      </div>

      <main className="max-w-2xl mx-auto px-6 py-8">

        {/* 1. CARTE IDENTITÉ PREMIUM */}
        <motion.div
          initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
          className="bg-emerald-900 rounded-[2.5rem] p-8 text-white relative overflow-hidden shadow-2xl mb-8"
        >
          <div className="relative z-10 flex items-center gap-6">
            <div className="w-20 h-20 rounded-3xl bg-yellow-400 flex items-center justify-center text-emerald-900 font-black text-3xl shadow-xl rotate-3">
              {user.name.charAt(0)}
            </div>
            <div>
              <h2 className="text-2xl font-black">{user.name}</h2>
              <div className="flex items-center gap-2 mt-1">
                <span className="bg-white/20 px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-tighter flex items-center gap-1">
                  <Award size={10} className="text-yellow-400" /> {user.level}
                </span>
                <span className="text-emerald-200 text-xs">{user.phone}</span>
              </div>
            </div>
          </div>
          <div className="absolute top-0 right-0 w-32 h-32 bg-white/5 rounded-full -mr-10 -mt-10 blur-2xl" />
        </motion.div>

        {/* 2. PROGRAMME DE FIDÉLITÉ (Point 3 de ton étude) */}
        <motion.div
          initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}
          className="bg-white rounded-[2rem] p-8 shadow-xl border border-green-100 mb-8"
        >
          <div className="flex items-center justify-between mb-6">
            <div>
              <h3 className="text-lg font-black text-gray-900 flex items-center gap-2">
                <Gift className="text-green-500" size={20} /> WAKA Points
              </h3>
              <p className="text-xs text-gray-500 font-medium uppercase tracking-widest mt-1">
                Objectif : Livraison Gratuite
              </p>
            </div>
            <div className="text-right">
              <span className="text-3xl font-black text-green-600">{user.points}</span>
              <span className="text-sm font-bold text-gray-400 ml-1">/ 20</span>
            </div>
          </div>

          {/* Barre de progression */}
          <div className="h-4 bg-gray-100 rounded-full overflow-hidden mb-4 border border-gray-50">
            <motion.div
              initial={{ width: 0 }} animate={{ width: `${progress}%` }} transition={{ duration: 1, ease: "easeOut" }}
              className="h-full bg-gradient-to-r from-yellow-400 to-green-500"
            />
          </div>

          <div className="bg-green-50 rounded-2xl p-4 border border-green-100">
            <p className="text-[11px] text-green-700 font-medium leading-relaxed">
              Il te manque <span className="font-black">{20 - user.points} points</span> pour débloquer ta prochaine <span className="underline italic">livraison gratuite</span> !
            </p>
          </div>
        </motion.div>

        {/* 3. SYSTÈME DE PARRAINAGE (Viralité "Flop d'utilisateurs") */}
        <motion.div
          initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}
          className="bg-yellow-400 rounded-[2rem] p-8 text-emerald-950 shadow-xl mb-12 relative overflow-hidden"
        >
          <div className="relative z-10">
            <h3 className="text-xl font-black uppercase tracking-tighter mb-2 italic">Gagne 500 FCFA Cash !</h3>
            <p className="text-sm font-bold opacity-80 mb-6">
              Partage ton code. Dès que ton proche commande, <br /> tu reçois un bonus de 500F sur ton compte.
            </p>

            <div className="flex flex-col sm:flex-row gap-4">
              <div className="flex-1 bg-white/40 backdrop-blur-md rounded-xl p-4 border border-white/50 flex items-center justify-between">
                <span className="font-black text-lg tracking-widest uppercase">{user.referralCode}</span>
                <button onClick={copyToClipboard} className="text-emerald-900 hover:scale-110 transition-transform">
                  {copied ? <CheckCircle2 size={24} className="text-green-600" /> : <Copy size={24} />}
                </button>
              </div>
              <button
                onClick={shareWhatsApp}
                className="bg-emerald-900 text-white px-6 py-4 rounded-xl font-black text-xs uppercase flex items-center justify-center gap-2 hover:bg-black transition-colors shadow-lg"
              >
                <MessageCircle size={18} /> Partager
              </button>
            </div>
          </div>
          <Users size={120} className="absolute -right-4 -bottom-4 text-emerald-900/5 rotate-12" />
        </motion.div>

        {/* 4. ACTIONS COMPTE */}
        <div className="space-y-3">
          <h3 className="text-xs font-black uppercase tracking-[0.2em] text-gray-400 ml-4 mb-4">Paramètres</h3>

          {[
            { icon: ShoppingBag, title: "Historique des commandes", href: "/orders" },
            { icon: Heart, title: "Mes adresses favorites", href: "#" },
            { icon: CreditCard, title: "Modes de paiement", href: "#" },
            { icon: Shield, title: "Sécurité & Confidentialité", href: "/privacy" },
          ].map((item, i) => (
            <Link key={i} href={item.href} className="flex items-center justify-between p-5 bg-white rounded-2xl border border-gray-100 hover:border-green-200 transition-all group">
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 rounded-xl bg-gray-50 flex items-center justify-center text-green-600 group-hover:bg-green-100 transition-colors">
                  <item.icon size={20} />
                </div>
                <span className="text-sm font-bold text-gray-700">{item.title}</span>
              </div>
              <ChevronRight size={18} className="text-gray-300 group-hover:text-green-500 group-hover:translate-x-1 transition-all" />
            </Link>
          ))}

          <button
            onClick={() => setShowLogoutConfirm(true)}
            className="w-full flex items-center gap-4 p-5 bg-red-50 text-red-600 rounded-2xl border border-red-100 mt-8 hover:bg-red-100 transition-all font-bold text-sm"
          >
            <LogOut size={20} /> Se déconnecter
          </button>
        </div>

        <p className="text-center text-[10px] text-gray-400 mt-12 font-bold uppercase tracking-widest">WAKA App v1.0.4 • Cameroun</p>
      </main>

      {/* MODAL DE DÉCONNEXION */}
      <AnimatePresence>
        {showLogoutConfirm && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 z-[100] bg-emerald-950/60 backdrop-blur-sm flex items-center justify-center p-6">
            <motion.div initial={{ scale: 0.9 }} animate={{ scale: 1 }} className="bg-white rounded-[2.5rem] p-10 max-w-sm w-full text-center shadow-2xl">
              <div className="w-20 h-20 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-6 text-red-600">
                <LogOut size={32} />
              </div>
              <h3 className="text-xl font-black text-gray-900 mb-2">Déjà faim ?</h3>
              <p className="text-gray-500 text-sm mb-8 font-medium italic">Es-tu sûr de vouloir nous quitter maintenant ?</p>
              <div className="flex flex-col gap-3">
                <button onClick={handleLogout} className="w-full py-4 bg-red-600 text-white rounded-2xl font-black uppercase text-xs tracking-widest shadow-lg">Oui, me déconnecter</button>
                <button onClick={() => setShowLogoutConfirm(false)} className="w-full py-4 bg-gray-100 text-gray-600 rounded-2xl font-black uppercase text-xs tracking-widest">Annuler</button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

    </div>
  )
}