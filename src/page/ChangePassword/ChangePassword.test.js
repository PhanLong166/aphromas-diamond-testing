import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import ChangePassword from './ChangePassword';

describe('ChangePassword Component', () => {
  test('renders change password form', () => {
    render(<ChangePassword onChangePassword={jest.fn()} />);
    expect(screen.getByPlaceholderText(/enter current password/i)).toBeInTheDocument();
    expect(screen.getByPlaceholderText(/enter new password/i)).toBeInTheDocument();
    expect(screen.getByPlaceholderText(/confirm new password/i)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /change password/i })).toBeInTheDocument();
  });

  test('allows the user to enter current password, new password, and confirm new password', () => {
    render(<ChangePassword onChangePassword={jest.fn()} />);

    fireEvent.change(screen.getByPlaceholderText(/enter current password/i), {
      target: { value: 'currentpassword123' },
    });
    fireEvent.change(screen.getByPlaceholderText(/enter new password/i), {
      target: { value: 'newpassword123' },
    });
    fireEvent.change(screen.getByPlaceholderText(/confirm new password/i), {
      target: { value: 'newpassword123' },
    });

    expect(screen.getByPlaceholderText(/enter current password/i).value).toBe('currentpassword123');
    expect(screen.getByPlaceholderText(/enter new password/i).value).toBe('newpassword123');
    expect(screen.getByPlaceholderText(/confirm new password/i).value).toBe('newpassword123');
  });

  test('submits the form with current password and new password', () => {
    const mockOnChangePassword = jest.fn();
    render(<ChangePassword onChangePassword={mockOnChangePassword} />);

    fireEvent.change(screen.getByPlaceholderText(/enter current password/i), {
      target: { value: 'currentpassword123' },
    });
    fireEvent.change(screen.getByPlaceholderText(/enter new password/i), {
      target: { value: 'newpassword123' },
    });
    fireEvent.change(screen.getByPlaceholderText(/confirm new password/i), {
      target: { value: 'newpassword123' },
    });

    fireEvent.click(screen.getByRole('button', { name: /change password/i }));

    expect(mockOnChangePassword).toHaveBeenCalledWith({
      currentPassword: 'currentpassword123',
      newPassword: 'newpassword123',
    });
  });

  test('shows alert if new passwords do not match', () => {
    render(<ChangePassword onChangePassword={jest.fn()} />);

    fireEvent.change(screen.getByPlaceholderText(/enter current password/i), {
      target: { value: 'currentpassword123' },
    });
    fireEvent.change(screen.getByPlaceholderText(/enter new password/i), {
      target: { value: 'newpassword123' },
    });
    fireEvent.change(screen.getByPlaceholderText(/confirm new password/i), {
      target: { value: 'differentpassword123' },
    });

    jest.spyOn(window, 'alert').mockImplementation(() => {});

    fireEvent.click(screen.getByRole('button', { name: /change password/i }));

    expect(window.alert).toHaveBeenCalledWith('New passwords do not match');
  });
});
