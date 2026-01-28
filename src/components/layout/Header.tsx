'use client';

import { useEffect, useState } from 'react';
import styles from './Header.module.css';

export default function Header() {
    const [isScrolled, setIsScrolled] = useState(false);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 50);
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const toggleMobileMenu = () => {
        setIsMobileMenuOpen(!isMobileMenuOpen);
    };

    return (
        <header className={`${styles.header} ${isScrolled ? styles.scrolled : ''}`}>
            <div className={styles.container}>
                {/* Logo */}
                <a href="#" className={styles.logo}>
                    <span className={styles.logoText}>AURA</span>
                    <span className={styles.logoAccent}>SPACE</span>
                </a>

                {/* Desktop Navigation */}
                <nav className={styles.nav} aria-label="Main navigation">
                    <ul className={styles.navList}>
                        <li><a href="#work" className={styles.navLink}>Work</a></li>
                        <li><a href="#philosophy" className={styles.navLink}>Philosophy</a></li>
                        <li><a href="#about" className={styles.navLink}>About</a></li>
                        <li><a href="#contact" className={styles.navLink}>Contact</a></li>
                    </ul>
                </nav>

                {/* Mobile Menu Button */}
                <button
                    className={styles.menuButton}
                    onClick={toggleMobileMenu}
                    aria-expanded={isMobileMenuOpen}
                    aria-label="Toggle menu"
                >
                    <span className={`${styles.menuLine} ${isMobileMenuOpen ? styles.open : ''}`} />
                    <span className={`${styles.menuLine} ${isMobileMenuOpen ? styles.open : ''}`} />
                </button>
            </div>

            {/* Mobile Navigation */}
            <nav
                className={`${styles.mobileNav} ${isMobileMenuOpen ? styles.mobileNavOpen : ''}`}
                aria-label="Mobile navigation"
            >
                <ul className={styles.mobileNavList}>
                    <li><a href="#work" className={styles.mobileNavLink} onClick={() => setIsMobileMenuOpen(false)}>Work</a></li>
                    <li><a href="#philosophy" className={styles.mobileNavLink} onClick={() => setIsMobileMenuOpen(false)}>Philosophy</a></li>
                    <li><a href="#about" className={styles.mobileNavLink} onClick={() => setIsMobileMenuOpen(false)}>About</a></li>
                    <li><a href="#contact" className={styles.mobileNavLink} onClick={() => setIsMobileMenuOpen(false)}>Contact</a></li>
                </ul>
            </nav>
        </header>
    );
}
