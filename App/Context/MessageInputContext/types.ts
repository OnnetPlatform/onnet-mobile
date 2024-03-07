import User from '@Khayat/Database/Models/User';

declare type Optional<T> = T | undefined;

export type TextMessage = {
  textMessage: string;
  setTextMessage: React.Dispatch<React.SetStateAction<string>>;
  user: User;
};

export type LocalGalleryContext = {
  openLocalGallery: boolean;
  toggleLocalGalleryModel(open: boolean): void;
  attachedGallery: UploadedImage[];
};

export type UploadedGalleryContext = {
  openUploadedGallery: boolean;
  toggleUploadedGalleryModel(open: boolean): void;
};
export type EmojisListContext = {
  openEmojisList: boolean;
  toggleEmojisList(open: boolean): void;
};

export type MentionsList = {
  openMentionsList: boolean;
  toggleMentionsList(open: boolean): void;
};
export type UploadedImage = {
  mimetype: string;
  filename: string;
  path: string;
  size: number;
  extension: string;
  fileSize: number;
  height: number;
  playableDuration: null | number;
  width: number;
};

export type Recording = {
  openRecordingModal: boolean;
  toggleRecordingModal(open: boolean): void;
};

export type MessageInputContext = Optional<
  TextMessage &
    LocalGalleryContext &
    UploadedGalleryContext &
    EmojisListContext &
    MentionsList &
    Recording
>;
