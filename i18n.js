// English/Spanish language toggle.
// The pages are written in English. To translate new text, add a line
// below: "English text exactly as it appears on the page": "Spanish text".
// Anything missing from this list simply stays in English.
const SPANISH = {
  // Navbar and menu
  "Menu": "Menú",
  "Close": "Cerrar",
  "Home": "Inicio",
  "Services": "Servicios",
  "Contact": "Contacto",
  "Language": "Idioma",
  "AGA Logo": "Logotipo de AGA",

  // Hero
  "Proudly serving Tucson with beautiful landscaping at affordable prices.":
    "Orgullosamente al servicio de Tucson con hermosos jardines a precios accesibles.",

  // Services
  "🌿 Our Services": "🌿 Nuestros servicios",
  "Gate Replacement": "Reemplazo de portones",
  "Roof Coating": "Recubrimiento de techos",
  "Retaining Wall": "Muros de contención",
  "Pavers": "Adoquines",
  "Paver": "Adoquines",
  "Turf and Synthetic Grass": "Césped natural y sintético",
  "Planting": "Siembra de plantas",
  "Yard Maintenance": "Mantenimiento de jardines",
  "Tree Removal and Trimming": "Poda y remoción de árboles",
  "Painting": "Pintura",
  "Carpentry": "Carpintería",
  "Window Shutters": "Persianas para ventanas",

  // Carousels
  "Previous": "Anterior",
  "Next": "Siguiente",
  "Gate 1": "Portón 1",
  "Gate 2": "Portón 2",
  "Roof Coating 1": "Recubrimiento de techo 1",
  "Roof Coating 2": "Recubrimiento de techo 2",
  "Retaining Wall 1": "Muro de contención 1",
  "Retaining Wall 2": "Muro de contención 2",
  "Paver 1": "Adoquines 1",
  "Paver 2": "Adoquines 2",
  "Paver 3": "Adoquines 3",
  "Grass 1": "Césped 1",
  "Grass 2": "Césped 2",
  "Grass 3": "Césped 3",

  // Contact form
  "Get Your Free, No-Hassle Quote - Fast and Convenient!":
    "¡Obtenga su cotización gratis y sin complicaciones, rápida y conveniente!",
  "Call us directly at (520) 273-2449 or send an email down below:":
    "Llámenos directamente al (520) 273-2449 o envíenos un correo a continuación:",
  "(This will be sent directly to us without any third-parties contacting you)":
    "(Su mensaje nos llegará directamente, sin que ningún tercero se comunique con usted)",
  "Contact Us": "Contáctenos",
  "Name": "Nombre",
  "Email": "Correo electrónico",
  "Message": "Mensaje",
  "Send Message": "Enviar mensaje",

  // Hours
  "Day": "Día",
  "Available Hours": "Horario disponible",
  "Sunday": "Domingo",
  "Monday": "Lunes",
  "Tuesday": "Martes",
  "Wednesday": "Miércoles",
  "Thursday": "Jueves",
  "Friday": "Viernes",
  "Saturday": "Sábado",
  "Closed": "Cerrado",
  "5:00 AM – 2:00 PM": "5:00 a. m. – 2:00 p. m.",

  // Footer
  "📧 Email:": "📧 Correo electrónico:",
  "📞 Phone:": "📞 Teléfono:",
  "© 2025 AGA Landscaping Services, LLC. All rights reserved.":
    "© 2025 AGA Landscaping Services, LLC. Todos los derechos reservados.",

  // Thank-you page
  "Thank You": "Gracias",
  "✅ Thank You!": "✅ ¡Gracias!",
  "Your message has been successfully sent.": "Su mensaje se envió correctamente.",
  "Back to Home": "Volver al inicio",
};

(function () {
  const STORAGE_KEY = 'lang';
  const ATTRIBUTES = ['alt', 'aria-label'];
  const normalize = s => s.trim().replace(/\s+/g, ' ');

  // Remember the original English of everything we can translate
  const textNodes = [];   // { node, english }
  const attrs = [];       // { el, name, english }
  const englishTitle = document.title;

  const walker = document.createTreeWalker(document.body, NodeFilter.SHOW_TEXT, {
    acceptNode: n => n.parentElement.closest('script, style')
      ? NodeFilter.FILTER_REJECT : NodeFilter.FILTER_ACCEPT,
  });
  while (walker.nextNode()) {
    const node = walker.currentNode;
    if (normalize(node.data) in SPANISH) textNodes.push({ node, english: node.data });
  }
  document.querySelectorAll(ATTRIBUTES.map(a => `[${a}]`).join(',')).forEach(el => {
    ATTRIBUTES.forEach(name => {
      const value = el.getAttribute(name);
      if (value && normalize(value) in SPANISH) attrs.push({ el, name, english: value });
    });
  });

  function setLanguage(lang) {
    const es = lang === 'es';
    // Keep the surrounding whitespace so inline spacing doesn't change
    textNodes.forEach(({ node, english }) => {
      node.data = es ? english.replace(normalize(english), SPANISH[normalize(english)]) : english;
    });
    attrs.forEach(({ el, name, english }) => {
      el.setAttribute(name, es ? SPANISH[normalize(english)] : english);
    });
    document.title = es && englishTitle in SPANISH ? SPANISH[englishTitle] : englishTitle;
    document.documentElement.lang = lang;
    document.querySelectorAll('[data-lang]').forEach(btn => {
      btn.setAttribute('aria-pressed', String(btn.dataset.lang === lang));
    });
  }

  function savedLanguage() {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved === 'en' || saved === 'es') return saved;
    } catch (e) { /* storage blocked: fall through */ }
    // First visit: match the visitor's browser language
    return (navigator.language || '').toLowerCase().startsWith('es') ? 'es' : 'en';
  }

  document.addEventListener('click', e => {
    const btn = e.target.closest('[data-lang]');
    if (!btn) return;
    setLanguage(btn.dataset.lang);
    try { localStorage.setItem(STORAGE_KEY, btn.dataset.lang); } catch (e) { /* not saved */ }
  });

  setLanguage(savedLanguage());
})();
