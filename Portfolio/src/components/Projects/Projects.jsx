import React, { useRef, useState, useEffect } from 'react'
import projects from "../../data/projects.json"
import { getImageURL } from '../../imgPath'
import styles from "./Projects.module.css"

function Projects() {
    const scrollRef = useRef(null);
    const [atStart, setAtStart] = useState(true);
    const [atEnd, setAtEnd] = useState(false);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedProjectImages, setSelectedProjectImages] = useState([]);
    const [currentImageIndex, setCurrentImageIndex] = useState(0);
    const [isVisible, setIsVisible] = useState(false); 

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

    const openModal = (imageArray) => {
        setSelectedProjectImages(imageArray);
        setCurrentImageIndex(0);
        setIsModalOpen(true);

        document.body.classList.add(styles.modalOpen);
    };

    const closeModal = () => {
        setIsModalOpen(false);
        setSelectedProjectImages([]);
        setCurrentImageIndex(0);

        document.body.classList.remove(styles.modalOpen);
    };

    const showNextImage = (e) => {
        e.stopPropagation();
        setCurrentImageIndex((prevIndex) => 
            (prevIndex + 1) % selectedProjectImages.length
        );
    };

    const showPreviousImage = (e) => {
        e.stopPropagation();
        setCurrentImageIndex((prevIndex) => 
            (prevIndex - 1 + selectedProjectImages.length) % selectedProjectImages.length
        );
    };

    useEffect(() => {
        const scrollContainer = scrollRef.current;
        scrollContainer.addEventListener('scroll', Scroll);

        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    setIsVisible(true);
                }
            },
            { threshold: 0.1 }
        );

        observer.observe(scrollContainer);

        return () => {
            scrollContainer.removeEventListener('scroll', Scroll);

            observer.unobserve(scrollContainer);
        };
    }, []);

  return (
    <section className={styles.container} id="Projects">
        <h2 className={styles.title}>Projects</h2>
        {!atStart && (
                <button className={styles.leftArrow} onClick={scrollLeft}>
                    &#10094;
                </button>
        )}
        <div 
            className={`${styles.projects} ${isVisible ? styles.fadeIn : styles.hidden}`} 
            ref={scrollRef}
        >
            {
                projects.map((project, id) => {
                    return (
                        <div key={id} className={styles.projectContainer}>
                            <div style={{ position: 'relative' }}>
                                <img 
                                    src={getImageURL(project.imageSrc[0])} 
                                    alt={`${project.title} image`} 
                                    className={styles.image}
                                    onClick={() => openModal(project.imageSrc)}
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
                    <button className={styles.prevImage} onClick={showPreviousImage}>&#10094;</button>
                    <img 
                        src={getImageURL(selectedProjectImages[currentImageIndex])} 
                        alt="Project Full view" 
                        className={styles.modalImage} 
                    />
                    <button className={styles.nextImage} onClick={showNextImage}>&#10095;</button>
                </div>
        )}
    </section>
  )
}

export default Projects