
import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Home, LogIn, UserPlus, LogOut, User, PlusSquare, Code } from 'lucide-react';
import { logoutUser } from '../auth';

const Navbar = ({ user, userData }) => {
    const navigate = useNavigate();

    const handleLogout = async () => {
        await logoutUser();
        navigate('/');
    };

    return (
        <nav className="glass" style={{
            position: 'fixed',
            top: 0,
            width: '100%',
            height: '70px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            padding: '0 2rem',
            zIndex: 1000,
            borderTop: 'none',
            borderLeft: 'none',
            borderRight: 'none'
        }}>
            <Link to="/" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '1.5rem', fontWeight: 'bold', color: 'var(--text-primary)' }}>
                <Code size={30} color="var(--accent-primary)" />
                <span>Hatasız Kod</span>
            </Link>

            <div style={{ display: 'flex', alignItems: 'center', gap: '1.5rem' }}>
                <Link to="/" title="Ana Sayfa" style={{ color: 'var(--text-secondary)', display: 'flex', alignItems: 'center' }}>
                    <Home size={24} />
                </Link>

                {user ? (
                    <>
                        <Link to="/create" title="Paylaş" style={{ color: 'var(--text-secondary)', display: 'flex', alignItems: 'center' }}>
                            <PlusSquare size={24} />
                        </Link>
                        <Link to="/profile" title="Profil" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--text-secondary)' }}>
                            {userData?.avatar ? (
                                <img src={userData.avatar} alt="Avatar" style={{ width: '32px', height: '32px', borderRadius: '50%', border: '1px solid var(--border-color)' }} />
                            ) : (
                                <User size={24} />
                            )}
                            <span style={{ fontSize: '0.9rem', fontWeight: '500' }}>{userData?.displayName || 'Kullanıcı'}</span>
                        </Link>
                        <button onClick={handleLogout} style={{ background: 'transparent', color: 'var(--danger)', display: 'flex', alignItems: 'center', padding: '0.5rem' }}>
                            <LogOut size={24} />
                        </button>
                    </>
                ) : (
                    <>
                        <Link to="/login" style={{ fontSize: '0.95rem', fontWeight: '500', color: 'var(--text-secondary)', display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                            <LogIn size={20} />
                            Giriş Yap
                        </Link>
                        <Link to="/register" className="glass" style={{
                            fontSize: '0.95rem',
                            fontWeight: '600',
                            color: 'var(--text-primary)',
                            padding: '0.5rem 1rem',
                            borderRadius: '8px',
                            background: 'var(--accent-primary)',
                            border: 'none',
                            display: 'flex',
                            alignItems: 'center',
                            gap: '0.4rem'
                        }}>
                            <UserPlus size={20} />
                            Kaydol
                        </Link>
                    </>
                )}
            </div>
        </nav>
    );
};

export default Navbar;
