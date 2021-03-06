/*global $ */

let mainVideo = document.querySelector('#mainVideo'),
    playlist = document.getElementById('playlist') ,
    videosList = [... document.getElementsByClassName('videoItem')];

// Get Total Videos Number
$('.count').text(videosList.length);

// Get Length for Each Video
let interv = setInterval(function() {
    for(let i = 0; i < videosList.length; i++){
        let video = videosList[i],
            vidSrc = video.src,
            duration = video.duration,
            totalMin = Math.floor(duration / 60),
            totalSec = Math.floor(duration % 60);
            li = video.parentElement,
            videoDuration = li.querySelector('.videoDuration'),
    
        li.setAttribute('src', vidSrc);
        li.setAttribute('data-index', `${i + 1}`); 
    
        // if totalSec is less then 10 then add 0 at the beginging
        totalSec < 10 ? totalSec = "0"+ totalSec : totalSec ;
        FDuration = `${totalMin}:${totalSec}`;
    
        videoDuration.innerText = FDuration ;
    
        // adding data duration attribe which we'll use below
        li.setAttribute('data-duration', FDuration);  
        
        // clearInterval(interv);
    }
}, 50);

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
    let vid = videosList[indexNumb- 1] ,
        parentNode = vid.parentNode ,
        nextLi = parentNode.nextElementSibling ,
        listLength = videosList.length ,
        playedIndex = parseInt(indexNumb);

    mainVideo.src = vid.src;

    // videoEnded Function
    mainVideo.onended = function() {
        playedIndex != listLength ? $('.dialog').css('display' , 'flex') : $('.dialog').hide();
        
        // Dialog Button Actions
        $('.dialogBtn').on('click',(e)=>{
            let action = e.target.getAttribute('data-action');
            action == 'confirm' ?  nextLi.click() : $('.dialog').hide();
            $('.dialog').hide()
        })
    };
    
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
    let getIndex = element.getAttribute('data-index') ,
        vidName = $(element).find('label').text() ,
        vidTime = $(element).data('duration');

    $('.dialog').hide();
    // Load & play video when clciked 
    videoIndex = getIndex;
    loadMusic(videoIndex);
    playMusic();
    playingNow();

    // Display video information 
    $('.VidTitle').text(vidName);
    $('.vidDuration').text(vidTime);
}


