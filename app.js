let phrase =[]
let player = 1
let counter = 0

const cs = document.querySelectorAll(".c")
const who = document.querySelector(".who")
const but = document.querySelector(".perdu button")
const perdu = document.querySelector(".perdu")

/**
 * Sons
 */
const clicSound =  new Audio('./sounds/tap.wav');
const failSound = new Audio("./sounds/losing.wav")
const goSound = new Audio("./sounds/notif.wav")

but.addEventListener("click",()=>{
    playSound(goSound)
    player= 1;
    counter =0
    phrase =[]
    enlevePerdu()
    setTimeout(()=>{
        simonPlay()
    },2000)
    
})



function select(elt){
    playSound(clicSound)
    elt.classList.add("over")
    setTimeout(()=>{
        elt.classList.remove("over")
    },500)
}

const colors =["red","green","blue","yellow"]



function simonPlay(){
    afficheQui()
    let n = Math.ceil(Math.random()*3)
  
    let selected = colors[n]
    phrase.push(selected)
    console.log(n,selected)
    for(let i=0; i<phrase.length;i++){
        setTimeout(()=>{
            
            select(document.querySelector("."+phrase[i]))
        },i*1000)
    }
    setTimeout(() => {
        counter = 0
        player*=-1
        afficheQui()
    }, 1000*phrase.length);
    
}

function playerPlay(){
    counter = 0
}

 cs.forEach(c=>{
    c.addEventListener("click",()=>{
        
        select(c)
        if(c.classList.contains(phrase[counter])){
            counter++ 
            console.log("counter", counter,c)
            if(counter == phrase.length){
                player*=-1
                setTimeout(()=>{
                    simonPlay()  
                },1000)
            }
        }else{
            console.warn("ettt nooonn perdu ! ")
            playSound(failSound)
            affichePerdu()
            
        }
    })
})

function afficheQui(){
    if(player ==1){
        who.innerHTML = "🤖 Simon is playing"
    }else{
        who.innerHTML="🫵 It's your turn"
    }
}

function enlevePerdu(){
    perdu.style.opacity = 0;
    setTimeout(()=>{
        perdu.style.display="none"
    },500)
    
}

function affichePerdu(){
    const h2 = perdu.querySelector("h2")
    h2.innerHTML = "You loose !😭"
    but.innerHTML = "♻️Try again"
    perdu.style.display="flex" 
    setTimeout(()=>{
      perdu.style.opacity = 1;
    },500)
}

function playSound(sound){
    sound.currentTime = 0
    sound.play()
}