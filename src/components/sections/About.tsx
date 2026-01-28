'use client';

import { useRef, useEffect, useState } from 'react';
import { gsap, ScrollTrigger } from '@/lib/gsap';
import styles from './About.module.css';

const stats = [
    { value: 150, suffix: '+', label: 'Projects Completed' },
    { value: 25, suffix: '+', label: 'Years Experience' },
    { value: 12, suffix: '', label: 'Design Awards' },
    { value: 98, suffix: '%', label: 'Client Satisfaction' },
];

export default function About() {
    const sectionRef = useRef<HTMLElement>(null);
    const statsRef = useRef<HTMLDivElement>(null);
    const [counters, setCounters] = useState(stats.map(() => 0));

    useEffect(() => {
        const prefersReducedMotion = window.matchMedia(
            '(prefers-reduced-motion: reduce)'
        ).matches;

        gsap.registerPlugin(ScrollTrigger);

        const ctx = gsap.context(() => {
            // Counter animation
            if (!prefersReducedMotion) {
                ScrollTrigger.create({
                    trigger: statsRef.current,
                    start: 'top 80%',
                    onEnter: () => {
                        stats.forEach((stat, index) => {
                            gsap.to(
                                { value: 0 },
                                {
                                    value: stat.value,
                                    duration: 2,
                                    ease: 'power2.out',
                                    onUpdate: function () {
                                        setCounters((prev) => {
                                            const newCounters = [...prev];
                                            newCounters[index] = Math.round(this.targets()[0].value);
                                            return newCounters;
                                        });
                                    },
                                }
                            );
                        });
                    },
                    once: true,
                });
            } else {
                setCounters(stats.map((s) => s.value));
            }
        }, sectionRef);

        return () => ctx.revert();
    }, []);

    return (
        <section ref={sectionRef} className={styles.about} id="about">
            <div className={styles.container}>
                {/* Content */}
                <div className={styles.content}>
                    <span className={styles.label}>About Us</span>
                    <h2 className={styles.heading}>
                        Crafting Spaces That
                        <br />
                        <span className={styles.accent}>Inspire Living</span>
                    </h2>
                    <p className={styles.description}>
                        Founded in 1999, Aura Space has established itself as a premier
                        architectural firm specializing in luxury residential and commercial
                        design. Our multidisciplinary team of architects, designers, and
                        craftsmen work collaboratively to create spaces that transcend the
                        ordinary.
                    </p>
                    <p className={styles.description}>
                        We believe that great architecture is not just about structures—it&apos;s
                        about creating environments that enhance the human experience. Every
                        project we undertake is a journey of discovery, where we listen,
                        learn, and ultimately design spaces that tell our clients&apos; unique
                        stories.
                    </p>
                </div>

                {/* Stats */}
                <div ref={statsRef} className={styles.stats}>
                    {stats.map((stat, index) => (
                        <div key={stat.label} className={styles.stat}>
                            <span className={styles.statValue}>
                                {counters[index]}
                                {stat.suffix}
                            </span>
                            <span className={styles.statLabel}>{stat.label}</span>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
