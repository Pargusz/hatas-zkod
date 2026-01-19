
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';
import { db } from '../firebase';
import { motion } from 'framer-motion';
import { Send, Image, X, Loader2 } from 'lucide-react';

const CreatePost = ({ user, userData }) => {
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const [category, setCategory] = useState('Yazılım');
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!title.trim() || !content.trim()) return;

        setLoading(true);
        try {
            await addDoc(collection(db, "posts"), {
                title,
                content,
                category,
                authorId: user.uid,
                authorName: userData?.displayName || 'Anonim',
                authorAvatar: userData?.avatar || null,
                likesCount: 0,
                commentsCount: 0,
                createdAt: serverTimestamp()
            });
            navigate('/');
        } catch (error) {
            console.error("Error adding document: ", error);
            alert("Paylaşım yapılırken bir hata oluştu.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div style={{ maxWidth: '800px', margin: '2rem auto' }}>
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="glass"
                style={{ padding: '2rem', borderRadius: '16px' }}
            >
                <h2 style={{ marginBottom: '1.5rem', fontSize: '1.5rem' }}>Yeni Paylaşım Oluştur</h2>

                <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1.2rem' }}>
                    <div>
                        <label style={{ display: 'block', marginBottom: '0.5rem', color: 'var(--text-secondary)', fontSize: '0.9rem' }}>Başlık</label>
                        <input
                            type="text"
                            placeholder="Konu başlığı nedir?"
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                            required
                        />
                    </div>

                    <div>
                        <label style={{ display: 'block', marginBottom: '0.5rem', color: 'var(--text-secondary)', fontSize: '0.9rem' }}>Kategori</label>
                        <select value={category} onChange={(e) => setCategory(e.target.value)}>
                            <option value="Yazılım">Yazılım</option>
                            <option value="Donanım">Donanım</option>
                            <option value="Yapay Zeka">Yapay Zeka</option>
                            <option value="Oyun">Oyun</option>
                            <option value="Geyik">Geyik</option>
                        </select>
                    </div>

                    <div>
                        <label style={{ display: 'block', marginBottom: '0.5rem', color: 'var(--text-secondary)', fontSize: '0.9rem' }}>İçerik</label>
                        <textarea
                            placeholder="Neler paylaşmak istersin?"
                            rows="6"
                            value={content}
                            onChange={(e) => setContent(e.target.value)}
                            required
                        ></textarea>
                    </div>

                    <div style={{ display: 'flex', gap: '1rem', alignItems: 'center', marginTop: '1rem' }}>
                        <button
                            type="button"
                            style={{
                                background: 'var(--bg-tertiary)',
                                color: 'var(--text-secondary)',
                                display: 'flex',
                                alignItems: 'center',
                                gap: '0.5rem',
                                padding: '0.6rem 1rem'
                            }}
                        >
                            <Image size={18} /> Görsel Ekle
                        </button>

                        <div style={{ marginLeft: 'auto', display: 'flex', gap: '1rem' }}>
                            <button
                                type="button"
                                onClick={() => navigate('/')}
                                style={{ background: 'transparent', color: 'var(--text-secondary)' }}
                            >
                                İptal
                            </button>
                            <button
                                type="submit"
                                disabled={loading}
                                style={{
                                    background: 'var(--accent-primary)',
                                    color: 'white',
                                    display: 'flex',
                                    alignItems: 'center',
                                    gap: '0.5rem',
                                    padding: '0.6rem 1.5rem'
                                }}
                            >
                                {loading ? <Loader2 className="animate-spin" size={18} /> : <><Send size={18} /> Paylaş</>}
                            </button>
                        </div>
                    </div>
                </form>
            </motion.div>
        </div>
    );
};

export default CreatePost;
