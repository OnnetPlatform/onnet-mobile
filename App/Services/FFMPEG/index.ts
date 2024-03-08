import { FFmpegKit, FFprobeKit } from 'ffmpeg-kit-react-native';
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
    `-i ${uri} -filter_complex \ "[0:a]aformat=channel_layouts=mono, \ compand=gain=20, \ showwavespic=s=600x120:colors=#ffffff@0.9[fg]; \ color=s=600x120:color=#ffffff@0.0001, \ drawgrid=width=iw/10:height=ih/5:color=#9cf42f@0.1[bg]; \ [bg][fg]overlay=format=auto,drawbox=x=(iw-w)/2:y=(ih-h)/2:w=iw:h=1:color=#ffffff" \ -frames:v 1 ${output}`
  )
    .then(() => output)
    .catch(console.log);
};

export const getLiveAudioData = (uri: string) => {
  return FFmpegKit.execute(`-i ${uri}`)
    .then(async (session) => {
      const output = await session.getOutput();
      console.log('output', output);
    })
    .catch(console.log);
};

export { getFileNameFromPath, getBitrate };
