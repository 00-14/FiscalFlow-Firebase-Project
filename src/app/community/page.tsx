"use client";

import { useState } from 'react';
import type { ForumPost } from '@/lib/types';
import { PostCard } from '@/components/community/post-card';
import { NewPostDialog } from '@/components/community/new-post-dialog';
import { Button } from '@/components/ui/button';
import { PlusCircle } from 'lucide-react';

const initialPosts: ForumPost[] = [
  { id: '1', author: { name: 'Jane Doe', avatarUrl: 'https://placehold.co/40x40.png', avatarHint: 'woman face' }, title: 'My strategy for paying off credit card debt', content: 'I started by tackling the card with the highest interest rate first, a method known as the avalanche method. It saved me a lot in interest payments over time. I also called my credit card company to negotiate a lower interest rate, which they surprisingly agreed to! What are your tips?', timestamp: '2 hours ago', upvotes: 42, replies: 12 },
  { id: '2', author: { name: 'John Smith', avatarUrl: 'https://placehold.co/40x40.png', avatarHint: 'man face' }, title: 'Best high-yield savings accounts right now?', content: 'I\'m looking to move my emergency fund to an account with a better APY. I\'ve seen a few online banks offering over 4.5%. Does anyone have experience with banks like Ally, Marcus, or SoFi? Looking for recommendations and any hidden fees to watch out for.', timestamp: '5 hours ago', upvotes: 28, replies: 18 },
  { id: '3', author: { name: 'Emily White', avatarUrl: 'https://placehold.co/40x40.png', avatarHint: 'person face' }, title: 'Beginner investing question: ETFs or Mutual Funds?', content: 'I\'m just starting my investment journey and I\'m a bit confused about the difference between ETFs and mutual funds for a long-term retirement portfolio. What are the pros and cons of each? I\'m leaning towards low-cost index ETFs but would love to hear other perspectives.', timestamp: '1 day ago', upvotes: 61, replies: 25 },
];

export default function CommunityPage() {
    const [posts, setPosts] = useState<ForumPost[]>(initialPosts);

    const handleNewPost = (newPost: Omit<ForumPost, 'id' | 'author' | 'timestamp' | 'upvotes' | 'replies'>) => {
        const post: ForumPost = {
            ...newPost,
            id: Date.now().toString(),
            author: { name: 'You', avatarUrl: 'https://placehold.co/40x40.png', avatarHint: 'user icon' },
            timestamp: 'Just now',
            upvotes: 0,
            replies: 0,
        };
        setPosts(prev => [post, ...prev]);
    }

  return (
    <div className="flex flex-col gap-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Community Forum</h1>
          <p className="text-muted-foreground">Share and discover financial strategies.</p>
        </div>
        <NewPostDialog onNewPost={handleNewPost}>
            <Button>
                <PlusCircle className="mr-2 h-4 w-4" />
                Create Post
            </Button>
        </NewPostDialog>
      </div>
      <div className="space-y-4">
        {posts.map(post => (
          <PostCard key={post.id} post={post} />
        ))}
      </div>
    </div>
  );
}
