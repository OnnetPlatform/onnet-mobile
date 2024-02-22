// @ts-nocheck
import Attachment from './Models/Attachment';
import Message, { TextMessage } from './Models/Message';
import UploadedImage from './Models/UploadedImage';
import User from './Models/User';
import Realm from 'realm';

export const SCHEMA_VERSION = 22;

const realmConfig: Realm.Configuration = {
  schema: [User, Message, TextMessage, Attachment, UploadedImage],
  schemaVersion: SCHEMA_VERSION,
};

export default realmConfig;
