import React, { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, EffectCoverflow } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/effect-coverflow';
import projects from '../../data/projects.json';
import skills from '../../data/skills.json';
import { getImageURL } from '../../imgPath';
import styles from './Projects.module.css';

const IconDownload = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
    <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
    <polyline points="7 10 12 15 17 10" />
    <line x1="12" y1="15" x2="12" y2="3" />
  </svg>
);

const IconExternalLink = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
    <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
    <polyline points="15 3 21 3 21 9" />
    <line x1="10" y1="14" x2="21" y2="3" />
  </svg>
);

function getTitlePositionClass(cellX, cellY) {
  if (cellX === 1 && cellY === 0) return styles.titleTopRight;
  if (cellX === 0 && cellY === 1) return styles.titleBottomLeft;
  if (cellX === 1 && cellY === 1) return styles.titleBottomRight;
  return '';
}

const skillAliases = {
  Tailwind: 'Tailwind CSS',
};

function getSkillColor(skillTitle) {
  const skill = skills.find(({ title }) => title === (skillAliases[skillTitle] || skillTitle));
  return skill?.hoverColor || 'var(--color-primary)';
}

function Projects({ cellX = 1, cellY = 1 }) {
  const [isImageModalOpen, setIsImageModalOpen] = useState(false);
  const [selectedProjectImages, setSelectedProjectImages] = useState([]);
  const [galleryProject, setGalleryProject] = useState(null);
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

  const openImageModal = (project, e) => {
    e?.stopPropagation();
    setSelectedProjectImages(project.imageSrc);
    setGalleryProject(project);
    setCurrentImageIndex(0);
    setIsImageModalOpen(true);
    document.body.classList.add(styles.modalOpen);
  };

  const closeImageModal = () => {
    setIsImageModalOpen(false);
    setSelectedProjectImages([]);
    setGalleryProject(null);
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
                    onClick={(e) => openImageModal(project, e)}
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
                        <span
                          key={i}
                          className={styles.tag}
                          style={{ '--skill-hover': getSkillColor(skill) }}
                        >
                          {skill}
                        </span>
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
                {detailsProject.download && (
                  <a
                    href={import.meta.env.BASE_URL + detailsProject.download}
                    download={detailsProject.download}
                    className={styles.detailsPreviewLink}
                  >
                    Download
                  </a>
                )}
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
                    openImageModal(detailsProject);
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
            {(galleryProject?.preview || galleryProject?.download) && (
              <div className={styles.modalActions}>
                {galleryProject.preview && (
                  <a
                    href={galleryProject.preview}
                    target="_blank"
                    rel="noreferrer"
                    className={styles.modalAction}
                    title="Live preview"
                    aria-label="Open live preview"
                    onClick={(e) => e.stopPropagation()}
                  >
                    <IconExternalLink />
                  </a>
                )}
                {galleryProject.download && (
                  <a
                    href={import.meta.env.BASE_URL + galleryProject.download}
                    download={galleryProject.download}
                    className={styles.modalAction}
                    title="Download"
                    aria-label="Download file"
                    onClick={(e) => e.stopPropagation()}
                  >
                    <IconDownload />
                  </a>
                )}
              </div>
            )}
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
