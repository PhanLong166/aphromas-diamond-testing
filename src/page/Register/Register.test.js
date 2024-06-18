import React from 'react';
import { render, screen, fireEvent, cleanup } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import Register from './Register';

describe('Register Component', () => {
  afterEach(cleanup);

  test('renders register form', () => {
    render(<Register onRegister={jest.fn()} />);
    expect(screen.getByLabelText(/email/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/name/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/phone number/i)).toBeInTheDocument();
    expect(screen.getAllByLabelText(/password/i).length).toBe(2);
    expect(screen.getByLabelText(/confirm password/i)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /register/i })).toBeInTheDocument();
  });

  test('allows the user to enter details', () => {
    render(<Register onRegister={jest.fn()} />);

    fireEvent.change(screen.getByLabelText(/email/i), {
      target: { value: 'test@example.com' },
    });
    fireEvent.change(screen.getByLabelText(/name/i), {
      target: { value: 'John Doe' },
    });
    fireEvent.change(screen.getByLabelText(/phone number/i), {
      target: { value: '1234567890' },
    });
    fireEvent.change(screen.getAllByLabelText(/password/i)[0], {
      target: { value: 'password123' },
    });
    fireEvent.change(screen.getByLabelText(/confirm password/i), {
      target: { value: 'password123' },
    });

    expect(screen.getByLabelText(/email/i).value).toBe('test@example.com');
    expect(screen.getByLabelText(/name/i).value).toBe('John Doe');
    expect(screen.getByLabelText(/phone number/i).value).toBe('1234567890');
    expect(screen.getAllByLabelText(/password/i)[0].value).toBe('password123');
    expect(screen.getByLabelText(/confirm password/i).value).toBe('password123');
  });

  test('submits the form with details', () => {
    const mockOnRegister = jest.fn();
    render(<Register onRegister={mockOnRegister} />);

    fireEvent.change(screen.getByLabelText(/email/i), {
      target: { value: 'test@example.com' },
    });
    fireEvent.change(screen.getByLabelText(/name/i), {
      target: { value: 'John Doe' },
    });
    fireEvent.change(screen.getByLabelText(/phone number/i), {
      target: { value: '1234567890' },
    });
    fireEvent.change(screen.getAllByLabelText(/password/i)[0], {
      target: { value: 'password123' },
    });
    fireEvent.change(screen.getByLabelText(/confirm password/i), {
      target: { value: 'password123' },
    });

    fireEvent.click(screen.getByRole('button', { name: /register/i }));

    expect(mockOnRegister).toHaveBeenCalledWith({
      email: 'test@example.com',
      name: 'John Doe',
      phoneNumber: '1234567890',
      password: 'password123',
    });

    expect(screen.getByLabelText(/email/i).value).toBe('');
    expect(screen.getByLabelText(/name/i).value).toBe('');
    expect(screen.getByLabelText(/phone number/i).value).toBe('');
    expect(screen.getAllByLabelText(/password/i)[0].value).toBe('');
    expect(screen.getByLabelText(/confirm password/i).value).toBe('');
  });

  test('shows error if passwords do not match', () => {
    const mockOnRegister = jest.fn();
    render(<Register onRegister={mockOnRegister} />);

    fireEvent.change(screen.getByLabelText(/email/i), {
      target: { value: 'test@example.com' },
    });
    fireEvent.change(screen.getByLabelText(/name/i), {
      target: { value: 'John Doe' },
    });
    fireEvent.change(screen.getByLabelText(/phone number/i), {
      target: { value: '1234567890' },
    });
    fireEvent.change(screen.getAllByLabelText(/password/i)[0], {
      target: { value: 'password123' },
    });
    fireEvent.change(screen.getByLabelText(/confirm password/i), {
      target: { value: 'differentpassword' },
    });

    fireEvent.click(screen.getByRole('button', { name: /register/i }));

    expect(mockOnRegister).not.toHaveBeenCalled();
    expect(screen.getByText(/passwords do not match/i)).toBeInTheDocument();
  });
});
