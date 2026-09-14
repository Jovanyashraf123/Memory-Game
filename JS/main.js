document.querySelector(".startgame span").onclick = function(){

    let yourname = prompt("What's Your Name ?");

    if(yourname == null || yourname == ""){

        document.querySelector(".name span").innerHTML="حماده";

    }else{

        document.querySelector(".name span").innerHTML = yourname;

    }
    document.querySelector(".startgame").remove();
};
// ====================================================//

let duration = 1000;

let blocksContainer = document.querySelector(".memory-game-block");

let blocks = Array.from(blocksContainer.children);

let orderRange = Array.from(Array(blocks.length).keys())

// console.log(orderRange);
shuflle(orderRange);
// console.log(orderRange);

blocks.forEach((block,index) => {

    block.style.order = orderRange[index];

    block.addEventListener("click",function(){

        flipblock(block)
    })
})

function flipblock(selected){
    
    selected.classList.add('is-flipped');

    let allselectedblocks = blocks.filter(fillpedblock => fillpedblock.classList.contains("is-flipped"));

    if( allselectedblocks.length === 2){

       NoClick();
       thematchedblocks(allselectedblocks[0],allselectedblocks[1]);
    }
}

function NoClick(){

    blocksContainer.classList.add("no-clicking");

    setTimeout(()=>{

    blocksContainer.classList.remove("no-clicking");

    },duration)
}

function thematchedblocks(firstblock , secoundblock){

    let triesnumber = document.querySelector(".tries span");

    if(firstblock.dataset.music === secoundblock.dataset.music){

        firstblock.classList.remove("is-flipped")
        secoundblock.classList.remove("is-flipped")

        firstblock.classList.add("matched")
        secoundblock.classList.add("matched")
        
    }else{
        triesnumber.innerHTML = parseInt(triesnumber.innerHTML) + 1;

        setTimeout(()=>{

        firstblock.classList.remove("is-flipped")
        secoundblock.classList.remove("is-flipped")

        },duration);
    }
}

function shuflle(array){

    let current = array.length,
    temp ,
    random;

    while(current > 0 ){

        random=Math.floor(Math.random()* current);

        current--;

        temp = array[current];

        array[current] = array[random];

        array[random] = temp;
    }

   
    return array
}