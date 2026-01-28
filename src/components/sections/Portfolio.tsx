'use client';

import { useRef, useEffect } from 'react';
import { gsap } from 'gsap';
import { projects } from '@/data/projects';
import styles from './Portfolio.module.css';

// Luxury gradient backgrounds for each project
const gradients: Record<string, string> = {
    'horizon-house': 'linear-gradient(135deg, #1a1a2e 0%, #16213e 50%, #0f3460 100%)',
    'azure-villa': 'linear-gradient(135deg, #1e3a5f 0%, #2e5a7a 50%, #3a7ca5 100%)',
    'urban-loft': 'linear-gradient(135deg, #2d2d2d 0%, #434343 50%, #525252 100%)',
    'glass-pavilion': 'linear-gradient(135deg, #1a3a2a 0%, #2d5a3d 50%, #3a7a4a 100%)',
    'terra-house': 'linear-gradient(135deg, #3d2914 0%, #5a3d1a 50%, #7a5020 100%)',
    'sky-residence': 'linear-gradient(135deg, #0f0f2a 0%, #1a1a4a 50%, #2a2a6a 100%)',
};

export default function Portfolio() {
    const sectionRef = useRef<HTMLElement>(null);
    const headingRef = useRef<HTMLHeadingElement>(null);
    const gridRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const prefersReducedMotion = window.matchMedia(
            '(prefers-reduced-motion: reduce)'
        ).matches;

        if (prefersReducedMotion) return;

        const ctx = gsap.context(() => {
            // Animate heading on scroll
            gsap.fromTo(
                headingRef.current,
                { opacity: 0, y: 50 },
                {
                    opacity: 1,
                    y: 0,
                    duration: 1,
                    ease: 'power3.out',
                    scrollTrigger: {
                        trigger: sectionRef.current,
                        start: 'top 80%',
                    },
                }
            );

            // Animate grid items with stagger
            const gridItems = gridRef.current?.children;
            if (gridItems) {
                gsap.fromTo(
                    gridItems,
                    { opacity: 0, y: 60 },
                    {
                        opacity: 1,
                        y: 0,
                        duration: 0.8,
                        stagger: 0.15,
                        ease: 'power3.out',
                        scrollTrigger: {
                            trigger: gridRef.current,
                            start: 'top 75%',
                        },
                    }
                );
            }
        }, sectionRef);

        return () => ctx.revert();
    }, []);

    return (
        <section ref={sectionRef} className={styles.portfolio} id="work">
            <div className={styles.container}>
                {/* Section Header */}
                <div className={styles.header}>
                    <span className={styles.label}>Portfolio</span>
                    <h2 ref={headingRef} className={styles.heading}>
                        Selected Works
                    </h2>
                </div>

                {/* Bento Grid */}
                <div ref={gridRef} className={styles.grid}>
                    {projects.map((project) => (
                        <article
                            key={project.id}
                            className={`${styles.card} ${styles[project.size]}`}
                        >
                            {/* Image Container with Ken Burns */}
                            <div className={styles.imageWrapper}>
                                <div
                                    className={styles.image}
                                    style={{
                                        backgroundImage: `linear-gradient(to bottom, transparent 40%, rgba(10, 10, 10, 0.9)), url(${project.image}), ${gradients[project.id]}`,
                                    }}
                                />
                            </div>

                            {/* Card Content */}
                            <div className={styles.cardContent}>
                                <span className={styles.category}>
                                    {project.category} · {project.year}
                                </span>
                                <h3 className={styles.title}>{project.title}</h3>
                                <p className={styles.subtitle}>{project.subtitle}</p>

                                {/* View Project Link */}
                                <a href={`#${project.id}`} className={styles.link}>
                                    <span>View Project</span>
                                    <svg
                                        width="20"
                                        height="20"
                                        viewBox="0 0 24 24"
                                        fill="none"
                                        xmlns="http://www.w3.org/2000/svg"
                                        aria-hidden="true"
                                    >
                                        <path
                                            d="M7 17L17 7M17 7H7M17 7V17"
                                            stroke="currentColor"
                                            strokeWidth="1.5"
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                        />
                                    </svg>
                                </a>
                            </div>
                        </article>
                    ))}
                </div>
            </div>
        </section>
    );
}
