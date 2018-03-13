'use strict';

// pure js version of $post
// from https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API/Using_Fetch

function postData(url, data) {
// Default options are marked with *
    return fetch(url, {
        body: JSON.stringify(data), // must match 'Content-Type' header
        cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
        credentials: 'same-origin', // include, same-origin, *omit
        headers: {
            'user-agent': 'Mozilla/4.0 MDN Example',
            'content-type': 'application/json'
        },
        method: 'POST', // *GET, POST, PUT, DELETE, etc.
        mode: 'cors', // no-cors, cors, *same-origin
        redirect: 'follow', // *manual, follow, error
        referrer: 'no-referrer', // *client, no-referrer
    })
    .then(response => response.json()) // parses response to JSON
}

function Game(){
    this.team1 = null;
    this.team2 = null;
    this.next = null;
    this.winner = null;
}

function Bracket(){
    this.champ = new Game();
}

Bracket.prototype.genTournament = function(){
    let i = 0;
    let num = 0;
    function tournamentHelper(game, round){
        if(round == 6){
            game.team1 = teams[i++];
            game.team2 = teams[i++];
            game.num = num++;
            game.round = round;
            return;
        }
        game.num = num++;
        game.round = round;
        game.team1 = new Game();
        game.team1.next = game;
        game.team2 = new Game();
        game.team2.next = game;
        tournamentHelper(game.team1, round+1);
        tournamentHelper(game.team2, round+1);
    }
    tournamentHelper(this.champ, 1);
    return this;
}

Bracket.prototype.fillTournament = function(arr){
    function setWinners(game){
        let team_id = arr[game.num]["winner"]["id"];
        game.winner = teams[team_id];
        if(game.team1.winner && game.team2.winner){
            setWinners(game.team1);
            setWinners(game.team2);
        }
    }
    setWinners(this.champ);
    console.log(b);
} 

Bracket.prototype.findGameByNum = function(gameNum){
    let the_game = null;
    function search(g){
        if(g.num == gameNum){
            the_game = g;
        }else if(g.team1 && g.team2){
            search(g.team1);
            search(g.team2);
        }
    }
    search(this.champ);
    return the_game;
}

const rounds = [
    "First Round",
    "Second Round",
    "Sweet Sixteen",
    "Elite Eight",
    "Final Four",
    "Championship"
];

const regions = [
    "East",
    "West",
    "Midwest",
    "South"
]

Bracket.prototype.drawBracket = function(element){
    let finals = [[], []];
    let field = [[[],[],[],[]],[[],[],[],[]],[[],[],[],[]],[[],[],[],[]]];
    let t = 0;
    let n = 0;
    function helper(game, r){
        if(r == 0){
            let t1 = game.team1;
            let t2 = game.team2;
            let thing = `<div class="game g${r}" data-game="${game.num}" data-round="${r}">
                            <button class="team" data-id="${t1.id}">${t1.seed} ${t1.name}</button>
                            <button class="team" data-id="${t2.id}">${t2.seed} ${t2.name}</button>
                        </div>`;
            field[n-1][r].push(thing);
            t++;
        }else{
            let t1 = {id: -1, seed: "", name: ""};
            let t2 = {id: -1, seed: "", name: ""};
            if(r > 3){
                let thing = `<p>${rounds[r]}</p>
                            <div class="game" data-game="${game.num}" data-round="${r}">
                                <button class="team" disabled="true">${t1.seed} ${t1.name}</button>
                                <button class="team" disabled="true">${t2.seed} ${t2.name}</button>
                            </div>`;
                finals[5-r].push(thing);
            } else {
                if(r == 3){
                    n++;
                    t = 0;
                }
                let thing = `<div class="game g${r}" data-game="${game.num}" data-round="${r}">
                                <button class="team" disabled="true">${t1.seed} ${t1.name}</button>
                                <button class="team" disabled="true">${t2.seed} ${t2.name}</button>
                            </div>`;
                field[n-1][r].push(thing);
            }
            
            if(game.team1){
                helper(game.team1, r-1);
            }
            if(game.team2){
                helper(game.team2, r-1);
            }
        }
    }
    helper(this.champ, 5);
    let content = "";
    for(var i of [0,2,1,3]){
        content += `<div id="${regions[i]}" class="region">`;
        for(var j=0; j<4; j++){
            if(i>1){
                content += `<div class="col">${field[i][3-j].join("")}</div>`;
            } else {
                content += `<div class="col">${field[i][j].join("")}</div>`;
            }
        }
        content += `</div>`;
    }
    let end = `<div id="final-four">`;
    end += finals[0];
    end += finals[1].join("");
    end += `</div>`;
    element.innerHTML = content + end;
}

