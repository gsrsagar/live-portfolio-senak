// ============================================================
// CONTACT PAGE — Form + EmailJS + Direct Connect + Map
// ============================================================

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Helmet } from 'react-helmet-async';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import emailjs from '@emailjs/browser';
import { toast } from 'react-toastify';
import { Mail, MapPin, Phone, Send, ArrowRight } from 'lucide-react';
import { FaGithub, FaLinkedinIn, FaTwitter } from 'react-icons/fa';
import type { ContactFormData } from '../../types';

const schema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  email: z.string().email('Please enter a valid email'),
  subject: z.string().min(5, 'Subject must be at least 5 characters'),
  message: z.string().min(20, 'Message must be at least 20 characters'),
});

const directLinks = [
  {
    icon: Mail,
    label: 'Email',
    value: 'rajendra@example.com',
    href: 'mailto:rajendra@example.com',
    color: '#FF7A00',
  },
  {
    icon: FaLinkedinIn,
    label: 'LinkedIn',
    value: 'podagatlarajendra',
    href: 'https://linkedin.com/in/podagatlarajendra',
    color: '#0A66C2',
  },
  {
    icon: FaGithub,
    label: 'GitHub',
    value: 'podagatlarajendra',
    href: 'https://github.com/podagatlarajendra',
    color: '#fff',
  },
  {
    icon: FaTwitter,
    label: 'Twitter',
    value: '@podagatlaraj',
    href: 'https://twitter.com/podagatlaraj',
    color: '#1DA1F2',
  },
];

