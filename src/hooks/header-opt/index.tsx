import { useEffect, useState } from "react";

export const useHeaderOpt = () => {
    const [opacity, setOpacity] = useState(0);

    useEffect(() => {
      const handleScroll = () => {
        const scrollPosition = window.scrollY;
        const screenHeight = window.innerHeight;
        const opacityValue = scrollPosition / screenHeight;
        setOpacity(opacityValue);
      };
  
      window.addEventListener("scroll", handleScroll);
  
      return () => {
        window.removeEventListener("scroll", handleScroll);
      };
    }, []);

    return opacity;
}