Bracket.prototype.toList = function(){
    let arr = [];
    function traverse(game){
        if(game.winner != null){
            arr.push({
                "num": game.num,
                "round": game.round,
                "winner": {
                    "id": game.winner.id,
                    "name": game.winner.name
                }
            });
        }else{
            arr.push({
                "num": game.num,
                "round": game.round,
                "winner": {
                    "id": -1,
                    "name": "TBD"
                }
            })
        }
        if(game.team1.winner !== undefined && game.team2.winner !== undefined){
            traverse(game.team1);
            traverse(game.team2);
        }
    }
    traverse(this.champ);
    return arr;
}

function updateNode(game, w, l){

    // set the winner
    game.winner = teams[w];

    // Check if the bracket has been finished
    if(game.next == null){
        console.log("champ has been picked!", teams[w]);
    }
    
    // update the next round
    let nextgame = document.querySelector(`[data-game='${game.next.num}']`)
    let ele = "";
    if(game.next.team1.winner){
        let t = game.next.team1.winner;
        ele += `<button class="team" data-id="${t.id}">${t.seed} ${t.name}</button>`;
    }else{
        ele += `<button class="team" disabled="true"></button>`;
    }
    if(game.next.team2.winner){
        let t = game.next.team2.winner;
        ele += `<button class="team" data-id="${t.id}">${t.seed} ${t.name}</button>`;
    }else{
        ele += `<button class="team" disabled="true"></button>`;
    }
    nextgame.innerHTML = ele;

    // attach the listeners to do it all again!
    if(game.next.team1.winner && game.next.team2.winner){
        nextgame.children[0].addEventListener("click", (e) => {
            listener(e);
        })
        nextgame.children[1].addEventListener("click", (e) => {
            listener(e);
        })
    }

    // for debugging, shows the entire bracket tree
    // console.log(b);
}

function applyStyling(team){
    team.target.classList.remove("loss");
    team.target.classList.add("win");
    for(var t of team.target.parentElement.children){
        if(t != team.target){
            t.classList.remove("win");
            t.classList.add("loss");
        }
    }
}

const b = new Bracket();
let bracket = document.getElementById("bracket");
b.genTournament().drawBracket(bracket);

function listener(team){
    let game = b.findGameByNum(team.target.parentElement.dataset.game);
    let w = team.target.dataset.id;
    let l = w == game.team1.winner.id ? game.team2.winner.id : game.team1.winner.id;
    applyStyling(team);
    updateNode(game, w, l);
}

document.querySelectorAll("[data-id]").forEach((t) => { 
    t.addEventListener("click", (team) => {
        let game = b.findGameByNum(team.target.parentElement.dataset.game);
        let w = team.target.dataset.id;
        let l = game.team1.id == team.target.dataset.id ? game.team2.id : game.team1.id;
        applyStyling(team);
        updateNode(game, w, l);
    });
});

const success = document.querySelector("[data-message='success']");

document.querySelector("[data-submit]").addEventListener("click", function(){
    postData('/bracket', {"bracket": b.toList()})
        .then(data => {
            console.log(data);
            success.style.display = "";
        })
        .catch(error => console.error(error))
    return;
});

let close = document.querySelectorAll("[data-close]");
for(let c of close){
    c.addEventListener("click", function(e){
        e.preventDefault();
        modal.classList.remove("is-active");
    });
}

const hide = document.querySelectorAll("[data-hide]");
for(let h of hide){
    h.addEventListener("click", function(e){
        e.target.parentNode.parentNode.style.display = "none";
    });
}

document.getElementById("calc").addEventListener("click",function(){
    calc.classList.add("is-loading");
});