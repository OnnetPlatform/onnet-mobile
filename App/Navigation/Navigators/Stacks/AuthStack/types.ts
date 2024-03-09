import { UserChat } from '@Khayat/Database/Models/types';
import { Event } from '@Khayat/Graphql/Events/types';

export type AppNavigationParamsList = {
  SplashScreen: undefined;
  MainNavigation: undefined;
  ConferenceScreen: undefined;
  AudioScreen: undefined;
  MediaRecorder: undefined;
  UserChatScreen: { user: UserChat };
  ProfileScreen: undefined;
  Settings: undefined;
  EventInfo: undefined;
  CreateAnnouncement: undefined;
  LiveAnnouncement: undefined;
  AuthenticationScreen: undefined;
  LaunchScreen: undefined;
  LoginScreen: undefined;
  RegisterationScreen: undefined;
  EventScreen: {
    event: Event;
  };
};
