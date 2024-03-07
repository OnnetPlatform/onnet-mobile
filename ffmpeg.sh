ffbrope -v quiet -print_format json -show_format -show_packets -show_streams ${uri}
ffprobe -i ${uri} -f s16le -acodec pcm_s16le -
ffmpeg -i ${uri} -af astats=metadata=1:reset=1 -f null -
ffmpeg -nostats -i ${uri} -af astats=metadata=1:reset=1:display_entries=json,ametadata=print:key=lavfi.astats.Overall.RMS_level -f null -
