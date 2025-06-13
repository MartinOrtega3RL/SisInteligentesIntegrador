
import React from 'react';
import { Modal, Steps, Button } from 'antd';
import { quizQuestions } from '../../data/aiData';

export const QuizModal = ({
  quizVisible,
  setQuizVisible,
  currentQuizStep,
  setCurrentQuizStep
}) => {
  const handleQuizAnswer = () => {
    if (currentQuizStep < quizQuestions.length - 1) {
      setCurrentQuizStep(currentQuizStep + 1);
    } else {
      setQuizVisible(false);
      setCurrentQuizStep(0);
      Modal.success({
        title: '¡Evaluación Completada!',
        content: 'Basado en tus respuestas, te recomendamos comenzar con la sección "¿Qué es la IA?" y continuar con Machine Learning.',
      });
    }
  };

  return (
    <Modal
      title="Evaluación Inicial - Conoce tu Nivel"
      open={quizVisible}
      onCancel={() => {
        setQuizVisible(false);
        setCurrentQuizStep(0);
      }}
      footer={null}
      width={600}
    >
      <Steps current={currentQuizStep} className="mb-8">
        <Steps.Step title="Nivel" />
        <Steps.Step title="Intereses" />
        <Steps.Step title="Objetivos" />
      </Steps>
      
      {currentQuizStep < quizQuestions.length ? (
        <div>
          <h3 className="text-lg font-semibold mb-4">{quizQuestions[currentQuizStep].title}</h3>
          <div className="space-y-2 mb-6">
            {quizQuestions[currentQuizStep].content.split('|').map((option, index) => (
              <Button 
                key={index}
                block 
                className="text-left"
                onClick={handleQuizAnswer}
              >
                {option}
              </Button>
            ))}
          </div>
        </div>
      ) : null}
    </Modal>
  );
};
