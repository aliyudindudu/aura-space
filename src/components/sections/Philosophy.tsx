'use client';

import { useRef, useEffect } from 'react';
import { gsap, ScrollTrigger } from '@/lib/gsap';
import styles from './Philosophy.module.css';

const pillars = [
    {
        number: '01',
        title: 'Form Follows Emotion',
        description:
            'We believe architecture should evoke feeling. Every curve, every angle, every material choice is designed to create an emotional response.',
    },
    {
        number: '02',
        title: 'Light as Material',
        description:
            'Natural light is our most precious building material. We sculpt spaces around the movement of the sun, creating dynamic environments.',
    },
    {
        number: '03',
        title: 'Timeless Over Trendy',
        description:
            'We design for generations, not seasons. Our work transcends fleeting trends to create spaces that remain relevant and beautiful.',
    },
];

export default function Philosophy() {
    const sectionRef = useRef<HTMLElement>(null);
    const pillarsRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const prefersReducedMotion = window.matchMedia(
            '(prefers-reduced-motion: reduce)'
        ).matches;

        if (prefersReducedMotion) return;

        gsap.registerPlugin(ScrollTrigger);

        const ctx = gsap.context(() => {
            const pillarItems = pillarsRef.current?.children;
            if (pillarItems) {
                gsap.fromTo(
                    pillarItems,
                    { opacity: 0, x: 50 },
                    {
                        opacity: 1,
                        x: 0,
                        duration: 0.8,
                        stagger: 0.2,
                        ease: 'power3.out',
                        scrollTrigger: {
                            trigger: pillarsRef.current,
                            start: 'top 80%',
                        },
                    }
                );
            }
        }, sectionRef);

        return () => ctx.revert();
    }, []);

    return (
        <section ref={sectionRef} className={styles.philosophy} id="philosophy">
            <div className={styles.container}>
                {/* Left Side - Heading */}
                <div className={styles.left}>
                    <span className={styles.label}>Philosophy</span>
                    <h2 className={styles.heading}>
                        Design is not just
                        <br />
                        what it looks like.
                        <br />
                        <span className={styles.accent}>Design is how it works.</span>
                    </h2>
                </div>

                {/* Right Side - Pillars */}
                <div ref={pillarsRef} className={styles.right}>
                    {pillars.map((pillar) => (
                        <article key={pillar.number} className={styles.pillar}>
                            <span className={styles.number}>{pillar.number}</span>
                            <div className={styles.pillarContent}>
                                <h3 className={styles.pillarTitle}>{pillar.title}</h3>
                                <p className={styles.pillarDescription}>{pillar.description}</p>
                            </div>
                        </article>
                    ))}
                </div>
            </div>
        </section>
    );
}
