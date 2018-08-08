export class Song{
    constructor(title, artist, cover, source, duration) {
        this.title = title;
        this.artist = artist;
        this.cover = cover;
        this.source = source;
        this.duration = duration;
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

    getDuration() {
        return this.duration;
    }
}