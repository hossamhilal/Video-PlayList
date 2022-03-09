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
    let videoDuration = li.querySelector('.videoDuration');
    let vidSrc = video.src;
    let duration = video.duration;
    let totalMin = Math.floor(duration / 60);
    let totalSec = Math.floor(duration % 60);

    li.setAttribute('src', vidSrc);
    li.setAttribute('data-index', `${i + 1}`); 

    // if totalSec is less then 10 then add 0 at the beginging
    totalSec < 10 ? totalSec = "0"+ totalSec : totalSec ;

    videoDuration.innerText = `${totalMin}:${totalSec}`;

        // adding t duration attribe which we'll use below
    li.setAttribute('data-duration', `${totalMin}:${totalSec}`);         

    video.addEventListener('loadeddata', ()=>{
        
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
    let vid = videosList[indexNumb- 1];
    mainVideo.src = vid.src;

    // Call videoEnded Function
    mainVideo.addEventListener('ended',videoEnded,false);
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
    $('.dialog').hide();
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

// Show Dialog when End
function videoEnded(e) {
    $('.dialog').css('display' , 'flex');
    $('.dialogBtn').on('click',(e)=>{
        let action = e.target.getAttribute('data-action');
        if(action == 'confirm') {
            let currentLi = document.querySelector('.playing');
            let currentIndex = currentLi.getAttribute('data-index');
            console.log({currentIndex})
            let nextIndex = parseInt(currentIndex)+ 1;
            console.log({nextIndex})
            let nextLi = document.querySelector(`li[data-index='${nextIndex}']`);
            console.log({nextLi})
            nextLi.click();
            $('.dialog').hide();
        } else {
            $('.dialog').hide();
        } 
    })
}

