// ============================================================
// EDUCATION PAGE
// ============================================================

import { motion } from 'framer-motion';
import { Helmet } from 'react-helmet-async';
import { MapPin, Award, BookOpen } from 'lucide-react';
import { education } from '../../data/portfolioData';

export default function EducationPage() {
  return (
    <>
      <Helmet>
        <title>Education — Podagatla Rajendra</title>
        <meta name="description" content="Education background of Podagatla Rajendra — B.Tech CSE at Sandip University." />
      </Helmet>

      <section className="section" aria-label="Education">
        <div className="container">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="mb-16">
            <p className="section-label">Academic Background</p>
            <h1 className="mb-4">
              Education & <span className="gradient-text">Learning</span>
            </h1>
            <p className="text-lg max-w-xl" style={{ color: 'var(--color-text-muted)' }}>
              Building a strong theoretical foundation alongside practical industry skills.
            </p>
          </motion.div>

          {education.map((edu, i) => (
            <motion.div
              key={edu.id}
              className="card p-10 mb-10 gradient-border"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.15 }}
            >
              {/* Header */}
              <div className="flex flex-col md:flex-row md:items-start gap-6 mb-6">
                <div className="w-16 h-16 rounded-2xl overflow-hidden flex-shrink-0" style={{ border: '1px solid var(--color-border)' }}>
                  <img src={edu.logo} alt={`${edu.institution} logo`} className="w-full h-full object-cover" />
                </div>
                <div className="flex-1">
                  <h2 className="text-xl font-semibold mb-1" style={{ fontFamily: 'var(--font-heading)', color: 'var(--color-text)' }}>
                    {edu.institution}
                  </h2>
                  <p className="text-base mb-2" style={{ color: 'var(--color-primary)' }}>
                    {edu.degree} in {edu.field}
                  </p>
                  <div className="flex flex-wrap gap-4 text-sm" style={{ color: 'var(--color-text-muted)' }}>
                    <span>📅 {edu.duration}</span>
                    <span className="flex items-center gap-1.5">
                      <MapPin size={13} style={{ color: 'var(--color-primary)' }} />
                      {edu.location}
                    </span>
                    <span
                      className="px-2 py-0.5 rounded-full text-xs font-bold"
                      style={{
                        background: 'rgba(255,122,0,0.1)',
                        color: 'var(--color-primary)',
                        fontFamily: 'var(--font-number)',
                      }}
                    >
                      🎓 {edu.grade}
                    </span>
                  </div>
                </div>
              </div>

              <p className="text-base mb-8 leading-relaxed" style={{ color: 'var(--color-text-muted)' }}>
                {edu.description}
              </p>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {/* Achievements */}
                <div>
                  <h3 className="flex items-center gap-2 text-sm font-semibold uppercase tracking-wider mb-4" style={{ color: 'var(--color-text-muted)', fontFamily: 'var(--font-code)' }}>
                    <Award size={14} style={{ color: 'var(--color-primary)' }} /> Achievements
                  </h3>
                  <ul className="flex flex-col gap-3">
                    {edu.achievements.map((a) => (
                      <li key={a} className="flex items-center gap-2.5 text-base" style={{ color: 'var(--color-text-muted)' }}>
                        <span style={{ color: 'var(--color-primary)' }}>✓</span> {a}
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Key Subjects */}
                <div>
                  <h3 className="flex items-center gap-2 text-sm font-semibold uppercase tracking-wider mb-3" style={{ color: 'var(--color-text-muted)', fontFamily: 'var(--font-code)' }}>
                    <BookOpen size={14} style={{ color: 'var(--color-primary)' }} /> Core Subjects
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {edu.subjects.map((s) => (
                      <span key={s} className="badge" style={{ fontSize: '0.7rem' }}>{s}</span>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </section>
    </>
  );
}
