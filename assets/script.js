const toggle = document.querySelector('.nav-toggle');
const nav = document.querySelector('#siteNav') || document.querySelector('.site-nav');
function setMenuState(open) {
  if (!toggle || !nav) return;
  nav.classList.toggle('open', open);
  toggle.setAttribute('aria-expanded', String(open));
  toggle.setAttribute('aria-label', open ? 'Close menu' : 'Open menu');
}
if (toggle && nav) {
  toggle.addEventListener('click', () => {
    setMenuState(!nav.classList.contains('open'));
  });
  nav.querySelectorAll('a').forEach(link => link.addEventListener('click', () => {
    setMenuState(false);
  }));
}

const quoteForm = document.querySelector('#quoteForm');
const quoteOutput = document.querySelector('#quoteOutput');
function updateQuote() {
  if (!quoteForm || !quoteOutput) return;
  const selected = [...quoteForm.querySelectorAll('input:checked')];
  const subtotal = selected.reduce((sum, input) => sum + Number(input.value), 0);
  if (!subtotal) { quoteOutput.textContent = 'Select services to see an estimated range.'; return; }
  const low = Math.round(subtotal * 0.85 / 100) * 100;
  const high = Math.round(subtotal * 1.35 / 100) * 100;
  quoteOutput.textContent = `Indicative range: £${low.toLocaleString()}–£${high.toLocaleString()} + VAT. Submit an enquiry for a fixed scope.`;
}
quoteForm?.addEventListener('change', updateQuote);

const roiForm = document.querySelector('#roiForm');
const roiOutput = document.querySelector('#roiOutput');
function updateRoi() {
  if (!roiForm || !roiOutput) return;
  const employees = Number(document.querySelector('#employees')?.value || 0);
  const hours = Number(document.querySelector('#hours')?.value || 0);
  const rate = Number(document.querySelector('#rate')?.value || 0);
  const weekly = employees * hours * rate;
  roiOutput.innerHTML = `Weekly: £${weekly.toLocaleString()}<br>Monthly: £${Math.round(weekly * 4.33).toLocaleString()}<br>Annual: £${Math.round(weekly * 52).toLocaleString()}`;
}
roiForm?.addEventListener('input', updateRoi);
updateRoi();

const faqs = [
  ['Do you provide hosting?', 'Yes. Mortify can provide managed website hosting with support, monitoring and backup options.'],
  ['Can you help with SEO?', 'Yes. We focus on technical SEO, content structure, local SEO foundations and performance improvements.'],
  ['What is AI automation?', 'It is the practical use of automation and AI-assisted workflows to reduce repetitive admin and improve response times.'],
  ['Do you build mobile apps?', 'Yes. We can build mobile-first web apps and app projects where the commercial case is clear.'],
  ['Do you offer IT support?', 'Yes. Mortify can support Microsoft 365, user issues, managed IT, hosting and infrastructure planning.'],
  ['How much does a project cost?', 'Costs depend on scope. The quote builder provides an indicative range and discovery confirms a fixed plan.'],
  ['How long does a website take?', 'Simple sites can be delivered quickly; larger portals or integrations require a phased roadmap.'],
  ['Who owns the website?', 'Ownership terms are agreed in the proposal. Mortify aims for clear, fair ownership and handover.'],
  ['Do you offer maintenance?', 'Yes. Website care, hosting, security monitoring, backups and improvement retainers are available.'],
  ['How do you handle security?', 'We use sensible controls including updates, MFA guidance, firewalls, backups and monitoring where appropriate.'],
  ['Are backups included?', 'Backup management is available as a recurring service and can be tailored to your recovery needs.'],
  ['What is your support response?', 'Response levels depend on the support plan, urgency and agreed service arrangement.'],
  ['Can you integrate existing systems?', 'Yes. Mortify can connect websites with CRMs, payment systems, accounts tools and third-party APIs.'],
  ['Do you build ecommerce?', 'Yes. We support ecommerce strategy, checkout improvements, product structure and online ordering.'],
  ['Can you build booking systems?', 'Yes. We can implement booking flows, availability logic, notifications and admin views.'],
  ['Can you build a CRM?', 'Yes. We can build lightweight CRMs or integrate with established CRM platforms.'],
  ['Do you manage Microsoft 365?', 'Yes. User setup, email, security posture and management are available as monthly support.'],
  ['Can you redesign an existing website?', 'Yes. Mortify can rebuild content, design, performance and conversion journeys.'],
  ['Can you add payment systems?', 'Yes. Stripe, Square and ecommerce payment integrations can be scoped.'],
  ['Do you offer retainers?', 'Yes. Monthly retainers can cover support, hosting, maintenance, automation and ongoing improvements.'],
  ['Do you work with UK businesses?', 'Yes. Mortify is focused on practical support for UK organisations and local businesses.'],
  ['Can you improve website speed?', 'Yes. Performance monitoring and optimisation can be included in rebuilds or care plans.'],
  ['Do you support GDPR awareness?', 'We provide practical GDPR-aware implementation guidance but do not replace legal advice.'],
  ['Can you migrate websites?', 'Yes. We handle content, hosting, DNS, SSL and launch planning for migrations.']
];
const faqGrid = document.querySelector('.faq-grid');
if (faqGrid) faqGrid.innerHTML = faqs.map(([q, a]) => `<details><summary>${q}</summary><p>${a}</p></details>`).join('');

document.querySelectorAll('[data-filter]').forEach(button => {
  button.addEventListener('click', () => {
    document.querySelectorAll('[data-filter]').forEach(btn => {
      btn.classList.remove('active');
      btn.setAttribute('aria-pressed', 'false');
    });
    button.classList.add('active');
    button.setAttribute('aria-pressed', 'true');
    const filter = button.dataset.filter;
    document.querySelectorAll('.portfolio-grid [data-category]').forEach(card => {
      card.hidden = filter !== 'all' && card.dataset.category !== filter;
    });
  });
});
const defaultPortfolioFilter = document.querySelector('[data-filter="all"]');
defaultPortfolioFilter?.classList.add('active');
defaultPortfolioFilter?.setAttribute('aria-pressed', 'true');

document.querySelectorAll('[data-blog-filter]').forEach(button => {
  button.addEventListener('click', () => {
    document.querySelectorAll('[data-blog-filter]').forEach(btn => {
      btn.classList.remove('active');
      btn.setAttribute('aria-pressed', 'false');
    });
    button.classList.add('active');
    button.setAttribute('aria-pressed', 'true');
    const filter = button.dataset.blogFilter;
    document.querySelectorAll('.blog-grid [data-category]').forEach(card => {
      card.hidden = filter !== 'all' && card.dataset.category !== filter;
    });
  });
});
