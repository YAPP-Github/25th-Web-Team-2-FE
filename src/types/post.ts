export interface Post {
  postInfo: PostInfo;
  recruitStatus: boolean;
}

export interface PostInfo {
  experimentPostId: number;
  title: string;
  views: number;
  univName: string;
  reward: string;
  durationInfo: {
    startDate: string | null;
    endDate: string | null;
  };
}
