
import React from 'react';
import { Table, Card, Button } from 'antd';
import { motion } from 'framer-motion';
import { EyeOutlined, LinkOutlined } from '@ant-design/icons';
import { softwareData } from '../../data/aiData';

export const SoftwareCatalog = () => {
  const softwareColumns = [
    { title: 'Nombre', dataIndex: 'nombre', key: 'nombre' },
    { title: 'Objetivo', dataIndex: 'objetivo', key: 'objetivo' },
    { title: 'Licencia', dataIndex: 'licencia', key: 'licencia' },
    { title: 'Año', dataIndex: 'año', key: 'año' },
    { title: 'Autor', dataIndex: 'autor', key: 'autor' },
    {
      title: 'Acciones',
      key: 'acciones',
      render: (_, record) => (
        <div className="space-x-2">
          <Button 
            type="primary" 
            size="small" 
            icon={<EyeOutlined />}
            onClick={() => window.open(record.enlace, '_blank')}
          >
            Ver Demo
          </Button>
          <Button 
            size="small" 
            icon={<LinkOutlined />}
            onClick={() => window.open(record.enlace, '_blank')}
          >
            Ir al Sitio
          </Button>
        </div>
      )
    }
  ];

  return (
    <section className="py-20 bg-background">
      <div className="max-w-7xl mx-auto px-4">
        <motion.div 
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <h2 className="text-5xl font-bold mb-6 ai-text-gradient">Catálogo de Software de IA</h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Herramientas y frameworks esenciales para comenzar tu viaje en la Inteligencia Artificial
          </p>
        </motion.div>

        <Card className="overflow-hidden">
          <Table 
            dataSource={softwareData}
            columns={softwareColumns}
            pagination={{
              pageSize: 10,
              showSizeChanger: true,
              showQuickJumper: true,
            }}
            scroll={{ x: true }}
            className="w-full"
          />
        </Card>

        <div className="mt-8 text-center">
          <Button 
            type="primary" 
            size="large"
            onClick={() => window.open('https://github.com/topics/artificial-intelligence', '_blank')}
          >
            Ver Más Software en GitHub
          </Button>
        </div>
      </div>
    </section>
  );
};
