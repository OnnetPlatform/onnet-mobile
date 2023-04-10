import { PhotoIdentifier } from '@react-native-camera-roll/camera-roll';
import { useEffect, useState } from 'react';
import { UploadedImage } from '../../types';
import Fetch from '../Services/Fetch';

export const useUploadImage = () => {
  const [uploadedImages, setUploadedImages] = useState<UploadedImage[]>([]);

  const uploadImage = async (image: PhotoIdentifier) => {
    var data = new FormData();
    const {
      node: { image: metaImage },
    } = image;

    data.append('files', {
      uri: image.node.image.uri,
      name: image.node.image.filename,
      type: image.node.image.extension,
    });
    data.append('meta', JSON.stringify(metaImage));

    return Fetch({ method: 'POST', body: data, multipart: true, url: 'file/upload' })
      .then(setUploadedImages)
      .catch(console.log);
  };

  const getUploadedImages = async () =>
    Fetch({ method: 'GET', url: 'file/upload' }).then(setUploadedImages);

  useEffect(() => {
    getUploadedImages();
  }, []);
  return { uploadImage, uploadedImages, getUploadedImages };
};
