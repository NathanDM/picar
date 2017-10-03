const shipModels = [
  {
    width: 120,
    height: 125,
    url: './static/onlyship-4x.png',
  },
];

export default class Player {
  constructor(x, y, limitX, limitY) {
    const shipModel = shipModels[0];
    this.x = x;
    this.y = y;
    this.width = shipModel.width;
    this.height = shipModel.height;
    this.xSpeed = 0;
    this.ySpeed = 0;
    this.missiles = [];
    this.ship = new Image();
    this.limitX = limitX - this.width;
    this.limitY = limitY - this.height;

    this.ship.src = shipModel.url;
    this.ship.onload = () => {
      this.ship.isLoaded = true;
    };
  }

  render(ctx) {
    this.updatePosition();
    this.drawShip(ctx);
    this.drawMissiles(ctx);
  }

  updatePosition() {
    let x = this.x + this.xSpeed;
    let y = this.y + this.ySpeed;

    x = x > 0 && x < this.limitX ? x : this.x;
    y = y > 0 && y < this.limitY ? y : this.y;

    this.x = x;
    this.y = y;
  }

  setSpeed = (xSpeed, ySpeed) => {
    this.xSpeed = xSpeed;
    this.ySpeed = ySpeed;
  }

  fire = () => {
    this.missiles.push({ x: this.x + (this.width / 2), y: this.y });
  }

  drawShip(ctx) {
    if (this.ship.isLoaded) {
      ctx.drawImage(this.ship,
        (this.ship.width / 5) * this.getSprite(), 0, this.ship.width / 5, this.ship.height,
        this.x, this.y, this.width, this.height);
    }
  }

  drawMissiles(ctx) {
    this.missiles = this.missiles.filter((item) => {
      const missile = item;
      missile.y -= 10;
      ctx.beginPath();
      ctx.arc(missile.x, missile.y, 10, 0, 2 * Math.PI);
      ctx.fillStyle = 'magenta';
      ctx.fill();
      if (missile.y < -10) {
        return false;
      }
      return missile;
    });
  }

  getSprite() {
    if (this.xSpeed <= -2.5) {
      return 0;
    }
    if (this.xSpeed < 0) {
      return 1;
    }
    if (this.xSpeed === 0) {
      return 2;
    }
    if (this.xSpeed > 2.5) {
      return 4;
    }
    if (this.xSpeed > 0) {
      return 3;
    }

    return 2;
  }
}
