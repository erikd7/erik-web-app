<template>
  <div>
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

export default {
  data() {
    return {
      game: { board: {} },
    };
  },
  props: {},
  components: { Board, Sidebar },
  computed: {
    toMoveColor() {
      return colorDisplay[this.game.toMove];
    },
  },
  methods: {
    newGame() {
      api.chessNewGame.get().then((response) => {
        if (response.ok) {
          this.game = response.data;
        } else {
          this.errorMessage = response.message;
        }
      });
    },
    gameUpdate(game) {
      this.game = game;
    },
  },
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
