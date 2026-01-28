import styles from './Footer.module.css';

const socialLinks = [
    { name: 'Instagram', href: '#' },
    { name: 'LinkedIn', href: '#' },
    { name: 'Pinterest', href: '#' },
];

const navLinks = [
    { name: 'Work', href: '#work' },
    { name: 'Philosophy', href: '#philosophy' },
    { name: 'About', href: '#about' },
    { name: 'Contact', href: '#contact' },
];

export default function Footer() {
    const currentYear = new Date().getFullYear();

    return (
        <footer className={styles.footer}>
            <div className={styles.container}>
                {/* Top Row */}
                <div className={styles.top}>
                    {/* Logo */}
                    <a href="#" className={styles.logo}>
                        <span className={styles.logoText}>AURA</span>
                        <span className={styles.logoAccent}>SPACE</span>
                    </a>

                    {/* Navigation */}
                    <nav className={styles.nav} aria-label="Footer navigation">
                        <ul className={styles.navList}>
                            {navLinks.map((link) => (
                                <li key={link.name}>
                                    <a href={link.href} className={styles.navLink}>
                                        {link.name}
                                    </a>
                                </li>
                            ))}
                        </ul>
                    </nav>

                    {/* Social Links */}
                    <div className={styles.social}>
                        {socialLinks.map((link) => (
                            <a
                                key={link.name}
                                href={link.href}
                                className={styles.socialLink}
                                aria-label={`Follow us on ${link.name}`}
                            >
                                {link.name}
                            </a>
                        ))}
                    </div>
                </div>

                {/* Divider */}
                <div className={styles.divider} aria-hidden="true" />

                {/* Bottom Row */}
                <div className={styles.bottom}>
                    <p className={styles.copyright}>
                        © {currentYear} Aura Space. All rights reserved.
                    </p>
                    <p className={styles.credit}>
                        Crafted with passion for timeless design.
                    </p>
                </div>
            </div>
        </footer>
    );
}
