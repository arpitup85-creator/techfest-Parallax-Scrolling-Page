import { useEffect, useRef } from 'react'
import Lenis from '@studio-freight/lenis'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { motion, useScroll, useTransform } from 'framer-motion'
import './App.css'

gsap.registerPlugin(ScrollTrigger)

function App() {
  const containerRef = useRef<HTMLDivElement>(null)
  const lenisRef = useRef<Lenis | null>(null)

  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: 'vertical',
      smoothWheel: true,
    })

    lenisRef.current = lenis

    lenis.on('scroll', ScrollTrigger.update)

    gsap.ticker.add((time) => {
      lenis.raf(time * 1000)
    })

    gsap.ticker.lagSmoothing(0)

    return () => {
      lenis.destroy()
      gsap.ticker.remove(lenis.raf)
    }
  }, [])

  return (
    <div ref={containerRef} className="app">
      <HeroSection />
      <DiscoverySection />
      <DepthShowcaseSection />
      <StorytellingSection />
      <FinalSection />
      <ScrollIndicator />
    </div>
  )
}

function HeroSection() {
  const sectionRef = useRef<HTMLElement>(null)
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start start', 'end start'],
  })

  const yBg = useTransform(scrollYProgress, [0, 1], ['0%', '50%'])
  const yMid = useTransform(scrollYProgress, [0, 1], ['0%', '30%'])
  const yFore = useTransform(scrollYProgress, [0, 1], ['0%', '100%'])
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0])
  const scale = useTransform(scrollYProgress, [0, 1], [1, 1.2])

  return (
    <section ref={sectionRef} className="hero-section">
      <motion.div className="hero-stars-bg" style={{ y: yBg, scale }} />
      <motion.div className="hero-nebula" style={{ y: yMid, scale }} />
      <div className="hero-particles">
        {[...Array(50)].map((_, i) => (
          <motion.div
            key={i}
            className="particle"
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: [0, 1, 0], scale: [0, 1, 0] }}
            transition={{
              duration: Math.random() * 3 + 2,
              repeat: Infinity,
              delay: Math.random() * 5,
            }}
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
          />
        ))}
      </div>
      <motion.div className="hero-mountains" style={{ y: yMid }} />
      <motion.div className="hero-foreground" style={{ y: yFore }} />
      <motion.div className="hero-content" style={{ opacity }}>
        <motion.span
          className="hero-eyebrow"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          Welcome to the Journey
        </motion.span>
        <motion.h1
          className="hero-title"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.4 }}
        >
          Beyond the <span className="gradient-text">Horizon</span>
        </motion.h1>
        <motion.p
          className="hero-subtitle"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
        >
          An immersive experience through digital landscapes
        </motion.p>
        <motion.div
          className="hero-cta"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.8 }}
        >
          <button className="btn-primary">
            <span>Begin Exploration</span>
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M5 12h14M12 5l7 7-7 7" />
            </svg>
          </button>
          <button className="btn-secondary">Learn More</button>
        </motion.div>
      </motion.div>
      <motion.div className="scroll-hint" animate={{ y: [0, 10, 0] }} transition={{ duration: 2, repeat: Infinity }}>
        <span>Scroll to explore</span>
        <div className="scroll-arrow" />
      </motion.div>
    </section>
  )
}

