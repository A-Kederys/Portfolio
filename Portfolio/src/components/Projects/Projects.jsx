import React, { useRef, useState, useEffect } from 'react'
import projects from "../../data/projects.json"
import { getImageURL } from '../../imgPath'
import styles from "./Projects.module.css"

function Projects() {
    const scrollRef = useRef(null);
    const [atStart, setAtStart] = useState(true);
    const [atEnd, setAtEnd] = useState(false);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedImage, setSelectedImage] = useState('');

    const scrollLeft = () => {
        scrollRef.current.scrollBy({ left: -700, behavior: 'smooth' });
      };

    const scrollRight = () => {
        scrollRef.current.scrollBy({ left: 700, behavior: 'smooth' });
      };

    const Scroll = () => {
        const scrollContainer = scrollRef.current;
        const scrollLeftValue = scrollContainer.scrollLeft;
        const scrollWidth = scrollContainer.scrollWidth;
        const clientWidth = scrollContainer.clientWidth;

        setAtStart(scrollLeftValue === 0);

        setAtEnd(scrollLeftValue + clientWidth >= scrollWidth);
    };

    const openModal = (imageSrc) => {
        setSelectedImage(imageSrc);
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
        setSelectedImage('');
    };

    useEffect(() => {
        const scrollContainer = scrollRef.current;
        scrollContainer.addEventListener('scroll', Scroll);

        return () => {
            scrollContainer.removeEventListener('scroll', Scroll);
        };
    }, []);

  return (
    <section className={styles.container}>
        <h2 className={styles.title}>Projects</h2>
        {!atStart && (
                <button className={styles.leftArrow} onClick={scrollLeft}>
                    &#10094;
                </button>
        )}
        <div className={styles.projects} ref={scrollRef}>
            {
                projects.map((project, id) => {
                    return (
                        <div key={id} className={styles.projectContainer}>
                            <div style={{ position: 'relative' }}>
                                <img 
                                    src={getImageURL(project.imageSrc)} 
                                    alt={`${project.title} image`} 
                                    className={styles.image}
                                    onClick={() => openModal(getImageURL(project.imageSrc))}
                                />
                                <div className={styles.overlay}>View More</div>
                            </div>
                            <h3 className={styles.projectTitle}>{project.title}</h3>
                            <p className={styles.description}>{project.description}</p>
                            <ul className={styles.skills}>
                                {
                                project.skills.map((skill, id) => {
                                    return (
                                        <li key={id} className={styles.skill}>{skill}</li>
                                    )
                                })
                                }
                            </ul>
                            <div className={styles.links}>
                                <a href={project.source} className={styles.link}  target="_blank">Source</a>
                            </div>
                        </div>
                    )
                })
            }
        </div>
        {!atEnd && (
                <button className={styles.rightArrow} onClick={scrollRight}>
                    &#10095;
                </button>
        )}
        {isModalOpen && (
            <div className={styles.modal} onClick={closeModal}>
                <img src={selectedImage} alt="Full view" className={styles.modalImage} />
            </div>
        )}
    </section>
  )
}

export default Projects
