import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { NextRequest } from 'next/server';

// Mock Resend before importing the route
const mockSend = vi.fn();

vi.mock('resend', () => ({
  Resend: class MockResend {
    emails = {
      send: mockSend,
    };
  },
}));

// Import route after mocking
const { POST } = await import('../route');

describe('Contact API Route', () => {
  beforeEach(() => {
    // Reset mocks before each test
    vi.clearAllMocks();
    mockSend.mockReset();
    
    // Setup environment variables
    process.env.RESEND_API_KEY = 'test_api_key';
    process.env.CONTACT_EMAIL = 'test@example.com';
  });

  afterEach(() => {
    vi.clearAllMocks();
  });

  describe('POST /api/contact', () => {
    it('should successfully send email with valid data', async () => {
      // Arrange
      const validData = {
        name: 'John Doe',
        email: 'john@example.com',
        phone: '+91 9876543210',
        message: 'This is a test message',
      };

      mockSend.mockResolvedValue({
        id: 'email-id-123',
        from: 'Gurudev Bakery <onboarding@resend.dev>',
        to: ['test@example.com'],
        created_at: new Date().toISOString(),
      });

      const request = new NextRequest('http://localhost:3000/api/contact', {
        method: 'POST',
        body: JSON.stringify(validData),
        headers: {
          'Content-Type': 'application/json',
        },
      });

      // Act
      const response = await POST(request);
      const data = await response.json();

      // Assert
      expect(response.status).toBe(200);
      expect(data.success).toBe(true);
      expect(data.data).toBeDefined();
      expect(mockSend).toHaveBeenCalledTimes(1);
      expect(mockSend).toHaveBeenCalledWith(
        expect.objectContaining({
          from: 'Gurudev Bakery <onboarding@resend.dev>',
          to: ['test@example.com'],
          replyTo: 'john@example.com',
          subject: 'New Contact Form Submission from John Doe',
        })
      );
    });

    it('should return 400 when name is missing', async () => {
      // Arrange
      const invalidData = {
        email: 'john@example.com',
        phone: '+91 9876543210',
        message: 'Test message',
      };

      const request = new NextRequest('http://localhost:3000/api/contact', {
        method: 'POST',
        body: JSON.stringify(invalidData),
        headers: {
          'Content-Type': 'application/json',
        },
      });

      // Act
      const response = await POST(request);
      const data = await response.json();

      // Assert
      expect(response.status).toBe(400);
      expect(data.error).toBe('Missing required fields');
      expect(mockSend).not.toHaveBeenCalled();
    });

    it('should return 400 when email is missing', async () => {
      // Arrange
      const invalidData = {
        name: 'John Doe',
        phone: '+91 9876543210',
        message: 'Test message',
      };

      const request = new NextRequest('http://localhost:3000/api/contact', {
        method: 'POST',
        body: JSON.stringify(invalidData),
        headers: {
          'Content-Type': 'application/json',
        },
      });

      // Act
      const response = await POST(request);
      const data = await response.json();

      // Assert
      expect(response.status).toBe(400);
      expect(data.error).toBe('Missing required fields');
      expect(mockSend).not.toHaveBeenCalled();
    });

    it('should return 400 when phone is missing', async () => {
      // Arrange
      const invalidData = {
        name: 'John Doe',
        email: 'john@example.com',
        message: 'Test message',
      };

      const request = new NextRequest('http://localhost:3000/api/contact', {
        method: 'POST',
        body: JSON.stringify(invalidData),
        headers: {
          'Content-Type': 'application/json',
        },
      });

      // Act
      const response = await POST(request);
      const data = await response.json();

      // Assert
      expect(response.status).toBe(400);
      expect(data.error).toBe('Missing required fields');
      expect(mockSend).not.toHaveBeenCalled();
    });

    it('should return 400 when message is missing', async () => {
      // Arrange
      const invalidData = {
        name: 'John Doe',
        email: 'john@example.com',
        phone: '+91 9876543210',
      };

      const request = new NextRequest('http://localhost:3000/api/contact', {
        method: 'POST',
        body: JSON.stringify(invalidData),
        headers: {
          'Content-Type': 'application/json',
        },
      });

      // Act
      const response = await POST(request);
      const data = await response.json();

      // Assert
      expect(response.status).toBe(400);
      expect(data.error).toBe('Missing required fields');
      expect(mockSend).not.toHaveBeenCalled();
    });

    it('should return 400 when all fields are missing', async () => {
      // Arrange
      const invalidData = {};

      const request = new NextRequest('http://localhost:3000/api/contact', {
        method: 'POST',
        body: JSON.stringify(invalidData),
        headers: {
          'Content-Type': 'application/json',
        },
      });

      // Act
      const response = await POST(request);
      const data = await response.json();

      // Assert
      expect(response.status).toBe(400);
      expect(data.error).toBe('Missing required fields');
      expect(mockSend).not.toHaveBeenCalled();
    });

    it('should handle Resend API error gracefully', async () => {
      // Arrange
      const validData = {
        name: 'John Doe',
        email: 'john@example.com',
        phone: '+91 9876543210',
        message: 'Test message',
      };

      mockSend.mockRejectedValue(new Error('Resend API Error'));

      const request = new NextRequest('http://localhost:3000/api/contact', {
        method: 'POST',
        body: JSON.stringify(validData),
        headers: {
          'Content-Type': 'application/json',
        },
      });

      // Act
      const response = await POST(request);
      const data = await response.json();

      // Assert
      expect(response.status).toBe(500);
      expect(data.error).toBe('Failed to send email');
      expect(data.details).toBe('Resend API Error');
      expect(mockSend).toHaveBeenCalledTimes(1);
    });

    it('should include HTML email template with proper formatting', async () => {
      // Arrange
      const validData = {
        name: 'Jane Smith',
        email: 'jane@example.com',
        phone: '+91 9876543210',
        message: 'I would like to order a cake',
      };

      mockSend.mockResolvedValue({
        id: 'email-id-456',
      });

      const request = new NextRequest('http://localhost:3000/api/contact', {
        method: 'POST',
        body: JSON.stringify(validData),
        headers: {
          'Content-Type': 'application/json',
        },
      });

      // Act
      await POST(request);

      // Assert
      expect(mockSend).toHaveBeenCalledWith(
        expect.objectContaining({
          html: expect.stringContaining('Jane Smith'),
        })
      );
      expect(mockSend).toHaveBeenCalledWith(
        expect.objectContaining({
          html: expect.stringContaining('jane@example.com'),
        })
      );
      expect(mockSend).toHaveBeenCalledWith(
        expect.objectContaining({
          html: expect.stringContaining('+91 9876543210'),
        })
      );
      expect(mockSend).toHaveBeenCalledWith(
        expect.objectContaining({
          html: expect.stringContaining('I would like to order a cake'),
        })
      );
      expect(mockSend).toHaveBeenCalledWith(
        expect.objectContaining({
          html: expect.stringContaining('🍰 New Contact Form Submission'),
        })
      );
    });

    it('should handle special characters in message', async () => {
      // Arrange
      const validData = {
        name: 'Test User',
        email: 'test@example.com',
        phone: '+91 9876543210',
        message: 'Special chars: <script>alert("xss")</script> & © ® ™',
      };

      mockSend.mockResolvedValue({ id: 'email-id-789' });

      const request = new NextRequest('http://localhost:3000/api/contact', {
        method: 'POST',
        body: JSON.stringify(validData),
        headers: {
          'Content-Type': 'application/json',
        },
      });

      // Act
      const response = await POST(request);

      // Assert
      expect(response.status).toBe(200);
      expect(mockSend).toHaveBeenCalledWith(
        expect.objectContaining({
          html: expect.stringContaining(validData.message),
        })
      );
    });

    it('should use default email if CONTACT_EMAIL not set', async () => {
      // Arrange
      delete process.env.CONTACT_EMAIL;

      const validData = {
        name: 'John Doe',
        email: 'john@example.com',
        phone: '+91 9876543210',
        message: 'Test message',
      };

      mockSend.mockResolvedValue({ id: 'email-id-123' });

      const request = new NextRequest('http://localhost:3000/api/contact', {
        method: 'POST',
        body: JSON.stringify(validData),
        headers: {
          'Content-Type': 'application/json',
        },
      });

      // Act
      await POST(request);

      // Assert
      expect(mockSend).toHaveBeenCalledWith(
        expect.objectContaining({
          to: ['your-email@example.com'],
        })
      );
    });

    it('should set replyTo as customer email', async () => {
      // Arrange
      const validData = {
        name: 'Customer Name',
        email: 'customer@example.com',
        phone: '+91 9876543210',
        message: 'Question about products',
      };

      mockSend.mockResolvedValue({ id: 'email-id-999' });

      const request = new NextRequest('http://localhost:3000/api/contact', {
        method: 'POST',
        body: JSON.stringify(validData),
        headers: {
          'Content-Type': 'application/json',
        },
      });

      // Act
      await POST(request);

      // Assert
      expect(mockSend).toHaveBeenCalledWith(
        expect.objectContaining({
          replyTo: 'customer@example.com',
        })
      );
    });

    it('should handle long messages', async () => {
      // Arrange
      const longMessage = 'A'.repeat(5000); // 5000 character message
      const validData = {
        name: 'John Doe',
        email: 'john@example.com',
        phone: '+91 9876543210',
        message: longMessage,
      };

      mockSend.mockResolvedValue({ id: 'email-id-long' });

      const request = new NextRequest('http://localhost:3000/api/contact', {
        method: 'POST',
        body: JSON.stringify(validData),
        headers: {
          'Content-Type': 'application/json',
        },
      });

      // Act
      const response = await POST(request);

      // Assert
      expect(response.status).toBe(200);
      expect(mockSend).toHaveBeenCalledWith(
        expect.objectContaining({
          html: expect.stringContaining(longMessage),
        })
      );
    });

    it('should handle Unicode characters in name', async () => {
      // Arrange
      const validData = {
        name: 'राज कुमार', // Hindi name
        email: 'raj@example.com',
        phone: '+91 9876543210',
        message: 'मुझे केक चाहिए', // Hindi message
      };

      mockSend.mockResolvedValue({ id: 'email-id-unicode' });

      const request = new NextRequest('http://localhost:3000/api/contact', {
        method: 'POST',
        body: JSON.stringify(validData),
        headers: {
          'Content-Type': 'application/json',
        },
      });

      // Act
      const response = await POST(request);
      const data = await response.json();

      // Assert
      expect(response.status).toBe(200);
      expect(data.success).toBe(true);
      expect(mockSend).toHaveBeenCalledWith(
        expect.objectContaining({
          subject: 'New Contact Form Submission from राज कुमार',
        })
      );
    });
  });
});
