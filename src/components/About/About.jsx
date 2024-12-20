import React, { useEffect, useRef } from 'react';
import styles from "./About.module.css"
import { getImageURL } from '../../imgPath';
//https://icons8.com/icons/
import skills from "../../data/skills.json"

function About() {
    const contentRef = useRef(null);

    useEffect(() => {
        const handleResize = () => {
            if (window.innerWidth < 830) {
                if (contentRef.current) {
                    contentRef.current.style.opacity = '1';
                    contentRef.current.style.transform = 'none';
                }
            }
        };

        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting && window.innerWidth >= 830) {
                    contentRef.current.style.opacity = '1'; 
                    contentRef.current.style.transform = 'translateX(0)';
                }
            },
            { threshold: 0.2 } // trigger when % of content visible
        );

        if (contentRef.current) {
            observer.observe(contentRef.current);
        }

        window.addEventListener('resize', handleResize);
        handleResize();

        return () => {
            if (contentRef.current) {
                observer.unobserve(contentRef.current);
            }
            window.removeEventListener('resize', handleResize);
        };
    }, []);

  return (
    <section className={styles.container} id="About">
        <h2 className={styles.title}>About</h2>
        <div className={styles.content} ref={contentRef}>
            <ul className={styles.aboutItems}>
                <li className={styles.aboutItem}>
                    <div className={styles.aboutItemTitle}>
                        <img src={getImageURL("about/education.png")} alt="education icon" />
                        <h3>Education </h3>
                    </div>
                    <p>
                        I’m a third-year Software Systems student at Kauno Kolegija who specializes 
                        in programming languages and frameworks for web and software development. 
                        My coursework and personal projects, available on my  
                        <a href="https://github.com/A-Kederys" target="_blank"> GitHub</a>, 
                        demonstrate my development skills.
                    </p>
                </li>
                <li className={`${styles.aboutItem} ${styles.aboutItemRight}`}>
                    <div className={styles.aboutItemTitle}>
                        <img src={getImageURL("about/goals.png")} alt="goals icon" />
                        <h3>Career Goals</h3>
                    </div>
                        <p>
                            With a diverse background in civil engineering, I transitioned into software development due 
                            to my passion for technology and problem-solving. My goal is to continue refining my skills 
                            and deepening my knowledge in software systems.
                        </p>
                </li>
            </ul>
            
            <ul className={styles.aboutItems}>
            <li className={styles.aboutItem}>
                    <div className={styles.aboutItemTitle}>
                        <img src={getImageURL("about/skills.png")} alt="skills icon" />
                        <h3>Skills</h3>
                    </div>
                    <div className={styles.skills}>{
                        skills.map((skill, id) => {
                            return (
                            <div className={styles.skill} key={id}>
                                <div className={styles.skillContainer}>
                                    <img src={getImageURL(skill.imageSrc)} 
                                    alt={`${skill.title} logo`} />
                                </div>
                                <p>{skill.title}</p>
                            </div>
                            );
                        })}
                    </div> 
                </li>
                <li className={`${styles.aboutItem} ${styles.aboutItemRight}`}>
                    <div className={styles.aboutItemTitle}>
                        <img src={getImageURL("about/hobbies.png")} alt="hobbies icon" />
                        <h3>Hobbies</h3>
                    </div>
                        <p>
                            Apart from coding, I also enjoy regular gym workouts, which have instilled a strong work ethic, 
                            and I am an avid movie enthusiast, bringing creativity and attention to detail into my 
                            problem-solving approach.
                        </p>
                </li>
            </ul>
        </div>
    </section>
  )
}

export default About
