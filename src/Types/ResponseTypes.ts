export type QueryResponse<T> = {
  success: boolean;
  message: string;
  data: T | null;
};

export type Announcements = {
  announcementid: string;
  title: string;
  content: string;
  postedby: string;
  postedat: string;
};