function DiscoverySection() {
  const sectionRef = useRef<HTMLElement>(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        '.discovery-layer-bg',
        { y: 100, opacity: 0.3 },
        {
          y: -100,
          opacity: 1,
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top bottom',
            end: 'bottom top',
            scrub: 1,
          },
        }
      )
      gsap.fromTo(
        '.discovery-layer-mid',
        { y: 50, opacity: 0 },
        {
          y: -50,
          opacity: 1,
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 80%',
            end: 'center center',
            scrub: 1,
          },
        }
      )
      gsap.fromTo(
        '.discovery-feature',
        { y: 80, opacity: 0, scale: 0.9 },
        {
          y: 0,
          opacity: 1,
          scale: 1,
          stagger: 0.2,
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 60%',
            end: 'center center',
            scrub: 1,
          },
        }
      )
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  return (
    <section ref={sectionRef} className="discovery-section">
      <div className="discovery-bg">
        <div className="discovery-layer-bg" />
        <div className="discovery-layer-mid" />
      </div>
      <div className="discovery-content">
        <motion.span
          className="section-eyebrow"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
        >
          Discover
        </motion.span>
        <motion.h2
          className="section-title"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          Uncover Hidden <span className="gradient-text-warm">Dimensions</span>
        </motion.h2>
        <motion.p
          className="section-description"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
        >
          Each layer reveals new perspectives as you journey deeper into the experience
        </motion.p>
        <div className="discovery-features">
          <div className="discovery-feature">
            <div className="feature-icon">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                <circle cx="12" cy="12" r="3" />
                <path d="M12 1v2M12 21v2M4.22 4.22l1.42 1.42M18.36 18.36l1.42 1.42M1 12h2M21 12h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42" />
              </svg>
            </div>
            <h3>Infinite Depth</h3>
            <p>Layers that create an endless sense of space</p>
          </div>
          <div className="discovery-feature">
            <div className="feature-icon">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" />
              </svg>
            </div>
            <h3>Dynamic Layers</h3>
            <p>Elements move independently for depth</p>
          </div>
          <div className="discovery-feature">
            <div className="feature-icon">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                <path d="M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2 2 6.477 2 12s4.477 10 10 10z" />
                <path d="M12 6v6l4 2" />
              </svg>
            </div>
            <h3>Fluid Motion</h3>
            <p>Smooth animations at every scroll</p>
          </div>
        </div>
      </div>
      <div className="discovery-visuals">
        <motion.div
          className="floating-orb orb-1"
          animate={{
            y: [0, -20, 0],
            x: [0, 10, 0],
          }}
          transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
        />
        <motion.div
          className="floating-orb orb-2"
          animate={{
            y: [0, 15, 0],
            x: [0, -15, 0],
          }}
          transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut', delay: 1 }}
        />
        <motion.div
          className="floating-orb orb-3"
          animate={{
            y: [0, 25, 0],
            x: [0, 5, 0],
          }}
          transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut', delay: 2 }}
        />
      </div>
    </section>
  )
}

