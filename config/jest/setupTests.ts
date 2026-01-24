// Такой файл вы могли наблюдать при create-react-app
import '@testing-library/jest-dom';
import 'regenerator-runtime/runtime';

// Mantine requires ResizeObserver
global.ResizeObserver = class ResizeObserver {
  observe() {}
  unobserve() {}
  disconnect() {}
};
