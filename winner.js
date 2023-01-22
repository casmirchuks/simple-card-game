const fs = require('fs');

fs.readFile('input.txt', 'utf8', function (error, data) {
    if (error) throw error;

    try {
    let players = {};
    // split the file contents by new line
    const lines = data.split('\n');
    for(let line of lines){
        let [name, cards] = line.split(':');
        let cardList = cards;
        cardList = cards.split(',').map(card => card.trim()); 
        let score = 0;
        let suitScore = 1;
        for (let card of cardList){
            let value = card[0];
            let suit = card[1];
            if(card.length === 3){
                value = card[0] + card[1];
            } else {
                value = card[0];
            }
            switch (value){
                case "J":
                case "j": 
                score += 11;
                break;
                case "Q":
                case "q":
                score += 12;
                break;
                case "K":
                case "k":
                score += 13;
                break;
                case "A": 
                case "a":
                score += 11;
                break;
                default:
                    score += parseInt(value)
            }
            switch (suit){
                case "C": 
                case "c":
                suitScore *= 1;
                break;
                case "D":
                case "d":    
                suitScore *= 2;
                break;
                case "H":
                case "h": 
                suitScore *= 3;
                break;
                case "S":
                case "s":
                suitScore *= 4;
                break;
                default:
                    suitScore += parseInt(suit)
            }
        }
        players[name] = {score: score, suitScore: suitScore};
    }
    console.log(players); 

    // finds the winner 
    let maxScore = 0;
    let maxScorePlayer = [];
    let maxSuitScore = 0;
    let maxSuitScorePlayers = [];
    
    for(let player in players) {
        if (players[player].score > maxScore) {
            maxScore = players[player].score;
            maxScorePlayer = [player];
        } else if (players[player].score === maxScore) {
            maxScorePlayer.push(player)
            // let showTieData = `${maxScorePlayer.join(",")} : ${maxScore}`
            // console.log(`It is a tie between ${showTieData}, same face value score`);
        }
    }
        // invokes if there is a tie (more 2 players with the same maxScore)
        if(maxScorePlayer.length > 1){
            for (let player of maxScorePlayer){
                if (players[player].suitScore > maxSuitScore){
                    maxSuitScore = players[player].suitScore;
                    maxSuitScorePlayers = [player];
                } else if (players[player].suitScore === maxSuitScore){
                    maxSuitScorePlayers.push(player)
                }
            }
            // let showSuitScore = `maxSuitScorePlayer: ${maxSuitScorePlayers.join(", ")}:${maxSuitScore}`
            // console.log(showSuitScore);

            fs.writeFileSync('output.txt', `${maxSuitScorePlayers.join(",")}:${maxScore}`);
                } else {
                fs.writeFileSync('output.txt', `${maxScorePlayer[0]}:${maxScore}`);
                }
            } catch (error) {
                fs.writeFileSync('output.txt', `Exception:${error.message}`);
            }
         
})



