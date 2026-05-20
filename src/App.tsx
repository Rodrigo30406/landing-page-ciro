import { useEffect, useMemo, useRef, useState } from 'react'
import './index.css'

type Metric = {
  value: string
  label: string
  trend: string
  icon: string
}

type Deliverable = {
  title: string
  bullets: [string, string][]
}

const E = {
  target: '\u{1F3AF}',
  trend: '\u{1F4C8}',
  handshake: '\u{1F91D}',
  money: '\u{1F4B8}',
  check: '\u{2705}',
  chart: '\u{1F4CA}',
  bolt: '\u{26A1}',
  brain: '\u{1F9E0}',
  radar: '\u{1F6F0}\u{FE0F}',
  gear: '\u{2699}\u{FE0F}',
  search: '\u{1F50D}',
  compass: '\u{1F9ED}',
  doc: '\u{1F4DD}',
  rocket: '\u{1F680}',
  link: '\u{1F517}',
  mail: '\u{1F4EC}',
  video: '\u{1F3AC}',
  grid: '\u{1F9F1}',
  tune: '\u{1F527}',
}

const highlights = ['Estrategia para agroexportadoras', 'Protocolo GAAP', 'Posicionamiento y adquisicion de leads']

const numbers: Metric[] = [
  { value: '8,583', label: 'seguidores del perfil nicho', trend: '+18% en 30 dias', icon: E.target },
  { value: '9.4k', label: 'vistas en 30 dias', trend: '+41% retencion', icon: E.trend },
  { value: '37', label: 'reuniones demo en 60 dias', trend: '11 cierres potenciales', icon: E.handshake },
]

const barsData = [24, 32, 45, 61, 78, 93]

const metricCards = [
  { title: 'CPL Promedio', value: '$12.40', detail: 'campanas de captacion B2B internacional', icon: E.money },
  { title: 'Tasa de Calificacion', value: '34%', detail: 'leads que pasan a reunion comercial', icon: E.check },
  { title: 'Costo por Reunion', value: '$44', detail: 'costo promedio por llamada agendada', icon: E.chart },
  { title: 'Tiempo de Respuesta', value: '11 min', detail: 'SLA promedio para nuevos prospectos', icon: E.bolt },
]

const deliverables: Deliverable[] = [
  {
    title: 'Sistema de posicionamiento internacional',
    bullets: [
      [E.search, 'Auditoria integral de perfil y mensaje comercial.'],
      [E.compass, 'Blueprint de propuesta de valor para compradores globales.'],
      [E.doc, 'Mapa de contenidos por etapa del embudo.'],
    ],
  },
  {
    title: 'Maquina de captacion y seguimiento',
    bullets: [
      [E.rocket, 'Arquitectura del embudo social para captacion B2B.'],
      [E.link, 'Sistema de handoff entre marketing y ventas.'],
      [E.mail, 'Secuencia base para seguimiento de leads calientes.'],
    ],
  },
  {
    title: 'Activos y control semanal',
    bullets: [
      [E.video, 'Biblioteca de piezas creativas y anuncios base.'],
      [E.grid, 'Dashboard de metricas y tableros de performance.'],
      [E.tune, 'Plan de optimizacion continua por sprint semanal.'],
    ],
  },
]

const clientFaces = ['https://randomuser.me/api/portraits/men/22.jpg', 'https://randomuser.me/api/portraits/women/33.jpg', 'https://randomuser.me/api/portraits/men/41.jpg', 'https://randomuser.me/api/portraits/women/55.jpg', 'https://randomuser.me/api/portraits/men/63.jpg', 'https://randomuser.me/api/portraits/women/67.jpg']

const pillars = [
  { title: 'Marca Personal Hibrida', text: 'Contenido organico de autoridad + pauta de precision para compradores internacionales.', tone: 'tone-cyan', icon: E.brain },
  { title: 'Social Funnel Agro', text: 'Cada pieza de contenido empuja al prospecto a diagnostico, agenda o conversacion comercial.', tone: 'tone-lime', icon: E.radar },
  { title: 'Sistema Automatico', text: 'Captacion, filtro y seguimiento de leads para que el equipo venda con pipeline limpio.', tone: 'tone-orange', icon: E.gear },
]

