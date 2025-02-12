import { useState, useEffect, useRef } from "react";
import { JSX } from "react";
import Typed from "typed.js";

interface TranslatableHeaderProps {
  value: string;
  translate: string;
  className?: string;
  header?: keyof JSX.IntrinsicElements | React.ElementType;
}

export default function TranslatableHeader({ 
  value, 
  translate, 
  className = "",
  header: HeaderTag = "h1" as keyof JSX.IntrinsicElements
}: TranslatableHeaderProps) {
  const [isHovered, setIsHovered] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const typedRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    if (isHovered && typedRef.current) {
      const typed = new Typed(typedRef.current, {
        strings: [translate],
        typeSpeed: 50,
        backSpeed: 25,
        showCursor: false,
      });
      return () => typed.destroy();
    }
  }, [isHovered, translate]);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
    };
    
    handleResize(); // Check on mount
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <div className="w-full flex justify-center">
      <div 
        className="relative inline-block"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        onFocus={() => setIsHovered(true)}
        onBlur={() => setIsHovered(false)}
      >
        <HeaderTag
          className={`
            ${className}
            hover:text-gray-700 
            transition-all duration-300
            cursor-pointer
            text-center
          `}
          tabIndex={0}
          role="button"
          aria-label={`${value} - ${translate}`}
        >
          {value}
        </HeaderTag>

        <div 
          className={`
            absolute ${isMobile ? 'top-full mt-2 left-1/2 transform -translate-x-1/2' : '-right-40 top-1/2'}
            transition-transform transition-opacity transform duration-300 ease-in-out
            origin-top
            ${isHovered 
              ? 'opacity-100 translate-x-0 scale-y-100' 
              : 'opacity-0 translate-x-4 scale-y-50'}
          `}
          aria-hidden={!isHovered}
        >
          {/* Black Background Container */}
          <div className="bg-black text-white p-3 rounded-lg shadow-lg text-sm w-36 pointer-events-none">
            <span ref={typedRef}></span>
          </div>
        </div>
      </div>
    </div>
  );
}
