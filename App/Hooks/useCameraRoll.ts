import { CameraRoll, PhotoIdentifier } from '@react-native-camera-roll/camera-roll';
import { useEffect, useState } from 'react';

export const useCameraRoll = () => {
  const [photos, setPhotos] = useState<PhotoIdentifier[]>([]);
  const convertLocalIdentifierToAssetLibrary = (localIdentifier: string, ext: string) => {
    const hash = localIdentifier.split('/')[0];
    return `assets-library://asset/asset.${ext}?id=${hash}&ext=${ext}`;
  };
  const fetchPhotos = async () => {
    const cameraRoll = await CameraRoll.getPhotos({
      include: ['filename', 'fileSize', 'fileExtension', 'imageSize', 'playableDuration'],
      assetType: 'All',
      first: 100,
    });
    cameraRoll.edges.map(
      (item) =>
        (item.node.image.uri = convertLocalIdentifierToAssetLibrary(
          item.node.image.uri.replace('ph://', ''),
          item.node.type === 'image' ? 'jpg' : 'mov'
        ))
    );
    setPhotos(cameraRoll.edges);
  };
  useEffect(() => {
    fetchPhotos();
  }, []);

  return photos;
};
