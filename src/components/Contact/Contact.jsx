import React, { useEffect, useRef, useState } from 'react';
import styles from "./Contact.module.css";
import { getImageURL } from '../../imgPath';

function Contact() {
    const nameRef = useRef(null);
    const emailRef = useRef(null);
    const messageRef = useRef(null);
    const contentRef = useRef(null);
    const [feedbackMessage, setFeedbackMessage] = useState("");
    const [isFadingOut, setIsFadingOut] = useState(false);
    const [isButtonDisabled, setIsButtonDisabled] = useState(false);

    const handleSend = (e) => {
        e.preventDefault();
        const name = nameRef.current.value;
        const email = emailRef.current.value;
        const message = messageRef.current.value;

        const subject = encodeURIComponent(`Portfolio message from "${name}"`);
        const body = encodeURIComponent(message);

        const mailtoLink = `mailto:almantaskederys@gmail.com?subject=${subject}&body=${body}`;

        window.location.href = mailtoLink;

        nameRef.current.value = '';
        emailRef.current.value = '';
        messageRef.current.value = '';

        setFeedbackMessage("Done!");
        setIsFadingOut(false);
        setIsButtonDisabled(true);

         setTimeout(() => {
            setIsFadingOut(true);
        }, 3000);

        setTimeout(() => {
            setFeedbackMessage("");
            setIsFadingOut(false);
            setIsButtonDisabled(false);
        }, 6000);
    };

    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    contentRef.current.style.opacity = '1'; 
                    contentRef.current.style.transform = 'translateX(0)';
                }
            },
            { threshold: 0.3 }
        );

        if (contentRef.current) {
            observer.observe(contentRef.current);
        }

        return () => {
            if (contentRef.current) {
                observer.unobserve(contentRef.current);
            }
        };
    }, []);

  return (
    <footer id="Contact">
        <div className={styles.container}>
            <h2>Contact</h2>
            <div className={styles.content} ref={contentRef}>
                <form className={styles.form} onSubmit={handleSend}>
                    <input
                        type="text"
                        placeholder="Your Name"
                        required
                        ref={nameRef}
                        className={styles.input}
                    />
                    <input
                        type="email"
                        placeholder="Your Email"
                        required
                        ref={emailRef}
                        className={styles.input}
                    />
                    <textarea
                        placeholder="Your Message"
                        required
                        ref={messageRef}
                        className={styles.textarea}
                    />
                    <div className={styles.feedback}>
                        <button type="submit" className={styles.button} disabled={isButtonDisabled}>Send</button>
                        {feedbackMessage && (
                                <p className={`${styles.feedback} ${isFadingOut ? styles.hidden : ''}`}>
                                    {feedbackMessage}
                                </p>
                        )}
                    </div>
                </form>

                <ul className={styles.links}>
                <li className={styles.link}>
                    <a href="https://www.facebook.com/Almantas.Kederys.1/" target="_blank">
                        <img src={getImageURL("contacts/facebook.png")} alt="facebook icon" />
                    </a>
                </li>
                <li className={styles.link}>
                    <a href="mailto:almantaskederys@gmail.com">
                        <img src={getImageURL("contacts/gmail.png")} alt="gmail icon" />
                    </a>
                </li>
                <li className={styles.link}>
                    <a href="https://github.com/A-Kederys" target="_blank">
                        <img src={getImageURL("contacts/github.png")} alt="github icon" />
                    </a>
                </li>
            </ul>
            </div>
        </div>
    </footer>

    
  )
}

export default Contact