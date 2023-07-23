const ytdl = require('ytdl-core');
const ffmpeg = require('fluent-ffmpeg');

const videoUrl = process.argv[2];

if (!videoUrl) {
  console.error('Please provide a valid YouTube video URL as an argument.');
  process.exit(1);
}

console.log('Downloading video...');

const video = ytdl(videoUrl);

ytdl.getInfo(videoUrl, (err, info) => {
  if (err) {
    console.error('Error getting video info:', err);
    process.exit(1);
  }

  console.log('Title:', info.videoDetails.title);
  console.log('Duration:', info.videoDetails.lengthSeconds, 'seconds');

  const outputPath = info.videoDetails.title + '.mp4';
  ffmpeg(video)
    .on('progress', (progress) => {
      const percent = progress.percent.toFixed(2);
      console.log('Downloading:', percent + '%');
    })
    .on('end', () => {
      console.log('Download complete!');
      process.exit(0);
    })
    .save(outputPath);
});

