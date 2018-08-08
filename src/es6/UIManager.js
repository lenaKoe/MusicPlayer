import { AudioElement } from "./AudioElement"; //-> Warum hatten wir das Audio Element importiert?

const UIElements = {
    playButton: document.getElementById("play-button"),
    pauseButton: document.getElementById("pause-button"),
    volumeOffButton: document.getElementById("volumeoff-button"),
    volumeOnButton: document.getElementById("volumeon-button"),
    volumeDownButton: document.getElementById("volumedown-button"),
    volumeUpButton: document.getElementById("volumeup-button"),
    backwardButton: document.getElementById("backward-button"),
    forwardButton: document.getElementById("forward-button"),
    artistHeading: document.getElementById("big-artist-heading"),
    titleHeading: document.getElementById("big-title-heading"),
    coverImage: document.getElementById("cover-image"),
    displayCurrentTime: document.getElementById("current-time"),
    displayFullTime: document.getElementById("duration"),
    progress: document.getElementById("current-progress"),
    titlesRow: document.getElementsByClassName("title-item"),
    artistsRow: document.getElementsByClassName("artist-item"),
    durationsRow: document.getElementsByClassName("duration-item"),
    playlistRow: document.getElementById("playlist-row"),
    items: document.getElementsByClassName("playlist-item"),
    tag: document.getElementById("audio-element"),
    displayCurrentTime: document.getElementById("current-time"),
    displayFullTime:document.getElementById("duration")
}

export default UIElements;

export class UIManager {
    constructor() {
    }

    static setMetadata(song) {
        UIElements.titleHeading.innerHTML = song.getTitle();
        UIElements.artistHeading.innerHTML = song.getArtist();
        UIElements.coverImage.style.backgroundImage = "url(" + song.getCover() + ")";
    }

    static buildPlaylist(songs) {
        UIElements.artistsRow[0].innerHTML = songs[0].getArtist();
        UIElements.titlesRow[0].innerHTML = songs[0].getTitle();
        UIElements.durationsRow[0].innerHTML = songs[0].getDuration();

        for (var i = 1; i < songs.length; i++) {
            var original = UIElements.playlistRow;
            var copy = original.cloneNode(true);
            original.parentNode.appendChild(copy);
            UIElements.artistsRow[0].innerHTML = songs[i].getArtist(); 
            UIElements.titlesRow[0].innerHTML = songs[i].getTitle();
            UIElements.durationsRow[0].innerHTML = songs[i].getDuration();0        
        }
    }

    static setDataIndex(songs) {
        UIElements.items[0].classList.add("active-song");

        for (var i = 0; i <  UIElements.items.length; i++) {
            var title =  UIElements.items[i].getElementsByClassName("title-item")[0].innerHTML;
            UIElements.items[i].dataset.indexNumber = songs.findIndex(function(song) {
                return title === song.getTitle();
            });
        }
    }

    static togglePlayPause() {
        UIElements.playButton.style.display = "none";
        UIElements.pauseButton.classList.remove("d-none");
    }

    static togglePausePlay() {
        UIElements.playButton.style.display = "";
        UIElements.pauseButton.classList.add("d-none");
    }

    static toggleVolumeOff() {
        UIElements.volumeOffButton.style.display = "none";
        UIElements.volumeOnButton.classList.remove("d-none");
    }

    static toggleVolumeOn() {
        UIElements.volumeOnButton.classList.add("d-none");
        UIElements.volumeOffButton.style.display = "";
    }

    static setTime(currentTime, duration) {
        UIElements.displayCurrentTime.innerHTML = currentTime;
        UIElements.displayFullTime.innerHTML = duration;
     }

     static setProgress(progress) {
         UIElements.progress.style.width = progress;
     }
}