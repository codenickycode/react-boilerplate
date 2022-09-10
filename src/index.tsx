import { createRoot } from 'react-dom/client';
import { App } from './App';

const container = document.getElementById('root');
if (!container) {
  throw new Error('no root container!');
}
const root = createRoot(container);
root.render(<App testCopy={'Hello World!'} />);
