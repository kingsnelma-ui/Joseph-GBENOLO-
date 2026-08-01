import React, { useEffect, useRef, useState, useCallback, type CSSProperties } from 'react'
import josephPhoto from './imports/SaveClip.App_538018834_17898223728257726_7580939303002389823_n.jpg'

const WA = 'https://wa.me/22900000000'

// ─── HOOKS ────────────────────────────────────────────────────────────────────

function useReveal(delay = 0) {
  const ref = useRef<HTMLDivElement>(null)
  const [show, setShow] = useState(false)
  useEffect(() => {
    const el = ref.current
    if (!el) return
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) { setShow(true); obs.disconnect() } },
      { threshold: 0.08 }
    )
    obs.observe(el)
    return () => obs.disconnect()
  }, [])
  const style: CSSProperties = {
    opacity: show ? 1 : 0,
    transform: show ? 'translateY(0)' : 'translateY(28px)',
    transition: `opacity 0.75s cubic-bezier(0.16,1,0.3,1) ${delay}ms, transform 0.75s cubic-bezier(0.16,1,0.3,1) ${delay}ms`,
  }
  return { ref, style }
}

function useScrolled() {
  const [s, setS] = useState(false)
  useEffect(() => {
    const fn = () => setS(window.scrollY > 48)
    window.addEventListener('scroll', fn, { passive: true })
    return () => window.removeEventListener('scroll', fn)
  }, [])
  return s
}

// ─── SVG CHESS PIECES ─────────────────────────────────────────────────────────

function King({ sz = 40, col = '#F59E0B', op = 1 }: { sz?: number; col?: string; op?: number }) {
  return (
    <svg width={sz} height={sz} viewBox="0 0 100 124" fill={col} opacity={op}>
      <rect x="44" y="0" width="12" height="22" rx="2" />
      <rect x="33" y="7" width="34" height="11" rx="2" />
      <rect x="20" y="28" width="60" height="14" rx="2" />
      <path d="M16 42 L22 94 H78 L84 42 Z" />
      <rect x="8" y="94" width="84" height="17" rx="3" />
      <rect x="26" y="20" width="48" height="12" rx="2" opacity="0.5" />
    </svg>
  )
}

function Knight({ sz = 40, col = '#F59E0B', op = 1 }: { sz?: number; col?: string; op?: number }) {
  return (
    <svg width={sz} height={sz} viewBox="0 0 100 124" fill={col} opacity={op}>
      <path d="M18 110 L20 72 C16 62 12 46 16 32 C20 16 36 6 54 6 C64 6 72 10 78 18 L70 30 C66 26 60 22 54 22 C42 22 36 32 36 44 L40 54 L50 48 L54 68 L82 68 L82 84 L78 110 Z" />
      <rect x="8" y="110" width="84" height="14" rx="3" />
      <circle cx="44" cy="30" r="5" fill="#080808" opacity={op} />
    </svg>
  )
}

function Pawn({ sz = 40, col = '#F59E0B', op = 1 }: { sz?: number; col?: string; op?: number }) {
  return (
    <svg width={sz} height={sz} viewBox="0 0 100 124" fill={col} opacity={op}>
      <circle cx="50" cy="24" r="20" />
      <path d="M36 44 L28 80 H72 L64 44 Z" />
      <rect x="16" y="80" width="68" height="14" rx="2" />
      <rect x="8" y="94" width="84" height="18" rx="3" />
    </svg>
  )
}

// ─── WA ICON ──────────────────────────────────────────────────────────────────

function WAIcon({ sz = 20 }: { sz?: number }) {
  return (
    <svg width={sz} height={sz} viewBox="0 0 24 24" fill="currentColor">
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" />
    </svg>
  )
}

// ─── MAGNETIC BUTTON ──────────────────────────────────────────────────────────

function MagBtn({ href, children, dark = false }: { href: string; children: React.ReactNode; dark?: boolean }) {
  const [off, setOff] = useState({ x: 0, y: 0 })
  const r = useRef<HTMLAnchorElement>(null)

  const onMove = useCallback((e: React.MouseEvent) => {
    const el = r.current
    if (!el) return
    const rect = el.getBoundingClientRect()
    const x = (e.clientX - rect.left - rect.width / 2) * 0.28
    const y = (e.clientY - rect.top - rect.height / 2) * 0.28
    setOff({ x, y })
  }, [])

  const onLeave = useCallback(() => setOff({ x: 0, y: 0 }), [])

  return (
    <a
      ref={r}
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      onMouseMove={onMove}
      onMouseLeave={onLeave}
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        gap: '10px',
        background: dark ? '#080808' : '#22C55E',
        color: dark ? '#F59E0B' : '#fff',
        padding: '16px 30px',
        borderRadius: '100px',
        fontSize: '15px',
        fontWeight: 700,
        textDecoration: 'none',
        transform: `translate(${off.x}px, ${off.y}px)`,
        transition: 'transform 0.35s cubic-bezier(0.16,1,0.3,1), box-shadow 0.25s',
        boxShadow: dark
          ? '0 8px 32px rgba(0,0,0,0.5)'
          : `0 ${Math.abs(off.y) + 4}px ${24 + Math.abs(off.y) * 2}px rgba(34,197,94,${0.2 + Math.abs(off.y) * 0.02})`,
      }}
    >
      {children}
    </a>
  )
}