const reelIdeas = ['Por que los importadores negocian precio antes de entender valor', 'Como convertir una finca en marca exportable', 'Errores al vender arandano premium en mercados globales']
const testimonials = [{ name: 'Andes Berries SAC', result: 'De 3 a 14 conversaciones B2B/mes' }, { name: 'Pacifica Avocado Group', result: '+62% en respuestas a outreach comercial' }, { name: 'Golden Citrus Export', result: 'Agenda estable con compradores de USA' }]

function AnimatedNumber({ value }: { value: string }) {
  const [display, setDisplay] = useState(0)
  const isK = value.toLowerCase().includes('k')
  const numeric = useMemo(() => {
    const clean = value.replace(/[^0-9.]/g, '')
    const parsed = Number(clean)
    if (Number.isNaN(parsed)) return 0
    return isK ? parsed * 1000 : parsed
  }, [value, isK])

  useEffect(() => {
    let raf = 0
    const duration = 1400
    const start = performance.now()
    const tick = (now: number) => {
      const p = Math.min((now - start) / duration, 1)
      const eased = 1 - Math.pow(1 - p, 3)
      setDisplay(Math.round(numeric * eased))
      if (p < 1) raf = requestAnimationFrame(tick)
    }
    raf = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(raf)
  }, [numeric])

  if (isK) return <>{(display / 1000).toFixed(1)}k</>
  return <>{display.toLocaleString()}</>
}

