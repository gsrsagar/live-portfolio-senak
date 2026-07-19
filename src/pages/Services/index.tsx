// ============================================================
// SERVICES PAGE
// ============================================================

import { motion } from 'framer-motion';
import { Helmet } from 'react-helmet-async';
import { Check, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { services } from '../../data/portfolioData';

export default function ServicesPage() {
  return (
    <>
      <Helmet>
        <title>Services — Podagatla Rajendra</title>
        <meta name="description" content="Full Stack Development, UI/UX, API Development, and AI Integration services offered by Podagatla Rajendra." />
      </Helmet>

      <section className="section" aria-label="Services">
        <div className="container">
          {/* Header */}
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="mb-16 text-center">
            <p className="section-label justify-center">What I Offer</p>
            <h1 className="mb-4">
              Services & <span className="gradient-text">Solutions</span>
            </h1>
            <p className="text-lg max-w-xl mx-auto" style={{ color: 'var(--color-text-muted)' }}>
              From idea to deployment — I provide end-to-end development services tailored to your needs.
            </p>
          </motion.div>

          {/* Services Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-20">
            {services.map((service, i) => (
              <motion.div
                key={service.id}
                className={`card p-8 relative overflow-hidden ${service.popular ? 'gradient-border' : ''}`}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                whileHover={{ y: -6 }}
              >
                {service.popular && (
                  <div
                    className="absolute top-4 right-4 px-2 py-0.5 rounded-full text-xs font-bold"
                    style={{
                      background: 'linear-gradient(135deg, #FF7A00, #FFC107)',
                      color: '#000',
                      fontFamily: 'var(--font-code)',
                    }}
                  >
                    Most Popular
                  </div>
                )}

                {/* Icon */}
                <div
                  className="w-12 h-12 rounded-xl flex items-center justify-center text-2xl mb-4"
                  style={{ background: 'rgba(255,122,0,0.1)' }}
                >
                  {service.icon}
                </div>

                <h3 className="text-xl font-semibold mb-3" style={{ fontFamily: 'var(--font-heading)', color: 'var(--color-text)' }}>
                  {service.title}
                </h3>
                <p className="text-base mb-5 leading-relaxed" style={{ color: 'var(--color-text-muted)' }}>
                  {service.description}
                </p>

                {/* Features */}
                <ul className="flex flex-col gap-3 mb-7">
                  {service.features.map((f) => (
                    <li key={f} className="flex items-center gap-2.5 text-base" style={{ color: 'var(--color-text-muted)' }}>
                      <Check size={14} style={{ color: 'var(--color-primary)', flexShrink: 0 }} />
                      {f}
                    </li>
                  ))}
                </ul>

                <Link
                  to="/contact"
                  className="flex items-center gap-2 text-sm font-medium hoverable"
                  style={{ color: 'var(--color-primary)' }}
                >
                  Get Started <ArrowRight size={13} />
                </Link>
              </motion.div>
            ))}
          </div>

          {/* CTA */}
          <motion.div
            className="card p-12 text-center"
            style={{ background: 'linear-gradient(135deg, rgba(255,122,0,0.05), var(--color-card))' }}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-2xl mb-3" style={{ fontFamily: 'var(--font-heading)', color: 'var(--color-text)' }}>
              Have a custom requirement?
            </h2>
            <p className="text-base mb-6 max-w-md mx-auto" style={{ color: 'var(--color-text-muted)' }}>
              Let's discuss your project and craft a tailored solution that fits your needs and budget.
            </p>
            <Link to="/contact" className="btn btn-primary hoverable">
              Start a Conversation <ArrowRight size={15} />
            </Link>
          </motion.div>
        </div>
      </section>
    </>
  );
}
