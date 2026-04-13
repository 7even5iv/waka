"use client"

import React from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { motion } from 'framer-motion'
import { 
  ChevronLeft, Shield, Lock, Eye, Database, 
  Mail, Phone, User, Cookie, Smartphone, Globe,
  ArrowRight, BookOpen, CheckCircle, AlertTriangle,
  FileText, Trash2, Share2, Clock, MapPin, CreditCard, History
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
          width={200}
          height={70}
          className={`${className} object-contain transition-all duration-300 group-hover:scale-105`}
          priority
        />
      </div>
    </Link>
  )
}

// ========== COMPOSANT SECTION ==========
const Section = ({ title, icon: Icon, children, delay }: any) => {
  return (
    <motion.section
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay }}
      className="mb-12 scroll-mt-24"
      id={title.toLowerCase().replace(/\s+/g, '-')}
    >
      <div className="flex items-center gap-3 mb-4">
        <div className="w-10 h-10 rounded-lg bg-gradient-to-r from-green-500 to-emerald-600 flex items-center justify-center">
          <Icon size={20} className="text-white" />
        </div>
        <h2 className="text-2xl md:text-3xl font-bold text-green-900">{title}</h2>
      </div>
      <div className="pl-0 md:pl-14">
        {children}
      </div>
    </motion.section>
  )
}

// ========== COMPOSANT LISTE ==========
const ListItem = ({ children, icon: Icon }: any) => (
  <li className="flex items-start gap-3 mb-3">
    {Icon ? (
      <Icon size={18} className="text-green-500 mt-0.5 flex-shrink-0" />
    ) : (
      <CheckCircle size={18} className="text-green-500 mt-0.5 flex-shrink-0" />
    )}
    <span className="text-green-700">{children}</span>
  </li>
)

// ========== TABLE DES MATIÈRES ==========
const TableOfContents = ({ sections }: { sections: { title: string; id: string }[] }) => {
  return (
    <div className="bg-green-50 rounded-2xl p-6 border border-green-100 sticky top-24">
      <h3 className="text-lg font-bold text-green-900 mb-4 flex items-center gap-2">
        <BookOpen size={18} className="text-green-500" />
        Table des matières
      </h3>
      <ul className="space-y-2">
        {sections.map((section) => (
          <li key={section.id}>
            <a
              href={`#${section.id}`}
              className="text-sm text-green-700 hover:text-green-500 transition-colors flex items-center gap-2 group"
            >
              <ArrowRight size={12} className="group-hover:translate-x-1 transition-transform" />
              {section.title}
            </a>
          </li>
        ))}
      </ul>
    </div>
  )
}

