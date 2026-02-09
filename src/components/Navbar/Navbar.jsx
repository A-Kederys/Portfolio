import React, {useState, useRef, useEffect} from 'react';
import styles from "./Navbar.module.css";
import {getImageURL} from "../../imgPath";

function Navbar({ moveTo }) {

    const [isMenuOpen, setMenuOpen] = useState(false);

    const goTo = (x, y) => {
        if (typeof moveTo === 'function') moveTo(x, y);
        setMenuOpen(false);
    };
    const menuRef = useRef(null);

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (menuRef.current && !menuRef.current.contains(event.target)) {
                setMenuOpen(false);
            }
        };

        if (isMenuOpen) {
            document.addEventListener("mousedown", handleClickOutside);
        }

        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [isMenuOpen]);
    
  return (
    <div className={styles.navWrap}>
        <nav className={styles.navbar}>
        <a className={styles.title} href={process.env.NODE_ENV === 'production' ? "/Portfolio/" : "/"}>A-Kederys</a>
            <div className={styles.menu} ref={menuRef}> 
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
                <ul className={`${styles.menuItems} ${isMenuOpen ? styles.menuOpen : styles.menuClose}`}
                    onClick={() => setMenuOpen(false)}
                >
                    <li><button type="button" className={styles.navLinkBtn} onClick={() => goTo(0, 0)}>Almantas K.</button></li>
                    <li><button type="button" className={styles.navLinkBtn} onClick={() => goTo(1, 0)}>About</button></li>
                    <li><button type="button" className={styles.navLinkBtn} onClick={() => goTo(1, 1)}>Projects</button></li>
                    <li><button type="button" className={styles.navLinkBtn} onClick={() => goTo(0, 1)}>Contact</button></li>

                </ul>
            </div>
        </nav>
    </div>
  )
}

export default Navbar