function App() {
  const [barsActive, setBarsActive] = useState(false)
  const barsRef = useRef<HTMLDivElement | null>(null)

  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: 'auto' })
  }, [])

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) entry.target.classList.add('is-visible')
        })
      },
      { threshold: 0.2 }
    )

    document.querySelectorAll('.reveal').forEach((el) => observer.observe(el))

    return () => observer.disconnect()
  }, [])

  useEffect(() => {
    if (!barsRef.current) return
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setBarsActive(true)
      },
      { threshold: 0.35 }
    )
    observer.observe(barsRef.current)
    return () => observer.disconnect()
  }, [])

  return (
    <>
      <main>
        <section className="hero-stream accent-hero reveal">
          <p className="kicker">ciro.agrostrategy</p>
          <h1>Marketing estrategico para <span>agroexportadoras</span></h1>
          <p className="lead">Instala un sistema real de posicionamiento y adquisicion de leads para escalar tu presencia global sin depender de viralidad.</p>
          <div className="tag-row">{highlights.map((item) => <span key={item} className="tag">{item}</span>)}</div>
          <div className="cta-row"><a href="#contacto" className="btn btn-main">Aplicar al programa</a><a href="#metodo" className="btn btn-ghost">Ver sistema</a></div>
          <div className="stats-strip">{numbers.map((item) => <article key={item.label} className="stat-card reveal"><div className="inline-head"><span className="emoji-icon">{item.icon}</span><strong><AnimatedNumber value={item.value} /></strong></div><span>{item.label}</span><small>{item.trend}</small></article>)}</div>
        </section>

        <section className="clients-strip accent-subtle reveal"><p className="section-label">Clientes y fundadores (demo)</p><h2>Marcas que ya trabajan con una estrategia de crecimiento</h2><div className="clients-avatars" aria-label="Fotos de clientes demo">{clientFaces.map((src, idx) => <img key={src} src={src} alt={`Cliente demo ${idx + 1}`} loading="lazy" />)}</div></section>
        <section className="narrative accent-subtle reveal"><p>Para exportar producto no basta con tener calidad. Necesitas una narrativa comercial que te vuelva visible, deseable y facil de contactar para compradores de alto valor.</p></section>

        <section className="metrics-zone accent-chart reveal"><p className="section-label">Zona de metricas</p><h2>Nuestro programa en numeros (demo)</h2><p className="metrics-lead">Indicadores ficticios para la presentacion. Luego los reemplazamos por data real.</p><div className="metrics-grid">{metricCards.map((item) => <article key={item.title} className="metric-box dynamic-card reveal"><div className="inline-head"><span className="emoji-icon">{item.icon}</span><p>{item.title}</p></div><strong>{item.value}</strong><span>{item.detail}</span></article>)}</div></section>

        <section className="video-section accent-video reveal"><div className="video-copy"><p className="section-label">Video de presentacion</p><h2>Mira como estructuramos un embudo de marketing B2B</h2><p>Video demo temporal para la presentacion. Luego lo reemplazamos por el video de Ciro.</p><a href="https://www.youtube.com/watch?v=9No-FiEInLA" target="_blank" rel="noreferrer" className="btn btn-ghost">Abrir en YouTube</a></div><div className="video-frame-wrap"><iframe className="video-frame" src="https://www.youtube.com/embed/9No-FiEInLA" title="Marketing video demo" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerPolicy="strict-origin-when-cross-origin" allowFullScreen /></div></section>

        <section id="metodo" className="method-stream accent-subtle reveal"><h2>El sistema se basa en 3 motores de crecimiento</h2><div className="pillar-flow">{pillars.map((pillar) => <article key={pillar.title} className={`pillar ${pillar.tone} reveal`}><div className="inline-head"><span className="emoji-icon">{pillar.icon}</span><h3>{pillar.title}</h3></div><p>{pillar.text}</p></article>)}</div></section>

        <section className="deliverables-zone accent-subtle reveal"><p className="section-label">Entregables del programa</p><h2>Lo que obtienes al entrar</h2><div className="deliverables-accordion">{deliverables.map((item, idx) => <details key={item.title} className="deliverable-drop reveal" open={idx === 0}><summary><span className="num-pill">{String(idx + 1).padStart(2, '0')}</span><span>{item.title}</span></summary><ul>{item.bullets.map(([icon, text]) => <li key={text}><span className="emoji-icon list-emoji">{icon}</span>{text}</li>)}</ul></details>)}</div></section>

        <section className="media-block accent-subtle reveal"><div className="media-copy"><p className="section-label">Contenido que atrae leads</p><h2>Biblioteca de reels estrategicos (demo)</h2><p>Este bloque simula la seccion de videos cortos para educar al mercado y calificar prospectos.</p></div><div className="reel-grid">{reelIdeas.map((item, idx) => <article key={item} className="reel-card dynamic-card reveal"><span>{E.video} Video {idx + 1}</span><p>{item}</p><button type="button">Ver caso</button></article>)}</div></section>

        <section className="chart-zone accent-chart reveal"><div><p className="section-label">Metrica demo</p><h2>Crecimiento de pipeline en 12 semanas</h2><p>Datos ficticios para presentacion: luego reemplazamos por tus datos reales.</p></div><div ref={barsRef} className="bars" aria-label="Grafico de barras demo">{barsData.map((h, idx) => <div key={h} className={`bar ${barsActive ? 'bar-active' : ''}`} style={{ ['--h' as string]: `${h}%`, ['--d' as string]: `${idx * 120}ms` }}><span>{`W${idx * 2 + 1}`}</span></div>)}</div></section>

        <section className="proof-stream accent-subtle reveal"><p className="section-label">Casos de exito (demo)</p><h2>Clientes que pasaron de presencia digital a sistema comercial</h2><div className="proof-list">{testimonials.map((item) => <article key={item.name} className="dynamic-card reveal"><h3>{item.name}</h3><p>{item.result}</p></article>)}</div></section>

        <section id="contacto" className="final-cta reveal"><h2>Escribe "SISTEMA" y escalamos tu presencia global.</h2><p>Demo de CTA final. Podemos conectar este boton a WhatsApp, Calendly o formulario.</p><a href="https://instagram.com/ciro.agrostrategy" target="_blank" rel="noreferrer" className="btn btn-main">Ir al Instagram</a></section>
      </main>

      <footer className="legal-footer"><div className="legal-wrap"><div className="legal-logo">CIRO AGROSTRATEGY</div><p>Aviso legal. LOS RESULTADOS NO ESTAN GARANTIZADOS. Esta demo presenta escenarios referenciales con fines educativos y comerciales.</p><p>Terminos y Condiciones</p><p>Este sitio web no es parte del sitio web de YouTube, Google o Facebook; Google Inc o Facebook Inc.</p></div></footer>
    </>
  )
}

export default App
