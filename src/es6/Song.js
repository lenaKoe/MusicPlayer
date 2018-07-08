export class Song{
    constructor(title, artist, cover, source) {
        this.title = title;
        this.artist = artist;
        this.cover = cover;
        this.source = source;
    }

    getTitle() {
        return this.title;
    }

    getArtist() {
        return this.artist;
    }

    getCover() {
        return this.cover;
    }

    getSource() {
        return this.source;
    }
}