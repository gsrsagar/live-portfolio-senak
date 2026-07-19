// ============================================================
// EXPERIENCE PAGE — Animated Timeline, Company Cards
// ============================================================

import { motion } from 'framer-motion';
import { Helmet } from 'react-helmet-async';
import { MapPin, Calendar, ExternalLink, CheckCircle2 } from 'lucide-react';
import { experiences } from '../../data/portfolioData';

const typeColors: Record<string, string> = {
  Internship: 'rgba(255,193,7,0.15)',
  'Full-time': 'rgba(34,197,94,0.15)',
  Freelance: 'rgba(99,102,241,0.15)',
  Contract: 'rgba(239,68,68,0.15)',
};
const typeTextColors: Record<string, string> = {
  Internship: '#FFC107',
  'Full-time': '#22c55e',
  Freelance: '#818CF8',
  Contract: '#f87171',
};

export default function ExperiencePage() {
  return (
    <>
      <Helmet>
        <title>Experience — Podagatla Rajendra</title>
        <meta name="description" content="Professional experience of Podagatla Rajendra including internship at Cognifyz Technologies and freelance work." />
      </Helmet>

      <section className="section" aria-label="Experience">
        <div className="container">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-16"
          >
            <p className="section-label">Work History</p>
            <h1 className="mb-4">
              Professional <span className="gradient-text">Experience</span>
            </h1>
            <p className="text-lg max-w-xl" style={{ color: 'var(--color-text-muted)' }}>
              2+ years of hands-on experience building real-world applications, working with teams, and delivering results.
            </p>
          </motion.div>

          {/* Timeline */}
          <div className="relative max-w-3xl">
            {/* Vertical line */}
            <div
              className="absolute left-6 top-0 bottom-0 w-px hidden md:block"
              style={{ background: 'linear-gradient(to bottom, var(--color-primary), transparent)' }}
              aria-hidden="true"
            />

            <div className="flex flex-col gap-12">
              {experiences.map((exp, i) => (
                <motion.div
                  key={exp.id}
                  className="md:pl-16 relative"
                  initial={{ opacity: 0, x: -30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.15 }}
                >
                  {/* Timeline Dot */}
                  <div
                    className="absolute left-4 top-6 w-4 h-4 rounded-full border-2 hidden md:block"
                    style={{
                      borderColor: 'var(--color-primary)',
                      background: 'var(--color-primary)',
                      boxShadow: '0 0 16px rgba(255,122,0,0.4)',
                    }}
                    aria-hidden="true"
                  />

                  {/* Card */}
                  <div className="card p-8 gradient-border">
                    {/* Header Row */}
                    <div className="flex flex-col sm:flex-row sm:items-start gap-4 mb-5">
                      {/* Logo */}
                      <div className="w-12 h-12 rounded-xl overflow-hidden flex-shrink-0" style={{ border: '1px solid var(--color-border)' }}>
                        <img src={exp.logo} alt={`${exp.company} logo`} className="w-full h-full object-cover" />
                      </div>

                      <div className="flex-1">
                        <div className="flex flex-wrap items-center gap-2.5 mb-2">
                          <h2 className="text-xl font-semibold" style={{ fontFamily: 'var(--font-heading)', color: 'var(--color-text)' }}>
                            {exp.role}
                          </h2>
                          <span
                            className="px-2 py-0.5 rounded-full text-xs font-medium"
                            style={{
                              background: typeColors[exp.type] ?? 'rgba(255,122,0,0.1)',
                              color: typeTextColors[exp.type] ?? 'var(--color-primary)',
                              fontFamily: 'var(--font-code)',
                            }}
                          >
                            {exp.type}
                          </span>
                        </div>

                        <a
                          href={exp.companyUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center gap-1.5 text-base font-medium hoverable"
                          style={{ color: 'var(--color-primary)' }}
                        >
                          {exp.company} <ExternalLink size={12} />
                        </a>

                        <div className="flex flex-wrap items-center gap-4 mt-2.5 text-sm" style={{ color: 'var(--color-text-muted)' }}>
                          <span className="flex items-center gap-1.5">
                            <Calendar size={12} style={{ color: 'var(--color-primary)' }} />
                            {exp.startDate} — {exp.endDate}
                          </span>
                          <span className="flex items-center gap-1.5">
                            <MapPin size={12} style={{ color: 'var(--color-primary)' }} />
                            {exp.location}
                          </span>
                        </div>
                      </div>
                    </div>

                    <p className="text-base mb-6 leading-relaxed" style={{ color: 'var(--color-text-muted)' }}>
                      {exp.description}
                    </p>

                    {/* Responsibilities */}
                    <div className="mb-6">
                      <h3 className="text-sm font-semibold uppercase tracking-wider mb-4" style={{ color: 'var(--color-text-muted)', fontFamily: 'var(--font-code)' }}>
                        Responsibilities
                      </h3>
                      <ul className="flex flex-col gap-3">
                        {exp.responsibilities.map((r) => (
                          <li key={r} className="flex items-start gap-3 text-base" style={{ color: 'var(--color-text-muted)' }}>
                            <CheckCircle2 size={16} className="mt-0.5 flex-shrink-0" style={{ color: 'var(--color-primary)' }} />
                            {r}
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* Achievements */}
                    <div className="mb-6">
                      <h3 className="text-sm font-semibold uppercase tracking-wider mb-4" style={{ color: 'var(--color-text-muted)', fontFamily: 'var(--font-code)' }}>
                        Key Achievements
                      </h3>
                      <ul className="flex flex-col gap-3">
                        {exp.achievements.map((a) => (
                          <li key={a} className="flex items-start gap-3 text-base" style={{ color: '#22c55e' }}>
                            <span className="mt-0.5">⭐</span>
                            {a}
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* Technologies */}
                    <div className="flex flex-wrap gap-2">
                      {exp.technologies.map((t) => (
                        <span key={t} className="badge">{t}</span>
                      ))}
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
