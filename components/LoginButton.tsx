"use client"
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs'

export default function AuthButton() {
  const supabase = createClientComponentClient()

  const handleLogin = async (provider: 'google' | 'facebook') => {
    await supabase.auth.signInWithOAuth({
      provider,
      options: {
        redirectTo: `${location.origin}/auth/callback`,
      },
    })
  }

  return (
    <div className="flex flex-col gap-4 w-full max-w-xs mx-auto">
      <button 
        onClick={() => handleLogin('google')}
        className="flex items-center justify-center gap-3 bg-white text-gray-900 p-4 rounded-2xl font-bold shadow-xl active:scale-95 transition-all"
      >
        <img src="/google-icon.svg" className="w-6 h-6" alt="Google" />
        Continuer avec Google
      </button>
      
      {/* Optionnel : Login par numéro de téléphone */}
      <div className="text-center text-white/40 text-xs py-2 uppercase font-bold tracking-widest">OU</div>
      
      <button className="bg-[#25D366] text-white p-4 rounded-2xl font-black shadow-xl">
        Continuer avec WhatsApp
      </button>
    </div>
  )
}