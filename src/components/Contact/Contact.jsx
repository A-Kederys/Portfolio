import React, { useEffect, useRef, useState } from 'react';
import styles from "./Contact.module.css";

const EMAIL = 'almantaskederys@gmail.com';

const IconEmail = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
    <rect x="2" y="4" width="20" height="16" rx="2" />
    <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
  </svg>
);

const IconLocation = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
    <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z" />
    <circle cx="12" cy="10" r="3" />
  </svg>
);

const IconClock = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
    <circle cx="12" cy="12" r="10" />
    <polyline points="12 6 12 12 16 14" />
  </svg>
);

const IconCopy = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
    <rect x="9" y="9" width="13" height="13" rx="2" ry="2" />
    <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1" />
  </svg>
);

const IconCheck = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
    <polyline points="20 6 9 17 4 12" />
  </svg>
);

const IconDownload = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
    <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
    <polyline points="7 10 12 15 17 10" />
    <line x1="12" y1="15" x2="12" y2="3" />
  </svg>
);

const CV_PATH = import.meta.env.BASE_URL + 'A.Kederys_CV.pdf';

function getTitlePositionClass(cellX, cellY) {
  if (cellX === 1 && cellY === 0) return styles.titleTopRight;
  if (cellX === 0 && cellY === 1) return styles.titleBottomLeft;
  if (cellX === 1 && cellY === 1) return styles.titleBottomRight;
  return '';
}

const FORMSPREE_ENDPOINT = import.meta.env.VITE_FORMSPREE_ENDPOINT || '';
const MSG_LIMIT = 3;
const STORAGE_KEY = 'contact_sends';

function getSendCount() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? parseInt(raw, 10) : 0;
  } catch {
    return 0;
  }
}

function recordSend() {
  try {
    const count = getSendCount() + 1;
    localStorage.setItem(STORAGE_KEY, String(count));
  } catch {}
}

