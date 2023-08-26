declare module 'audio-giber' {
  export interface AudioTrack {
    id: number
    title: string
    src: string
    imageTrack: string
    subtitle?: string
    album?: string
    paused?: boolean
    end?: boolean
    initial?: boolean
    description?: string
    author?: string
    bitsVelocity?: number
    copyright?: string | boolean
    isDownloadable?: boolean
    duration?: string
  }

  export interface AudioGiberOptions {
    name?: string
    nameId?: string
    arrayTracks?: AudioTrack[]
    onEndContinueTrack?: boolean
    startInTrackIndex?: number
    DEV?: boolean
    src?: string
    preload?: boolean
    ready?: (track: AudioTrack) => void
    onEndTrack?: (track: AudioTrack) => void
    onPreloaded?: (track: AudioTrack) => void
    minimized?: boolean
  }

  export class AudioGiber {
    audio: HTMLAudioElement
    DEV?: boolean
    id?: number
    name?: string
    nameId?: string
    arrayTracks?: AudioTrack[]
    onEndContinueTrack?: boolean
    startInTrackIndex?: number
    src?: string
    preload?: boolean
    prevTrackIndex?: number
    onEndTrack?: () => void
    currentTrack?: AudioTrack
    description?: string
    minimized?: boolean

    constructor(options?: AudioGiberOptions)

    handleError(message: string, code: number): void
    checkErrors(): void
    setTrackAndIndex(index: number, arrayTracks: AudioTrack[]): void
    endedTrack(event?: (track: AudioTrack) => void): void
    onReadyTrack(event?: (track: AudioTrack) => void): void
    getCurrentTrack(): AudioTrack
    getImageTrack(): string | undefined
    togglePlay(handlePaused?: (paused: boolean) => void): void
    setCurrentTrack(track: AudioTrack): void
    getAudioMode(): boolean
    setAudioMode(mode: boolean): void
    getIdAudio(): number
    getName(): string
    play(): void
    pause(): void
    stop(): void
    setVolume(volume: number): void
    getVolume(): number
    setMuted(muted: boolean): void
    getMuted(): boolean
    setLoop(loop: boolean): void
    getLoop(): boolean
    getDuration(): string
    getCurrentTime(): number
    setSrc(src: string): void
    getSrc(): string
    setAutoplay(autoplay: boolean): void
    getAutoplay(): boolean
    setControls(controls: boolean): void
    getControls(): boolean
    setCrossOrigin(crossOrigin: string): void
    getCrossOrigin(): string
    setPreload(preload: boolean): void
    getPreload(): boolean
    getTracks(): AudioTrack[]
    getDescriptionTrack(): string
    nextTrack(event?: (track: AudioTrack) => void): AudioTrack
    prevTrack(event?: (track: AudioTrack) => void): AudioTrack
    getAuthorTrack(): string
    getBitsVelocityTrack(): number | 'Not implemented'
    destroy(): void
    preloadEvent(event: () => void): AudioTrack
    getPaused(): boolean
    getCurrentTime(): string
    isTrackEnded(
      event: (track: AudioTrack) => void
    ): (track: AudioTrack) => void
    getCurrentTimeCalculated(): number
    getCurrentTimeFormatted(): string
  }
}