// ─── CHESS BOARD PATTERN ──────────────────────────────────────────────────────

function ChessGrid({ opacity = 0.07, squareSize = 36, color = '245,158,11' }: {
  opacity?: number; squareSize?: number; color?: string
}) {
  return (
    <div style={{
      position: 'absolute',
      inset: 0,
      backgroundImage: `repeating-conic-gradient(rgba(${color},${opacity}) 0% 25%, transparent 0% 50%)`,
      backgroundSize: `${squareSize}px ${squareSize}px`,
      pointerEvents: 'none',
    }} />
  )
}

// ─── NAV ──────────────────────────────────────────────────────────────────────

function Nav() {
  const scrolled = useScrolled()
  return (
    <nav style={{
      position: 'fixed',
      top: 0, left: 0, right: 0,
      zIndex: 200,
      height: '62px',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      padding: '0 20px',
      background: scrolled ? 'rgba(8,8,8,0.88)' : 'transparent',
      backdropFilter: scrolled ? 'blur(24px)' : 'none',
      borderBottom: scrolled ? '1px solid rgba(245,158,11,0.1)' : '1px solid transparent',
      transition: 'background 0.4s, border-color 0.4s, backdrop-filter 0.4s',
    }}>
      <div style={{
        fontFamily: "'Fraunces', serif",
        fontSize: '20px',
        fontWeight: 900,
        letterSpacing: '-0.03em',
        display: 'flex',
        alignItems: 'baseline',
        gap: '6px',
      }}>
        <span style={{ color: '#F59E0B' }}>J.</span>
        <span style={{ color: 'rgba(245,237,216,0.35)', fontSize: '11px', fontFamily: 'Outfit', fontWeight: 500, letterSpacing: '0.08em' }}>
          GBENOLO
        </span>
      </div>

      <a
        href={WA}
        target="_blank"
        rel="noopener noreferrer"
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: '7px',
          background: '#22C55E',
          color: '#fff',
          padding: '9px 18px',
          borderRadius: '100px',
          fontSize: '13px',
          fontWeight: 600,
          textDecoration: 'none',
          transition: 'transform 0.2s, box-shadow 0.2s',
        }}
        onMouseEnter={e => {
          e.currentTarget.style.transform = 'scale(1.05)'
          e.currentTarget.style.boxShadow = '0 8px 28px rgba(34,197,94,0.4)'
        }}
        onMouseLeave={e => {
          e.currentTarget.style.transform = 'scale(1)'
          e.currentTarget.style.boxShadow = 'none'
        }}
      >
        <WAIcon sz={15} />
        WhatsApp
      </a>
    </nav>
  )
}

// ─── HERO ─────────────────────────────────────────────────────────────────────

