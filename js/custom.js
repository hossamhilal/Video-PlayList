/*global $ */

const mainVideo = document.querySelector('#mainVideo'),
      playlist = document.getElementById('playlist');
let videosList = [... document.getElementsByClassName('videoItem')];

// Get Total Videos Number
$('.count').text(videosList.length);

// Get Length for Each Video
for(let i = 0; i < videosList.length; i++){
    let video = videosList[i];
    let li = video.parentElement;
    video.addEventListener('loadeddata', ()=>{
        let duration = video.duration;
        let totalMin = Math.floor(duration / 60);
        let totalSec = Math.floor(duration % 60);
        
        // if totalSec is less then 10 then add 0 at the beginging
        totalSec < 10 ? totalSec = "0"+ totalSec : totalSec ;

        let videoDuration = li.querySelector('.videoDuration');
        videoDuration.innerText = `${totalMin}:${totalSec}`;

        // adding t duration attribe which we'll use below
        li.setAttribute('data-duration', `${totalMin}:${totalSec}`);
        li.setAttribute('data-index', `${i + 1}`);
    })  
}

// Load video of first Index
let videoIndex = 1;
window.addEventListener('load',()=>{
    loadMusic(videoIndex);
    playingNow();
})

// Play Video
function playMusic(){
    mainVideo.play();
}

// Load video of Current Index
function loadMusic(indexNumb){
    mainVideo.src = videosList[indexNumb - 1].src;
}

// Get particular video Information on click
const allLiTags = playlist.querySelectorAll('li');
function playingNow(){
    for(let j = 0; j<videosList.length; j++){
        if(allLiTags[j].classList.contains('playing')){
            allLiTags[j].classList.remove("playing")
        }
        if(allLiTags[j].getAttribute('data-index') == videoIndex){
            allLiTags[j].classList.add('playing');

            let vidName = $(allLiTags[j]).find('label').text();
            $('.VidTitle').text(vidName);
            let vidTime = $(allLiTags[j]).data('duration');
            $('.vidDuration').text(vidTime);
        }
        // adding onclick attribute in all li tags
        allLiTags[j].setAttribute("onclick", "clicked(this)")
    }
}

// Play particular video on click
function clicked(element){
    let getIndex = element.getAttribute('data-index');
    videoIndex = getIndex;
    loadMusic(videoIndex);
    playMusic();
    playingNow();

    let vidName = $(element).find('label').text();
    $('.VidTitle').text(vidName);
    let vidTime = $(element).data('duration');
    $('.vidDuration').text(vidTime);
}

