import { FetchProps, Header } from './types';

export const URL = 'http://192.168.1.5:3000/';

export const Fetch: (props: FetchProps) => Promise<any> = ({
  method,
  body,
  multipart,
  url,
}) =>
  fetch(URL + url, { method, body, headers: Header(multipart) })
    .then((result) => result.json())
    .then((json) => json)
    .catch((error) => error);

export default Fetch;
