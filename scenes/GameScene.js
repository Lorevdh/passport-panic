export default class GameScene extends Phaser.Scene {
  constructor() {
    super('GameScene');
  }

  create() {
    this.score = 0;
    this.timeLeft = 90;

    this.currentTraveler = null;
    this.patienceBar = null;
    this.patienceValue = 1;

    this.timer = this.time.addEvent({
      delay: 1000,
      callback: () => {
        this.timeLeft--;
        if (this.timeLeft <= 0) this.endGame();
      },
      loop: true
    });

    this.spawnTraveler();

    const stalls = [
      window.i18nStrings['STALL_RAMEN'],
      window.i18nStrings['STALL_SUSHI'],
      window.i18nStrings['STALL_ONIGIRI']
    ];

    stalls.forEach((name, i) => {
      const x = 200 + i * 200;
      this.add.text(x, 500, name, {
        fontSize: '24px',
        backgroundColor: '#eee',
        color: '#000'
      }).setOrigin(0.5).setInteractive()
        .on('pointerdown', () => this.checkOrder(name));
    });
  }

  spawnTraveler() {
    const dishes = [
      window.i18nStrings['STALL_RAMEN'],
      window.i18nStrings['STALL_SUSHI'],
      window.i18nStrings['STALL_ONIGIRI']
    ];
    const randomDish = Phaser.Utils.Array.GetRandom(dishes);
    this.currentOrder = randomDish;

    if (this.currentTraveler) this.currentTraveler.destroy();
    if (this.orderText) this.orderText.destroy();
    if (this.patienceBar) this.patienceBar.destroy();

    this.currentTraveler = this.add.text(400, 200, "👤", {
      fontSize: '64px'
    }).setOrigin(0.5);

    this.orderText = this.add.text(400, 270,
      window.i18nStrings['ORDER_TEMPLATE'].replace("{dish}", randomDish), {
        fontSize: '20px',
        fill: '#000'
      }).setOrigin(0.5);

    // Geduldbalkje
    this.patienceValue = 1;
    this.patienceBar = this.add.graphics();
    this.updatePatienceBar();

    // Start geduld decay
    this.patienceTimer = this.time.addEvent({
      delay: 100,
      callback: () => {
        this.patienceValue -= 0.01;
        this.updatePatienceBar();
        if (this.patienceValue <= 0) {
          this.travelerLeaves();
        }
      },
      loop: true
    });
  }

  updatePatienceBar() {
    if (!this.patienceBar) return;

    this.patienceBar.clear();
    this.patienceBar.fillStyle(0xff0000, 1);
    this.patienceBar.fillRect(300, 310, 200 * this.patienceValue, 10);
    this.patienceBar.lineStyle(1, 0x000000);
    this.patienceBar.strokeRect(300, 310, 200, 10);
  }

  travelerLeaves() {
    this.patienceTimer.remove();
    if (this.currentTraveler) this.currentTraveler.destroy();
    if (this.orderText) this.orderText.destroy();
    if (this.patienceBar) this.patienceBar.destroy();

    this.score -= 50;

    // Simuleer boze reiziger
    const angry = this.add.text(400, 200, "😡", {
      fontSize: '64px'
    }).setOrigin(0.5);

    this.time.delayedCall(1000, () => {
      angry.destroy();
      this.spawnTraveler();
    });
  }

  checkOrder(selectedDish) {
    if (!this.currentOrder) return;

    if (selectedDish === this.currentOrder) {
      this.score += 100;
    } else {
      this.score -= 50;
    }

    this.patienceTimer.remove();
    this.spawnTraveler(); // nieuwe reiziger
  }

  endGame() {
    this.scene.stop('UIScene');
    this.scene.start('EndScene', { win: true });
  }
}
