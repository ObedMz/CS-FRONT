'use client'

import { useShapesState } from "@/hooks/shapes";
import { ChevronDown } from "lucide-react";
import styles from "@/styles/animation.module.css";
import { getRandomInt } from "@/utils/shapes";

const ShapesPage = () => {
    const shapes = useShapesState();
    const handleScroll = () => {
      window.scrollTo({
        top: window.innerHeight,
        behavior: "smooth"
      });
    };
  
    return (
      <div className="bg-gradient-to-b from-[#15171C] to-transparent relative w-full h-screen flex flex-col justify-center items-center">
        <div className={`${styles.floatingArrow} absolute bottom-0 right-0 left-0 z-30`} onClick={handleScroll}>
        <ChevronDown color="#fff" size={60} onClick={handleScroll} className="cursor-pointer"/>
      </div>
        <div className="relative h-full w-full overflow-hidden">
          {shapes.map((shape) => {
            return (
              <div
                key={shape.id}
                className={`${styles['animated-shape']} absolute transition-transform duration-300 transform`}
                style={{
                  bottom: '-10%',
                  left: `${getRandomInt(0, 100)}%`,
                  animationDelay: shape.delay,
                }}
              >
                {shape.shape}
              </div>
            );
          })}
        </div>
        <div className="w-full absolute inset-x-0 bottom-0 h-8 bg-gradient-to-t from-[#15171C] to-transparent drop-shadow-inner"></div>
  
      </div>
    );
    
  };
  
  export default ShapesPage;