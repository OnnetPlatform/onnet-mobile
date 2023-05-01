export const createPoints = () => {
  const newPoints = [],
    numberOfPoints = 6,
    angleStep = (Math.PI * 2) / numberOfPoints,
    rad = 100;
  for (let i = 1; i <= numberOfPoints; i++) {
    const theta = i * angleStep;

    const x = 130 + Math.cos(theta) * rad;
    const y = 130 + Math.sin(theta) * rad;

    newPoints.push({
      x: x,
      y: y,
      originX: x,
      originY: y,
      noiseOffsetX: Math.random() * 1000,
      noiseOffsetY: Math.random() * 1000,
    });
  }

  return newPoints;
};
export function map(n: number, start1: number, end1: number, start2: number, end2: number) {
  return ((n - start1) / (end1 - start1)) * (end2 - start2) + start2;
}
