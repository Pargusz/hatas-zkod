
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { doc, getDoc, collection, addDoc, query, orderBy, onSnapshot, serverTimestamp, updateDoc, increment } from 'firebase/firestore';
import { db } from '../firebase';
import { motion } from 'framer-motion';
import { Send, User, MessageCircle, Heart, Share2, ArrowLeft, Loader2 } from 'lucide-react';

const PostDetail = ({ user, userData }) => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [post, setPost] = useState(null);
    const [comments, setComments] = useState([]);
    const [newComment, setNewComment] = useState('');
    const [loading, setLoading] = useState(true);
    const [commentLoading, setCommentLoading] = useState(false);

    useEffect(() => {
        const fetchPost = async () => {
            const docRef = doc(db, "posts", id);
            const docSnap = await getDoc(docRef);
            if (docSnap.exists()) {
                setPost({ id: docSnap.id, ...docSnap.data() });
            } else {
                navigate('/');
            }
            setLoading(false);
        };

        fetchPost();

        const q = query(collection(db, "posts", id, "comments"), orderBy("createdAt", "desc"));
        const unsubscribe = onSnapshot(q, (snapshot) => {
            setComments(snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })));
        });

        return () => unsubscribe();
    }, [id, navigate]);

    const handleCommentSubmit = async (e) => {
        e.preventDefault();
        if (!user) return navigate('/login');
        if (!newComment.trim()) return;

        setCommentLoading(true);
        try {
            await addDoc(collection(db, "posts", id, "comments"), {
                content: newComment,
                authorId: user.uid,
                authorName: userData?.displayName || 'Anonim',
                authorAvatar: userData?.avatar || null,
                createdAt: serverTimestamp()
            });

            // Update comment count
            await updateDoc(doc(db, "posts", id), {
                commentsCount: increment(1)
            });

            setNewComment('');
        } catch (error) {
            console.error("Error adding comment: ", error);
        } finally {
            setCommentLoading(false);
        }
    };

    if (loading) return <div style={{ padding: '2rem', textAlign: 'center' }}>Yükleniyor...</div>;

    return (
        <div style={{ maxWidth: '800px', margin: '0 auto', padding: '1rem 0' }}>
            <button
                onClick={() => navigate(-1)}
                style={{ background: 'transparent', color: 'var(--text-secondary)', display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '1.5rem' }}
            >
                <ArrowLeft size={20} /> Geri Dön
            </button>

            <div className="glass" style={{ padding: '2rem', borderRadius: '16px', marginBottom: '2rem' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1.5rem' }}>
                    <div style={{ width: '50px', height: '50px', borderRadius: '50%', background: 'var(--bg-tertiary)', overflow: 'hidden' }}>
                        {post.authorAvatar ? <img src={post.authorAvatar} alt="Avatar" style={{ width: '100%', height: '100%' }} /> : <User size={24} style={{ margin: '13px' }} />}
                    </div>
                    <div>
                        <h3 style={{ fontSize: '1.1rem' }}>{post.authorName}</h3>
                        <span style={{ fontSize: '0.85rem', color: 'var(--text-tertiary)' }}>
                            {post.createdAt?.toDate ? post.createdAt.toDate().toLocaleString('tr-TR') : 'Az önce'}
                        </span>
                    </div>
                </div>

                <h1 style={{ fontSize: '2rem', marginBottom: '1rem' }}>{post.title}</h1>
                <p style={{ fontSize: '1.1rem', whiteSpace: 'pre-wrap', color: 'var(--text-secondary)', marginBottom: '1.5rem' }}>{post.content}</p>

                <div style={{ display: 'flex', gap: '2rem', borderTop: '1px solid var(--border-color)', paddingTop: '1rem' }}>
                    <button style={{ background: 'transparent', color: 'var(--text-secondary)', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                        <Heart size={20} /> {post.likesCount || 0} Beğeni
                    </button>
                    <div style={{ color: 'var(--text-secondary)', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                        <MessageCircle size={20} /> {post.commentsCount || 0} Yorum
                    </div>
                    <button style={{ background: 'transparent', color: 'var(--text-secondary)', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                        <Share2 size={20} /> Paylaş
                    </button>
                </div>
            </div>

            <section className="comments-section">
                <h3 style={{ marginBottom: '1.5rem' }}>Yorumlar ({comments.length})</h3>

                <form onSubmit={handleCommentSubmit} style={{ marginBottom: '2rem' }}>
                    <textarea
                        placeholder="Düşüncelerini paylaş..."
                        value={newComment}
                        onChange={(e) => setNewComment(e.target.value)}
                        style={{ marginBottom: '0.8rem' }}
                    ></textarea>
                    <button
                        disabled={commentLoading}
                        style={{
                            background: 'var(--accent-primary)',
                            color: 'white',
                            padding: '0.6rem 1.5rem',
                            display: 'flex',
                            alignItems: 'center',
                            gap: '0.5rem'
                        }}
                    >
                        {commentLoading ? <Loader2 className="animate-spin" size={18} /> : <><Send size={18} /> Gönder</>}
                    </button>
                </form>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                    {comments.map(comment => (
                        <div key={comment.id} className="glass" style={{ padding: '1.2rem', borderRadius: '12px' }}>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '0.8rem', marginBottom: '0.5rem' }}>
                                <div style={{ width: '30px', height: '30px', borderRadius: '50%', background: 'var(--bg-tertiary)', overflow: 'hidden' }}>
                                    {comment.authorAvatar ? <img src={comment.authorAvatar} alt="Avatar" style={{ width: '100%' }} /> : <User size={16} style={{ margin: '7px' }} />}
                                </div>
                                <span style={{ fontSize: '0.9rem', fontWeight: '500' }}>{comment.authorName}</span>
                                <span style={{ fontSize: '0.75rem', color: 'var(--text-tertiary)' }}>
                                    {comment.createdAt?.toDate ? comment.createdAt.toDate().toLocaleString('tr-TR') : 'Az önce'}
                                </span>
                            </div>
                            <p style={{ color: 'var(--text-secondary)', fontSize: '0.95rem' }}>{comment.content}</p>
                        </div>
                    ))}
                </div>
            </section>
        </div>
    );
};

export default PostDetail;
