import React, { useEffect, useState } from 'react';
import styles from "./Profile.module.css";
import { getImageURL } from '../../imgPath';

function Profile() {
  const [letters, setLetters] = useState([]);
  const [isSmallScreen, setIsSmallScreen] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsSmallScreen(window.innerWidth <= 830);
    };

    handleResize();

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  useEffect(() => {
    const name = 'Almantas Kederys';
    const letterArray = name.split('').map((letter, index) => ({
      letter: letter === ' ' ? '\u00A0' : letter,
      id: index,
      startX: Math.floor(Math.random() * window.innerWidth) - 100,
      startY: Math.floor(Math.random() * window.innerHeight) - 100
    }));
    setLetters(letterArray);
  }, []);


  return (
    <section className={styles.container}>
      <img 
        src={getImageURL("profile/profileImg.png")} 
        alt="profile image" 
        className={styles.profileImg}
      />
      <div className={styles.content}>
      <h1 className={styles.title}>
          {isSmallScreen ? (
            'Almantas Kederys'
          ) : (
            letters.map(({ letter, id, startX, startY }) => (
              <span 
                key={id} 
                className={styles.letter} 
                style={{
                  animationDelay: `${id * 0.1 + 0.5}s`,
                  '--startX': `${startX}px`,
                  '--startY': `${startY}px`,
                }}
              >
                {letter}
              </span>
            ))
          )}
        </h1>
        <p className={styles.description}>
          Software systems student at Kauno Kolegija
          Higher Education Institution. Scroll below to learn
          more!
        </p>
        <a href="#Contact" className={styles.contactBtn}>Contact Me</a>
      </div>

      <div className={styles.socials}>
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
      <div>
        
      </div>
    </section>
    
  )
}

export default Profile
