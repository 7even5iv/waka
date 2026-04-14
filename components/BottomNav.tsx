"use client"

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { motion } from 'framer-motion'
import { Home, Compass, Package, User } from 'lucide-react'

export default function BottomNav() {
  const pathname = usePathname()

  const navItems = [
    { name: 'Accueil', href: '/', icon: Home },
    { name: 'Explorer', href: '/douala', icon: Compass },
    { name: 'Commandes', href: '/orders', icon: Package },
    { name: 'Profil', href: '/profile', icon: User },
  ]

  const hiddenPaths = ['/login', '/register', '/contact', '/about', '/blog', '/services', '/', '/terms', '/privacy']
  if (hiddenPaths.includes(pathname)) return null

  const isActiveLink = (href: string) => {
    if (href === '/') return pathname === '/'
    if (href === '/douala') return pathname === '/douala' || pathname?.startsWith('/douala/')
    return pathname === href
  }

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 px-8 pb-6 pointer-events-none">
      <motion.nav
        initial={{ y: 80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ type: "spring", damping: 25, stiffness: 200 }}
        // bg-white : Fond blanc pur
        // shadow-lg : Ombre douce pour détacher du contenu
        // border-zinc-100 : Bordure très subtile pour la structure
        className="max-w-sm mx-auto bg-white border border-zinc-100 rounded-2xl shadow-[0_8px_30px_rgb(0,0,0,0.08)] pointer-events-auto overflow-hidden"
      >
        <div className="flex justify-around items-center h-14 px-1">
          {navItems.map((item) => {
            const isActive = isActiveLink(item.href)
            const Icon = item.icon

            return (
              <Link
                key={item.name}
                href={item.href}
                className="relative flex-1 h-full flex flex-col items-center justify-center gap-0.5 group"
              >
                <div className="relative z-10">
                  <Icon
                    size={20}
                    className={`transition-all duration-300 ${isActive ? 'text-green-600 scale-110' : 'text-zinc-400 group-hover:text-zinc-600'
                      }`}
                  />
                </div>

                <span className={`text-[9px] font-bold tracking-tight transition-colors duration-300 z-10 ${isActive ? 'text-green-600' : 'text-zinc-400'
                  }`}>
                  {item.name}
                </span>

                {/* Background de l'élément actif : vert très léger sur fond blanc */}
                {isActive && (
                  <motion.div
                    layoutId="activeIndicator"
                    className="absolute inset-x-2 inset-y-2 bg-green-50 rounded-xl -z-0"
                    transition={{ type: "spring", bounce: 0.2, duration: 0.4 }}
                  />
                )}
              </Link>
            )
          })}
        </div>
      </motion.nav>
    </div>
  )
}