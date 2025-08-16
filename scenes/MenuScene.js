export default class MenuScene extends Phaser.Scene {
  constructor() {
    super('MenuScene');
  }

  create() {
    const playText = this.add.text(400, 300, window.i18nStrings['UI_PLAY'], {
      fontSize: '32px',
      fill: '#000'
    }).setOrigin(0.5).setInteractive();

    playText.on('pointerdown', () => {
      this.scene.start('GameScene');
      this.scene.start('UIScene');
    });
  }
}
