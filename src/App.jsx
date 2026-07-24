import { useEffect, useMemo, useState } from "react";
import {
  ArrowUpRight,
  Check,
  ChevronRight,
  Mail,
  MapPin,
  Menu,
  Phone,
  Send,
  Share2,
  Sparkles,
  Star,
  X,
} from "lucide-react";
import emailjs from "@emailjs/browser";
import styles from "./App.module.css";

// TODO: Replace these with the values from your EmailJS account
// (Dashboard → Email Services / Email Templates / Account → General).
const EMAILJS_SERVICE_ID = "service_3nfs788";
const EMAILJS_TEMPLATE_ID = "template_96r1qkf";
const EMAILJS_PUBLIC_KEY = "c45sK5wq7bgKSoQQB";

const heroImage =
  "https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&w=1400&q=85";

const galleryImages = [
  {
    title: "Modern Living Room",
    tag: "Residential",
    image:
      "https://images.unsplash.com/photo-1615874694520-474822394e73?auto=format&fit=crop&w=900&q=85",
    related: [
      "https://images.unsplash.com/photo-1768609239321-1cfe14893e80?auto=format&fit=crop&w=700&q=85",
      "https://images.unsplash.com/photo-1741394546743-2d64519ba0d3?auto=format&fit=crop&w=700&q=85",
      "https://images.unsplash.com/photo-1759238136854-a43787126db7?auto=format&fit=crop&w=700&q=85",
      "https://images.unsplash.com/photo-1772475385317-09f9ef320474?auto=format&fit=crop&w=700&q=85",
      "https://images.unsplash.com/photo-1758548157747-285c7012db5b?auto=format&fit=crop&w=700&q=85",
      "https://images.unsplash.com/photo-1615874694520-474822394e73?auto=format&fit=crop&w=700&q=85",
    ],
  },
  {
    title: "Luxury Hotel Suite",
    tag: "Hospitality",
    image:
      "https://images.unsplash.com/photo-1759223198981-661cadbbff36?auto=format&fit=crop&w=900&q=85",
    related: [
      "https://images.unsplash.com/photo-1759223198981-661cadbbff36?auto=format&fit=crop&w=700&q=85",
      "https://images.unsplash.com/photo-1725962441765-6aaa75327f3b?auto=format&fit=crop&w=700&q=85",
      "https://images.unsplash.com/photo-1668260592478-a6513b0a690e?auto=format&fit=crop&w=700&q=85",
      "https://images.unsplash.com/photo-1667736416049-59e7ef421ca6?auto=format&fit=crop&w=700&q=85",
      "https://images.unsplash.com/photo-1695093360120-490f21ca62a7?auto=format&fit=crop&w=700&q=85",
      "https://images.unsplash.com/photo-1630660664869-c9d3cc676880?auto=format&fit=crop&w=700&q=85",
    ],
  },
  {
    title: "Modular Kitchen",
    tag: "Renovation",
    image:
      "https://images.unsplash.com/photo-1556911220-bff31c812dba?auto=format&fit=crop&w=900&q=85",
    related: [
      "https://images.unsplash.com/photo-1770063817031-f3b98dff347f?auto=format&fit=crop&w=700&q=85",
      "https://images.unsplash.com/photo-1761656630581-69a58e4e1c09?auto=format&fit=crop&w=700&q=85",
      "https://images.unsplash.com/photo-1778074976002-6e5d96cc294a?auto=format&fit=crop&w=700&q=85",
      "https://images.unsplash.com/photo-1682888813913-e13f18692019?auto=format&fit=crop&w=700&q=85",
      "https://images.unsplash.com/photo-1600489000022-c2086d79f9d4?auto=format&fit=crop&w=700&q=85",
      "https://images.unsplash.com/photo-1556911220-bff31c812dba?auto=format&fit=crop&w=700&q=85",
    ],
  },
  {
    title: "Office Workspace",
    tag: "Commercial",
    image:
      "https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?auto=format&fit=crop&w=900&q=85",
    related: [
      "https://images.unsplash.com/photo-1765371512336-99c2b1c6975f?auto=format&fit=crop&w=700&q=85",
      "https://images.unsplash.com/photo-1765371513276-a74f1ecbcf7d?auto=format&fit=crop&w=700&q=85",
      "https://images.unsplash.com/photo-1746021535489-00edc5efb203?auto=format&fit=crop&w=700&q=85",
      "https://images.unsplash.com/photo-1755436612913-b1e2cfd66e66?auto=format&fit=crop&w=700&q=85",
      "https://images.unsplash.com/photo-1718220216044-006f43e3a9b1?auto=format&fit=crop&w=700&q=85",
      "https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?auto=format&fit=crop&w=700&q=85",
    ],
  },
];

