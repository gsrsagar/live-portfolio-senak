// ============================================================
// HOME PAGE — Hero + Stats + Bento + Featured Projects + CTA
// ============================================================

import { useRef, useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { TypeAnimation } from 'react-type-animation';
import { ArrowRight, Download, ChevronDown } from 'lucide-react';
import { FaGithub, FaLinkedinIn, FaTwitter, FaEnvelope } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import { useInView } from 'react-intersection-observer';
import { Helmet } from 'react-helmet-async';
import { STATS, PERSONAL_INFO } from '../../constants';
import { projects } from '../../data/portfolioData';

// ─── Floating Tech Icon ───────────────────────────────────────
function FloatingIcon({ label, style, delay = 0 }: { label: string; style?: React.CSSProperties; delay?: number }) {
  return (
    <motion.div
      className="absolute glass rounded-xl px-3 py-2 text-xs font-medium hoverable"
      style={{
        fontFamily: 'var(--font-code)',
        color: 'var(--color-text-muted)',
        fontSize: '0.75rem',
        ...style,
      }}
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: [0, -8, 0] }}
      transition={{
        opacity: { delay, duration: 0.5 },
        y: { delay, duration: 3 + delay, repeat: Infinity, ease: 'easeInOut' },
      }}
    >
      {label}
    </motion.div>
  );
}