function Hero() {
  const [loaded, setLoaded] = useState(false)
  const [cur, setCur] = useState({ x: 0, y: 0 })

  useEffect(() => { setTimeout(() => setLoaded(true), 80) }, [])

  const fade = (d: number): CSSProperties => ({
    opacity: loaded ? 1 : 0,
    transform: loaded ? 'translateY(0)' : 'translateY(20px)',
    transition: `opacity 0.75s ease ${d}ms, transform 0.75s cubic-bezier(0.16,1,0.3,1) ${d}ms`,
  })

  return (
    <section
      onMouseMove={e => setCur({ x: e.clientX, y: e.clientY })}
      style={{
        position: 'relative',
        minHeight: '100svh',
        background: '#080808',
        overflow: 'hidden',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'flex-end',
      }}
    >
      {/* Cursor ambient glow */}
      <div style={{
        position: 'absolute',
        left: cur.x - 240,
        top: cur.y - 240,
        width: 480,
        height: 480,
        background: 'radial-gradient(circle, rgba(245,158,11,0.07) 0%, transparent 65%)',
        borderRadius: '50%',
        pointerEvents: 'none',
        transition: 'left 0.06s linear, top 0.06s linear',
        zIndex: 2,
      }} />

      {/* Deep amber glow behind photo */}
      <div style={{
        position: 'absolute',
        right: '-5%',
        top: '10%',
        width: '65%',
        height: '80%',
        background: 'radial-gradient(ellipse at 60% 40%, rgba(245,158,11,0.14) 0%, rgba(245,158,11,0.04) 45%, transparent 70%)',
        pointerEvents: 'none',
        zIndex: 1,
      }} />

      {/* Joseph's photo — right panel, atmospheric fade */}
      <div style={{
        position: 'absolute',
        right: 0,
        top: 0,
        bottom: 0,
        width: 'clamp(220px, 62%, 440px)',
        zIndex: 3,
      }}>
        <img
          src={josephPhoto}
          alt="Joseph Gbenolo — Coach de vie"
          onLoad={() => setLoaded(true)}
          style={{
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            objectPosition: 'top center',
            maskImage: [
              'linear-gradient(to right, transparent 0%, rgba(0,0,0,0.5) 18%, black 38%, black 82%, transparent 100%)',
              'linear-gradient(to top, transparent 0%, black 16%)',
            ].join(', '),
            maskComposite: 'intersect',
            WebkitMaskImage: [
              'linear-gradient(to right, transparent 0%, rgba(0,0,0,0.5) 18%, black 38%, black 82%, transparent 100%)',
              'linear-gradient(to top, transparent 0%, black 16%)',
            ].join(', '),
            WebkitMaskComposite: 'destination-in',
            opacity: loaded ? 1 : 0,
            transition: 'opacity 1s ease 0.2s',
          }}
        />
      </div>

      {/* Perspective chess floor */}
      <div style={{
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        height: '200px',
        zIndex: 4,
        overflow: 'hidden',
        pointerEvents: 'none',
      }}>
        <div style={{
          width: '100%',
          height: '360px',
          backgroundImage: 'repeating-conic-gradient(rgba(245,158,11,0.09) 0% 25%, rgba(245,158,11,0.03) 0% 50%)',
          backgroundSize: '44px 44px',
          transform: 'perspective(350px) rotateX(52deg)',
          transformOrigin: 'bottom center',
          maskImage: 'linear-gradient(to top, rgba(0,0,0,0.9) 0%, transparent 85%)',
          WebkitMaskImage: 'linear-gradient(to top, rgba(0,0,0,0.9) 0%, transparent 85%)',
        }} />
      </div>

      {/* Floating badge A — top right, over photo */}
      <div
        className="float-a"
        style={{
          position: 'absolute',
          top: '78px',
          right: '16px',
          zIndex: 20,
          background: 'rgba(8,8,8,0.75)',
          border: '1px solid rgba(245,158,11,0.45)',
          backdropFilter: 'blur(20px)',
          WebkitBackdropFilter: 'blur(20px)',
          borderRadius: '14px',
          padding: '13px 16px',
          display: 'flex',
          alignItems: 'center',
          gap: '10px',
          opacity: loaded ? 1 : 0,
          transition: 'opacity 0.5s ease 0.9s',
        }}
      >
        <King sz={26} />
        <div>
          <div style={{ fontSize: '9px', fontWeight: 700, color: '#F59E0B', letterSpacing: '0.12em', lineHeight: 1.2 }}>COACH CERTIFIÉ</div>
          <div style={{ fontSize: '10px', color: 'rgba(245,237,216,0.55)', marginTop: '1px' }}>Cotonou · Bénin</div>
        </div>
      </div>

      {/* Floating badge B — mid, amber pill */}
      <div
        className="float-b"
        style={{
          position: 'absolute',
          top: '44%',
          left: '12px',
          zIndex: 20,
          background: '#F59E0B',
          borderRadius: '100px',
          padding: '8px 16px',
          display: 'flex',
          alignItems: 'center',
          gap: '7px',
          opacity: loaded ? 1 : 0,
          transition: 'opacity 0.5s ease 1.1s',
        }}
      >
        <span style={{ fontSize: '16px', lineHeight: 1 }}>♟</span>
        <span style={{ fontSize: '11px', fontWeight: 700, color: '#080808', letterSpacing: '0.05em' }}>
          STRATÉGIE · MAÎTRISE
        </span>
      </div>

      {/* Hero text */}
      <div style={{
        position: 'relative',
        zIndex: 10,
        padding: '0 20px 76px',
        maxWidth: '480px',
      }}>

        {/* Pre-label */}
        <div style={{
          ...fade(100),
          fontSize: '11px',
          fontWeight: 600,
          letterSpacing: '0.16em',
          color: '#F59E0B',
          textTransform: 'uppercase',
          marginBottom: '14px',
        }}>
          ♟ &nbsp; Hey, je suis
        </div>

        {/* Name — film poster scale */}
        <h1 style={{
          fontFamily: "'Fraunces', serif",
          margin: '0 0 6px',
          lineHeight: 0.88,
          letterSpacing: '-0.04em',
        }}>
          {/* JOSEPH — stroke / outlined for depth over photo */}
          <span
            style={{
              ...fade(200),
              display: 'block',
              fontSize: 'clamp(68px, 20vw, 130px)',
              fontWeight: 900,
              color: 'transparent',
              WebkitTextStroke: '1.5px rgba(245,237,216,0.7)',
            }}
          >
            JOSEPH
          </span>
          {/* GBENOLO — solid amber fill */}
          <span
            style={{
              ...fade(320),
              display: 'block',
              fontSize: 'clamp(68px, 20vw, 130px)',
              fontWeight: 900,
              fontStyle: 'italic',
              color: '#F59E0B',
            }}
          >
            GBENOLO
          </span>
        </h1>

        {/* Subtitle */}
        <p style={{
          ...fade(460),
          fontSize: '14px',
          lineHeight: 1.65,
          color: 'rgba(245,237,216,0.5)',
          fontWeight: 300,
          maxWidth: '260px',
          margin: '18px 0 26px',
        }}>
          Coach de vie certifié. Confiance en soi, gestion des émotions et mindset stratégique.
        </p>

        {/* WA CTA */}
        <div style={{ ...fade(560) }}>
          <MagBtn href={WA}>
            <WAIcon sz={20} />
            Me contacter
          </MagBtn>
        </div>

        {/* Service taxonomy */}
        <div style={{
          ...fade(700),
          display: 'flex',
          gap: '24px',
          marginTop: '36px',
          paddingTop: '20px',
          borderTop: '1px solid rgba(245,237,216,0.07)',
        }}>
          {[
            { n: '01', label: 'Confiance' },
            { n: '02', label: 'Émotions' },
            { n: '03', label: 'Mindset' },
          ].map(({ n, label }) => (
            <div key={n}>
              <div style={{ fontSize: '9px', color: '#F59E0B', fontWeight: 700, letterSpacing: '0.12em', marginBottom: '3px' }}>{n}</div>
              <div style={{ fontSize: '11px', color: 'rgba(245,237,216,0.38)', fontWeight: 500, letterSpacing: '0.04em' }}>{label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

// ─── TICKER ───────────────────────────────────────────────────────────────────

const WORDS = ['STRATÉGIE', '♟', 'MAÎTRISE DE SOI', '♟', 'MINDSET', '♟', 'CONFIANCE', '♟', 'COTONOU · BÉNIN', '♟', 'COACHING CERTIFIÉ', '♟', 'TRANSFORMATION', '♟']

function Ticker() {
  const all = [...WORDS, ...WORDS]
  return (
    <div style={{ background: '#F59E0B', padding: '12px 0', overflow: 'hidden', position: 'relative' }}>
      <ChessGrid opacity={0.1} squareSize={22} color="0,0,0" />
      <div className="ticker-track" style={{ position: 'relative', zIndex: 1 }}>
        {all.map((w, i) => (
          <span key={i} style={{
            fontSize: '11px',
            fontWeight: 700,
            letterSpacing: '0.12em',
            color: 'rgba(0,0,0,0.6)',
            marginRight: '28px',
            whiteSpace: 'nowrap',
          }}>{w}</span>
        ))}
      </div>
    </div>
  )
}

// ─── BENTO SERVICES ───────────────────────────────────────────────────────────

function BentoCell({
  children,
  amber = false,
  span2 = false,
  minH = 180,
  delay = 0,
}: {
  children: React.ReactNode
  amber?: boolean
  span2?: boolean
  minH?: number
  delay?: number
}) {
  const { ref, style: rStyle } = useReveal(delay)
  const [hov, setHov] = useState(false)

  return (
    <div
      ref={ref}
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => setHov(false)}
      style={{
        ...rStyle,
        gridColumn: span2 ? '1 / -1' : undefined,
        background: amber ? '#F59E0B' : '#111',
        border: `1px solid ${hov && !amber ? 'rgba(245,158,11,0.3)' : amber ? 'transparent' : 'rgba(255,255,255,0.04)'}`,
        borderRadius: '18px',
        padding: '26px',
        position: 'relative',
        overflow: 'hidden',
        minHeight: `${minH}px`,
        transform: hov ? 'translateY(-3px)' : 'translateY(0)',
        boxShadow: hov && !amber ? '0 20px 60px rgba(245,158,11,0.12)' : 'none',
        transition: 'transform 0.32s cubic-bezier(0.16,1,0.3,1), border-color 0.3s, box-shadow 0.3s',
        cursor: 'default',
      }}
    >
      {children}
    </div>
  )
}

function BentoServices() {
  const { ref: hRef, style: hStyle } = useReveal(0)

  return (
    <section style={{ padding: '88px 18px', background: '#080808' }}>
      <div style={{ maxWidth: '660px', margin: '0 auto' }}>

        {/* Header */}
        <div ref={hRef} style={{ ...hStyle, marginBottom: '40px' }}>
          <div style={{
            fontSize: '10px', fontWeight: 700, letterSpacing: '0.2em',
            color: '#F59E0B', textTransform: 'uppercase', marginBottom: '10px',
          }}>
            — Ce que je fais
          </div>
          <h2 style={{
            fontFamily: "'Fraunces', serif",
            fontSize: 'clamp(36px, 9vw, 52px)',
            fontWeight: 900,
            lineHeight: 0.95,
            letterSpacing: '-0.03em',
            margin: 0,
          }}>
            Trois axes,<br />
            <span style={{ color: '#F59E0B', fontStyle: 'italic' }}>une stratégie.</span>
          </h2>
        </div>

        {/* Bento grid */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: '1fr 1fr',
          gap: '8px',
        }}>

          {/* A: Confiance — full width, tall */}
          <BentoCell span2 minH={260} delay={60}>
            {/* Ghost king watermark */}
            <div style={{
              position: 'absolute',
              right: '-8px',
              bottom: '-12px',
              pointerEvents: 'none',
            }}>
              <King sz={200} col="#F59E0B" op={0.055} />
            </div>
            {/* Subtle chess corner */}
            <div style={{
              position: 'absolute',
              bottom: 0, left: 0,
              width: '40%',
              height: '40%',
              backgroundImage: 'repeating-conic-gradient(rgba(245,158,11,0.04) 0% 25%, transparent 0% 50%)',
              backgroundSize: '24px 24px',
              borderRadius: '0 0 0 18px',
              pointerEvents: 'none',
            }} />

            <div style={{ position: 'relative', zIndex: 1 }}>
              <div style={{
                display: 'inline-flex', alignItems: 'center', gap: '6px',
                background: 'rgba(245,158,11,0.1)',
                border: '1px solid rgba(245,158,11,0.2)',
                borderRadius: '100px',
                padding: '5px 12px',
                fontSize: '9px', fontWeight: 700, letterSpacing: '0.12em',
                color: '#F59E0B', marginBottom: '22px',
              }}>
                <King sz={12} />
                FONDATION
              </div>
              <h3 style={{
                fontFamily: "'Fraunces', serif",
                fontSize: 'clamp(28px, 7vw, 40px)',
                fontWeight: 900,
                lineHeight: 1.0,
                letterSpacing: '-0.025em',
                margin: '0 0 14px',
                color: '#F5EDD8',
              }}>
                Confiance<br />en soi
              </h3>
              <p style={{
                fontSize: '14px',
                lineHeight: 1.65,
                color: 'rgba(245,237,216,0.5)',
                margin: '0 0 24px',
                maxWidth: '340px',
              }}>
                Développez une assurance intérieure inébranlable. Apprenez à avancer avec autorité, même face à l'incertitude — comme un roi avance sur son échiquier.
              </p>
              <div style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
                <div style={{ width: '32px', height: '1px', background: '#F59E0B', opacity: 0.6 }} />
                <span style={{ fontSize: '10px', color: 'rgba(245,237,216,0.25)', letterSpacing: '0.1em' }}>
                  JOUER EN ROI
                </span>
              </div>
            </div>
          </BentoCell>

          {/* B: Émotions — left half */}
          <BentoCell minH={230} delay={120}>
            <div style={{ position: 'absolute', bottom: '-6px', right: '-6px', pointerEvents: 'none' }}>
              <Knight sz={130} col="#F59E0B" op={0.07} />
            </div>
            <div style={{ position: 'relative', zIndex: 1, height: '100%', display: 'flex', flexDirection: 'column' }}>
              <div style={{
                fontSize: '9px', fontWeight: 700, letterSpacing: '0.14em',
                color: '#F59E0B', marginBottom: '14px',
              }}>
                MAÎTRISE
              </div>
              <h3 style={{
                fontFamily: "'Fraunces', serif",
                fontSize: 'clamp(20px, 5vw, 26px)',
                fontWeight: 900,
                lineHeight: 1.05,
                letterSpacing: '-0.02em',
                margin: '0 0 12px',
              }}>
                Gestion des émotions
              </h3>
              <p style={{
                fontSize: '13px',
                lineHeight: 1.6,
                color: 'rgba(245,237,216,0.45)',
                margin: '0',
                flex: 1,
              }}>
                Transformez vos réactions en réponses choisies. Vos émotions deviennent vos alliées, non vos ennemies.
              </p>
              <div style={{
                marginTop: '18px',
                display: 'flex',
                alignItems: 'center',
                gap: '6px',
              }}>
                <Knight sz={18} />
                <span style={{ fontSize: '10px', color: 'rgba(245,237,216,0.2)', letterSpacing: '0.06em' }}>MAÎTRISER SA PARTIE</span>
              </div>
            </div>
          </BentoCell>

          {/* C: Chess amber accent — right half */}
          <BentoCell amber minH={230} delay={160}>
            <ChessGrid opacity={0.1} squareSize={28} color="0,0,0" />
            <div style={{
              position: 'relative',
              zIndex: 1,
              height: '100%',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between',
            }}>
              <div style={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                flex: 1,
              }}>
                <div style={{ animation: 'slowSpin 40s linear infinite', opacity: 0.25 }}>
                  <King sz={80} col="#000" op={1} />
                </div>
              </div>
              <div style={{ textAlign: 'center' }}>
                <div style={{
                  fontFamily: "'Fraunces', serif",
                  fontSize: '14px',
                  fontWeight: 900,
                  fontStyle: 'italic',
                  color: '#080808',
                  letterSpacing: '-0.01em',
                  lineHeight: 1.2,
                }}>
                  Être roi<br />de sa vie.
                </div>
              </div>
            </div>
          </BentoCell>

          {/* D: Mindset — full width */}
          <BentoCell span2 minH={160} delay={200}>
            <div style={{ position: 'absolute', top: '-30px', left: '-30px', pointerEvents: 'none' }}>
              <Pawn sz={200} col="#F59E0B" op={0.04} />
            </div>
            <div style={{
              position: 'relative',
              zIndex: 1,
              display: 'flex',
              alignItems: 'center',
              gap: '20px',
              flexWrap: 'wrap',
            }}>
              <div style={{ flex: 1, minWidth: '180px' }}>
                <div style={{ fontSize: '9px', fontWeight: 700, letterSpacing: '0.14em', color: '#F59E0B', marginBottom: '10px' }}>
                  TRANSFORMATION
                </div>
                <h3 style={{
                  fontFamily: "'Fraunces', serif",
                  fontSize: 'clamp(22px, 5vw, 30px)',
                  fontWeight: 900,
                  lineHeight: 1.0,
                  letterSpacing: '-0.02em',
                  margin: '0 0 10px',
                }}>
                  Mindset de victoire
                </h3>
                <p style={{
                  fontSize: '13px',
                  lineHeight: 1.6,
                  color: 'rgba(245,237,216,0.45)',
                  margin: 0,
                }}>
                  Reprogrammez vos croyances limitantes. Adoptez la mentalité du stratège — celui qui voit plusieurs coups d'avance.
                </p>
              </div>
              <div style={{
                width: '64px',
                height: '64px',
                background: 'rgba(245,158,11,0.08)',
                border: '1px solid rgba(245,158,11,0.18)',
                borderRadius: '14px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                flexShrink: 0,
                fontSize: '26px',
              }}>
                ♟
              </div>
            </div>
          </BentoCell>

        </div>
      </div>
    </section>
  )
}

// ─── APPROACH ─────────────────────────────────────────────────────────────────

type Step = { n: string; title: string; sub: string; body: string }

function ApproachStep({ step, index, last }: { step: Step; index: number; last: boolean }) {
  const { ref, style } = useReveal(index * 140)
  return (
    <div
      ref={ref}
      style={{
        ...style,
        display: 'flex',
        gap: '22px',
        padding: '30px 0',
        borderBottom: last ? 'none' : '1px solid rgba(245,237,216,0.06)',
        alignItems: 'flex-start',
      }}
    >
      <div style={{
        width: '44px',
        height: '44px',
        background: index === 1 ? '#F59E0B' : 'rgba(245,158,11,0.08)',
        border: index === 1 ? 'none' : '1px solid rgba(245,158,11,0.2)',
        borderRadius: '10px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        fontFamily: "'Fraunces', serif",
        fontSize: '15px',
        fontWeight: 900,
        color: index === 1 ? '#080808' : '#F59E0B',
        flexShrink: 0,
      }}>
        {step.n}
      </div>
      <div>
        <div style={{ fontSize: '11px', color: '#F59E0B', fontWeight: 600, letterSpacing: '0.06em', fontStyle: 'italic', marginBottom: '6px' }}>
          {step.sub}
        </div>
        <h3 style={{
          fontFamily: "'Fraunces', serif",
          fontSize: '24px',
          fontWeight: 700,
          letterSpacing: '-0.015em',
          margin: '0 0 10px',
          color: '#F5EDD8',
        }}>
          {step.title}
        </h3>
        <p style={{ fontSize: '14px', lineHeight: 1.65, color: 'rgba(245,237,216,0.48)', margin: 0 }}>
          {step.body}
        </p>
      </div>
    </div>
  )
}

function Approach() {
  const { ref: hRef, style: hStyle } = useReveal(0)
  const steps: Step[] = [
    { n: '01', title: 'Diagnostic', sub: 'Voir l'échiquier', body: "Comprendre où vous en êtes — vos forces, vos angles morts, votre véritable position sur l'échiquier de votre vie." },
    { n: '02', title: 'Stratégie', sub: 'Planifier ses coups', body: "Construire ensemble un plan de jeu personnel, cohérent avec qui vous êtes et la destination que vous visez." },
    { n: '03', title: 'Exécution', sub: 'Jouer pour gagner', body: "Passer à l'action avec méthode. Ajuster, apprendre, progresser — comme un joueur d'élite qui joue le long terme." },
  ]

  return (
    <section style={{ padding: '88px 18px', background: '#0A0A0A', position: 'relative', overflow: 'hidden' }}>
      <ChessGrid opacity={0.035} squareSize={52} />

      {/* Ghost king */}
      <div style={{ position: 'absolute', right: '-50px', top: '50%', transform: 'translateY(-50%)', pointerEvents: 'none' }}>
        <King sz={320} col="#F59E0B" op={0.035} />
      </div>

      <div style={{ maxWidth: '660px', margin: '0 auto', position: 'relative', zIndex: 1 }}>
        <div ref={hRef} style={{ ...hStyle, marginBottom: '52px' }}>
          <div style={{ fontSize: '10px', fontWeight: 700, letterSpacing: '0.2em', color: '#F59E0B', textTransform: 'uppercase', marginBottom: '10px' }}>
            — Mon approche
          </div>
          <h2 style={{
            fontFamily: "'Fraunces', serif",
            fontSize: 'clamp(36px, 9vw, 52px)',
            fontWeight: 900,
            lineHeight: 0.95,
            letterSpacing: '-0.03em',
            margin: 0,
          }}>
            Trois coups,<br />
            <span style={{ color: '#F59E0B', fontStyle: 'italic' }}>une victoire.</span>
          </h2>
        </div>

        {steps.map((s, i) => (
          <ApproachStep key={s.n} step={s} index={i} last={i === steps.length - 1} />
        ))}
      </div>
    </section>
  )
}

// ─── SOCIAL PROOF STRIP ───────────────────────────────────────────────────────

function SocialStrip() {
  const { ref, style } = useReveal(0)
  return (
    <section ref={ref} style={{ ...style, padding: '60px 18px', background: '#080808' }}>
      <div style={{ maxWidth: '660px', margin: '0 auto' }}>

        <div style={{
          background: '#111',
          border: '1px solid rgba(245,237,216,0.05)',
          borderRadius: '20px',
          padding: '32px 28px',
          display: 'flex',
          flexDirection: 'column',
          gap: '24px',
        }}>
          {/* Top */}
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '16px' }}>
            <div>
              <div style={{ fontSize: '10px', fontWeight: 700, letterSpacing: '0.18em', color: '#F59E0B', marginBottom: '8px' }}>
                — ILS ONT JOUÉ LEUR PARTIE
              </div>
              <h3 style={{
                fontFamily: "'Fraunces', serif",
                fontSize: 'clamp(24px, 6vw, 34px)',
                fontWeight: 900,
                lineHeight: 1.0,
                letterSpacing: '-0.025em',
                margin: 0,
              }}>
                Une communauté<br />
                <span style={{ color: '#F59E0B', fontStyle: 'italic' }}>en mouvement.</span>
              </h3>
            </div>
            <div style={{
              background: 'rgba(245,158,11,0.08)',
              border: '1px solid rgba(245,158,11,0.15)',
              borderRadius: '12px',
              padding: '14px',
            }}>
              <King sz={36} />
            </div>
          </div>

          {/* Silhouette cards — clearly placeholder */}
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '8px' }}>
            {[0, 1].map(i => (
              <div key={i} style={{
                background: 'rgba(245,237,216,0.03)',
                border: '1px solid rgba(245,237,216,0.05)',
                borderRadius: '12px',
                padding: '16px',
                display: 'flex',
                alignItems: 'center',
                gap: '12px',
              }}>
                {/* Silhouette avatar */}
                <svg width="40" height="40" viewBox="0 0 40 40">
                  <circle cx="20" cy="20" r="20" fill={`rgba(245,158,11,${0.1 + i * 0.03})`} />
                  <circle cx="20" cy="15" r="7" fill={`rgba(245,158,11,${0.35 + i * 0.05})`} />
                  <ellipse cx="20" cy="34" rx="11" ry="8" fill={`rgba(245,158,11,${0.35 + i * 0.05})`} />
                </svg>
                <div style={{ flex: 1 }}>
                  <div style={{ height: '8px', background: 'rgba(245,237,216,0.1)', borderRadius: '4px', width: '70%', marginBottom: '6px' }} />
                  <div style={{ height: '6px', background: 'rgba(245,237,216,0.06)', borderRadius: '4px', width: '50%' }} />
                </div>
              </div>
            ))}
          </div>

          <p style={{ fontSize: '11px', color: 'rgba(245,237,216,0.25)', textAlign: 'center', margin: 0, letterSpacing: '0.04em' }}>
            Témoignages disponibles sur demande
          </p>
        </div>
      </div>
    </section>
  )
}

