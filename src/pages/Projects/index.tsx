// ============================================================
// PROJECTS PAGE — Bento Grid, Filter, Search, Pagination
// ============================================================

import { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Helmet } from 'react-helmet-async';
import { Search, ExternalLink, ArrowRight } from 'lucide-react';
import { FaGithub } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import { projects } from '../../data/portfolioData';
import { filterProjects } from '../../utils';
import type { ProjectCategory } from '../../types';

const CATEGORIES: ProjectCategory[] = ['All', 'Full Stack', 'Frontend', 'Backend', 'AI/ML', 'Mobile'];

function ProjectCard({ project, index }: { project: typeof projects[0]; index: number }) {
  return (
    <motion.article
      layout
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.9 }}
      transition={{ delay: index * 0.08, duration: 0.4 }}
      className="card overflow-hidden group hoverable"
    >
      {/* Image */}
      <div className="relative h-56 overflow-hidden">
        <img
          src={project.image}
          alt={project.title}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
          loading="lazy"
        />
        <div
          className="absolute inset-0"
          style={{ background: 'linear-gradient(to top, rgba(11,11,15,0.95) 0%, rgba(11,11,15,0.3) 60%, transparent)' }}
        />

        {/* Status Badge */}
        <span
          className="absolute top-3 right-3 px-2 py-1 rounded-full text-xs font-medium"
          style={{
            background:
              project.status === 'completed'
                ? 'rgba(34,197,94,0.15)'
                : 'rgba(255,193,7,0.15)',
            color: project.status === 'completed' ? '#22c55e' : '#FFC107',
            border: `1px solid ${project.status === 'completed' ? 'rgba(34,197,94,0.3)' : 'rgba(255,193,7,0.3)'}`,
            fontFamily: 'var(--font-code)',
          }}
        >
          {project.status === 'completed' ? '✓ Completed' : '⏳ In Progress'}
        </span>

        {/* Overlay Actions */}
        <div className="absolute inset-0 flex items-center justify-center gap-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <a
            href={project.github}
            target="_blank"
            rel="noopener noreferrer"
            onClick={(e) => e.stopPropagation()}
            className="w-10 h-10 rounded-xl flex items-center justify-center glass hoverable"
            aria-label={`${project.title} GitHub`}
          >
            <FaGithub size={16} style={{ color: 'var(--color-text)' }} />
          </a>
          <a
            href={project.liveDemo}
            target="_blank"
            rel="noopener noreferrer"
            onClick={(e) => e.stopPropagation()}
            className="w-10 h-10 rounded-xl flex items-center justify-center glass hoverable"
            aria-label={`${project.title} Live Demo`}
          >
            <ExternalLink size={16} style={{ color: 'var(--color-text)' }} />
          </a>
        </div>
      </div>

      {/* Content */}
      <div className="p-7">
        <div className="flex items-center justify-between mb-2">
          <span className="badge">{project.category}</span>
          <span className="text-xs" style={{ color: 'var(--color-text-subtle)', fontFamily: 'var(--font-code)' }}>{project.year}</span>
        </div>

        <h3
          className="text-lg font-semibold mb-2.5 group-hover:text-primary transition-colors"
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
            <span key={tech} className="badge" style={{ fontSize: '0.7rem', padding: '0.15rem 0.5rem' }}>{tech}</span>
          ))}
          {project.techStack.length > 4 && (
            <span className="badge" style={{ fontSize: '0.7rem', padding: '0.15rem 0.5rem', background: 'rgba(255,255,255,0.05)' }}>
              +{project.techStack.length - 4}
            </span>
          )}
        </div>

        {/* Footer */}
        <div className="flex items-center justify-between">
          <Link
            to={`/projects/${project.id}`}
            className="flex items-center gap-1.5 text-sm font-medium hoverable"
            style={{ color: 'var(--color-primary)' }}
          >
            Case Study <ArrowRight size={13} />
          </Link>
          <span className="text-xs" style={{ color: 'var(--color-text-subtle)', fontFamily: 'var(--font-code)' }}>
            {project.duration}
          </span>
        </div>
      </div>
    </motion.article>
  );
}

export default function ProjectsPage() {
  const [query, setQuery] = useState('');
  const [category, setCategory] = useState<ProjectCategory>('All');

  const filtered = useMemo(
    () => filterProjects(projects, query, category),
    [query, category]
  );

  return (
    <>
      <Helmet>
        <title>Projects — Podagatla Rajendra</title>
        <meta name="description" content="Explore Podagatla Rajendra's portfolio of full stack projects including Freelancer Hub, Smart Resume Generator, and MediFusion." />
      </Helmet>

      <section className="section" aria-label="Projects">
        <div className="container">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-16"
          >
            <p className="section-label">Portfolio</p>
            <h1 className="mb-4">
              Precision Engineered <span className="gradient-text">Solutions</span>
            </h1>
            <p className="text-lg max-w-xl" style={{ color: 'var(--color-text-muted)' }}>
              A showcase of architected digital systems where high-performance code meets intuitive user experiences.
            </p>
          </motion.div>

          {/* Filters */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="flex flex-col sm:flex-row gap-4 mb-10"
          >
            {/* Search */}
            <div className="relative flex-1 max-w-sm">
              <Search
                size={15}
                className="absolute left-3 top-1/2 -translate-y-1/2"
                style={{ color: 'var(--color-text-muted)' }}
              />
              <input
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search projects…"
                className="w-full pl-9 pr-4 py-3 rounded-xl text-base outline-none"
                style={{
                  background: 'var(--color-card)',
                  border: '1px solid var(--color-border)',
                  color: 'var(--color-text)',
                  fontFamily: 'var(--font-body)',
                }}
                aria-label="Search projects"
              />
            </div>

            {/* Category Filter */}
            <div className="flex flex-wrap gap-2">
              {CATEGORIES.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setCategory(cat)}
                  className="px-4 py-2 rounded-xl text-sm font-medium transition-all duration-200"
                  style={{
                    background: category === cat ? 'linear-gradient(135deg, #FF7A00, #FFC107)' : 'var(--color-card)',
                    color: category === cat ? '#000' : 'var(--color-text-muted)',
                    border: category === cat ? 'none' : '1px solid var(--color-border)',
                  }}
                >
                  {cat}
                </button>
              ))}
            </div>
          </motion.div>

          {/* Results count */}
          <p className="text-sm mb-6" style={{ color: 'var(--color-text-muted)' }}>
            Showing{' '}
            <span style={{ color: 'var(--color-primary)', fontFamily: 'var(--font-number)' }}>
              {filtered.length}
            </span>{' '}
            {filtered.length === 1 ? 'project' : 'projects'}
          </p>

          {/* Grid */}
          <AnimatePresence mode="wait">
            {filtered.length === 0 ? (
              <motion.div
                key="empty"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="text-center py-20"
              >
                <p className="text-4xl mb-4">🔍</p>
                <p className="text-lg font-medium mb-2" style={{ color: 'var(--color-text)' }}>No projects found</p>
                <p className="text-sm" style={{ color: 'var(--color-text-muted)' }}>
                  Try adjusting your search or filter
                </p>
              </motion.div>
            ) : (
              <motion.div
                key="grid"
                className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
                layout
              >
                {filtered.map((project, i) => (
                  <ProjectCard key={project.id} project={project} index={i} />
                ))}
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </section>
    </>
  );
}
