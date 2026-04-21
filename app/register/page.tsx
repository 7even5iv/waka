"use client";

import React, { useState, useEffect } from 'react';
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
  Shield,
  Award,
  Zap,
  Truck,
  Gift,
  Star,
  ChevronLeft,
  ChevronRight,
  ArrowLeft
} from 'lucide-react';

// ========== DONNÉES DU CARROUSEL ==========
const slides = [
  {
    id: 1,
    title: "Rejoignez WAKA",
    subtitle: "Créez votre compte gratuitement",
    description: "Inscrivez-vous dès maintenant et profitez d'offres exclusives réservées aux nouveaux membres.",
    icon: Star,
    color: "from-green-500 to-emerald-600",
    image: "/images/slide-bienvenue.jpg"
  },
  {
    id: 2,
    title: "Livraison Express",
    subtitle: "Recevez vos colis en 24h",
    description: "Profitez de notre service de livraison ultra-rapide dans toute la France.",
    icon: Truck,
    color: "from-blue-500 to-cyan-600",
    image: "/images/slide-livraison.jpg"
  },
  {
    id: 3,
    title: "Paiement Sécurisé",
    subtitle: "Transactions 100% protégées",
    description: "Vos données bancaires sont cryptées et vos transactions sont sécurisées.",
    icon: Shield,
    color: "from-purple-500 to-pink-600",
    image: "/images/slide-securite.jpg"
  },
  {
    id: 4,
    title: "Programme Fidélité",
    subtitle: "Gagnez des points à chaque achat",
    description: "Accumulez des points et bénéficiez d'avantages exclusifs.",
    icon: Award,
    color: "from-orange-500 to-red-600",
    image: "/images/slide-fidelite.jpg"
  }
];

// ========== COMPOSANT LOGO AGRANDI ET CENTRÉ ==========
const Logo = ({ className = "h-8 w-auto", variant = "dark" }) => {
  const logoSrc = "/images/logo.png"

  return (
    <div className="flex items-center justify-center">
      <Image
        src={logoSrc}
        alt="WAKA Logo"
        width={240}
        height={80}
        className={`${className} object-contain transition-all duration-300`}
        priority
      />
    </div>
  )
}

// ========== COMPOSANT AVANTAGE ==========
const AdvantageBadge = ({ icon: Icon, text }: { icon: React.ElementType; text: string }) => {
  return (
    <div className="flex items-center gap-2 text-green-600">
      <Icon size={14} />
      <span className="text-xs font-medium">{text}</span>
    </div>
  );
};

// ========== COMPOSANT SLIDE ==========
const SlideContent = ({ slide, isActive }: { slide: typeof slides[0]; isActive: boolean }) => {
  const Icon = slide.icon;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: isActive ? 1 : 0 }}
      transition={{ duration: 0.5 }}
      className="absolute inset-0"
    >
      <div className="absolute inset-0">
        <Image
          src={slide.image}
          alt={slide.title}
          fill
          className="object-cover"
          priority={isActive}
        />
        <div className={`absolute inset-0 bg-gradient-to-br ${slide.color} opacity-80`} />
        <div className="absolute inset-0 bg-black/40" />
      </div>

      <div className="relative z-10 flex flex-col items-center justify-center text-center h-full p-12">
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: isActive ? 1 : 0 }}
          transition={{ delay: 0.2, type: "spring" }}
          className="mb-8"
        >
          <div className={`w-24 h-24 rounded-2xl bg-gradient-to-br ${slide.color} flex items-center justify-center shadow-2xl backdrop-blur-sm bg-white/20`}>
            <Icon className="w-12 h-12 text-white" />
          </div>
        </motion.div>

        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: isActive ? 1 : 0, y: isActive ? 0 : 20 }}
          transition={{ delay: 0.3 }}
          className="text-4xl font-bold text-white mb-3"
        >
          {slide.title}
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: isActive ? 1 : 0, y: isActive ? 0 : 20 }}
          transition={{ delay: 0.4 }}
          className="text-green-100 font-medium text-lg mb-4"
        >
          {slide.subtitle}
        </motion.p>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: isActive ? 1 : 0, y: isActive ? 0 : 20 }}
          transition={{ delay: 0.5 }}
          className="text-white/90 text-base leading-relaxed max-w-sm"
        >
          {slide.description}
        </motion.p>
      </div>
    </motion.div>
  );
};