export default function PrivacyPage() {
  const sections = [
    { title: "Collecte des données", id: "collecte-des-donnees" },
    { title: "Utilisation des données", id: "utilisation-des-donnees" },
    { title: "Cookies et technologies similaires", id: "cookies-et-technologies" },
    { title: "Partage des données", id: "partage-des-donnees" },
    { title: "Sécurité des données", id: "securite-des-donnees" },
    { title: "Vos droits", id: "vos-droits" },
    { title: "Conservation des données", id: "conservation-des-donnees" },
    { title: "Transferts internationaux", id: "transferts-internationaux" },
    { title: "Confidentialité des mineurs", id: "confidentialite-des-mineurs" },
    { title: "Modifications", id: "modifications" },
    { title: "Contact", id: "contact" }
  ]

  const lastUpdated = "15 Mars 2024"

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <header className="bg-white border-b border-green-100 sticky top-0 z-50 bg-white/90 backdrop-blur-xl">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex justify-between items-center">
            <Logo className="h-10 w-auto md:h-12" />
            <Link 
              href="/" 
              className="text-sm font-medium text-green-600 hover:text-green-700 transition-colors flex items-center gap-1 group"
            >
              <ChevronLeft size={16} className="group-hover:-translate-x-1 transition-transform" />
              Retour à l'accueil
            </Link>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-green-50 via-white to-green-50 py-20">
        <div className="absolute inset-0 bg-[linear-gradient(45deg,rgba(34,197,94,0.02)_1px,transparent_1px)] bg-[size:40px_40px]" />
        <div className="max-w-7xl mx-auto px-6 text-center relative">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-green-100 border border-green-200 mb-6">
              <Shield size={16} className="text-green-600" />
              <span className="text-sm font-medium text-green-700">Protection des données</span>
            </div>
            <h1 className="text-4xl md:text-6xl font-black text-green-900 mb-4">
              Politique de
              <br />
              <span className="bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent">
                confidentialité
              </span>
            </h1>
            <p className="text-green-600 text-lg max-w-2xl mx-auto">
              Dernière mise à jour : {lastUpdated}
            </p>
          </motion.div>
        </div>
      </section>

      {/* Content */}
      <div className="max-w-7xl mx-auto px-6 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Sidebar - Table des matières */}
          <div className="lg:col-span-1">
            <TableOfContents sections={sections} />
          </div>

          {/* Main Content */}
          <div className="lg:col-span-3">
            <div className="prose prose-green max-w-none">
              {/* Introduction */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="mb-8 p-4 bg-green-50 rounded-xl border border-green-100"
              >
                <p className="text-green-800 text-sm">
                  Chez WAKA, nous accordons une importance capitale à la protection de vos données personnelles. 
                  Cette politique de confidentialité explique comment nous collectons, utilisons et protégeons vos informations.
                </p>
              </motion.div>

              <Section title="Collecte des données" icon={Database} delay={0.1}>
                <p className="text-green-700 mb-4">
                  Nous collectons différentes catégories de données pour vous fournir nos services :
                </p>
                <ul className="space-y-2">
                  <ListItem icon={User}>
                    <strong>Données d'identification</strong> : nom, prénom, adresse email, numéro de téléphone
                  </ListItem>
                  <ListItem icon={MapPin}>
                    <strong>Données de localisation</strong> : adresse de livraison, position GPS
                  </ListItem>
                  <ListItem icon={CreditCard}>
                    <strong>Données de paiement</strong> : informations de carte bancaire (cryptées)
                  </ListItem>
                  <ListItem icon={Smartphone}>
                    <strong>Données techniques</strong> : adresse IP, type d'appareil, système d'exploitation
                  </ListItem>
                  <ListItem icon={History}>
                    <strong>Données d'utilisation</strong> : historique des commandes, préférences
                  </ListItem>
                </ul>
              </Section>

              <Section title="Utilisation des données" icon={Eye} delay={0.2}>
                <p className="text-green-700 mb-4">
                  Vos données sont utilisées pour :
                </p>
                <ul className="space-y-2">
                  <ListItem>
                    Traiter et livrer vos commandes
                  </ListItem>
                  <ListItem>
                    Gérer votre compte utilisateur
                  </ListItem>
                  <ListItem>
                    Communiquer avec vous concernant vos commandes
                  </ListItem>
                  <ListItem>
                    Améliorer nos services et personnaliser votre expérience
                  </ListItem>
                  <ListItem>
                    Prévenir la fraude et assurer la sécurité
                  </ListItem>
                  <ListItem>
                    Respecter nos obligations légales
                  </ListItem>
                </ul>
              </Section>

              <Section title="Cookies et technologies similaires" icon={Cookie} delay={0.3}>
                <p className="text-green-700 mb-4">
                  Nous utilisons des cookies pour améliorer votre expérience sur notre application :
                </p>
                <ul className="space-y-2">
                  <ListItem>
                    Cookies essentiels : nécessaires au fonctionnement de l'application
                  </ListItem>
                  <ListItem>
                    Cookies de performance : analysent l'utilisation de l'application
                  </ListItem>
                  <ListItem>
                    Cookies fonctionnels : mémorisent vos préférences
                  </ListItem>
                  <ListItem>
                    Vous pouvez gérer vos préférences de cookies dans les paramètres de votre navigateur
                  </ListItem>
                </ul>
              </Section>

              <Section title="Partage des données" icon={Share2} delay={0.4}>
                <p className="text-green-700 mb-4">
                  Nous pouvons partager vos données dans les cas suivants :
                </p>
                <ul className="space-y-2">
                  <ListItem>
                    <strong>Avec les commerçants partenaires</strong> : pour la préparation de vos commandes
                  </ListItem>
                  <ListItem>
                    <strong>Avec les livreurs</strong> : pour la livraison de vos commandes
                  </ListItem>
                  <ListItem>
                    <strong>Prestataires de services</strong> : pour le traitement des paiements
                  </ListItem>
                  <ListItem>
                    <strong>Obligations légales</strong> : si la loi nous y oblige
                  </ListItem>
                </ul>
                <div className="mt-4 p-3 bg-yellow-50 rounded-lg border border-yellow-100">
                  <p className="text-sm text-yellow-800 flex items-start gap-2">
                    <AlertTriangle size={16} className="flex-shrink-0 mt-0.5" />
                    Nous ne vendons jamais vos données personnelles à des tiers.
                  </p>
                </div>
              </Section>

              <Section title="Sécurité des données" icon={Lock} delay={0.5}>
                <p className="text-green-700 mb-4">
                  Nous mettons en œuvre des mesures de sécurité avancées pour protéger vos données :
                </p>
                <ul className="space-y-2">
                  <ListItem icon={Lock}>
                    Cryptage SSL pour toutes les transactions
                  </ListItem>
                  <ListItem>
                    Authentification sécurisée pour l'accès aux comptes
                  </ListItem>
                  <ListItem>
                    Surveillance continue des systèmes
                  </ListItem>
                  <ListItem>
                    Accès limité aux données personnelles
                  </ListItem>
                  <ListItem>
                    Formation du personnel à la sécurité des données
                  </ListItem>
                </ul>
              </Section>

              <Section title="Vos droits" icon={Shield} delay={0.6}>
                <p className="text-green-700 mb-4">
                  Conformément à la réglementation applicable, vous disposez des droits suivants :
                </p>
                <ul className="space-y-2">
                  <ListItem>
                    <strong>Droit d'accès</strong> : obtenir une copie de vos données
                  </ListItem>
                  <ListItem>
                    <strong>Droit de rectification</strong> : corriger vos données inexactes
                  </ListItem>
                  <ListItem>
                    <strong>Droit à l'effacement</strong> : demander la suppression de vos données
                  </ListItem>
                  <ListItem>
                    <strong>Droit d'opposition</strong> : vous opposer au traitement de vos données
                  </ListItem>
                  <ListItem>
                    <strong>Droit à la portabilité</strong> : recevoir vos données dans un format structuré
                  </ListItem>
                </ul>
                <div className="mt-4">
                  <p className="text-green-700">
                    Pour exercer vos droits, contactez-nous à l'adresse : <strong>privacy@waka.cm</strong>
                  </p>
                </div>
              </Section>

              <Section title="Conservation des données" icon={Clock} delay={0.7}>
                <p className="text-green-700 mb-4">
                  Nous conservons vos données personnelles aussi longtemps que nécessaire pour :
                </p>
                <ul className="space-y-2">
                  <ListItem>
                    Fournir nos services (pendant la durée de votre compte actif)
                  </ListItem>
                  <ListItem>
                    Respecter nos obligations légales (jusqu'à 10 ans pour les données fiscales)
                  </ListItem>
                  <ListItem>
                    Gérer les litiges potentiels
                  </ListItem>
                </ul>
                <p className="text-green-700 mt-4">
                  Après la suppression de votre compte, vos données sont anonymisées ou supprimées, sauf obligation légale de conservation.
                </p>
              </Section>

              <Section title="Transferts internationaux" icon={Globe} delay={0.8}>
                <p className="text-green-700">
                  Vos données peuvent être transférées et traitées dans des pays autres que le Cameroun. 
                  Nous garantissons que ces transferts sont effectués conformément aux lois applicables en matière de protection des données 
                  et avec des garanties appropriées.
                </p>
              </Section>

              <Section title="Confidentialité des mineurs" icon={User} delay={0.9}>
                <p className="text-green-700">
                  Nos services ne s'adressent pas aux personnes de moins de 18 ans. Nous ne collectons pas 
                  sciemment de données personnelles concernant des mineurs. Si vous êtes parent ou tuteur et 
                  pensez que votre enfant nous a fourni des données, veuillez nous contacter.
                </p>
              </Section>

              <Section title="Modifications" icon={FileText} delay={1.0}>
                <p className="text-green-700">
                  Nous pouvons mettre à jour cette politique de confidentialité périodiquement. 
                  Les modifications entrent en vigueur dès leur publication sur l'application. 
                  Nous vous informerons de tout changement important par email ou via une notification dans l'application.
                </p>
              </Section>

              <Section title="Contact" icon={Mail} delay={1.1}>
                <p className="text-green-700 mb-4">
                  Pour toute question concernant cette politique de confidentialité ou pour exercer vos droits :
                </p>
                <div className="bg-green-50 rounded-xl p-4 space-y-3">
                  <div className="flex items-center gap-3">
                    <Mail size={16} className="text-green-600" />
                    <span className="text-green-800">privacy@waka.cm</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <Phone size={16} className="text-green-600" />
                    <span className="text-green-800">+237 621 004 286</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <MapPin size={16} className="text-green-600" />
                    <span className="text-green-800">Bonapriso, Douala - Cameroun</span>
                  </div>
                </div>
                <p className="text-green-700 text-sm mt-4">
                  Délégué à la protection des données : <strong>M. Jean Dupont</strong> - dpo@waka.cm
                </p>
              </Section>
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-white border-t border-green-100 py-12 mt-12">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex flex-col md:flex-row justify-between items-center gap-6">
            <div className="text-center md:text-left">
              <Logo className="h-8 w-auto mb-2" />
              <p className="text-xs text-green-500">© 2024 WAKA Delivery Service. Tous droits réservés.</p>
            </div>
            <div className="flex gap-6 flex-wrap justify-center">
              <Link href="/terms" className="text-xs text-green-500 hover:text-green-600 transition-colors">
                Conditions d'utilisation
              </Link>
              <Link href="/privacy" className="text-xs text-green-600 hover:text-green-700 transition-colors font-medium">
                Politique de confidentialité
              </Link>
              <Link href="/contact" className="text-xs text-green-500 hover:text-green-600 transition-colors">
                Contact
              </Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}