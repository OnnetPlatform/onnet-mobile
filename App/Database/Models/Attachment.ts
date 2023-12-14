import Realm from 'realm';

import UploadedImage from './UploadedImage';

class Attachment extends Realm.Object {
  gallery?: UploadedImage[] | undefined;
  voice?: string;

  static schema = {
    name: 'Attachment',
    properties: {
      gallery: {
        type: 'list',
        objectType: 'UploadedImage',
      },
      voice: 'string',
    },
  };
}

export default Attachment;
