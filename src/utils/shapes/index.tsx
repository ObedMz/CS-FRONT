import { Circle, MoonStar, Square, Star, Triangle } from 'lucide-react';

export const getRandomInt = (min: number, max: number) => {
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

const getRandomColor = () => {
  const letters = '0123456789ABCDEF';
  let color = '#';
  for (let i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
};

const getRandomShapeComponent = (color: string) => {
    const shapes = [
        <Circle key="circle" stroke={color} style={{filter: `drop-shadow(0 0 10px ${color}) drop-shadow(0 0 20px ${color}) drop-shadow(0 0 40px ${color}) drop-shadow(0 0 80px ${color})`}}/>,
        <Square key="square" stroke={color} style={{transform: `rotateZ(${getRandomInt(0, 360)}deg)`, filter: `drop-shadow(0 0 10px ${color}) drop-shadow(0 0 20px ${color}) drop-shadow(0 0 40px ${color}) drop-shadow(0 0 80px ${color})`}}/>,
        <MoonStar key="moonstar" stroke={color} style={{transform: `rotateZ(${getRandomInt(0, 360)}deg)`, filter: `drop-shadow(0 0 10px ${color}) drop-shadow(0 0 20px ${color}) drop-shadow(0 0 40px ${color}) drop-shadow(0 0 80px ${color})`}}/>,
        <Star key="star" stroke={color} style={{transform: `rotateZ(${getRandomInt(0, 360)}deg)`, filter: `drop-shadow(0 0 10px ${color}) drop-shadow(0 0 20px ${color}) drop-shadow(0 0 40px ${color}) drop-shadow(0 0 80px ${color})`}}/>,
        <Triangle key="triangle" stroke={color} style={{transform: `rotateZ(${getRandomInt(0, 360)}deg)`, filter: `drop-shadow(0 0 10px ${color}) drop-shadow(0 0 20px ${color}) drop-shadow(0 0 40px ${color}) drop-shadow(0 0 80px ${color})`}}/>
      ];  
      return shapes[getRandomInt(0, shapes.length - 1)];
};

const getRandomAngle = () => {
  return `${getRandomInt(0, 360)}deg`;
};

export const generateShapes = (count: number) => {
  const shapes = [];
  for (let i = 0; i < count; i++) {
    shapes.push({
      id: i,
      color: getRandomColor(),
      shape: getRandomShapeComponent(getRandomColor()),
      angle: getRandomAngle(),
      delay: `${getRandomInt(0, 5000)}ms`,
    });
  }
  return shapes;
};