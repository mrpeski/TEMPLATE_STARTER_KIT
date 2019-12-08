import videojs from 'video.js';
import 'video.js/dist/video-js.min.css';


let options = {
    responsive: true,
};

function videoInit(){
    try {
        let player = videojs('tech-driven', options);
        let player2 = videojs('what-we-do', options);

        player.on('play', handleBegan);
        player.on('ended', handleEnded);
        player2.on('play', handleBegan);
        player2.on('ended', handleEnded);

    } catch (e) {

    }

    function handleEnded() {
        this.exitFullscreen();
        this.currentTime(0);
        // this.dispose();
        let po = this.poster();
        this.poster(po);
    }
    function handleBegan() {
        this.volume(0.32);
        this.requestFullscreen();
    }
}

videoInit();