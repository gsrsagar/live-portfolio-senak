// ============================================================
// PROJECT DETAIL PAGE — Case Study, Features, Architecture
// ============================================================

import { motion } from 'framer-motion';
import { useParams, Link, Navigate } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { ArrowLeft, ExternalLink, Calendar, Clock, CheckCircle2 } from 'lucide-react';
import { FaGithub } from 'react-icons/fa';
import { projects } from '../../data/portfolioData';

export default function ProjectDetailPage() {
  const { id } = useParams<{ id: string }>();
  const project = projects.find((p) => p.id === id);

  if (!project) return <Navigate to="/projects" replace />;

  return (
    <>
      <Helmet>
        <title>{project.title} — Podagatla Rajendra</title>
        <meta name="description" content={project.shortDescription} />
      </Helmet>

      <article className="section">
        <div className="container max-w-4xl">
          {/* Back */}
          <motion.div initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} className="mb-8">
            <Link
              to="/projects"
              className="inline-flex items-center gap-2 text-sm hoverable"
              style={{ color: 'var(--color-text-muted)' }}
            >
              <ArrowLeft size={14} /> Back to Projects
            </Link>
          </motion.div>

          {/* Header */}
          <motion.header initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="mb-8">
            <div className="flex flex-wrap items-center gap-3 mb-4">
              <span className="badge">{project.category}</span>
              <span
                className="px-2 py-1 rounded-full text-xs"
                style={{
                  background: project.status === 'completed' ? 'rgba(34,197,94,0.1)' : 'rgba(255,193,7,0.1)',
                  color: project.status === 'completed' ? '#22c55e' : '#FFC107',
                  fontFamily: 'var(--font-code)',
                }}
              >
                {project.status === 'completed' ? '✓ Completed' : '⏳ In Progress'}
              </span>
            </div>
            <h1 className="mb-3">{project.title}</h1>
            <p className="text-lg" style={{ color: 'var(--color-text-muted)' }}>
              {project.shortDescription}
            </p>

            {/* Meta */}
            <div className="flex flex-wrap gap-6 mt-4">
              <div className="flex items-center gap-2 text-sm" style={{ color: 'var(--color-text-muted)' }}>
                <Calendar size={14} style={{ color: 'var(--color-primary)' }} />
                {project.year}
              </div>
              <div className="flex items-center gap-2 text-sm" style={{ color: 'var(--color-text-muted)' }}>
                <Clock size={14} style={{ color: 'var(--color-primary)' }} />
                {project.duration}
              </div>
            </div>

            {/* Links */}
            <div className="flex gap-3 mt-6">
              {project.github && (
                <a href={project.github} target="_blank" rel="noopener noreferrer" className="btn btn-outline hoverable gap-2">
                  <FaGithub size={15} /> GitHub
                </a>
              )}
              {project.liveDemo && (
                <a href={project.liveDemo} target="_blank" rel="noopener noreferrer" className="btn btn-primary hoverable gap-2">
                  <ExternalLink size={15} /> Live Demo
                </a>
              )}
            </div>
          </motion.header>

          {/* Hero Image */}
          <motion.div
            className="rounded-2xl overflow-hidden mb-10"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            <img
              src={project.image}
              alt={`${project.title} screenshot`}
              className="w-full h-72 object-cover"
            />
          </motion.div>

          {/* Stats */}
          {project.stats && (
            <motion.div
              className="grid grid-cols-3 gap-6 mb-12"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
            >
              {project.stats.map(({ label, value }) => (
                <div key={label} className="card p-8 text-center">
                  <p className="text-2xl font-bold mb-1" style={{ fontFamily: 'var(--font-number)', color: 'var(--color-primary)' }}>
                    {value}
                  </p>
                  <p className="text-xs" style={{ color: 'var(--color-text-muted)' }}>{label}</p>
                </div>
              ))}
            </motion.div>
          )}

          {/* Content Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
            {/* Main Content */}
            <div className="md:col-span-2 flex flex-col gap-8">
              {/* Problem Statement */}
              <motion.section
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="card p-8"
              >
                <h2 className="text-xl mb-3" style={{ fontFamily: 'var(--font-heading)', color: 'var(--color-text)' }}>
                  Problem Statement
                </h2>
                <p style={{ color: 'var(--color-text-muted)' }}>{project.problemStatement}</p>
              </motion.section>

              {/* Description */}
              <motion.section
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="card p-8"
              >
                <h2 className="text-xl mb-3" style={{ fontFamily: 'var(--font-heading)', color: 'var(--color-text)' }}>
                  About the Project
                </h2>
                <p style={{ color: 'var(--color-text-muted)' }}>{project.description}</p>
              </motion.section>

              {/* Architecture */}
              <motion.section
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="card p-8"
                style={{ background: 'linear-gradient(135deg, rgba(255,122,0,0.04), var(--color-card))' }}
              >
                <h2 className="text-xl mb-3" style={{ fontFamily: 'var(--font-heading)', color: 'var(--color-text)' }}>
                  Architecture
                </h2>
                <p style={{ color: 'var(--color-text-muted)' }}>{project.architecture}</p>
              </motion.section>

              {/* Features */}
              <motion.section
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="card p-8"
              >
                <h2 className="text-xl mb-4" style={{ fontFamily: 'var(--font-heading)', color: 'var(--color-text)' }}>
                  Key Features
                </h2>
                <ul className="flex flex-col gap-3">
                  {project.features.map((f) => (
                    <li key={f} className="flex items-start gap-3">
                      <CheckCircle2 size={18} className="mt-0.5 flex-shrink-0" style={{ color: 'var(--color-primary)' }} />
                      <span className="text-base" style={{ color: 'var(--color-text-muted)' }}>{f}</span>
                    </li>
                  ))}
                </ul>
              </motion.section>
            </div>

            {/* Sidebar */}
            <div className="flex flex-col gap-4">
              {/* Tech Stack */}
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.3 }}
                className="card p-8"
              >
                <h3 className="text-sm font-semibold mb-3 uppercase tracking-wider" style={{ fontFamily: 'var(--font-code)', color: 'var(--color-text-muted)' }}>
                  Tech Stack
                </h3>
                <div className="flex flex-wrap gap-2">
                  {project.techStack.map((tech) => (
                    <span key={tech} className="badge">{tech}</span>
                  ))}
                </div>
              </motion.div>

              {/* Image Gallery */}
              {project.images.length > 1 && (
                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.4 }}
                  className="card p-8"
                >
                  <h3 className="text-sm font-semibold mb-3 uppercase tracking-wider" style={{ fontFamily: 'var(--font-code)', color: 'var(--color-text-muted)' }}>
                    Screenshots
                  </h3>
                  <div className="flex flex-col gap-2">
                    {project.images.slice(1).map((img, i) => (
                      <img
                        key={i}
                        src={img}
                        alt={`${project.title} screenshot ${i + 2}`}
                        className="w-full rounded-lg object-cover h-28"
                        loading="lazy"
                      />
                    ))}
                  </div>
                </motion.div>
              )}
            </div>
          </div>

          {/* Next Project */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mt-12 pt-8"
            style={{ borderTop: '1px solid var(--color-border)' }}
          >
            <div className="flex items-center justify-between">
              <Link to="/projects" className="btn btn-outline hoverable gap-2">
                <ArrowLeft size={14} /> All Projects
              </Link>
              <Link to="/contact" className="btn btn-primary hoverable">
                Start a Project →
              </Link>
            </div>
          </motion.div>
        </div>
      </article>
    </>
  );
}
