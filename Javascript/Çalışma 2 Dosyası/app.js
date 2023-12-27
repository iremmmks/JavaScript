const  container=document.querySelector(".container");
const image =document.querySelector("#music-image");
const title=document.querySelector("#music-details .title");
const singer=document.querySelector("#music-details .singer");
const prev=document.querySelector("#controls #prev");
const play=document.querySelector("#controls #play");
const next=document.querySelector("#controls #next");
const duration=document.querySelector("#duration");
const currentTime=document.querySelector("#current-time");
const progressBar=document.querySelector("#progress-bar")
const volumeBar=document.querySelector("#volume-bar");
const volume =document.querySelector("#volume");
const ulTag=document.querySelector("#ul-tag");


const player= new musicplayer(musicList);
 window.addEventListener("load", ()=> {
    let music1=player.getMusic();
    displayMusic(music1);
    displayMusicList(player.musicList);
    isPlaying();
 })

function displayMusic(music1){
    title.innerText =music1.getName();
    singer.innerText=music1.singer;
    image.src="img/"+ music1.img;
    audio.src="mp3/"+ music1.file;
}
play.addEventListener("click",()=>{
    const isPlaying = container.classList.contains("playing");
    isPlaying ? pauseMusic() : playMusic();
});
prev.addEventListener("click",()=>{
     prevMusic();
});
function prevMusic(){
    player.prev();
    let music1=player.getMusic();
    displayMusic(music1);
    isPlaying();
}
next.addEventListener("click",()=>{
     nextMusic();
});
function nextMusic(){
    let music1=player.getMusic();
    displayMusic(music1);
    player.next();
    isPlaying();
}

function pauseMusic(){
    container.classList.remove("playing");
    play.classList = "fa-solid fa-play";
    audio.pause();
}
function playMusic(){
    container.classList.add("playing");
    play.classList = "fa-solid fa-pause";
    audio.play();
}
const calcuateTime=(toplamSaniye)=>{
    const dakika=Math.floor(toplamSaniye / 60);
    const saniye=Math.floor(toplamSaniye % 60);
    const güncellenenSaniye= saniye < 10 ?`0${saniye}`:`${saniye}`;
    const sonuc=`${dakika}:${güncellenenSaniye}`;
    return sonuc;
}
audio.addEventListener("loadedmetadata",()=>{
    duration.textContent=calcuateTime(audio.duration);
    progressBar.max=Math.floor(audio.duration);
})
audio.addEventListener("timeupdate",()=>{
    progressBar.value=Math.floor(audio.currentTime);
    currentTime.textContent=calcuateTime(progressBar.value);
});
progressBar.addEventListener("input",()=>{
    currentTime.textContent=calcuateTime(progressBar.value);
    audio.currentTime=progressBar.value;
})
let sesDurumu="sesli";
volumeBar.addEventListener("input",(e)=>{
    const value=e.target.value;
    audio.volume=value/100;
    if(value==0){
        audio.muted=true;
        sesDurumu="sessiz";
        volume.classList="fa-solid fa-volume-xmark";
    }
    else{
        audio.muted=false;
        sesDurumu="sesli";
        volume.classList="fa-solid fa-volume-high";
    }
});
volume.addEventListener("click",()=>{
     if(sesDurumu==="sesli"){
        audio.muted=true;
        sesDurumu="sessiz";
        volume.classList="fa-solid fa-volume-xmark";
        volumeBar.value=0;
     }
     else{
        audio.muted=false;
        sesDurumu="sesli";
        volume.classList="fa-solid fa-volume-high";
        volumeBar.value=100;
     }
});
const displayMusicList = (List)=>{
    for(let i=0;i<List.length;i++){
        let liTag = `
            <li li-index='${i}' onclick="selectedMusic(this)" class="list-group-item d-flex justify-content-between align-contenter-center">
                <span>${List[i].getName()}</span>
                <span id="music-${i}" class="badge bg-primary rounded-pill"></span>
                <audio class="music-${i}" src="mp3/${List[i].file}"></audio>
             </li>
        `;
        ulTag.insertAdjacentHTML("beforeend",liTag);

        let liAudioDuration=ulTag.querySelector(`#music-${i}`);
        let liAudioTag=ulTag.querySelector(`.music-${i}`);

        liAudioTag.addEventListener("loadeddata",()=>{
        liAudioDuration.innerText=calcuateTime(liAudioTag.duration);
        })
    }
};
const selectedMusic=(li)=>{
     player.index=li.getAttribute("li-index");
     displayMusic(player.getMusic());
     playMusic();
     isPlaying();
};
const isPlaying= () => {
      for(let li of ulTag.querySelectorAll("li")){
        if(li.contains("playing"))
        {
            li.classList.remove("playing");
        }
        if(li.getAttribute("li-index")==player.index)
        {
            li.classList.add("playing");
        }
      }
}
audio.addEventListener("ended",()=>{
    nextMusic();
})