// ─── CTA SECTION ──────────────────────────────────────────────────────────────

function CTA() {
  const { ref, style } = useReveal(0)
  return (
    <section style={{ position: 'relative', overflow: 'hidden', background: '#F59E0B', padding: '88px 20px' }}>
      <ChessGrid opacity={0.09} squareSize={34} color="0,0,0" />

      {/* Ghost king */}
      <div style={{ position: 'absolute', right: '-40px', bottom: '-40px', pointerEvents: 'none' }}>
        <King sz={300} col="#000" op={0.1} />
      </div>

      <div ref={ref} style={{ ...style, position: 'relative', zIndex: 1, maxWidth: '600px', margin: '0 auto' }}>
        <div style={{ fontSize: '10px', fontWeight: 700, letterSpacing: '0.18em', color: 'rgba(0,0,0,0.45)', textTransform: 'uppercase', marginBottom: '16px' }}>
          — Prêt·e à jouer votre meilleure partie ?
        </div>
        <h2 style={{
          fontFamily: "'Fraunces', serif",
          fontSize: 'clamp(38px, 10vw, 64px)',
          fontWeight: 900,
          lineHeight: 0.95,
          letterSpacing: '-0.035em',
          color: '#080808',
          margin: '0 0 20px',
        }}>
          Votre prochaine<br />
          <em>grande décision</em><br />
          commence ici.
        </h2>
        <p style={{ fontSize: '15px', lineHeight: 1.6, color: 'rgba(0,0,0,0.55)', maxWidth: '380px', marginBottom: '34px' }}>
          Une première session, sans engagement. Une conversation honnête sur où vous en êtes et où vous voulez aller.
        </p>
        <MagBtn href={WA} dark>
          <WAIcon sz={22} />
          Démarrer sur WhatsApp
        </MagBtn>
        <p style={{ fontSize: '12px', color: 'rgba(0,0,0,0.4)', marginTop: '16px', letterSpacing: '0.03em' }}>
          Réponse rapide · Cotonou, Bénin 🇧🇯
        </p>
      </div>
    </section>
  )
}

