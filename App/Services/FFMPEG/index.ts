import { FFmpegKit } from 'ffmpeg-kit-react-native';
import * as FileSystem from 'expo-file-system';
const getFileNameFromPath = (path: string) => {
  const fragments = path.split('/');
  let fileName = fragments[fragments.length - 1];
  fileName = fileName.split('.')[0];
  return fileName;
};

const getBitrate = async (uri: string) => {
  const filename = uri.split('/')[uri.split('/').length - 1].split('.')[0];
  try {
    await FileSystem.makeDirectoryAsync(FileSystem.cacheDirectory + 'waves');
  } catch (error) {}
  const output = `${FileSystem.cacheDirectory}waves/${filename}.png`;
  return FFmpegKit.execute(
    `-i ${uri} -filter_complex "aformat=channel_layouts=mono,showwavespic=s=1080x720" -frames:v 1 ${output}`
  )
    .then(() => output)
    .catch(console.log);
};

export { getFileNameFromPath, getBitrate };
