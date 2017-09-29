<template>
</template>

<script>
  export default {
    name: 'key-board',
    data: () => ({
      xSpeed: 0,
      ySpeed: 0,
    }),

    mounted() {
      this.bindKeyboard();
    },

    methods: {
      bindKeyboard() {
        document.addEventListener('keyup', (event) => {
          switch (event.keyCode) {
            case 37:
              this.xSpeed = this.xSpeed < 0 ? this.xSpeed + 5 : this.xSpeed;
              break;
            case 38:
              this.ySpeed = this.ySpeed < 0 ? this.ySpeed + 5 : this.ySpeed;
              break;
            case 39:
              this.xSpeed = this.xSpeed > 0 ? this.xSpeed - 5 : this.xSpeed;
              break;
            case 40:
              this.ySpeed = this.ySpeed > 0 ? this.ySpeed - 5 : this.ySpeed;
              break;
            default:
          }
          this.$emit('move', this.xSpeed, this.ySpeed);
        });
        document.addEventListener('keydown', (event) => {
          switch (event.keyCode) {
            case 37:
              this.xSpeed = this.xSpeed >= 0 ? this.xSpeed - 5 : this.xSpeed;
              break;
            case 38:
              this.ySpeed = this.ySpeed >= 0 ? this.ySpeed - 5 : this.ySpeed;
              break;
            case 39:
              this.xSpeed = this.xSpeed <= 0 ? this.xSpeed + 5 : this.xSpeed;
              break;
            case 40:
              this.ySpeed = this.ySpeed <= 0 ? this.ySpeed + 5 : this.ySpeed;
              break;
            case 32:
              this.$emit('action1');
              break;
            default:
          }
          this.$emit('move', this.xSpeed, this.ySpeed);
        });
      },
    },
  };
</script>

<style lang="stylus">

  .dashboard
    width: 800px
    height: 600px
    border: solid 1px black
    position: relative

    .scene
      width: 100%
      height: 100%

</style>
