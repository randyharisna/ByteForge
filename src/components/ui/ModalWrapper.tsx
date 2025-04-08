'use client';

import { useEffect, useRef, forwardRef, useImperativeHandle } from "react";
import gsap from "gsap";

export interface ModalWrapperHandle {
  playCloseAnimation: () => Promise<void>;
}

interface ModalWrapperProps {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
}

export const ModalWrapper = forwardRef<ModalWrapperHandle, ModalWrapperProps>(
  ({ isOpen, onClose, children }, ref) => {
    const modalRef = useRef<HTMLDivElement>(null);
    const overlayRef = useRef<HTMLDivElement>(null);

    useImperativeHandle(ref, () => ({
      playCloseAnimation: () =>
        new Promise<void>((resolve) => {
          const tl = gsap.timeline({
            onComplete: () => {
              onClose();
              resolve();
            }
          });
          tl.to(modalRef.current, { opacity: 0, scale: 0.9, duration: 0.3, ease: "power2.in" });
          tl.to(overlayRef.current, { opacity: 0, duration: 0.2, ease: "power2.in" }, "-=0.1");
        }),
    }));

    useEffect(() => {
      if (isOpen) {
        gsap.set(overlayRef.current, { opacity: 0 });
        gsap.set(modalRef.current, { opacity: 0, scale: 0.9 });

        const tl = gsap.timeline();
        tl.to(overlayRef.current, { opacity: 1, duration: 0.3, ease: "power2.inOut" });
        tl.to(modalRef.current, { opacity: 1, scale: 1, duration: 0.5, ease: "back.out(1.7)" }, "-=0.1");
      }
    }, [isOpen]);

    if (!isOpen) return null;

    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center">
        <div
          ref={overlayRef}
          className="absolute inset-0 backdrop-blur-xs"
          onClick={() => {
            if (ref && typeof ref !== 'function' && ref.current) {
              ref.current.playCloseAnimation();
            }
          }}
          
        />
        <div ref={modalRef} className="relative z-10 w-full max-w-md mx-4">
          {children}
        </div>
      </div>
    );
  }
);
