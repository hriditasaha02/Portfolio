import './index.css';
import Navbar from "./pages/navbar/Navbar";
import Hero from './pages/hero/Hero';
import Skills from "./pages/skills/Skills";
import SlidingProject from './pages/projects/SlidingProject';
import Projects from './pages/projects/Projects';
import Contact from './pages/contact/Contact';
import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import LocomotiveScroll from 'locomotive-scroll';
import LoadingScreen from './components/LoadingScreen'; // Import the loading screen.

function App() {
  const locomotiveScroll = useRef(null); 
  const cursorRef = useRef(null);
  const [compHover, setCompHover] = useState(false);
  const [isLoading, setIsLoading] = useState(true); // Loading state.
  const [isSmallScreen, setIsSmallScreen] = useState(window.innerWidth < 768); // Track screen size (small screen < 768px).

  // Update screen size on resize
  useEffect(() => {
    const handleResize = () => {
      setIsSmallScreen(window.innerWidth < 768);
    };
    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  useEffect(() => {
    if (!isLoading && !isSmallScreen) {
      locomotiveScroll.current = new LocomotiveScroll({
        el: document.querySelector('[data-scroll-container]'),
        smooth: true,
      });

      const cursor = cursorRef.current;
      const main = document.querySelector('main');

      const handleMouseEnter = () => {
        gsap.to(cursor, {
          scale: 1,
          duration: 1.25,
          ease: "power2.out"
        });
      };

      const handleMouseMove = (dets) => {
        gsap.to(cursor, {
          x: dets.clientX + 10,
          y: dets.clientY,
          duration: 1.5,
          ease: "power2.out"
        });
      };

      const handleMouseLeave = () => {
        gsap.to(cursor, {
          scale: 0,
          duration: 1.25,
          ease: "power2.out"
        });
      };

      main.addEventListener("mouseenter", handleMouseEnter);
      main.addEventListener("mousemove", handleMouseMove);
      main.addEventListener("mouseleave", handleMouseLeave);

      return () => {
        main.removeEventListener("mouseenter", handleMouseEnter);
        main.removeEventListener("mousemove", handleMouseMove);
        main.removeEventListener("mouseleave", handleMouseLeave);
        locomotiveScroll.current.destroy(); // Clean up LocomotiveScroll instance.
      };
    }
  }, [isLoading, isSmallScreen]); // Only initialize LocomotiveScroll after loading and on larger screens.

  return (
    <>
      {isLoading ? (
        <LoadingScreen setIsLoading={setIsLoading} />
      ) : (
        <main className='font-og relative bg-primary select-none w-full h-screen' data-scroll-container>
          <div
            ref={cursorRef}
            className="lg:min-w-[1vw] lg:min-h-[1vw] lg:px-2 lg:py-1 lg:rounded-full lg:bg-tertiary lg:text-primary lg:fixed lg:z-[1000]"
          >
            {compHover && (compHover === 1 ? 'View' : (compHover === 2 ? 'Click to Copy' : "Copied"))}
          </div>

          <Navbar />
          <Hero />

          {!isSmallScreen && (
            <>
              <Skills />
              <SlidingProject />
              <Projects isProjectHover={setCompHover} />
              <Contact isEmailHover={setCompHover} />
            </>
          )}
        </main>
      )}
    </>
  );
}

export default App;
// example comment to test github