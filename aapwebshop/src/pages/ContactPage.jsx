import { useState, useCallback } from 'react';
import '../css/contact.css';

export default function ContactPage() {
  const [formData, setFormData] = useState({ name: '', message: '' });
  const [showSuccess, setShowSuccess] = useState(false);

  const handleChange = useCallback((e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  }, []);

  const handleSubmit = useCallback(
    (e) => {
      e.preventDefault();
      console.log('Form submitted:', formData);
      setShowSuccess(true);
      setFormData({ name: '', message: '' });

      setTimeout(() => {
        setShowSuccess(false);
      }, 5000);
    },
    [formData]
  );

  return (
    <section>
      <h2 className="page-title">Contact Us</h2>
      <p className="page-subtitle">
        We&apos;d love to hear from you! Send us a message and we&apos;ll respond as
        soon as possible.
      </p>

      <div className="contact-form">
        <h2>Send us a Message</h2>
        <p className="contact-subtitle">
          We&apos;d love to hear from you! Send us a message and we&apos;ll respond as
          soon as possible.
        </p>

        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="name">Your Name</label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
              aria-label="Your name"
            />
          </div>

          <div className="form-group">
            <label htmlFor="message">Your Message</label>
            <textarea
              id="message"
              name="message"
              value={formData.message}
              onChange={handleChange}
              required
              aria-label="Your message"
            />
          </div>

          <button type="submit" className="submit-btn">
            Send Message
          </button>
        </form>

        {showSuccess && (
          <div className="success-message" role="alert">
            Thank you for your message! We&apos;ll get back to you soon.
          </div>
        )}
      </div>
    </section>
  );
}
