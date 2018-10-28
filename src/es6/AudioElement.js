import UIElements, { UIManager } from "./UIManager";
export class AudioElement {
    constructor(tag) {
        this.tag = tag;
        this.audioSource = this.tag.querySelector("#source");

        this.progress = document.getElementById("current-progress");
        this.displayCurrentTime = document.getElementById("current-time");
        this.displayFullTime = document.getElementById("duration");
        this.tag.volume = 0.5;

        this.play = this.play.bind(this);
        this.pause = this.pause.bind(this);
        this.increaseVolume = this.increaseVolume.bind(this);
        this.decreaseVolume = this.decreaseVolume.bind(this);
        this.volumeOff = this.volumeOff.bind(this);
        this.volumeOn = this.volumeOn.bind(this);
        this.setSong = this.setSong.bind(this);
        this.getProgress = this.getProgress.bind(this);
        this.getTime = this.getTime.bind(this);
    }

    setSong(song) {
        this.audioSource.setAttribute("src", song.getSource());
        UIElements.tag.load();
    }

    play() {
        UIElements.tag.play()
        UIManager.togglePlayPause();
        // .then(() => {
        //     console.log("Song is playing");
        // })
        // .catch((error) => {
        //    console.error("An Error occured");
        // })
    }

    pause() {
        this.tag.pause();
        UIManager.togglePausePlay();
    }

    increaseVolume() {
        this.tag.volume = this.tag.volume > 0.9 ? 1.0 : this.tag.volume + 0.1;
    }

    decreaseVolume() {
        this.tag.volume = this.tag.volume < 0.1 ? 0.0 : this.tag.volume - 0.1;
    }

    volumeOff() {
        this.tag.volume = 0.0;
        UIManager.toggleVolumeOff();
    }

    volumeOn() {
        this.tag.volume = 0.5;
        UIManager.toggleVolumeOn();
    }

    getProgress() {
        return this.tag.currentTime / this.tag.duration * 100 + "%";
    }

    convertTime(myTime) {
        var minutes = Math.floor(myTime / 60);
        var seconds = Math.round(myTime - minutes * 60);
        if (seconds < 10) {
            seconds = "0" + seconds;
        }
        if (minutes < 10) {
            minutes = "0" + minutes;
        }
        return minutes + ":" + seconds;
    }

    getTime() {
        return this.convertTime(this.tag.currentTime)
    }
}