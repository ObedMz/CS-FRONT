'use client'
import React, { ReactElement, useState } from 'react';
import Image from 'next/image';
import { Sticker } from '@/types/items';

interface HtmlComponentProps {
  data: Sticker[];
}

const HtmlComponent: React.FC<HtmlComponentProps> = ({ data }) => {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  const transform = (data: Sticker[]): ReactElement | null => {
    return (
      <>
        {data.map((e: Sticker, index: number) => (
          <div
            className="flex-1 max-w-[50px] max-h-[40px]"
            key={index}
            style={{ width: '100%', height: 'auto', position: 'relative' }}
            onMouseEnter={() => setHoveredIndex(index)}
            onMouseLeave={() => setHoveredIndex(null)}
          >
            <Image src={e.url} alt={e.name} width={100} height={100} loading='lazy' className='transition-all cursor-pointer hover:scale-110'/>
            {hoveredIndex === index && (
              <div
                className="p-2 rounded text-xs absolute top-0 left-0 w-[100px] bg-black text-white text-center py-1"
                style={{ transform: 'translateY(-100%)' }}
              >
                {e.name}
              </div>
            )}
          </div>
        ))}
      </>
    );
  };

  const reactElements = transform(data);

  return (
    <div className="flex gap-1 w-full h-[40px] absolute justify-start bottom-1 z-10 left-0">
      {reactElements}
    </div>
  );
};

export default HtmlComponent;
