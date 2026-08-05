import { useRef, useEffect } from 'react'
import josephPhotoNew from './assets/hero-photo-new.png'

/* ─── Scroll reveal — watches data-reveal / data-pop / data-draw ─── */
function useScrollReveal() {
  useEffect(() => {
    const els = document.querySelectorAll('[data-reveal], [data-pop], [data-draw], [data-ghost]')
    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            e.target.classList.add('is-visible')
            obs.unobserve(e.target)
          }
        })
      },
      { threshold: 0.15, rootMargin: '0px 0px -8% 0px' }
    )
    els.forEach((el) => obs.observe(el))
    return () => obs.disconnect()
  }, [])
}

const WA_LINK = 'https://wa.me/22996104887'
const IG_LINK = 'https://www.instagram.com/joseph_gbenolo?igsh=NWdzdThzZm8zZHE='

const WA_ICON = (
  <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
  </svg>
)

const IG_ICON = (
  <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
  </svg>
)

function ChessKnight({ className = "" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 100 100"
      className={className}
      fill="currentColor"
      aria-hidden="true"
    >
      <path d="M 30 85 L 70 85 L 70 80 L 30 80 Z" />
      <path d="M 28 80 L 72 80 L 72 74 L 28 74 Z" />
      <path d="M 50 74 C 50 74 62 65 65 55 C 68 45 60 30 52 25 C 58 22 62 18 60 14 C 56 10 48 12 45 16 C 42 14 36 14 34 18 C 32 22 35 26 35 26 C 32 28 28 34 28 42 C 28 55 38 68 44 74 Z" />
      <ellipse cx="43" cy="26" rx="3" ry="4" fill="#0C0C0C" opacity="0.6" />
    </svg>
  )
}

function WaBtn({ children, dark = false, large = false }: { children: React.ReactNode; dark?: boolean; large?: boolean }) {
  return (
    <a
      href={WA_LINK}
      target="_blank"
      rel="noopener noreferrer"
      className={`inline-flex items-center gap-2 rounded-full font-semibold transition-all active:scale-95 ${
        dark
          ? 'bg-[#0C0C0C] text-[#E8960A] hover:bg-[#1C1C1C]'
          : 'bg-[#E8960A] text-[#0C0C0C] hover:bg-[#F5A623]'
      } ${large ? 'px-8 py-4 text-base' : 'px-5 py-2.5 text-sm'}`}
    >
      <span className={large ? 'w-5 h-5' : 'w-4 h-4'}>{WA_ICON}</span>
      {children}
    </a>
  )
}

