import {
    AudioElement
} from "./AudioElement"; //-> Warum hatten wir das Audio Element importiert?

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
    items: document.getElementsByClassName("playlist-item"),
    tag: document.getElementById("audio-element"),
    displayCurrentTime: document.getElementById("current-time"),
    displayFullTime: document.getElementById("duration"),
    lists: document.getElementsByClassName("list-title"),
    playTitle: document.getElementById("playlist-title")
}

export default UIElements;

export class UIManager {
    constructor() {}

    static setMetadata(song) {
        UIElements.titleHeading.innerHTML = song.getTitle();
        UIElements.artistHeading.innerHTML = song.getArtist();
        UIElements.coverImage.style.backgroundImage = "url(" + song.getCover() + ")";
    }

    static setListTitle(playlist) {
        UIElements.playTitle.innerHTML = playlist;
    }

    //Beim Playlist bauen nicht das Div als default kopieren
    static buildPlaylist(songs) {
        console.log(UIElements.items.length);
        if (UIElements.items.length > 1) {
            console.log("Da muss was gelöscht werden")
            for (var i = 1; i < UIElements.items.length; i++) {
                var original = UIElements.items[i];
                var parent = original.parentNode;
                original.parentNode.removeChild(original);
                console.log(parent);
            }
        }
        UIElements.artistsRow[0].innerHTML = songs[0].getArtist();
        UIElements.titlesRow[0].innerHTML = songs[0].getTitle();
        UIElements.durationsRow[0].innerHTML = songs[0].getDuration();
        for (var i = 1; i < songs.length; i++) {
            var original = UIElements.items[0];
            var copy = original.cloneNode(true);
            original.parentNode.appendChild(copy);
            UIElements.artistsRow[0].innerHTML = songs[i].getArtist();
            UIElements.titlesRow[0].innerHTML = songs[i].getTitle();
            UIElements.durationsRow[0].innerHTML = songs[i].getDuration();
        }
    }

    static buildPlaylistTitles(playlists) {
        UIElements.lists[0].innerHTML = playlists[0].getListTitle();
        for (var i = 1; i < playlists.length; i++) {
            var original = UIElements.lists[0];
            var copy = original.cloneNode(true);
            original.parentNode.appendChild(copy);
            UIElements.lists[0].innerHTML = playlists[i].getListTitle();
        }
    }

    static setListIndex(playlists) {
        for (var i = 0; i < UIElements.lists.length; i++) {
            var listTitle = UIElements.lists[i].innerHTML;
            UIElements.lists[i].dataset.indexNumber = playlists.findIndex(function (playlist) {
                return listTitle === playlist.getListTitle();
            })
        }
    }

    static setDataIndex(songs) {
        for (var i = 0; i < UIElements.items.length; i++) {
            var title = UIElements.items[i].getElementsByClassName("title-item")[0].innerHTML;
            UIElements.items[i].dataset.indexNumber = songs.findIndex(function (song) {
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