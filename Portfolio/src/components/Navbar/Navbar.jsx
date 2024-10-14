import React, {useState} from 'react';
import styles from "./Navbar.module.css";
import {getImageURL} from "../../imgPath";

function Navbar() {

    const [isMenuOpen, setMenuOpen] = useState(false);
    
  return (
        <nav className={styles.navbar}>
            <a className={styles.title} href="/">Almantas-K</a>
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
                    <li><a href="#about">About</a></li>
                    <li><a href="#projects">Projects</a></li>
                    <li><a href="#contact">Contact</a></li>
                </ul>
            </div>
        </nav>
  )
}

export default Navbar
