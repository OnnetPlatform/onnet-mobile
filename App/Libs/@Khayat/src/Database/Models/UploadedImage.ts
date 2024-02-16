import Realm from 'realm';

export default class UploadedImage extends Realm.Object {
  mimetype!: 'string';
  filename!: string;
  path!: string;
  size!: number;
  extension!: string;
  fileSize!: number;
  height!: number;
  playableDuration!: null | number;
  width!: number;

  static schema = {
    name: 'UploadedImage',
    properties: {
      mimetype: 'string',
      filename: 'string',
      path: 'string',
      size: 'int',
      extension: 'string',
      fileSize: 'int',
      height: 'int',
      playableDuration: 'mixed',
      width: 'int',
    },
  };
}
