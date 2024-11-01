import React from 'react';
import axios from 'axios';
import Login from './components/login/Login';
import './index.css';

axios.defaults.withCredentials = true;

function App() {
  return (
    <div className="App">
      <Login />
    </div>
  );
}

export default App;