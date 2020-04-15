const gameStart = {
    key: 'gameStart',
    preload: function(){
        this.load.image('bg1', 'images/bg/plx-1.png');
        this.load.image('bg2', 'images/bg/plx-2.png');
        this.load.image('bg3', 'images/bg/plx-3.png');
        this.load.image('bg4', 'images/bg/plx-4.png');
        this.load.image('bg5', 'images/bg/plx-5.png');
        this.load.image('footer', 'images/footer.png');
    },
    create: function(){
        this.bg1 = this.add.tileSprite(400, 300, 800, 600, 'bg1');
        this.bg2 = this.add.tileSprite(400, 300, 800, 600, 'bg2');
        this.bg3 = this.add.tileSprite(400, 300, 800, 600, 'bg3');
        this.bg4 = this.add.tileSprite(400, 300, 800, 600, 'bg4');
        this.bg5 = this.add.tileSprite(400, 300, 800, 600, 'bg5');
        this.footer = this.add.tileSprite(400, 568, 800, 100, 'footer');
    },
    update: function(){
        this.bg1.tilePositionX += 4;
        this.bg2.tilePositionX += 4;
        this.bg3.tilePositionX += 4;
        this.bg4.tilePositionX += 4;
        this.bg5.tilePositionX += 4;
        this.footer.tilePositionX += 4;
    }
}

const config = {
    type: Phaser.AUTO,
    width: 800,
    height: 600,
    parent: 'app',
    scene: [
        gameStart,
    ]
}

const game = new Phaser.Game(config);