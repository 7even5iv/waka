"use client"

import Link from 'next/link'
import { usePathname, useParams } from 'next/navigation'
import { motion } from 'framer-motion'
import { Home, Compass, Package, User, Utensils } from 'lucide-react'

export default function BottomNav() {
  const pathname = usePathname()
  const params = useParams()

  // On récupère la ville actuelle depuis l'URL ou on met Douala par défaut
  const currentCity = params?.city || 'douala'

  const navItems = [
    { name: 'Accueil', href: '/', icon: Home },
    { name: 'Explorer', href: `/${currentCity}`, icon: Utensils }, // Changé en Utensils pour le côté "Faim / Resto"
    { name: 'Commandes', href: '/orders', icon: Package },
    { name: 'Mon WAKA', href: '/profile', icon: User }, // Changé en "Mon WAKA" pour le côté fidélité
  ]

  // Pages où on CACHE la barre (Auth et Recrutement pour laisser de la place aux formulaires)
  const hiddenPaths = [
    '/login',
    '/register',
    '/devenir-partenaire',
    '/recrutement-livreur',
    '/contact',
    '/about',
    '/blog',
    '/services'
  ]

  if (hiddenPaths.includes(pathname)) return null
  // On cache aussi sur la landing page pure pour garder l'effet "site vitrine"
  if (pathname === '/') return null

  const isActiveLink = (href: string) => {
    if (href === '/') return pathname === '/'
    // Gère le cas /douala ou /douala/123
    if (href.startsWith('/') && href.length > 1) {
      return pathname?.startsWith(href)
    }
    return pathname === href
  }

  return (
    <div className="fixed bottom-0 left-0 right-0 z-[100] px-6 pb-6 pointer-events-none">
      <motion.nav
        initial={{ y: 100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ type: "spring", damping: 25, stiffness: 200 }}
        className="max-w-md mx-auto bg-white/90 backdrop-blur-xl border border-emerald-50 rounded-[2rem] shadow-[0_20px_50px_rgba(0,0,0,0.15)] pointer-events-auto overflow-hidden"
      >
        <div className="flex justify-around items-center h-16 px-2">
          {navItems.map((item) => {
            const isActive = isActiveLink(item.href)
            const Icon = item.icon

            return (
              <Link
                key={item.name}
                href={item.href}
                className="relative flex-1 h-full flex flex-col items-center justify-center gap-1 group"
              >
                <div className="relative z-10">
                  <Icon
                    size={20}
                    className={`transition-all duration-300 ${isActive
                        ? 'text-emerald-600 scale-110'
                        : 'text-zinc-400 group-hover:text-emerald-400'
                      }`}
                  />
                </div>

                <span className={`text-[10px] font-black uppercase tracking-tighter transition-colors duration-300 z-10 ${isActive ? 'text-emerald-700' : 'text-zinc-400'
                  }`}>
                  {item.name}
                </span>

                {/* Indicateur de fond actif - Utilise ton thème Émeraude/Jaune */}
                {isActive && (
                  <motion.div
                    layoutId="activeIndicator"
                    className="absolute inset-x-2 inset-y-2 bg-emerald-50 rounded-2xl -z-0"
                    transition={{ type: "spring", bounce: 0.2, duration: 0.4 }}
                  />
                )}

                {/* Petit point jaune pour les notifications ou nouveautés (Optionnel) */}
                {item.name === 'Mon WAKA' && (
                  <div className="absolute top-3 right-6 w-1.5 h-1.5 bg-yellow-400 rounded-full border border-white z-20" />
                )}
              </Link>
            )
          })}
        </div>
      </motion.nav>
    </div>
  )
}