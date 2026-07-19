// ============================================================
// NAVBAR — Glass, Sticky, Scroll-Hide/Show, Mobile Drawer
// ============================================================

import { useState, useEffect } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, Download, Moon, Sun, Terminal } from 'lucide-react';
import { useScrollDirection, useScrollY, useTheme, useCommandPalette } from '../../hooks';
import { NAV_LINKS } from '../../constants';
import ScrollProgress from '../common/ScrollProgress';

export default function Navbar() {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const scrollDir = useScrollDirection();
  const scrollY = useScrollY();
  const { mode, toggle } = useTheme();
  const { setOpen: openCmd } = useCommandPalette();
  const location = useLocation();

  // Close drawer on route change
  useEffect(() => { setDrawerOpen(false); }, [location.pathname]);

  // Close drawer on resize
  useEffect(() => {
    const handle = () => { if (window.innerWidth >= 768) setDrawerOpen(false); };
    window.addEventListener('resize', handle);
    return () => window.removeEventListener('resize', handle);
  }, []);

  const isHidden = scrollDir === 'down' && scrollY > 80;
  const isScrolled = scrollY > 20;

  return (
    <>
      <ScrollProgress />

      <motion.header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          isScrolled ? 'glass' : 'bg-transparent'
        }`}
        animate={{ y: isHidden ? -100 : 0 }}
        transition={{ duration: 0.3, ease: [0.4, 0, 0.2, 1] }}
        role="banner"
      >
        <nav className="container" role="navigation" aria-label="Main navigation">
          <div className="flex items-center justify-between h-[4.25rem]">

            {/* Logo */}
            <NavLink to="/" className="flex items-center gap-2 group" aria-label="Home">
              <motion.div
                whileHover={{ scale: 1.05 }}
                className="w-8 h-8 rounded-lg flex items-center justify-center text-sm font-bold"
                style={{
                  background: 'linear-gradient(135deg, #FF7A00, #FFC107)',
                  color: '#000',
                  fontFamily: 'var(--font-heading)',
                }}
              >
                PR
              </motion.div>
              <span
                className="font-semibold text-sm hidden sm:block"
                style={{ fontFamily: 'var(--font-heading)', color: 'var(--color-text)' }}
              >
                Podagatla Rajendra
              </span>
            </NavLink>

            {/* Desktop Nav Links */}
            <ul className="hidden lg:flex items-center gap-3" role="list">
              {NAV_LINKS.slice(0, 6).map((link) => (
                <li key={link.href}>
                  <NavLink
                    to={link.href}
                    className={({ isActive }) =>
                      `relative px-4 py-2 text-[0.8125rem] font-medium rounded-lg transition-colors duration-200 whitespace-nowrap ${
                        isActive
                          ? 'text-primary'
                          : 'text-muted hover:text-white'
                      }`
                    }
                    style={({ isActive }) => ({
                      color: isActive ? 'var(--color-primary)' : undefined,
                    })}
                  >
                    {({ isActive }) => (
                      <>
                        {link.label}
                        {isActive && (
                          <motion.div
                            layoutId="nav-indicator"
                            className="absolute -bottom-0.5 left-3 right-3 h-0.5 rounded-full"
                            style={{ background: 'linear-gradient(90deg, #FF7A00, #FFC107)' }}
                          />
                        )}
                      </>
                    )}
                  </NavLink>
                </li>
              ))}
            </ul>

            {/* Actions */}
            <div className="flex items-center gap-1.5">
              {/* Command Palette */}
              <button
                onClick={() => openCmd(true)}
                className="hidden md:flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg text-xs btn-ghost"
                style={{ border: '1px solid var(--color-border)' }}
                aria-label="Open command palette"
              >
                <Terminal size={13} />
                <span style={{ color: 'var(--color-text-muted)', fontFamily: 'var(--font-code)' }}>
                  ⌘K
                </span>
              </button>

              {/* Theme Toggle */}
              <button
                onClick={toggle}
                className="w-9 h-9 rounded-lg flex items-center justify-center btn-ghost hoverable"
                aria-label={`Switch to ${mode === 'dark' ? 'light' : 'dark'} mode`}
              >
                <motion.div
                  key={mode}
                  initial={{ rotate: -90, opacity: 0 }}
                  animate={{ rotate: 0, opacity: 1 }}
                  transition={{ duration: 0.2 }}
                >
                  {mode === 'dark' ? (
                    <Sun size={16} style={{ color: 'var(--color-text-muted)' }} />
                  ) : (
                    <Moon size={16} style={{ color: 'var(--color-text-muted)' }} />
                  )}
                </motion.div>
              </button>

              {/* Resume CTA */}
              <a
                href="/resume.pdf"
                download
                className="hidden md:flex btn btn-primary gap-2 py-2 px-4 text-sm hoverable"
                aria-label="Download Resume"
              >
                <Download size={14} />
                Resume
              </a>

              {/* Mobile Hamburger */}
              <button
                onClick={() => setDrawerOpen((v) => !v)}
                className="lg:hidden w-9 h-9 rounded-lg flex items-center justify-center btn-ghost hoverable"
                aria-label={drawerOpen ? 'Close menu' : 'Open menu'}
                aria-expanded={drawerOpen}
              >
                <AnimatePresence mode="wait">
                  <motion.div
                    key={drawerOpen ? 'close' : 'open'}
                    initial={{ rotate: -90, opacity: 0 }}
                    animate={{ rotate: 0, opacity: 1 }}
                    exit={{ rotate: 90, opacity: 0 }}
                    transition={{ duration: 0.15 }}
                  >
                    {drawerOpen ? (
                      <X size={18} style={{ color: 'var(--color-text)' }} />
                    ) : (
                      <Menu size={18} style={{ color: 'var(--color-text)' }} />
                    )}
                  </motion.div>
                </AnimatePresence>
              </button>
            </div>
          </div>
        </nav>
      </motion.header>

      {/* Mobile Drawer */}
      <AnimatePresence>
        {drawerOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              className="fixed inset-0 z-40 bg-black/60 backdrop-blur-sm"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setDrawerOpen(false)}
            />

            {/* Drawer */}
            <motion.div
              className="fixed top-0 right-0 bottom-0 z-50 w-72 flex flex-col"
              style={{
                background: 'var(--color-card)',
                borderLeft: '1px solid var(--color-border)',
              }}
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', stiffness: 300, damping: 30 }}
            >
              {/* Drawer Header */}
              <div
                className="flex items-center justify-between p-4"
                style={{ borderBottom: '1px solid var(--color-border)' }}
              >
                <span
                  className="font-semibold"
                  style={{ fontFamily: 'var(--font-heading)', color: 'var(--color-text)' }}
                >
                  Navigation
                </span>
                <button
                  onClick={() => setDrawerOpen(false)}
                  className="w-8 h-8 rounded-lg flex items-center justify-center btn-ghost"
                  aria-label="Close menu"
                >
                  <X size={16} style={{ color: 'var(--color-text-muted)' }} />
                </button>
              </div>

              {/* Drawer Links */}
              <nav className="flex-1 overflow-y-auto p-4">
                <ul className="flex flex-col gap-1">
                  {NAV_LINKS.map((link, i) => (
                    <motion.li
                      key={link.href}
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: i * 0.05 }}
                    >
                      <NavLink
                        to={link.href}
                        className={({ isActive }) =>
                          `flex items-center px-3 py-2.5 rounded-lg text-sm font-medium transition-all duration-200 ${
                            isActive ? 'text-primary bg-primary/10' : 'text-muted hover:text-white hover:bg-white/5'
                          }`
                        }
                        style={({ isActive }) => ({
                          color: isActive ? 'var(--color-primary)' : undefined,
                          background: isActive ? 'rgba(255,122,0,0.08)' : undefined,
                        })}
                      >
                        {link.label}
                      </NavLink>
                    </motion.li>
                  ))}
                </ul>
              </nav>

              {/* Drawer Footer */}
              <div className="p-4" style={{ borderTop: '1px solid var(--color-border)' }}>
                <a
                  href="/resume.pdf"
                  download
                  className="flex items-center justify-center gap-2 w-full btn btn-primary text-sm"
                >
                  <Download size={14} />
                  Download Resume
                </a>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
