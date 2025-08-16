export default class EndScene extends Phaser.Scene {
  constructor() {
    super('EndScene');
  }

  init(data) {
    this.win = data.win;
  }

  create() {
    const msg = this.win ? window.i18nStrings['MSG_WIN'] : window.i18nStrings['MSG_LOSE'];
    this.add.text(400, 250, msg, { fontSize: '28px', fill: '#000' }).setOrigin(0.5);

    this.add.text(400, 350, 'Restart', {
      fontSize: '24px',
      fill: '#00f'
    }).setOrigin(0.5).setInteractive().on('pointerdown', () => {
      this.scene.start('MenuScene');
    });
  }
}
