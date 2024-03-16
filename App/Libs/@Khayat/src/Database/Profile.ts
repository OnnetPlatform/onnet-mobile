import Realm from 'realm';
import { ProfileObject } from './Models/types';
export class Profile extends Realm.Object<ProfileObject> {
  username?: string;
  avatar?: string;
  bio?: string;
  cover?: string;
  workspace?: string;
  user?: string;
  active?: boolean;
  status?: string;
  title?: string;
  city?: string;
  country?: string;
  department?: string;
  phone?: string;
  last_name?: string;
  first_name?: string;
  full_name?: string;
  typing?: boolean;
  static schema = {
    name: 'Profile',
    properties: {
      username: 'string?',
      avatar: 'string?',
      bio: 'string?',
      cover: 'string?',
      workspace: 'string?',
      user: 'string?',
      active: 'bool?',
      status: 'string?',
      title: 'string?',
      city: 'string?',
      country: 'string?',
      department: 'string?',
      phone: 'string?',
      last_name: 'string?',
      first_name: 'string?',
      full_name: 'string?',
      typing: 'bool?',
    },
  };
}
