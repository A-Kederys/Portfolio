import React from 'react'
import projects from "../../data/projects.json"
import { getImageURL } from '../../imgPath'
import styles from "./Projects.module.css"

function Projects() {
  return (
    <section className={styles.container}>
        <h2 className={styles.title}>Projects</h2>
        <div className={styles.projects}>
            {
                projects.map((project, id) => {
                    return (
                        <div key={id} className={styles.projectContainer}>
                            <img 
                                src={getImageURL(project.imageSrc)} 
                                alt={`${project.title} image`} 
                                className={styles.image}
                            />
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
    </section>
  )
}

export default Projects
