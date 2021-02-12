class Game {
    constructor() {}
    getState() {
        database.ref('gameState').on("value", function (data) {
            gameState = data.val();
        })
    }

    update(state) {
        database.ref('/').update({
            gameState: state
        });
    }
    async start() {
        if (gameState == 0) {
            player = new Player();
            let playerCountRef = await database.ref('playerCount').once("value");
            if (playerCountRef.exists()) {
                playerCount = playerCountRef.val();
                player.getCount();
            }
            form = new Form()
            form.display();
        }
        player1 = createSprite(200, 500);
        player1.addImage("player1", player_img);
        player1.setCollider('rectangle', 0, 20, player1.width - 20, player1.height - 50);

        player2 = createSprite(800, 500);
        player2.addImage("player2", player_img);
        player2.setCollider('rectangle', 0, 20, player2.width - 20, player2.height - 50);
        players = [player1, player2];

    }

    play() {

        form.hide();

        Player.getPlayerInfo();
        image(bg, 0, 0, 1000, 800);
        let x = 100;
        let y = 200;
        let index = 0;
        drawSprites();
        for (let plr in allPlayers) {
            index = index + 1;
            x = 500 - allPlayers[plr].distance;
            y = 500;
            players[index - 1].x = x;
            players[index - 1].y = y;
            if (index === player.index) {
                push();
                fill("white");
                stroke("red");
                strokeWeight(3);
                textSize(25);
                text(allPlayers[plr].name, x - 25, y + 25);
                pop();
                // code for destroying the fruits only for the current player
                for (let i = 0; i < Fruits.length; i++) {
                    if (players[index - 1].isTouching(Fruits[i])) {
                        Fruits[i].remove();
                        Fruits.splice(i, 1);
                        player.score += 5;
                        allPlayers[plr].score = player.score;
                    }
                }
            }
            // displaying the score
            fill(255);
            textSize(32);
            text(allPlayers[plr].name + " : " + allPlayers[plr].score, 25, 50 + 50 * (index - 1));
        }
        if (keyIsDown(RIGHT_ARROW) && player.index !== null) {
            player.distance -= 10
            player.update();
        }
        if (keyIsDown(LEFT_ARROW) && player.index !== null) {
            player.distance += 10
            player.update();
        }
        if (frameCount % 20 === 0) {
            fruits = createSprite(random(100, 1000), 0, 100, 100);
            fruits.velocityY = 6;
            let rand = Math.round(random(1, 5));
            switch (rand) {
                case 1:
                    fruits.addImage("fruit1", fruit1_img);
                    break;
                case 2:
                    fruits.addImage("fruit1", fruit2_img);
                    break;
                case 3:
                    fruits.addImage("fruit1", fruit3_img);
                    break;
                case 4:
                    fruits.addImage("fruit1", fruit4_img);
                    break;
                case 5:
                    fruits.addImage("fruit1", fruit5_img);
                    break;
            }
            Fruits.push(fruits);
        }

        if (player.index !== null) {
            //fill code here, to destroy the objects.
            for (let i = 0; i < Fruits.length; i++) {
                if (Fruits[i].y > height) {
                    Fruits[i].remove();
                    Fruits.splice(i, 1);
                }
            }
        }
        if (player.score == 100) {
            gameState = 2;
            player.updateCount(3);
            this.update(2);
            database.ref('/').update({
                won: player.name
            });
        }
    }

    end() {
        // console.log("Game Ended");
        form.hide();
        let winner;
        database.ref('won').on('value',(data)=>{
            winner=data.val();
        });
        textAlign(CENTER);
        textSize(72);
        textFont('Algerian');
        noStroke();
        fill(255);
        text(winner + " won !!",width/2,200);
    }
}