
import React, { useEffect, useState } from 'react';
import { HashRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from './firebase';
import { ensureAdminExists, getUserData } from './auth';

// Components
import Navbar from './components/Navbar';
import Feed from './components/Feed';
import PostDetail from './components/PostDetail';
import AuthForms from './components/AuthForms';
import CreatePost from './components/CreatePost';
import Profile from './components/Profile';

function App() {
  const [user, setUser] = useState(null);
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Ensure admin exists on load
    ensureAdminExists(
      "gunduzpolat35@gmail.com",
      "124356pgdG!",
      "Pargusz"
    );

    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      if (currentUser) {
        setUser(currentUser);
        const data = await getUserData(currentUser.uid);
        setUserData(data);
      } else {
        setUser(null);
        setUserData(null);
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  if (loading) {
    return (
      <div className="loading-screen" style={{
        height: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        background: '#0a0c10',
        color: '#f0f6fc'
      }}>
        <h2>Yükleniyor...</h2>
      </div>
    );
  }

  return (
    <Router>
      <div className="app-container">
        <Navbar user={user} userData={userData} />
        <main className="container" style={{ paddingTop: '80px', minHeight: 'calc(100vh - 80px)' }}>
          <Routes>
            <Route path="/" element={<Feed user={user} userData={userData} />} />
            <Route path="/post/:id" element={<PostDetail user={user} userData={userData} />} />
            <Route path="/login" element={!user ? <AuthForms mode="login" /> : <Navigate to="/" />} />
            <Route path="/register" element={!user ? <AuthForms mode="register" /> : <Navigate to="/" />} />
            <Route path="/profile" element={user ? <Profile user={user} userData={userData} /> : <Navigate to="/login" />} />
            <Route path="/create" element={user ? <CreatePost user={user} userData={userData} /> : <Navigate to="/login" />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;
