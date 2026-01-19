
import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Mail, Lock, User, AlertCircle, Loader2 } from 'lucide-react';
import { loginUser, registerUser } from '../auth';

const AuthForms = ({ mode }) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [displayName, setDisplayName] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setLoading(true);

        try {
            if (mode === 'login') {
                await loginUser(email, password);
            } else {
                await registerUser(email, password, displayName);
            }
            navigate('/');
        } catch (err) {
            setError(err.message === 'Firebase: Error (auth/user-not-found).' ? 'Kullanıcı bulunamadı.' :
                err.message === 'Firebase: Error (auth/wrong-password).' ? 'Hatalı şifre.' :
                    err.message === 'Firebase: Error (auth/email-already-in-use).' ? 'Bu e-posta zaten kullanımda.' :
                        'Bir hata oluştu. Lütfen tekrar deneyin.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            minHeight: '80vh',
        }}>
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="glass"
                style={{
                    width: '100%',
                    maxWidth: '400px',
                    padding: '2.5rem',
                    borderRadius: '16px',
                }}
            >
                <h2 style={{ textAlign: 'center', marginBottom: '2rem', fontSize: '1.8rem' }}>
                    {mode === 'login' ? 'Giriş Yap' : 'Hesap Oluştur'}
                </h2>

                <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1.2rem' }}>
                    {mode === 'register' && (
                        <div style={{ position: 'relative' }}>
                            <User style={{ position: 'absolute', left: '12px', top: '12px', color: 'var(--text-tertiary)' }} size={20} />
                            <input
                                type="text"
                                placeholder="Ad Soyad"
                                value={displayName}
                                onChange={(e) => setDisplayName(e.target.value)}
                                required
                                style={{ paddingLeft: '40px' }}
                            />
                        </div>
                    )}

                    <div style={{ position: 'relative' }}>
                        <Mail style={{ position: 'absolute', left: '12px', top: '12px', color: 'var(--text-tertiary)' }} size={20} />
                        <input
                            type="email"
                            placeholder="E-posta"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                            style={{ paddingLeft: '40px' }}
                        />
                    </div>

                    <div style={{ position: 'relative' }}>
                        <Lock style={{ position: 'absolute', left: '12px', top: '12px', color: 'var(--text-tertiary)' }} size={20} />
                        <input
                            type="password"
                            placeholder="Şifre"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                            style={{ paddingLeft: '40px' }}
                        />
                    </div>

                    {error && (
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            style={{
                                color: 'var(--danger)',
                                fontSize: '0.85rem',
                                display: 'flex',
                                alignItems: 'center',
                                gap: '0.5rem',
                                background: 'rgba(248, 81, 73, 0.1)',
                                padding: '0.8rem',
                                borderRadius: '8px'
                            }}
                        >
                            <AlertCircle size={16} />
                            {error}
                        </motion.div>
                    )}

                    <button
                        disabled={loading}
                        style={{
                            background: 'var(--accent-primary)',
                            color: 'white',
                            padding: '0.8rem',
                            marginTop: '0.5rem',
                            display: 'flex',
                            justifyContent: 'center',
                            alignItems: 'center',
                            gap: '0.5rem',
                            fontSize: '1rem'
                        }}
                    >
                        {loading ? <Loader2 className="animate-spin" size={20} /> : (mode === 'login' ? 'Giriş Yap' : 'Kaydol')}
                    </button>
                </form>

                <p style={{ textAlign: 'center', marginTop: '1.5rem', fontSize: '0.9rem', color: 'var(--text-secondary)' }}>
                    {mode === 'login' ? (
                        <>Hesabın yok mu? <Link to="/register" style={{ color: 'var(--accent-primary)' }}>Kaydol</Link></>
                    ) : (
                        <>Zaten hesabın var mı? <Link to="/login" style={{ color: 'var(--accent-primary)' }}>Giriş Yap</Link></>
                    )}
                </p>
            </motion.div>
        </div>
    );
};

export default AuthForms;
