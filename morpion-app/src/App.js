import './App.css';
import Login from './composants/Login';
import SignUp from './composants/SignUp';
import React, { useState } from 'react';

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isSignUpView, setIsSignUpView] = useState(false);  // Nouvel état pour basculer entre Login et SignUp

  return (
    <div>
      {isAuthenticated ? (
        "Bienvenue!"
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
