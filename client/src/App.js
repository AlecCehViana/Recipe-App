
import './App.css';
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom'
import React from 'react';
import { Home } from './pages/home.js';
import { Auth } from './pages/auth.js';
import { CreateRecipe } from './pages/create-recipe.js';
import { SavedRecipes } from './pages/saved-recipes.js';
import  {Navbar} from "./components/navbar.js";
const App = () => {
  return (
    <div className='App'>
      <Router>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home/>}/>
          <Route path="/auth" element={<Auth/>}/>
          <Route path="/create-recipe" element={<CreateRecipe/>}/>
          <Route path="/saved-recipes" element={<SavedRecipes/>}/>
        </Routes>
      </Router>
      
    </div>
  );
};

export default App;