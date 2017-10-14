<template>
  <div class="joyPad" ref="joyPad" :style="activeStyle">
    <div class="joyPad-box" ref="joyPadBox">
      <div class="stick" ref="stick">

      </div>
    </div>
  </div>
</template>

<script>
  const defaultLimit = 25;

  const defaultStyle = {
    width: '100px',
    height: '100px',
    right: '10px',
    bottom: '10px',
  };

  export default {
    name: 'JoyPad',

    props: {
      xMin: {
        type: Number,
        default: -defaultLimit,
      },
      xMax: {
        type: Number,
        default: defaultLimit,
      },
      yMin: {
        type: Number,
        default: -defaultLimit,
      },
      yMax: {
        type: Number,
        default: defaultLimit,
      },
      customStyle: Object,
    },

    watch: {
      customStyle(value) {
        this.activeStyle = { ...defaultStyle, ...value };
      },
    },

    data: () => ({
      isMoving: false,
      xSpeed: 0,
      ySpeed: 0,
      activeStyle: defaultStyle,
    }),

    mounted() {
      this.bindJoyPad();
    },

    methods: {
      moveStick(event) {
        if (!this.isMoving) {
          return;
        }
        const stick = this.$refs.stick;
        const joyPadBox = this.$refs.joyPad;
        const xMousePositionOnElement = event.layerX;
        const yMousePositionOnElement = event.layerY;
        const stickHalfWidth = stick.clientWidth / 2;
        const stickHalfHeight = stick.clientHeight / 2;

        let xMouseMove;
        let yMouseMove;
        let newXStickPosition;
        let newYStickPosition;

        if (event.target.className === 'joyPad-box') {
          // If Mouse is outside the stick
          // Put the stick under the mouse
          newXStickPosition = xMousePositionOnElement - stickHalfWidth;
          newYStickPosition = yMousePositionOnElement - stickHalfHeight;
        } else if (event.target.className === 'stick') {
          // If Mouse under Stick
          // Movement on x & y
          xMouseMove = xMousePositionOnElement - this.initialXPositionOnStick;
          yMouseMove = yMousePositionOnElement - this.initialYPositionOnStick;

          // Update stick's position
          newXStickPosition = stick.offsetLeft + xMouseMove;
          newYStickPosition = stick.offsetTop + yMouseMove;
        } else {
          // Get joyPad positions on screen
          const joyPadLeft = joyPadBox.getBoundingClientRect().left;
          const joyPadTop = joyPadBox.getBoundingClientRect().top;

          // Movement on x & y take care of joyPad position on screen
          xMouseMove = (event.clientX - joyPadLeft) - stickHalfWidth;
          yMouseMove = (event.clientY - joyPadTop) - stickHalfHeight;

          newXStickPosition = xMouseMove;
          newYStickPosition = yMouseMove;
        }

        // Keep the stick in the box
        if (newXStickPosition >= -stickHalfWidth &&
          newXStickPosition <= joyPadBox.offsetWidth - stickHalfWidth) {
          // Manage linear acceleration
          this.xSpeed = (newXStickPosition - stickHalfWidth) / 2.5;
          stick.style.left = `${newXStickPosition}px`;
        }
        if (newYStickPosition >= -stickHalfHeight &&
          newYStickPosition <= joyPadBox.offsetHeight - stickHalfHeight) {
          // Manage linear acceleration
          this.ySpeed = (newYStickPosition - stickHalfHeight) / 2.5;
          stick.style.top = `${newYStickPosition}px`;
        }

        this.$emit('move', this.xSpeed, this.ySpeed);
      },

      bindJoyPad() {
        const stick = this.$refs.stick;

        stick.addEventListener('mousedown', (event) => {
          this.isMoving = true;
          this.initialXPositionOnStick = event.layerX;
          this.initialYPositionOnStick = event.layerY;
        });
        document.addEventListener('mouseup', () => {
          this.isMoving = false;
          stick.style.left = '25%';
          stick.style.top = '25%';
          this.xSpeed = 0;
          this.ySpeed = 0;
          this.$emit('move', this.xSpeed, this.ySpeed);
        });
        document.addEventListener('mousemove', this.moveStick);
      },
    },
  };
</script>

<style lang="stylus">
  .joyPad
    position: absolute
    border-radius: 50%
    border: solid 1px black

    .joyPad-box
      width: 100%
      height: 100%

      .stick
        background-color: gray
        width: 50%
        height: 50%
        border-radius: 50%
        position: absolute
        top: 25%
        left: 25%
</style>
