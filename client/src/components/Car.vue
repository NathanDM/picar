<template>
  <!--User-->
  <div>
    <v-flex xs6>
      <div class="dashboard">
        <canvas class="scene" ref="scene" :width="this.width" :height="this.height"></canvas>

        <!--Player 1 controller-->
        <joy-pad @move="this.player1.setSpeed"></joy-pad>

        <!--Player 2 controller-->
        <joy-pad :customStyle="{ bottom : '10px', left: '10px'}" @move="this.player2.setSpeed"></joy-pad>

        <!--Player 1 optional controller-->
        <key-board @move="this.player1.setSpeed" @action1="this.player1.fire"></key-board>
      </div>
    </v-flex>
    <!--free Space-->
    <v-flex xs6 text-xs-left>
      <h6>is Car Connected : {{isCarConnected}}</h6>
      <h6>Missiles : {{this.player1.missiles.length}}</h6>
      <h6>X : {{this.player1.x}}</h6>
      <h6>Y : {{this.player1.y}}</h6>
    </v-flex>
  </div>
</template>

<script>
  import JoyPad from './JoyPad';
  import KeyBoard from './KeyBoard';
  import Player from './Player';

  export default {
    name: 'car',
    components: { JoyPad, KeyBoard },
    data: () => ({
      show: false,
      isMoving: false,
      width: 800,
      height: 600,
      interval: null,
      frequency: 10,
      player1: new Player(400, 300, 800, 600),
      player2: new Player(450, 300, 800, 600),
      socket: undefined,
      isCarConnected: false,
    }),

    mounted() {
      this.startScene();
      this.connectWS();
    },

    methods: {
      startScene() {
        if (this.interval === null) {
          // Init interval to render
          this.interval = setInterval(() => {
            // Stop render if no speed
            const scene = this.$refs.scene;
            if (scene) {
              const ctx = scene.getContext('2d');
              ctx.clearRect(0, 0, scene.width, scene.height);
              this.render(ctx);
            }
          }, this.frequency);
        }
      },

      connectWS() {
        this.socket = new WebSocket('ws://localhost:3000');
        this.socket.onopen = () => {
          this.socket.onmessage = (data) => {
            window.console.log(data);
          };
        };
      },

      render(ctx) {
        this.player1.render(ctx);
        this.player2.render(ctx);
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
