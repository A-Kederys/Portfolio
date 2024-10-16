import React, {useState} from 'react';
import styles from "./Navbar.module.css";
import {getImageURL} from "../../imgPath";

function Navbar() {

    const [isMenuOpen, setMenuOpen] = useState(false);
    
  return (
    <div className={styles.navWrap}>
        <nav className={styles.navbar}>
            <a className={styles.title} href="/">A-Kederys</a>
            <div className={styles.menu}> 
                <img 
                    className={styles.menuBtn} 
                    src={ 
                        isMenuOpen 
                        ? getImageURL("navbar/closeIcon.png") 
                        : getImageURL("navbar/icon.png")
                    } 
                    alt="menu icon" 
                    onClick={() => setMenuOpen(!isMenuOpen)}
                />              
                <ul className={`${styles.menuItems} ${isMenuOpen && styles.menuOpen}`}
                    onClick= {() => setMenuOpen(false)} 
                >
                    <li><a href="#About">About</a></li>
                    <li><a href="#Projects">Projects</a></li>
                    <li><a href="#Contact">Contact</a></li>
                </ul>
            </div>
        </nav>
    </div>
  )
}

export default Navbar
