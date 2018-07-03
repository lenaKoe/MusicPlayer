
import { AudioElement } from "./AudioElement";
import { Playlist } from "./Playlist";
import { Song } from "./Song";


var tag = document.getElementById("audio-element");
var playButton = document.getElementById("play-button");
var pauseButton = document.getElementById("pause-button");
var volumeOffButton = document.getElementById("volumeoff-button");
var volumeOnButton = document.getElementById("volumeon-button");
var volumeDownButton = document.getElementById("volumedown-button");
var volumeUpButton = document.getElementById("volumeup-button");
var backwardButton = document.getElementById("backward-button");
var forwardButton = document.getElementById("forward-button");
var progress = document.getElementById("current-progress");
var duration = tag.duration;
var displayCurrentTime = document.getElementById("current-time");
var displayFullTime = document.getElementById("duration");
var artistHeading = document.getElementById("big-artist-heading");
var titleHeading = document.getElementById("big-title-heading");
var audioSource = document.getElementById("source");
var coverImage = document.getElementById("cover-image");
var titlesRow = document.getElementsByClassName("title-item");
var artistsRow = document.getElementsByClassName("artist-item");
var durationsRow = document.getElementsByClassName("duration-item");
var playlistRow = document.getElementById("playlist-row");
var item = document.getElementsByClassName("playlist-item");

var audioElement = new AudioElement(tag, playButton, pauseButton, volumeDownButton, volumeOffButton, volumeOnButton, volumeUpButton, progress, displayCurrentTime, displayFullTime, artistHeading, titleHeading, coverImage);

var song1 = new Song("HTML", "Riot", "../../src/img/cover/HTML.jpg", "src/audio/HTML.mp3");
var song2 = new Song("If I had a Chicken", "Kevin MacLeodt", "../../src/img/cover/chicken.jpg", "src/audio/If_I_Had_a_Chicken.mp3");
var song3 = new Song("Overcome", "Ugonna Onyekwe", "../../src/img/cover/overcome.jpg", "src/audio/Overcome.mp3");
var song4 = new Song("Stranger Danger", "Francis Preve", "../../src/img/cover/danger.jpg", "src/audio/Stranger_Danger.mp3");
var song5 = new Song("Abracadabra", "Silent Partner", "../../src/img/cover/magic.jpg", "src/audio/Abracadabra.mp3");
var song6 = new Song("Auld Lang Syne", "Jingle Punks", "../../src/img/cover/old-lang-syne.jpg", "src/audio/Auld_Lang_Syne_Instrumental.mp3");
var song7 = new Song("Away in a Manger", "Audionautix", "../../src/img/cover/manger.jpg", "src/audio/Away_In_A_Manger.mp3");
var song8 = new Song("Hark the Herald Angels Sing", "Jingle Punks", "../../src/img/cover/angels.jpg", "src/audio/Hark_the_Herald_Angels_Sing_Vocals.mp3");
var song9 = new Song("Joy to the World", "Jingle Punks", "../../src/img/cover/joy-to-the-world.jpg", "src/audio/Joy_to_the_World_Vocals.mp3");
var song10 = new Song("O Come All Ye Faithful", "Jingle Punks", "../../src/img/cover/faithful.jpg", "src/audio/O_Come_All_Ye_Faithful_Instrumental.mp3");
var song11 = new Song("We Wish You a Merry Christmas", "Twin Musicom", "../../src/img/cover/merry-christmas.jpg", "src/audio/We_Wish_You_a_Merry_Christmas.mp3");
var song12 = new Song("The Black Cat", "Aaron Kenny", "../../src/img/cover/cat.jpg", "src/audio/The_Black_Cat.mp3");

var songs = [song1, song2, song3, song4, song5, song6, song7, song8, song9, song10, song11, song12];
var playlist = null;

window.addEventListener("load", function () {
    playlist = new Playlist(songs, titlesRow, artistsRow, durationsRow, playlistRow, item);
    for (var i = 0; i < item.length; i++) {
        item[i].addEventListener("click", function () {
            ;
            var index = this.getAttribute("data-index-number");
            playlist.switchToSong(index);
            audioElement.setSong(playlist.getCurrentSong());
            audioElement.play();
        });
    }
});
backwardButton.addEventListener("click", function () {
    audioElement.setSong(playlist.getCurrentSong());
    audioElement.play();
});
forwardButton.addEventListener("click", function () {
    audioElement.setSong(playlist.getCurrentSong());
    audioElement.play();
});
playButton.addEventListener("click", function () {
    audioElement.play();
});
pauseButton.addEventListener("click", function () {
    audioElement.pause();
});
volumeUpButton.addEventListener("click", function () {
    audioElement.increaseVolume();
});
volumeDownButton.addEventListener("click", function () {
    audioElement.decreaseVolume();
});
volumeOffButton.addEventListener("click", function () {
    audioElement.volumeOff();
});
volumeOnButton.addEventListener("click", function () {
    audioElement.volumeOn();
});
tag.addEventListener("canplay", function () {
    audioElement.setMetadata(playlist.getCurrentSong());
});