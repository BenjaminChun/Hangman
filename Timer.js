export default class Timer{
    constructor(root){
        root.innerHTML = Timer.getHTML();
        
        this.el = {
            minutes: root.querySelector(".timer__part--minutes"),
            seconds: root.querySelector(".timer__part--seconds"),
        };
        
        this.interval = null;
        this.remainingSeconds = 110;
        this.start();
    }
    
    updateInterfaceTime(){
        const minutes = Math.floor(this.remainingSeconds / 60);
        const seconds = this.remainingSeconds % 60;
        
        this.el.minutes.textContent = minutes.toString().padStart(2, "0");
        this.el.seconds.textContent = seconds.toString().padStart(2, "0"); //this basically sets the seconds.textcontent to 00, padstart just puts in 0 until the length is 2
    }
    
    start(){
        if(this.remainingSeconds === 0) return; 
        this.interval = setInterval(() => {
            this.remainingSeconds--;
            this.updateInterfaceTime();
            
            if(this.remainingSeconds === 0 ){
                this.stop();
            }
        }, 1000);
        
    }
    
    stop(){
        clearInterval(this.interval);
        this.interval = null;
    }
    
    static getHTML(){
        return` 
            <span class="timer__part timer__part--minutes">00</span>
            <span class="timer__part">:</span>
            <span class="timer__part timer__part--seconds">00</span>
         `;
    } 
}
new Timer(
    document.querySelector(".timer")
)