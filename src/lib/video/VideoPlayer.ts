import { PlayerState } from "../constants";
import { MultiVideoPlayer, VideoPlayerOptions } from "../main";
import { Logger } from "../utils";

const noop = () => {};
class VideoPlayer {
	public videoId: string;
	public videoPlayerConfig: VideoPlayerOptions;
	private player: MultiVideoPlayer;
	public controls: boolean;
	public main: boolean;
	public videoPlayerArea: Element | null;
	public videoElement: HTMLVideoElement | null;
	public videoState: PlayerState;
	private readonly _startSeconds: number;
	private readonly loop: boolean;
	public isPlaying: boolean;
	constructor(
		player: MultiVideoPlayer,
		videoPlayerConfig: VideoPlayerOptions
	) {
		this.videoId = Math.random().toString(36).substring(2, 15);
		this.player = player;
		this.videoPlayerConfig = videoPlayerConfig;
		this.main = this.videoPlayerConfig.main ?? false;
		this.controls =
			this.videoPlayerConfig.controls ?? player.options.controls ?? true;
		this.loop = player.options.loop ?? false;

		this._startSeconds = parseFloat(
			String(this.videoPlayerConfig.startSeconds ?? 0)
		);

		this.videoPlayerArea = null;
		this.videoElement = null;
		this.videoState = PlayerState.LOADING;
		this.isPlaying = false;

		this.mount();
	}

	private mount() {
		this.render();
		this.videoElement = document.querySelector(
			`#video_player_${this.videoId}`
		);

		if (!this.videoElement) {
			return Logger.debug("video element not found");
		}

		this.setupVideoElement({ controls: this.controls, main: this.main });

		this.videoElement.addEventListener(
			"play",
			this.onStateChange.bind(this, PlayerState.PLAYING),
			false
		);
		this.videoElement.addEventListener(
			"pause",
			this.onStateChange.bind(this, PlayerState.PAUSE),
			false
		);
		this.videoElement.addEventListener(
			"seeking",
			this.onSeeking.bind(this),
			false
		);
		this.videoElement.addEventListener(
			"timeupdate",
			this.onTimeUpdate.bind(this),
			false
		);
		this.videoElement.addEventListener(
			"loadeddata",
			this.onReady.bind(this),
			false
		);
		this.videoElement.addEventListener(
			"canplaythrough",
			this.onStateChange.bind(this, PlayerState.UNSTARTED),
			false
		);

		this.videoElement.addEventListener(
			"ended",
			this.onStateChange.bind(this, PlayerState.ENDED),
			false
		);
		this.videoElement.addEventListener(
			"waiting",
			this.onStateChange.bind(this, PlayerState.BUFFERING),
			false
		);
	}

	private onReady() {
		Logger.debug(this.videoId, "::[onReady]");
		this.timeTo(0);
		this.player.onReady();
	}

	private onSeeking() {
		Logger.debug(this.videoId, "::[onSeeking]");
		if (!this.main) {
			return;
		}
		this.player.onTimeUpdate(this, this.getPlayedTime());
	}

	private onTimeUpdate() {
		if (!this.main) {
			return;
		}
		this.player.onTimeUpdate(this, this.getPlayedTime());
	}

	private onStateChange(state: PlayerState) {
		Logger.debug(this.videoId, "::[onStateChange]", state);
		this.videoState = state;

		const statesToPropagate = [
			PlayerState.BUFFERING,
			PlayerState.PLAYING,
			PlayerState.PAUSE,
			PlayerState.ENDED,
			PlayerState.UNSTARTED,
		];

		if (state === PlayerState.PLAYING) {
			this.isPlaying = true;
			if (!this.main) {
				return;
			}
		}

		if (state === PlayerState.PAUSE) {
			this.isPlaying = false;
			if (!this.main) {
				return;
			}
		}

		if (statesToPropagate.includes(state)) {
			this.player.changeState(state, this);
		}
	}

	private render() {
		// if video area is defined, add video to area
		this.videoPlayerArea = document.querySelector(
			this.videoPlayerConfig.id
		);
		if (!this.videoPlayerArea) {
			return Logger.debug("id not found: ", this.videoPlayerConfig.id);
		}
		this.videoPlayerArea.innerHTML = `
        <video 
            id="video_player_${this.videoId}"
            src="${this.videoPlayerConfig.initialSrc}"
            style="width:fit-content;height:inherit;"
        >
        </video>
    `;
	}

	private setupVideoElement(options: { controls: boolean; main: boolean }) {
		this.setControls(options.controls);
		this.setMain(options.main);
	}

	public _swap(videoPlayer: VideoPlayer) {
		if (!this.videoElement || !videoPlayer.videoElement) return;
		const nodeA = this.videoElement;
		const nodeB = videoPlayer.videoElement;
		const parentA = nodeA.parentNode;
		const parentB = nodeB.parentNode;

		if (!parentA || !parentB) throw new Error("Parent node not found");

		const siblingA =
			nodeA.nextSibling === nodeB ? nodeA : nodeA.nextSibling;
		parentB.insertBefore(nodeA, nodeB);
		parentA.insertBefore(nodeB, siblingA);

		const thisControls = this.controls;
		const thisMain = this.main;
		this.setupVideoElement({
			controls: videoPlayer.controls,
			main: videoPlayer.main,
		});
		videoPlayer.setupVideoElement({
			controls: thisControls,
			main: thisMain,
		});
	}

	/**
	 * -------------------------------
	 * PUBLIC METHODS FOR VIDEO PLAYER
	 * -------------------------------
	 */

	public async play() {
		if (!this.videoElement) return;
		if (this.videoState === PlayerState.PLAYING) return;
		await this.videoElement.play().catch(noop);
	}

	public async pause() {
		if (!this.videoElement) return;
		if (this.videoState === PlayerState.PAUSE) return;
		await this.videoElement.pause();
	}

	public stop() {
		if (!this.videoElement) return;
		this.videoElement.pause();
		this.timeTo(this.getDuration() - 0.5);
	}

	public setControls(controls: boolean) {
		if (!this.videoElement) return;
		this.videoElement.controls = controls;
		this.controls = controls;
	}

	public setMain(main: boolean) {
		this.main = main;
	}

	public timeTo(time: number) {
		if (!this.videoElement) return;
		time = parseFloat(time.toString());
		time = time + this._startSeconds;

		if (time >= this.getDuration()) {
			this.videoElement.currentTime = this.getDuration() - 0.05;
			Logger.debug("timeTo: time is greater than duration");
			this.pause().then(noop);
			return;
		}

		Logger.debug("set time to: ", time);
		this.videoElement.currentTime = time;
	}

	public getDuration() {
		return this.videoElement?.duration || 0;
	}

	public getPlayLength() {
		return this.getDuration() - this._startSeconds;
	}

	public getCurrentTime() {
		return this.videoElement?.currentTime || 0;
	}

	public getPlayedTime() {
		const time = this.getCurrentTime() - this._startSeconds;
		return Math.max(time, 0);
	}

	public isEnded() {
		const diff = Math.abs(this.getCurrentTime() - this.getDuration());
		return diff < 0.1;
	}
}

export default VideoPlayer;
