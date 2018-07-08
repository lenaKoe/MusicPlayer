export class Playlist{
    constructor(songs, titlesRow, artistsRow, durationsRow, playlistRow, item) {
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

    createPlaylist() {
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

    switchToSong(index) {
        this.currentSongIndex = index;
    }

    getCurrentSong() {
        return this.songs[this.currentSongIndex];
    }

    getNextSong() {
        this.currentSongIndex = this.currentSongIndex === this.songs.length - 1 ? 0 : this.currentSongIndex + 1;
        return this.getCurrentSong();
    }

    getPreviousSong() {
        this.currentSongIndex = this.currentSongIndex === 0 ? this.songs.length - 1 : this.currentSongIndex - 1; //This.currentSong Index wird bei wahr (=1. Song) auf den letzten Song in der Playlist gesetzt und bei false auf den vorherigen
        return this.getCurrentSong();
    }
}