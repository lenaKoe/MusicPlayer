(function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
    "use strict";
    
    Object.defineProperty(exports, "__esModule", {
        value: true
    });
    
    var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
    
    function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
    
    var AudioElement = exports.AudioElement = function () {
        function AudioElement(tag, playButton, pauseButton, volumeDownButton, volumeOffButton, volumeOnButton, volumeUpButton, progress, displayCurrentTime, displayFullTime, artistHeading, titleHeading, coverImage) {
            _classCallCheck(this, AudioElement);
    
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
    
        _createClass(AudioElement, [{
            key: "setMetadata",
            value: function setMetadata(song) {
                this.titleHeading.innerHTML = song.getTitle();
                this.artistHeading.innerHTML = song.getArtist();
                this.coverImage.style.backgroundImage = "url(" + song.getCover() + ")";
            }
        }, {
            key: "setSong",
            value: function setSong(song) {
                this.audioSource.setAttribute("src", song.getSource());
                this.tag.load();
            }
        }, {
            key: "play",
            value: function play() {
                this.tag.play();
                this.playButton.style.display = "none";
                this.pauseButton.classList.remove("d-none");
            }
        }, {
            key: "pause",
            value: function pause() {
                this.tag.pause();
                this.playButton.style.display = "";
                this.pauseButton.classList.add("d-none");
            }
        }, {
            key: "increaseVolume",
            value: function increaseVolume() {
                this.tag.volume = this.tag.volume > 0.9 ? 1.0 : this.tag.volume + 0.1;
            }
        }, {
            key: "decreaseVolume",
            value: function decreaseVolume() {
                this.tag.volume = this.tag.volume < 0.1 ? 0.0 : this.tag.volume - 0.1;
            }
        }, {
            key: "volumeOff",
            value: function volumeOff() {
                this.tag.volume = 0.0;
                this.volumeOffButton.style.display = "none";
                this.volumeOnButton.classList.remove("d-none");
            }
        }, {
            key: "volumeOn",
            value: function volumeOn() {
                this.tag.volume = 0.5;
                this.volumeOnButton.classList.add("d-none");
                this.volumeOffButton.style.display = "";
            }
        }, {
            key: "updateBar",
            value: function updateBar() {
                var percentage = this.tag.currentTime / this.tag.duration * 100 + "%";
                this.progress.style.width = percentage;
            }
        }, {
            key: "convertTime",
            value: function convertTime(myTime) {
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
        }, {
            key: "setTime",
            value: function setTime() {
                this.displayCurrentTime.innerHTML = this.convertTime(this.tag.currentTime);
                this.displayFullTime.innerHTML = this.convertTime(this.tag.duration);
            }
        }, {
            key: "getCurrentTime",
            value: function getCurrentTime() {
                return this.tag.currentTime;
            }
        }]);
    
        return AudioElement;
    }();
    
    },{}],2:[function(require,module,exports){
    "use strict";
    
    Object.defineProperty(exports, "__esModule", {
        value: true
    });
    
    var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
    
    function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
    
    var Playlist = exports.Playlist = function () {
        function Playlist(songs, titlesRow, artistsRow, durationsRow, playlistRow, item) {
            _classCallCheck(this, Playlist);
    
            this.songs = songs;
            this.titlesRow = titlesRow;
            this.artistsRow = artistsRow;
            this.durationsRow = durationsRow;
            this.playlistRow = playlistRow;
            this.item = item;
            this.currentSongIndex = 0;
    
            this.createPlaylist = this.createPlaylist.bind(this);
            this.getCurrentSong = this.getCurrentSong.bind(this);
            this.getPreviousSong = this.getPreviousSong.bind(this);
            this.getNextSong = this.getNextSong.bind(this);
            this.switchToSong = this.switchToSong.bind(this);
    
            this.createPlaylist();
        }
    
        _createClass(Playlist, [{
            key: "createPlaylist",
            value: function createPlaylist() {
                this.artistsRow[0].innerHTML = this.songs[0].getArtist();
                this.titlesRow[0].innerHTML = this.songs[0].getTitle();
                for (var i = 1; i < this.songs.length; i++) {
                    var original = this.playlistRow;
                    var copy = original.cloneNode(true);
                    original.parentNode.appendChild(copy);
                    this.artistsRow[0].innerHTML = this.songs[i].getArtist(); //ist [0] nicht unlogisch?
                    this.titlesRow[0].innerHTML = this.songs[i].getTitle();
                }
    
                this.item[0].classList.add("active-song");
    
                for (var i = 0; i < this.item.length; i++) {
                    var title = this.item[i].getElementsByClassName("title-item")[0].innerHTML;
                    this.item[i].dataset.indexNumber = this.songs.findIndex(function (song) {
                        return title === song.getTitle();
                    });
                }
            }
        }, {
            key: "switchToSong",
            value: function switchToSong(index) {
                this.currentSongIndex = index;
            }
        }, {
            key: "getCurrentSong",
            value: function getCurrentSong() {
                return this.songs[this.currentSongIndex];
            }
        }, {
            key: "getNextSong",
            value: function getNextSong() {
                this.currentSongIndex = this.currentSongIndex === this.songs.length - 1 ? 0 : this.currentSongIndex + 1;
                return this.getCurrentSong();
            }
        }, {
            key: "getPreviousSong",
            value: function getPreviousSong() {
                this.currentSongIndex = this.currentSongIndex === 0 ? this.songs.length - 1 : this.currentSongIndex - 1; //This.currentSong Index wird bei wahr (=1. Song) auf den letzten Song in der Playlist gesetzt und bei false auf den vorherigen
                return this.getCurrentSong();
            }
        }]);
    
        return Playlist;
    }();
    
    },{}],3:[function(require,module,exports){
    "use strict";
    
    Object.defineProperty(exports, "__esModule", {
        value: true
    });
    
    var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
    
    function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
    
    var Song = exports.Song = function () {
        function Song(title, artist, cover, source) {
            _classCallCheck(this, Song);
    
            this.title = title;
            this.artist = artist;
            this.cover = cover;
            this.source = source;
        }
    
        _createClass(Song, [{
            key: "getTitle",
            value: function getTitle() {
                return this.title;
            }
        }, {
            key: "getArtist",
            value: function getArtist() {
                return this.artist;
            }
        }, {
            key: "getCover",
            value: function getCover() {
                return this.cover;
            }
        }, {
            key: "getSource",
            value: function getSource() {
                return this.source;
            }
        }]);
    
        return Song;
    }();
    
    },{}],4:[function(require,module,exports){
    'use strict';
    
    var _AudioElement = require('./AudioElement');
    
    var _Song = require('./Song');
    
    var _Playlist = require('./Playlist');
    
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
    
    var audioElement = new _AudioElement.AudioElement(tag, playButton, pauseButton, volumeDownButton, volumeOffButton, volumeOnButton, volumeUpButton, progress, displayCurrentTime, displayFullTime, artistHeading, titleHeading, coverImage);
    
    var song1 = new _Song.Song("HTML", "Riot", "../../src/img/cover/HTML.jpg", "src/audio/HTML.mp3");
    var song2 = new _Song.Song("If I had a Chicken", "Kevin MacLeodt", "../../src/img/cover/chicken.jpg", "src/audio/If_I_Had_a_Chicken.mp3");
    var song3 = new _Song.Song("Overcome", "Ugonna Onyekwe", "../../src/img/cover/overcome.jpg", "src/audio/Overcome.mp3");
    var song4 = new _Song.Song("Stranger Danger", "Francis Preve", "../../src/img/cover/danger.jpg", "src/audio/Stranger_Danger.mp3");
    var song5 = new _Song.Song("Abracadabra", "Silent Partner", "../../src/img/cover/magic.jpg", "src/audio/Abracadabra.mp3");
    var song6 = new _Song.Song("Auld Lang Syne", "Jingle Punks", "../../src/img/cover/old-lang-syne.jpg", "src/audio/Auld_Lang_Syne_Instrumental.mp3");
    var song7 = new _Song.Song("Away in a Manger", "Audionautix", "../../src/img/cover/manger.jpg", "src/audio/Away_In_A_Manger.mp3");
    var song8 = new _Song.Song("Hark the Herald Angels Sing", "Jingle Punks", "../../src/img/cover/angels.jpg", "src/audio/Hark_the_Herald_Angels_Sing_Vocals.mp3");
    var song9 = new _Song.Song("Joy to the World", "Jingle Punks", "../../src/img/cover/joy-to-the-world.jpg", "src/audio/Joy_to_the_World_Vocals.mp3");
    var song10 = new _Song.Song("O Come All Ye Faithful", "Jingle Punks", "../../src/img/cover/faithful.jpg", "src/audio/O_Come_All_Ye_Faithful_Instrumental.mp3");
    var song11 = new _Song.Song("We Wish You a Merry Christmas", "Twin Musicom", "../../src/img/cover/merry-christmas.jpg", "src/audio/We_Wish_You_a_Merry_Christmas.mp3");
    var song12 = new _Song.Song("The Black Cat", "Aaron Kenny", "../../src/img/cover/cat.jpg", "src/audio/The_Black_Cat.mp3");
    
    var songs = [song1, song2, song3, song4, song5, song6, song7, song8, song9, song10, song11, song12];
    var playlist = null;
    
    window.addEventListener("load", function () {
        playlist = new _Playlist.Playlist(songs, titlesRow, artistsRow, durationsRow, playlistRow, item);
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
    
    },{"./AudioElement":1,"./Playlist":2,"./Song":3}]},{},[4]);
    