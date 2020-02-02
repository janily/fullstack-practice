let userScore = 0;
let computerScore = 0;
const userScore_span = document.getElementById("user-score");
const computerScore_span = document.getElementById("computer-score");
const scoreBoard_div = document.querySelector(".score-board");
const result_p = document.querySelector(".result > p");
const rock_div = document.getElementById("r");
const paper_div = document.getElementById("p");
const ss_div = document.getElementById("s");

function getComputerChoice() {
    const choices = ['r', 'p', 's'];
    // console.log(Math.floor(Math.random() * 3));
    const randomNumber = Math.floor(Math.random() * 3);
    console.log(choices[randomNumber])
    return choices[randomNumber];
}

function coverToWord(letter) {
    if (letter === "r") return "石头";
    if (letter === "p") return "布";
    return "剪刀";
}

// getComputerChoice();

function win(userChoice, computerChoice) {

    userScore++;
    console.log(userChoice);
    userScore_span.innerHTML = userScore;
    computerScore_span.innerHTML = computerScore;
    const smallUserWord = "人类".fontsize(3).sub();
    const smallComWord = "机器".fontsize(3).sub();
    const userChoice_div = document.getElementById(userChoice);
    // result_p.innerHTML = coverToWord(userChoice) + "打败了" + coverToWord(computerChoice) + ".你赢了!!!";
    result_p.innerHTML = `${coverToWord(userChoice)}${smallUserWord} 打败了 ${coverToWord(computerChoice)}${smallComWord}.你赢了!!!`;  //es6
    userChoice_div.classList.add('green-glow');
    setTimeout(() =>  userChoice_div.classList.remove('green-glow'), 1000);

}

function lose(userChoice, computerChoice) {
    computerScore++;
    console.log(computerScore);
    userScore_span.innerHTML = userScore;
    computerScore_span.innerHTML = computerScore;
    const smallUserWord = "人类".fontsize(3).sub();
    const smallComWord = "机器".fontsize(3).sub();
    const userChoice_div = document.getElementById(userChoice);
    // result_p.innerHTML = coverToWord(userChoice) + "打败了" + coverToWord(computerChoice) + ".你赢了!!!";
    result_p.innerHTML = `${coverToWord(userChoice)}${smallUserWord} 被打败了 ${coverToWord(computerChoice)}${smallComWord}.你输了!!!`;  //es6
    userChoice_div.classList.add('red-glow');
    setTimeout(() =>  userChoice_div.classList.remove('red-glow'), 1000);
}

function draw(userChoice, computerChoice) {
    const smallUserWord = "人类".fontsize(3).sub();
    const smallComWord = "机器".fontsize(3).sub();
    const userChoice_div = document.getElementById(userChoice);
    // result_p.innerHTML = coverToWord(userChoice) + "打败了" + coverToWord(computerChoice) + ".你赢了!!!";
    result_p.innerHTML = `${coverToWord(userChoice)}${smallUserWord} 打平了 ${coverToWord(computerChoice)}${smallComWord}.平局!!!`;  //es6
    userChoice_div.classList.add('gray-glow');
    setTimeout(() => userChoice_div.classList.remove('gray-glow'), 1000);
}


function game(userChoice) {

    const computerChoice = getComputerChoice();
    // console.log("user choice =>" + userChoice);
    // console.log("computer choice =>" + computerChoice);
    switch (userChoice + computerChoice) {
        case "rs":
        case "pr":
        case "sp":
            win(userChoice, computerChoice);
            break;
        case "rp":
        case "ps":
        case "sr":
            lose(userChoice, computerChoice);
            console.log("人类输了！！！");
            break;
        case "rr":
        case "pp":
        case "ss":
            draw(userChoice, computerChoice);
            console.log("人类输了！！！");
            break;
    }
}

function main() {
    rock_div.addEventListener('click',() => game("r"))
    
    paper_div.addEventListener('click', () => game("p"))
    
    ss_div.addEventListener('click', () =>  game("s"))
}

main();

