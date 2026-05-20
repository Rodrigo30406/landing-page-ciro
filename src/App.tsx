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

const numbers: Metric[] = [
  { value: '9.4', label: 'calificacion promedio al Protocolo G.A.A.P.', trend: 'Metrica reportada en casos de exito', icon: E.target },
  { value: '120', label: 'leads corporativos captados (demo)', trend: 'Nombre de empresa + correo corporativo', icon: E.trend },
  { value: '18', label: 'paises objetivo activados (demo)', trend: 'Segmentacion internacional por mercado destino', icon: E.handshake },
]

const barsData = [24, 32, 45, 61, 78, 93]

const metricCards = [
  { title: 'Blindaje de Reputacion', value: '4 canales', detail: 'Instagram, Facebook, LinkedIn y Email alineados', icon: E.money },
  { title: 'Activos Mensuales', value: '8+', detail: 'reels, fotos, disenos tecnicos y carruseles', icon: E.check },
  { title: 'Publicaciones LinkedIn', value: '6', detail: 'mensuales para tomadores de decision globales', icon: E.chart },
  { title: 'Frecuencia Email', value: '1/sem', detail: 'nutricion institucional a base de compradores', icon: E.bolt },
]

const deliverables: Deliverable[] = [
  {
    title: 'Ingenieria de Narrativa y Briefing Estrategico',
    bullets: [
      [E.search, 'No publicamos por publicar. Iniciamos con una inmersion profunda en tu modelo de negocio para construir una narrativa tecnica.'],
      [E.compass, 'La narrativa esta diseñada para resonar con los estandares de Category Managers internacionales.'],
      [E.doc, 'Definimos tu ventaja competitiva y la proyectamos al mundo.'],
    ],
  },
  {
    title: 'Ecosistema de Autoridad Visual (Instagram y Facebook)',
    bullets: [
      [E.video, '8 activos mensuales de alta gama diseñados para educar y validar tu trazabilidad.'],
      [E.video, 'Incluye 1 reel cinematografico de procesos y 2 fotografias de producto en alta resolucion.'],
      [E.grid, 'Incluye 3 diseños tecnicos de infraestructura y 2 carruseles estrategicos de valor corporativo.'],
    ],
  },
  {
    title: 'Posicionamiento B2B de Elite (LinkedIn)',
    bullets: [
      [E.target, 'Instalamos tu voz como lider de opinion en la red profesional mas importante del mundo.'],
      [E.doc, '6 publicaciones mensuales de alto nivel para conectar con importadores, brokers y tomadores de decision globales.'],
      [E.link, 'Contenido diseñado para relacionamiento de tu a tu con contactos estrategicos.'],
    ],
  },
  {
    title: 'Sistema de Nutricion y Seguimiento Institucional',
    bullets: [
      [E.mail, 'Campaña de Email Marketing semanal dirigida a tu base de datos de compradores.'],
      [E.mail, 'Mantenemos tu agroexportadora como opcion numero uno en su bandeja de entrada.'],
      [E.doc, 'Enviamos reportes de campaña, disponibilidad de lotes y validaciones tecnicas.'],
    ],
  },
  {
    title: 'Maquina de Atraccion: Reels de Alto Impacto (GAAP Templates)',
    bullets: [
      [E.rocket, '2 piezas audiovisuales adicionales al mes creadas especificamente para anuncios.'],
      [E.video, 'Aplicamos plantillas de guiones comprobadas del Protocolo G.A.A.P.'],
      [E.target, 'Objetivo: detener el scroll del cliente ideal y generar deseo inmediato por tu producto.'],
    ],
  },
  {
    title: 'Ingenieria de Trafico y Captacion Directa de Leads (ADS)',
    bullets: [
      [E.trend, 'Gestion profesional y auditoria de tus campañas de publicidad pagada.'],
      [E.target, 'Inyectamos anuncios en paises destino de tu eleccion para captar empresa, nombre y correo corporativo.'],
      [E.check, 'Filtramos la curiosidad y te entregamos oportunidades reales de negocio.'],
    ],
  },
  {
    title: 'Inmersion Mensual: Produccion de Activos In-Situ',
    bullets: [
      [E.video, 'Una sesion presencial mensual de fotografia y video profesional para recopilar material crudo.'],
      [E.video, 'Transformamos ese material en piezas de autoridad cinematografica.'],
      [E.check, 'Tu marca siempre mantiene material fresco, real y actualizado.'],
    ],
  },
  {
    title: 'Consultoria Tactica y Auditoria de Resultados',
    bullets: [
      [E.handshake, 'No eres un cliente mas: trabajamos como socios estrategicos con acompañamiento constante.'],
      [E.chart, 'Reunion mensual de status para analizar captacion, calidad de leads y proximos pasos de escala.'],
      [E.tune, 'Asesoria continua por canales directos para ajustar la ejecucion.'],
    ],
  },
]