function Contact({ cellX = 0, cellY = 1 }) {
  const nameRef = useRef(null);
  const emailRef = useRef(null);
  const messageRef = useRef(null);
  const contentRef = useRef(null);
  const [feedbackMessage, setFeedbackMessage] = useState("");
  const [isFadingOut, setIsFadingOut] = useState(false);
  const [isButtonDisabled, setIsButtonDisabled] = useState(false);
  const [isError, setIsError] = useState(false);
  const [copySuccess, setCopySuccess] = useState(false);

  const handleCopyEmail = async () => {
    try {
      await navigator.clipboard.writeText(EMAIL);
      setCopySuccess(true);
      setTimeout(() => setCopySuccess(false), 2000);
    } catch {
      setCopySuccess(false);
    }
  };
  const titleClass = [styles.title, getTitlePositionClass(cellX, cellY)].filter(Boolean).join(' ');

  const showFeedback = (msg, error = false) => {
    setIsError(error);
    setFeedbackMessage(msg);
    setIsFadingOut(false);
    setIsButtonDisabled(true);
    setTimeout(() => setIsFadingOut(true), 3000);
    setTimeout(() => {
      setFeedbackMessage("");
      setIsFadingOut(false);
      setIsButtonDisabled(false);
    }, 6000);
  };

  const handleSend = async () => {
    const name = nameRef.current?.value?.trim() ?? '';
    const email = emailRef.current?.value?.trim() ?? '';
    const message = messageRef.current?.value?.trim() ?? '';
    if (!name || !email || !message) return;

    if (!FORMSPREE_ENDPOINT) {
      showFeedback("Configure VITE_FORMSPREE_ENDPOINT in .env", true);
      return;
    }

    if (getSendCount() >= MSG_LIMIT) {
      showFeedback("Maximum 3 messages reached.", true);
      return;
    }

    setIsButtonDisabled(true);
    setFeedbackMessage("Sending...");
    setIsError(false);

    try {
      const res = await fetch(FORMSPREE_ENDPOINT, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name,
          email,
          message,
          _subject: `Portfolio message from ${name}`,
        }),
      });

      if (!res.ok) throw new Error('Send failed');
      recordSend();
      nameRef.current.value = '';
      emailRef.current.value = '';
      messageRef.current.value = '';
      showFeedback("Sent! Thanks for reaching out.");
    } catch {
      showFeedback("Failed to send. Try again later.", true);
    }
  };

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && contentRef.current) {
          contentRef.current.style.opacity = '1';
          contentRef.current.style.transform = 'translateY(0)';
        }
      },
      { threshold: 0.25 }
    );
    if (contentRef.current) observer.observe(contentRef.current);
    return () => contentRef.current && observer.unobserve(contentRef.current);
  }, []);

  return (
    <footer id="Contact" className={styles.wrapper}>
      <h2 className={titleClass}><span>Contact</span></h2>
      <div className={styles.container}>
        <div className={styles.heroWrap}>
          <div className={styles.heroBlock} ref={contentRef}>
          <aside className={styles.sidebar}>
            <div className={styles.contactItem}>
              <span className={styles.contactIcon} aria-hidden><IconEmail /></span>
              <div className={styles.contactText}>
                <span className={styles.contactLabel}>Email</span>
                <span className={styles.emailRow}>
                  <span>{EMAIL}</span>
                  <button
                    type="button"
                    className={styles.copyIconButton}
                    onClick={handleCopyEmail}
                    title={copySuccess ? "Copied!" : "Copy"}
                  >
                    {copySuccess ? <IconCheck /> : <IconCopy />}
                  </button>
                </span>
              </div>
            </div>
            <div className={styles.contactItem}>
              <span className={styles.contactIcon} aria-hidden><IconLocation /></span>
              <div className={styles.contactText}>
                <span className={styles.contactLabel}>Location</span>
                <span>Kaunas, Lithuania</span>
              </div>
            </div>
            <div className={styles.contactItem}>
              <span className={styles.contactIcon} aria-hidden><IconClock /></span>
              <div className={styles.contactText}>
                <span className={styles.contactLabel}>Availability</span>
                <span>24/7</span>
              </div>
            </div>
            <a
              href={CV_PATH}
              download="A.Kederys_CV.pdf"
              className={styles.cvButton}
              title="Download CV"
            >
              <IconDownload />
              Download CV
            </a>
          </aside>
          <form className={styles.form}>
            <div className={styles.fieldGroup}>
              <label className={styles.fieldLabel} htmlFor="contact-name">Name</label>
              <input
                id="contact-name"
                type="text"
                placeholder="Sarah"
                required
                ref={nameRef}
                className={styles.input}
                autoComplete="off"
              />
            </div>
            <div className={styles.fieldGroup}>
              <label className={styles.fieldLabel} htmlFor="contact-email">Email</label>
              <input
                id="contact-email"
                type="email"
                placeholder="sarah.weber@gmail.com"
                required
                ref={emailRef}
                className={styles.input}
                autoComplete="new-password"
              />
            </div>
            <div className={styles.fieldGroup}>
              <label className={styles.fieldLabel} htmlFor="contact-message">Message</label>
              <textarea
                id="contact-message"
                placeholder="Share your thoughts here..."
                required
                ref={messageRef}
                className={styles.textarea}
                autoComplete="off"
              />
            </div>
            <div className={styles.submitArea}>
              <button type="button" className={styles.button} disabled={isButtonDisabled} onClick={handleSend}>
                Send
              </button>
              <div className={styles.feedbackSlot} aria-live="polite">
                {feedbackMessage && (
                  <p className={`${styles.feedbackMsg} ${isError ? styles.feedbackError : ''} ${isFadingOut ? styles.hidden : ''}`}>
                    {feedbackMessage}
                  </p>
                )}
              </div>
            </div>
          </form>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Contact;
