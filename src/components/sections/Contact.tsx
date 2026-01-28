'use client';

import { useRef, useState } from 'react';
import styles from './Contact.module.css';

interface FormData {
    name: string;
    email: string;
    message: string;
}

interface FormErrors {
    name?: string;
    email?: string;
    message?: string;
}

export default function Contact() {
    const formRef = useRef<HTMLFormElement>(null);
    const [formData, setFormData] = useState<FormData>({
        name: '',
        email: '',
        message: '',
    });
    const [errors, setErrors] = useState<FormErrors>({});
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isSuccess, setIsSuccess] = useState(false);

    const validateForm = (): boolean => {
        const newErrors: FormErrors = {};

        if (!formData.name.trim()) {
            newErrors.name = 'Name is required';
        }

        if (!formData.email.trim()) {
            newErrors.email = 'Email is required';
        } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
            newErrors.email = 'Please enter a valid email';
        }

        if (!formData.message.trim()) {
            newErrors.message = 'Message is required';
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!validateForm()) return;

        setIsSubmitting(true);

        // Simulate form submission
        await new Promise((resolve) => setTimeout(resolve, 1500));

        setIsSubmitting(false);
        setIsSuccess(true);
        setFormData({ name: '', email: '', message: '' });

        // Reset success message after 5 seconds
        setTimeout(() => setIsSuccess(false), 5000);
    };

    const handleChange = (
        e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
    ) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
        // Clear error when user starts typing
        if (errors[name as keyof FormErrors]) {
            setErrors((prev) => ({ ...prev, [name]: undefined }));
        }
    };

    return (
        <section className={styles.contact} id="contact">
            <div className={styles.container}>
                {/* Header */}
                <div className={styles.header}>
                    <span className={styles.label}>Contact</span>
                    <h2 className={styles.heading}>
                        Let&apos;s Create Something
                        <br />
                        <span className={styles.accent}>Timeless</span>
                    </h2>
                    <p className={styles.description}>
                        Ready to bring your architectural vision to life? We&apos;d love to hear
                        about your project.
                    </p>
                </div>

                {/* Form */}
                <form
                    ref={formRef}
                    className={styles.form}
                    onSubmit={handleSubmit}
                    noValidate
                >
                    {/* Success Message */}
                    {isSuccess && (
                        <div className={styles.success} role="status" aria-live="polite">
                            ✓ Thank you for your message. We&apos;ll be in touch soon.
                        </div>
                    )}

                    {/* Name Field */}
                    <div className={styles.field}>
                        <label htmlFor="contact-name" className={styles.label}>
                            Name *
                        </label>
                        <input
                            type="text"
                            id="contact-name"
                            name="name"
                            value={formData.name}
                            onChange={handleChange}
                            className={`${styles.input} ${errors.name ? styles.inputError : ''}`}
                            placeholder="Your name"
                            aria-required="true"
                            aria-describedby={errors.name ? 'name-error' : undefined}
                        />
                        {errors.name && (
                            <span id="name-error" className={styles.error} role="alert">
                                {errors.name}
                            </span>
                        )}
                    </div>

                    {/* Email Field */}
                    <div className={styles.field}>
                        <label htmlFor="contact-email" className={styles.label}>
                            Email *
                        </label>
                        <input
                            type="email"
                            id="contact-email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            className={`${styles.input} ${errors.email ? styles.inputError : ''}`}
                            placeholder="your@email.com"
                            aria-required="true"
                            aria-describedby={errors.email ? 'email-error' : undefined}
                        />
                        {errors.email && (
                            <span id="email-error" className={styles.error} role="alert">
                                {errors.email}
                            </span>
                        )}
                    </div>

                    {/* Message Field */}
                    <div className={styles.field}>
                        <label htmlFor="contact-message" className={styles.label}>
                            Message *
                        </label>
                        <textarea
                            id="contact-message"
                            name="message"
                            value={formData.message}
                            onChange={handleChange}
                            className={`${styles.textarea} ${errors.message ? styles.inputError : ''}`}
                            placeholder="Tell us about your project..."
                            rows={5}
                            aria-required="true"
                            aria-describedby={errors.message ? 'message-error' : undefined}
                        />
                        {errors.message && (
                            <span id="message-error" className={styles.error} role="alert">
                                {errors.message}
                            </span>
                        )}
                    </div>

                    {/* Submit Button */}
                    <button
                        type="submit"
                        className={styles.button}
                        disabled={isSubmitting}
                    >
                        {isSubmitting ? 'Sending...' : 'Send Message'}
                    </button>
                </form>
            </div>
        </section>
    );
}
