export default interface IItem {
  id: IIds | string;
  snippet: ISnippet;
  kind?: string;
  etag?: string;
  statistics?: IStatistic;
  favorite?: boolean;
  isCustom?: boolean;
}

interface IIds {
  kind: string;
  videoId: string;
  channelId: string;
  playlistId: string;
}

interface IThumbnail {
  url: string;
  width?: number;
  height?: number;
}

interface IThumbnails {
  default: IThumbnail;
  medium: IThumbnail;
  high?: IThumbnail;
  standard?: IThumbnail;
  maxres?: IThumbnail;
}

interface ISnippet {
  publishedAt: string;
  title: string;
  description: string;
  thumbnails: IThumbnails;
  tags: string[];
  channelTitle?: string;
  channelId?: string;
  categoryId?: string;
  liveBroadcastContent?: string;
  localized?: ILocalized;
  defaultAudioLanguage?: string;
}

interface IStatistic {
  viewCount: string;
  likeCount: string;
  dislikeCount: string;
  favoriteCount: string;
  commentCount: string;
}

interface ILocalized {
  title: string;
  description: string;
}
