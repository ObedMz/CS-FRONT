import { useEffect, useState } from 'react';
import { generateShapes } from '@/utils/shapes';
import { Shape } from '@/types';

export const useShapesState = () => {
    const [shapes, setShapes] = useState<Shape[]>([]);

    useEffect(() => {
        setShapes(generateShapes(30));
    }, []);

    return shapes;
};
