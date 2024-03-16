import client from '@Khayat/Graphql/Client';
import { Profile } from '@Khayat/Graphql/Profile/Mutations/types';
import { UPDATE_PROFILE_MUTATION } from '@Khayat/Graphql/Profile/Mutations/updateProfile';
import { GET_PROFILE_QUERY } from '@Khayat/Graphql/Profile/Queries/getProfile';
import { UserCreators } from '@Khayat/Redux';
import { AuthSelector } from '@Khayat/Redux/Selectors/AuthSelector';
import { useIsFocused } from '@react-navigation/native';
import { useCallback, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

export const useProfile: (id?: string) => {
  profile?: Profile;
  updateProfile(input: Partial<Profile>): void;
  notFound: boolean;
} = (id) => {
  const [profile, setProfile] = useState<Profile>();
  const [notFound, setNotFound] = useState<boolean>(false);
  const isFocused = useIsFocused();
  const dispatch = useDispatch();
  const { id: user_id } = useSelector(AuthSelector);
  const isOwned = id === user_id;

  const fetch = useCallback(() => {
    client
      .query({
        query: GET_PROFILE_QUERY,
        fetchPolicy: 'no-cache',
        variables: { input: { id } },
      })
      .then(({ data }) => {
        if (user_id === id) {
          dispatch(UserCreators.setProfile(data.profile));
        }
        setNotFound(data.profile === null && !isOwned);
        setProfile(data.profile);
      });
  }, [id, isFocused]);

  const updateProfile = useCallback((input: Partial<Profile>) => {
    client
      .mutate({
        mutation: UPDATE_PROFILE_MUTATION,
        fetchPolicy: 'no-cache',
        variables: { input: input },
      })
      .then(({ data }) => setProfile(data.profile))
      .catch(console.log);
  }, []);

  useEffect(() => {
    if (isFocused) fetch();

    return () => {
      setProfile(undefined);
      setNotFound(false);
    };
  }, [id, isFocused]);

  return { profile, updateProfile, notFound };
};
