'use client';

import { forwardRef, useState } from "react";
import { Mail, Lock, Eye, EyeOff } from "lucide-react";
import { ModalWrapper, ModalWrapperHandle } from "../ui/ModalWrapper";

export interface LoginModalProps {
  isOpen: boolean;
  onClose: () => void;
  switchToRegister: () => void;
}

export const LoginModal = forwardRef<ModalWrapperHandle, LoginModalProps>(
  ({ isOpen, onClose, switchToRegister }, ref) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [rememberMe, setRememberMe] = useState(false);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    return (
      <ModalWrapper ref={ref} isOpen={isOpen} onClose={onClose}>
        <form
          className="relative bg-gradient-to-br from-gray-100/50 to-emerald-100/25 backdrop-blur-3xl p-8 rounded-3xl w-full max-w-md mx-4 shadow-xl"
        >
          <div className="mb-8">
            <h2 className="text-4xl font-bold mb-2">Log In</h2>
            <p className="text-gray-700">
              🎉 Welcome back,<br />
              You have been missed!
            </p>
          </div>

          <div className="mb-6">
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                <Mail className="h-5 w-5 text-gray-500" />
              </div>
              <input
                type="email"
                placeholder="Email"
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
                type={showPassword ? "text" : "password"}
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
                {showPassword ? (
                  <EyeOff className="h-5 w-5 text-gray-400" />
                ) : (
                  <Eye className="h-5 w-5 text-gray-400" />
                )}
              </button>
            </div>
          </div>

          <div className="flex justify-between items-center mb-8">
            <label className="flex items-center cursor-pointer">
              <div className="relative inline-block w-10 mr-2 align-middle select-none">
                <input
                  type="checkbox"
                  checked={rememberMe}
                  onChange={() => setRememberMe(!rememberMe)}
                  className="sr-only"
                />
                <div
                  className={`block w-10 h-6 rounded-full transition ${
                    rememberMe ? 'bg-emerald-500' : 'bg-gray-300'
                  }`}
                ></div>
                <div
                  className={`dot absolute left-1 top-1 bg-white w-4 h-4 rounded-full transition transform ${
                    rememberMe ? 'translate-x-4' : ''
                  }`}
                ></div>
              </div>
              <span className="text-sm text-gray-700">Remember me</span>
            </label>
            <a href="#" className="text-sm text-red-500 hover:underline">
              Recover Password
            </a>
          </div>

          {error && (
            <div className="text-sm text-red-600 mb-4 text-center">{error}</div>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full py-4 bg-emerald-400 hover:bg-emerald-500 transition text-white rounded-xl font-medium mb-6 cursor-pointer disabled:opacity-50"
          >
            {loading ? 'Logging in...' : 'Log In'}
          </button>

          <div className="text-center">
            <p className="text-gray-700">
              Don't have an account?{' '}
              <button
                type="button"
                className="text-blue-900 font-bold hover:underline cursor-pointer"
                onClick={switchToRegister}
              >
                Sign Up!
              </button>
            </p>
          </div>
        </form>
      </ModalWrapper>
    );
  }
);
