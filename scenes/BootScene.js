export default class BootScene extends Phaser.Scene {
  constructor() {
    super('BootScene');
  }

  preload() {
    this.load.json('i18n', 'i18n/strings.json');
  }

  create() {
    window.i18nStrings = this.cache.json.get('i18n')['en'];
    this.scene.start('MenuScene');
  }
}
