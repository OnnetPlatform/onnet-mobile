import { call, put, select } from 'redux-saga/effects';
import client from '../../../Graphql/Client';
import { GET_WORKSPACES_QUERY } from '../../../Graphql/User/Queries/getWorkspaces';
import { UserCreators } from '../../Actions';
import { CREATE_WORKSPACE_MUTATION } from '../../../Graphql/User/Mutations/createWorkspace';
import { JOIN_WORKSPACE_MUTATION } from '../../../Graphql/User/Mutations/joinWorkspace';
import { Profile } from '../../../Graphql/Profile/Mutations/types';
import { UPDATE_PROFILE_MUTATION } from '../../../Graphql/Profile/Mutations/updateProfile';
import { AuthSelector } from '../../Selectors/AuthSelector';
import { setAppLink } from '../AppSaga';

export function* getUserWorkspaces(): Generator<any, any, any> {
  try {
    const { data } = yield client.query({
      query: GET_WORKSPACES_QUERY,
      fetchPolicy: 'no-cache',
    });
    yield put(UserCreators.setUserWorkspaces(data.getUserWorkspaces));
  } catch (error) {
    console.log(error);
  }
}
export function* createWorkspace({ name }: { name: string }) {
  try {
    const { data } = yield client.mutate({
      mutation: CREATE_WORKSPACE_MUTATION,
      fetchPolicy: 'no-cache',
      variables: { input: { name } },
    });
    yield call(getUserWorkspaces);
    yield put(UserCreators.setCurrentWorkspace(data.createWorkspace));
  } catch (error) {
    console.log(error);
  }
}
export function* joinWorkspace({ workspace_id }: { workspace_id: string }) {
  try {
    const { data } = yield client.mutate({
      mutation: JOIN_WORKSPACE_MUTATION,
      fetchPolicy: 'no-cache',
      variables: { data: { workspace_id } },
    });
    yield put(UserCreators.setCurrentWorkspace(data.joinWorkspace));
    const { access_token } = yield select(AuthSelector);
    setAppLink(access_token, data.joinWorkspace.workspace_access_token);
  } catch (error) {
    console.log(error);
  }
}

export function* updateProfile({
  profile,
  onUpdate,
}: {
  profile: Partial<Profile>;
  onUpdate(): void;
}) {
  try {
    const { data } = yield client.mutate({
      mutation: UPDATE_PROFILE_MUTATION,
      fetchPolicy: 'no-cache',
      variables: { input: profile },
    });
    yield put(UserCreators.setProfile(data.updateProfile));
    if (onUpdate) onUpdate();
  } catch (error) {
    console.log(error);
  }
}