// ─── Particle Canvas ──────────────────────────────────────────
function ParticleCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animId: number;
    const particles: { x: number; y: number; vx: number; vy: number; r: number; alpha: number }[] = [];

    const resize = () => {
      canvas.width = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
    };
    resize();
    window.addEventListener('resize', resize);

    // Create particles
    for (let i = 0; i < 60; i++) {
      particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        vx: (Math.random() - 0.5) * 0.4,
        vy: (Math.random() - 0.5) * 0.4,
        r: Math.random() * 2 + 0.5,
        alpha: Math.random() * 0.5 + 0.1,
      });
    }

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      particles.forEach((p) => {
        p.x += p.vx;
        p.y += p.vy;
        if (p.x < 0) p.x = canvas.width;
        if (p.x > canvas.width) p.x = 0;
        if (p.y < 0) p.y = canvas.height;
        if (p.y > canvas.height) p.y = 0;

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(255, 122, 0, ${p.alpha})`;
        ctx.fill();
      });

      // Draw connections
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x;
          const dy = particles[i].y - particles[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < 100) {
            ctx.beginPath();
            ctx.moveTo(particles[i].x, particles[i].y);
            ctx.lineTo(particles[j].x, particles[j].y);
            ctx.strokeStyle = `rgba(255, 122, 0, ${0.06 * (1 - dist / 100)})`;
            ctx.lineWidth = 0.5;
            ctx.stroke();
          }
        }
      }

      animId = requestAnimationFrame(draw);
    };
    draw();

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener('resize', resize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full"
      style={{ opacity: 0.7 }}
      aria-hidden="true"
    />
  );
}

// ─── STAT CARD ────────────────────────────────────────────────
function StatCard({ stat, index }: { stat: typeof STATS[0]; index: number }) {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.5 });
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!inView) return;
    let start = 0;
    const end = stat.value;
    const duration = 2500;
    const stepTime = 30;
    const steps = duration / stepTime;
    const increment = end / steps;
    const timer = setInterval(() => {
      start += increment;
      if (start >= end) {
        setCount(end);
        clearInterval(timer);
      } else {
        setCount(Math.floor(start));
      }
    }, stepTime);
    return () => clearInterval(timer);
  }, [inView, stat.value]);

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 20 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ delay: index * 0.1, duration: 0.5 }}
      className="card p-8 text-center gradient-border"
    >
      <p
        className="text-4xl font-bold mb-2"
        style={{ fontFamily: 'var(--font-number)', color: 'var(--color-primary)' }}
      >
        {stat.prefix}
        {count}
        {stat.suffix}
      </p>
      <p className="text-base" style={{ color: 'var(--color-text-muted)' }}>{stat.label}</p>
    </motion.div>
  );
}

// ─── FEATURED PROJECT CARD ────────────────────────────────────
function FeaturedProjectCard({ project, index }: { project: typeof projects[0]; index: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.15, duration: 0.5 }}
      className="card overflow-hidden group hoverable"
    >
      {/* Image */}
      <div className="relative h-48 overflow-hidden">
        <img
          src={project.image}
          alt={project.title}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
        />
        <div
          className="absolute inset-0"
          style={{ background: 'linear-gradient(to top, rgba(11,11,15,0.9), transparent)' }}
        />
        {project.featured && (
          <span className="absolute top-3 left-3 badge">Featured</span>
        )}
        <span
          className="absolute top-3 right-3 badge"
          style={{ background: 'rgba(0,0,0,0.5)', color: 'var(--color-text-muted)', borderColor: 'var(--color-border)' }}
        >
          {project.category}
        </span>
      </div>

      {/* Content */}
      <div className="p-7">
        <h3
          className="text-lg font-semibold mb-2.5 group-hover:text-primary transition-colors duration-200"
          style={{ fontFamily: 'var(--font-heading)', color: 'var(--color-text)' }}
        >
          {project.title}
        </h3>
        <p className="text-base mb-5 line-clamp-2" style={{ color: 'var(--color-text-muted)' }}>
          {project.shortDescription}
        </p>

        {/* Tech Stack */}
        <div className="flex flex-wrap gap-2 mb-5">
          {project.techStack.slice(0, 4).map((tech) => (
            <span key={tech} className="badge" style={{ fontSize: '0.7rem', padding: '0.15rem 0.5rem' }}>
              {tech}
            </span>
          ))}
          {project.techStack.length > 4 && (
            <span className="badge" style={{ fontSize: '0.7rem', padding: '0.15rem 0.5rem', background: 'var(--color-card)' }}>
              +{project.techStack.length - 4}
            </span>
          )}
        </div>

        {/* Links */}
        <div className="flex items-center gap-3">
          <Link
            to={`/projects/${project.id}`}
            className="flex items-center gap-1.5 text-sm font-medium hoverable"
            style={{ color: 'var(--color-primary)' }}
          >
            View Project <ArrowRight size={13} />
          </Link>
          {project.github && (
            <a
              href={project.github}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1 text-xs hoverable"
              style={{ color: 'var(--color-text-muted)' }}
            >
              <FaGithub size={13} /> GitHub
            </a>
          )}
        </div>
      </div>
    </motion.div>
  );
}

// ─── MAIN HOME PAGE ───────────────────────────────────────────
export default function HomePage() {
  const socialLinks = [
    { icon: FaGithub, href: 'https://github.com/podagatlarajendra', label: 'GitHub' },
    { icon: FaLinkedinIn, href: 'https://linkedin.com/in/podagatlarajendra', label: 'LinkedIn' },
    { icon: FaTwitter, href: 'https://twitter.com/podagatlaraj', label: 'Twitter' },
    { icon: FaEnvelope, href: 'mailto:rajendra@example.com', label: 'Email' },
  ];

  return (
    <>
      <Helmet>
        <title>Podagatla Rajendra — Full Stack Developer</title>
        <meta name="description" content="Full Stack Developer with 2+ years of experience. Building scalable web applications with React, Node.js, and modern technologies." />
      </Helmet>

      {/* ─── HERO SECTION ─────────────────────────────── */}
      <section
        id="hero"
        className="relative min-h-screen flex items-center overflow-hidden"
        aria-label="Hero section"
      >
        {/* Background */}
        <div className="absolute inset-0 hero-bg" aria-hidden="true" />
        <ParticleCanvas />

        {/* Radial glow */}
        <div
          className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 rounded-full pointer-events-none"
          style={{ background: 'radial-gradient(circle, rgba(255,122,0,0.12), transparent 70%)' }}
          aria-hidden="true"
        />

        {/* Floating Tech Icons */}
        <FloatingIcon label="React.js" style={{ top: '20%', left: '8%' }} delay={0.5} />
        <FloatingIcon label="Node.js" style={{ top: '65%', left: '5%' }} delay={1} />
        <FloatingIcon label="TypeScript" style={{ top: '15%', right: '10%' }} delay={0.8} />
        <FloatingIcon label="MongoDB" style={{ top: '70%', right: '8%' }} delay={1.3} />
        <FloatingIcon label="Python" style={{ top: '40%', right: '5%' }} delay={0.3} />

        <div className="container relative z-10">
          <div className="max-w-3xl">
            {/* Availability Badge */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="inline-flex items-center gap-2 mb-6"
            >
              <div
                className="flex items-center gap-2 px-3 py-1.5 rounded-full text-xs"
                style={{
                  background: 'rgba(34,197,94,0.1)',
                  border: '1px solid rgba(34,197,94,0.2)',
                  color: '#22c55e',
                  fontFamily: 'var(--font-code)',
                }}
              >
                <span className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse" />
                Available for opportunities
              </div>
            </motion.div>

            {/* Main Heading */}
            <motion.h1
              className="mb-4"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              style={{ fontFamily: 'var(--font-heading)' }}
            >
              Hi, I'm{' '}
              <span className="gradient-text">Rajendra</span>
              <br />
              <span style={{ color: 'var(--color-text)' }}>I Build </span>
              <span className="gradient-text">Digital</span>
              <br />
              <span style={{ color: 'var(--color-text)' }}>Experiences</span>
            </motion.h1>

            {/* Typing Animation */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.25 }}
              className="flex items-center gap-3 mb-6"
            >
              <span
                className="text-lg font-medium"
                style={{ color: 'var(--color-text-muted)', fontFamily: 'var(--font-body)' }}
              >
                I'm a{' '}
              </span>
              <span
                className="text-lg font-semibold"
                style={{ color: 'var(--color-primary)', fontFamily: 'var(--font-heading)' }}
              >
                <TypeAnimation
                  sequence={[
                    'Full Stack Developer', 2000,
                    'React Specialist', 2000,
                    'Node.js Engineer', 2000,
                    'UI/UX Enthusiast', 2000,
                    'Problem Solver', 2000,
                  ]}
                  repeat={Infinity}
                  speed={60}
                />
              </span>
            </motion.div>

            {/* Bio */}
            <motion.p
              className="text-base mb-8 max-w-xl leading-relaxed"
              style={{ color: 'var(--color-text-muted)' }}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.35 }}
            >
              {PERSONAL_INFO.bio}
            </motion.p>

            {/* CTAs */}
            <motion.div
              className="flex flex-wrap items-center gap-4 mb-10"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.45 }}
            >
              <Link to="/projects" className="btn btn-primary hoverable">
                View My Work <ArrowRight size={16} />
              </Link>
              <a href="/resume.pdf" download className="btn btn-outline hoverable">
                <Download size={16} /> Download Resume
              </a>
              <Link to="/contact" className="btn btn-ghost hoverable">
                Let's Talk →
              </Link>
            </motion.div>

            {/* Social Links */}
            <motion.div
              className="flex items-center gap-3"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.55 }}
            >
              {socialLinks.map(({ icon: Icon, href, label }) => (
                <motion.a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={label}
                  className="w-10 h-10 rounded-xl flex items-center justify-center hoverable"
                  style={{
                    background: 'var(--color-card)',
                    border: '1px solid var(--color-border)',
                    color: 'var(--color-text-muted)',
                  }}
                  whileHover={{ scale: 1.1, borderColor: 'rgba(255,122,0,0.5)' }}
                  whileTap={{ scale: 0.9 }}
                >
                  <Icon size={16} />
                </motion.a>
              ))}

              {/* Location */}
              <span
                className="text-xs ml-2"
                style={{ color: 'var(--color-text-subtle)', fontFamily: 'var(--font-code)' }}
              >
                📍 Hyderabad, India
              </span>
            </motion.div>
          </div>
        </div>

        {/* Scroll Indicator */}
        <motion.div
          className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2, duration: 0.5 }}
          aria-label="Scroll down"
        >
          <span
            className="text-xs tracking-widest uppercase"
            style={{ color: 'var(--color-text-subtle)', fontFamily: 'var(--font-code)' }}
          >
            Scroll
          </span>
          <motion.div
            animate={{ y: [0, 6, 0] }}
            transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
          >
            <ChevronDown size={20} style={{ color: 'var(--color-text-muted)' }} />
          </motion.div>
        </motion.div>
      </section>

      {/* ─── STATS SECTION ────────────────────────────── */}
      <section className="section" aria-label="Statistics">
        <div className="container">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {STATS.map((stat, i) => (
              <StatCard key={stat.label} stat={stat} index={i} />
            ))}
          </div>
        </div>
      </section>

      {/* ─── FEATURED PROJECTS ────────────────────────── */}
      <section className="section" aria-label="Featured projects" id="featured-projects">
        <div className="container">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-16"
          >
            <p className="section-label">Portfolio</p>
            <div className="flex items-end justify-between flex-wrap gap-4">
              <h2 className="gradient-text">Featured Projects</h2>
              <Link
                to="/projects"
                className="flex items-center gap-1.5 text-sm font-medium hoverable"
                style={{ color: 'var(--color-primary)' }}
              >
                View All Projects <ArrowRight size={14} />
              </Link>
            </div>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {projects.map((project, i) => (
              <FeaturedProjectCard key={project.id} project={project} index={i} />
            ))}
          </div>
        </div>
      </section>

      {/* ─── BENTO GRID ────────────────────────────────── */}
      <section className="section" aria-label="Highlights">
        <div className="container">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-16"
          >
            <p className="section-label">Highlights</p>
            <h2>Everything In One <span className="gradient-text">Place</span></h2>
          </motion.div>

          <div className="bento-grid">
            {/* Experience Card */}
            <motion.div
              className="card p-8 bento-cell-wide gradient-border"
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
            >
              <p className="section-label mb-4">Work Experience</p>
              <h3 className="text-xl font-semibold mb-2.5" style={{ fontFamily: 'var(--font-heading)', color: 'var(--color-text)' }}>
                Cognifyz Technologies
              </h3>
              <p className="text-base mb-3" style={{ color: 'var(--color-primary)' }}>Full Stack Development Intern</p>
              <p className="text-base leading-relaxed" style={{ color: 'var(--color-text-muted)' }}>
                Engineered responsive front-end components using React.js & Tailwind CSS, reducing load times by 20%. Built robust backend APIs with Node.js and JWT authentication.
              </p>
              <div className="flex flex-wrap gap-2.5 mt-5">
                {['React', 'Node.js', 'AWS', 'MongoDB'].map((t) => (
                  <span key={t} className="badge">{t}</span>
                ))}
              </div>
            </motion.div>

            {/* GitHub Stats */}
            <motion.div
              className="card p-8"
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
            >
              <p className="section-label mb-5">GitHub Stats</p>
              <div className="flex flex-col gap-5">
                {[
                  { label: 'Repositories', value: '25+' },
                  { label: 'Total Commits', value: '1k+' },
                  { label: 'Stars Earned', value: '150+' },
                ].map(({ label, value }) => (
                  <div key={label} className="flex items-center justify-between">
                    <span className="text-base" style={{ color: 'var(--color-text-muted)' }}>{label}</span>
                    <span className="text-xl font-bold" style={{ fontFamily: 'var(--font-number)', color: 'var(--color-primary)' }}>{value}</span>
                  </div>
                ))}
              </div>
            </motion.div>

            {/* Tech Stack */}
            <motion.div
              className="card p-8"
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3 }}
            >
              <p className="section-label mb-5">Core Stack</p>
              <div className="flex flex-wrap gap-2.5">
                {['React.js', 'Node.js', 'TypeScript', 'MongoDB', 'Express', 'Redis', 'PostgreSQL', 'Docker'].map((tech) => (
                  <motion.span
                    key={tech}
                    className="badge hoverable"
                    whileHover={{ scale: 1.05 }}
                  >
                    {tech}
                  </motion.span>
                ))}
              </div>
            </motion.div>

            {/* Availability */}
            <motion.div
              className="card p-8 flex flex-col justify-between"
              style={{ background: 'linear-gradient(135deg, rgba(255,122,0,0.06), rgba(255,193,7,0.03))' }}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.4 }}
            >
              <div>
                <div className="flex items-center gap-2.5 mb-4">
                  <span className="w-2.5 h-2.5 rounded-full bg-green-500 animate-pulse" />
                  <span className="text-sm font-medium" style={{ color: '#22c55e', fontFamily: 'var(--font-code)' }}>
                    Open to Work
                  </span>
                </div>
                <h3 className="text-xl font-semibold mb-2.5" style={{ fontFamily: 'var(--font-heading)', color: 'var(--color-text)' }}>
                  Available for Projects
                </h3>
                <p className="text-base" style={{ color: 'var(--color-text-muted)' }}>
                  Looking for full-time roles and interesting freelance projects.
                </p>
              </div>
              <Link to="/contact" className="btn btn-primary mt-6 w-full justify-center">
                Let's Work Together →
              </Link>
            </motion.div>

            {/* Quick Links */}
            <motion.div
              className="card p-8"
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.5 }}
            >
              <p className="section-label mb-5">Explore</p>
              <div className="flex flex-col gap-3">
                {[
                  { label: 'View All Projects', href: '/projects' },
                  { label: 'My Skills', href: '/skills' },
                  { label: 'Work Experience', href: '/experience' },
                  { label: 'Get In Touch', href: '/contact' },
                ].map(({ label, href }) => (
                  <Link
                    key={label}
                    to={href}
                    className="flex items-center justify-between px-4 py-3 rounded-xl text-base transition-all duration-200"
                    style={{ border: '1px solid var(--color-border)', color: 'var(--color-text-muted)' }}
                  >
                    <span>{label}</span>
                    <ArrowRight size={14} style={{ color: 'var(--color-primary)' }} />
                  </Link>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ─── CTA SECTION ──────────────────────────────── */}
      <section className="section" aria-label="Call to action">
        <div className="container">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="relative rounded-2xl overflow-hidden p-12 text-center"
            style={{ background: 'var(--color-card)', border: '1px solid var(--color-border)' }}
          >
            {/* Glow */}
            <div
              className="absolute top-0 left-1/2 -translate-x-1/2 w-1/2 h-px"
              style={{ background: 'linear-gradient(90deg, transparent, #FF7A00, transparent)' }}
              aria-hidden="true"
            />

            <p className="section-label justify-center mb-4">Let's Build Together</p>
            <h2 className="mb-4">
              Have a project in <span className="gradient-text">mind?</span>
            </h2>
            <p className="text-base mb-8 max-w-md mx-auto" style={{ color: 'var(--color-text-muted)' }}>
              I'm currently available for freelance work and full-time positions. Let's create something extraordinary together.
            </p>
            <div className="flex flex-wrap items-center justify-center gap-4">
              <Link to="/contact" className="btn btn-primary hoverable">
                Start a Conversation <ArrowRight size={16} />
              </Link>
              <Link to="/projects" className="btn btn-outline hoverable">
                See My Work
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </>
  );
}