const services = [
  {
    title: "Residential Design",
    text: "Complete interior concepts for homes that need balance, texture, and everyday comfort.",
  },
  {
    title: "Commercial Styling",
    text: "Polished offices, salons, studios, and hospitality spaces built for brand presence.",
  },
  {
    title: "Custom Renovation",
    text: "Material palettes, furniture curation, lighting plans, and room refreshes with clear direction.",
  },
];

const testimonials = [
  {
    quote:
      "APEX DWELLING turned our apartment into a calm, warm home. Every material choice felt considered and personal.",
    name: "Bala Subramani",
    project: "Residential Refresh",
  },
  {
    quote:
      "The team understood our brand quickly and gave our studio a polished look without making it feel overdesigned.",
    name: "Madhanagopal",
    project: "Commercial Studio",
  },
  {
    quote:
      "From planning to final styling, the process was clear, elegant, and surprisingly stress-free.",
    name: "Sankareswari Dhanasekar",
    project: "Full Home Renovation",
  },
];

const navItems = ["About", "Services", "Portfolio", "Contact"];

function App() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [formMessage, setFormMessage] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formState, setFormState] = useState({
    name: "",
    phone: "",
    brief: "",
  });
  const [activeGalleryItem, setActiveGalleryItem] = useState(0);

  const stats = useMemo(
    () => [
      ["50+", "Completed Projects"],
      ["1 lakh", "Square Feet Transformed"],
      ["100%", "Client Satisfaction"],
      ["8+", "Years of Experience"],
    ],
    []
  );

  const scrollToSection = (id) => {
    document.getElementById(id.toLowerCase())?.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
    setIsMenuOpen(false);
  };

  const [revealedIds, setRevealedIds] = useState(() => new Set());

  useEffect(() => {
    const elements = document.querySelectorAll("[data-reveal-id]");
    if (!elements.length) return undefined;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const id = entry.target.getAttribute("data-reveal-id");
            setRevealedIds((current) => {
              if (current.has(id)) return current;
              const next = new Set(current);
              next.add(id);
              return next;
            });
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.15, rootMargin: "0px 0px -60px 0px" }
    );

    elements.forEach((element) => observer.observe(element));
    return () => observer.disconnect();
  }, []);

  const revealClass = (id) =>
    `${styles.reveal} ${revealedIds.has(id) ? styles.revealVisible : ""}`;

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormState((current) => ({ ...current, [name]: value }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    setIsSubmitting(true);
    setFormMessage("");

    emailjs
      .send(
        EMAILJS_SERVICE_ID,
        EMAILJS_TEMPLATE_ID,
        {
          from_name: formState.name,
          phone_number: formState.phone,
          message: formState.brief,
        },
        { publicKey: EMAILJS_PUBLIC_KEY }
      )
      .then(() => {
        setFormMessage("Thanks! Your inquiry has been sent — we'll be in touch soon.");
        setFormState({ name: "", phone: "", brief: "" });
      })
      .catch((error) => {
        console.error("EmailJS error:", error);
        setFormMessage(
          "Something went wrong sending your inquiry. Please try again or email us directly."
        );
      })
      .finally(() => setIsSubmitting(false));
  };

  return (
    <div className={styles.page}>
      <header className={styles.header}>
        <button
          className={styles.brand}
          type="button"
          onClick={() => scrollToSection("home")}
          aria-label="Go to home"
        >
          <img src="/brand/ad-logo-gold-icon.png" alt="" />
          <span>APEX DWELLING</span>
        </button>

        <nav className={styles.desktopNav} aria-label="Primary navigation">
          {navItems.map((item) => (
            <button key={item} type="button" onClick={() => scrollToSection(item)}>
              {item}
            </button>
          ))}
        </nav>

        <button
          className={styles.navCta}
          type="button"
          onClick={() => scrollToSection("contact")}
        >
          Start Project
          <ArrowUpRight size={16} />
        </button>

        <button
          className={styles.menuButton}
          type="button"
          onClick={() => setIsMenuOpen((open) => !open)}
          aria-label="Toggle navigation menu"
          aria-expanded={isMenuOpen}
        >
          {isMenuOpen ? <X size={20} /> : <Menu size={20} />}
        </button>

        {isMenuOpen && (
          <div className={styles.mobileNav}>
            {navItems.map((item) => (
              <button key={item} type="button" onClick={() => scrollToSection(item)}>
                {item}
              </button>
            ))}
          </div>
        )}
      </header>

      <main>
        <section id="home" className={styles.hero}>
          <div className={styles.heroCopy}>
            <span className={styles.pill}>Interior Design Studio</span>
            <h1>
              Elevating Your <mark>Living</mark> Spaces with Exquisite Interior
              Design
            </h1>
            <p>
              Tailored interiors for refined homes, boutique workplaces, and rooms
              that need calm, clarity, and character.
            </p>
            <div className={styles.heroActions}>
              <button type="button" onClick={() => scrollToSection("contact")}>
                Get Started
                <ChevronRight size={16} />
              </button>
              <button type="button" onClick={() => scrollToSection("portfolio")}>
                View Portfolio
              </button>
            </div>
          </div>

          <div className={styles.heroImageWrap}>
            <img src={heroImage} alt="Warm modern living room designed with natural textures" />
            <div className={styles.floatCard}>
              <span>50+</span>
              Satisfied Clients
            </div>
          </div>
        </section>

        <section id="about" className={styles.section}>
          <div
            className={`${styles.centerIntro} ${revealClass("about-intro")}`}
            data-reveal-id="about-intro"
          >
            <span className={styles.subtle}>About Us</span>
            <h2>
              Everything You Need to Bring <mark>Your Vision</mark> to Life
            </h2>
            <p>
              APEX DWELLING blends spatial planning, material intelligence, and
              a restrained eye for detail into interiors that feel deeply personal.
            </p>
          </div>

          <div className={styles.aboutGrid}>
            <article
              className={`${styles.glassCard} ${revealClass("about-card")}`}
              data-reveal-id="about-card"
            >
              <span className={styles.cardKicker}>Client Focus</span>
              <h3>Looking to Refresh Your Space?</h3>
              <p>
                We start with how you live and work, then translate your routine
                into rooms that are composed, practical, and quietly memorable.
              </p>
            </article>

            <div
              className={`${styles.statsPanel} ${revealClass("about-stats")}`}
              data-reveal-id="about-stats"
              style={{ "--reveal-delay": "120ms" }}
            >
              {stats.map(([value, label]) => (
                <div key={label}>
                  <strong>{value}</strong>
                  <span>{label}</span>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section id="services" className={styles.section}>
          <div
            className={`${styles.splitHeading} ${revealClass("services-intro")}`}
            data-reveal-id="services-intro"
          >
            <h2>
              Hand Over The Design <mark>Work</mark>
              <br />
              We Have Got You Covered
            </h2>
            <p>
              From concept to installation, we coordinate the details so the final
              space feels effortless.
            </p>
          </div>

          <div className={styles.servicesGrid}>
            {services.map((service, index) => {
              const revealId = `service-${index}`;
              return (
                <article
                  className={`${styles.serviceCard} ${revealClass(revealId)}`}
                  key={service.title}
                  data-reveal-id={revealId}
                  style={{ "--reveal-delay": `${index * 140}ms` }}
                >
                  <span>
                    <Check size={16} />
                  </span>
                  <h3>{service.title}</h3>
                  <p>{service.text}</p>
                </article>
              );
            })}
          </div>
        </section>

        <section id="portfolio" className={styles.section}>
          <div
            className={`${styles.centerIntro} ${revealClass("portfolio-intro")}`}
            data-reveal-id="portfolio-intro"
          >
            <span className={styles.subtle}>Portfolio</span>
            <h2>
              Spaces with <mark>Poise</mark> and Practical Grace
            </h2>
          </div>

          <div className={styles.galleryGrid}>
            {galleryImages.map((item, index) => {
              const revealId = `gallery-${index}`;
              return (
                <article
                  className={`${styles.galleryItem} ${revealClass(revealId)} ${
                    activeGalleryItem === index ? styles.galleryItemActive : ""
                  }`}
                  key={item.title}
                  data-reveal-id={revealId}
                  role="tab"
                  tabIndex={0}
                  aria-selected={activeGalleryItem === index}
                  onClick={() => setActiveGalleryItem(index)}
                  onKeyDown={(event) => {
                    if (event.key === "Enter" || event.key === " ") {
                      event.preventDefault();
                      setActiveGalleryItem(index);
                    }
                  }}
                  aria-label={`View more ${item.tag} images for ${item.title}`}
                  style={{ "--reveal-delay": `${index * 130}ms` }}
                >
                  <img src={item.image} alt={`${item.title} interior design project`} />
                  <div>
                    <span>{item.tag}</span>
                    <h3>{item.title}</h3>
                  </div>
                </article>
              );
            })}
          </div>

          <div className={styles.galleryTabPanel} key={activeGalleryItem}>
            <div className={styles.galleryTabHeader}>
              <span>{galleryImages[activeGalleryItem].tag}</span>
              <h3>{galleryImages[activeGalleryItem].title}</h3>
            </div>

            <div className={styles.galleryTabGrid}>
              {galleryImages[activeGalleryItem].related.map((src, imageIndex) => (
                <div
                  className={styles.galleryTabImage}
                  key={src + imageIndex}
                  style={{ "--reveal-delay": `${imageIndex * 90}ms` }}
                >
                  <img
                    src={src}
                    alt={`${galleryImages[activeGalleryItem].title} related design ${
                      imageIndex + 1
                    }`}
                  />
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className={styles.testimonialSection}>
          <div
            className={`${styles.splitHeading} ${revealClass("testimonials-intro")}`}
            data-reveal-id="testimonials-intro"
          >
            <h2>
              Loved by Clients Who Value <mark>Quiet Luxury</mark>
            </h2>
            <p>
              Thoughtful words from people who trusted us with the spaces they
              live, work, and gather in.
            </p>
          </div>

          <div className={styles.testimonialGrid}>
            {testimonials.map((testimonial, index) => {
              const revealId = `testimonial-${index}`;
              return (
                <article
                  className={`${styles.testimonialCard} ${revealClass(revealId)}`}
                  key={testimonial.name}
                  data-reveal-id={revealId}
                  style={{
                    "--lift": `${index * 22}px`,
                    "--reveal-delay": `${index * 140}ms`,
                  }}
                >
                  <div className={styles.rating} aria-label="Five star review">
                    {Array.from({ length: 5 }).map((_, starIndex) => (
                      <Star key={starIndex} size={15} fill="currentColor" />
                    ))}
                  </div>
                  <p>{testimonial.quote}</p>
                  <div>
                    <strong>{testimonial.name}</strong>
                    <span>{testimonial.project}</span>
                  </div>
                </article>
              );
            })}
          </div>
        </section>

        <section id="contact" className={styles.contactSection}>
          <div
            className={`${styles.contactCopy} ${revealClass("contact-copy")}`}
            data-reveal-id="contact-copy"
          >
            <span className={styles.pill}>Contact Us</span>
            <h2>
              Ready to <mark>Transform</mark> Your Space?
            </h2>
            <p>
              Tell us what you are imagining. We will respond with a considered
              path for scope, style, and next steps.
            </p>
            <a className={styles.contactPhone} href="tel:+919551225520">
              <Phone size={16} /> +91 95512 25520
            </a>
          </div>

          <form
            className={`${styles.contactForm} ${revealClass("contact-form")}`}
            data-reveal-id="contact-form"
            onSubmit={handleSubmit}
            style={{ "--reveal-delay": "120ms" }}
          >
            <label>
              Name
              <input
                name="name"
                value={formState.name}
                onChange={handleInputChange}
                placeholder="Your name"
                required
              />
            </label>
            <label>
              Phone Number
              <input
                name="phone"
                value={formState.phone}
                onChange={handleInputChange}
                placeholder="+91 98765 43210"
                type="tel"
                required
              />
            </label>
            <label>
              Project Brief
              <textarea
                name="brief"
                value={formState.brief}
                onChange={handleInputChange}
                placeholder="A few words about your space"
                rows="4"
                required
              />
            </label>
            <button type="submit" disabled={isSubmitting}>
              {isSubmitting ? "Sending..." : "Send Inquiry"}
              <Send size={16} />
            </button>
            {formMessage && <p className={styles.formMessage}>{formMessage}</p>}
          </form>
        </section>
      </main>

      <footer className={styles.footer}>
        <h2>THE EVOLUTION OF INTERIOR DESIGN</h2>
        <div className={styles.footerGrid}>
          <div>
            <img
              className={styles.footerLogo}
              src="/brand/ad-logo-white-icon.png"
              alt="APEX DWELLING Interiors logo"
            />
            <strong>APEX DWELLING</strong>
            <p>Soft neutral interiors with a polished, modern point of view.</p>
          </div>
          <div>
            <span>Navigation</span>
            {navItems.map((item) => (
              <button key={item} type="button" onClick={() => scrollToSection(item)}>
                {item}
              </button>
            ))}
          </div>
          <div>
            <span>Social Media</span>
            <a
              href="https://www.instagram.com/apex_dwelling?igsh=MW0xcHZudmhkZmVoeg=="
              aria-label="Instagram"
              target="_blank"
              rel="noreferrer"
            >
              <Sparkles size={16} /> Instagram
            </a>
            <a
              href="https://www.linkedin.com/company/apex-dwelling/about/"
              aria-label="LinkedIn"
              target="_blank"
              rel="noreferrer"
            >
              <Share2 size={16} /> LinkedIn
            </a>
            <a href="mailto:apexdwelling@gmail.com" aria-label="Email APEX DWELLING">
              <Mail size={16} /> Email
            </a>
            <a href="tel:+919551225520" aria-label="Call APEX DWELLING">
              <Phone size={16} /> +91 95512 25520
            </a>
          </div>
          <div>
            <span>Visit Us</span>
            <a
              href="https://maps.google.com/?q=63/4+Maduranaicken+5th+Cross+Street,+Maduravoyal,+Chennai+-+600095"
              aria-label="Studio address"
              className={styles.footerAddress}
              target="_blank"
              rel="noreferrer"
            >
              <MapPin size={16} /> 63/4 Maduranaicken 5th Cross Street,
              Maduravoyal, Chennai - 600095
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;
