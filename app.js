console.log('hello!');


const playerWinsLSKey = "playerWins";
const AIWinsLSKey = "AIWins";

let state = {
    playerWins: localStorage.getItem(playerWinsLSKey) || 0,
    AIWins: localStorage.getItem(AIWinsLSKey) || 0,
};

const renderScore = () => {
    const pointsElement = document.querySelector(".points");
    pointsElement.innerText = state.playerWins - state.AIWins;
};


const  init = () => {
    renderScore();
};

init();