"use client"

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { motion, AnimatePresence } from 'framer-motion'
import { 
  Home, Compass, Package, User, Info, 
  Heart, ShoppingBag, Zap, Award
} from 'lucide-react'

export default function BottomNav() {
  const pathname = usePathname()
  
  const navItems = [
    { 
      name: 'Accueil', 
      href: '/', 
      icon: Home,
      activeIcon: Home
    },
    { 
      name: 'Explorer', 
      href: '/douala', 
      icon: Compass,
      activeIcon: Compass
    },
    { 
      name: 'Commandes', 
      href: '/orders', 
      icon: Package,
      activeIcon: Package
    },
    { 
      name: 'Profil', 
      href: '/profile', 
      icon: User,
      activeIcon: User
    },
  ]

  // Pages où la barre de navigation ne doit pas s'afficher
  const hiddenPaths = ['/login', '/register', '/contact', '/about', '/blog', '/services', '/', '/terms', '/privacy']
  if (hiddenPaths.includes(pathname)) return null

  // Vérifier si le lien est actif
  const isActiveLink = (href: string) => {
    if (href === '/') {
      return pathname === '/'
    }
    if (href === '/douala') {
      return pathname === '/douala' || pathname?.startsWith('/douala/')
    }
    return pathname === href
  }

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 px-4 pb-4 pointer-events-none">
      <motion.nav 
        initial={{ y: 100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ type: "spring", damping: 20, stiffness: 200, delay: 0.2 }}
        className="max-w-md mx-auto bg-white/95 backdrop-blur-xl border border-green-100 rounded-2xl shadow-xl pointer-events-auto"
      >
        <div className="flex justify-around items-center p-2">
          {navItems.map((item) => {
            const isActive = isActiveLink(item.href)
            const Icon = item.icon
            
            return (
              <Link 
                key={item.name} 
                href={item.href} 
                className="relative flex-1 py-2 px-2 flex flex-col items-center gap-1 group"
              >
                <motion.div
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                  className="relative"
                >
                  <Icon 
                    size={22} 
                    className={`transition-all duration-300 ${
                      isActive 
                        ? 'text-green-500 fill-green-500/10' 
                        : 'text-gray-400 group-hover:text-green-400'
                    }`}
                  />
                  
                  {/* Indicateur actif */}
                  {isActive && (
                    <motion.div
                      layoutId="activeNavDot"
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      className="absolute -top-1 -right-1 w-2 h-2 bg-green-500 rounded-full"
                    />
                  )}
                </motion.div>
                
                <span 
                  className={`text-[10px] font-bold uppercase tracking-wider transition-all duration-300 ${
                    isActive 
                      ? 'text-green-600' 
                      : 'text-gray-400 group-hover:text-green-500'
                  }`}
                >
                  {item.name}
                </span>
                
                {/* Indicateur de fond actif */}
                {isActive && (
                  <motion.div
                    layoutId="activeNavBg"
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="absolute inset-0 bg-green-50 rounded-xl -z-10"
                  />
                )}
              </Link>
            )
          })}
        </div>
        
        {/* Barre de progression sécurité */}
        <div className="px-4 pb-2">
          <div className="flex items-center justify-center gap-1">
            <div className="w-1 h-1 bg-green-200 rounded-full" />
            <div className="w-1 h-1 bg-green-300 rounded-full" />
            <div className="w-1 h-1 bg-green-400 rounded-full" />
            <div className="w-1 h-1 bg-green-500 rounded-full" />
            <span className="text-[8px] text-green-400 ml-1">Sécurisé</span>
          </div>
        </div>
      </motion.nav>
    </div>
  )
}