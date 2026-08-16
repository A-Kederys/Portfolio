import React, { useEffect, useRef } from 'react';
import styles from "./About.module.css";
import { getImageURL } from '../../imgPath';
import skills from "../../data/skills.json";

function getTitlePositionClass(cellX, cellY) {
  if (cellX === 1 && cellY === 0) return styles.titleTopRight;
  if (cellX === 0 && cellY === 1) return styles.titleBottomLeft;
  if (cellX === 1 && cellY === 1) return styles.titleBottomRight;
  return '';
}

function About({ cellX = 1, cellY = 0 }) {
  const contentRef = useRef(null);
  const titleClass = [styles.title, getTitlePositionClass(cellX, cellY)].filter(Boolean).join(' ');

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 830 && contentRef.current) {
        contentRef.current.style.opacity = '1';
        contentRef.current.style.transform = 'none';
      }
    };
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && window.innerWidth >= 830 && contentRef.current) {
          contentRef.current.style.opacity = '1';
          contentRef.current.style.transform = 'translateY(0)';
        }
      },
      { threshold: 0.15 }
    );
    if (contentRef.current) observer.observe(contentRef.current);
    window.addEventListener('resize', handleResize);
    handleResize();
    return () => {
      if (contentRef.current) observer.unobserve(contentRef.current);
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <section className={styles.container} id="About">
      <h2 className={titleClass}>About</h2>
      <div className={styles.content} ref={contentRef}>
        <div className={styles.bentoGrid}>
          {/* Education – kairė pusė, pozicijos 1+3 (dvi eilutės) */}
          <div className={`${styles.bentoBlock} ${styles.educationTallBlock}`}>
            <div className={styles.blockHeader}>
              <img src={getImageURL("about/education.png")} alt="" className={styles.blockIcon} />
              <h3 className={styles.blockHeading}>Education</h3>
            </div>
            <p>
              I have recently completed my studies in Software Systems at Kauno Kolegija. Throughout my academic journey, I focused on web and software development technologies, gaining hands-on experience with various programming languages and frameworks. My coursework and personal projects, available on my <a href="https://github.com/A-Kederys" target="_blank" rel="noreferrer">GitHub</a>,  demonstrate my development skills.
            </p>
          </div>

          {/* Career Goals – dešinė viršuje, pozicija 2 */}
          <div className={`${styles.bentoBlock} ${styles.careerBlock}`}>
            <div className={styles.blockHeader}>
              <img src={getImageURL("about/goals.png")} alt="" className={styles.blockIcon} />
              <h3 className={styles.blockHeading}>Career Goals</h3>
            </div>
            <p>
              With a diverse background in civil engineering, I transitioned into the technology field driven by a strong interest in problem-solving and modern digital solutions. My career goal is to grow as a technology professional by continuously expanding my technical skill set and staying adaptable in a rapidly evolving tech landscape.
            </p>
          </div>
          {/* Hobbies – dešinė apačioje, pozicija 4 */}
          <div className={`${styles.bentoBlock} ${styles.hobbiesBlock}`}>
            <div className={styles.blockHeader}>
              <img src={getImageURL("about/hobbies.png")} alt="" className={styles.blockIcon} />
              <h3 className={styles.blockHeading}>Hobbies</h3>
            </div>
            <p>
              Apart from technology, I also enjoy regular gym workouts, which have helped build discipline and consistency. I am also an avid movie enthusiast, bringing creativity and attention to detail into my problem-solving approach.
            </p>
          </div>

          {/* Skills – pilnas plotis apačioje, be antraštės */}
          <div className={`${styles.bentoBlock} ${styles.skillsBlock}`}>
            <div className={styles.skillPills}>
              {skills.map((skill, id) => (
                <div
                  className={styles.skillPill}
                  key={id}
                  data-skill={skill.title}
                  style={{ '--skill-hover': skill.hoverColor }}
                >
                  <img src={getImageURL(skill.imageSrc)} alt="" />
                  <span>{skill.title}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default About;
