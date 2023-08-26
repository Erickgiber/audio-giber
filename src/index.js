// @ts-nocheck

const ErrorMessages = {
  name: {
    code: 3,
    message: 'The name must be a string',
  },
  tracks: {
    code: 2,
    message: 'The tracks must be an array',
  },
  configuration: {
    code: 1,
    message: 'Audio configuration object is required!',
  },
  noTrack: {
    code: 4,
    message: 'No track or track list set!',
  },
}

export class AudioGiber {
  audio = new Audio()
  DEV = false
  id = 1
  name = ''
  nameId = ''
  arrayTracks = []
  onEndContinueTrack = false
  startInTrackIndex = 0
  src = ''
  preload = false
  prevTrackIndex = 0
  onEndTrack = null
  currentTrack = {}
  description = ''
  duration = ''

  constructor(options) {
    if (!options) {
      this.handleError(
        ErrorMessages.configuration.message,
        ErrorMessages.configuration.code
      )
      return
    }

    // Initialize properties with defaults or provided values
    this.name = options.name ?? ''
    this.nameId = options.nameId ?? ''
    this.arrayTracks = options.arrayTracks ?? []
    this.onEndContinueTrack = options.onEndContinueTrack ?? false
    this.startInTrackIndex = options.startInTrackIndex ?? 0
    this.DEV = options.DEV ?? false
    this.src = options.src ?? ''
    this.description = options.description ?? ''
    this.minimized = options.minimized ?? false
    this.preload = options.preload ?? false
    this.duration = options.duration ?? ''

    // Methods
    this.setSrc(this.src)
    this.setPreload(options.preload)

    // Check for errors in configuration
    this.checkErrors()

    // Handle audio tracks
    if (options.arrayTracks.length > 0) {
      const startTrackIndex = this.startInTrackIndex
      this.setTrackAndIndex(startTrackIndex, options.arrayTracks)

      if (this.onEndContinueTrack) {
        this.audio.addEventListener('ended', () => {
          const existNewTrack = options.arrayTracks[this.currentTrack.id]
          if (existNewTrack) {
            this.setCurrentTrack(existNewTrack)
            this.prevTrackIndex = this.currentTrack.id - 1
            options?.onEndTrack
              ? options.onEndTrack(this.getCurrentTrack())
              : null
            this.play()
          }
        })
      }
    }

    // Start with specific track if provided
    if (options.startInTrackIndex >= 0) {
      this.setTrackAndIndex(options.startInTrackIndex, options.arrayTracks)
    }

    // Call ready callback if provided
    if (options.ready) {
      options.ready(this.getCurrentTrack())
    }
  }

  handleError(message, code) {
    if (this.DEV) {
      console.log(message, code, this.getAudioMode())
    }
  }

  checkErrors() {
    if (typeof this.getName() !== 'string') {
      this.setSrc('')
      this.handleError(ErrorMessages.name.message, ErrorMessages.name.code)
    }

    if (!Array.isArray(this.getTracks())) {
      this.setSrc('')
      this.handleError(ErrorMessages.tracks.message, ErrorMessages.tracks.code)
    }

    if (this.getSrc().length === 0 && this.getTracks().length === 0) {
      this.setSrc('')
      this.handleError(
        ErrorMessages.noTrack.message,
        ErrorMessages.noTrack.code
      )
    }
  }

  setTrackAndIndex(index, arrayTracks) {
    const newTrack = arrayTracks[index]
    this.setCurrentTrack(newTrack)
    this.setSrc(newTrack.src)
    this.prevTrackIndex = index
    newTrack.duration = this.audio.duration ?? ''
    this.setDuration(newTrack.duration)
    this.audio.addEventListener('canplaythrough', (event) => {
      const duration = formatTime(event.currentTarget.duration)
      this.setDuration(duration)
      this.currentTrack.duration = duration
    })
  }

  getAuthorTrack() {
    return this.currentTrack.author ?? ''
  }

  endedTrack(event) {
    if (event && typeof event === 'function') {
      this.onEndTrack = () => event(this.getCurrentTrack())
    }
  }

  isTrackEnded(event) {
    if (typeof event === 'function') {
      this.audio.addEventListener('ended', () => event(this.getCurrentTrack()))
    }
  }

  setDuration(duration) {
    this.duration = duration
    this.currentTrack.duration = duration
  }

  preloadEvent(event) {
    if (event && typeof event === 'function') {
      if (this.duration) {
        event(this.getCurrentTrack())
      } else {
        this.audio.addEventListener('canplaythrough', (event) => {
          const duration = formatTime(event.currentTarget.duration)
          this.setDuration(duration)
          this.currentTrack.duration = duration
          event(this.getTracks())
        })
      }
    }
  }

