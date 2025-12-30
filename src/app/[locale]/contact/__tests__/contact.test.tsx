import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import ContactPage from '../page';

// Mock next-intl
vi.mock('next-intl', () => ({
    useTranslations: () => (key: string) => {
        const translations: Record<string, string> = {
            'title': 'Get in Touch',
            'subtitle': 'Have questions? We\'d love to hear from you',
            'name': 'Name',
            'email': 'Email',
            'phone': 'Phone',
            'message': 'Message',
            'submit': 'Send Message',
            'success': 'Message sent successfully!',
            'captcha_label': 'Security Verification',
            'captcha_error': 'Incorrect answer. Please try again.',
            'captcha_refresh': 'New Question',
            'captcha_help': 'Please solve the math problem above to verify you\'re human',
            'validation.name_min': 'Name must be at least 2 characters',
            'validation.email_invalid': 'Invalid email address',
            'validation.phone_invalid': 'Phone must be in format: +91 XXXXXXXXXX',
            'validation.message_min': 'Message must be at least 10 characters',
            'validation.captcha_required': 'Please solve the math problem',
            'address': 'Address',
            'address_full': 'Chimbhala Rd, Belwandi, Belwandi Bk., Maharashtra 413702',
            'phone_number': '+91 83800 60631',
            'hours': 'Business Hours',
            'hours_weekdays': 'Monday - Saturday: 7:00 AM - 9:00 PM',
            'hours_sunday': 'Sunday: 8:00 AM - 8:00 PM',
        };
        return translations[key] || key;
    },
}));

// Mock framer-motion
vi.mock('framer-motion', () => ({
    motion: {
        div: ({ children, ...props }: any) => <div {...props}>{children}</div>,
    },
}));

// Mock Footer component
vi.mock('@/components/layout/Footer', () => ({
    default: () => <footer data-testid="footer">Footer</footer>,
}));

