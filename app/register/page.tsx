"use client";

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import {
  User,
  Phone,
  Mail,
  Lock,
  Eye,
  EyeOff,
  ArrowRight,
  CheckCircle,
  AlertCircle,
  // Icônes réseaux sociaux corrigées
  FacebookIcon,
  TwitterIcon,
  InstagramIcon,
  Shield,
  Award,
  Zap,
  Truck,
} from 'lucide-react';

// ========== COMPOSANT LOGO ==========
const Logo = ({ className = "h-8 w-auto" }: { className?: string }) => {
  return (
    <Link href="/" className="flex items-center gap-2 group">
      <Image
        src="/images/logo.png"
        alt="WAKA Logo"
        width={180}
        height={60}
        className={`${className} object-contain transition-all duration-300 group-hover:scale-105`}
        priority
      />
    </Link>
  );
};

// ========== COMPOSANT AVANTAGE ==========
const AdvantageBadge = ({ icon: Icon, text }: { icon: React.ElementType; text: string }) => {
  return (
    <div className="flex items-center gap-2 text-green-600">
      <Icon size={14} />
      <span className="text-xs font-medium">{text}</span>
    </div>
  );
};

export default function RegisterPage() {
  const router = useRouter();

  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    password: '',
    confirmPassword: '',
  });

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [agreeTerms, setAgreeTerms] = useState(false);
  const [formStatus, setFormStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const validateForm = (): boolean => {
    if (!formData.name.trim()) {
      setErrorMessage('Veuillez entrer votre nom complet');
      return false;
    }
    if (!formData.phone.trim()) {
      setErrorMessage('Veuillez entrer votre numéro WhatsApp');
      return false;
    }
    if (!formData.email.trim()) {
      setErrorMessage('Veuillez entrer votre email');
      return false;
    }
    if (!formData.password) {
      setErrorMessage('Veuillez créer un mot de passe');
      return false;
    }
    if (formData.password.length < 6) {
      setErrorMessage('Le mot de passe doit contenir au moins 6 caractères');
      return false;
    }
    if (formData.password !== formData.confirmPassword) {
      setErrorMessage('Les mots de passe ne correspondent pas');
      return false;
    }
    if (!agreeTerms) {
      setErrorMessage('Veuillez accepter les conditions d\'utilisation');
      return false;
    }
    return true;
  };

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) {
      setFormStatus('error');
      setTimeout(() => setFormStatus('idle'), 3000);
      return;
    }

    setFormStatus('loading');

    // Simulation d'inscription (à remplacer plus tard par un vrai appel API)
    setTimeout(() => {
      const newUser = {
        id: Date.now(),
        name: formData.name,
        email: formData.email,
        phone: formData.phone,
        createdAt: new Date().toISOString(),
        level: 'Bronze',
      };

      localStorage.setItem('waka_user', JSON.stringify(newUser));
      setFormStatus('success');

      setTimeout(() => {
        router.push('/profile');
      }, 1500);
    }, 1500);
  };

  const advantages = [
    { icon: Zap, text: 'Livraison express' },
    { icon: Shield, text: 'Paiement sécurisé' },
    { icon: Award, text: 'Programme fidélité' },
    { icon: Truck, text: 'Suivi en temps réel' },
  ];

  return (
    <div className="min-h-screen bg-white flex flex-col items-center justify-center p-6 relative overflow-hidden">
      {/* Pattern de fond */}
      <div className="absolute inset-0 bg-[linear-gradient(45deg,rgba(34,197,94,0.02)_1px,transparent_1px)] bg-[size:40px_40px] pointer-events-none" />

      {/* Orbes flottantes */}
      <div className="absolute top-20 -left-40 w-96 h-96 bg-green-200 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob" />
      <div className="absolute bottom-20 -right-40 w-96 h-96 bg-yellow-200 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-2000" />

      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-8 text-center relative z-10"
      >
        <div className="flex justify-center mb-4">
          <Logo className="h-12 w-auto" />
        </div>
        <h1 className="text-3xl font-black text-gray-900">Créer un compte</h1>
        <p className="text-gray-500 text-sm mt-2">Rejoignez l'aventure WAKA</p>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="w-full max-w-md bg-white rounded-3xl p-8 shadow-xl border border-green-100 relative z-10"
      >
        <form onSubmit={handleRegister} className="space-y-5">
          {/* Nom complet */}
          <div>
            <label className="text-xs font-bold text-gray-700 uppercase tracking-wider mb-1 block">
              Nom complet
            </label>
            <div className="relative">
              <div className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400">
                <User size={18} />
              </div>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="Jean Moussa"
                className="w-full pl-12 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-2xl text-gray-900 outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent placeholder:text-gray-400 transition-all"
                required
              />
            </div>
          </div>

          {/* WhatsApp */}
          <div>
            <label className="text-xs font-bold text-gray-700 uppercase tracking-wider mb-1 block">
              Numéro WhatsApp
            </label>
            <div className="relative">
              <div className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400">
                <Phone size={18} />
              </div>
              <input
                type="tel"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                placeholder="6xx xxx xxx"
                className="w-full pl-12 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-2xl text-gray-900 outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent placeholder:text-gray-400"
                required
              />
            </div>
          </div>

          {/* Email */}
          <div>
            <label className="text-xs font-bold text-gray-700 uppercase tracking-wider mb-1 block">
              Email
            </label>
            <div className="relative">
              <div className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400">
                <Mail size={18} />
              </div>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="votre@email.com"
                className="w-full pl-12 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-2xl text-gray-900 outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent placeholder:text-gray-400"
                required
              />
            </div>
          </div>

          {/* Mot de passe */}
          <div>
            <label className="text-xs font-bold text-gray-700 uppercase tracking-wider mb-1 block">
              Mot de passe
            </label>
            <div className="relative">
              <div className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400">
                <Lock size={18} />
              </div>
              <input
                type={showPassword ? "text" : "password"}
                name="password"
                value={formData.password}
                onChange={handleChange}
                placeholder="Au moins 6 caractères"
                className="w-full pl-12 pr-12 py-3 bg-gray-50 border border-gray-200 rounded-2xl text-gray-900 outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent placeholder:text-gray-400"
                required
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
              >
                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>
          </div>

          {/* Confirmation mot de passe */}
          <div>
            <label className="text-xs font-bold text-gray-700 uppercase tracking-wider mb-1 block">
              Confirmer le mot de passe
            </label>
            <div className="relative">
              <div className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400">
                <Lock size={18} />
              </div>
              <input
                type={showConfirmPassword ? "text" : "password"}
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleChange}
                placeholder="Confirmez votre mot de passe"
                className="w-full pl-12 pr-12 py-3 bg-gray-50 border border-gray-200 rounded-2xl text-gray-900 outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent placeholder:text-gray-400"
                required
              />
              <button
                type="button"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
              >
                {showConfirmPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>
          </div>

          {/* Conditions */}
          <div className="flex items-start gap-3">
            <input
              type="checkbox"
              id="terms"
              checked={agreeTerms}
              onChange={(e) => setAgreeTerms(e.target.checked)}
              className="mt-1 w-4 h-4 rounded border-gray-300 text-green-500 focus:ring-green-500 accent-green-500"
            />
            <label htmlFor="terms" className="text-xs text-gray-500 leading-relaxed">
              J'accepte les{' '}
              <Link href="/terms" className="text-green-500 hover:text-green-600 font-medium">
                conditions d'utilisation
              </Link>{' '}
              et la{' '}
              <Link href="/privacy" className="text-green-500 hover:text-green-600 font-medium">
                politique de confidentialité
              </Link>
            </label>
          </div>

          {/* Messages de statut */}
          <AnimatePresence mode="wait">
            {formStatus === 'error' && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                className="bg-red-50 border border-red-200 rounded-2xl p-4 flex items-start gap-3"
              >
                <AlertCircle size={20} className="text-red-500 flex-shrink-0 mt-0.5" />
                <p className="text-sm text-red-600">{errorMessage}</p>
              </motion.div>
            )}

            {formStatus === 'success' && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                className="bg-green-50 border border-green-200 rounded-2xl p-4 flex items-center gap-3"
              >
                <CheckCircle size={20} className="text-green-500 flex-shrink-0" />
                <p className="text-sm text-green-600">Compte créé avec succès ! Redirection en cours...</p>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Bouton d'inscription */}
          <button
            type="submit"
            disabled={formStatus === 'loading'}
            className="w-full py-3.5 bg-gradient-to-r from-green-500 to-emerald-600 text-white font-bold rounded-2xl shadow-md hover:shadow-xl transition-all disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center gap-2 text-base"
          >
            {formStatus === 'loading' ? (
              <>
                <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                Création en cours...
              </>
            ) : (
              <>
                Créer mon compte
                <ArrowRight size={18} />
              </>
            )}
          </button>
        </form>

        {/* Avantages */}
        <div className="mt-10 pt-6 border-t border-gray-100">
          <p className="text-xs text-gray-400 text-center mb-4">En créant un compte, vous bénéficiez de :</p>
          <div className="grid grid-cols-2 gap-x-6 gap-y-3">
            {advantages.map((adv, index) => (
              <AdvantageBadge key={index} icon={adv.icon} text={adv.text} />
            ))}
          </div>
        </div>

        {/* Lien vers connexion */}
        <div className="mt-8 text-center">
          <p className="text-sm text-gray-500">
            Déjà un compte ?{' '}
            <Link href="/login" className="text-green-600 font-semibold hover:text-green-700 transition-colors">
              Se connecter
            </Link>
          </p>
        </div>
      </motion.div>

      {/* Styles globaux pour les animations */}
      <style jsx global>{`
        @keyframes blob {
          0%, 100% { transform: translate(0px, 0px) scale(1); }
          33% { transform: translate(30px, -50px) scale(1.08); }
          66% { transform: translate(-25px, 30px) scale(0.92); }
        }
        .animate-blob {
          animation: blob 8s infinite ease-in-out;
        }
        .animation-delay-2000 {
          animation-delay: 2s;
        }
      `}</style>
    </div>
  );
}