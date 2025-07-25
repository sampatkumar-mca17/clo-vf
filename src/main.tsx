import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.scss'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Provider } from 'react-redux';
import { store } from './store/store';
import { RouterProvider } from 'react-router';
import router from './utils/routing';
const queryClient = new QueryClient();  
createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <Provider store={store}>
        <RouterProvider router={router}/>
      </Provider>
    </QueryClientProvider>
  </StrictMode>,
)
