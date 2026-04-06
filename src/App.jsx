import { useEffect, useMemo, useState } from 'react';
import {
  ArrowRight,
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

const WHATSAPP_NUMBER = '919019830630';

export default function App() {
  const [isDark, setIsDark] = useState(true);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    const savedTheme = localStorage.getItem('corevia-theme');
    const shouldUseDark = savedTheme !== 'light';
    setIsDark(shouldUseDark);
    document.documentElement.classList.toggle('dark', shouldUseDark);
  }, []);

  const navItems = useMemo(
    () => [
      { label: 'About', href: '#about' },
      { label: 'Services', href: '#services' },
      { label: 'Tech Stack', href: '#tech' },
      { label: 'Projects', href: '#projects' },
      { label: 'Contact', href: '#contact' },
    ],
    []
  );

  const toggleTheme = () => {
    const nextTheme = !isDark;
    setIsDark(nextTheme);
    document.documentElement.classList.toggle('dark', nextTheme);
    localStorage.setItem('corevia-theme', nextTheme ? 'dark' : 'light');
  };

  const handleWhatsAppSubmit = (event) => {
    event.preventDefault();

    const formData = new FormData(event.currentTarget);
    const name = formData.get('name')?.toString().trim() ?? '';
    const email = formData.get('email')?.toString().trim() ?? '';
    const message = formData.get('message')?.toString().trim() ?? '';

    const text = [
      'Hello Corevia, I would like to discuss a project.',
      `Name: ${name}`,
      `Email: ${email}`,
      `Message: ${message}`,
    ].join('\n');

    const whatsappUrl = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(text)}`;
    window.open(whatsappUrl, '_blank', 'noopener,noreferrer');
    event.currentTarget.reset();
  };

  return (
    <div className="relative overflow-x-hidden">
      <header className="sticky top-0 z-40 border-b border-slate-200/70 bg-white/90 shadow-sm backdrop-blur dark:border-slate-800 dark:bg-slate-950/90">
        <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-6 lg:px-8">
          <a
            href="#"
            className="inline-flex shrink-0 items-center rounded-xl border border-transparent px-2 py-1 transition hover:border-slate-200 hover:bg-white/80 dark:hover:border-slate-700 dark:hover:bg-slate-900/80"
            aria-label="Corevia homepage"
          >
            <img
              src="/corevia-logo.svg"
              alt="Corevia logo"
              className="h-10 w-[150px] object-contain object-left sm:h-11 sm:w-[180px] lg:h-12 lg:w-[210px]"
              loading="eager"
            />
            <span className="sr-only">Corevia Systems</span>
          </a>

          <nav className="hidden items-center gap-6 md:flex">
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
              className="rounded-full border border-slate-200 p-2 text-slate-600 transition hover:border-indigo-300 hover:text-indigo-500 dark:border-slate-700 dark:text-slate-300"
            >
              {isDark ? <Sun size={18} /> : <Moon size={18} />}
            </button>
            <button
              type="button"
              onClick={() => setIsMenuOpen((prev) => !prev)}
              className="rounded-md p-2 text-slate-700 md:hidden dark:text-slate-200"
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

      <main>
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
            >
              Contact Us
            </a>
            <a
              href="#contact"
              className="rounded-xl border border-slate-300 px-6 py-3 text-sm font-semibold text-slate-700 transition hover:border-indigo-300 hover:text-indigo-500 dark:border-slate-700 dark:text-slate-200"
            >
              Get Quote
            </a>
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
              onSubmit={handleWhatsAppSubmit}
            >
              <label htmlFor="contact-name" className="block text-sm font-medium">
                Name
              </label>
              <input
                id="contact-name"
                name="name"
                type="text"
                required
                className="mt-2 w-full rounded-xl border border-slate-300 bg-transparent px-4 py-2 outline-none ring-indigo-300 transition focus:ring dark:border-slate-700"
                placeholder="Enter your name"
              />

              <label htmlFor="contact-email" className="mt-4 block text-sm font-medium">
                Email
              </label>
              <input
                id="contact-email"
                name="email"
                type="email"
                required
                className="mt-2 w-full rounded-xl border border-slate-300 bg-transparent px-4 py-2 outline-none ring-indigo-300 transition focus:ring dark:border-slate-700"
                placeholder="Enter your email"
              />

              <label htmlFor="contact-message" className="mt-4 block text-sm font-medium">
                Message
              </label>
              <textarea
                id="contact-message"
                name="message"
                rows="4"
                required
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
            </form>
          </div>
        </section>
      </main>

      <footer className="border-t border-slate-200 bg-white dark:border-slate-800 dark:bg-slate-950">
        <div className="mx-auto flex max-w-7xl flex-col gap-6 px-6 py-10 text-sm text-slate-600 dark:text-slate-300 lg:flex-row lg:items-center lg:justify-between lg:px-8">
          <p>© {new Date().getFullYear()} Corevia Systems Pvt Ltd. All rights reserved.</p>
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
        href={`https://wa.me/${WHATSAPP_NUMBER}`}
        target="_blank"
        rel="noreferrer"
        aria-label="Chat on WhatsApp"
        className="fixed bottom-6 right-6 inline-flex animate-float items-center gap-2 rounded-full bg-green-500 px-4 py-3 text-sm font-semibold text-white shadow-lg transition hover:bg-green-400"
      >
        <MessageCircle size={18} />
        WhatsApp
      </a>
    </div>
  );
}
