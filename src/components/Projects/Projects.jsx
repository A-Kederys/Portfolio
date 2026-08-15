import React, { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, EffectCoverflow } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/effect-coverflow';
import projects from '../../data/projects.json';
import { getImageURL } from '../../imgPath';
import styles from './Projects.module.css';

function getTitlePositionClass(cellX, cellY) {
  if (cellX === 1 && cellY === 0) return styles.titleTopRight;
  if (cellX === 0 && cellY === 1) return styles.titleBottomLeft;
  if (cellX === 1 && cellY === 1) return styles.titleBottomRight;
  return '';
}

function Projects({ cellX = 1, cellY = 1 }) {
  const [isImageModalOpen, setIsImageModalOpen] = useState(false);
  const [selectedProjectImages, setSelectedProjectImages] = useState([]);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [detailsProject, setDetailsProject] = useState(null);
  const titleClass = [styles.title, getTitlePositionClass(cellX, cellY)].filter(Boolean).join(' ');

  useEffect(() => {
    if (!isImageModalOpen || !selectedProjectImages.length) return;

    selectedProjectImages.forEach((imagePath) => {
      const img = new Image();
      img.src = getImageURL(imagePath);
    });
  }, [isImageModalOpen, selectedProjectImages]);

  const openImageModal = (imageArray, e) => {
    e?.stopPropagation();
    setSelectedProjectImages(imageArray);
    setCurrentImageIndex(0);
    setIsImageModalOpen(true);
    document.body.classList.add(styles.modalOpen);
  };

  const closeImageModal = () => {
    setIsImageModalOpen(false);
    setSelectedProjectImages([]);
    document.body.classList.remove(styles.modalOpen);
  };

  const openDetails = (project, e) => {
    e?.stopPropagation();
    setDetailsProject(project);
  };

  const closeDetails = () => setDetailsProject(null);

  const showNextImage = (e) => {
    e.stopPropagation();
    setCurrentImageIndex((prev) => (prev + 1) % selectedProjectImages.length);
  };

  const showPreviousImage = (e) => {
    e.stopPropagation();
    setCurrentImageIndex((prev) => (prev - 1 + selectedProjectImages.length) % selectedProjectImages.length);
  };

  return (
    <section className={styles.container} id="Projects">
      <h2 className={titleClass}>Projects</h2>
      <div className={styles.sliderWrap}>
        <button id="projects-prev" type="button" className={styles.arrow} aria-label="Previous project">
          <span className={styles.arrowSymbol}>‹</span>
        </button>
        <div className={styles.sliderBox}>
        <Swiper
          className={styles.slider}
          modules={[Navigation, EffectCoverflow]}
          effect="coverflow"
          coverflowEffect={{
            rotate: 0,
            stretch: 24,
            depth: 48,
            scale: 0.68,
            modifier: 1,
            slideShadows: false,
          }}
          navigation={{
            prevEl: '#projects-prev',
            nextEl: '#projects-next',
          }}
          loop
          slidesPerView="auto"
          centeredSlides
          spaceBetween={24}
          speed={500}
          grabCursor
        >
          {projects.map((project) => (
            <SwiperSlide key={project.title}>
              <article
                className={styles.projectCard}
                onClick={(e) => { e.stopPropagation(); openDetails(project); }}
              >
                <div className={styles.cardImageWrap}>
                  <img src={getImageURL(project.imageSrc[0])} alt="" className={styles.cardImage} />
                  <button
                    type="button"
                    className={styles.galleryBtn}
                    onClick={(e) => openImageModal(project.imageSrc, e)}
                    aria-label="Open gallery"
                  >
                    Gallery
                  </button>
                </div>
                <div className={styles.cardBody}>
                  <h3 className={styles.cardTitle}>{project.title}</h3>
                  {project.description && (
                    <p className={styles.cardDescription}>{project.description}</p>
                  )}
                  {project.skills?.length > 0 && (
                    <div className={styles.tags}>
                      {project.skills.map((skill, i) => (
                        <span key={i} className={styles.tag}>{skill}</span>
                      ))}
                    </div>
                  )}
                </div>
              </article>
            </SwiperSlide>
          ))}
        </Swiper>
        </div>
        <button id="projects-next" type="button" className={styles.arrow} aria-label="Next project">
          <span className={styles.arrowSymbol}>›</span>
        </button>
      </div>

      {detailsProject &&
        createPortal(
          <div className={styles.detailsOverlay} onClick={closeDetails}>
            <div className={styles.detailsModal} onClick={(e) => e.stopPropagation()}>
              <button type="button" className={styles.detailsClose} onClick={closeDetails} aria-label="Close">
                ×
              </button>
              <img src={getImageURL(detailsProject.imageSrc[0])} alt="" className={styles.detailsImage} />
              <h3 className={styles.detailsTitle}>{detailsProject.title}</h3>
              <p className={styles.detailsDescription}>{detailsProject.description}</p>
              <div className={styles.detailsLinks}>
                {detailsProject.preview && (
                  <a href={detailsProject.preview} target="_blank" rel="noreferrer" className={styles.detailsPreviewLink}>
                    Preview
                  </a>
                )}
                {detailsProject.source && (
                  <a href={detailsProject.source} target="_blank" rel="noreferrer" className={styles.detailsLink}>
                    Source
                  </a>
                )}
                <button
                  type="button"
                  className={styles.detailsGalleryBtn}
                  onClick={() => {
                    closeDetails();
                    setSelectedProjectImages(detailsProject.imageSrc);
                    setCurrentImageIndex(0);
                    setIsImageModalOpen(true);
                    document.body.classList.add(styles.modalOpen);
                  }}
                >
                  Gallery
                </button>
              </div>
            </div>
          </div>,
          document.body
        )}

      {isImageModalOpen &&
        createPortal(
          <div className={styles.modal} onClick={closeImageModal}>
            <span className={styles.modalCounter} aria-live="polite">
              {currentImageIndex + 1}/{selectedProjectImages.length}
            </span>
            <button
              type="button"
              className={styles.modalClose}
              onClick={(e) => { e.stopPropagation(); closeImageModal(); }}
              aria-label="Close gallery"
            >
              ×
            </button>
            <button type="button" className={styles.prevImage} onClick={showPreviousImage} aria-label="Previous">
              &#10094;
            </button>
            <img src={getImageURL(selectedProjectImages[currentImageIndex])} alt="Project" className={styles.modalImage} onClick={(e) => e.stopPropagation()} />
            <button type="button" className={styles.nextImage} onClick={showNextImage} aria-label="Next">
              &#10095;
            </button>
          </div>,
          document.body
        )}
    </section>
  );
}

export default Projects;
