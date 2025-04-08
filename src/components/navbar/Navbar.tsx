'use client';

import { Search } from "lucide-react";
import { LoginModal } from "../auth/Login";
import { RegisterModal } from "../auth/Register";
import { useRef, useState } from "react";
import { ModalWrapperHandle } from "../ui/ModalWrapper";

interface NavbarProps {
  navRef: React.RefObject<HTMLElement | null>;
}

export default function Navbar({ navRef }: NavbarProps) {
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
  const [isRegisterModalOpen, setIsRegisterModalOpen] = useState(false);

  const loginRef = useRef<ModalWrapperHandle>(null);
  const registerRef = useRef<ModalWrapperHandle>(null);

  const closeModals = () => {
    setIsLoginModalOpen(false);
    setIsRegisterModalOpen(false);
  };

  const openLoginModal = async () => {
    if (isRegisterModalOpen && registerRef.current) {
      await registerRef.current.playCloseAnimation();
      setIsRegisterModalOpen(false);
    }

    setIsLoginModalOpen(true);
  };

  const openRegisterModal = async () => {
    if (isLoginModalOpen && loginRef.current) {
      await loginRef.current.playCloseAnimation();
      setIsLoginModalOpen(false);
    }

    setIsRegisterModalOpen(true);
  };

  const switchToLogin = async () => {
    if (registerRef.current) {
      await registerRef.current.playCloseAnimation();
      setIsRegisterModalOpen(false);
    }
    setIsLoginModalOpen(true);
  };

  const switchToRegister = async () => {
    if (loginRef.current) {
      await loginRef.current.playCloseAnimation();
      setIsLoginModalOpen(false);
    }
    setIsRegisterModalOpen(true);
  };

  return (
    <div>
      <LoginModal
        ref={loginRef}
        isOpen={isLoginModalOpen}
        onClose={closeModals}
        switchToRegister={switchToRegister}
      />
      <RegisterModal
        ref={registerRef}
        isOpen={isRegisterModalOpen}
        onClose={closeModals}
        switchToLogin={switchToLogin}
      />

      <nav ref={navRef} className="container w-full h-fit mx-auto px-4 py-6 fixed inset-x-0 z-[9999]">
        <div className="flex justify-between items-center">
          <a href="/" draggable={false}>
            <img src="Logo4.svg" alt="Logo" className="h-[42px]" draggable={false} />
          </a>

          <div className="relative mx-4 md:flex-grow max-w-md">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Search className="h-5 w-5 text-gray-400" />
            </div>
            <input
              type="text"
              className="block w-full pl-10 pr-3 py-2 rounded-full bg-white bg-opacity-70 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-emerald-500"
              placeholder="Search"
            />
          </div>

          <div className="hidden lg:flex space-x-8 items-center">
            <a href="#" className="text-gray-800 hover:text-emerald-600">Dashboard</a>
            <a href="#" className="text-gray-800 hover:text-emerald-600">Course</a>
            <a href="#" className="text-gray-800 hover:text-emerald-600">Certificate</a>
            <a href="#" className="text-gray-800 hover:text-emerald-600">Settings</a>
          </div>

          <div className="flex items-center space-x-4 ml-4">
            <button
              className="px-6 py-2 rounded-full bg-white text-gray-800 border border-gray-300 hover:bg-gray-100 cursor-pointer"
              onClick={openLoginModal}
            >
              Login
            </button>
            <button
              className="hidden md:block px-6 py-2 rounded-full bg-gray-500 text-white hover:bg-gray-600 cursor-pointer"
              onClick={openRegisterModal}
            >
              Register
            </button>
          </div>
        </div>
      </nav>
    </div>
  );
}
