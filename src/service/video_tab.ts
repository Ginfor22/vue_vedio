
export interface IVideoList {
  id: number
  title: string
  videosCover: string
  description: string
  videosTime: string
  videosAddress: string
  uploadTime: string
  playCount: 0
  likeCount: 0
  dislikeCount: 0
  commentCount: 0
  status: 0

  isTop: boolean
  isAttention: boolean
  isLike: boolean
  isDislike: boolean
  isCollect: boolean
  userName: string
  userAvatar: string
}

export interface IVideoListResult {
  videosList: IVideoList[]
  publishCount: number
  likeCount: number
  collectCount: number
}

export interface IVideoParams {
  showTab: string
  page: number
  size: number
  userId?: number
}

export interface IFeedParams {
  page: number
  size: number
}
