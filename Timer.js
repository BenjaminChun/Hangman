import {select_word} from "./HangmanScript.js";

export default class Timer{
    constructor(root){
        root.innerHTML = Timer.getHTML();
        
        this.el = {
            minutes: root.querySelector(".timer__part--minutes"),
            seconds: root.querySelector(".timer__part--seconds"),
        };
        
        this.interval = null;
        this.remainingSeconds = 120;
        const difficulty = document.querySelector('.Difficulty');
        const easyButton = document.querySelector('.easy-btn');
        easyButton.addEventListener('click', () => {
            this.remainingSeconds = 120;
        });
        const normalButton = document.querySelector('.normal-btn');   
        normalButton.addEventListener('click', () => {                
            this.remainingSeconds = 60;                             
        });                                                         
        const hardButton = document.querySelector('.hard-btn');  
        hardButton.addEventListener('click', () => {                
            this.remainingSeconds = 30;                             
        });                                                         
        const resetButton = document.querySelector('.reset-btn');
        resetButton.addEventListener('click', () => {           
            if(difficulty.textContent === "Easy"){
            this.remainingSeconds = 120;
            } 
            if(difficulty.textContent === "Normal"){
            this.remainingSeconds = 60;          
            }  
             if(difficulty.textContent === "Hard"){
             this.remainingSeconds = 30;          
             }                                     
        });
        const playAgainButtonL = document.querySelector('.notifL-btn');
        const playAgainButtonW = document.querySelector('.notifW-btn');
        playAgainButtonL.addEventListener('click', () => {
            if(difficulty.textContent === "Easy"){
                this.remainingSeconds = 120;
            }
            if(difficulty.textContent === "Normal"){
                this.remainingSeconds = 60;
            }
            if(difficulty.textContent === "Hard"){
                this.remainingSeconds = 30;
            }
        });
        playAgainButtonW.addEventListener('click', () => {
            if(difficulty.textContent === "Easy"){
                this.remainingSeconds = 120;
            }
            if(difficulty.textContent === "Normal"){
                this.remainingSeconds = 60;
            }
            if(difficulty.textContent === "Hard"){
                this.remainingSeconds = 30;
            }
        });
        this.start();
    }
    
    updateInterfaceTime(){
        const minutes = Math.floor(this.remainingSeconds / 60);
        const seconds = this.remainingSeconds % 60;
        
        this.el.minutes.textContent = minutes.toString().padStart(2, "0");
        this.el.seconds.textContent = seconds.toString().padStart(2, "0"); //this basically sets the seconds.textcontent to 00, padstart just puts in 0 until the length is 2
    }
    showNotifL(){
        const notifL = document.querySelector('.notifL');
        const notifContentL = document.querySelector('.notifL-content');
        const notifSpanL = document.querySelector('.notifL-span');
        const showNotifL = function (msg) {
            notifL.classList.remove('hidden');
            notifSpanL.textContent = select_word;
            notifContentL.textContent = `You ${msg}`;
        };
        this.loseNotifL = showNotifL('lost');
    }
    start(){
        if(this.remainingSeconds === 0) return; 
        this.interval = setInterval(() => {
            this.remainingSeconds--;
            this.updateInterfaceTime();

            if(this.remainingSeconds === 0 ){
                this.stop();
                this.showNotifL();
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