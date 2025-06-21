import Image from 'next/image';
import type { ForumPost } from '@/lib/types';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { MessageSquare, ThumbsUp, Share2 } from 'lucide-react';

interface PostCardProps {
    post: ForumPost;
}

export function PostCard({ post }: PostCardProps) {
    return (
        <Card>
            <CardHeader className="flex flex-row items-center gap-4">
                <Avatar>
                    <AvatarImage src={post.author.avatarUrl} alt={post.author.name} data-ai-hint={post.author.avatarHint} />
                    <AvatarFallback>{post.author.name.charAt(0)}</AvatarFallback>
                </Avatar>
                <div>
                    <CardTitle>{post.title}</CardTitle>
                    <CardDescription>Posted by {post.author.name} • {post.timestamp}</CardDescription>
                </div>
            </CardHeader>
            <CardContent>
                <p className="text-muted-foreground">{post.content}</p>
            </CardContent>
            <CardFooter className="flex justify-between">
                <div className="flex gap-4">
                    <Button variant="ghost" size="sm" className="flex items-center gap-2">
                        <ThumbsUp className="h-4 w-4" />
                        <span>{post.upvotes}</span>
                    </Button>
                    <Button variant="ghost" size="sm" className="flex items-center gap-2">
                        <MessageSquare className="h-4 w-4" />
                        <span>{post.replies} Replies</span>
                    </Button>
                </div>
                <Button variant="ghost" size="sm" className="flex items-center gap-2">
                    <Share2 className="h-4 w-4" />
                    <span>Share</span>
                </Button>
            </CardFooter>
        </Card>
    );
}
