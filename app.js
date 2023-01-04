console.log('Hi, have a nice day! ;)');


const playerWinsLSKey = "playerWins";
const AIWinsLSKey = "AIWins";

const WinningResultsMap = {
    paper: ['rock'],
    rock: ['scissors'],
    scissors: ['paper'],
};

let state = {
    playerWins: Number(localStorage.getItem(playerWinsLSKey)) || 0,
    AIWins: Number(localStorage.getItem(AIWinsLSKey)) || 0,
    playerPick: null,
    AIPick: null,
};

const renderScore = () => {
    const pointsElement = document.querySelector(".points");
    pointsElement.innerText = state.playerWins - state.AIWins;
};

const bindPickEvents = () => {
    document.querySelectorAll(".options button").forEach((button) => {
        button.addEventListener("click", pick);
        });
    
    document.querySelector(".result__button").addEventListener("click", playAgain);
    document.querySelector(".restart__button").addEventListener("click", restart);
};

const pick = (e) => {
    pickByPlayer(e.currentTarget.dataset.pick);
    pickByAI();
    hideOptions();
    showFight();
};

const pickByPlayer = (pickedOption) => {
    state = {
        ...state,
        playerPick: pickedOption,
    };

};

const pickByAI = () => {
    const options = ["rock", "paper", "scissors"];
    const AIPick = options[Math.floor(Math.random() * options.length)];

    state = {
        ...state,
        AIPick,
    };
};

const hideOptions = () => {
    const optionsElement = document.querySelector(".options");
    optionsElement.classList.add("slide-left");
    setTimeout(() => {
        optionsElement.classList.add("hidden");
    }, 300);
};

const showFight = () => {
    const fightElement = document.querySelector(".fight");
    setTimeout(() => {
        fightElement.classList.add("slide-left");
    }, 300);
    

    fightElement.classList.remove("hidden");
    createElementPickByPlayer();
    createElementPickByAI();

    showResult();
};

const showResult = () => {
    const resultTextElement = document.querySelector(".result__text");
    if (state.AIPick === state.playerPick) {
        resultTextElement.innerText = "DRAW";

    } else if (WinningResultsMap[state.playerPick].includes(state.AIPick)) {
        resultTextElement.innerText = "YOU WIN";
        localStorage.setItem(playerWinsLSKey, state.playerWins + 1);
        state = {
            ...state,
            playerWins: state.playerWins + 1,
        };

    } else {
        resultTextElement.innerText = "YOU LOSE";
        localStorage.setItem(AIWinsLSKey, state.AIWins + 1);
        state = {
            ...state,
            AIWins: state.AIWins + 1,
        };
    }

    setTimeout(renderResult, 1000);

    renderScore();
};

const renderResult = () => {
    document.querySelector(".result").classList.add("shown");
    document.querySelector(".pick--player").classList.add("moved");
    document.querySelector(".pick--ai").classList.add("moved");

};


const createElementPickByPlayer = () => {
    const playerPick = state.playerPick;
    
    const pickContainerElement = document.querySelector(".pick__container--player");
    pickContainerElement.innerHTML = "";
    pickContainerElement.appendChild(createPickElement(playerPick));
};

const createElementPickByAI = () => {
    const AIPick = state.AIPick;
    
    const pickContainerElement = document.querySelector(".pick__container--ai");
    pickContainerElement.innerHTML = "";
    pickContainerElement.appendChild(createPickElement(AIPick));
};



const createPickElement = (option) => {   

    const pickElement = document.createElement("div");
    pickElement.classList.add("button", `button--${option}`);

    const imageContainerElement = document.createElement("div");
    imageContainerElement.classList.add("button__image-container");

    const imgElement = document.createElement("img");
    imgElement.src = `./images/icon-${option}.svg`;
    imgElement.alt = option;

    imageContainerElement.appendChild(imgElement);

    pickElement.appendChild(imageContainerElement);

    return pickElement;

};


const playAgain = () => {
    const fightElement = document.querySelector(".fight");
    fightElement.classList.remove("slide-left");
    setTimeout(() => {
        fightElement.classList.add("hidden");
    }, 300);
    

    const optionsElement = document.querySelector(".options");
    setTimeout(() => {
        optionsElement.classList.remove("slide-left");
    }, 250);
   
    setTimeout(() => {
        optionsElement.classList.remove("hidden");
    }, 200);

    document.querySelector(".result").classList.remove("shown");
    document.querySelector(".pick--player").classList.remove("moved");
    document.querySelector(".pick--ai").classList.remove("moved");
    
}


const restart = () => {
    playAgain();
    
    // localStorage.setItem(AIWinsLSKey, 0);
    // localStorage.setItem(playerWinsLSKey, 0);
    
    ////
    
    // state = {

    //     playerWins: localStorage.setItem(playerWinsLSKey, 0),
    //     AIWins: localStorage.setItem(AIWinsLSKey, 0),

    // }

    localStorage.setItem(AIWinsLSKey, state.AIWins = 0);
    localStorage.setItem(playerWinsLSKey, state.playerWins = 0);
    


    renderScore();
}

const  init = () => {
    renderScore();
    bindPickEvents();
};

init();