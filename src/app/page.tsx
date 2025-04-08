'use client';

import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Award, ChartNoAxesCombined, CheckSquare, ChevronsDown, GraduationCap, Monitor, Telescope, WandSparkles } from 'lucide-react';
import Navbar from '@/components/navbar/Navbar';
export default function ByteForgeLanding() {

  const titleRef = useRef(null);
  const textRef = useRef(null);
  const arrowRef = useRef(null);
  const heroRef = useRef(null);
  const featsRef = useRef(null);
  const navRef = useRef(null)

  gsap.registerPlugin(ScrollTrigger);

  const navTl = gsap.timeline({
      scrollTrigger: {
        trigger: navRef.current,
        markers: false,
        scrub: 1,
        start: "100px 50px",
        end: "100px 50px",
        invalidateOnRefresh: true,
      },
  });

  useEffect(() => {
    gsap.fromTo(titleRef.current, { opacity: 0, y: -20 }, { opacity: 1, y: 0, duration: 0.8 });
    gsap.fromTo(textRef.current, { opacity: 0 }, { opacity: 1, delay: 0.5, duration: 1 });
    gsap.fromTo(arrowRef.current, { opacity: 0, y: 10 }, { opacity: 1, y: 0, delay: 1, duration: 0.8 });
    gsap.to(arrowRef.current, { y: 5, repeat: -1, yoyo: true, duration: 0.6 });
    gsap.fromTo(featsRef.current, { opacity: 0 }, { opacity: 1, duration: 1 });
    gsap.fromTo(heroRef.current, { opacity: 0, y: -20 }, { opacity: 1, delay: 0.5, y: 0, duration: 0.8 });

    navTl.fromTo(
      navRef.current,
      {
        y: -100,
        ease: "power2.out"
      },
      {
        y: 0, 
        ease: "power2.out"
      }
    )
  }, []);

  return (
    <div className='bg-gradient-to-bl from-gray-100 to-green-100'>
      <Navbar navRef={navRef}/>

      <div className="flex flex-col items-center justify-center min-h-screen">
        
        <svg viewBox="0 0 321 481" fill="none" xmlns="http://www.w3.org/2000/svg" className='absolute top-0 right-0 w-1/2 h-auto md:w-[321px] md:h-[481px]'>
          <ellipse cx="266.935" cy="220.265" rx="259.424" ry="267.5" transform="rotate(-110.753 266.935 220.265)" fill="url(#paint0_linear_84_56)"/>
          <defs>
            <linearGradient id="paint0_linear_84_56" x1="266.934" y1="-47.2346" x2="266.934" y2="487.765" gradientUnits="userSpaceOnUse">
            <stop stopColor="#E1E4F1" stopOpacity="0.4"/>
            <stop offset="0.736562" stopColor="#7BC3B3" stopOpacity="0.8"/>
            <stop offset="0.955011" stopColor="#73C0AE"/>
            </linearGradient>
          </defs>
        </svg>

        <svg viewBox="0 0 895 1003" fill="none" xmlns="http://www.w3.org/2000/svg" className='absolute -bottom-[25%] left-0 h-[125dvh] hidden md:block'>
          <ellipse cx="79.3397" cy="466.435" rx="323.796" ry="588.459" transform="rotate(-38.91 79.3397 466.435)" fill="url(#paint0_linear_84_42)"/>
          <defs>
            <linearGradient id="paint0_linear_84_42" x1="79.3397" y1="-122.024" x2="79.3397" y2="1054.89" gradientUnits="userSpaceOnUse">
            <stop offset="0.181549" stopColor="#95AAB2"/>
            <stop offset="0.486556" stopColor="#E1E4F1" stopOpacity="0.4"/>
            <stop offset="0.936567" stopColor="white" stopOpacity="0"/>
            </linearGradient>
          </defs>
        </svg>

        <svg viewBox="0 0 292 1003" fill="none" xmlns="http://www.w3.org/2000/svg" className='absolute bottom-0 left-0 h-full block md:hidden'>
          <ellipse cx="-69.9399" cy="410.538" rx="304.699" ry="558.438" transform="rotate(-24.5323 -69.9399 410.538)" fill="url(#paint0_linear_199_623)"/>
          <defs>
            <linearGradient id="paint0_linear_199_623" x1="-69.9398" y1="-147.899" x2="-69.9398" y2="968.976" gradientUnits="userSpaceOnUse">
            <stop offset="0.181549" stopColor="#95AAB2"/>
            <stop offset="0.486556" stopColor="#E1E4F1" stopOpacity="0.4"/>
            <stop offset="0.936567" stopColor="white" stopOpacity="0"/>
            </linearGradient>
          </defs>
        </svg>

        <img ref={titleRef} src='Logo2.svg' className='w-4/5 z-10' draggable={false}/>

        
        <div 
          ref={arrowRef} 
          className="mt-8 flex flex-col items-center"
        >
          <ChevronsDown className="text-gray-600" size={60} />
          <a href="#explore" className="mt-2 text-emerald-500 text-2xl md:text-4xl font-semibold hover:underline">
            Start Exploring!
          </a>
        </div>
      </div>
      <div className='flex items-center justify-center min-h-screen'>
        <div className="container mx-auto px-4 py-6" id='explore'>
          <main ref={featsRef} className="relative z-10">
            <div className="flex flex-wrap justify-center md:justify-between items-center mb-16">
                <div className="feature-badge mb-4">
                    <div className="flex items-center px-6 py-3 rounded-full border border-emerald-300 bg-white shadow-sm">
                    <Monitor className="h-5 w-5 mr-2 text-gray-800" />
                    <span>Interactive Courses</span>
                    </div>
                </div>
                
                <div className="feature-badge mb-4">
                    <div className="flex items-center px-6 py-3 rounded-full border border-emerald-300 bg-white shadow-sm">
                    <Award className="h-5 w-5 mr-2 text-gray-800" />
                    <span>Digital Certification</span>
                    </div>
                </div>
                
                <div className="feature-badge mb-4">
                    <div className="flex items-center px-6 py-3 rounded-full border border-emerald-300 bg-white shadow-sm">
                    <CheckSquare className="h-5 w-5 mr-2 text-gray-800" />
                    <span>Expert-Crafted Curriculum</span>
                    </div>
                </div>
            </div>

            <div ref={heroRef} className="text-center max-w-4xl mx-auto mb-16">
            <h1 className="text-4xl md:text-7xl font-bold mb-2 md:mb-4">
                TECH LEARNING,
            </h1>
            <h1 className="text-4xl md:text-7xl font-bold text-emerald-500 mb-4 md:mb-8">
                REDEFINED!
            </h1>
            <p className="text-base md:text-lg mb-6">
                Dive into hands-on courses, interactive challenges, and expert-led content—
                <br />
                <strong>all in one dynamic platform</strong>
            </p>
            </div>
            
            <div ref={featsRef} className="flex flex-wrap justify-center md:justify-between items-center">
            <div className="feature-badge mb-4">
                <div className="flex items-center px-6 py-3 rounded-full border border-emerald-300 bg-white shadow-sm">
                <Telescope className="h-5 w-5 mr-2 text-gray-800" />
                <span>Smart Course Discovery</span>
                </div>
            </div>
            
            <div className="feature-badge mb-4">
                <div className="flex items-center px-6 py-3 rounded-full border border-emerald-300 bg-white shadow-sm">
                <WandSparkles className="h-5 w-5 mr-2 text-gray-800" />
                <span>AI Learning Assistant</span>
                </div>
            </div>
            
            <div className="feature-badge mb-4">
                <div className="flex items-center px-6 py-3 rounded-full border border-emerald-300 bg-white shadow-sm">
                <GraduationCap className="h-5 w-5 mr-2 text-gray-800" />
                <span>Flexible Learning Access</span>
                </div>
            </div>
            
            <div className="feature-badge mb-4">
                <div className="flex items-center px-6 py-3 rounded-full border border-emerald-300 bg-white shadow-sm">
                <ChartNoAxesCombined className="h-5 w-5 mr-2 text-gray-800" />
                <span>Instant Progress Tracking</span>
                </div>
            </div>
            </div>
          </main>
        </div>
      </div>
    </div>
  );
}