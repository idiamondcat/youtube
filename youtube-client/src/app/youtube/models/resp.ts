import IItem from './item';

export default interface IResp {
  kind: string;
  etag: string;
  pageInfo: IPageInfo;
  items: IItem[];
  nextPageToken?: string;
  prevPageToken?: string;
  TODO?: string;
}

interface IPageInfo {
  totalResults: number;
  resultsPerPage: number;
}
