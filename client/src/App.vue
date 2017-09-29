<template>
  <v-app id="app" :light="light" :dark="!light" toolbar standalone>

    <!--Left Drawer-->
    <v-navigation-drawer :light="light" :dark="!light" v-model="drawer" persistent overflow fixed
                         enable-resize-watcher
                         :mini-variant.sync="mini">
      <v-toolbar flat class="transparent">
        <v-list class="pa-0">
          <v-list-tile avatar tag="div">
            <v-list-tile-avatar>
            </v-list-tile-avatar>
            <v-list-tile-content>
              <v-list-tile-title>{{ appName }}</v-list-tile-title>
            </v-list-tile-content>
            <v-list-tile-action>
              <v-btn icon @click.native.stop="mini = !mini">
                <v-icon>chevron_left</v-icon>
              </v-btn>
            </v-list-tile-action>
          </v-list-tile>
        </v-list>
      </v-toolbar>

      <v-divider></v-divider>
      <router-view name="op-drawer"></router-view>

    </v-navigation-drawer>

    <!--NavBar-->
    <v-toolbar fixed dark>
      <v-toolbar-side-icon @click.stop="drawer = !drawer"></v-toolbar-side-icon>
      <v-toolbar-title v-if="!drawer || mini">{{ appName }}</v-toolbar-title>
      <v-spacer></v-spacer>
    </v-toolbar>

    <!--Content-->
    <main>
      <v-container fluid light>
        <router-view></router-view>
      </v-container>
    </main>
  </v-app>
</template>

<script>
  export default {
    name: 'app',
    data: () => ({
      appName: 'piCar',
      drawer: true,
      mini: true,
      light: false,
    }),
  };
</script>

<style lang="stylus">
  @import url('https://fonts.googleapis.com/icon?family=Material+Icons')
  @require '../node_modules/vuetify/src/stylus/settings/_colors'

  $theme := {
    primary: $red.darken-2
    accent: $red.accent-2
    secondary: $grey.lighten-1
    info: $blue.lighten-1
    warning: $amber.darken-2
    error: $red.accent-4
    success: $green.lighten-2
  }

  @require '../node_modules/vuetify/src/stylus/main'
</style>
