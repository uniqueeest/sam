import { Test } from './components/Test';
import { ToastInitializer, Toast } from './components/toast';
import { ToastProvider } from './contexts/ToastContext';

function App() {
  return (
    <ToastProvider>
      <ToastInitializer />
      <Toast />
      <Test />
    </ToastProvider>
  );
}

export default App;
