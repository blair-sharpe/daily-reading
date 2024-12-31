import { QueryCache, QueryClient, QueryClientProvider } from '@tanstack/react-query';
import ReactDOM from 'react-dom/client';
import { I18nextProvider } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import App from './App';
import { SelectedDateProvider } from './context/SelectedDateContext';
import i18n from './i18n';

const queryClient = new QueryClient({
  queryCache: new QueryCache({
    onError: () => {
      const navigate = useNavigate();
      navigate('/error');
    },
  }),
});

ReactDOM.createRoot(document.getElementById('root')!).render(
  <QueryClientProvider client={queryClient}>
    <I18nextProvider i18n={i18n}>
      <SelectedDateProvider>
        <App />
      </SelectedDateProvider>
    </I18nextProvider>
  </QueryClientProvider>
);
