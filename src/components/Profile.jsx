
import React from 'react';
import { motion } from 'framer-motion';
import { User, Mail, Calendar, Settings, ShieldCheck } from 'lucide-react';

const Profile = ({ user, userData }) => {
    const joinDate = userData?.createdAt?.toDate ?
        new Intl.DateTimeFormat('tr-TR', { month: 'long', year: 'numeric' }).format(userData.createdAt.toDate()) :
        'Ocak 2026';

    return (
        <div style={{ maxWidth: '800px', margin: '2rem auto' }}>
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="glass"
                style={{ padding: '3rem', borderRadius: '24px', textAlign: 'center' }}
            >
                <div style={{ position: 'relative', display: 'inline-block', marginBottom: '1.5rem' }}>
                    <div style={{
                        width: '120px',
                        height: '120px',
                        borderRadius: '50%',
                        background: 'var(--bg-tertiary)',
                        border: '4px solid var(--accent-primary)',
                        overflow: 'hidden',
                        margin: '0 auto'
                    }}>
                        {userData?.avatar ? (
                            <img src={userData.avatar} alt="Avatar" style={{ width: '100%', height: '100%' }} />
                        ) : (
                            <User size={60} style={{ margin: '30px' }} color="var(--text-secondary)" />
                        )}
                    </div>
                    {userData?.role === 'admin' && (
                        <div style={{
                            position: 'absolute',
                            bottom: '5px',
                            right: '5px',
                            background: 'var(--accent-primary)',
                            borderRadius: '50%',
                            padding: '5px',
                            display: 'flex'
                        }} title="Yönetici">
                            <ShieldCheck size={20} color="white" />
                        </div>
                    )}
                </div>

                <h1 style={{ fontSize: '2rem', marginBottom: '0.5rem' }}>{userData?.displayName || 'Kullanıcı'}</h1>
                <p style={{ color: 'var(--text-tertiary)', fontSize: '1rem', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem' }}>
                    <Mail size={16} /> {user.email}
                </p>

                <div style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))',
                    gap: '1rem',
                    marginTop: '2.5rem',
                    textAlign: 'left'
                }}>
                    <div className="glass" style={{ padding: '1.5rem', borderRadius: '16px' }}>
                        <Calendar size={20} color="var(--accent-primary)" style={{ marginBottom: '0.5rem' }} />
                        <span style={{ display: 'block', fontSize: '0.8rem', color: 'var(--text-tertiary)' }}>Katılım Tarihi</span>
                        <span style={{ fontWeight: '500' }}>{joinDate}</span>
                    </div>
                    <div className="glass" style={{ padding: '1.5rem', borderRadius: '16px' }}>
                        <Settings size={20} color="var(--accent-primary)" style={{ marginBottom: '0.5rem' }} />
                        <span style={{ display: 'block', fontSize: '0.8rem', color: 'var(--text-tertiary)' }}>Hesap Türü</span>
                        <span style={{ fontWeight: '500' }}>{userData?.role === 'admin' ? 'Yönetici' : 'Üye'}</span>
                    </div>
                </div>

                <div style={{ marginTop: '3rem', textAlign: 'left' }}>
                    <h3 style={{ marginBottom: '1.5rem' }}>Hesap Ayarları</h3>
                    <button style={{
                        background: 'var(--bg-tertiary)',
                        width: '100%',
                        padding: '1rem',
                        textAlign: 'left',
                        borderRadius: '12px',
                        marginBottom: '0.8rem',
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center'
                    }}>
                        <span>Profili Düzenle</span>
                        <span style={{ color: 'var(--text-tertiary)' }}>&gt;</span>
                    </button>
                    <button style={{
                        background: 'var(--bg-tertiary)',
                        width: '100%',
                        padding: '1rem',
                        textAlign: 'left',
                        borderRadius: '12px',
                        color: 'var(--danger)'
                    }}>
                        Şifre Değiştir
                    </button>
                </div>
            </motion.div>
        </div>
    );
};

export default Profile;
