'use client';

import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import styles from './CustomCursor.module.css';

export default function CustomCursor() {
    const cursorRef = useRef<HTMLDivElement>(null);
    const cursorDotRef = useRef<HTMLDivElement>(null);
    const isVisibleRef = useRef(false);

    useEffect(() => {
        // Check if it's a touch device
        const isTouchDevice =
            'ontouchstart' in window || navigator.maxTouchPoints > 0;
        if (isTouchDevice) return;

        // Check for reduced motion preference
        const prefersReducedMotion = window.matchMedia(
            '(prefers-reduced-motion: reduce)'
        ).matches;

        if (prefersReducedMotion) return;

        const cursor = cursorRef.current;
        const cursorDot = cursorDotRef.current;

        if (!cursor || !cursorDot) return;

        // Show cursor immediately
        const showCursor = () => {
            if (!isVisibleRef.current) {
                isVisibleRef.current = true;
                cursor.classList.add(styles.visible);
                cursorDot.classList.add(styles.visible);
            }
        };

        // Hide cursor
        const hideCursor = () => {
            isVisibleRef.current = false;
            cursor.classList.remove(styles.visible);
            cursorDot.classList.remove(styles.visible);
        };

        // Mouse move handler
        const onMouseMove = (e: MouseEvent) => {
            showCursor();

            const { clientX, clientY } = e;

            // Animate outer cursor with slight delay for smooth follow
            gsap.to(cursor, {
                x: clientX,
                y: clientY,
                duration: 0.5,
                ease: 'power3.out',
            });

            // Inner dot follows immediately
            gsap.to(cursorDot, {
                x: clientX,
                y: clientY,
                duration: 0.1,
                ease: 'power2.out',
            });
        };

        // Mouse enter page
        const onMouseEnter = () => {
            showCursor();
        };

        // Mouse leave page
        const onMouseLeave = () => {
            hideCursor();
        };

        // Handle hover states for interactive elements
        const onElementEnter = () => {
            gsap.to(cursor, {
                scale: 1.5,
                duration: 0.3,
                ease: 'power2.out',
            });
            cursor.classList.add(styles.hovering);
        };

        const onElementLeave = () => {
            gsap.to(cursor, {
                scale: 1,
                duration: 0.3,
                ease: 'power2.out',
            });
            cursor.classList.remove(styles.hovering);
        };

        // Add global event listeners
        document.addEventListener('mousemove', onMouseMove);
        document.addEventListener('mouseenter', onMouseEnter);
        document.addEventListener('mouseleave', onMouseLeave);

        // Add hover listeners to interactive elements
        const interactiveElements = document.querySelectorAll(
            'a, button, [role="button"], input, textarea, select'
        );

        interactiveElements.forEach((el) => {
            el.addEventListener('mouseenter', onElementEnter);
            el.addEventListener('mouseleave', onElementLeave);
        });

        // Show cursor if mouse is already in the window
        showCursor();

        return () => {
            document.removeEventListener('mousemove', onMouseMove);
            document.removeEventListener('mouseenter', onMouseEnter);
            document.removeEventListener('mouseleave', onMouseLeave);

            interactiveElements.forEach((el) => {
                el.removeEventListener('mouseenter', onElementEnter);
                el.removeEventListener('mouseleave', onElementLeave);
            });
        };
    }, []);

    return (
        <>
            {/* Outer circle */}
            <div
                ref={cursorRef}
                className={styles.cursor}
                aria-hidden="true"
            />
            {/* Inner dot */}
            <div
                ref={cursorDotRef}
                className={styles.cursorDot}
                aria-hidden="true"
            />
        </>
    );
}
