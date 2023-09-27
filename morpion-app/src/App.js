import './App.css';
import Login from './composants/Login';
import SignUp from './composants/SignUp';
import React, { useState } from 'react';

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isSignUpView, setIsSignUpView] = useState(false);

  const handleLogout = () => {
    setIsAuthenticated(false);
  }

  return (
    <div>
      {isAuthenticated ? (
        <>
        Bienvenue!
        <button onClick={handleLogout}>Déconnexion</button>
        </>
      ) : isSignUpView ? (
        <>
          <SignUp setIsAuth={setIsAuthenticated} />
          <button onClick={() => setIsSignUpView(false)}>Aller à la connexion</button>
        </>
      ) : (
        <>
          <Login setIsAuth={setIsAuthenticated} />
          <button onClick={() => setIsSignUpView(true)}>Créer un compte</button>
        </>
      )}
    </div>
  );
}

export default App;
