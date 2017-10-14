<template>
  <!--User-->
  <div>
    <v-container grid-list-md text-xs-center>
      <v-layout row wrap>
        <v-flex xs6 text-xs-left>
          <div class="dashboard">
            <canvas class="scene" ref="scene" :width="this.width" :height="this.height"></canvas>

            <!--Player 1 controller-->
            <joy-pad @move="this.player1.setSpeed"></joy-pad>

            <!--Player 2 controller-->
            <joy-pad :customStyle="{ bottom : '10px', left: '10px' }" @move="this.player2.setSpeed"></joy-pad>

            <!--Player 1 optional controller-->
            <key-board @move="this.player1.setSpeed" @action1="this.player1.fire"></key-board>

            <!--Snes controller (beta)-->
            <snes @a="this.player2.fire"
                  @b="this.player2.fire"
                  @x="this.player2.fire"
                  @y="this.player2.fire"
                  @top="() => this.player2.setSpeed(0, -2.5)"
                  @right="() => this.player2.setSpeed(2.5, 0)"
                  @bottom="() => this.player2.setSpeed(0, 2.5)"
                  v-on:left="() => this.player2.setSpeed(-2.5, 0)"></snes>
            <ps4></ps4>
          </div>
        </v-flex>
        <!--free Space-->
        <v-flex xs6 text-xs-left>
          <h6>is Car Connected : {{isCarConnected}}</h6>
          <h6>Missiles : {{this.player1.missiles.length}}</h6>
          <h6>X : {{this.player1.x}}</h6>
          <h6>Y : {{this.player1.y}}</h6>
        </v-flex>
      </v-layout>
    </v-container>
  </div>
</template>

<script>
  import JoyPad from './JoyPad';
  import KeyBoard from './KeyBoard';
  import Player from './Player';
  import Snes from './Snes';
  import Ps4 from './Ps4';

  export default {
    name: 'car',
    components: { JoyPad, KeyBoard, Snes, Ps4 },
    data: () => ({
      show: false,
      isMoving: false,
      width: 800,
      height: 600,
      interval: null,
      frequency: 10,
      snesListeners: [],
      player1: new Player(400, 300, 800, 600),
      player2: new Player(450, 300, 800, 600),
      socket: undefined,
      isCarConnected: false,
    }),

    mounted() {
      this.startScene();
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