  onReadyTrack(event) {
    if (event && typeof event === 'function') {
      event(this.getCurrentTrack())
    }
  }

  getCurrentTrack() {
    this.currentTrack.paused = this.getPaused()
    return this.currentTrack
  }

  getDescriptionTrack() {
    return this.currentTrack.description ?? ''
  }

  getBitsVelocityTrack() {
    return this.currentTrack.bitsVelocity ?? 'Not implemented'
  }

  destroy() {
    this.stop()
    this.setSrc('')
    this.setCurrentTrack({})
  }

  getImageTrack() {
    return this.getCurrentTrack().imageTrack
  }

  togglePlay(handlePaused = () => {}) {
    if (this.audio.paused) {
      this.currentTrack.paused = false
      this.audio.play()
      handlePaused(false)
    } else {
      this.currentTrack.paused = true
      this.audio.pause()
      handlePaused(true)
    }
  }

  setCurrentTrack(track) {
    this.currentTrack = track
    this.setSrc(track.src)
    this.setPreload(this.preload)
    this.prevTrackIndex = this.currentTrack.id - 1

    this.audio.addEventListener('canplaythrough', (event) => {
      const duration = formatTime(event.currentTarget.duration)
      this.setDuration(duration)
      this.currentTrack.duration = duration
    })
  }

  getAudioMode() {
    return this.DEV
  }

  setAudioMode(mode) {
    this.DEV = mode
  }

  getIdAudio() {
    return this.id
  }
  getName() {
    return this.name
  }

  play() {
    if (this.audio.paused) {
      this.audio.play()
    }
  }

  pause() {
    if (!this.audio.paused) {
      this.audio.pause()
    }
  }

  stop() {
    this.audio.pause()
    this.audio.currentTime = 0
  }

  setVolume(volume) {
    this.audio.volume = volume
  }

  getVolume() {
    return this.audio.volume
  }

  setMuted(muted) {
    this.audio.muted = muted
  }

  getMuted() {
    return this.audio.muted
  }

  setLoop(loop) {
    this.audio.loop = loop
  }

  getLoop() {
    return this.audio.loop
  }

  getDuration() {
    return this.currentTrack.duration
  }

  getCurrentTimeCalculated() {
    return (this.audio.currentTime / this.audio.duration) * 100
  }

  getCurrentTime() {
    return this.audio.currentTime
  }

  getCurrentTimeFormatted() {
    return formatTime(this.audio.currentTime) ?? '0:00'
  }

  setSrc(src) {
    this.audio.src = src
  }

  getSrc() {
    return this.audio.src
  }

  setAutoplay(autoplay) {
    this.audio.autoplay = autoplay
  }

  getAutoplay() {
    return this.audio.autoplay
  }

  setControls(controls) {
    this.audio.controls = controls
  }

  getControls() {
    return this.audio.controls
  }

  setCrossOrigin(crossOrigin) {
    this.audio.crossOrigin = crossOrigin
  }

  getCrossOrigin() {
    return this.audio.crossOrigin
  }

  setPreload(preload) {
    this.audio.preload = preload
  }

  getPreload() {
    return this.audio.preload
  }

  getPaused() {
    return this.audio.paused
  }

  getTracks() {
    return this.arrayTracks
  }

  nextTrack(event) {
    const nextTrackIndex = this.prevTrackIndex + 1
    const nextTrack = this.getTracks()[nextTrackIndex]
    const nextSrc = nextTrack?.src

    if (nextSrc) {
      this.prevTrackIndex = nextTrackIndex
      this.setCurrentTrack(nextTrack)
      this.setSrc(nextSrc)
      this.setAutoplay(true)

      if (event && typeof event === 'function') {
        event(this.getCurrentTrack())
      }

      return this.getCurrentTrack()
    } else {
      if (event && typeof event === 'function') {
        event({ ...this.getCurrentTrack(), end: true })
      }
    }
  }

  prevTrack(event) {
    const prevTrackIndex = this.prevTrackIndex - 1
    const prevTrack = this.getTracks()[prevTrackIndex]
    const prevSrc = prevTrack?.src

    if (prevSrc) {
      this.prevTrackIndex = prevTrackIndex
      this.setCurrentTrack(prevTrack)
      this.setSrc(prevSrc)
      this.setAutoplay(true)

      if (event && typeof event === 'function') {
        event(this.getCurrentTrack())
      }

      return this.getCurrentTrack()
    } else {
      if (event && typeof event === 'function') {
        event({ ...this.getCurrentTrack(), initial: true })
      }
    }
  }
}

function formatTime(time) {
  if (!time) return '0:00'
  const minutes = Math.floor(time / 60)
  const seconds = Math.floor(time % 60)
    .toString()
    .padStart(2, '0')
  return `${minutes}:${seconds}`
}
