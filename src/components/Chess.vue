<template>
  <div>
    <div class="p-3 text-4xl text-center">Under Construction!</div>
    <Sidebar>
      <div>
        <button class="button" @click="newGame">
          New Game
        </button>
      </div>
      <div>To Move: {{ toMoveColor }}</div>
    </Sidebar>
    <div class="board-holder">
      <Board :game="game" @gameUpdate="gameUpdate" />
    </div>
  </div>
</template>

<script>
import Board from "../SharedComponents/Chess/Board.vue";
import Sidebar from "../SharedComponents/Sidebar.vue";
import { colorDisplay } from "../util/chessHelpers";
import * as api from "../util/apis";
import * as localStorageHelpers from "../util/localStorage";

export default {
  data() {
    return {
      game: { board: {} }
    };
  },
  props: {},
  components: { Board, Sidebar },
  mounted() {
    const existingGame = this.$cookies.get("chessCurrentGame");
    if (existingGame) this.game = existingGame;
    else this.newGame();
  },
  computed: {
    toMoveColor() {
      return colorDisplay[this.game.toMove];
    }
  },
  methods: {
    newGame() {
      this.$cookies.remove("chessCurrentGame");
      const currentLocalValue = localStorageHelpers.get("chess-new");
      if (currentLocalValue) {
        this.game = currentLocalValue;
      } else {
        api.chessNewGame.get().then(response => {
          if (response.ok) {
            this.game = response.data;
            localStorageHelpers.set("chess-new", response.data, {
              expirationValue: 1,
              expirationUnits: "d"
            });
          } else {
            this.errorMessage = response.message;
          }
        });
      }
    },
    gameUpdate(game) {
      this.game = game;
      this.$cookies.set("chessCurrentGame", game, "1d");
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.header {
  font-weight: bold;
}
.board-holder {
  display: flex;
  justify-content: center;
}
</style>
