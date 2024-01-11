import IItem from '../youtube/models/item';

export interface IVideosState {
  source: Record<string, IItem> | null;
  searchListIds: string[];
  customCardsIds: string[];
  favorite: string[];
  pageNumber: number;
  tokens: ITokens;
}
export interface ITokens {
  nextPageToken?: string;
  prevPageToken?: string;
}
export interface IStoreObject {
  items: { [key: string]: IItem };
  tokens: ITokens;
}
