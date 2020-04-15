const gameStart = {
    key: 'gameStart',
    preload: function(){
        this.load.image('bg1', 'images/bg/plx-1.png');
        this.load.image('bg2', 'images/bg/plx-2.png');
        this.load.image('bg3', 'images/bg/plx-3.png');
        this.load.image('bg4', 'images/bg/plx-4.png');
        this.load.image('bg5', 'images/bg/plx-5.png');
        this.load.image('footer', 'images/footer.png');
        this.load.spritesheet('user', 'images/runSheet.png', {frameWidth: 51, frameHeight: 29});
    },
    create: function(){
        this.bg1 = this.add.tileSprite(400, 300, 800, 600, 'bg1');
        this.bg2 = this.add.tileSprite(400, 300, 800, 600, 'bg2');
        this.bg3 = this.add.tileSprite(400, 300, 800, 600, 'bg3');
        this.bg4 = this.add.tileSprite(400, 300, 800, 600, 'bg4');
        this.bg5 = this.add.tileSprite(400, 300, 800, 600, 'bg5');

        //加入地板，把地板加入物理效果
        this.footer = this.add.tileSprite(400, 568, 800, 100, 'footer');
        this.physics.add.existing(this.footer);
        this.footer.body.immovable = true;
        this.footer.body.moves = false;

        //設定人物位置與加入物理效果
        this.player = this.physics.add.sprite(150, 400, 'user')
        
        //可以獲取遊戲物件的座標資訊
        console.log(this.player.getBounds());

        //設定角色彈跳值
        this.player.setBounce(0.2);

        //角色邊界限制
        this.player.setCollideWorldBounds(true);

        //設定角色顯示大小
        this.player.setScale(4);

        //設定角色碰撞邊界(開debug模式可以看到碰撞邊界)
        this.player.setSize(28, 29, 0);

        //設定動畫播放
        this.anims.create({
            key: 'run',
            frames: this.anims.generateFrameNumbers('user', { start: 0, end: 5 }),
            frameRate: 10,
            repeat: -1
        })

        //將需要碰撞的物件綁在一起
        this.physics.add.collider(this.player, this.footer);
        
        //播放動畫
        this.player.anims.play('run', true);
        
    },
    update: function(){
        this.bg1.tilePositionX += 4;
        this.bg2.tilePositionX += 4;
        this.bg3.tilePositionX += 4;
        this.bg4.tilePositionX += 4;
        this.bg5.tilePositionX += 4;
        this.footer.tilePositionX += 4;


        // 啟動鍵盤事件
        let cursors = this.input.keyboard.createCursorKeys();
        if (cursors.right.isDown) {
            this.player.setVelocityX(200);
            this.player.flipX = false;
        } else if (cursors.left.isDown) {
            this.player.setVelocityX(-260);
        } else {
            this.player.setVelocityX(0);
        }

        if (cursors.up.isDown && this.player.body.touching.down) {
            this.player.setVelocityY(-600);
        }
    }
}

const config = {
    type: Phaser.AUTO,
    width: 800,
    height: 600,
    parent: 'app',
    physics: {
        default: 'arcade',
        arcade: {
            gravity: {
                y: 1500
            }
        },
    },
    scene: [
        gameStart,
    ]
}


new Phaser.Game(config);