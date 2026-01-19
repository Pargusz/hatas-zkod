
import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { MessageCircle, Heart, Share2, MoreHorizontal, User } from 'lucide-react';

const PostCard = ({ post, user }) => {
    const formattedDate = post.createdAt?.toDate ?
        new Intl.DateTimeFormat('tr-TR', { dateStyle: 'medium', timeStyle: 'short' }).format(post.createdAt.toDate()) :
        'Az önce';

    return (
        <motion.div
            layout
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.98 }}
            className="glass"
            style={{
                padding: '1.5rem',
                borderRadius: '16px',
                transition: 'border-color 0.2s',
                display: 'flex',
                flexDirection: 'column',
                gap: '0.8rem',
            }}
        >
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.8rem' }}>
                    <div style={{
                        width: '40px',
                        height: '40px',
                        borderRadius: '50%',
                        background: 'var(--bg-tertiary)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        overflow: 'hidden'
                    }}>
                        {post.authorAvatar ? (
                            <img src={post.authorAvatar} alt="Avatar" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                        ) : (
                            <User size={20} color="var(--text-secondary)" />
                        )}
                    </div>
                    <div>
                        <h4 style={{ fontSize: '0.95rem', fontWeight: '600' }}>{post.authorName || 'Anonim'}</h4>
                        <span style={{ fontSize: '0.8rem', color: 'var(--text-tertiary)' }}>{formattedDate}</span>
                    </div>
                </div>
                <button style={{ background: 'transparent', color: 'var(--text-tertiary)' }}>
                    <MoreHorizontal size={20} />
                </button>
            </div>

            <Link to={`/post/${post.id}`} style={{ display: 'block', margin: '0.5rem 0' }}>
                <h3 style={{ fontSize: '1.25rem', marginBottom: '0.5rem', color: 'var(--text-primary)' }}>{post.title}</h3>
                <p style={{
                    fontSize: '0.95rem',
                    color: 'var(--text-secondary)',
                    display: '-webkit-box',
                    WebkitLineClamp: 3,
                    WebkitBoxOrient: 'vertical',
                    overflow: 'hidden'
                }}>
                    {post.content}
                </p>
            </Link>

            {post.image && (
                <div style={{ borderRadius: '12px', overflow: 'hidden', maxHeight: '300px', margin: '0.5rem 0' }}>
                    <img src={post.image} alt="Post" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                </div>
            )}

            <div style={{
                display: 'flex',
                alignItems: 'center',
                gap: '1.5rem',
                marginTop: '0.5rem',
                paddingTop: '0.8rem',
                borderTop: '1px solid var(--border-color)'
            }}>
                <button style={{ background: 'transparent', color: 'var(--text-secondary)', display: 'flex', alignItems: 'center', gap: '0.4rem', fontSize: '0.9rem' }}>
                    <Heart size={18} />
                    <span>{post.likesCount || 0}</span>
                </button>
                <Link to={`/post/${post.id}`} style={{ color: 'var(--text-secondary)', display: 'flex', alignItems: 'center', gap: '0.4rem', fontSize: '0.9rem' }}>
                    <MessageCircle size={18} />
                    <span>{post.commentsCount || 0}</span>
                </Link>
                <button style={{ background: 'transparent', color: 'var(--text-secondary)', display: 'flex', alignItems: 'center', gap: '0.4rem', fontSize: '0.9rem', marginLeft: 'auto' }}>
                    <Share2 size={18} />
                </button>
            </div>
        </motion.div>
    );
};

export default PostCard;
