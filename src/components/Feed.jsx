
import React, { useState, useEffect } from 'react';
import { collection, query, orderBy, onSnapshot } from 'firebase/firestore';
import { db } from '../firebase';
import PostCard from './PostCard';
import { motion, AnimatePresence } from 'framer-motion';
import { MessageSquare, TrendingUp, Clock, Hash } from 'lucide-react';

const Feed = ({ user, userData }) => {
    const [posts, setPosts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [filter, setFilter] = useState('newest');

    useEffect(() => {
        const q = query(collection(db, "posts"), orderBy("createdAt", filter === 'newest' ? 'desc' : 'asc'));

        const unsubscribe = onSnapshot(q, (snapshot) => {
            const postsData = snapshot.docs.map(doc => ({
                id: doc.id,
                ...doc.data()
            }));
            setPosts(postsData);
            setLoading(false);
        });

        return () => unsubscribe();
    }, [filter]);

    return (
        <div style={{ padding: '1rem 0' }}>
            <header style={{ marginBottom: '2rem' }}>
                <h1 style={{ fontSize: '2.2rem', marginBottom: '0.5rem' }}>Hatasız Kod Forum</h1>
                <p style={{ color: 'var(--text-secondary)' }}>Yazılım, teknoloji ve her konuda paylaşım yapın.</p>
            </header>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 300px', gap: '2rem' }}>
                <section>
                    <div style={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        marginBottom: '1.5rem',
                        padding: '0.5rem',
                        background: 'var(--bg-secondary)',
                        borderRadius: '12px'
                    }}>
                        <div style={{ display: 'flex', gap: '1rem' }}>
                            <button
                                onClick={() => setFilter('newest')}
                                style={{
                                    background: filter === 'newest' ? 'var(--bg-tertiary)' : 'transparent',
                                    padding: '0.5rem 1rem',
                                    display: 'flex',
                                    alignItems: 'center',
                                    gap: '0.5rem',
                                    color: filter === 'newest' ? 'var(--accent-primary)' : 'var(--text-secondary)'
                                }}
                            >
                                <Clock size={18} /> Yeni
                            </button>
                            <button
                                onClick={() => setFilter('trending')}
                                style={{
                                    background: filter === 'trending' ? 'var(--bg-tertiary)' : 'transparent',
                                    padding: '0.5rem 1rem',
                                    display: 'flex',
                                    alignItems: 'center',
                                    gap: '0.5rem',
                                    color: filter === 'trending' ? 'var(--accent-primary)' : 'var(--text-secondary)'
                                }}
                            >
                                <TrendingUp size={18} /> Popüler
                            </button>
                        </div>
                    </div>

                    {loading ? (
                        <div style={{ textAlign: 'center', padding: '3rem' }}>Yükleniyor...</div>
                    ) : (
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                            <AnimatePresence>
                                {posts.map((post) => (
                                    <PostCard key={post.id} post={post} user={user} />
                                ))}
                            </AnimatePresence>
                            {posts.length === 0 && (
                                <div className="glass" style={{ padding: '3rem', textAlign: 'center', borderRadius: '16px' }}>
                                    <MessageSquare size={40} style={{ opacity: 0.3, marginBottom: '1rem' }} />
                                    <p style={{ color: 'var(--text-secondary)' }}>Henüz paylaşım yapılmamış. İlk paylaşımı sen yap!</p>
                                </div>
                            )}
                        </div>
                    )}
                </section>

                <aside style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                    <div className="glass" style={{ padding: '1.5rem', borderRadius: '16px' }}>
                        <h3 style={{ marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                            <Hash size={20} color="var(--accent-primary)" />
                            Kategoriler
                        </h3>
                        <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '0.8rem' }}>
                            {['Yazılım', 'Donanım', 'Yapay Zeka', 'Oyun', 'Geyik'].map(cat => (
                                <li key={cat} style={{
                                    padding: '0.5rem',
                                    borderRadius: '6px',
                                    cursor: 'pointer',
                                    display: 'flex',
                                    justifyContent: 'space-between',
                                    transition: 'background 0.2s'
                                }} className="category-item">
                                    <span style={{ color: 'var(--text-secondary)' }}>{cat}</span>
                                    <span style={{ fontSize: '0.8rem', color: 'var(--text-tertiary)' }}>0</span>
                                </li>
                            ))}
                        </ul>
                    </div>

                    <div className="glass" style={{ padding: '1.5rem', borderRadius: '16px', background: 'linear-gradient(135deg, rgba(88, 166, 255, 0.1) 0%, rgba(31, 111, 235, 0.1) 100%)' }}>
                        <h3 style={{ marginBottom: '0.5rem' }}>Hatasız Kod topluluğuna katıl!</h3>
                        <p style={{ fontSize: '0.9rem', color: 'var(--text-secondary)', marginBottom: '1rem' }}>Fikirlerini paylaş, sorular sor ve yeni insanlarla tanış.</p>
                        {!user && (
                            <button style={{
                                width: '100%',
                                background: 'var(--accent-primary)',
                                color: 'white',
                                padding: '0.7rem'
                            }}>Hemen Kaydol</button>
                        )}
                    </div>
                </aside>
            </div>
        </div>
    );
};

export default Feed;
