// ============================================================
// SKILLS PAGE — Cards, Radar Chart, Progress Bars
// ============================================================

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Helmet } from 'react-helmet-async';
import { Radar } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  RadialLinearScale,
  PointElement,
  LineElement,
  Filler,
  Tooltip,
  Legend,
} from 'chart.js';
import { skills } from '../../data/portfolioData';
import type { SkillCategory } from '../../types';

ChartJS.register(RadialLinearScale, PointElement, LineElement, Filler, Tooltip, Legend);

const CATEGORIES: SkillCategory[] = ['Frontend', 'Backend', 'Database', 'Cloud', 'DevOps', 'AI/ML', 'Languages', 'Tools'];

const techIcons: Record<string, string> = {
  react: '⚛️', typescript: '📘', nextjs: '▲', tailwind: '🎨', redux: '🔮', framer: '🎞️',
  nodejs: '🟢', express: '🚀', socketio: '🔌', api: '🔗', graphql: '◈',
  mongodb: '🍃', postgresql: '🐘', redis: '🔴', prisma: '◆',
  aws: '☁️', vercel: '▲', docker: '🐳', git: '📦', cicd: '⚙️',
  python: '🐍', tensorflow: '🧠', opencv: '👁️', gemini: '✨',
  javascript: '📜', sql: '🗄️',
  postman: '📮', figma: '🎨',
};

function SkillCard({ skill, index }: { skill: typeof skills[0]; index: number }) {
  return (
    <motion.div
      className="card"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.05 }}
      whileHover={{ y: -4 }}
    >
      {/* Icon + Name */}
      <div className="flex items-center gap-3.5 mb-4">
        <span className="text-2xl">{techIcons[skill.icon] ?? '💻'}</span>
        <div className="flex-1 min-w-0">
          <p className="text-base font-semibold truncate" style={{ color: 'var(--color-text)', fontFamily: 'var(--font-heading)' }}>
            {skill.name}
          </p>
          <p className="text-sm" style={{ color: 'var(--color-primary)', fontFamily: 'var(--font-number)' }}>
            {skill.level}%
          </p>
        </div>
      </div>

      {/* Progress Bar */}
      <div
        className="h-2 rounded-full overflow-hidden"
        style={{ background: 'rgba(255,255,255,0.06)' }}
      >
        <motion.div
          className="h-full rounded-full"
          style={{ background: `linear-gradient(90deg, var(--color-primary), ${skill.color})` }}
          initial={{ width: 0 }}
          whileInView={{ width: `${skill.level}%` }}
          viewport={{ once: true }}
          transition={{ duration: 1, ease: 'easeOut', delay: index * 0.04 }}
        />
      </div>
    </motion.div>
  );
}

