export type AuthActionTypes = {
  RESET: 'REST';
  SET_ACCESS_TOKEN: 'SET_ACCESS_TOKEN';
};

export type AuthActionCreatorTypes = {
  reset(): any;
  setAccessToken(access_token: string): any;
};
