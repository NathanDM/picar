<template>
  <div class="joyPad" ref="joyPad" :style="positions">
    <div class="joyPad-box" ref="joyPadBox">
      <div class="stick" ref="stick">

      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'JoyPad',

    props: {
      positions: {
        bottom: String,
        right: String,
      },
    },

    data: () => ({
      isMoving: false,
      xSpeed: 0,
      ySpeed: 0,
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

        let newXStickPosition;
        let newYStickPosition;

        // If Mouse is outside the stick
        if (event.target.className === 'joyPad-box') {
          newXStickPosition = xMousePositionOnElement - 25;
          newYStickPosition = yMousePositionOnElement - 25;
        } else if (event.target.className === 'stick') {
          // Movement on x & y
          const xMouseMove = xMousePositionOnElement - this.initialXPositionOnStick;
          const yMouseMove = yMousePositionOnElement - this.initialYPositionOnStick;

          // Update stick's position
          newXStickPosition = stick.offsetLeft + xMouseMove;
          newYStickPosition = stick.offsetTop + yMouseMove;
        } else {
          return;
        }

        // Keep the stick in the box
        if (newXStickPosition >= -25 && newXStickPosition <= joyPadBox.offsetWidth - 25) {
          this.xSpeed = (newXStickPosition - 25) / 2.5;
          stick.style.left = `${newXStickPosition}px`;
        }
        if (newYStickPosition >= -25 && newYStickPosition <= joyPadBox.offsetHeight - 25) {
          this.ySpeed = (newYStickPosition - 25) / 2.5;
          stick.style.top = `${newYStickPosition}px`;
        }

        this.$emit('move', this.xSpeed, this.ySpeed);
      },

      bindJoyPad() {
        const stick = this.$refs.stick;
        const joyPadBox = this.$refs.joyPadBox;

        stick.addEventListener('mousedown', (event) => {
          this.isMoving = true;
          this.initialXPositionOnStick = event.layerX;
          this.initialYPositionOnStick = event.layerY;
        });
        document.addEventListener('mouseup', () => {
          this.isMoving = false;
          stick.style.left = '25px';
          stick.style.top = '25px';
          this.xSpeed = 0;
          this.ySpeed = 0;
          this.$emit('move', this.xSpeed, this.ySpeed);
        });
        joyPadBox.addEventListener('mousemove', this.moveStick);
      },
    },
  };
</script>

<style lang="stylus">
  .joyPad
    width: 100px
    height: 100px
    position: absolute
    border-radius: 50%
    border: solid 1px black
    bottom: 10px
    right: 10px

    .joyPad-box
      width: 100%
      height: 100%

      .stick
        background-color: gray
        width: 50px
        height: 50px
        border-radius: 50%
        position: absolute
        bottom: 25px
        right: 25px
</style>
