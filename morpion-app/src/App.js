import './App.css';
import Login from './composants/Login';
import SignUp from './composants/SignUp';
import JoinJeu from './composants/JoinJeu';
import React, { useState } from 'react';

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isSignUpView, setIsSignUpView] = useState(false);
  const [channel, setChannel] = useState(null);
  const [userId, setUserId] = useState(null);

  const handleLogout = () => {
    setIsAuthenticated(false);
    setChannel(null);
    setUserId(null);
  }

  const handleAuthentication = (id) => {
    setIsAuthenticated(true);
    setUserId(id);
  }

  return (
    <div>
      {isAuthenticated ? (
        <>
        <JoinJeu channel={channel} setChannel={setChannel} userId={userId} />
        <button onClick={handleLogout}>Déconnexion</button>
        </>
      ) : isSignUpView ? (
        <>
          <SignUp setIsAuth={handleAuthentication} />
          <button onClick={() => setIsSignUpView(false)}>Aller à la connexion</button>
        </>
      ) : (
        <>
          <Login setIsAuth={handleAuthentication} />
          <button onClick={() => setIsSignUpView(true)}>Créer un compte</button>
        </>
      )}
    </div>
  );
}

export default App;