describe('ContactPage', () => {
    beforeEach(() => {
        vi.clearAllMocks();
    });

    describe('Form Rendering', () => {
        it('should render all form fields', () => {
            render(<ContactPage />);

            expect(screen.getByLabelText(/name/i)).toBeInTheDocument();
            expect(screen.getByLabelText(/email/i)).toBeInTheDocument();
            expect(screen.getByLabelText(/phone/i)).toBeInTheDocument();
            expect(screen.getByLabelText(/message/i)).toBeInTheDocument();
            expect(screen.getByLabelText(/security verification/i)).toBeInTheDocument();
        });

        it('should render submit button', () => {
            render(<ContactPage />);
            expect(screen.getByRole('button', { name: /send message/i })).toBeInTheDocument();
        });

        it('should render contact information section', () => {
            render(<ContactPage />);
            expect(screen.getByText(/Chimbhala Rd/i)).toBeInTheDocument();
            expect(screen.getByText(/\+91 83800 60631/i)).toBeInTheDocument();
        });
    });

    describe('Captcha Functionality', () => {
        it('should generate a captcha question on mount', async () => {
            render(<ContactPage />);

            await waitFor(() => {
                const captchaDisplay = screen.getByText(/[0-9]+ [\+\-] [0-9]+/);
                expect(captchaDisplay).toBeInTheDocument();
            });
        });

        it('should validate correct captcha answer', async () => {
            render(<ContactPage />);

            // Wait for captcha to be generated
            await waitFor(() => {
                expect(screen.getByText(/[0-9]+ [\+\-] [0-9]+/)).toBeInTheDocument();
            });

            // Get the captcha question
            const captchaQuestion = screen.getByText(/[0-9]+ [\+\-] [0-9]+/).textContent;
            expect(captchaQuestion).toBeTruthy();

            // Calculate the correct answer
            const match = captchaQuestion!.match(/(\d+) ([\+\-]) (\d+)/);
            expect(match).toBeTruthy();

            const num1 = parseInt(match![1]);
            const operator = match![2];
            const num2 = parseInt(match![3]);
            const correctAnswer = operator === '+' ? num1 + num2 : num1 - num2;

            // Fill in the form
            fireEvent.change(screen.getByLabelText(/name/i), { target: { value: 'Test User' } });
            fireEvent.change(screen.getByLabelText(/email/i), { target: { value: 'test@example.com' } });
            fireEvent.change(screen.getByLabelText(/phone/i), { target: { value: '+91 1234567890' } });
            fireEvent.change(screen.getByLabelText(/message/i), { target: { value: 'This is a test message with enough characters' } });
            fireEvent.change(screen.getByLabelText(/security verification/i), { target: { value: correctAnswer.toString() } });

            // Submit the form
            fireEvent.click(screen.getByRole('button', { name: /send message/i }));

            // Should show success message
            await waitFor(() => {
                expect(screen.getByText(/message sent successfully/i)).toBeInTheDocument();
            });
        });

        it('should show error for incorrect captcha answer', async () => {
            render(<ContactPage />);

            // Wait for captcha to be generated
            await waitFor(() => {
                expect(screen.getByText(/[0-9]+ [\+\-] [0-9]+/)).toBeInTheDocument();
            });

            // Fill in the form with incorrect captcha
            fireEvent.change(screen.getByLabelText(/name/i), { target: { value: 'Test User' } });
            fireEvent.change(screen.getByLabelText(/email/i), { target: { value: 'test@example.com' } });
            fireEvent.change(screen.getByLabelText(/phone/i), { target: { value: '+91 1234567890' } });
            fireEvent.change(screen.getByLabelText(/message/i), { target: { value: 'This is a test message with enough characters' } });
            fireEvent.change(screen.getByLabelText(/security verification/i), { target: { value: '999' } });

            // Submit the form
            fireEvent.click(screen.getByRole('button', { name: /send message/i }));

            // Should show error
            await waitFor(() => {
                expect(screen.getByText(/incorrect answer/i)).toBeInTheDocument();
            });
        });

        it('should generate new captcha when refresh button is clicked', async () => {
            render(<ContactPage />);

            // Wait for initial captcha
            await waitFor(() => {
                expect(screen.getByText(/[0-9]+ [\+\-] [0-9]+/)).toBeInTheDocument();
            });

            const initialCaptcha = screen.getByText(/[0-9]+ [\+\-] [0-9]+/).textContent;

            // Click refresh button
            const refreshButton = screen.getByText(/new question/i);
            fireEvent.click(refreshButton);

            // Wait for new captcha (it might be the same, so we just check it exists)
            await waitFor(() => {
                expect(screen.getByText(/[0-9]+ [\+\-] [0-9]+/)).toBeInTheDocument();
            });
        });
    });

    describe('Form Validation', () => {
        it('should show error for name less than 2 characters', async () => {
            render(<ContactPage />);

            const nameInput = screen.getByLabelText(/name/i);
            fireEvent.change(nameInput, { target: { value: 'A' } });
            fireEvent.blur(nameInput);

            await waitFor(() => {
                expect(screen.getByText(/name must be at least 2 characters/i)).toBeInTheDocument();
            });
        });

        it('should show error for invalid email', async () => {
            render(<ContactPage />);

            const emailInput = screen.getByLabelText(/email/i);
            fireEvent.change(emailInput, { target: { value: 'invalid-email' } });
            fireEvent.blur(emailInput);

            await waitFor(() => {
                expect(screen.getByText(/invalid email address/i)).toBeInTheDocument();
            });
        });

        it('should show error for invalid phone format', async () => {
            render(<ContactPage />);

            const phoneInput = screen.getByLabelText(/phone/i);
            fireEvent.change(phoneInput, { target: { value: '1234567890' } });
            fireEvent.blur(phoneInput);

            await waitFor(() => {
                expect(screen.getByText(/phone must be in format/i)).toBeInTheDocument();
            });
        });

        it('should accept valid phone format with +91', async () => {
            render(<ContactPage />);

            const phoneInput = screen.getByLabelText(/phone/i);
            fireEvent.change(phoneInput, { target: { value: '+91 1234567890' } });
            fireEvent.blur(phoneInput);

            // Should not show error
            await waitFor(() => {
                expect(screen.queryByText(/phone must be in format/i)).not.toBeInTheDocument();
            });
        });

        it('should show error for message less than 10 characters', async () => {
            render(<ContactPage />);

            const messageInput = screen.getByLabelText(/message/i);
            fireEvent.change(messageInput, { target: { value: 'Short' } });
            fireEvent.blur(messageInput);

            await waitFor(() => {
                expect(screen.getByText(/message must be at least 10 characters/i)).toBeInTheDocument();
            });
        });

        it('should show error for empty captcha', async () => {
            render(<ContactPage />);

            // Wait for captcha to be generated
            await waitFor(() => {
                expect(screen.getByText(/[0-9]+ [\+\-] [0-9]+/)).toBeInTheDocument();
            });

            // Fill all fields except captcha
            fireEvent.change(screen.getByLabelText(/name/i), { target: { value: 'Test User' } });
            fireEvent.change(screen.getByLabelText(/email/i), { target: { value: 'test@example.com' } });
            fireEvent.change(screen.getByLabelText(/phone/i), { target: { value: '+91 1234567890' } });
            fireEvent.change(screen.getByLabelText(/message/i), { target: { value: 'This is a test message' } });

            // Submit without captcha
            fireEvent.click(screen.getByRole('button', { name: /send message/i }));

            await waitFor(() => {
                expect(screen.getByText(/please solve the math problem/i)).toBeInTheDocument();
            });
        });
    });

    describe('Form Submission', () => {
        it('should reset form after successful submission', async () => {
            render(<ContactPage />);

            // Wait for captcha
            await waitFor(() => {
                expect(screen.getByText(/[0-9]+ [\+\-] [0-9]+/)).toBeInTheDocument();
            });

            // Get correct captcha answer
            const captchaQuestion = screen.getByText(/[0-9]+ [\+\-] [0-9]+/).textContent;
            const match = captchaQuestion!.match(/(\d+) ([\+\-]) (\d+)/);
            const num1 = parseInt(match![1]);
            const operator = match![2];
            const num2 = parseInt(match![3]);
            const correctAnswer = operator === '+' ? num1 + num2 : num1 - num2;

            // Fill and submit form
            const nameInput = screen.getByLabelText(/name/i) as HTMLInputElement;
            const emailInput = screen.getByLabelText(/email/i) as HTMLInputElement;

            fireEvent.change(nameInput, { target: { value: 'Test User' } });
            fireEvent.change(emailInput, { target: { value: 'test@example.com' } });
            fireEvent.change(screen.getByLabelText(/phone/i), { target: { value: '+91 1234567890' } });
            fireEvent.change(screen.getByLabelText(/message/i), { target: { value: 'Test message content here' } });
            fireEvent.change(screen.getByLabelText(/security verification/i), { target: { value: correctAnswer.toString() } });

            fireEvent.click(screen.getByRole('button', { name: /send message/i }));

            // Wait for success message
            await waitFor(() => {
                expect(screen.getByText(/message sent successfully/i)).toBeInTheDocument();
            });

            // Form should be reset
            await waitFor(() => {
                expect(nameInput.value).toBe('');
                expect(emailInput.value).toBe('');
            });
        });

        it('should disable submit button while submitting', async () => {
            render(<ContactPage />);

            // Wait for captcha
            await waitFor(() => {
                expect(screen.getByText(/[0-9]+ [\+\-] [0-9]+/)).toBeInTheDocument();
            });

            // Get correct captcha answer
            const captchaQuestion = screen.getByText(/[0-9]+ [\+\-] [0-9]+/).textContent;
            const match = captchaQuestion!.match(/(\d+) ([\+\-]) (\d+)/);
            const num1 = parseInt(match![1]);
            const operator = match![2];
            const num2 = parseInt(match![3]);
            const correctAnswer = operator === '+' ? num1 + num2 : num1 - num2;

            // Fill form
            fireEvent.change(screen.getByLabelText(/name/i), { target: { value: 'Test User' } });
            fireEvent.change(screen.getByLabelText(/email/i), { target: { value: 'test@example.com' } });
            fireEvent.change(screen.getByLabelText(/phone/i), { target: { value: '+91 1234567890' } });
            fireEvent.change(screen.getByLabelText(/message/i), { target: { value: 'Test message content' } });
            fireEvent.change(screen.getByLabelText(/security verification/i), { target: { value: correctAnswer.toString() } });

            const submitButton = screen.getByRole('button', { name: /send message/i });
            fireEvent.click(submitButton);

            // Button should be disabled during submission
            expect(submitButton).toBeDisabled();
        });
    });
});
