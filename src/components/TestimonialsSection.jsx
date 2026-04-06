import { Quote } from 'lucide-react';

export default function TestimonialsSection({ testimonials }) {
  return (
    <section id="testimonials" className="section-shell pt-8">
      <h2 className="section-title">Testimonials</h2>
      <p className="section-subtitle">What leaders say about working with Corevia Systems.</p>
      <div className="mt-10 grid gap-6 md:grid-cols-2">
        {testimonials.map((item) => (
          <article key={item.name} className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900">
            <Quote className="text-indigo-500" size={20} aria-hidden="true" />
            <p className="mt-4 text-slate-700 dark:text-slate-200">“{item.quote}”</p>
            <p className="mt-5 text-sm font-semibold">{item.name}</p>
            <p className="text-sm text-slate-500 dark:text-slate-400">{item.role}</p>
          </article>
        ))}
      </div>
    </section>
  );
}