const clientFaces = ['https://randomuser.me/api/portraits/men/22.jpg', 'https://randomuser.me/api/portraits/women/33.jpg', 'https://randomuser.me/api/portraits/men/41.jpg', 'https://randomuser.me/api/portraits/women/55.jpg', 'https://randomuser.me/api/portraits/men/63.jpg', 'https://randomuser.me/api/portraits/women/67.jpg']

const pillars = [
  {
    title: 'Blindaje de Reputacion Global',
    text: 'Elevamos tu narrativa corporativa en Instagram, Facebook, LinkedIn y Email para que tus clientes actuales y potenciales validen tu trazabilidad al instante, eliminando cualquier percepcion de riesgo operativo.',
    tone: 'tone-cyan',
    icon: E.brain,
  },
  {
    title: 'Imanes de Atraccion a Gran Escala',
    text: 'Diseñamos piezas publicitarias de alto impacto bajo el Protocolo G.A.A.P. Contamos con plantillas de guiones comprobadas para cada producto y rubro agroexportador, listas para capturar la atencion de tu cliente ideal y despertar un interes inmediato en tu oferta.',
    tone: 'tone-lime',
    icon: E.radar,
  },
  {
    title: 'Maquina de Captacion y Cierre',
    text: 'Inyectamos tus anuncios en los paises objetivo que tu elijas. El sistema captura el nombre de la empresa y el correo corporativo del importador, filtrando la curiosidad para entregarte leads calificados. Finalmente, realizamos el seguimiento tecnico e institucional via Email Marketing para nutrir el interes y cerrar contratos.',
    tone: 'tone-orange',
    icon: E.gear,
  },
]

const reelIdeas = [
  'Caso: de vender commodity a negociar como marca premium global',
  'Como activar demanda real en paises destino sin regateo',
  'Que valida un importador internacional antes de cerrar contrato',
]

const testimonials = [
  { name: 'Cliente Agro #1', result: 'Validacion tecnica inmediata en mercados internacionales' },
  { name: 'Cliente Agro #2', result: 'Leads corporativos calificados en nuevos paises destino' },
  { name: 'Cliente Agro #3', result: 'Mejor posicionamiento institucional para negociacion B2B' },
]

function AnimatedNumber({ value, start }: { value: string; start: boolean }) {
  const [display, setDisplay] = useState(0)
  const numeric = useMemo(() => {
    const clean = value.replace(/[^0-9.]/g, '')
    const parsed = Number(clean)
    if (Number.isNaN(parsed)) return 0
    return parsed
  }, [value])

  useEffect(() => {
    if (!start) {
      setDisplay(0)
      return
    }

    let raf = 0
    const duration = 1400
    const t0 = performance.now()
    const tick = (now: number) => {
      const p = Math.min((now - t0) / duration, 1)
      const eased = 1 - Math.pow(1 - p, 3)
      setDisplay(Number((numeric * eased).toFixed(1)))
      if (p < 1) raf = requestAnimationFrame(tick)
    }

    raf = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(raf)
  }, [numeric, start])

  return <>{Number.isInteger(numeric) ? Math.round(display) : display.toFixed(1)}</>
}

