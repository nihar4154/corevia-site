import { Suspense, lazy, useEffect, useMemo, useState } from 'react';
import {
  ArrowRight,
  CalendarCheck2,
  Cloud,
  Code2,
  Database,
  Linkedin,
  Mail,
  Menu,
  MessageCircle,
  Moon,
  ServerCog,
  Sun,
  X,
} from 'lucide-react';
const TestimonialsSection = lazy(() => import('./components/TestimonialsSection'));

const SITE_URL = 'https://coreviasystems.io';
const SITE_TITLE = 'Corevia Systems Pvt Ltd | Scalable Software Solutions';
const SITE_DESCRIPTION =
  'Corevia Systems Pvt Ltd delivers scalable software solutions across custom development, web applications, backend engineering, APIs, and cloud deployment.';

const services = [
  {
    title: 'Custom Software Development',
    description:
      'Tailored software platforms built around your workflows, goals, and scale requirements.',
    icon: Code2,
  },
  {
    title: 'Web Application Development',
    description:
      'High-performance, responsive web apps with clean UX and maintainable front-end architecture.',
    icon: Database,
  },
  {
    title: 'Backend Systems (Java / Spring Boot)',
    description:
      'Robust, enterprise-grade backend services with secure architecture and scalable APIs.',
    icon: ServerCog,
  },
  {
    title: 'API Development',
    description:
      'RESTful and event-driven integrations that connect your products, teams, and partners.',
    icon: ArrowRight,
  },
  {
    title: 'Cloud & Deployment',
    description:
      'Cloud-native deployments, CI/CD pipelines, and optimized operations across modern environments.',
    icon: Cloud,
  },
];

const techStack = ['Java', 'Spring Boot', 'Microservices', 'AWS', 'Docker', 'React'];

const caseStudies = [
  {
    name: 'FinEdge Dashboard',
    result: 'Reduced reporting time by 68% through unified analytics and workflow automation.',
  },
  {
    name: 'MediBridge API Platform',
    result: 'Enabled secure interoperability across 14 partner systems with 99.95% uptime.',
  },
  {
    name: 'RetailSync Cloud Suite',
    result: 'Scaled from 20k to 1.2M monthly requests while lowering infra costs by 31%.',
  },
];

const testimonials = [
  {
    quote:
      'Corevia delivered our platform modernization ahead of schedule with excellent engineering discipline.',
    name: 'Aarav Menon',
    role: 'CTO, FinTech Startup',
  },
  {
    quote:
      'Their backend architecture and API strategy helped us scale globally without operational friction.',
    name: 'Nisha Rao',
    role: 'Head of Engineering, HealthTech Company',
  },
];

const clientLogos = [
  { name: 'Northstar Labs', src: '/logos/northstar.svg' },
  { name: 'Velocity Commerce', src: '/logos/velocity.svg' },
  { name: 'Bridgeleaf Health', src: '/logos/bridgeleaf.svg' },
  { name: 'Lumen Data', src: '/logos/lumendata.svg' },
];

const trackEvent = (eventName, params = {}) => {
  if (typeof window !== 'undefined' && typeof window.gtag === 'function') {
    window.gtag('event', eventName, params);
  }
};

const setMetaTag = ({ name, property, content }) => {
  const selector = name ? `meta[name="${name}"]` : `meta[property="${property}"]`;
  let tag = document.head.querySelector(selector);

  if (!tag) {
    tag = document.createElement('meta');
    if (name) tag.setAttribute('name', name);
    if (property) tag.setAttribute('property', property);
    document.head.appendChild(tag);
  }

  tag.setAttribute('content', content);
};

