# AudioGiber

AudioGiber is a JavaScript library that allows you to easily create an audio player context. It provides a simple and convenient way to manage and play audio tracks within your application.

## Installation

You can install AudioGiber using npm:

```shell
npm install audio-giber
```

## Usage

To use AudioGiber, follow the steps below:

1. Import the library into your JavaScript file:

```js
import AudioGiber from 'audio-giber'
```

2. Create an instance of the AudioGiber class, providing the required options:

```js
const Player = new AudioGiber({
  name: 'My Audio Player', // Optional: The name of the audio player
  nameId: 'audio-player', // Optional: The ID of the audio player element
  arrayTracks: [
    // Optional: An array of audio track objects
    { id: 1, title: 'Track 1', src: 'path/to/track1.mp3' },
    { id: 2, title: 'Track 2', src: 'path/to/track2.mp3' },
    // Add more tracks as needed
  ],
  onEndContinueTrack: true, // Optional: Continue playing the next track when the audio ends
  startInTrackIndex: 0, // Optional: Start playing the audio at the specified track index
  DEV: false, // Optional: Enable development mode
  preload: true, // Optional: Preload the audio
  onEndTrack: (event) => {
    // Optional: Callback function when a track ends
    console.log('Track ended', event)
  },
  ready: (event) => {
    // Optional: Callback function when the audio is ready
    console.log('Audio ready', event)
  },
  src: 'path/to/audio.mp3', // Optional: Set the source audio
})
```

## Audio Track Object

The audio tracks are represented as objects with the following properties:

- `id` (number): The unique identifier for the track.
- `title` (string): The title of the track.
- `src` (string): The path to the audio file.
- `imageTrack` (string, optional): The path to an image associated with the track.
- `subtitle` (string, optional): The subtitle of the track.
- `album` (string, optional): The album name of the track.

## Player methods

```ts
import { AudioGiber, type AudioTrack } from 'audio-giber'
import tracks from 'tracks'

const Player: AudioGiber = new AudioGiber({
  name: 'My player',
  arrayTracks: tracks as AudioTrack[],
  preload: true,
  onEndContinueTrack: true,
})

// Get duration
const durationTrack1 = player.getDuration()
// --- or ---
const durationTrack2 = player.getCurrenTrack().duration

// Play or pause
player.play()
payer.pause()
// --- or ---
player.togglePlay((event: boolean) => {
  // if is playing so, audio is paused
  console.log(event) // this callback is optional
  // If the callback event is true, so audio is paused
})

// Set current track
player.setCurrentTrack({
  src: 'src/my-audio.mp3',
  title: 'My Audio',
  subtitle: 'By Erickgiber',
  imageTrack: 'my-audio-image.png',
  description: 'This is my favorite music!',
  author: 'Erickgiber',
  bitsVelocity: 320,
  copyright: false,
  isDownloadable: true,
}) // Now you audio track change
```

### This methods and more

<p>The official documentation is being built 🚀</p>
<b>This library is open source.</b>

## Contributing

Contributions to AudioGiber are welcome! If you encounter any issues or have suggestions for improvement, please open an issue on the [GitHub repository](https://github.com/Erickgiber/audio-giber). Pull requests are also appreciated.

## License

[MIT](LICENSE)
