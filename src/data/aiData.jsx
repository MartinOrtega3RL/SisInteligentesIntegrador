
export const menuItems = [
  { key: 'inicio', label: 'Inicio', icon: 'HomeOutlined' },
  { key: 'que-es-ia', label: '¿Qué es la IA?', icon: 'BulbOutlined' },
  { key: 'machine-learning', label: 'Machine Learning', icon: 'BranchesOutlined' },
  { key: 'deep-learning', label: 'Deep Learning', icon: 'DeploymentUnitOutlined' },
  { key: 'tipos-aprendizaje', label: 'Tipos de Aprendizaje', icon: 'BookOutlined' },
  { key: 'agentes', label: 'Agentes Inteligentes', icon: 'RobotOutlined' },
  { key: 'busqueda', label: 'Búsqueda Heurística', icon: 'SearchOutlined' }
];

export const timelineData = [
  {
    dot: '🤖',
    children: (
      <div>
        <h4 className="font-semibold">1950 - Test de Turing</h4>
        <p className="text-muted-foreground">Alan Turing propone el famoso test para evaluar la inteligencia de las máquinas.</p>
      </div>
    )
  },
  {
    dot: '🧠',
    children: (
      <div>
        <h4 className="font-semibold">1956 - Conferencia de Dartmouth</h4>
        <p className="text-muted-foreground">John McCarthy acuña el término "Inteligencia Artificial".</p>
      </div>
    )
  },
  {
    dot: '💻',
    children: (
      <div>
        <h4 className="font-semibold">1997 - Deep Blue vs Kasparov</h4>
        <p className="text-muted-foreground">IBM Deep Blue derrota al campeón mundial de ajedrez.</p>
      </div>
    )
  },
  {
    dot: '🔍',
    children: (
      <div>
        <h4 className="font-semibold">2012 - Revolución del Deep Learning</h4>
        <p className="text-muted-foreground">AlexNet marca el inicio de la era moderna del deep learning.</p>
      </div>
    )
  },
  {
    dot: '🎯',
    children: (
      <div>
        <h4 className="font-semibold">2016 - AlphaGo</h4>
        <p className="text-muted-foreground">Google DeepMind derrota al campeón mundial de Go.</p>
      </div>
    )
  },
  {
    dot: '🗣️',
    children: (
      <div>
        <h4 className="font-semibold">2022 - Era de los LLMs</h4>
        <p className="text-muted-foreground">ChatGPT revoluciona la interacción humano-IA.</p>
      </div>
    )
  }
];

export const softwareData = [
  {
    key: '1',
    nombre: 'TensorFlow',
    objetivo: 'Machine Learning y Deep Learning',
    licencia: 'Apache 2.0',
    año: '2015',
    autor: 'Google',
    enlace: 'https://tensorflow.org'
  },
  {
    key: '2',
    nombre: 'PyTorch',
    objetivo: 'Deep Learning Research',
    licencia: 'BSD',
    año: '2016',
    autor: 'Facebook',
    enlace: 'https://pytorch.org'
  },
  {
    key: '3',
    nombre: 'OpenCV',
    objetivo: 'Computer Vision',
    licencia: 'Apache 2.0',
    año: '2000',
    autor: 'Intel',
    enlace: 'https://opencv.org'
  },
  {
    key: '4',
    nombre: 'Scikit-learn',
    objetivo: 'Machine Learning',
    licencia: 'BSD',
    año: '2007',
    autor: 'INRIA',
    enlace: 'https://scikit-learn.org'
  },
  {
    key: '5',
    nombre: 'Keras',
    objetivo: 'Deep Learning API',
    licencia: 'MIT',
    año: '2015',
    autor: 'François Chollet',
    enlace: 'https://keras.io'
  }
];

export const glossaryTerms = [
  {
    term: 'Algoritmo',
    definition: 'Conjunto de reglas o instrucciones definidas y ordenadas para resolver un problema.'
  },
  {
    term: 'Aprendizaje Automático',
    definition: 'Subcampo de la IA que permite a las máquinas aprender sin ser programadas explícitamente.'
  },
  {
    term: 'Red neuronal',
    definition: 'Modelo computacional inspirado en el funcionamiento del cerebro humano.'
  },
  {
    term: 'Deep Learning',
    definition: 'Técnica de ML que utiliza redes neuronales profundas con múltiples capas.'
  },
  {
    term: 'Heurística',
    definition: 'Técnica para resolver problemas de forma más rápida cuando los métodos clásicos son muy lentos.'
  }
];

export const quizQuestions = [
  {
    title: '¿Cuál es tu nivel actual con la IA?',
    content: 'Principiante - Nunca he trabajado con IA|Intermedio - Conozco algunos conceptos|Avanzado - Tengo experiencia práctica'
  },
  {
    title: '¿Qué área te interesa más?',
    content: 'Machine Learning|Computer Vision|Procesamiento de Lenguaje Natural|Robótica'
  },
  {
    title: '¿Cuál es tu objetivo principal?',
    content: 'Aprender conceptos básicos|Implementar proyectos|Investigación académica|Aplicación empresarial'
  }
];
