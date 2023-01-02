console.log('hello!');


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
};

const pick = (e) => {
    pickByPlayer(e.currentTarget.dataset.pick);
    pickByAI();
    hideOptions();
    showFight();
    console.log(state);
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
    fightElement.classList.add("slide-left");
    fightElement.classList.remove("hidden");
    createElementPickByPlayer();
    createElementPickByAI();

    showResult();
};

const showResult = () => {
    if (state.AIPick === state.playerPick) {
        console.log("draw");

    } else if (WinningResultsMap[state.playerPick].includes(state.AIPick)) {
        localStorage.setItem(playerWinsLSKey, state.playerWins + 1);
        state = {
            ...state,
            playerWins: state.playerWins + 1,
        };

    } else {
        localStorage.setItem(AIWinsLSKey, state.AIWins + 1);
        state = {
            ...state,
            AIWins: state.AIWins + 1,
        };
    }

    renderScore();
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


const  init = () => {
    renderScore();
    bindPickEvents();
};

init();