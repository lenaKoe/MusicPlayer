import UIElements from "./UIManager";

export class PlaylistManager {

    constructor(playlists) {
        this.playlists = playlists;
        this.currentListIndex = 0;

        this.getActivePlaylist = this.getActivePlaylist.bind(this);
    }

    getPlaylists() {
        return this.playlists;
    }

    switchToList(index) { 
        this.currentListIndex = index;
    }

    getActivePlaylist() {
        return this.playlists[this.currentListIndex];
    }
}