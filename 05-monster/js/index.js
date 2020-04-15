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
        this.load.spritesheet('slime', 'images/SlimeA.png', {frameWidth: 16, frameHeight: 20});

        this.slimeIdx = 0;     // 目前怪物索引
        this.slimeOverNum = 3; // 怪物循環數量
        this.slimeArr = [];    // 存放所有怪物實體
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

        //建立怪物群組
        this.slime = this.physics.add.group();

        //設定人物位置與加入物理效果
        this.player = this.physics.add.sprite(150, 400, 'user');

        this.player.setCollideWorldBounds(true); //角色邊界限制
        
        //設定彈跳值
        this.player.setBounce(0.2); //user
        
        //設定顯示大小
        this.player.setScale(4); // user
        // this.slime.setScale(4);  // 怪物

        //設定碰撞邊界
        this.player.setSize(28, 29, 0);

        //設定動畫播放
        this.anims.create({
            key: 'run',
            frames: this.anims.generateFrameNumbers('user', { start: 0, end: 5 }),
            frameRate: 10,
            repeat: -1
        })
        this.anims.create({
            key: 'attack',
            frames: this.anims.generateFrameNumbers('slime', { start: 9, end: 13 }),
            frameRate: 10,
            repeat: -1
        })

        //將需要碰撞的物件綁在一起
        this.physics.add.collider(this.player, this.footer);
        this.physics.add.collider(this.slime, this.footer);
        
        //播放動畫
        this.player.anims.play('run', true);

        //先把怪物給產生出來
        for (let i = 0; i < this.slimeOverNum; i++) {
            let slime = this.slime.create(830, Phaser.Math.Between(350, 420), 'slime');
            slime.body.immovable = true;
            slime.body.moves = false;
            slime.setScale(4);
            slime.setBounceY(1.1);
            slime.setSize(16, 20, 0);
            slime.setVelocityX(Phaser.Math.Between(-400, -300))
            slime.anims.play('attack', true);
            this.slimeArr.push(slime);
        }

        this.slimeEvent = this.time.addEvent({ delay: 1000, callback: onEvent, callbackScope: this, loop: true})
        function onEvent() {
            this.slimeEvent.reset({ delay: Phaser.Math.Between(1000 ,2000), callback: onEvent, callbackScope: this, loop: true});
            this.slimeIdx++;
            if(this.slimeIdx >= this.slimeOverNum){
                this.slimeIdx = 0;
            }
            this.slimeArr[this.slimeIdx].body.immovable = false;
            this.slimeArr[this.slimeIdx].body.moves = true;
        }

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

        // 去檢查怪物是否有超出邊界
        for (let i = 0; i < this.slimeOverNum; i++) {
            if(this.slimeArr[i].x <= 0){
                this.slimeArr[i].x  = 830;
                this.slimeArr[i].y  = Phaser.Math.Between(350, 420);
                this.slimeArr[i].body.immovable = true;
                this.slimeArr[i].body.moves = false;
            }
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