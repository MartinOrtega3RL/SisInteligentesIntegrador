
import React from 'react';
import { Timeline, Card, Button } from 'antd';
import { motion } from 'framer-motion';
import { HistoryOutlined } from '@ant-design/icons';
import { timelineData } from '../../data/aiData';

export const HistoryTimeline = () => {
  return (
    <section className="py-20 bg-muted/30">
      <div className="max-w-6xl mx-auto px-4">
        <motion.div 
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <h2 className="text-5xl font-bold mb-6 ai-text-gradient">Historia de la Inteligencia Artificial</h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Un recorrido por los hitos más importantes en el desarrollo de la IA
          </p>
        </motion.div>

        <Card className="p-8">
          <Timeline
            items={timelineData}
            mode="alternate"
            className="custom-timeline"
          />
        </Card>

        <div className="mt-8 text-center">
          <Button 
            icon={<HistoryOutlined />}
            onClick={() => window.open('https://es.wikipedia.org/wiki/Inteligencia_artificial', '_blank')}
          >
            Leer más sobre la historia de la IA
          </Button>
        </div>
      </div>
    </section>
  );
};
