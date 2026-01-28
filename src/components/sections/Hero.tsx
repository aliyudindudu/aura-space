'use client';

import { useRef, useEffect } from 'react';
import { gsap } from 'gsap';
import styles from './Hero.module.css';

export default function Hero() {
    const heroRef = useRef<HTMLElement>(null);
    const titleRef = useRef<HTMLHeadingElement>(null);
    const lineRef = useRef<HTMLDivElement>(null);
    const taglineRef = useRef<HTMLParagraphElement>(null);
    const scrollIndicatorRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        // Check for reduced motion preference
        const prefersReducedMotion = window.matchMedia(
            '(prefers-reduced-motion: reduce)'
        ).matches;

        if (prefersReducedMotion) {
            // Show everything immediately without animation
            return;
        }

        const ctx = gsap.context(() => {
            const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });

            // Initial state - hide everything
            gsap.set([titleRef.current, lineRef.current, taglineRef.current, scrollIndicatorRef.current], {
                opacity: 0,
            });

            // Animation sequence
            tl.to(titleRef.current, {
                opacity: 1,
                y: 0,
                duration: 1.2,
                delay: 0.3,
            })
                .to(
                    lineRef.current,
                    {
                        opacity: 1,
                        width: '120px',
                        duration: 0.8,
                    },
                    '-=0.4'
                )
                .to(
                    taglineRef.current,
                    {
                        opacity: 1,
                        y: 0,
                        duration: 0.8,
                    },
                    '-=0.3'
                )
                .to(
                    scrollIndicatorRef.current,
                    {
                        opacity: 1,
                        duration: 0.6,
                    },
                    '-=0.2'
                );
        }, heroRef);

        return () => ctx.revert();
    }, []);

    return (
        <section ref={heroRef} className={styles.hero} id="hero">
            {/* Skip to content link for accessibility */}
            <a href="#work" className="sr-only">
                Skip to main content
            </a>

            <div className={styles.content}>
                {/* Main Title */}
                <h1 ref={titleRef} className={styles.title}>
                    <span className={styles.titleLine}>AURA</span>
                    <span className={styles.titleLine}>SPACE</span>
                </h1>

                {/* Gold Accent Line */}
                <div ref={lineRef} className={styles.accentLine} aria-hidden="true" />

                {/* Tagline */}
                <p ref={taglineRef} className={styles.tagline}>
                    Where Architecture Meets
                    <br />
                    Timeless Elegance
                </p>

                {/* Scroll Indicator */}
                <div ref={scrollIndicatorRef} className={styles.scrollIndicator}>
                    <span className={styles.scrollText}>Scroll</span>
                    <div className={styles.scrollArrow} aria-hidden="true">
                        <svg
                            width="24"
                            height="24"
                            viewBox="0 0 24 24"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                        >
                            <path
                                d="M12 5V19M12 19L5 12M12 19L19 12"
                                stroke="currentColor"
                                strokeWidth="1.5"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                            />
                        </svg>
                    </div>
                </div>
            </div>
        </section>
    );
}
