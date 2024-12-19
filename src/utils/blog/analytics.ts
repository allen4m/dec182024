type PageView = {
  path: string;
  timestamp: number;
  referrer?: string;
  userAgent?: string;
};

type PostEngagement = {
  postId: string;
  type: 'view' | 'like' | 'comment';
  timestamp: number;
  userId?: string;
};

class Analytics {
  private pageViews: PageView[] = [];
  private postEngagements: PostEngagement[] = [];

  trackPageView(path: string, referrer?: string) {
    this.pageViews.push({
      path,
      timestamp: Date.now(),
      referrer,
      userAgent: navigator.userAgent,
    });
  }

  trackPostEngagement(postId: string, type: PostEngagement['type'], userId?: string) {
    this.postEngagements.push({
      postId,
      type,
      timestamp: Date.now(),
      userId,
    });
  }

  getPostStats(postId: string) {
    const engagements = this.postEngagements.filter(e => e.postId === postId);
    return {
      views: engagements.filter(e => e.type === 'view').length,
      likes: engagements.filter(e => e.type === 'like').length,
      comments: engagements.filter(e => e.type === 'comment').length,
    };
  }
}

export const analytics = new Analytics();