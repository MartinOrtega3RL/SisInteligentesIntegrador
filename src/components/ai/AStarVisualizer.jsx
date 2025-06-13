import React, { useState, useEffect } from 'react';
import { Button, Alert, Card } from 'antd';
import { motion } from 'framer-motion';
import { PlayCircleOutlined, ReloadOutlined } from '@ant-design/icons';
import { animationSteps, getCellStyle } from '../../utils/aStarAnimation';

export const AStarVisualizer = () => {
  const [isAnimating, setIsAnimating] = useState(false);
  const [animationStep, setAnimationStep] = useState(0);
  const [animatedCells, setAnimatedCells] = useState(new Set());

  const startAnimation = () => {
    setIsAnimating(true);
    setAnimationStep(0);
    setAnimatedCells(new Set());
  };

  const resetAnimation = () => {
    setIsAnimating(false);
    setAnimationStep(0);
    setAnimatedCells(new Set());
  };

  useEffect(() => {
    if (isAnimating && animationStep < animationSteps.length) {
      const timer = setTimeout(() => {
        const currentStepData = animationSteps[animationStep];
        setAnimatedCells(new Set(currentStepData.explored));
        setAnimationStep(prev => prev + 1);
      }, 1500);

      return () => clearTimeout(timer);
    } else if (animationStep >= animationSteps.length) {
      setIsAnimating(false);
    }
  }, [isAnimating, animationStep]);

  return (
    <Card className="p-6 mb-8">
      <h3 className="text-2xl font-semibold mb-4 text-center">Simulador Visual: Algoritmo A*</h3>
      <div className="bg-gray-100 p-8 rounded-lg">
        <div className="text-center mb-4">
          <p className="text-muted-foreground mb-2">Ejemplo: Encontrar el camino más corto de A a B</p>
          <div className="inline-flex items-center space-x-8">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center text-white font-bold">A</div>
              <span>Inicio</span>
            </div>
            <div className="flex-1 h-0.5 bg-gradient-to-r from-green-500 via-yellow-500 to-red-500"></div>
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-red-500 rounded-full flex items-center justify-center text-white font-bold">B</div>
              <span>Destino</span>
            </div>
          </div>
        </div>
        
        {/* Animation Controls */}
        <div className="flex justify-center mb-4 space-x-4">
          <Button 
            type="primary" 
            icon={<PlayCircleOutlined />}
            onClick={startAnimation}
            disabled={isAnimating}
            className="bg-ai-primary hover:bg-ai-primary/80"
          >
            Iniciar Simulación
          </Button>
          <Button 
            icon={<ReloadOutlined />}
            onClick={resetAnimation}
          >
            Reiniciar
          </Button>
        </div>

        {/* Grid Visualization */}
        <div className="grid grid-cols-5 gap-2 max-w-md mx-auto mb-4">
          {Array.from({ length: 25 }, (_, i) => (
            <motion.div 
              key={i}
              className={`w-8 h-8 border-2 flex items-center justify-center text-xs font-bold transition-all duration-300 ${getCellStyle(i, isAnimating, animationStep, animatedCells)}`}
              animate={{
                scale: animationStep > 0 && animatedCells.has(i) ? [1, 1.1, 1] : 1,
              }}
              transition={{ duration: 0.3 }}
            >
              {i === 0 ? 'A' : i === 24 ? 'B' : [7, 8, 13, 14].includes(i) ? '■' : ''}
            </motion.div>
          ))}
        </div>

        {/* Animation Status */}
        {isAnimating && animationStep > 0 && animationStep <= animationSteps.length && (
          <div className="text-center mb-4">
            <Alert
              message={`Paso ${animationStep}: ${animationSteps[animationStep - 1]?.message || ''}`}
              type="info"
              showIcon
              className="max-w-md mx-auto"
            />
          </div>
        )}
        
        <div className="mt-4 text-center text-sm text-muted-foreground">
          <div className="flex justify-center space-x-4 flex-wrap">
            <span className="flex items-center mb-2"><div className="w-3 h-3 bg-green-500 rounded-full mr-1"></div>Inicio</span>
            <span className="flex items-center mb-2"><div className="w-3 h-3 bg-red-500 rounded-full mr-1"></div>Destino</span>
            <span className="flex items-center mb-2"><div className="w-3 h-3 bg-yellow-400 rounded-full mr-1"></div>Camino Óptimo</span>
            <span className="flex items-center mb-2"><div className="w-3 h-3 bg-blue-200 rounded-full mr-1"></div>Explorado</span>
            <span className="flex items-center mb-2"><div className="w-3 h-3 bg-orange-400 rounded-full mr-1"></div>Actual</span>
            <span className="flex items-center mb-2"><div className="w-3 h-3 bg-gray-800 rounded-full mr-1"></div>Obstáculo</span>
          </div>
        </div>
      </div>
    </Card>
  );
};
