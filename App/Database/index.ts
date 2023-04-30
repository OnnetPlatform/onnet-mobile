import Attachment from './Models/Attachment';
import Message, { TextMessage } from './Models/Message';
import UploadedImage from './Models/UploadedImage';
import User from './Models/User';

const realmConfig: Realm.Configuration = {
  schema: [User, Message, TextMessage, Attachment, UploadedImage],
};

export default realmConfig;
