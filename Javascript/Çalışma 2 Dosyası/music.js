class music{
    constructor(title,singer,img,file){
        this.title=title;
        this.singer=singer;
        this.img=img;
        this.file=file;
    }
    getName(){
        return this.title + " - " + this.singer;
    }
}

const musicList=[
     new music("Boşver","Nilüfer","1.jpeg","1.mp3"),
     new music("Bu da geçer mi","Yalın","2.jpeg","2.mp3"),
     new music("Aramızda Uçurumlar","Suat Suna","3.jpeg","3.mp3"),
     
]