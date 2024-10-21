import React, {useState} from 'react';
import styles from "./Navbar.module.css";
import {getImageURL} from "../../imgPath";

function Navbar() {

    const [isMenuOpen, setMenuOpen] = useState(false);

    const switchTheme = (e) => {

        if(e.target.checked) {
            document.querySelector('body').setAttribute('data-theme', 'light')
        }

        else {
            document.querySelector('body').setAttribute('data-theme', 'dark')
        }
    }
    
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
                    <label>
                        <input className='toggle-checkbox' type='checkbox' onChange={switchTheme}></input>
                        <div className='toggle-slot'>
                            <div className='sun-icon-wrapper'>
                            <div className="iconify sun-icon" data-icon="feather-sun" data-inline="false"></div>
                            </div>
                            <div className='toggle-button'></div>
                            <div className='moon-icon-wrapper'>
                            <div className="iconify moon-icon" data-icon="feather-moon" data-inline="false"></div>
                            </div>
                        </div>
                    </label>

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
