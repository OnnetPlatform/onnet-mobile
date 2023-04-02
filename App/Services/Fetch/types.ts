export type FetchProps = {
  method: 'POST' | 'GET';
  body?: any;
  multipart?: boolean;
  url: string;
};

export const Header = (multipart?: boolean) => ({
  'Content-Type': multipart ? 'multipart/form-data' : 'application/json',
});
