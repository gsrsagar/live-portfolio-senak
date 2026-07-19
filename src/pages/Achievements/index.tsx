// ============================================================
// ACHIEVEMENTS PAGE — Timeline, Counters, Badges
// ============================================================

import React from 'react';
import { motion } from 'framer-motion';
import { Helmet } from 'react-helmet-async';
import { ExternalLink } from 'lucide-react';
import { useInView } from 'react-intersection-observer';
import { achievements } from '../../data/portfolioData';

const categoryColors: Record<string, string> = {
  Hackathon: '#FF7A00',
  Certification: '#FFC107',
  Award: '#F4A261',
  Leadership: '#818CF8',
  'Open Source': '#22c55e',
  Community: '#06B6D4',
};

const stats = [
  { label: 'Awards Won', value: 3, suffix: '+' },
  { label: 'Hackathons', value: 2, suffix: '' },
  { label: 'Open Source PRs', value: 10, suffix: '+' },
  { label: 'Community Events', value: 5, suffix: '+' },
];

function StatCounter({ stat, index }: { stat: typeof stats[0]; index: number }) {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.5 });
  const [count, setCount] = React.useState(0);

  React.useEffect(() => {
    if (!inView) return;
    let start = 0;
    const end = stat.value;
    const duration = 2000;
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
      className="card p-6 text-center"
      initial={{ opacity: 0, y: 20 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ delay: index * 0.1 }}
    >
      <p className="text-3xl font-bold mb-1" style={{ fontFamily: 'var(--font-number)', color: 'var(--color-primary)' }}>
        {count}{stat.suffix}
      </p>
      <p className="text-sm" style={{ color: 'var(--color-text-muted)' }}>{stat.label}</p>
    </motion.div>
  );
}

export default function AchievementsPage() {
  return (
    <>
      <Helmet>
        <title>Achievements — Podagatla Rajendra</title>
        <meta name="description" content="Awards, hackathons, certifications, and open source contributions by Podagatla Rajendra." />
      </Helmet>

      <section className="section" aria-label="Achievements">
        <div className="container">
          {/* Header */}
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="mb-16">
            <p className="section-label">Recognition</p>
            <h1 className="mb-4">
              Milestones & <span className="gradient-text">Achievements</span>
            </h1>
            <p className="text-lg max-w-xl" style={{ color: 'var(--color-text-muted)' }}>
              Awards, recognitions, and community contributions that mark my professional journey.
            </p>
          </motion.div>

          {/* Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-16">
            {stats.map((s, i) => <StatCounter key={s.label} stat={s} index={i} />)}
          </div>

          {/* Achievements Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {achievements.map((a, i) => (
              <motion.div
                key={a.id}
                className="card p-6 hoverable gradient-border"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                whileHover={{ y: -4 }}
              >
                <div className="flex items-start gap-4">
                  {/* Icon */}
                  <div
                    className="w-12 h-12 rounded-xl flex items-center justify-center text-2xl flex-shrink-0"
                    style={{ background: `${categoryColors[a.category] ?? '#FF7A00'}15` }}
                  >
                    {a.icon}
                  </div>

                  <div className="flex-1">
                    <div className="flex items-center justify-between gap-2 mb-1">
                      <h3 className="text-base font-semibold" style={{ fontFamily: 'var(--font-heading)', color: 'var(--color-text)' }}>
                        {a.title}
                      </h3>
                      {a.link && (
                        <a href={a.link} target="_blank" rel="noopener noreferrer" className="hoverable">
                          <ExternalLink size={14} style={{ color: 'var(--color-text-muted)' }} />
                        </a>
                      )}
                    </div>

                    <div className="flex items-center gap-2 mb-2">
                      <span
                        className="px-2 py-0.5 rounded-full text-xs font-medium"
                        style={{
                          background: `${categoryColors[a.category] ?? '#FF7A00'}15`,
                          color: categoryColors[a.category] ?? 'var(--color-primary)',
                          fontFamily: 'var(--font-code)',
                        }}
                      >
                        {a.category}
                      </span>
                      <span className="text-xs" style={{ color: 'var(--color-text-subtle)', fontFamily: 'var(--font-code)' }}>
                        {a.date}
                      </span>
                    </div>

                    <p className="text-sm leading-relaxed" style={{ color: 'var(--color-text-muted)' }}>
                      {a.description}
                    </p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