export default function RegisterPage() {
  const router = useRouter();
  const [currentSlide, setCurrentSlide] = useState(0);

  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    password: '',
    confirmPassword: '',
    referralCode: '',
  });

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [agreeTerms, setAgreeTerms] = useState(false);
  const [formStatus, setFormStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

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

    setTimeout(() => {
      const newUser = {
        id: Date.now(),
        name: formData.name,
        email: formData.email,
        phone: formData.phone,
        referralCode: formData.referralCode,
        createdAt: new Date().toISOString(),
        level: 'Bronze',
        points: 0,
      };

      localStorage.setItem('waka_user', JSON.stringify(newUser));
      setFormStatus('success');

      setTimeout(() => {
        router.push('/profile');
      }, 1500);
    }, 1500);
  };

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % slides.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
  };

  const advantages = [
    { icon: Zap, text: 'Livraison express' },
    { icon: Shield, text: 'Paiement sécurisé' },
    { icon: Award, text: 'Programme fidélité' },
    { icon: Truck, text: 'Suivi en temps réel' },
  ];

  return (
    <div className="min-h-screen bg-white flex overflow-hidden">

      {/* PARTIE GAUCHE - FORMULAIRE D'INSCRIPTION */}
      <div className="w-full lg:w-1/2 flex flex-col items-center justify-center p-6 md:p-12 overflow-y-auto">
        <div className="w-full max-w-md">
          {/* Bouton retour professionnel */}
          <motion.button
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.3 }}
            onClick={() => router.push('/')}
            className="group relative mb-8 flex items-center gap-3 px-4 py-2 rounded-full bg-gray-50 hover:bg-white border border-gray-200 hover:border-green-200 shadow-sm hover:shadow-md transition-all duration-300 w-fit"
          >
            <div className="absolute inset-0 rounded-full bg-gradient-to-r from-green-500/0 to-green-500/0 group-hover:from-green-500/10 group-hover:to-emerald-500/10 transition-all duration-300" />
            <ArrowLeft size={16} className="text-gray-500 group-hover:text-green-600 group-hover:-translate-x-1 transition-all duration-300" />
            <span className="text-sm font-medium text-gray-600 group-hover:text-green-700">Retour à l'accueil</span>
          </motion.button>

          {/* Logo AGRANDI et CENTRÉ au-dessus du formulaire */}
          <div className="mb-10">
            <Logo className="w-auto mx-auto" variant="dark" />
          </div>

          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            className="bg-white rounded-2xl"
          >
            <form onSubmit={handleRegister} className="space-y-4">
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
                    className="w-full pl-12 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-gray-900 outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all"
                    required
                  />
                </div>
              </div>

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
                    className="w-full pl-12 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-gray-900 outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all"
                    required
                  />
                </div>
              </div>

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
                    className="w-full pl-12 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-gray-900 outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all"
                    required
                  />
                </div>
              </div>

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
                    className="w-full pl-12 pr-12 py-3 bg-gray-50 border border-gray-200 rounded-xl text-gray-900 outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all"
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
                    className="w-full pl-12 pr-12 py-3 bg-gray-50 border border-gray-200 rounded-xl text-gray-900 outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all"
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

              <div>
                <label className="text-xs font-bold text-green-700 uppercase tracking-wider mb-1 block">
                  Code de parrainage <span className="text-gray-400 font-normal">(Optionnel)</span>
                </label>
                <div className="relative">
                  <div className="absolute left-4 top-1/2 -translate-y-1/2 text-green-500">
                    <Gift size={18} />
                  </div>
                  <input
                    type="text"
                    name="referralCode"
                    value={formData.referralCode}
                    onChange={handleChange}
                    placeholder="Ex: WAKA-2024"
                    className="w-full pl-12 pr-4 py-3 bg-green-50/50 border border-green-100 rounded-xl text-gray-900 outline-none focus:ring-2 focus:ring-green-500 transition-all"
                  />
                </div>
                <p className="text-[10px] text-green-600 mt-1 ml-1">
                  ✨ Recevez un bonus activé dès votre première commande !
                </p>
              </div>

              <div className="flex items-start gap-3">
                <input
                  type="checkbox"
                  id="terms"
                  checked={agreeTerms}
                  onChange={(e) => setAgreeTerms(e.target.checked)}
                  className="mt-1 w-4 h-4 rounded border-gray-300 text-green-500 focus:ring-green-500"
                />
                <label htmlFor="terms" className="text-xs text-gray-500 leading-relaxed">
                  J'accepte les{' '}
                  <Link href="/terms" className="text-green-600 hover:text-green-700 font-medium">
                    conditions d'utilisation
                  </Link>{' '}
                  et la{' '}
                  <Link href="/privacy" className="text-green-600 hover:text-green-700 font-medium">
                    politique de confidentialité
                  </Link>
                </label>
              </div>

              <AnimatePresence mode="wait">
                {formStatus === 'error' && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0 }}
                    className="bg-red-50 border border-red-200 rounded-xl p-3 flex items-start gap-2"
                  >
                    <AlertCircle size={16} className="text-red-500 flex-shrink-0 mt-0.5" />
                    <p className="text-xs text-red-600">{errorMessage}</p>
                  </motion.div>
                )}

                {formStatus === 'success' && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0 }}
                    className="bg-green-50 border border-green-200 rounded-xl p-3 flex items-center gap-2"
                  >
                    <CheckCircle size={16} className="text-green-500 flex-shrink-0" />
                    <p className="text-xs text-green-600">Compte créé avec succès ! Redirection...</p>
                  </motion.div>
                )}
              </AnimatePresence>

              <button
                type="submit"
                disabled={formStatus === 'loading'}
                className="w-full py-3 bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white font-bold rounded-xl shadow-lg hover:shadow-xl transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
              >
                {formStatus === 'loading' ? (
                  <>
                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                    Création en cours...
                  </>
                ) : (
                  <>
                    Créer mon compte
                    <ArrowRight size={16} />
                  </>
                )}
              </button>
            </form>

            <div className="mt-6 pt-4 border-t border-gray-100">
              <p className="text-[10px] text-gray-400 text-center mb-3">En créant un compte, vous bénéficiez de :</p>
              <div className="grid grid-cols-2 gap-x-4 gap-y-2">
                {advantages.map((adv, index) => (
                  <AdvantageBadge key={index} icon={adv.icon} text={adv.text} />
                ))}
              </div>
            </div>

            <div className="mt-6 text-center">
              <p className="text-sm text-gray-500">
                Déjà un compte ?{' '}
                <Link href="/login" className="text-green-600 font-semibold hover:text-green-700 transition-colors">
                  Se connecter
                </Link>
              </p>
            </div>
          </motion.div>
        </div>
      </div>

      {/* PARTIE DROITE - CARROUSEL */}
      <div className="hidden lg:flex lg:w-1/2 relative overflow-hidden">
        <div className="relative w-full h-full">
          <AnimatePresence mode="wait">
            {slides.map((slide, index) => (
              currentSlide === index && (
                <SlideContent key={slide.id} slide={slide} isActive={true} />
              )
            ))}
          </AnimatePresence>
        </div>

        {/* Indicateurs de slide */}
        <div className="absolute bottom-12 left-0 right-0 flex justify-center gap-2 z-20">
          {slides.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentSlide(index)}
              className={`transition-all duration-300 rounded-full ${currentSlide === index
                ? 'w-8 h-2 bg-white'
                : 'w-2 h-2 bg-white/40 hover:bg-white/60'
                }`}
            />
          ))}
        </div>

        {/* Boutons navigation */}
        <button
          onClick={prevSlide}
          className="absolute left-6 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-white/10 backdrop-blur-sm hover:bg-white/20 transition-all flex items-center justify-center z-20"
        >
          <ChevronLeft className="w-5 h-5 text-white" />
        </button>

        <button
          onClick={nextSlide}
          className="absolute right-6 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-white/10 backdrop-blur-sm hover:bg-white/20 transition-all flex items-center justify-center z-20"
        >
          <ChevronRight className="w-5 h-5 text-white" />
        </button>

        {/* Statistiques */}
        <div className="absolute bottom-8 right-8 z-20 flex gap-6">
          <div className="text-center">
            <div className="text-white font-bold text-xl">50K+</div>
            <div className="text-white/60 text-xs">Clients</div>
          </div>
          <div className="text-center">
            <div className="text-white font-bold text-xl">100K+</div>
            <div className="text-white/60 text-xs">Commandes</div>
          </div>
          <div className="text-center">
            <div className="text-white font-bold text-xl">4.9★</div>
            <div className="text-white/60 text-xs">Note</div>
          </div>
        </div>
      </div>
    </div>
  );
}