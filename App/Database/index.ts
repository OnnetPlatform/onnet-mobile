import { Profile } from '@Khayat/Database/Profile';
import { TextMessage } from './Models/Message';
import UploadedImage from './Models/UploadedImage';
import User from './Models/User';

const realmConfig: Realm.Configuration = {
  schema: [User, TextMessage, UploadedImage, Profile],
};

export default realmConfig;