export default function App() {
  const carouselRef = useRef<HTMLDivElement>(null)
  useScrollReveal()

  return (
    <div className="bg-[#0C0C0C] text-[#F0E8D8] overflow-x-hidden" style={{ fontFamily: "'Outfit', sans-serif" }}>

      {/* ── 1. HEADER ───────────────────────────────────────────────── */}
      <header
        className="fixed top-0 left-0 right-0 z-50 backdrop-blur-md"
        style={{ background: 'rgba(12,12,12,0.88)', borderBottom: '1px solid rgba(232,150,10,0.12)' }}
      >
        <div className="max-w-md mx-auto px-5 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <span
              className="font-display text-[#E8960A]"
              style={{ fontFamily: "'Anton', sans-serif", fontSize: '22px', letterSpacing: '0.05em' }}
            >
              JG
            </span>
            <div className="flex flex-col leading-tight">
              <span style={{ fontSize: '11px', color: 'rgba(240,232,216,0.4)', textTransform: 'uppercase', letterSpacing: '0.25em' }}>
                Coach de Vie
              </span>
              <span style={{ fontSize: '9px', color: '#E8960A', textTransform: 'uppercase', letterSpacing: '0.3em', fontWeight: 700 }}>
                Certifié
              </span>
            </div>
          </div>
          <WaBtn>WhatsApp</WaBtn>
        </div>
      </header>

      {/* ── 2. HERO ─────────────────────────────────────────────────── */}
      <section className="relative min-h-screen overflow-hidden" style={{ paddingTop: '64px', paddingBottom: '60px' }}>

        {/* Giant "JOSEPH" background text */}
        <div
          className="absolute inset-0 flex items-center justify-center pointer-events-none select-none"
          style={{ zIndex: 0 }}
          aria-hidden="true"
        >
          <span
            style={{
              fontFamily: "'Anton', sans-serif",
              fontSize: 'clamp(130px, 52vw, 260px)',
              color: '#E8960A',
              opacity: 0.055,
              letterSpacing: '-0.01em',
              lineHeight: 1,
              whiteSpace: 'nowrap',
            }}
          >
            JOSEPH
          </span>
        </div>

        {/* Photo — true background layer, 90% of the Hero's height, natural (unstretched) width */}
        <div
          className="absolute pointer-events-none"
          data-reveal="scale"
          style={{ top: 0, right: 0, height: '90vh', zIndex: 1, ['--reveal-delay' as any]: '150ms' }}
        >
          <img
            src={josephPhotoNew}
            alt="Joseph Gbenolo, coach de vie certifié à Cotonou"
            style={{ height: '100%', width: 'auto', display: 'block', objectFit: 'contain' }}
          />
        </div>

        {/* Legibility overlay — dark wash + stronger gradient behind the text zone */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            zIndex: 2,
            background: 'linear-gradient(115deg, #0C0C0C 0%, rgba(12,12,12,0.86) 30%, rgba(12,12,12,0.35) 55%, rgba(12,12,12,0.15) 75%)',
          }}
        />
        <div
          className="absolute inset-0 pointer-events-none"
          style={{ zIndex: 2, background: 'linear-gradient(to bottom, rgba(12,12,12,0.15) 0%, transparent 30%, rgba(12,12,12,0.55) 78%, #0C0C0C 100%)' }}
        />

        {/* Decorative golden ring — floats over the photo, upper right */}
        <svg
          className="absolute pointer-events-none"
          data-draw
          style={{ top: '90px', right: '24px', zIndex: 3, ['--draw-delay' as any]: '650ms' }}
          width="180" height="180" viewBox="0 0 180 180"
          aria-hidden="true"
        >
          <circle cx="90" cy="90" r="89" fill="none" stroke="rgba(232,150,10,0.28)" strokeWidth="1.5" />
        </svg>

        {/* Content — layered above the photo, pushed down for volume and breathing room */}
        <div className="relative" style={{ zIndex: 4, paddingTop: '96px' }}>

          {/* Headline */}
          <div className="px-5 max-w-md mx-auto w-full" data-reveal style={{ ['--reveal-delay' as any]: '120ms' }}>
            <h1
              style={{
                fontFamily: "'Anton', sans-serif",
                fontSize: 'clamp(48px, 16vw, 70px)',
                lineHeight: 0.94,
                letterSpacing: '-0.01em',
              }}
            >
              <span style={{ display: 'block', color: '#F0E8D8' }}>REPRENDS</span>
              <span style={{ display: 'block', color: '#E8960A' }}>LE CONTRÔLE</span>
              <span style={{ display: 'block', color: '#F0E8D8' }}>DE TA VIE.</span>
            </h1>
          </div>

          {/* Subtitle */}
          <div className="px-5 mt-4 max-w-md mx-auto w-full" data-reveal style={{ ['--reveal-delay' as any]: '480ms' }}>
            <p style={{ color: 'rgba(240,232,216,0.75)', fontSize: '14px', lineHeight: 1.55, maxWidth: '260px' }}>
              Un accompagnement humain et structuré pour t'aider à clarifier, décider et avancer avec{' '}
              <strong style={{ color: '#F0E8D8', fontWeight: 600 }}>confiance</strong>.
            </p>
          </div>

          {/* Info card */}
          <div className="px-5 mt-4 max-w-md mx-auto w-full" data-pop style={{ ['--pop-delay' as any]: '600ms' }}>
            <div
              className="flex items-start gap-3"
              style={{ background: 'rgba(12,12,12,0.55)', backdropFilter: 'blur(6px)', border: '1px solid rgba(232,150,10,0.18)', borderRadius: '14px', padding: '16px' }}
            >
              <div
                className="flex items-center justify-center flex-shrink-0"
                style={{ width: '36px', height: '36px', borderRadius: '10px', background: 'rgba(232,150,10,0.15)' }}
              >
                <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="#E8960A" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <circle cx="12" cy="12" r="10" />
                  <polyline points="12 6 12 12 16 14" />
                </svg>
              </div>
              <div>
                <div style={{ fontSize: '13px', fontWeight: 800, color: '#F0E8D8', textTransform: 'uppercase', letterSpacing: '0.04em', marginBottom: '4px' }}>
                  À ton rythme.
                </div>
                <div style={{ fontSize: '11.5px', color: 'rgba(240,232,216,0.6)', lineHeight: 1.5 }}>
                  Des séances personnalisées adaptées à ton parcours et à tes objectifs.
                </div>
              </div>
            </div>
          </div>

          {/* Hand-drawn arrow pointing toward the primary CTA — drawn last, right before CTA */}
          <div className="px-5 max-w-md mx-auto w-full">
            <svg
              className="pointer-events-none"
              data-draw
              style={{ marginLeft: '4px', marginTop: '6px', ['--draw-delay' as any]: '780ms' }}
              width="52" height="34" viewBox="0 0 52 34" fill="none" aria-hidden="true"
            >
              <path d="M 6 2 C 10 12, 22 24, 40 28" stroke="#E8960A" strokeWidth="1.5" strokeDasharray="4 3" opacity="0.5" />
              <path d="M 33 26 L 41 29 L 38 21" stroke="#E8960A" strokeWidth="1.5" opacity="0.5" fill="none" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </div>

          {/* CTA */}
          <div className="px-5 mt-2 max-w-md mx-auto w-full" data-reveal style={{ ['--reveal-delay' as any]: '860ms' }}>
            <span className="pulse-cta inline-block rounded-full">
              <WaBtn large>Échanger avec Joseph</WaBtn>
            </span>
          </div>

          {/* Bottom stats row */}
          <div
            className="flex justify-between max-w-md mx-auto w-full px-5"
            data-reveal
            style={{ marginTop: '26px', paddingTop: '18px', borderTop: '1px solid rgba(232,150,10,0.15)', ['--reveal-delay' as any]: '950ms' }}
          >
            {[
              { title: 'Confidentialité', desc: 'Un espace sûr pour te confier.' },
              { title: 'Clarté', desc: 'Des prises de conscience qui changent tout.' },
              { title: 'Résultats', desc: 'Des actions concrètes, des changements réels.' },
            ].map((item, i, arr) => (
              <div
                key={item.title}
                style={{
                  flex: '1 1 0',
                  paddingRight: i < arr.length - 1 ? '14px' : 0,
                  marginRight: i < arr.length - 1 ? '14px' : 0,
                  borderRight: i < arr.length - 1 ? '1px solid rgba(232,150,10,0.15)' : 'none',
                }}
              >
                <div style={{ fontSize: '11px', fontWeight: 700, color: '#F0E8D8', marginBottom: '5px' }}>{item.title}</div>
                <div style={{ fontSize: '9.5px', color: 'rgba(240,232,216,0.55)', lineHeight: 1.45 }}>{item.desc}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── 3. TRANSITION BAND ──────────────────────────────────────── */}
      <div data-reveal="scale" style={{ borderTop: '1px solid rgba(232,150,10,0.1)', borderBottom: '1px solid rgba(232,150,10,0.1)', padding: '40px 20px' }}>
        <p
          style={{
            textAlign: 'center',
            fontSize: 'clamp(17px, 5vw, 22px)',
            color: 'rgba(240,232,216,0.75)',
            lineHeight: 1.5,
            fontStyle: 'italic',
            maxWidth: '320px',
            margin: '0 auto',
          }}
        >
          Ce que tu traverses n'est pas un obstacle.{' '}
          <em style={{ color: '#E8960A', fontStyle: 'normal', fontWeight: 600 }}>
            C'est le chemin.
          </em>
        </p>
      </div>

      {/* ── 4. QUI SUIS-JE ──────────────────────────────────────────── */}
      <section id="qui-suis-je" style={{ padding: '72px 16px' }}>
        <div
          className="relative overflow-hidden mx-auto max-w-md"
          data-reveal="left"
          style={{
            background: '#F5EDD8',
            borderRadius: '44px 12px 44px 12px',
            padding: '44px 32px 44px 32px',
          }}
        >
          {/* Chess piece ghost */}
          <div
            className="absolute pointer-events-none select-none"
            data-ghost
            style={{ bottom: '-8px', right: '-8px', ['--ghost-opacity' as any]: 0.065, ['--pop-delay' as any]: '300ms' }}
            aria-hidden="true"
          >
            <ChessKnight className="w-52 h-52 text-[#0C0C0C]" />
          </div>

          <span style={{ fontSize: '10px', color: '#E8960A', textTransform: 'uppercase', letterSpacing: '0.35em', fontWeight: 700, display: 'block', marginBottom: '16px' }}>
            Qui suis-je
          </span>

          <blockquote
            style={{
              fontFamily: "'Anton', sans-serif",
              fontSize: 'clamp(28px, 9vw, 42px)',
              lineHeight: 1.05,
              color: '#0C0C0C',
              marginBottom: '20px',
            }}
          >
            "La confiance ne s'attend pas. Elle se construit."
          </blockquote>

          <div style={{ width: '40px', height: '2px', background: '#E8960A', marginBottom: '20px' }} />

          <p style={{ color: 'rgba(12,12,12,0.8)', lineHeight: 1.7, fontSize: '15px', marginBottom: '14px' }}>
            Je suis Joseph Gbenolo, coach de vie certifié basé à Cotonou. J'accompagne les jeunes adultes qui sentent qu'il y a une version plus entière d'eux-mêmes — mais qui ne savent pas encore comment l'atteindre.
          </p>
          <p style={{ color: 'rgba(12,12,12,0.65)', lineHeight: 1.65, fontSize: '14px', marginBottom: '24px' }}>
            Mon approche : aller au fond des choses, sans détour. Émotions, confiance en soi, mindset — on travaille les trois ensemble, selon ta réalité, pas selon un modèle standard.
          </p>

          <span
            style={{
              display: 'inline-block',
              background: '#0C0C0C',
              color: '#E8960A',
              borderRadius: '999px',
              padding: '8px 18px',
              fontSize: '11px',
              fontWeight: 700,
              textTransform: 'uppercase',
              letterSpacing: '0.1em',
            }}
          >
            Coach de Vie · Certifié
          </span>
        </div>
      </section>

      {/* ── 5. LES 3 PILIERS ────────────────────────────────────────── */}
      <section style={{ padding: '72px 20px' }}>
        <div data-reveal>
        <p style={{ fontSize: '10px', color: '#E8960A', textTransform: 'uppercase', letterSpacing: '0.35em', fontWeight: 700, marginBottom: '8px' }}>
          Ma pratique
        </p>
        <h2
          style={{
            fontFamily: "'Anton', sans-serif",
            fontSize: 'clamp(38px, 14vw, 64px)',
            lineHeight: 0.95,
            color: '#F0E8D8',
            marginBottom: '48px',
          }}
        >
          3 PILIERS
        </h2>
        </div>

        <div className="flex flex-col gap-5 max-w-md mx-auto">
          {/* Pillar 1 — full width, jagged corners top-right / bottom-left */}
          <div
            className="relative overflow-hidden"
            data-reveal="left"
            style={{
              background: '#141414',
              borderRadius: '8px 36px 8px 36px',
              border: '1px solid rgba(232,150,10,0.15)',
              padding: '32px 28px',
            }}
          >
            <span
              className="absolute pointer-events-none select-none"
              style={{
                fontFamily: "'Anton', sans-serif",
                fontSize: '108px',
                color: '#E8960A',
                opacity: 0.06,
                top: '-10px',
                right: '12px',
                lineHeight: 1,
              }}
              aria-hidden="true"
            >
              01
            </span>
            <span style={{ fontSize: '10px', color: '#E8960A', textTransform: 'uppercase', letterSpacing: '0.3em', fontWeight: 700, display: 'block', marginBottom: '12px' }}>
              Émotions
            </span>
            <h3
              style={{ fontFamily: "'Anton', sans-serif", fontSize: '22px', color: '#F0E8D8', marginBottom: '10px' }}
            >
              COMPRENDRE CE QUI TE GOUVERNE
            </h3>
            <p style={{ color: 'rgba(240,232,216,0.55)', fontSize: '14px', lineHeight: 1.65 }}>
              Tes émotions ne sont pas tes ennemies. Apprendre à les lire, c'est reprendre la main sur tes décisions et retrouver un centre stable.
            </p>
          </div>

          {/* Pillar 2 — amber fill, pushed right */}
          <div
            className="relative overflow-hidden ml-auto"
            data-reveal="right"
            style={{
              background: '#E8960A',
              borderRadius: '36px 8px 36px 8px',
              padding: '32px 28px',
              width: '92%',
              ['--reveal-delay' as any]: '120ms',
            }}
          >
            <span
              className="absolute pointer-events-none select-none"
              style={{
                fontFamily: "'Anton', sans-serif",
                fontSize: '108px',
                color: '#0C0C0C',
                opacity: 0.08,
                top: '-10px',
                right: '12px',
                lineHeight: 1,
              }}
              aria-hidden="true"
            >
              02
            </span>
            <span style={{ fontSize: '10px', color: 'rgba(12,12,12,0.6)', textTransform: 'uppercase', letterSpacing: '0.3em', fontWeight: 700, display: 'block', marginBottom: '12px' }}>
              Confiance
            </span>
            <h3
              style={{ fontFamily: "'Anton', sans-serif", fontSize: '22px', color: '#0C0C0C', marginBottom: '10px' }}
            >
              CONSTRUIRE UNE BASE INDESTRUCTIBLE
            </h3>
            <p style={{ color: 'rgba(12,12,12,0.7)', fontSize: '14px', lineHeight: 1.65 }}>
              La confiance en soi n'est pas un trait de caractère. C'est une compétence qui se développe — avec méthode, pas par chance.
            </p>
          </div>

          {/* Pillar 3 — dark warm, pushed left, organic corners */}
          <div
            className="relative overflow-hidden"
            data-reveal="left"
            style={{
              background: '#1A1510',
              borderRadius: '36px 8px 36px 8px',
              border: '1px solid rgba(232,150,10,0.22)',
              padding: '32px 28px',
              width: '92%',
              ['--reveal-delay' as any]: '240ms',
            }}
          >
            <span
              className="absolute pointer-events-none select-none"
              style={{
                fontFamily: "'Anton', sans-serif",
                fontSize: '108px',
                color: '#E8960A',
                opacity: 0.06,
                top: '-10px',
                right: '12px',
                lineHeight: 1,
              }}
              aria-hidden="true"
            >
              03
            </span>
            <span style={{ fontSize: '10px', color: '#E8960A', textTransform: 'uppercase', letterSpacing: '0.3em', fontWeight: 700, display: 'block', marginBottom: '12px' }}>
              Mindset
            </span>
            <h3
              style={{ fontFamily: "'Anton', sans-serif", fontSize: '22px', color: '#F0E8D8', marginBottom: '10px' }}
            >
              PENSER AUTREMENT, AGIR DIFFÉREMMENT
            </h3>
            <p style={{ color: 'rgba(240,232,216,0.55)', fontSize: '14px', lineHeight: 1.65 }}>
              Tes croyances limitantes ne sont pas des vérités gravées dans le marbre. Avec les bons outils, le schéma change — pour de bon.
            </p>
          </div>
        </div>
      </section>

      {/* ── 6. TÉMOIGNAGES VIDÉO ────────────────────────────────────── */}
      <section style={{ padding: '72px 0' }}>
        <div style={{ padding: '0 20px 32px' }} data-reveal>
          <p style={{ fontSize: '10px', color: '#E8960A', textTransform: 'uppercase', letterSpacing: '0.35em', fontWeight: 700, marginBottom: '8px' }}>
            Retours
          </p>
          <h2
            style={{
              fontFamily: "'Anton', sans-serif",
              fontSize: 'clamp(38px, 14vw, 64px)',
              lineHeight: 0.95,
              color: '#F0E8D8',
            }}
          >
            ILS L'ONT VÉCU
          </h2>
        </div>

        {/* Horizontal carousel */}
        <div
          ref={carouselRef}
          className="carousel-scroll"
          data-reveal="scale"
          style={{
            display: 'flex',
            gap: '16px',
            overflowX: 'auto',
            paddingLeft: '20px',
            paddingRight: '20px',
            paddingBottom: '8px',
            ['--reveal-delay' as any]: '100ms',
          }}
        >
          {/* Card 1 */}
          <div
            style={{
              flexShrink: 0,
              width: '74vw',
              maxWidth: '284px',
              scrollSnapAlign: 'start',
              background: '#141414',
              borderRadius: '20px',
              padding: '24px',
              border: '1px solid rgba(240,232,216,0.07)',
            }}
          >
            <div
              style={{
                background: '#1C1C1C',
                borderRadius: '12px',
                height: '148px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                marginBottom: '16px',
                flexDirection: 'column',
                gap: '8px',
              }}
            >
              <div
                style={{
                  width: '44px',
                  height: '44px',
                  borderRadius: '50%',
                  background: '#2A2A2A',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                <svg viewBox="0 0 24 24" width="18" height="18" fill="rgba(240,232,216,0.25)">
                  <path d="M8 5v14l11-7z" />
                </svg>
              </div>
              <p style={{ fontSize: '11px', color: 'rgba(240,232,216,0.28)' }}>Bientôt disponible</p>
            </div>
            <p style={{ fontSize: '13px', color: 'rgba(240,232,216,0.55)', lineHeight: 1.6, fontStyle: 'italic', marginBottom: '10px' }}>
              "Un accompagnement qui change vraiment la donne."
            </p>
            <p style={{ fontSize: '10px', color: '#E8960A', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.08em' }}>
              — Client accompagné
            </p>
          </div>

          {/* Card 2 — FEATURED, center */}
          <div
            style={{
              flexShrink: 0,
              width: '82vw',
              maxWidth: '316px',
              scrollSnapAlign: 'start',
              background: '#1A1510',
              borderRadius: '20px',
              padding: '28px',
              border: '2px solid #E8960A',
            }}
          >
            <div
              style={{
                background: '#241A08',
                borderRadius: '12px',
                height: '168px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                marginBottom: '16px',
                flexDirection: 'column',
                gap: '8px',
                position: 'relative',
                overflow: 'hidden',
              }}
            >
              {/* Corner light */}
              <div
                style={{
                  position: 'absolute',
                  top: 0,
                  right: 0,
                  width: '80px',
                  height: '80px',
                  background: 'linear-gradient(225deg, rgba(232,150,10,0.22) 0%, transparent 70%)',
                }}
              />
              <div
                style={{
                  width: '52px',
                  height: '52px',
                  borderRadius: '50%',
                  background: '#E8960A',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                <svg viewBox="0 0 24 24" width="22" height="22" fill="#0C0C0C">
                  <path d="M8 5v14l11-7z" />
                </svg>
              </div>
              <p style={{ fontSize: '12px', color: '#E8960A', fontWeight: 600 }}>Voir le témoignage</p>
            </div>
            <p style={{ fontSize: '14px', color: 'rgba(240,232,216,0.8)', lineHeight: 1.6, fontStyle: 'italic', marginBottom: '10px' }}>
              "Je ne pensais pas que ça pouvait aller aussi vite et aussi loin."
            </p>
            <p style={{ fontSize: '10px', color: '#E8960A', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.08em' }}>
              — Participant au coaching
            </p>
          </div>

          {/* Card 3 — cut off at edge */}
          <div
            style={{
              flexShrink: 0,
              width: '74vw',
              maxWidth: '284px',
              scrollSnapAlign: 'start',
              background: '#141414',
              borderRadius: '20px',
              padding: '24px',
              border: '1px solid rgba(240,232,216,0.07)',
              marginRight: '20px',
            }}
          >
            <div
              style={{
                background: '#1C1C1C',
                borderRadius: '12px',
                height: '148px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                marginBottom: '16px',
                flexDirection: 'column',
                gap: '8px',
              }}
            >
              <div
                style={{
                  width: '44px',
                  height: '44px',
                  borderRadius: '50%',
                  background: '#2A2A2A',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                <svg viewBox="0 0 24 24" width="18" height="18" fill="rgba(240,232,216,0.25)">
                  <path d="M8 5v14l11-7z" />
                </svg>
              </div>
              <p style={{ fontSize: '11px', color: 'rgba(240,232,216,0.28)' }}>Bientôt disponible</p>
            </div>
            <p style={{ fontSize: '13px', color: 'rgba(240,232,216,0.55)', lineHeight: 1.6, fontStyle: 'italic', marginBottom: '10px' }}>
              "Enfin une clarté sur qui je veux vraiment devenir."
            </p>
            <p style={{ fontSize: '10px', color: '#E8960A', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.08em' }}>
              — Jeune professionnelle, 27 ans
            </p>
          </div>
        </div>

        <p style={{ textAlign: 'center', fontSize: '11px', color: 'rgba(240,232,216,0.25)', marginTop: '12px' }}>
          ← Glisse pour explorer →
        </p>
      </section>

      {/* ── 7. LA MÉTHODE ───────────────────────────────────────────── */}
      <section style={{ padding: '72px 20px', background: '#0F0D08' }}>
        <div data-reveal>
        <p style={{ fontSize: '10px', color: '#E8960A', textTransform: 'uppercase', letterSpacing: '0.35em', fontWeight: 700, marginBottom: '8px' }}>
          Comment ça marche
        </p>
        <h2
          style={{
            fontFamily: "'Anton', sans-serif",
            fontSize: 'clamp(38px, 14vw, 64px)',
            lineHeight: 0.95,
            color: '#F0E8D8',
            marginBottom: '52px',
          }}
        >
          LA MÉTHODE
        </h2>
        </div>

        <div className="max-w-md mx-auto" style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
          {([
            {
              n: '01',
              title: 'On pose le diagnostic',
              desc: "Premier échange pour comprendre où tu en es, ce qui te freine réellement, et ce que tu veux au fond.",
              side: 'left' as const,
            },
            {
              n: '02',
              title: 'On construit ton plan',
              desc: "On définit ensemble tes axes de travail — émotions, confiance, mindset — adaptés à ta réalité, pas à un modèle générique.",
              side: 'right' as const,
            },
            {
              n: '03',
              title: 'On travaille en profondeur',
              desc: "Des séances régulières, des outils concrets, un espace pour progresser sans se juger. Tu avances à ton rythme.",
              side: 'left' as const,
            },
            {
              n: '04',
              title: 'Tu restes ancré(e)',
              desc: "Le vrai résultat : un changement qui tient dans le temps. Pas juste une révélation de session — une transformation durable.",
              side: 'right' as const,
            },
          ] as const).map((step, i) => (
            <div
              key={i}
              data-reveal={step.side === 'right' ? 'right' : 'left'}
              style={{
                display: 'flex',
                justifyContent: step.side === 'right' ? 'flex-end' : 'flex-start',
                marginBottom: '8px',
                position: 'relative',
                ['--reveal-delay' as any]: `${i * 90}ms`,
              }}
            >
              {/* connector dot + line */}
              {i < 3 && (
                <div
                  style={{
                    position: 'absolute',
                    bottom: '-18px',
                    [step.side === 'left' ? 'left' : 'right']: '32px',
                    width: '1px',
                    height: '18px',
                    background: 'linear-gradient(to bottom, rgba(232,150,10,0.35), transparent)',
                    zIndex: 0,
                  }}
                />
              )}
              <div
                style={{
                  position: 'relative',
                  overflow: 'hidden',
                  background: '#141414',
                  borderRadius: step.side === 'left' ? '6px 28px 28px 6px' : '28px 6px 6px 28px',
                  border: '1px solid rgba(232,150,10,0.12)',
                  padding: '24px 24px 24px 24px',
                  width: '88%',
                }}
              >
                <span
                  style={{
                    position: 'absolute',
                    fontFamily: "'Anton', sans-serif",
                    fontSize: '80px',
                    color: '#E8960A',
                    opacity: 0.05,
                    top: '-8px',
                    [step.side === 'left' ? 'right' : 'left']: '8px',
                    lineHeight: 1,
                    pointerEvents: 'none',
                    userSelect: 'none',
                  }}
                  aria-hidden="true"
                >
                  {step.n}
                </span>
                <span style={{ fontFamily: "'Anton', sans-serif", fontSize: '28px', color: '#E8960A', display: 'block', marginBottom: '4px' }}>
                  {step.n}
                </span>
                <h3 style={{ fontFamily: "'Anton', sans-serif", fontSize: '17px', color: '#F0E8D8', marginBottom: '8px', textTransform: 'uppercase' }}>
                  {step.title}
                </h3>
                <p style={{ fontSize: '13px', color: 'rgba(240,232,216,0.55)', lineHeight: 1.65 }}>
                  {step.desc}
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ── 8. CTA FINAL ────────────────────────────────────────────── */}
      <section style={{ background: '#E8960A', padding: '80px 20px', position: 'relative', overflow: 'hidden' }}>
        {/* Chess piece echo */}
        <div
          style={{
            position: 'absolute',
            right: '-20px',
            top: '50%',
            transform: 'translateY(-50%)',
            pointerEvents: 'none',
            zIndex: 0,
          }}
          aria-hidden="true"
        >
          <div data-ghost style={{ ['--ghost-opacity' as any]: 0.1, ['--pop-delay' as any]: '200ms' }}>
            <ChessKnight className="w-52 h-52 text-[#0C0C0C]" />
          </div>
        </div>

        <div className="relative max-w-md mx-auto text-center" data-reveal="scale">
          <p style={{ fontSize: '10px', color: 'rgba(12,12,12,0.55)', textTransform: 'uppercase', letterSpacing: '0.35em', fontWeight: 700, marginBottom: '16px' }}>
            Prochaine étape
          </p>
          <h2
            style={{
              fontFamily: "'Anton', sans-serif",
              fontSize: 'clamp(44px, 16vw, 76px)',
              lineHeight: 0.91,
              color: '#0C0C0C',
              marginBottom: '20px',
            }}
          >
            TU ES PRÊT(E)<br />À COMMENCER ?
          </h2>
          <p style={{ color: 'rgba(12,12,12,0.65)', fontSize: '15px', lineHeight: 1.65, marginBottom: '32px', maxWidth: '300px', margin: '0 auto 32px' }}>
            Un message suffit. On discute de là où tu en es, sans engagement, sans pression. Juste deux personnes qui parlent vrai.
          </p>
          <a
            href={WA_LINK}
            target="_blank"
            rel="noopener noreferrer"
            className="pulse-cta"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '12px',
              background: '#0C0C0C',
              color: '#E8960A',
              borderRadius: '999px',
              padding: '18px 36px',
              fontSize: '16px',
              fontWeight: 700,
              transition: 'background 0.2s',
            }}
          >
            <span style={{ width: '22px', height: '22px', display: 'flex' }}>{WA_ICON}</span>
            Écrire sur WhatsApp
          </a>
        </div>
      </section>

      {/* ── 9. FOOTER ───────────────────────────────────────────────── */}
      <footer style={{ background: '#080808', padding: '56px 20px 36px' }}>
        <div className="max-w-md mx-auto">
          {/* Name + knight */}
          <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', marginBottom: '32px' }}>
            <div>
              <p
                style={{
                  fontFamily: "'Anton', sans-serif",
                  fontSize: '32px',
                  color: '#E8960A',
                  letterSpacing: '0.04em',
                  lineHeight: 1,
                }}
              >
                JOSEPH
              </p>
              <p
                style={{
                  fontFamily: "'Anton', sans-serif",
                  fontSize: '32px',
                  color: '#F0E8D8',
                  letterSpacing: '0.04em',
                  lineHeight: 1,
                  marginTop: '-2px',
                  marginBottom: '8px',
                }}
              >
                GBENOLO
              </p>
              <p style={{ fontSize: '10px', color: 'rgba(240,232,216,0.35)', textTransform: 'uppercase', letterSpacing: '0.25em' }}>
                Coach de Vie · Cotonou, Bénin
              </p>
            </div>
            <div style={{ opacity: 0.55 }}><ChessKnight className="w-14 h-14 text-[#E8960A]" /></div>
          </div>

          <div style={{ height: '1px', background: 'rgba(232,150,10,0.14)', marginBottom: '28px' }} />

          <p style={{ fontSize: '14px', color: 'rgba(240,232,216,0.45)', fontStyle: 'italic', lineHeight: 1.6, marginBottom: '28px' }}>
            "La maîtrise de soi n'est pas une destination. C'est un mouvement quotidien."
          </p>

          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '16px' }}>
            <a
              href={IG_LINK}
              target="_blank"
              rel="noopener noreferrer"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '8px',
                color: 'rgba(240,232,216,0.45)',
                fontSize: '13px',
                textDecoration: 'none',
                transition: 'color 0.2s',
              }}
            >
              <span style={{ width: '16px', height: '16px', display: 'flex' }}>{IG_ICON}</span>
              Instagram
            </a>
            <WaBtn>WhatsApp</WaBtn>
          </div>

          <p style={{ fontSize: '11px', color: 'rgba(240,232,216,0.18)', marginTop: '40px', textAlign: 'center' }}>
            © 2025 Joseph Gbenolo · Tous droits réservés
          </p>
        </div>
      </footer>

    </div>
  )
}
