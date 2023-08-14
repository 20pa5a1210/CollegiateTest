export type QueryResponse<T> = {
  success: boolean;
  message: string;
  data: T | null;
};
