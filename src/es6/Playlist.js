import { runInThisContext } from "vm";

export class Playlist{
    constructor(songs, listTitle) {
        this.songs = songs;
        this.listTitle = listTitle;
        this.currentSongIndex = 0;
        
        this.switchToSong = this.switchToSong.bind(this);
        this.getCurrentSong = this.getCurrentSong.bind(this);
        this.getNextSong = this.getNextSong.bind(this);
        this.getPreviousSong = this.getPreviousSong.bind(this);
    }

    getListTitle(){
        return this.listTitle;
    }

    getSongs(){
        return this.songs;
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

    // createPlaylist(name){
    //     //id
    // }
    // addSongToPlaylist(playlistId, song) {    
    //}
    //static createPlaylist(songs) {
    // }