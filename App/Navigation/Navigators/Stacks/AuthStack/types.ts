import { Profile } from '@Khayat/Database/Profile';
import { Event } from '@Khayat/Graphql/Events/types';

export type AppNavigationParamsList = {
  SplashScreen: undefined;
  MainNavigation: undefined;
  ConferenceScreen: { event: Event };
  AudioScreen: undefined;
  MediaRecorder: undefined;
  UserChatScreen: { user: Profile };
  ProfileScreen: { id: string };
  Settings: undefined;
  EventInfo: undefined;
  CreateAnnouncement: undefined;
  LiveAnnouncement: undefined;
  AuthenticationScreen: undefined;
  LaunchScreen: undefined;
  LoginScreen: undefined;
  RegisterationScreen: undefined;
  UserJoinedWorkspaces: undefined;
  EventInvitations: undefined;
  EventScreen: {
    event: Event;
  };
  EditProfile: undefined;
  EventDescription: undefined;
  EventTime: undefined;
  EditEventScreen: {
    event: Event;
  };
};
