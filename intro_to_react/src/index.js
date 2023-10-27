import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter as Router } from 'react-router-dom';
import AppFunction from './AppFnction';

const root = ReactDOM.createRoot(document.getElementById('root')); //CONNECTS THIS PAGE TO OUR INDEX.HTML PAGE
root.render(
  //<React.StrictMode>
  <Router>

    <AppFunction /> 
  
  </Router>
    //</React.StrictMode>
);


