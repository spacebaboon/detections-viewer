import { createRoot } from 'react-dom/client';
import './global.css';
import '@radix-ui/themes/styles.css';
import { Theme } from '@radix-ui/themes';
import App from 'components/App';

const container = document.getElementById('root') as HTMLDivElement;
const root = createRoot(container);

root.render(
  <>
    <Theme>
      <App />
    </Theme>
  </>,
);
