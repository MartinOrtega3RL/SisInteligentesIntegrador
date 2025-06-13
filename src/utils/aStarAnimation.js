export const animationSteps = [
  { explored: [0], current: 0, message: "Comenzamos en A (inicio)" },
  { explored: [0, 1], current: 1, message: "Explorando vecinos de A" },
  { explored: [0, 1, 5], current: 5, message: "Evaluando costos y heurística" },
  { explored: [0, 1, 5, 6], current: 6, message: "Encontrando mejor ruta" },
  { explored: [0, 1, 5, 6, 11], current: 11, message: "Continuando búsqueda" },
  { explored: [0, 1, 5, 6, 11, 12], current: 12, message: "Evaluando camino óptimo" },
  { explored: [0, 1, 5, 6, 11, 12, 17], current: 17, message: "Acercándose al destino" },
  { explored: [0, 1, 5, 6, 11, 12, 17, 18], current: 18, message: "Refinando ruta" },
  { explored: [0, 1, 5, 6, 11, 12, 17, 18, 23], current: 23, message: "Último paso antes del destino" },
  { explored: [0, 1, 5, 6, 11, 12, 17, 18, 23, 24], current: 24, message: "¡Destino alcanzado! Camino óptimo encontrado" }
];

export const getCellStyle = (index, isAnimating, animationStep, animatedCells) => {
  const pathCells = [0, 6, 11, 12, 17, 24]; // Optimal path
  const obstacleCells = [7, 8, 13, 14]; // Obstacles
  
  if (index === 0) return 'bg-green-500 text-white border-green-600';
  if (index === 24) return 'bg-red-500 text-white border-red-600';
  if (obstacleCells.includes(index)) return 'bg-gray-800 text-white border-gray-900';
  
  if (isAnimating || animatedCells.size > 0) {
    const currentStepData = animationSteps[Math.min(animationStep - 1, animationSteps.length - 1)] || { explored: [], current: -1 };
    
    if (currentStepData.current === index) {
      return 'bg-orange-400 text-white border-orange-500 animate-pulse';
    }
    if (animatedCells.has(index)) {
      return pathCells.includes(index) 
        ? 'bg-yellow-400 text-black border-yellow-500' 
        : 'bg-blue-200 text-black border-blue-300';
    }
  } else {
    // Static final state
    if (pathCells.includes(index) && index !== 0 && index !== 24) {
      return 'bg-yellow-400 text-black border-yellow-500';
    }
  }
  
  return 'bg-white text-black border-gray-300';
};
