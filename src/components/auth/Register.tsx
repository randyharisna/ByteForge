'use client';

import { forwardRef, useState } from 'react';
import { Mail, Lock, Eye, EyeOff, UserCircle } from 'lucide-react';
import { ModalWrapper, ModalWrapperHandle } from '../ui/ModalWrapper';

export interface RegisterModalProps {
  isOpen: boolean;
  onClose: () => void;
  switchToLogin: () => void;
}

export const RegisterModal = forwardRef<ModalWrapperHandle, RegisterModalProps>(
  ({ isOpen, onClose, switchToLogin }, ref) => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    return (
      <ModalWrapper ref={ref} isOpen={isOpen} onClose={onClose}>
        <form
          className="relative bg-gradient-to-br from-gray-100/50 to-emerald-100/25 backdrop-blur-3xl p-8 rounded-3xl w-full max-w-md mx-4 shadow-xl"
        >
          <div className="mb-8">
            <h2 className="text-4xl font-bold mb-2">Register Account</h2>
            <p className="text-gray-700">
              👋 Hello,<br />
              Get started with ByteForge!
            </p>
          </div>

          <div className="mb-6">
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                <UserCircle className="h-5 w-5 text-gray-500" />
              </div>
              <input
                type="text"
                placeholder="Full Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
                className="block w-full pl-12 pr-4 py-4 rounded-xl bg-white border border-gray-200 focus:outline-none focus:ring-2 focus:ring-emerald-500"
              />
            </div>
          </div>

          <div className="mb-6">
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                <Mail className="h-5 w-5 text-gray-500" />
              </div>
              <input
                type="email"
                placeholder="Enter Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="block w-full pl-12 pr-4 py-4 rounded-xl bg-white border border-gray-200 focus:outline-none focus:ring-2 focus:ring-emerald-500"
              />
            </div>
          </div>

          <div className="mb-6">
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                <Lock className="h-5 w-5 text-gray-500" />
              </div>
              <input
                type={showPassword ? 'text' : 'password'}
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="block w-full pl-12 pr-12 py-4 rounded-xl bg-white border border-gray-200 focus:outline-none focus:ring-2 focus:ring-emerald-500"
              />
              <button
                type="button"
                className="absolute inset-y-0 right-0 mr-4 flex items-center cursor-pointer"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? <EyeOff className="h-5 w-5 text-gray-400" /> : <Eye className="h-5 w-5 text-gray-400" />}
              </button>
            </div>
          </div>

          <div className="mb-8">
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                <Lock className="h-5 w-5 text-gray-500" />
              </div>
              <input
                type={showConfirmPassword ? 'text' : 'password'}
                placeholder="Confirm Password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
                className="block w-full pl-12 pr-12 py-4 rounded-xl bg-white border border-gray-200 focus:outline-none focus:ring-2 focus:ring-emerald-500"
              />
              <button
                type="button"
                className="absolute inset-y-0 right-0 mr-4 flex items-center cursor-pointer"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
              >
                {showConfirmPassword ? <EyeOff className="h-5 w-5 text-gray-400" /> : <Eye className="h-5 w-5 text-gray-400" />}
              </button>
            </div>
          </div>

          {error && <div className="text-sm text-red-600 text-center mb-4">{error}</div>}

          <button
            type="submit"
            disabled={loading}
            className="w-full py-4 bg-emerald-400 hover:bg-emerald-500 transition text-white rounded-xl font-medium mb-6 cursor-pointer disabled:opacity-50"
          >
            {loading ? 'Creating Account...' : 'Create Account'}
          </button>

          <div className="text-center mb-4">
            <p className="text-gray-700">
              Already have an account?{' '}
              <button
                type="button"
                className="text-blue-900 font-bold hover:underline cursor-pointer"
                onClick={switchToLogin}
              >
                Sign In!
              </button>
            </p>
          </div>

          <div className="text-center text-sm text-gray-600 mb-4">
            By continuing you indicate that you read and agreed to the Terms of Use
          </div>
        </form>
      </ModalWrapper>
    );
  }
);
