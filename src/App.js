import React from 'react';
import './App.css';

import Header from './components/Header';
import Footer from './components/Footer';
import BarraNavegacion from './components/BarraNavegacion';

function App() {
  return (
    <div className="App" id="page-container">
      <div id="content-wrap"> 
        <Header/>  
        <BarraNavegacion />
      </div>
      <footer id="footer"> 
        <Footer/> 
      </footer>
    </div>
  );
}

export default App;
