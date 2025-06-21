export type Goal = {
  id: string;
  title: string;
  targetAmount: number;
  currentAmount: number;
  deadline: string;
};

export type ForumPost = {
  id: string;
  author: {
    name: string;
    avatarUrl: string;
    avatarHint: string;
  };
  title: string;
  content: string;
  timestamp: string;
  upvotes: number;
  replies: number;
};
