import React from 'react';
import { Menu, Button, Drawer } from 'antd';
import { motion } from 'framer-motion';
import {
  HomeOutlined,
  BulbOutlined,
  BranchesOutlined,
  DeploymentUnitOutlined,
  BookOutlined,
  RobotOutlined,
  SearchOutlined,
  MenuOutlined,
  MessageOutlined // Nuevo icono para el foro
} from '@ant-design/icons';
import { menuItems } from '../../data/aiData';

const iconMap = {
  HomeOutlined,
  BulbOutlined,
  BranchesOutlined,
  DeploymentUnitOutlined,
  BookOutlined,
  RobotOutlined,
  SearchOutlined,
  MessageOutlined // Mapeo del nuevo icono
};

export const Navigation = ({
  mobileMenuVisible,
  setMobileMenuVisible,
  scrollToSection
}) => {
  const menuItemsWithIcons = [
    ...menuItems.map(item => ({
      key: item.key,
      icon: React.createElement(iconMap[item.icon]),
      label: item.label,
      onClick: () => scrollToSection(item.key)
    })),
    {
      key: 'foro', // Nueva key para el foro
      icon: <MessageOutlined />, // Icono del foro
      label: 'Foro',
      onClick: () => window.location.href = '/foro' // Redirección a /foro
    }
  ];

  return (
    <>
      <div className="fixed w-full z-50 bg-white shadow-md">
        <div className="max-w-7xl mx-auto px-4 flex items-center justify-between h-16">
          <div className="flex items-center flex-shrink-0 min-w-0">
            <motion.div 
              className="text-lg lg:text-xl font-bold ai-text-gradient truncate"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
            >
              🤖 Explorando la IA
            </motion.div>
          </div>
          
          {/* Desktop Menu */}
          <Menu 
            mode="horizontal" 
            className="hidden lg:flex flex-1 justify-center border-none bg-transparent ml-8"
            items={menuItemsWithIcons}
          />
          
          {/* Mobile Menu Button */}
          <Button 
            className="lg:hidden flex-shrink-0"
            type="text"
            icon={<MenuOutlined />}
            onClick={() => setMobileMenuVisible(true)}
          />
        </div>
      </div>

      {/* Mobile Menu Drawer */}
      <Drawer
        title="Navegación"
        placement="right"
        onClose={() => setMobileMenuVisible(false)}
        open={mobileMenuVisible}
        className="lg:hidden"
      >
        <Menu
          mode="vertical"
          items={menuItemsWithIcons.map(item => ({
            ...item,
            onClick: () => {
              if (item.key === 'foro') {
                window.location.href = '/foro'; // Redirección para el foro en el menú móvil
              } else {
                scrollToSection(item.key);
                setMobileMenuVisible(false);
              }
            }
          }))}
        />
      </Drawer>
    </>
  );
};
