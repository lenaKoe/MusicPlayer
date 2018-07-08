export class AudioElement{
    constructor(tag, playButton, pauseButton, volumeDownButton, volumeOffButton, volumeOnButton, volumeUpButton, progress, displayCurrentTime, displayFullTime, artistHeading, titleHeading, coverImage) {

        this.tag = tag;
        this.audioSource = this.tag.querySelector("#source");
        this.playButton = playButton;
        this.pauseButton = pauseButton;
        this.volumeDownButton = volumeDownButton;
        this.volumeOffButton = volumeOffButton;
        this.volumeOnButton = volumeOnButton;
        this.volumeUpButton = volumeUpButton;
        this.progress = progress;
        this.displayCurrentTime = displayCurrentTime;
        this.displayFullTime = displayFullTime;
        this.artistHeading = artistHeading;
        this.titleHeading = titleHeading;
        this.coverImage = coverImage;
        this.isPaused = false;
        this.tag.volume = 0.5;
        this.isClicked = false;

        this.play = this.play.bind(this);
        this.pause = this.pause.bind(this);
        this.increaseVolume = this.increaseVolume.bind(this);
        this.decreaseVolume = this.decreaseVolume.bind(this);
        this.volumeOff = this.volumeOff.bind(this);
        this.volumeOn = this.volumeOn.bind(this);
        this.setMetadata = this.setMetadata.bind(this);
        this.getCurrentTime = this.getCurrentTime.bind(this);
        this.setSong = this.setSong.bind(this);

        this.tag.addEventListener("timeupdate", this.setTime.bind(this));
        this.tag.addEventListener("timeupdate", this.updateBar.bind(this));
    }

    setMetadata(song) {
        this.titleHeading.innerHTML = song.getTitle();
        this.artistHeading.innerHTML = song.getArtist();
        this.coverImage.style.backgroundImage = "url(" + song.getCover() + ")";
    }

    setSong(song) {
        this.audioSource.setAttribute("src", song.getSource());
        this.tag.load();
    }

    play() {
        this.tag.play();
        this.playButton.style.display = "none";
        this.pauseButton.classList.remove("d-none");
    }

    pause() {
        this.tag.pause();
        this.playButton.style.display = "";
        this.pauseButton.classList.add("d-none");
    }

    increaseVolume() {
        this.tag.volume = this.tag.volume > 0.9 ? 1.0 : this.tag.volume + 0.1;
    }

    decreaseVolume() {
        this.tag.volume = this.tag.volume < 0.1 ? 0.0 : this.tag.volume - 0.1;
    }

    volumeOff() {
        this.tag.volume = 0.0;
        this.volumeOffButton.style.display = "none";
        this.volumeOnButton.classList.remove("d-none");
    }

    volumeOn() {
        this.tag.volume = 0.5;
        this.volumeOnButton.classList.add("d-none");
        this.volumeOffButton.style.display = "";
    }

    updateBar() {
        var percentage = this.tag.currentTime / this.tag.duration * 100 + "%";
        this.progress.style.width = percentage;
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

    setTime() {
        this.displayCurrentTime.innerHTML = this.convertTime(this.tag.currentTime);
        this.displayFullTime.innerHTML = this.convertTime(this.tag.duration);
    }

    getCurrentTime() {
        return this.tag.currentTime;
    }
}