// ─── FOOTER ───────────────────────────────────────────────────────────────────

function Footer() {
  return (
    <footer style={{ background: '#040404', padding: '52px 20px 32px', borderTop: '1px solid rgba(245,158,11,0.08)' }}>
      <div style={{ maxWidth: '660px', margin: '0 auto' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '36px', flexWrap: 'wrap', gap: '20px' }}>
          <div>
            <div style={{ fontFamily: "'Fraunces', serif", fontSize: '28px', fontWeight: 900, letterSpacing: '-0.03em', marginBottom: '8px' }}>
              <span style={{ color: '#F59E0B' }}>J.</span> GBENOLO
            </div>
            <p style={{ fontSize: '13px', color: 'rgba(245,237,216,0.28)', lineHeight: 1.5, margin: 0 }}>
              Coach de vie certifié<br />Cotonou, Bénin 🇧🇯
            </p>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <King sz={18} col="rgba(245,158,11,0.35)" />
            <span style={{ fontSize: '10px', color: 'rgba(245,237,216,0.18)', letterSpacing: '0.1em' }}>
              STRATÉGIE · MAÎTRISE · TRANSFORMATION
            </span>
          </div>
        </div>

        <div style={{ height: '1px', background: 'linear-gradient(90deg, transparent, rgba(245,158,11,0.3), transparent)', marginBottom: '22px' }} />

        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '12px' }}>
          <p style={{ fontSize: '12px', color: 'rgba(245,237,216,0.18)', margin: 0 }}>© 2025 Joseph Gbenolo</p>
          <a
            href={WA}
            target="_blank"
            rel="noopener noreferrer"
            style={{ display: 'flex', alignItems: 'center', gap: '6px', color: '#22C55E', textDecoration: 'none', fontSize: '12px', fontWeight: 600 }}
          >
            <WAIcon sz={14} />
            WhatsApp
          </a>
        </div>
      </div>
    </footer>
  )
}

// ─── APP ──────────────────────────────────────────────────────────────────────

export default function App() {
  return (
    <div style={{ background: '#080808', color: '#F5EDD8', overflowX: 'hidden' }}>
      <Nav />
      <Hero />
      <Ticker />
      <BentoServices />
      <Approach />
      <SocialStrip />
      <CTA />
      <Footer />
    </div>
  )
}
