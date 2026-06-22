import React from 'react';
import { Link } from 'react-router-dom';
import { Coffee, ArrowLeft, Check, Sparkles } from 'lucide-react';
import './brunch.scss';

export default function Brunch() {
    return (
        <div className="brunch-page">
            <div className="page-header-nav">
                <Link to="/" className="back-link">
                    <ArrowLeft size={16} />
                    <span>Retour à l'Accueil</span>
                </Link>
            </div>

            <div className="prestation-hero">
                <div className="prestation-hero-content">
                    <div className="prestation-badge">
                        <Coffee size={14} />
                        <span>Matinées & Brunchs</span>
                    </div>
                    <h1>Matinées & Brunchs</h1>
                    <p className="prestation-tagline">
                        Des formules matinales douces, épicées et conviviales pour vos lendemains de fêtes ou réunions d'entreprise.
                    </p>
                </div>
            </div>

            <div className="prestation-container">
                <div className="prestation-grid">
                    {/* Brunch Details Card */}
                    <div className="prestation-details-card">
                        <div className="details-header">
                            <h2>Nos Formules Brunch</h2>
                            <p>Des options adaptables selon le nombre de personnes, servies sous forme de buffet matinal.</p>
                        </div>

                        <div className="formulas-list" style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
                            <div className="buffet-formula-item" style={{ padding: '1.25rem', backgroundColor: 'var(--color-bordeaux-ultra-light)', borderRadius: 'var(--border-radius-md)', border: '1px solid transparent' }}>
                                <div className="bf-header" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.5rem' }}>
                                    <h3 style={{ fontSize: '1.05rem', fontWeight: 700, color: 'var(--color-slate-dark)' }}>Formule Simple</h3>
                                    <span className="bf-price" style={{ fontSize: '0.95rem', fontWeight: 600, color: 'var(--color-slate-light)' }}>Sur devis</span>
                                </div>
                                <p className="bf-desc" style={{ fontSize: '0.85rem', color: 'var(--color-slate-light)', lineHeight: 1.5 }}>Café ou thé à la menthe + jus de fruits + 1 gâteau traditionnel algérien.</p>
                            </div>

                            <div className="buffet-formula-item" style={{ padding: '1.25rem', backgroundColor: 'var(--color-bordeaux-ultra-light)', borderRadius: 'var(--border-radius-md)', border: '1px solid transparent' }}>
                                <div className="bf-header" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.5rem' }}>
                                    <h3 style={{ fontSize: '1.05rem', fontWeight: 700, color: 'var(--color-slate-dark)' }}>Formule Complète</h3>
                                    <span className="bf-price" style={{ fontSize: '0.95rem', fontWeight: 600, color: 'var(--color-slate-light)' }}>Sur devis</span>
                                </div>
                                <p className="bf-desc" style={{ fontSize: '0.85rem', color: 'var(--color-slate-light)', lineHeight: 1.5 }}>Café ou thé + jus de fruits + 1 gâteau traditionnel + 1 dessert au choix.</p>
                            </div>

                            <div className="buffet-formula-item" style={{ padding: '1.25rem', backgroundColor: 'var(--color-bordeaux-ultra-light)', borderRadius: 'var(--border-radius-md)', border: '1px solid transparent' }}>
                                <div className="bf-header" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.5rem' }}>
                                    <h3 style={{ fontSize: '1.05rem', fontWeight: 700, color: 'var(--color-slate-dark)' }}>Formule Gourmande</h3>
                                    <span className="bf-price" style={{ fontSize: '0.95rem', fontWeight: 600, color: 'var(--color-slate-light)' }}>Sur devis</span>
                                </div>
                                <p className="bf-desc" style={{ fontSize: '0.85rem', color: 'var(--color-slate-light)', lineHeight: 1.5 }}>Café ou thé + jus de fruits + 2 gâteaux traditionnels + 1 dessert au choix.</p>
                            </div>

                            <div className="buffet-formula-item featured" style={{ padding: '1.25rem', backgroundColor: 'hsl(26, 93%, 97%)', borderRadius: 'var(--border-radius-md)', border: '1px solid var(--color-gold-light)', boxShadow: '0 4px 15px rgba(155, 88, 51, 0.08)' }}>
                                <div className="bf-header" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.5rem' }}>
                                    <h3 style={{ fontSize: '1.05rem', fontWeight: 700, color: 'var(--color-gold-dark)' }}>Formule Brunch Complet</h3>
                                    <span className="bf-price" style={{ fontSize: '0.95rem', fontWeight: 600, color: 'var(--color-gold-dark)' }}>Sur devis</span>
                                </div>
                                <p className="bf-desc" style={{ fontSize: '0.85rem', color: 'var(--color-slate-light)', lineHeight: 1.5 }}>Café ou thé + jus de fruits + 2 gâteaux traditionnels + buffet complet salé & sucré.</p>
                            </div>
                        </div>
                    </div>

                    {/* Specialities Card */}
                    <div className="prestation-formulas-card">
                        <div className="formulas-header">
                            <Sparkles size={20} className="sparkle-icon" />
                            <h2>Nos Spécialités du Matin</h2>
                        </div>

                        <div className="pieces-gallery">
                            <div className="piece-category">
                                <h4 style={{ textTransform: 'uppercase', fontSize: '0.85rem', color: 'var(--color-gold-dark)', borderBottom: '1px solid var(--color-border)', paddingBottom: '0.25rem', marginBottom: '0.75rem' }}>Douceurs Chaudes</h4>
                                <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '0.4rem' }}>
                                    <li style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.85rem', color: 'var(--color-slate-light)' }}><Check size={14} className="check-icon" style={{ color: 'var(--color-success)', flexShrink: 0 }} /> Baghrir (Crêpes mille trous) au miel et beurre</li>
                                    <li style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.85rem', color: 'var(--color-slate-light)' }}><Check size={14} className="check-icon" style={{ color: 'var(--color-success)', flexShrink: 0 }} /> Msemmen (Feuilletés algériens traditionnels)</li>
                                    <li style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.85rem', color: 'var(--color-slate-light)' }}><Check size={14} className="check-icon" style={{ color: 'var(--color-success)', flexShrink: 0 }} /> Café traditionnel parfumé à la cardamome</li>
                                    <li style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.85rem', color: 'var(--color-slate-light)' }}><Check size={14} className="check-icon" style={{ color: 'var(--color-success)', flexShrink: 0 }} /> Thé à la menthe fraîche algérien</li>
                                </ul>
                            </div>

                            <div className="piece-category" style={{ marginTop: '1.5rem' }}>
                                <h4 style={{ textTransform: 'uppercase', fontSize: '0.85rem', color: 'var(--color-gold-dark)', borderBottom: '1px solid var(--color-border)', paddingBottom: '0.25rem', marginBottom: '0.75rem' }}>Options Salées</h4>
                                <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '0.4rem' }}>
                                    <li style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.85rem', color: 'var(--color-slate-light)' }}><Check size={14} className="check-icon" style={{ color: 'var(--color-success)', flexShrink: 0 }} /> Mini-quiches aux épices et légumes</li>
                                    <li style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.85rem', color: 'var(--color-slate-light)' }}><Check size={14} className="check-icon" style={{ color: 'var(--color-success)', flexShrink: 0 }} /> Brochettes de fruits frais de saison</li>
                                    <li style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.85rem', color: 'var(--color-slate-light)' }}><Check size={14} className="check-icon" style={{ color: 'var(--color-success)', flexShrink: 0 }} /> Assortiments de fromages & olives d'Algérie</li>
                                </ul>
                            </div>
                        </div>

                        <div className="cta-box" style={{ marginTop: '1.5rem' }}>
                            <a href="#contact" className="btn btn-primary btn-block">
                                Demander un Devis Personnalisé
                            </a>
                        </div>
                    </div>
                </div>

                {/* Info Banner */}
                <div className="prestation-info-banner">
                    <div className="info-content">
                        <h3>Idéal pour les Lendemains de Fête</h3>
                        <p>
                            Pour prolonger la magie de votre mariage ou de vos événements familiaux, notre formule brunch est idéale. Servie de manière décontractée et chaleureuse, elle permet à vos convives de se retrouver le lendemain autour de saveurs réconfortantes et dépaysantes.
                        </p>
                        <div className="info-badges">
                            <span>Fait Maison à Bordeaux</span>
                            <span>Lendemains de Noces</span>
                            <span>Livraison Gironde</span>
                        </div>
                    </div>
                    <div className="info-illustration">
                        <div className="circle-image-wrapper">
                            <img src="/logo.svg" alt="Brunch Cœur d'Oran" className="circular-img" />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
