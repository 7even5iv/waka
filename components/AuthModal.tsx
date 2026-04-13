"use client"
import { motion } from 'framer-motion'
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs'

export default function AuthModal() {
  const supabase = createClientComponentClient()

  const login = (provider: 'google' | 'facebook' | 'apple') => {
    supabase.auth.signInWithOAuth({
      provider,
      options: { redirectTo: `${window.location.origin}/auth/callback` }
    })
  }

  return (
    <div className="bg-green-900/90 backdrop-blur-2xl p-8 rounded-[40px] border border-white/10 w-full max-w-sm shadow-2xl">
      <h2 className="text-2xl font-black text-white text-center mb-8">
        Rejoignez <span className="text-yellow-400">WAKA</span>
      </h2>
      
      <div className="flex flex-col gap-4">
        {/* BOUTON GOOGLE (Android & iPhone) */}
        <button 
          onClick={() => login('google')}
          className="flex items-center justify-center gap-3 bg-white text-gray-900 p-4 rounded-2xl font-bold active:scale-95 transition-all"
        >
          <img src="https://www.google.com/favicon.ico" className="w-5 h-5" alt="" />
          Continuer avec Google
        </button>

        {/* BOUTON FACEBOOK (Très fort au Cameroun) */}
        <button 
          onClick={() => login('facebook')}
          className="flex items-center justify-center gap-3 bg-[#1877F2] text-white p-4 rounded-2xl font-bold active:scale-95 transition-all"
        >
          <img src="https://www.facebook.com/favicon.ico" className="w-5 h-5" alt="" />
          Continuer avec Facebook
        </button>

        {/* BOUTON APPLE (Optionnel pour le look "High-Tech") */}
        <button 
          onClick={() => login('apple')}
          className="flex items-center justify-center gap-3 bg-black text-white p-4 rounded-2xl font-bold active:scale-95 transition-all"
        >
          <span className="text-xl"></span>
          Sign in with Apple
        </button>
      </div>

      <p className="text-[10px] text-green-300/50 text-center mt-8 px-4 leading-tight">
        En vous connectant, vous facilitez la gestion de vos livraisons par nos équipes.
      </p>
    </div>
  )
}