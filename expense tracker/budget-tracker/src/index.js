import React from 'react';
import ReactDOM from 'react-dom/client';
import {BudgetsProvider} from './contexts/BudgetContext'
import App from './App';


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
   <BudgetsProvider>
      <App/>
   </BudgetsProvider>
  </React.StrictMode>
);

