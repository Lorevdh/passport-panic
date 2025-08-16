export default class UIScene extends Phaser.Scene {
  constructor() {
    super('UIScene');
  }

  create() {
    this.scoreText = this.add.text(16, 16, 'Score: 0', {
      fontSize: '20px',
      fill: '#000'
    });

    this.timerText = this.add.text(16, 40, 'Time: 90', {
      fontSize: '20px',
      fill: '#000'
    });

    this.gameScene = this.scene.get('GameScene');
  }

  update() {
    this.scoreText.setText('Score: ' + this.gameScene.score);
    this.timerText.setText('Time: ' + this.gameScene.timeLeft);
  }
}
