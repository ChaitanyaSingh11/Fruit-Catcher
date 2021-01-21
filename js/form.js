class Form {
    constructor() {
        this.input = createInput("Name");
        this.button = createButton('Play');
        this.greeting = createElement('h2');
        this.title = createElement('h1');
        this.reset = createButton('Reset');
    }
    hide() {
        this.greeting.hide();
        this.button.hide();
        this.input.hide();
        this.title.hide();
    }
    display() {
        this.title.html("FRUIT CATCHER");
        this.title.position(350, 100);
        this.title.style('font-size', '70px');
        this.title.style('color', 'transparent');
        this.title.style('background-image:linear-gradient(to left,violet,indigo,blue,green,yellow,orange,red)');
        this.title.style('-webkit-background-clip:text');
        this.input.position(550, 400);
        this.input.style('width', '200px');
        this.input.style('height', '20px');
        this.input.style('background-image:linear-gradient(to top right,#13547a ,#80d0c7)');
        this.button.position(560, 500);
        this.button.style('width', '200px');
        this.button.style('height', '40px');
        this.button.style('background-image:radial-gradient(yellow,red)');
        this.button.style('border-radius:50px');
        this.reset.position(900, 660);
        this.reset.style('width', '100px');
        this.reset.style('height', '30px');
        this.reset.style('background-image:linear-gradient(to right,#ff758c , #ff7eb3)');
        this.reset.style('border-radius:50px');

        this.button.mousePressed(() => {
            this.input.hide();
            this.button.hide();
            player.name = this.input.value();
            playerCount += 1;
            player.index = playerCount;
            player.update();
            player.updateCount(playerCount);
            this.greeting.html("Hello " + player.name)
            this.greeting.position(400, 250);
            this.greeting.style('color', 'transparent');
            this.greeting.style('font-size', '100px');
            this.greeting.style('background-image:linear-gradient(to bottom right,#0B0742,#12DC6E,#5E72EB,#FF9190,#FDC094)');
            this.greeting.style('-webkit-background-clip:text');
        });

        this.reset.mousePressed(() => {
            player.updateCount(0);
            game.update(0);
        });

    }
}