function App() {
  const [barsActive, setBarsActive] = useState(false)
  const [statsActive, setStatsActive] = useState(false)
  const barsRef = useRef<HTMLDivElement | null>(null)
  const statsRef = useRef<HTMLElement | null>(null)

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
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) setBarsActive(true)
    }, { threshold: 0.35 })
    observer.observe(barsRef.current)
    return () => observer.disconnect()
  }, [])

  useEffect(() => {
    if (!statsRef.current) return
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) setStatsActive(true)
    }, { threshold: 0.45 })
    observer.observe(statsRef.current)
    return () => observer.disconnect()
  }, [])

  return (
    <>
      <main>
        <section className="hero-stream accent-hero reveal">
          <div className="hero-split">
            <div className="hero-copy">
              <p className="kicker">Exclusivo para duenos y gerentes generales de empresas agroexportadoras</p>
              <h1>El Sistema de Posicionamiento y Adquisicion Global para Agroexportadoras</h1>
              <p className="lead">Escala el valor de tu negocio de un commodity a una marca lider mundial. Mira este video de 3 minutos para activar un flujo predecible de intenciones reales de compra en los paises destino de tu eleccion, sin regatear precios con intermediarios.</p>
              <div className="cta-row"><a href="https://calendly.com/cironumon/asesoria-protocolo-gaap" target="_blank" rel="noreferrer" className="btn btn-main">AGENDA UNA SESION GRATUITA + Bono Especial</a></div>
            </div>
            <div className="hero-video-wrap">
              <iframe className="video-frame" src="https://www.youtube.com/embed/9No-FiEInLA" title="Video de presentacion GAAP" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerPolicy="strict-origin-when-cross-origin" allowFullScreen />
            </div>
          </div>
        </section>

        <section className="clients-strip accent-subtle reveal"><p className="section-label">Algunos de nuestros clientes</p><h2>Decenas de agroexportadores con casos de exito aplicaron el Protocolo G.A.A.P.</h2><div className="clients-avatars" aria-label="Fotos de clientes demo">{clientFaces.map((src, idx) => <img key={src} src={src} alt={`Cliente demo ${idx + 1}`} loading="lazy" />)}</div></section>

        <section ref={statsRef} className="narrative accent-subtle reveal">
          <p>Nadie en esta industria se atreve a mostrar metricas. Nosotros nos enorgullecemos de ellas.</p>
          <div className="stats-strip in-metrics">
            {numbers.map((item) => (
              <article key={item.label} className="stat-card reveal">
                <div className="inline-head">
                  <span className="emoji-icon">{item.icon}</span>
                  <strong><AnimatedNumber value={item.value} start={statsActive} /></strong>
                </div>
                <span>{item.label}</span>
                <small>{item.trend}</small>
              </article>
            ))}
          </div>
        </section>

        <section id="metodo" className="method-stream accent-subtle reveal"><h2>Pilares del sistema</h2><div className="pillar-flow">{pillars.map((pillar) => <article key={pillar.title} className={`pillar ${pillar.tone} reveal`}><div className="inline-head"><span className="emoji-icon">{pillar.icon}</span><h3>{pillar.title}</h3></div><p>{pillar.text}</p></article>)}</div></section>

        <section className="deliverables-zone accent-subtle reveal"><p className="section-label">Todo el arsenal para tu expansion global</p><h2>Lo que instalaremos en tu agroexportadora</h2><div className="deliverables-accordion">{deliverables.map((item, idx) => <details key={item.title} className="deliverable-drop reveal" open={idx === 0}><summary><span className="num-pill">{String(idx + 1).padStart(2, '0')}</span><span>{item.title}</span></summary><ul>{item.bullets.map(([icon, text]) => <li key={text}><span className="emoji-icon list-emoji">{icon}</span>{text}</li>)}</ul></details>)}</div><div className="cta-row"><a href="https://calendly.com/cironumon/asesoria-protocolo-gaap" target="_blank" rel="noreferrer" className="btn btn-main">AGENDA UNA SESION GRATUITA + Bono Especial</a></div></section>

        <section className="media-block accent-subtle reveal"><div className="media-copy"><p className="section-label">Contenido de atraccion</p><h2>Reels de alto impacto con plantillas G.A.A.P.</h2><p>Piezas para detener el scroll de tu cliente ideal y generar interes inmediato en tu oferta exportadora.</p></div><div className="reel-grid">{reelIdeas.map((item, idx) => <article key={item} className="reel-card dynamic-card reveal"><span>{E.video} Video {idx + 1}</span><p>{item}</p><button type="button">Ver caso</button></article>)}</div></section>

        <section className="chart-zone accent-chart reveal"><div><p className="section-label">Metrica demo</p><h2>Crecimiento de pipeline en 12 semanas</h2><p>Datos ficticios para presentacion: luego reemplazamos por tus datos reales.</p></div><div ref={barsRef} className="bars" aria-label="Grafico de barras demo">{barsData.map((h, idx) => <div key={h} className={`bar ${barsActive ? 'bar-active' : ''}`} style={{ ['--h' as string]: `${h}%`, ['--d' as string]: `${idx * 120}ms` }}><span>{`W${idx * 2 + 1}`}</span></div>)}</div></section>

        <section className="proof-stream accent-subtle reveal"><p className="section-label">Casos de exito</p><h2>Clientes que pasaron de presencia digital a sistema comercial</h2><div className="proof-list">{testimonials.map((item) => <article key={item.name} className="dynamic-card reveal"><h3>{item.name}</h3><p>{item.result}</p></article>)}</div></section>

        <section id="contacto" className="final-cta reveal"><h2>AGENDA UNA SESION GRATUITA + Bono Especial</h2><p>Activa el Protocolo G.A.A.P. y escala tu posicionamiento global con un flujo predecible de intenciones reales de compra.</p><a href="https://calendly.com/cironumon/asesoria-protocolo-gaap" target="_blank" rel="noreferrer" className="btn btn-main">Ir a Calendly</a></section>
      </main>

      <footer className="legal-footer"><div className="legal-wrap"><div className="legal-logo">AVISO LEGAL Y DESCARGO DE RESPONSABILIDAD</div><p>La tarifa de consultoria del Protocolo G.A.A.P. corresponde exclusivamente al diseño estrategico, produccion y optimizacion del sistema. Toda inversion en pauta publicitaria (Ads) es independiente y sera cubierta por el presupuesto del cliente.</p><p>Las sesiones mensuales de registro audiovisual cubren traslados unicamente dentro de Lima Metropolitana. Producciones fuera de este limite requieren cobertura independiente de costos logisticos y viaticos.</p><p>Los resultados comerciales mostrados representan hitos logrados bajo ejecucion rigurosa y no constituyen promesa o garantia de facturacion o cierre de contratos fijos. El exito depende de multiples variables operativas, logisticas y de mercado ajenas a nuestro control.</p></div></footer>
    </>
  )
}

export default App
