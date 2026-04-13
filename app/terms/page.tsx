"use client"

import React from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { motion } from 'framer-motion'
import { 
  ChevronLeft, FileText, Shield, CreditCard, Truck, 
  AlertCircle, Users, Clock, Phone, Mail, CheckCircle,
  ArrowRight, BookOpen, Scale, Lock, Smartphone, DollarSign
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

export default function TermsPage() {
  const sections = [
    { title: "Acceptation des conditions", id: "acceptation-des-conditions" },
    { title: "Inscription et compte", id: "inscription-et-compte" },
    { title: "Commandes et livraisons", id: "commandes-et-livraisons" },
    { title: "Paiement et tarifs", id: "paiement-et-tarifs" },
    { title: "Annulations et remboursements", id: "annulations-et-remboursements" },
    { title: "Responsabilités", id: "responsabilites" },
    { title: "Propriété intellectuelle", id: "propriete-intellectuelle" },
    { title: "Modifications des conditions", id: "modifications-des-conditions" },
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
              <FileText size={16} className="text-green-600" />
              <span className="text-sm font-medium text-green-700">Document légal</span>
            </div>
            <h1 className="text-4xl md:text-6xl font-black text-green-900 mb-4">
              Conditions
              <br />
              <span className="bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent">
                d'utilisation
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
                  En utilisant l'application WAKA, vous acceptez d'être lié par les présentes conditions d'utilisation. 
                  Veuillez les lire attentivement avant d'utiliser nos services.
                </p>
              </motion.div>

              <Section title="Acceptation des conditions" icon={FileText} delay={0.1}>
                <p className="text-green-700 mb-4">
                  En accédant ou en utilisant l'application WAKA, vous acceptez d'être lié par ces conditions d'utilisation. 
                  Si vous n'acceptez pas ces conditions, veuillez ne pas utiliser nos services.
                </p>
                <ul className="space-y-2">
                  <ListItem>
                    Les présentes conditions s'appliquent à tous les utilisateurs de WAKA
                  </ListItem>
                  <ListItem>
                    WAKA se réserve le droit de modifier ces conditions à tout moment
                  </ListItem>
                  <ListItem>
                    L'utilisation continue de nos services après modification constitue une acceptation des nouvelles conditions
                  </ListItem>
                </ul>
              </Section>

              <Section title="Inscription et compte" icon={Users} delay={0.2}>
                <p className="text-green-700 mb-4">
                  Pour utiliser nos services, vous devez créer un compte utilisateur. Vous êtes responsable de la confidentialité de vos identifiants.
                </p>
                <ul className="space-y-2">
                  <ListItem icon={Shield}>
                    Vous devez fournir des informations exactes et complètes lors de l'inscription
                  </ListItem>
                  <ListItem icon={Lock}>
                    Vous êtes responsable de toutes les activités effectuées sur votre compte
                  </ListItem>
                  <ListItem>
                    Vous devez nous informer immédiatement de toute utilisation non autorisée de votre compte
                  </ListItem>
                  <ListItem>
                    WAKA se réserve le droit de suspendre ou résilier tout compte en cas de violation des présentes conditions
                  </ListItem>
                </ul>
              </Section>

              <Section title="Commandes et livraisons" icon={Truck} delay={0.3}>
                <p className="text-green-700 mb-4">
                  WAKA met en relation les clients avec des commerçants partenaires et assure la livraison des commandes.
                </p>
                <ul className="space-y-2">
                  <ListItem>
                    Les délais de livraison indiqués sont approximatifs et peuvent varier
                  </ListItem>
                  <ListItem>
                    WAKA s'efforce de respecter les délais annoncés mais ne peut garantir une heure exacte
                  </ListItem>
                  <ListItem>
                    Vous devez être présent à l'adresse de livraison au moment de la réception
                  </ListItem>
                  <ListItem>
                    En cas d'absence, des frais supplémentaires peuvent s'appliquer
                  </ListItem>
                  <ListItem>
                    Les produits sont sous la responsabilité du livreur jusqu'à la livraison
                  </ListItem>
                </ul>
              </Section>

              <Section title="Paiement et tarifs" icon={CreditCard} delay={0.4}>
                <p className="text-green-700 mb-4">
                  Les prix sont affichés en FCFA et incluent toutes les taxes applicables. Les frais de livraison sont calculés en fonction de la distance et du poids.
                </p>
                <ul className="space-y-2">
                  <ListItem icon={DollarSign}>
                    Le paiement peut être effectué par carte bancaire, Mobile Money ou espèces à la livraison
                  </ListItem>
                  <ListItem icon={Lock}>
                    Tous les paiements en ligne sont sécurisés via un système de cryptage SSL
                  </ListItem>
                  <ListItem>
                    WAKA se réserve le droit de modifier ses tarifs à tout moment
                  </ListItem>
                  <ListItem>
                    En cas de litige sur le paiement, le client s'engage à fournir toutes les preuves nécessaires
                  </ListItem>
                </ul>
              </Section>

              <Section title="Annulations et remboursements" icon={AlertCircle} delay={0.5}>
                <p className="text-green-700 mb-4">
                  Les commandes peuvent être annulées dans les 5 minutes suivant leur validation. Passé ce délai, l'annulation n'est pas garantie.
                </p>
                <ul className="space-y-2">
                  <ListItem>
                    Les remboursements sont traités sous 5 à 10 jours ouvrés
                  </ListItem>
                  <ListItem>
                    En cas de problème avec une commande, contactez notre service client dans les 24h
                  </ListItem>
                  <ListItem>
                    Les remboursements sont effectués selon le mode de paiement initial
                  </ListItem>
                  <ListItem>
                    WAKA se réserve le droit de refuser un remboursement en cas d'abus
                  </ListItem>
                </ul>
              </Section>

              <Section title="Responsabilités" icon={Scale} delay={0.6}>
                <p className="text-green-700 mb-4">
                  WAKA agit comme intermédiaire entre les clients et les commerçants partenaires.
                </p>
                <ul className="space-y-2">
                  <ListItem>
                    WAKA n'est pas responsable de la qualité des produits fournis par les commerçants
                  </ListItem>
                  <ListItem>
                    En cas de litige avec un commerçant, WAKA s'engage à faciliter la résolution
                  </ListItem>
                  <ListItem>
                    WAKA ne peut être tenu responsable des retards causés par des circonstances indépendantes de sa volonté
                  </ListItem>
                  <ListItem>
                    L'utilisateur est responsable de l'utilisation qu'il fait de l'application
                  </ListItem>
                </ul>
              </Section>

              <Section title="Propriété intellectuelle" icon={Shield} delay={0.7}>
                <p className="text-green-700 mb-4">
                  Tous les éléments de l'application WAKA sont protégés par les lois sur la propriété intellectuelle.
                </p>
                <ul className="space-y-2">
                  <ListItem>
                    Le logo WAKA, le nom et tous les éléments graphiques sont des marques déposées
                  </ListItem>
                  <ListItem>
                    Toute reproduction, modification ou utilisation non autorisée est interdite
                  </ListItem>
                  <ListItem>
                    Les contenus soumis par les utilisateurs restent leur propriété
                  </ListItem>
                </ul>
              </Section>

              <Section title="Modifications des conditions" icon={Clock} delay={0.8}>
                <p className="text-green-700">
                  WAKA se réserve le droit de modifier ces conditions d'utilisation à tout moment. 
                  Les modifications entrent en vigueur dès leur publication sur l'application. 
                  Nous vous encourageons à consulter régulièrement cette page pour rester informé des mises à jour.
                </p>
              </Section>

              <Section title="Contact" icon={Phone} delay={0.9}>
                <p className="text-green-700 mb-4">
                  Pour toute question concernant ces conditions d'utilisation, veuillez nous contacter :
                </p>
                <div className="bg-green-50 rounded-xl p-4">
                  <div className="flex items-center gap-3 mb-2">
                    <Phone size={16} className="text-green-600" />
                    <span className="text-green-800">+237 621 004 286</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <Mail size={16} className="text-green-600" />
                    <span className="text-green-800">legal@waka.cm</span>
                  </div>
                </div>
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
              <Link href="/terms" className="text-xs text-green-600 hover:text-green-700 transition-colors font-medium">
                Conditions d'utilisation
              </Link>
              <Link href="/privacy" className="text-xs text-green-500 hover:text-green-600 transition-colors">
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