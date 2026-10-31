import React, { useState } from 'react';
import {
  ArrowUpRight,
  ShieldCheck,
  Globe2,
  Compass,
  BarChart3,
  TrendingUp,
  Layers,
  ChevronRight,
  ChevronDown,
  CheckCircle2,
  Sparkles,
  Building2,
  Phone,
  Mail,
  Clock,
  MapPin,
  Award,
  SlidersHorizontal,
  Check,
  AlertCircle,
  Menu,
  X,
  Target,
  Users2,
  FileCheck2,
  Workflow
} from 'lucide-react';
import { MTI_DIMENSIONS, FAQ_DATA, TEST_QUESTIONS } from './data/content';

export default function App() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [openFaqIndex, setOpenFaqIndex] = useState(0);
  const [activeTab, setActiveTab] = useState('all');

  // Interactive Simulator state
  const [simStep, setSimStep] = useState(0);
  const [answers, setAnswers] = useState({});
  const [simComplete, setSimComplete] = useState(false);

  // Contact form state
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [contactForm, setContactForm] = useState({
    name: '',
    email: '',
    company: '',
    phone: '',
    interest: 'mti',
    message: ''
  });

  const handleSelectOption = (questionId, score) => {
    const updated = { ...answers, [questionId]: score };
    setAnswers(updated);
    if (simStep < TEST_QUESTIONS.length - 1) {
      setSimStep(simStep + 1);
    } else {
      setSimComplete(true);
    }
  };

  const calculateScore = () => {
    const values = Object.values(answers);
    if (values.length === 0) return 0;
    const sum = values.reduce((acc, curr) => acc + curr, 0);
    return Math.round(sum / values.length);
  };

  const resetSimulator = () => {
    setAnswers({});
    setSimStep(0);
    setSimComplete(false);
  };

  const handleContactSubmit = (e) => {
    e.preventDefault();
    setFormSubmitted(true);
  };

  const filteredFaqs = activeTab === 'all'
    ? FAQ_DATA
    : FAQ_DATA.filter(faq => {
        if (activeTab === 'mti') return faq.category.includes('MTI') || faq.category.includes('Général') || faq.category.includes('Certification');
        if (activeTab === 'compare') return faq.category.includes('Comparatif');
        if (activeTab === 'pratique') return faq.category.includes('Modalités') || faq.category.includes('Tarification') || faq.category.includes('Légal');
        return true;
      });

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 selection:bg-amber-500 selection:text-slate-950 font-sans">

      {/* BACKGROUND AMBIENT GRADIENTS */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
        <div className="absolute -top-40 -left-40 w-96 h-96 bg-amber-500/10 rounded-full blur-[120px]" />
        <div className="absolute top-1/3 -right-40 w-[500px] h-[500px] bg-sky-600/10 rounded-full blur-[150px]" />
        <div className="absolute -bottom-40 left-1/3 w-96 h-96 bg-emerald-500/10 rounded-full blur-[130px]" />
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#1e293b0a_1px,transparent_1px),linear-gradient(to_bottom,#1e293b0a_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)]" />
      </div>

      {/* TOP HEADER */}
      <header className="sticky top-0 z-50 backdrop-blur-xl bg-slate-950/80 border-b border-slate-800/80 transition-all">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
          <a href="#" className="flex items-center gap-3 group">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-amber-400 via-amber-500 to-amber-600 flex items-center justify-center text-slate-950 font-black shadow-lg shadow-amber-500/20 group-hover:scale-105 transition-transform">
              <span className="text-xl tracking-tighter">SN</span>
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <span className="text-xl font-black tracking-tight text-white group-hover:text-amber-400 transition-colors">StratéNova</span>
                <span className="text-[10px] font-bold uppercase tracking-widest px-1.5 py-0.5 rounded bg-amber-500/10 text-amber-400 border border-amber-500/20">DIC™ & MTI™</span>
              </div>
              <p className="text-[11px] text-slate-400 tracking-wide hidden sm:block">Expansion Stratégique &middot; Afrique de l'Ouest</p>
            </div>
          </a>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-8 text-sm font-medium text-slate-300">
            <a href="#accueil" className="hover:text-amber-400 transition-colors">Accueil</a>
            <a href="#mti" className="hover:text-amber-400 transition-colors flex items-center gap-1">
              MTI™ <span className="w-1.5 h-1.5 rounded-full bg-amber-400"></span>
            </a>
            <a href="#offres" className="hover:text-amber-400 transition-colors">Nos Offres</a>
            <a href="#simulateur" className="hover:text-amber-400 transition-colors">Auto-Évaluation</a>
            <a href="#faq" className="hover:text-amber-400 transition-colors">FAQ</a>
            <a href="#contact" className="hover:text-amber-400 transition-colors">Contact</a>
          </nav>

          {/* Action Button */}
          <div className="hidden lg:flex items-center gap-4">
            <a
              href="#contact"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-slate-950 font-bold text-sm shadow-lg shadow-amber-500/20 hover:shadow-amber-500/30 transition-all transform hover:-translate-y-0.5"
            >
              Prendre Rendez-vous
              <ArrowUpRight className="w-4 h-4" />
            </a>
          </div>

          {/* Mobile hamburger */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 rounded-lg bg-slate-900 border border-slate-800 text-slate-300 hover:text-white"
            aria-label="Toggle Menu"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile menu dropdown */}
        {mobileMenuOpen && (
          <div className="md:hidden bg-slate-900/95 border-b border-slate-800 px-4 py-6 space-y-4 backdrop-blur-2xl">
            <a href="#accueil" onClick={() => setMobileMenuOpen(false)} className="block py-2 text-slate-200 hover:text-amber-400 font-medium">Accueil</a>
            <a href="#mti" onClick={() => setMobileMenuOpen(false)} className="block py-2 text-slate-200 hover:text-amber-400 font-medium">La Matrice MTI™</a>
            <a href="#offres" onClick={() => setMobileMenuOpen(false)} className="block py-2 text-slate-200 hover:text-amber-400 font-medium">Nos Offres (DIC™ & MTI™)</a>
            <a href="#simulateur" onClick={() => setMobileMenuOpen(false)} className="block py-2 text-slate-200 hover:text-amber-400 font-medium">Auto-Évaluation MTI™</a>
            <a href="#faq" onClick={() => setMobileMenuOpen(false)} className="block py-2 text-slate-200 hover:text-amber-400 font-medium">Foire Aux Questions</a>
            <a href="#contact" onClick={() => setMobileMenuOpen(false)} className="block py-2 text-slate-200 hover:text-amber-400 font-medium">Contact & Audit</a>
            <a
              href="#contact"
              onClick={() => setMobileMenuOpen(false)}
              className="w-full text-center block mt-4 px-4 py-3 rounded-xl bg-amber-500 text-slate-950 font-bold"
            >
              Demander un rendez-vous
            </a>
          </div>
        )}
      </header>

      {/* HERO SECTION */}
      <section id="accueil" className="relative pt-16 pb-24 lg:pt-28 lg:pb-36 overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">

          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-slate-900/80 border border-slate-700/80 text-xs font-semibold text-amber-400 mb-8 backdrop-blur shadow-sm">
            <Sparkles className="w-4 h-4 text-amber-400 animate-pulse" />
            <span>Cabinet Conseil & Notation Stratégique Internationale</span>
            <span className="w-1 h-1 rounded-full bg-slate-500"></span>
            <span className="text-slate-300">Afrique de l'Ouest & Zone OHADA</span>
          </div>

          <div className="grid lg:grid-cols-12 gap-12 lg:gap-8 items-center">

            <div className="lg:col-span-7 space-y-6">
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-white leading-[1.12]">
                Bâtissez une présence <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 via-amber-300 to-amber-500">pérenne et maîtrisée</span> en Afrique de l'Ouest.
              </h1>

              <p className="text-lg sm:text-xl text-slate-300 leading-relaxed font-light">
                Nous fournissons aux <strong className="font-semibold text-white">PME & ETI</strong> un <span className="text-amber-400 font-semibold">Dispositif d'Implantation Commerciale (DIC™)</span> et accompagnons les opérations de croissance externe et d'intégration d'actifs via la <span className="text-sky-400 font-semibold">Matrice de Transition Internationale (MTI™)</span>.
              </p>

              {/* Bullet Points */}
              <div className="pt-2 space-y-3">
                <div className="flex items-center gap-3 text-slate-200">
                  <div className="w-6 h-6 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center shrink-0 border border-emerald-500/30">
                    <Check className="w-3.5 h-3.5" />
                  </div>
                  <span>Bénéficier concrètement des leviers de croissance en Afrique subsaharienne</span>
                </div>
                <div className="flex items-center gap-3 text-slate-200">
                  <div className="w-6 h-6 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center shrink-0 border border-emerald-500/30">
                    <Check className="w-3.5 h-3.5" />
                  </div>
                  <span>Décider du timing optimal pour faire évoluer votre modèle international</span>
                </div>
                <div className="flex items-center gap-3 text-slate-200">
                  <div className="w-6 h-6 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center shrink-0 border border-emerald-500/30">
                    <Check className="w-3.5 h-3.5" />
                  </div>
                  <span>Prendre une avance décisive sur vos concurrents et rassurer vos investisseurs</span>
                </div>
              </div>

              {/* CTAs */}
              <div className="pt-4 flex flex-col sm:flex-row gap-4 items-stretch sm:items-center">
                <a
                  href="#contact"
                  className="px-7 py-4 rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-slate-950 font-bold text-center shadow-xl shadow-amber-500/20 transition-all transform hover:-translate-y-0.5 flex items-center justify-center gap-3"
                >
                  Demander un rendez-vous
                  <ArrowUpRight className="w-5 h-5" />
                </a>

                <a
                  href="#mti"
                  className="px-6 py-4 rounded-xl bg-slate-900/90 hover:bg-slate-800 border border-slate-700/80 text-white font-semibold text-center transition-all flex items-center justify-center gap-2 hover:border-slate-500"
                >
                  <Compass className="w-5 h-5 text-sky-400" />
                  Découvrir la méthode MTI™
                </a>
              </div>

              {/* Stats badges */}
              <div className="pt-6 grid grid-cols-3 gap-4 border-t border-slate-800/80">
                <div>
                  <div className="text-2xl lg:text-3xl font-extrabold text-amber-400">11</div>
                  <div className="text-xs text-slate-400 uppercase tracking-wider font-medium">Piliers d'évaluation</div>
                </div>
                <div>
                  <div className="text-2xl lg:text-3xl font-extrabold text-sky-400">55</div>
                  <div className="text-xs text-slate-400 uppercase tracking-wider font-medium">Sous-dimensions MTI™</div>
                </div>
                <div>
                  <div className="text-2xl lg:text-3xl font-extrabold text-emerald-400">12 mois</div>
                  <div className="text-xs text-slate-400 uppercase tracking-wider font-medium">Validité du score certifié</div>
                </div>
              </div>

            </div>

            {/* Interactive Visual Right Card */}
            <div className="lg:col-span-5 relative">
              <div className="relative mx-auto max-w-md lg:max-w-none rounded-2xl bg-gradient-to-b from-slate-900 via-slate-900/90 to-slate-950 p-6 sm:p-8 border border-slate-700/70 shadow-2xl backdrop-blur-xl">

                {/* Header card */}
                <div className="flex items-center justify-between pb-6 border-b border-slate-800">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-xl bg-amber-500/10 border border-amber-500/30 flex items-center justify-center text-amber-400 font-bold">
                      <Target className="w-6 h-6" />
                    </div>
                    <div>
                      <h3 className="font-bold text-white">Diagnostic Prédictif MTI™</h3>
                      <p className="text-xs text-slate-400">Indice propriétaire de maturité globale</p>
                    </div>
                  </div>
                  <span className="px-2.5 py-1 rounded-full text-xs font-semibold bg-emerald-500/10 border border-emerald-500/20 text-emerald-400">
                    Certifié
                  </span>
                </div>

                {/* Score visualization */}
                <div className="py-6 space-y-5">
                  <div>
                    <div className="flex justify-between items-center text-xs font-semibold uppercase text-slate-400 mb-2">
                      <span>Niveau de Résilience Domicile vs International</span>
                      <span className="text-amber-400">88 / 100</span>
                    </div>
                    <div className="w-full h-2.5 bg-slate-800 rounded-full overflow-hidden">
                      <div className="h-full bg-gradient-to-r from-amber-500 to-amber-300 rounded-full w-[88%]" />
                    </div>
                  </div>

                  <div>
                    <div className="flex justify-between items-center text-xs font-semibold uppercase text-slate-400 mb-2">
                      <span>Ancrage Institutionnel & Écosystème Local</span>
                      <span className="text-sky-400">92 / 100</span>
                    </div>
                    <div className="w-full h-2.5 bg-slate-800 rounded-full overflow-hidden">
                      <div className="h-full bg-gradient-to-r from-sky-500 to-sky-300 rounded-full w-[92%]" />
                    </div>
                  </div>

                  <div>
                    <div className="flex justify-between items-center text-xs font-semibold uppercase text-slate-400 mb-2">
                      <span>Sécurisation Réglementaire (Droit OHADA)</span>
                      <span className="text-emerald-400">84 / 100</span>
                    </div>
                    <div className="w-full h-2.5 bg-slate-800 rounded-full overflow-hidden">
                      <div className="h-full bg-gradient-to-r from-emerald-500 to-emerald-300 rounded-full w-[84%]" />
                    </div>
                  </div>
                </div>

                {/* Focus badge */}
                <div className="p-4 rounded-xl bg-slate-950/60 border border-slate-800 flex items-start gap-3">
                  <ShieldCheck className="w-5 h-5 text-amber-400 shrink-0 mt-0.5" />
                  <p className="text-xs text-slate-300 leading-relaxed">
                    « Prédire avec lucidité plutôt que subir les chocs. La MTI™ analyse 55 sous-dimensions pour sécuriser vos investissements en Afrique de l'Ouest. »
                  </p>
                </div>

                <div className="mt-5 text-center">
                  <a href="#simulateur" className="text-xs text-amber-400 hover:text-amber-300 font-semibold inline-flex items-center gap-1">
                    Tester votre score préliminaire en ligne
                    <ChevronRight className="w-4 h-4" />
                  </a>
                </div>

              </div>
            </div>

          </div>

        </div>
      </section>

      {/* TWO PILLARS HIGHLIGHT */}
      <section className="py-16 bg-slate-900/40 border-y border-slate-800/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-8">

            {/* DIC Card */}
            <div className="p-8 rounded-2xl bg-gradient-to-br from-slate-900/90 to-slate-950 border border-slate-800 hover:border-amber-500/40 transition-all group">
              <div className="w-14 h-14 rounded-xl bg-amber-500/10 border border-amber-500/20 text-amber-400 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                <Globe2 className="w-7 h-7" />
              </div>
              <span className="text-xs font-mono uppercase text-amber-400 tracking-wider font-semibold">Dispositif Propriétaire</span>
              <h3 className="text-2xl font-bold text-white mt-1 mb-3">DIC™ &middot; Dispositif d'Implantation Commerciale</h3>
              <p className="text-slate-300 text-sm leading-relaxed mb-6">
                Conçu pour les entreprises internationales qui souhaitent tester, pénétrer et vendre leurs produits ou services en Afrique de l'Ouest avec un déploiement souple et sans surinvestissement.
              </p>
              <ul className="space-y-2 text-sm text-slate-300 mb-6">
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-amber-400 shrink-0" />
                  <span>Cartographie exhaustive du marché ciblé</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-amber-400 shrink-0" />
                  <span>Identification & qualification des circuits d'achat</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-amber-400 shrink-0" />
                  <span>Activation des réseaux structurants et décideurs locaux</span>
                </li>
              </ul>
              <a href="#offres" className="inline-flex items-center gap-2 text-sm font-semibold text-amber-400 hover:text-amber-300">
                Explorer l'offre DIC™ <ArrowUpRight className="w-4 h-4" />
              </a>
            </div>

            {/* MTI Card */}
            <div className="p-8 rounded-2xl bg-gradient-to-br from-slate-900/90 to-slate-950 border border-slate-800 hover:border-sky-500/40 transition-all group">
              <div className="w-14 h-14 rounded-xl bg-sky-500/10 border border-sky-500/20 text-sky-400 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                <SlidersHorizontal className="w-7 h-7" />
              </div>
              <span className="text-xs font-mono uppercase text-sky-400 tracking-wider font-semibold">Méthodologie Certifiée</span>
              <h3 className="text-2xl font-bold text-white mt-1 mb-3">MTI™ &middot; Matrice de Transition Internationale</h3>
              <p className="text-slate-300 text-sm leading-relaxed mb-6">
                L'outil de timing stratégique et d'évaluation prédictive pour passer avec succès d'un simple flux d'exportation vers une implantation capitalistique pérenne (M&A, co-entreprises, intégration d'actifs industriels).
              </p>
              <ul className="space-y-2 text-sm text-slate-300 mb-6">
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-sky-400 shrink-0" />
                  <span>11 piliers stratégiques & 55 sous-dimensions d'audit</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-sky-400 shrink-0" />
                  <span>Attribution d'un score certifié MTI™ valable 12 mois</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-sky-400 shrink-0" />
                  <span>Coaching stratégique exécutif sur 4 mois</span>
                </li>
              </ul>
              <a href="#mti" className="inline-flex items-center gap-2 text-sm font-semibold text-sky-400 hover:text-sky-300">
                Comprendre la Matrice MTI™ <ArrowUpRight className="w-4 h-4" />
              </a>
            </div>

          </div>
        </div>
      </section>

      {/* DETAILED MTI SECTION */}
      <section id="mti" className="py-24 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

          <div className="max-w-3xl mx-auto text-center space-y-4 mb-16">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-sky-500/10 border border-sky-500/20 text-xs font-semibold text-sky-400">
              <Compass className="w-3.5 h-3.5" />
              Boussole Stratégique Internationale
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-white">
              Votre entreprise est-elle prête à affronter l’avenir ?
            </h2>
            <p className="text-slate-300 text-base sm:text-lg leading-relaxed">
              Dans un monde de volatilité des marchés, de tensions géopolitiques et de mutations réglementaires, disposer d’un diagnostic prédictif rigoureux devient un avantage concurrentiel décisif.
            </p>
          </div>

          {/* 11 Dimensions Interactive Grid */}
          <div className="mb-16">
            <div className="flex items-center justify-between mb-8">
              <div>
                <h3 className="text-xl font-bold text-white">Les 11 Dimensions de la MTI™</h3>
                <p className="text-sm text-slate-400">Chaque dimension est décomposée en 5 sous-dimensions précises pour un total de 55 indicateurs.</p>
              </div>
              <div className="hidden sm:block text-xs font-mono text-amber-400 bg-amber-400/10 px-3 py-1.5 rounded-lg border border-amber-400/20">
                11 piliers &times; 5 indicateurs = 55 métriques
              </div>
            </div>

            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {MTI_DIMENSIONS.map((dim) => (
                <div
                  key={dim.id}
                  className="p-6 rounded-xl bg-slate-900/60 border border-slate-800 hover:border-slate-700 hover:bg-slate-900 transition-all group"
                >
                  <div className="flex items-center justify-between mb-4">
                    <span className="w-8 h-8 rounded-lg bg-slate-800 text-amber-400 font-bold text-xs flex items-center justify-center border border-slate-700 group-hover:border-amber-400/50">
                      #{dim.id.toString().padStart(2, '0')}
                    </span>
                    <span className="text-[11px] font-medium tracking-wide uppercase px-2.5 py-1 rounded-full bg-slate-800/80 text-slate-300 border border-slate-700/60">
                      {dim.weight}
                    </span>
                  </div>
                  <h4 className="text-base font-bold text-white mb-2 group-hover:text-amber-400 transition-colors">
                    {dim.title}
                  </h4>
                  <p className="text-xs text-slate-400 leading-relaxed">
                    {dim.description}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Value Props & Quotes */}
          <div className="grid lg:grid-cols-3 gap-8">
            <div className="p-8 rounded-2xl bg-gradient-to-b from-slate-900 to-slate-950 border border-slate-800">
              <div className="w-10 h-10 rounded-lg bg-amber-500/10 text-amber-400 flex items-center justify-center mb-4">
                <BarChart3 className="w-5 h-5" />
              </div>
              <h4 className="text-lg font-bold text-white mb-2">Méthode Rigoureuse</h4>
              <p className="text-sm text-slate-400 leading-relaxed">
                Fondée sur des critères objectifs, des indicateurs internes et externes (financiers, opérationnels, sectoriels) et une grille de scoring propriétaire éprouvée.
              </p>
            </div>

            <div className="p-8 rounded-2xl bg-gradient-to-b from-slate-900 to-slate-950 border border-slate-800">
              <div className="w-10 h-10 rounded-lg bg-sky-500/10 text-sky-400 flex items-center justify-center mb-4">
                <Award className="w-5 h-5" />
              </div>
              <h4 className="text-lg font-bold text-white mb-2">Reconnaissance & Crédibilité</h4>
              <p className="text-sm text-slate-400 leading-relaxed">
                Être évalué MTI™, c’est afficher un haut niveau de rigueur stratégique et rassurer les partenaires clés : banques, investisseurs de fonds, clients et fournisseurs.
              </p>
            </div>

            <div className="p-8 rounded-2xl bg-gradient-to-b from-slate-900 to-slate-950 border border-slate-800">
              <div className="w-10 h-10 rounded-lg bg-emerald-500/10 text-emerald-400 flex items-center justify-center mb-4">
                <Workflow className="w-5 h-5" />
              </div>
              <h4 className="text-lg font-bold text-white mb-2">Timing Stratégique</h4>
              <p className="text-sm text-slate-400 leading-relaxed">
                Anticiper les ruptures du marché domicile, arbitrer entre export et implantation capitalistique, et exécuter votre pivot au moment optimal de rentabilité.
              </p>
            </div>
          </div>

          {/* President quote banner */}
          <div className="mt-16 p-8 lg:p-12 rounded-3xl bg-gradient-to-r from-slate-900 via-slate-900/95 to-slate-950 border border-amber-500/30 relative overflow-hidden">
            <div className="absolute right-0 top-0 translate-x-12 -translate-y-12 w-64 h-64 bg-amber-500/5 rounded-full blur-3xl pointer-events-none" />

            <div className="relative z-10 flex flex-col lg:flex-row items-center gap-8">
              <div className="w-24 h-24 sm:w-28 sm:h-28 rounded-2xl bg-gradient-to-br from-amber-400 to-amber-600 flex items-center justify-center text-slate-950 font-black text-3xl shadow-xl shrink-0">
                AD
              </div>

              <div className="space-y-4 text-center lg:text-left">
                <blockquote className="text-lg sm:text-xl text-slate-200 font-medium italic leading-relaxed">
                  « StratéNova propose une approche différenciante du conseil stratégique à travers la Matrice de Transition Internationale (MTI™), véritable levier de compétitivité des entreprises dans leur stratégie d'internationalisation. »
                </blockquote>
                <div>
                  <div className="text-base font-bold text-white">Auguste Dago</div>
                  <div className="text-xs text-amber-400 uppercase tracking-wider font-semibold">Président de StratéNova &middot; Prédire. Décider. Croître.</div>
                </div>
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* OFFERS SECTION */}
      <section id="offres" className="py-24 bg-slate-900/40 border-y border-slate-800/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

          <div className="max-w-3xl mx-auto text-center space-y-4 mb-16">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/20 text-xs font-semibold text-amber-400">
              <Layers className="w-3.5 h-3.5" />
              Catalogue de Solutions
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-white">
              Des offres conçues pour chaque niveau d’internationalisation
            </h2>
            <p className="text-slate-300 text-base sm:text-lg">
              Que vous souhaitiez exporter vers l'Afrique de l'Ouest ou vous y implanter durablement, découvrez des formules modulables et actionnables.
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-8 items-stretch">

            {/* Offer 1 */}
            <div className="rounded-3xl bg-slate-900/90 border border-slate-800 p-8 lg:p-10 flex flex-col justify-between hover:border-slate-700 transition-all">
              <div>
                <div className="flex items-center justify-between mb-4">
                  <span className="px-3 py-1 rounded-full bg-slate-800 text-amber-400 text-xs font-bold uppercase tracking-wider border border-slate-700">
                    Niveau 1 &middot; Déploiement Commercial
                  </span>
                  <Globe2 className="w-6 h-6 text-amber-400" />
                </div>

                <h3 className="text-2xl font-bold text-white mb-2">Dispositif d'Implantation Commerciale (DIC™)</h3>
                <p className="text-sm text-slate-400 mb-6">Assurer une présence locale forte sans surinvestir dès le départ.</p>

                <div className="space-y-6 pt-4 border-t border-slate-800">
                  <div>
                    <h4 className="text-xs font-bold text-slate-300 uppercase tracking-wider mb-2">Pour qui ?</h4>
                    <p className="text-sm text-slate-300">
                      Les entreprises étrangères qui souhaitent vendre leurs produits ou services en Afrique de l'Ouest avec rapidité et rentabilité.
                    </p>
                  </div>

                  <div>
                    <h4 className="text-xs font-bold text-slate-300 uppercase tracking-wider mb-2">Objectif principal</h4>
                    <p className="text-sm text-slate-300">
                      Structurer vos flux d'affaires locaux en minimisant l'exposition au risque et en validant la traction commerciale.
                    </p>
                  </div>

                  <div>
                    <h4 className="text-xs font-bold text-slate-300 uppercase tracking-wider mb-3">Livrables & Contenu</h4>
                    <ul className="space-y-2.5 text-sm text-slate-300">
                      <li className="flex items-start gap-2.5">
                        <CheckCircle2 className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                        <span>Cartographie ciblée du marché et benchmarking concurrentiel</span>
                      </li>
                      <li className="flex items-start gap-2.5">
                        <CheckCircle2 className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                        <span>Identification des acteurs prioritaires et donneurs d'ordres</span>
                      </li>
                      <li className="flex items-start gap-2.5">
                        <CheckCircle2 className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                        <span>Qualification approfondie des circuits d'achat et intermédiaires</span>
                      </li>
                      <li className="flex items-start gap-2.5">
                        <CheckCircle2 className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                        <span>Activation directe des réseaux structurants et d'affaires de StratéNova</span>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>

              <div className="mt-8 pt-6 border-t border-slate-800">
                <a
                  href="#contact"
                  className="w-full py-3.5 px-4 rounded-xl bg-slate-800 hover:bg-slate-700 text-white font-semibold text-center block transition-colors border border-slate-700"
                >
                  Activer le Dispositif DIC™
                </a>
              </div>
            </div>

            {/* Offer 2 */}
            <div className="rounded-3xl bg-gradient-to-b from-slate-900 to-slate-950 border-2 border-amber-500/40 p-8 lg:p-10 flex flex-col justify-between relative shadow-2xl shadow-amber-500/5">
              <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 bg-gradient-to-r from-amber-500 to-amber-600 text-slate-950 text-xs font-extrabold uppercase tracking-widest px-4 py-1 rounded-full shadow-lg">
                Recommandé pour PME & ETI
              </div>

              <div>
                <div className="flex items-center justify-between mb-4">
                  <span className="px-3 py-1 rounded-full bg-amber-500/10 text-amber-400 text-xs font-bold uppercase tracking-wider border border-amber-500/20">
                    Niveau 2 &middot; Stratégie & Capital
                  </span>
                  <Award className="w-6 h-6 text-amber-400" />
                </div>

                <h3 className="text-2xl font-bold text-white mb-2">Accompagnement MTI™</h3>
                <p className="text-sm text-slate-400 mb-6">Passer d’une logique export à une logique d’implantation capitalistique pérenne.</p>

                <div className="space-y-6 pt-4 border-t border-slate-800">
                  <div>
                    <h4 className="text-xs font-bold text-slate-300 uppercase tracking-wider mb-2">Pour qui ?</h4>
                    <p className="text-sm text-slate-300">
                      Les entreprises qui souhaitent mettre en œuvre une stratégie internationale de premier plan et valoriser leur rigueur stratégique auprès des partenaires externes (banques, investisseurs, actionnaires).
                    </p>
                  </div>

                  <div>
                    <h4 className="text-xs font-bold text-slate-300 uppercase tracking-wider mb-2">Objectif principal</h4>
                    <p className="text-sm text-slate-300">
                      Sécuriser et maximiser la valeur des acquisitions, joint-ventures ou déploiements industriels en Afrique de l'Ouest.
                    </p>
                  </div>

                  <div>
                    <h4 className="text-xs font-bold text-slate-300 uppercase tracking-wider mb-3">Livrables & Programme</h4>
                    <ul className="space-y-2.5 text-sm text-slate-300">
                      <li className="flex items-start gap-2.5">
                        <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                        <span>Diagnostic stratégique complet sur 11 dimensions et 55 sous-dimensions</span>
                      </li>
                      <li className="flex items-start gap-2.5">
                        <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                        <span>Attribution d’un score certifié MTI™ officiel (valable 12 mois)</span>
                      </li>
                      <li className="flex items-start gap-2.5">
                        <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                        <span>Rapport exécutif de recommandations priorisées pour le Conseil d'Administration</span>
                      </li>
                      <li className="flex items-start gap-2.5">
                        <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                        <span>Coaching stratégique exécutif sur 4 mois (ateliers de pilotage mensuels)</span>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>

              <div className="mt-8 pt-6 border-t border-slate-800">
                <a
                  href="#contact"
                  className="w-full py-3.5 px-4 rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-slate-950 font-bold text-center block transition-all shadow-lg shadow-amber-500/20"
                >
                  Initier l'Accompagnement MTI™
                </a>
              </div>
            </div>

          </div>

          {/* Group rates notice */}
          <div className="mt-12 text-center">
            <p className="text-sm text-slate-400">
              💡 Des formules mutualisées ou adaptées peuvent être proposées pour les groupements d'entreprises, syndicats professionnels et délégations sectorielles. <a href="#contact" className="text-amber-400 hover:underline">Consultez-nous</a>.
            </p>
          </div>

        </div>
      </section>

      {/* INTERACTIVE MTI SELF-ASSESSMENT SIMULATOR */}
      <section id="simulateur" className="py-24 relative overflow-hidden">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">

          <div className="text-center space-y-4 mb-12">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-xs font-semibold text-emerald-400">
              <TrendingUp className="w-3.5 h-3.5" />
              Outil d'Auto-Évaluation Express
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-white">
              Évaluez votre maturité d'expansion MTI™
            </h2>
            <p className="text-slate-300 text-sm sm:text-base">
              Répondez à 4 questions stratégiques pour obtenir votre indice préliminaire d'implantation.
            </p>
          </div>

          <div className="p-8 sm:p-10 rounded-3xl bg-slate-900 border border-slate-800 shadow-2xl relative">

            {!simComplete ? (
              <div className="space-y-6">

                {/* Progress bar */}
                <div>
                  <div className="flex justify-between items-center text-xs text-slate-400 mb-2">
                    <span>Question {simStep + 1} sur {TEST_QUESTIONS.length}</span>
                    <span>{Math.round(((simStep) / TEST_QUESTIONS.length) * 100)}% complété</span>
                  </div>
                  <div className="w-full h-2 bg-slate-800 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-amber-500 transition-all duration-300"
                      style={{ width: `${((simStep + 1) / TEST_QUESTIONS.length) * 100}%` }}
                    />
                  </div>
                </div>

                {/* Question */}
                <div className="py-4">
                  <h3 className="text-xl font-bold text-white mb-6">
                    {TEST_QUESTIONS[simStep].question}
                  </h3>

                  <div className="space-y-3">
                    {TEST_QUESTIONS[simStep].options.map((opt, i) => (
                      <button
                        key={i}
                        onClick={() => handleSelectOption(TEST_QUESTIONS[simStep].id, opt.score)}
                        className="w-full p-4 rounded-xl text-left bg-slate-950/70 hover:bg-slate-800/90 border border-slate-800 hover:border-amber-500/50 transition-all flex items-center justify-between group"
                      >
                        <span className="text-sm font-medium text-slate-200 group-hover:text-white">
                          {opt.label}
                        </span>
                        <ChevronRight className="w-4 h-4 text-slate-500 group-hover:text-amber-400 group-hover:translate-x-1 transition-all" />
                      </button>
                    ))}
                  </div>
                </div>

                {simStep > 0 && (
                  <button
                    onClick={() => setSimStep(simStep - 1)}
                    className="text-xs text-slate-400 hover:text-white transition-colors"
                  >
                    &larr; Revenir à la question précédente
                  </button>
                )}

              </div>
            ) : (
              <div className="text-center py-6 space-y-6">
                <div className="w-20 h-20 mx-auto rounded-full bg-gradient-to-tr from-amber-500 to-amber-300 flex items-center justify-center text-slate-950 font-black text-2xl shadow-xl">
                  {calculateScore()}%
                </div>

                <div className="space-y-2">
                  <h3 className="text-2xl font-bold text-white">Indice de Maturité Préliminaire Estimé</h3>
                  <p className="text-sm text-slate-300 max-w-lg mx-auto">
                    {calculateScore() > 70
                      ? "Votre entreprise dispose d'atouts solides pour réussir un passage à l'échelle capitalistique en Afrique de l'Ouest. Une certification MTI™ complète formalisera cet avantage."
                      : "Votre projet présente un potentiel fort mais requiert la structuration du Dispositif d'Implantation Commerciale (DIC™) pour minimiser les risques initiaux."}
                  </p>
                </div>

                <div className="pt-4 flex flex-col sm:flex-row gap-4 justify-center items-center">
                  <a
                    href="#contact"
                    className="px-6 py-3.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-sm shadow-lg transition-transform hover:-translate-y-0.5"
                  >
                    Obtenir le Diagnostic MTI™ Approfondi (55 indicateurs)
                  </a>
                  <button
                    onClick={resetSimulator}
                    className="px-5 py-3.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 text-sm font-medium transition-colors"
                  >
                    Recommencer le test
                  </button>
                </div>
              </div>
            )}

          </div>

        </div>
      </section>

      {/* FAQ SECTION */}
      <section id="faq" className="py-24 bg-slate-900/30 border-y border-slate-800/80">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">

          <div className="text-center space-y-4 mb-12">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-sky-500/10 border border-sky-500/20 text-xs font-semibold text-sky-400">
              Questions & Réponses
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-white">
              Foire Aux Questions
            </h2>
            <p className="text-slate-300 text-base">
              Tout comprendre sur la méthodologie StratéNova, la MTI™ et notre modèle d'accompagnement.
            </p>
          </div>

          {/* FAQ Category Filter Buttons */}
          <div className="flex flex-wrap items-center justify-center gap-2 mb-8">
            <button
              onClick={() => setActiveTab('all')}
              className={`px-4 py-2 rounded-xl text-xs font-semibold transition-all ${
                activeTab === 'all'
                  ? 'bg-amber-500 text-slate-950 shadow-md'
                  : 'bg-slate-900 text-slate-300 hover:bg-slate-800 border border-slate-800'
              }`}
            >
              Toutes les questions
            </button>
            <button
              onClick={() => setActiveTab('mti')}
              className={`px-4 py-2 rounded-xl text-xs font-semibold transition-all ${
                activeTab === 'mti'
                  ? 'bg-amber-500 text-slate-950 shadow-md'
                  : 'bg-slate-900 text-slate-300 hover:bg-slate-800 border border-slate-800'
              }`}
            >
              Comprendre la MTI™
            </button>
            <button
              onClick={() => setActiveTab('compare')}
              className={`px-4 py-2 rounded-xl text-xs font-semibold transition-all ${
                activeTab === 'compare'
                  ? 'bg-amber-500 text-slate-950 shadow-md'
                  : 'bg-slate-900 text-slate-300 hover:bg-slate-800 border border-slate-800'
              }`}
            >
              MTI vs Finance & TRI
            </button>
            <button
              onClick={() => setActiveTab('pratique')}
              className={`px-4 py-2 rounded-xl text-xs font-semibold transition-all ${
                activeTab === 'pratique'
                  ? 'bg-amber-500 text-slate-950 shadow-md'
                  : 'bg-slate-900 text-slate-300 hover:bg-slate-800 border border-slate-800'
              }`}
            >
              Modalités & Cadre Légal
            </button>
          </div>

          {/* Accordion */}
          <div className="space-y-4">
            {filteredFaqs.map((faq, index) => {
              const isOpen = openFaqIndex === index;
              return (
                <div
                  key={index}
                  className={`rounded-2xl border transition-all ${
                    isOpen
                      ? 'bg-slate-900 border-amber-500/40 shadow-xl'
                      : 'bg-slate-900/60 border-slate-800 hover:border-slate-700'
                  }`}
                >
                  <button
                    onClick={() => setOpenFaqIndex(isOpen ? -1 : index)}
                    className="w-full p-6 text-left flex items-center justify-between gap-4"
                  >
                    <span className="font-bold text-base sm:text-lg text-white">
                      {faq.question}
                    </span>
                    <span className={`p-1.5 rounded-lg bg-slate-800 text-slate-300 transition-transform ${isOpen ? 'rotate-180 text-amber-400' : ''}`}>
                      <ChevronDown className="w-5 h-5" />
                    </span>
                  </button>

                  {isOpen && (
                    <div className="px-6 pb-6 pt-2 border-t border-slate-800/80 text-sm text-slate-300 leading-relaxed whitespace-pre-line">
                      {faq.answer}
                    </div>
                  )}
                </div>
              );
            })}
          </div>

        </div>
      </section>

      {/* CONTACT & APPOINTMENT SECTION */}
      <section id="contact" className="py-24 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

          <div className="max-w-3xl mx-auto text-center space-y-4 mb-16">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/20 text-xs font-semibold text-amber-400">
              <Phone className="w-3.5 h-3.5" />
              Échangez avec nos Experts
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-white">
              Demander un entretien stratégique
            </h2>
            <p className="text-slate-300 text-base sm:text-lg">
              Nos consultants et analystes basés à Abidjan et Paris sont à votre disposition pour cadrer votre projet.
            </p>
          </div>

          <div className="grid lg:grid-cols-12 gap-12 items-start">

            {/* Contact Details Card */}
            <div className="lg:col-span-5 space-y-6">

              <div className="p-8 rounded-3xl bg-slate-900 border border-slate-800 space-y-6">
                <div>
                  <h3 className="text-xl font-bold text-white mb-1">StratéNova</h3>
                  <p className="text-xs text-amber-400 font-medium">Cabinet Conseil & Évaluation Internationale</p>
                </div>

                <div className="space-y-4 text-sm text-slate-300">
                  <div className="flex items-start gap-4">
                    <div className="p-3 rounded-xl bg-slate-800 text-amber-400 border border-slate-700 shrink-0">
                      <Phone className="w-5 h-5" />
                    </div>
                    <div>
                      <div className="text-xs text-slate-400 font-medium">Ligne directe</div>
                      <a href="tel:+33651806055" className="text-white font-semibold hover:text-amber-400 transition-colors">
                        +33 6 51 80 60 55
                      </a>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <div className="p-3 rounded-xl bg-slate-800 text-amber-400 border border-slate-700 shrink-0">
                      <Mail className="w-5 h-5" />
                    </div>
                    <div>
                      <div className="text-xs text-slate-400 font-medium">Courriel professionnel</div>
                      <a href="mailto:info@strate-nova.com" className="text-white font-semibold hover:text-amber-400 transition-colors">
                        info@strate-nova.com
                      </a>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <div className="p-3 rounded-xl bg-slate-800 text-amber-400 border border-slate-700 shrink-0">
                      <Clock className="w-5 h-5" />
                    </div>
                    <div>
                      <div className="text-xs text-slate-400 font-medium">Horaires d'ouverture</div>
                      <span className="text-white font-semibold">Lundi à Vendredi : 09h00 – 18h00</span>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <div className="p-3 rounded-xl bg-slate-800 text-amber-400 border border-slate-700 shrink-0">
                      <MapPin className="w-5 h-5" />
                    </div>
                    <div>
                      <div className="text-xs text-slate-400 font-medium">Bureau Afrique de l'Ouest</div>
                      <span className="text-white font-semibold">Abidjan, Côte d'Ivoire</span>
                      <p className="text-xs text-slate-400 mt-0.5">Plateau / Cocody &middot; Coordonnées : 5.3778° N, 3.9852° W</p>
                    </div>
                  </div>
                </div>

                {/* Google form direct link button */}
                <div className="pt-4 border-t border-slate-800">
                  <a
                    href="https://docs.google.com/forms/d/e/1FAIpQLScVRPwNXrJ3sD0SAfXMoWfAowxo4DuYZliMg7FIMgX5aWjqoQ/viewform?usp=header"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full py-3 px-4 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold flex items-center justify-center gap-2 border border-slate-700"
                  >
                    <span>Ouvrir le formulaire Google Forms officiel</span>
                    <ArrowUpRight className="w-4 h-4 text-amber-400" />
                  </a>
                </div>
              </div>

              {/* Security badge */}
              <div className="p-4 rounded-2xl bg-slate-900/60 border border-slate-800/80 flex items-center gap-3 text-xs text-slate-400">
                <ShieldCheck className="w-5 h-5 text-emerald-400 shrink-0" />
                <span>Données traitées en conformité avec la réglementation RGPD et le secret professionnel.</span>
              </div>

            </div>

            {/* Direct Web Form */}
            <div className="lg:col-span-7">
              <div className="p-8 sm:p-10 rounded-3xl bg-slate-900 border border-slate-800 shadow-2xl">

                {formSubmitted ? (
                  <div className="py-12 text-center space-y-4">
                    <div className="w-16 h-16 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center mx-auto border border-emerald-500/30">
                      <Check className="w-8 h-8" />
                    </div>
                    <h3 className="text-2xl font-bold text-white">Demande transmise avec succès</h3>
                    <p className="text-slate-300 text-sm max-w-md mx-auto">
                      Merci pour votre intérêt. Un associé ou consultant StratéNova reviendra vers vous sous 24 heures ouvrées.
                    </p>
                    <button
                      onClick={() => setFormSubmitted(false)}
                      className="mt-4 px-6 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-xs text-white font-semibold"
                    >
                      Envoyer une autre demande
                    </button>
                  </div>
                ) : (
                  <form onSubmit={handleContactSubmit} className="space-y-6">
                    <div className="grid sm:grid-cols-2 gap-6">
                      <div>
                        <label className="block text-xs font-bold uppercase tracking-wider text-slate-300 mb-2">
                          Nom & Prénom *
                        </label>
                        <input
                          type="text"
                          required
                          value={contactForm.name}
                          onChange={(e) => setContactForm({ ...contactForm, name: e.target.value })}
                          placeholder="ex. Auguste Dago"
                          className="w-full px-4 py-3 rounded-xl bg-slate-950 border border-slate-800 focus:border-amber-500 focus:outline-none text-white text-sm"
                        />
                      </div>

                      <div>
                        <label className="block text-xs font-bold uppercase tracking-wider text-slate-300 mb-2">
                          Email professionnel *
                        </label>
                        <input
                          type="email"
                          required
                          value={contactForm.email}
                          onChange={(e) => setContactForm({ ...contactForm, email: e.target.value })}
                          placeholder="contact@entreprise.com"
                          className="w-full px-4 py-3 rounded-xl bg-slate-950 border border-slate-800 focus:border-amber-500 focus:outline-none text-white text-sm"
                        />
                      </div>
                    </div>

                    <div className="grid sm:grid-cols-2 gap-6">
                      <div>
                        <label className="block text-xs font-bold uppercase tracking-wider text-slate-300 mb-2">
                          Entreprise / Organisation *
                        </label>
                        <input
                          type="text"
                          required
                          value={contactForm.company}
                          onChange={(e) => setContactForm({ ...contactForm, company: e.target.value })}
                          placeholder="Nom de votre société"
                          className="w-full px-4 py-3 rounded-xl bg-slate-950 border border-slate-800 focus:border-amber-500 focus:outline-none text-white text-sm"
                        />
                      </div>

                      <div>
                        <label className="block text-xs font-bold uppercase tracking-wider text-slate-300 mb-2">
                          Téléphone
                        </label>
                        <input
                          type="tel"
                          value={contactForm.phone}
                          onChange={(e) => setContactForm({ ...contactForm, phone: e.target.value })}
                          placeholder="+33 6... ou +225 07..."
                          className="w-full px-4 py-3 rounded-xl bg-slate-950 border border-slate-800 focus:border-amber-500 focus:outline-none text-white text-sm"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-xs font-bold uppercase tracking-wider text-slate-300 mb-2">
                        Objet de votre sollicitation
                      </label>
                      <select
                        value={contactForm.interest}
                        onChange={(e) => setContactForm({ ...contactForm, interest: e.target.value })}
                        className="w-full px-4 py-3 rounded-xl bg-slate-950 border border-slate-800 focus:border-amber-500 focus:outline-none text-white text-sm"
                      >
                        <option value="mti">Audit & Certification MTI™ (Diagnostic Prédictif)</option>
                        <option value="dic">Dispositif d'Implantation Commerciale (DIC™)</option>
                        <option value="ma">Opération de Croissance Externe / M&A Afrique de l'Ouest</option>
                        <option value="autre">Autre demande spécifique</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-xs font-bold uppercase tracking-wider text-slate-300 mb-2">
                        Précisions sur votre projet (secteur, pays ciblés, calendrier)
                      </label>
                      <textarea
                        rows={4}
                        value={contactForm.message}
                        onChange={(e) => setContactForm({ ...contactForm, message: e.target.value })}
                        placeholder="Décrivez brièvement vos enjeux ou questions..."
                        className="w-full px-4 py-3 rounded-xl bg-slate-950 border border-slate-800 focus:border-amber-500 focus:outline-none text-white text-sm resize-none"
                      />
                    </div>

                    <button
                      type="submit"
                      className="w-full py-4 px-6 rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-slate-950 font-bold text-sm shadow-xl shadow-amber-500/20 transition-all transform hover:-translate-y-0.5 flex items-center justify-center gap-2"
                    >
                      <span>Transmettre la demande de rendez-vous</span>
                      <ArrowUpRight className="w-5 h-5" />
                    </button>
                  </form>
                )}

              </div>
            </div>

          </div>

        </div>
      </section>

      {/* FOOTER */}
      <footer className="border-t border-slate-800/80 bg-slate-950 py-16 text-slate-400 text-xs">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">

          <div className="grid md:grid-cols-4 gap-8">
            <div className="md:col-span-2 space-y-4">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-lg bg-amber-500 text-slate-950 font-black flex items-center justify-center text-sm">
                  SN
                </div>
                <span className="text-lg font-bold text-white tracking-tight">StratéNova</span>
              </div>
              <p className="text-slate-400 max-w-sm leading-relaxed">
                Cabinet conseil spécialisé en internationalisation et développement commercial en Afrique de l'Ouest. Créateur des méthodologies exclusives DIC™ et MTI™.
              </p>
              <p className="text-slate-500">
                « Prédire. Décider. Croître. »
              </p>
            </div>

            <div>
              <h4 className="font-bold text-white uppercase tracking-wider mb-3">Navigation</h4>
              <ul className="space-y-2">
                <li><a href="#accueil" className="hover:text-amber-400 transition-colors">Accueil</a></li>
                <li><a href="#mti" className="hover:text-amber-400 transition-colors">Matrice MTI™</a></li>
                <li><a href="#offres" className="hover:text-amber-400 transition-colors">Nos Offres (DIC™ & MTI™)</a></li>
                <li><a href="#simulateur" className="hover:text-amber-400 transition-colors">Auto-Évaluation Express</a></li>
                <li><a href="#faq" className="hover:text-amber-400 transition-colors">Foire Aux Questions</a></li>
                <li><a href="#contact" className="hover:text-amber-400 transition-colors">Contact</a></li>
              </ul>
            </div>

            <div>
              <h4 className="font-bold text-white uppercase tracking-wider mb-3">Cadre Légal & RGPD</h4>
              <ul className="space-y-2">
                <li>
                  <a
                    href="https://docs.google.com/document/d/1aQyb6ugKq1Io2_314GfQq6ed9JbCwMS55CSn3DuCQHw/edit?usp=sharing"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-amber-400 transition-colors flex items-center gap-1"
                  >
                    <span>Politique RGPD</span>
                    <ArrowUpRight className="w-3.5 h-3.5" />
                  </a>
                </li>
                <li>
                  <a
                    href="https://docs.google.com/document/d/1aQyb6ugKq1Io2_314GfQq6ed9JbCwMS55CSn3DuCQHw/edit?usp=sharing"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-amber-400 transition-colors flex items-center gap-1"
                  >
                    <span>Conditions Générales d'Utilisation (CGU)</span>
                    <ArrowUpRight className="w-3.5 h-3.5" />
                  </a>
                </li>
                <li>
                  <span className="text-slate-500">Non-conseil en investissement financier (Art. L. 321-1 CMF)</span>
                </li>
              </ul>
            </div>
          </div>

          <div className="pt-8 border-t border-slate-800/80 flex flex-col sm:flex-row items-center justify-between gap-4 text-slate-500">
            <div>
              &copy; {new Date().getFullYear()} StratéNova. Tous droits réservés. DIC™ et MTI™ sont des marques déposées.
            </div>
            <div>
              Présidence : Auguste Dago &middot; Paris - Abidjan
            </div>
          </div>

        </div>
      </footer>

    </div>
  );
}