export default function App() {
  const [isDark, setIsDark] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [formStatus, setFormStatus] = useState('');

  useEffect(() => {
    const savedTheme = localStorage.getItem('corevia-theme');
    if (savedTheme === 'dark') {
      setIsDark(true);
      document.documentElement.classList.add('dark');
    }
  }, []);

  useEffect(() => {
    document.title = SITE_TITLE;
    setMetaTag({ name: 'description', content: SITE_DESCRIPTION });
    setMetaTag({ property: 'og:title', content: SITE_TITLE });
    setMetaTag({ property: 'og:description', content: SITE_DESCRIPTION });
    setMetaTag({ property: 'og:url', content: SITE_URL });
    setMetaTag({ property: 'og:type', content: 'website' });
    setMetaTag({ name: 'twitter:card', content: 'summary_large_image' });
    setMetaTag({ name: 'twitter:title', content: SITE_TITLE });
    setMetaTag({ name: 'twitter:description', content: SITE_DESCRIPTION });

    trackEvent('page_view', {
      page_title: SITE_TITLE,
      page_location: window.location.href,
      page_path: window.location.pathname,
    });
  }, []);

  const navItems = useMemo(
    () => [
      { label: 'About', href: '#about' },
      { label: 'Services', href: '#services' },
      { label: 'Tech Stack', href: '#tech' },
      { label: 'Projects', href: '#projects' },
      { label: 'Testimonials', href: '#testimonials' },
      { label: 'Contact', href: '#contact' },
    ],
    []
  );

  const toggleTheme = () => {
    const nextTheme = !isDark;
    setIsDark(nextTheme);
    document.documentElement.classList.toggle('dark', nextTheme);
    localStorage.setItem('corevia-theme', nextTheme ? 'dark' : 'light');
    trackEvent('theme_toggle', { theme: nextTheme ? 'dark' : 'light' });
  };

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setFormStatus('');

    const formspreeEndpoint = import.meta.env.VITE_FORMSPREE_ENDPOINT;

    if (formspreeEndpoint) {
      try {
        const response = await fetch(formspreeEndpoint, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Accept: 'application/json',
          },
          body: JSON.stringify(formData),
        });

        if (response.ok) {
          setFormStatus('Thanks! Your message has been sent successfully.');
          setFormData({ name: '', email: '', message: '' });
          trackEvent('contact_form_submit', { method: 'formspree' });
          return;
        }
      } catch {
        setFormStatus('Form submission failed. Falling back to email compose.');
      }
    }

    const subject = encodeURIComponent(`New inquiry from ${formData.name}`);
    const body = encodeURIComponent(
      `Name: ${formData.name}\nEmail: ${formData.email}\n\nMessage:\n${formData.message}`
    );

    window.location.href = `mailto:team.corevia@gmail.com?subject=${subject}&body=${body}`;
    setFormStatus('Your email app should open now. If not, email us at team.corevia@gmail.com.');
    setFormData({ name: '', email: '', message: '' });
    trackEvent('contact_form_submit', { method: 'mailto' });
  };

  return (
    <div className="relative overflow-x-hidden">
      <a href="#main-content" className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-50 focus:rounded-md focus:bg-white focus:px-4 focus:py-2 focus:text-slate-900">
        Skip to content
      </a>

      <header className="sticky top-0 z-40 border-b border-slate-200/70 bg-white/90 backdrop-blur dark:border-slate-800 dark:bg-slate-950/90">
        <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-6 lg:px-8">
          <a href="#" className="inline-flex items-center gap-3" aria-label="Corevia Systems home">
            <img
              src="/corevia-logo.svg"
              alt="Corevia Systems logo"
              className="h-9 w-auto md:h-10"
              loading="eager"
              decoding="async"
            />
            <span className="sr-only">Corevia Systems</span>
          </a>

          <nav aria-label="Primary" className="hidden items-center gap-6 md:flex">
            {navItems.map((item) => (
              <a key={item.href} href={item.href} className="text-sm text-slate-600 transition hover:text-indigo-500 dark:text-slate-300">
                {item.label}
              </a>
            ))}
          </nav>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={toggleTheme}
              aria-label="Toggle theme"
              className="rounded-full border border-slate-200 p-2 text-slate-600 transition hover:border-indigo-300 hover:text-indigo-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-400 dark:border-slate-700 dark:text-slate-300"
            >
              {isDark ? <Sun size={18} /> : <Moon size={18} />}
            </button>
            <button
              type="button"
              onClick={() => setIsMenuOpen((prev) => !prev)}
              className="rounded-md p-2 text-slate-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-400 md:hidden dark:text-slate-200"
              aria-label="Toggle navigation"
            >
              {isMenuOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </div>

        {isMenuOpen && (
          <div className="border-t border-slate-200 px-6 py-3 md:hidden dark:border-slate-800">
            <div className="flex flex-col gap-3">
              {navItems.map((item) => (
                <a
                  key={item.href}
                  href={item.href}
                  className="text-sm text-slate-700 dark:text-slate-200"
                  onClick={() => setIsMenuOpen(false)}
                >
                  {item.label}
                </a>
              ))}
            </div>
          </div>
        )}
      </header>

      <main id="main-content">
        <section className="section-shell relative pt-16">
          <div className="absolute inset-x-0 top-4 -z-10 mx-auto h-64 max-w-3xl rounded-full bg-indigo-500/20 blur-3xl" />
          <p className="mb-4 inline-flex rounded-full border border-indigo-200 bg-indigo-50 px-4 py-1 text-sm font-medium text-indigo-700 dark:border-indigo-800 dark:bg-indigo-950/50 dark:text-indigo-300">
            Software Development & IT Services
          </p>
          <h1 className="max-w-4xl text-4xl font-extrabold tracking-tight md:text-6xl">
            Building Scalable Software Solutions
          </h1>
          <p className="mt-6 max-w-2xl text-lg text-slate-600 dark:text-slate-300">
            We help ambitious businesses design, build, and scale reliable digital products with modern engineering and premium user experiences.
          </p>
          <div className="mt-8 flex flex-wrap gap-4">
            <a
              href="#contact"
              className="rounded-xl bg-indigo-600 px-6 py-3 text-sm font-semibold text-white shadow-premium transition hover:bg-indigo-500"
              onClick={() => trackEvent('cta_click', { cta: 'contact_us' })}
            >
              Contact Us
            </a>
            <a
              href="#contact"
              className="rounded-xl border border-slate-300 px-6 py-3 text-sm font-semibold text-slate-700 transition hover:border-indigo-300 hover:text-indigo-500 dark:border-slate-700 dark:text-slate-200"
              onClick={() => trackEvent('cta_click', { cta: 'get_quote' })}
            >
              Get Quote
            </a>
          </div>
        </section>

        <section className="section-shell pt-4">
          <h2 className="sr-only">Trusted by teams building modern products</h2>
          <div className="rounded-2xl border border-slate-200 bg-white p-6 dark:border-slate-800 dark:bg-slate-900">
            <div className="grid grid-cols-2 items-center gap-6 md:grid-cols-4">
              {clientLogos.map((logo) => (
                <img
                  key={logo.name}
                  src={logo.src}
                  alt={`${logo.name} logo`}
                  loading="lazy"
                  width="180"
                  height="48"
                  className="mx-auto h-10 w-auto opacity-80 grayscale transition hover:opacity-100 hover:grayscale-0"
                />
              ))}
            </div>
          </div>
        </section>

        <section id="about" className="section-shell pt-8">
          <h2 className="section-title">About Corevia Systems</h2>
          <p className="section-subtitle">
            Corevia Systems Pvt Ltd is a software development partner focused on delivering production-grade applications, resilient backend platforms, and cloud-ready systems for startups and enterprises.
          </p>
          <div className="mt-10 grid gap-6 md:grid-cols-2">
            <article className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900">
              <h3 className="text-xl font-semibold">Vision</h3>
              <p className="mt-3 text-slate-600 dark:text-slate-300">
                To become a trusted technology partner for global businesses by building software that is scalable, secure, and future-ready.
              </p>
            </article>
            <article className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900">
              <h3 className="text-xl font-semibold">Mission</h3>
              <p className="mt-3 text-slate-600 dark:text-slate-300">
                To deliver measurable business value through expert engineering, transparent collaboration, and continuous product improvement.
              </p>
            </article>
          </div>
        </section>

        <section id="services" className="section-shell pt-8">
          <h2 className="section-title">Services</h2>
          <p className="section-subtitle">End-to-end engineering services to take your idea from concept to scale.</p>
          <div className="mt-10 grid gap-6 md:grid-cols-2 xl:grid-cols-3">
            {services.map(({ title, description, icon: Icon }) => (
              <article key={title} className="group rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:shadow-premium dark:border-slate-800 dark:bg-slate-900">
                <span className="inline-flex rounded-lg bg-indigo-100 p-3 text-indigo-600 transition group-hover:bg-indigo-600 group-hover:text-white dark:bg-indigo-900/40 dark:text-indigo-300">
                  <Icon size={20} />
                </span>
                <h3 className="mt-4 text-lg font-semibold">{title}</h3>
                <p className="mt-2 text-sm leading-6 text-slate-600 dark:text-slate-300">{description}</p>
              </article>
            ))}
          </div>
        </section>

        <section id="tech" className="section-shell pt-8">
          <h2 className="section-title">Tech Stack</h2>
          <div className="mt-8 flex flex-wrap gap-3">
            {techStack.map((tech) => (
              <span key={tech} className="rounded-full border border-slate-300 bg-white px-4 py-2 text-sm font-medium text-slate-700 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-200">
                {tech}
              </span>
            ))}
          </div>
        </section>

        <section id="projects" className="section-shell pt-8">
          <h2 className="section-title">Projects & Case Studies</h2>
          <p className="section-subtitle">Selected outcomes from recent delivery engagements.</p>
          <div className="mt-10 grid gap-6 lg:grid-cols-3">
            {caseStudies.map((project) => (
              <article key={project.name} className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900">
                <h3 className="text-lg font-semibold">{project.name}</h3>
                <p className="mt-3 text-sm text-slate-600 dark:text-slate-300">{project.result}</p>
              </article>
            ))}
          </div>
        </section>

        <Suspense fallback={<section id="testimonials" className="section-shell pt-8"><p className="text-slate-500 dark:text-slate-400">Loading testimonials…</p></section>}>
          <TestimonialsSection testimonials={testimonials} />
        </Suspense>

        <section className="section-shell pt-8">
          <div className="rounded-3xl bg-gradient-to-r from-indigo-600 to-blue-600 p-8 text-white shadow-premium md:p-12">
            <h2 className="text-3xl font-bold tracking-tight md:text-4xl">Ready to accelerate your product roadmap?</h2>
            <p className="mt-4 max-w-2xl text-indigo-100">
              Book a consultation with our engineering team and get a practical roadmap for architecture, development, and launch.
            </p>
            <a
              href="#contact"
              className="mt-8 inline-flex items-center gap-2 rounded-xl bg-white px-5 py-3 text-sm font-semibold text-indigo-700 transition hover:bg-indigo-50"
              onClick={() => trackEvent('cta_click', { cta: 'book_consultation' })}
            >
              <CalendarCheck2 size={16} />
              Book a Consultation
            </a>
          </div>
        </section>

        <section id="contact" className="section-shell pt-8">
          <h2 className="section-title">Contact Us</h2>
          <p className="section-subtitle">Let&apos;s discuss your product idea, modernization roadmap, or next deployment milestone.</p>
          <div className="mt-10 grid gap-8 lg:grid-cols-2">
            <div className="rounded-2xl border border-slate-200 bg-white p-6 dark:border-slate-800 dark:bg-slate-900">
              <h3 className="text-lg font-semibold">Start a conversation</h3>
              <p className="mt-3 text-slate-600 dark:text-slate-300">
                Email us directly at{' '}
                <a className="font-medium text-indigo-600 hover:underline" href="mailto:team.corevia@gmail.com">
                  team.corevia@gmail.com
                </a>
              </p>
              <p className="mt-6 text-sm text-slate-500 dark:text-slate-400">
                We typically respond within 1 business day.
              </p>
            </div>

            <form
              className="rounded-2xl border border-slate-200 bg-white p-6 dark:border-slate-800 dark:bg-slate-900"
              onSubmit={handleSubmit}
            >
              <label htmlFor="name" className="block text-sm font-medium">Name</label>
              <input
                id="name"
                type="text"
                required
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                className="mt-2 w-full rounded-xl border border-slate-300 bg-transparent px-4 py-2 outline-none ring-indigo-300 transition focus:ring dark:border-slate-700"
                placeholder="Enter your name"
                autoComplete="name"
              />

              <label htmlFor="email" className="mt-4 block text-sm font-medium">Email</label>
              <input
                id="email"
                type="email"
                required
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                className="mt-2 w-full rounded-xl border border-slate-300 bg-transparent px-4 py-2 outline-none ring-indigo-300 transition focus:ring dark:border-slate-700"
                placeholder="Enter your email"
                autoComplete="email"
              />

              <label htmlFor="message" className="mt-4 block text-sm font-medium">Message</label>
              <textarea
                id="message"
                rows="4"
                required
                name="message"
                value={formData.message}
                onChange={handleInputChange}
                className="mt-2 w-full rounded-xl border border-slate-300 bg-transparent px-4 py-2 outline-none ring-indigo-300 transition focus:ring dark:border-slate-700"
                placeholder="Tell us about your project"
              />

              <button
                type="submit"
                className="mt-6 inline-flex items-center gap-2 rounded-xl bg-slate-900 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-slate-800 dark:bg-indigo-600 dark:hover:bg-indigo-500"
              >
                Send Message
                <Mail size={16} />
              </button>
              {formStatus && <p className="mt-3 text-xs text-slate-500 dark:text-slate-400">{formStatus}</p>}
            </form>
          </div>
        </section>
      </main>

      <footer className="border-t border-slate-200 bg-white dark:border-slate-800 dark:bg-slate-950">
        <div className="mx-auto flex max-w-7xl flex-col gap-6 px-6 py-10 text-sm text-slate-600 dark:text-slate-300 lg:flex-row lg:items-center lg:justify-between lg:px-8">
          <div className="flex items-center gap-3">
            <img src="/corevia-logo.svg" alt="Corevia Systems logo" className="h-7 w-auto" loading="lazy" />
            <p>© {new Date().getFullYear()} Corevia Systems Pvt Ltd. All rights reserved.</p>
          </div>
          <div className="flex items-center gap-5">
            <a href="#about" className="hover:text-indigo-500">About</a>
            <a href="#services" className="hover:text-indigo-500">Services</a>
            <a href="#contact" className="hover:text-indigo-500">Contact</a>
            <a
              href="https://www.linkedin.com"
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-1 hover:text-indigo-500"
            >
              <Linkedin size={16} />
              LinkedIn
            </a>
          </div>
        </div>
      </footer>

      <a
        href="https://wa.me/919999999999"
        target="_blank"
        rel="noreferrer"
        aria-label="Chat on WhatsApp"
        className="fixed bottom-6 right-6 inline-flex animate-float items-center gap-2 rounded-full bg-green-500 px-4 py-3 text-sm font-semibold text-white shadow-lg transition hover:bg-green-400"
        onClick={() => trackEvent('whatsapp_click')}
      >
        <MessageCircle size={18} />
        WhatsApp
      </a>
    </div>
  );
}
