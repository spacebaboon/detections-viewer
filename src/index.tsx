import { createRoot } from 'react-dom/client';
import './global.css';
import '@radix-ui/themes/styles.css';
import App from 'components/App';

const container = document.getElementById('root') as HTMLDivElement;
const root = createRoot(container);

root.render(
  <>
    <App />
  </>,
);