function DepthShowcaseSection() {
  const sectionRef = useRef<HTMLElement>(null)
  const cardRefs = useRef<(HTMLDivElement | null)[]>([])

  useEffect(() => {
    const ctx = gsap.context(() => {
      cardRefs.current.forEach((card, index) => {
        if (card) {
          gsap.fromTo(
            card,
            { y: 100 + index * 30, rotateX: 15, rotateY: -10 },
            {
              y: 0 - index * 30,
              rotateX: 0,
              rotateY: 0,
              scrollTrigger: {
                trigger: sectionRef.current,
                start: 'top bottom',
                end: 'bottom top',
                scrub: 1,
              },
            }
          )
        }
      })
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  const cards = [
    { title: 'Creative Vision', desc: 'Transform ideas into visual masterpieces', color: 'from-cyan-500 to-blue-600' },
    { title: 'Technical Excellence', desc: 'Precision engineering meets artistry', color: 'from-emerald-500 to-teal-600' },
    { title: 'Seamless Flow', desc: 'Every transition tells a story', color: 'from-orange-500 to-amber-600' },
    { title: 'Infinite Depth', desc: 'Dimensions beyond the screen', color: 'from-pink-500 to-rose-600' },
  ]

  return (
    <section ref={sectionRef} className="depth-section">
      <div className="depth-gradient-bg" />
      <div className="depth-content">
        <motion.span
          className="section-eyebrow"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
        >
          Experience
        </motion.span>
        <motion.h2
          className="section-title"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          Layers of <span className="gradient-text">Possibility</span>
        </motion.h2>
        <div className="depth-cards">
          {cards.map((card, index) => (
            <motion.div
              key={index}
              ref={(el) => { cardRefs.current[index] = el }}
              className="depth-card"
              whileHover={{ scale: 1.05, y: -10 }}
              transition={{ type: 'spring', stiffness: 300 }}
            >
              <div className={`card-gradient bg-gradient-to-br ${card.color}`} />
              <div className="card-content">
                <h3>{card.title}</h3>
                <p>{card.desc}</p>
              </div>
              <div className="card-shine" />
            </motion.div>
          ))}
        </div>
      </div>
      <div className="depth-grid">
        {[...Array(20)].map((_, i) => (
          <motion.div
            key={i}
            className="grid-cell"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: [0.1, 0.3, 0.1] }}
            transition={{ duration: 2, repeat: Infinity, delay: i * 0.1 }}
          />
        ))}
      </div>
    </section>
  )
}

function StorytellingSection() {
  const sectionRef = useRef<HTMLElement>(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      const scenes = gsap.utils.toArray<HTMLElement>('.story-scene')
      scenes.forEach((scene, index) => {
        gsap.fromTo(
          scene,
          { opacity: 0, x: index % 2 === 0 ? -100 : 100 },
          {
            opacity: 1,
            x: 0,
            scrollTrigger: {
              trigger: scene,
              start: 'top 80%',
              end: 'top 30%',
              scrub: 1,
            },
          }
        )
      })
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  const stories = [
    {
      number: '01',
      title: 'The Beginning',
      description: 'Every great journey starts with a single step into the unknown. The path ahead may be unclear, but curiosity lights the way.',
      accent: 'var(--primary)',
    },
    {
      number: '02',
      title: 'The Discovery',
      description: 'As we venture deeper, new worlds unfold before our eyes. Each scroll reveals secrets waiting to be uncovered.',
      accent: 'var(--accent)',
    },
    {
      number: '03',
      title: 'The Transformation',
      description: 'Boundaries blur between reality and imagination. The experience becomes personal, meaningful, unforgettable.',
      accent: 'var(--secondary)',
    },
  ]

  return (
    <section ref={sectionRef} className="storytelling-section">
      <div className="story-line" />
      <div className="story-content">
        <motion.div
          className="story-header"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
        >
          <span className="section-eyebrow">Narrative</span>
          <h2 className="section-title">
            A Journey Through <span className="gradient-text-warm">Time</span>
          </h2>
        </motion.div>
        <div className="story-scenes">
          {stories.map((story, index) => (
            <div key={index} className="story-scene">
              <div className="scene-number" style={{ color: story.accent }}>
                {story.number}
              </div>
              <div className="scene-content">
                <h3>{story.title}</h3>
                <p>{story.description}</p>
              </div>
              <div className="scene-visual">
                <motion.div
                  className="scene-orb"
                  style={{ background: story.accent }}
                  animate={{
                    scale: [1, 1.2, 1],
                    opacity: [0.6, 1, 0.6],
                  }}
                  transition={{ duration: 3, repeat: Infinity }}
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

function FinalSection() {
  const sectionRef = useRef<HTMLElement>(null)
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start end', 'end end'],
  })

  const scale = useTransform(scrollYProgress, [0, 1], [0.5, 1])
  const opacity = useTransform(scrollYProgress, [0, 0.5], [0, 1])

  return (
    <section ref={sectionRef} className="final-section">
      <div className="final-bg-gradient" />
      <motion.div className="final-rings" style={{ scale, opacity }}>
        {[...Array(4)].map((_, i) => (
          <motion.div
            key={i}
            className="ring"
            animate={{
              rotate: i % 2 === 0 ? 360 : -360,
            }}
            transition={{
              duration: 20 + i * 5,
              repeat: Infinity,
              ease: 'linear',
            }}
            style={{
              width: `${(i + 1) * 25}%`,
              height: `${(i + 1) * 25}%`,
              animationDelay: `${i * 0.5}s`,
            }}
          />
        ))}
      </motion.div>
      <motion.div
        className="final-content"
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 1 }}
      >
        <h2 className="final-title">
          Ready to Create <span className="gradient-text">Your Story</span>?
        </h2>
        <p className="final-description">
          This is just the beginning. What will you build?
        </p>
        <motion.button
          className="btn-primary btn-large"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <span>Start Your Journey</span>
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M5 12h14M12 5l7 7-7 7" />
          </svg>
        </motion.button>
      </motion.div>
      <div className="final-particles">
        {[...Array(30)].map((_, i) => (
          <motion.div
            key={i}
            className="final-particle"
            initial={{ y: 0, opacity: 0 }}
            animate={{
              y: [0, -100],
              opacity: [0, 1, 0],
            }}
            transition={{
              duration: Math.random() * 4 + 3,
              repeat: Infinity,
              delay: Math.random() * 5,
            }}
            style={{
              left: `${Math.random() * 100}%`,
              bottom: 0,
            }}
          />
        ))}
      </div>
    </section>
  )
}

function ScrollIndicator() {
  const { scrollYProgress } = useScroll()
  const scaleX = useTransform(scrollYProgress, [0, 1], [0, 1])

  return (
    <motion.div className="scroll-progress" style={{ scaleX }} />
  )
}

export default App
