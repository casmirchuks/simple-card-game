const fs = require('fs');

fs.readFile('input.txt', 'utf8', function (error, data) {
    if (error) throw error;

    let players = {};
    let showScore = " ";
    // split the file contents by new line
    const lines = data.split('\n');

    for(let line of lines){
        let [name, cards] = line.split(':');
        let cardList = cards;
        try {
            cardList = cards.split(',').map(card => card.trim()); 
        } catch (error) {
            showScore = `Exception: ${error}`
        }

        let score = 0;
        let suitScore = 1;

        console.log(cardList);
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
            let showTieData = `${maxScorePlayer.join(", ")} : ${maxScore}`
            console.log(`It is a tie between ${showTieData}, same face value score`);
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
            // console.log(maxSuitScorePlayers);
            let showSuitScore = `${maxSuitScorePlayers.join(", ")}: ${maxSuitScore}`
            console.log(showSuitScore);
        } 
    }
     
    // Data written to  file.

    if (maxSuitScorePlayers.length === 2){
        showScore = `${maxSuitScorePlayers.join(",")}:${maxScore}`;
        console.log( showScore);
    } else if (maxSuitScorePlayers.length === 1 || maxScorePlayer.length === 1) {
        showScore = `${maxScorePlayer[0]}:${maxScore}`;
        console.log( showScore);
    } else {
        showScore = `Exception: ${error}`;
        console.log( showScore);
    }

     // Write data in 'Output.txt' .
    fs.writeFile('output.txt', JSON.stringify(showScore), (error) => {
        // In case of a error throw error.
        if (error) throw error;
    })
})



