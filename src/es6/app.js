import { AudioElement } from './AudioElement.js';
import { Playlist } from "./Playlist.js";
import { Song } from "./Song.js";
import  UIElements, { UIManager } from './UIManager.js';

var audioElement = new AudioElement(UIElements.tag);

var song1 = new Song("HTML", "Riot", "../../src/img/cover/HTML.jpg", "src/audio/HTML.mp3", "2:30");
var song2 = new Song("If I had a Chicken", "Kevin MacLeodt", "../../src/img/cover/chicken.jpg", "src/audio/If_I_Had_a_Chicken.mp3", "2:30");
var song3 = new Song("Overcome", "Ugonna Onyekwe", "../../src/img/cover/overcome.jpg", "src/audio/Overcome.mp3", "2:48");
var song4 = new Song("Stranger Danger", "Francis Preve", "../../src/img/cover/danger.jpg", "src/audio/Stranger_Danger.mp3", "1:54");
var song5 = new Song("Abracadabra", "Silent Partner", "../../src/img/cover/magic.jpg", "src/audio/Abracadabra.mp3", "2:14");
var song6 = new Song("Auld Lang Syne", "Jingle Punks", "../../src/img/cover/old-lang-syne.jpg", "src/audio/Auld_Lang_Syne_Instrumental.mp3", "2:03");
var song7 = new Song("Away in a Manger", "Audionautix", "../../src/img/cover/manger.jpg", "src/audio/Away_In_A_Manger.mp3", "3:08");
var song8 = new Song("Hark the Herald Angels Sing", "Jingle Punks", "../../src/img/cover/angels.jpg", "src/audio/Hark_the_Herald_Angels_Sing_Vocals.mp3", "2:18");
var song9 = new Song("Joy to the World", "Jingle Punks", "../../src/img/cover/joy-to-the-world.jpg", "src/audio/Joy_to_the_World_Vocals.mp3", "2:27");
var song10 = new Song("O Come All Ye Faithful", "Jingle Punks", "../../src/img/cover/faithful.jpg", "src/audio/O_Come_All_Ye_Faithful_Instrumental.mp3", "3:16");
var song11 = new Song("We Wish You a Merry Christmas", "Twin Musicom", "../../src/img/cover/merry-christmas.jpg", "src/audio/We_Wish_You_a_Merry_Christmas.mp3", "1:57");
var song12 = new Song("The Black Cat", "Aaron Kenny", "../../src/img/cover/cat.jpg", "src/audio/The_Black_Cat.mp3", "2:30");

var songs = [song1, song2, song3, song4, song5, song6, song7, song8, song9, song10, song11, song12];
var playlist = null;

window.addEventListener("load", function () {
    playlist = new Playlist(songs, "Alle Songs");
    for (var i = 0; i < UIElements.items.length; i++) {
        UIElements.items[i].addEventListener("mouseup", function () {
            const index = Number.parseInt(this.getAttribute("data-index-number"));
            playlist.switchToSong(index);
            audioElement.setSong(playlist.getCurrentSong());
            audioElement.play();
        });
    }
    console.log(playlist);
});



UIManager.buildPlaylist(songs);
UIManager.setDataIndex(songs);

UIElements.playButton.addEventListener("mouseup", function () {
    audioElement.play();
});

UIElements.backwardButton.addEventListener("mouseup", function () {
    audioElement.setSong(playlist.getPreviousSong());
    audioElement.play();
});

UIElements.forwardButton.addEventListener("mouseup", function () {
    audioElement.setSong(playlist.getNextSong());
    audioElement.play();
});

UIElements.pauseButton.addEventListener("mouseup", function () {
    audioElement.pause();
});

UIElements.volumeUpButton.addEventListener("mouseup", function () {
    audioElement.increaseVolume();
});

UIElements.volumeDownButton.addEventListener("mouseup", function () {
    audioElement.decreaseVolume();
});

UIElements.volumeOffButton.addEventListener("mouseup", function () {
    audioElement.volumeOff();
});

UIElements.volumeOnButton.addEventListener("mouseup", function () {
    audioElement.volumeOn();
});

UIElements.tag.addEventListener("canplay", function () {
    UIManager.setMetadata(playlist.getCurrentSong());
});

UIElements.tag.addEventListener("timeupdate", function() {
    const time = audioElement.getTime();
    const duration = playlist.getCurrentSong().getDuration();
    const progress = audioElement.getProgress();
    UIManager.setTime(time, duration);
    UIManager.setProgress(progress);
});