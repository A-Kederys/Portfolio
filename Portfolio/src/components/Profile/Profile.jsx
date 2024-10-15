import React, { useState } from 'react'
import styles from "./Profile.module.css";
import { getImageURL } from '../../imgPath';

function Profile() {
  return (
    <section className={styles.container}>
      <img 
        src={getImageURL("profile/profileImg.png")} 
        alt="profile image" 
        className={styles.profileImg}
      />
      <div className={styles.content}>
        <h1 className={styles.title}>Almantas Kederys</h1>
        <p className={styles.description}>
          I'm a software systems student at Kauno Kolegija
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
