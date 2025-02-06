export interface ExperimentPost {
  postInfo: ExperimentPostInfo;
  recruitStatus: boolean;
}

export interface ExperimentPostInfo {
  experimentPostId: number;
  title: string;
  views: number;
  univName: string | null;
  reward: string;
  durationInfo: {
    startDate: string | null;
    endDate: string | null;
  };
}