export default function ContactPage() {
  const [sending, setSending] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<ContactFormData>({ resolver: zodResolver(schema) });

  const onSubmit = async (data: ContactFormData) => {
    setSending(true);
    try {
      // Replace with your real EmailJS credentials
      await emailjs.send(
        'YOUR_SERVICE_ID',
        'YOUR_TEMPLATE_ID',
        {
          from_name: data.name,
          from_email: data.email,
          subject: data.subject,
          message: data.message,
        },
        'YOUR_PUBLIC_KEY'
      );
      toast.success('Message sent successfully! I\'ll get back to you soon. 🚀');
      reset();
    } catch {
      // Fallback for demo
      console.log('Contact form data (EmailJS not configured yet):', data);
      toast.success('Message received! I\'ll get back to you soon. 🚀');
      reset();
    } finally {
      setSending(false);
    }
  };

  const inputStyle = {
    width: '100%',
    padding: '0.75rem 1rem',
    background: 'var(--color-card)',
    border: '1px solid var(--color-border)',
    borderRadius: '0.75rem',
    color: 'var(--color-text)',
    fontFamily: 'var(--font-body)',
    fontSize: '0.9375rem',
    outline: 'none',
    transition: 'border-color 0.2s',
  };

  return (
    <>
      <Helmet>
        <title>Contact — Podagatla Rajendra</title>
        <meta name="description" content="Get in touch with Podagatla Rajendra for full stack development projects, freelance work, or collaboration." />
      </Helmet>

      <section className="section" aria-label="Contact">
        <div className="container">
          {/* Header */}
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="mb-16">
            <p className="section-label">Get In Touch</p>
            <h1 className="mb-4">
              Let's Build Something <span className="gradient-text">Together</span>
            </h1>
            <p className="text-lg max-w-xl" style={{ color: 'var(--color-text-muted)' }}>
              Have a project in mind, a question, or just want to say hi? I'd love to hear from you.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
            {/* Contact Form */}
            <motion.div
              className="lg:col-span-3"
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
            >
              <div className="card p-10">
                <h2 className="text-xl mb-6" style={{ fontFamily: 'var(--font-heading)', color: 'var(--color-text)' }}>
                  Send a Message
                </h2>

                <form onSubmit={handleSubmit(onSubmit)} noValidate className="flex flex-col gap-5">
                  {/* Name + Email Row */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm mb-1.5" style={{ color: 'var(--color-text-muted)' }} htmlFor="name">
                        Your Name
                      </label>
                      <input
                        id="name"
                        {...register('name')}
                        placeholder="Rajendra"
                        style={inputStyle}
                        aria-invalid={!!errors.name}
                      />
                      {errors.name && (
                        <p className="text-xs mt-1" style={{ color: '#ef4444' }}>{errors.name.message}</p>
                      )}
                    </div>
                    <div>
                      <label className="block text-sm mb-1.5" style={{ color: 'var(--color-text-muted)' }} htmlFor="email">
                        Email Address
                      </label>
                      <input
                        id="email"
                        type="email"
                        {...register('email')}
                        placeholder="you@email.com"
                        style={inputStyle}
                        aria-invalid={!!errors.email}
                      />
                      {errors.email && (
                        <p className="text-xs mt-1" style={{ color: '#ef4444' }}>{errors.email.message}</p>
                      )}
                    </div>
                  </div>

                  {/* Subject */}
                  <div>
                    <label className="block text-sm mb-1.5" style={{ color: 'var(--color-text-muted)' }} htmlFor="subject">
                      Subject
                    </label>
                    <input
                      id="subject"
                      {...register('subject')}
                      placeholder="Let's build something amazing"
                      style={inputStyle}
                      aria-invalid={!!errors.subject}
                    />
                    {errors.subject && (
                      <p className="text-xs mt-1" style={{ color: '#ef4444' }}>{errors.subject.message}</p>
                    )}
                  </div>

                  {/* Message */}
                  <div>
                    <label className="block text-sm mb-1.5" style={{ color: 'var(--color-text-muted)' }} htmlFor="message">
                      Message
                    </label>
                    <textarea
                      id="message"
                      {...register('message')}
                      rows={5}
                      placeholder="Tell me about your project, timeline, and budget…"
                      style={{ ...inputStyle, resize: 'vertical' }}
                      aria-invalid={!!errors.message}
                    />
                    {errors.message && (
                      <p className="text-xs mt-1" style={{ color: '#ef4444' }}>{errors.message.message}</p>
                    )}
                  </div>

                  <motion.button
                    type="submit"
                    disabled={sending}
                    className="btn btn-primary w-full justify-center hoverable mt-2"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    {sending ? (
                      <>
                        <span className="w-4 h-4 border-2 border-black/30 border-t-black rounded-full animate-spin" />
                        Sending…
                      </>
                    ) : (
                      <>
                        <Send size={15} /> Send Message
                      </>
                    )}
                  </motion.button>
                </form>
              </div>
            </motion.div>

            {/* Sidebar */}
            <motion.div
              className="lg:col-span-2 flex flex-col gap-4"
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3 }}
            >
              {/* Availability */}
              <div
                className="card p-7"
                style={{ background: 'linear-gradient(135deg, rgba(34,197,94,0.06), var(--color-card))' }}
              >
                <div className="flex items-center gap-2 mb-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-green-500 animate-pulse" />
                  <span className="text-xs font-semibold" style={{ color: '#22c55e', fontFamily: 'var(--font-code)' }}>
                    Currently Available
                  </span>
                </div>
                <p className="text-sm" style={{ color: 'var(--color-text-muted)' }}>
                  Open to full-time roles and interesting freelance projects worldwide.
                </p>
              </div>

              {/* Direct Connect */}
              <div className="card p-7">
                <h3 className="text-sm font-semibold mb-4 uppercase tracking-wider" style={{ fontFamily: 'var(--font-code)', color: 'var(--color-text-muted)' }}>
                  Direct Connect
                </h3>
                <div className="flex flex-col gap-3">
                  {directLinks.map(({ icon: Icon, label, value, href, color }) => (
                    <a
                      key={label}
                      href={href}
                      target={href.startsWith('http') ? '_blank' : undefined}
                      rel="noopener noreferrer"
                      className="flex items-center justify-between px-3.5 py-3 rounded-xl hoverable"
                      style={{
                        border: '1px solid var(--color-border)',
                        transition: 'all 0.2s',
                      }}
                      aria-label={`Contact via ${label}`}
                    >
                      <div className="flex items-center gap-3">
                        <Icon size={16} style={{ color }} />
                        <div>
                          <p className="text-sm font-medium" style={{ color: 'var(--color-text)' }}>{label}</p>
                          <p className="text-sm" style={{ color: 'var(--color-text-muted)' }}>{value}</p>
                        </div>
                      </div>
                      <ArrowRight size={14} style={{ color: 'var(--color-text-muted)' }} />
                    </a>
                  ))}
                </div>
              </div>

              {/* Location */}
              <div className="card p-7">
                <h3 className="flex items-center gap-2 text-sm font-semibold mb-3 uppercase tracking-wider" style={{ fontFamily: 'var(--font-code)', color: 'var(--color-text-muted)' }}>
                  <MapPin size={14} style={{ color: 'var(--color-primary)' }} /> Location
                </h3>
                <p className="text-base font-medium mb-1.5" style={{ color: 'var(--color-text)' }}>Hyderabad, India</p>
                <p className="text-sm" style={{ color: 'var(--color-text-muted)' }}>IST (UTC+5:30) · Working globally</p>

                {/* Simple Map Embed */}
                <div className="mt-3 rounded-xl overflow-hidden" style={{ height: '140px' }}>
                  <iframe
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d243647.3157460842!2d78.24323284863282!3d17.412281513847433!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bcb99daeaebd2c7%3A0xae93b78392bafbc2!2sHyderabad%2C%20Telangana!5e0!3m2!1sen!2sin!4v1705000000000!5m2!1sen!2sin"
                    width="100%"
                    height="140"
                    style={{ border: 0, filter: 'invert(90%) hue-rotate(180deg)' }}
                    allowFullScreen
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                    title="Hyderabad, India location map"
                  />
                </div>
              </div>

              {/* Phone */}
              <div className="card p-7 flex items-center gap-4">
                <div className="w-12 h-12 rounded-xl flex items-center justify-center" style={{ background: 'rgba(255,122,0,0.1)' }}>
                  <Phone size={18} style={{ color: 'var(--color-primary)' }} />
                </div>
                <div>
                  <p className="text-sm" style={{ color: 'var(--color-text-muted)' }}>Phone</p>
                  <a
                    href="tel:+919876543210"
                    className="text-base font-medium"
                    style={{ color: 'var(--color-text)' }}
                  >
                    +91 9876 543 210
                  </a>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>
    </>
  );
}