export default function SkillsPage() {
  const [activeCategory, setActiveCategory] = useState<SkillCategory | 'All'>('All');

  const filtered = activeCategory === 'All'
    ? skills
    : skills.filter((s) => s.category === activeCategory);

  // Radar chart data — one value per category
  const radarLabels = CATEGORIES;
  const radarData = radarLabels.map((cat) => {
    const catSkills = skills.filter((s) => s.category === cat);
    if (catSkills.length === 0) return 0;
    return Math.round(catSkills.reduce((sum, s) => sum + s.level, 0) / catSkills.length);
  });

  const chartData = {
    labels: radarLabels,
    datasets: [
      {
        label: 'Skill Level',
        data: radarData,
        backgroundColor: 'rgba(255, 122, 0, 0.12)',
        borderColor: '#FF7A00',
        borderWidth: 2,
        pointBackgroundColor: '#FFC107',
        pointBorderColor: '#FF7A00',
        pointHoverBackgroundColor: '#fff',
        pointHoverBorderColor: '#FF7A00',
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    plugins: {
      legend: { display: false },
      tooltip: {
        backgroundColor: 'rgba(26,26,26,0.95)',
        borderColor: 'rgba(255,122,0,0.3)',
        borderWidth: 1,
        titleColor: '#FF7A00',
        bodyColor: '#888',
      },
    },
    scales: {
      r: {
        min: 0,
        max: 100,
        ticks: {
          display: false,
          stepSize: 25,
        },
        grid: { color: 'rgba(255,255,255,0.06)' },
        pointLabels: {
          color: '#888',
          font: { family: 'JetBrains Mono', size: 11 },
        },
        angleLines: { color: 'rgba(255,255,255,0.04)' },
      },
    },
  };

  return (
    <>
      <Helmet>
        <title>Skills — Podagatla Rajendra</title>
        <meta name="description" content="Technical skills of Podagatla Rajendra including React, Node.js, TypeScript, MongoDB, and more." />
      </Helmet>

      <section className="section" aria-label="Skills">
        <div className="container">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-16"
          >
            <p className="section-label">Capabilities</p>
            <h1 className="mb-4">
              Technical <span className="gradient-text">Skills</span>
            </h1>
            <p className="text-lg max-w-xl" style={{ color: 'var(--color-text-muted)' }}>
              A curated set of technologies I've mastered across the full stack — from pixel-perfect frontends to scalable backend systems.
            </p>
          </motion.div>

          {/* Radar Chart + Top Stats */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 mb-16">
            <motion.div
              className="card p-8"
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
            >
              <h2 className="text-xl mb-6" style={{ fontFamily: 'var(--font-heading)', color: 'var(--color-text)' }}>
                Skill Radar
              </h2>
              <div className="chart-container">
                <Radar data={chartData} options={chartOptions} />
              </div>
            </motion.div>

            <motion.div
              className="flex flex-col gap-4"
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3 }}
            >
              <h2 className="text-xl" style={{ fontFamily: 'var(--font-heading)', color: 'var(--color-text)' }}>
                Proficiency Breakdown
              </h2>
              {CATEGORIES.map((cat) => {
                const catSkills = skills.filter((s) => s.category === cat);
                if (catSkills.length === 0) return null;
                const avg = Math.round(catSkills.reduce((s, sk) => s + sk.level, 0) / catSkills.length);
                return (
                  <div key={cat}>
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-sm font-medium" style={{ color: 'var(--color-text)', fontFamily: 'var(--font-heading)' }}>
                        {cat}
                      </span>
                      <span className="text-xs" style={{ color: 'var(--color-primary)', fontFamily: 'var(--font-number)' }}>
                        {avg}%
                      </span>
                    </div>
                    <div className="h-2 rounded-full overflow-hidden" style={{ background: 'rgba(255,255,255,0.06)' }}>
                      <motion.div
                        className="h-full rounded-full"
                        style={{ background: 'linear-gradient(90deg, #FF7A00, #FFC107)' }}
                        initial={{ width: 0 }}
                        whileInView={{ width: `${avg}%` }}
                        viewport={{ once: true }}
                        transition={{ duration: 1, ease: 'easeOut' }}
                      />
                    </div>
                  </div>
                );
              })}
            </motion.div>
          </div>

          {/* Category Filter */}
          <div className="flex flex-wrap gap-2.5 mb-10">
            {(['All', ...CATEGORIES] as const).map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat as SkillCategory | 'All')}
                className="px-4 py-2 rounded-xl text-sm font-medium transition-all duration-200"
                style={{
                  background: activeCategory === cat ? 'linear-gradient(135deg, #FF7A00, #FFC107)' : 'var(--color-card)',
                  color: activeCategory === cat ? '#000' : 'var(--color-text-muted)',
                  border: activeCategory === cat ? 'none' : '1px solid var(--color-border)',
                }}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Skills Grid */}
          <motion.div
            className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-5"
            layout
          >
            {filtered.map((skill, i) => (
              <SkillCard key={skill.name} skill={skill} index={i} />
            ))}
          </motion.div>
        </div>
      </section>
    </>
  );
}
