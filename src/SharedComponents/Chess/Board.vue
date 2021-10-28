<template>
  <div class="board">
    <!--File-->
    <div v-for="file in files" :key="file" class="file">
      <!--Rank-->
      <div v-for="rank in ranks" :key="rank" class="rank">
        <Square
          :rank="rank"
          :file="file"
          :piece="displayGame.board[`${file}${rank}`]"
          :key="`${file}${rank}`"
          :selectedFrom="displayGame.fromSquare === `${file}${rank}`"
          :selectedTo="displayGame.toSquare === `${file}${rank}`"
          :lastFrom="displayGame.lastFromSquare === `${file}${rank}`"
          :lastTo="displayGame.lastToSquare === `${file}${rank}`"
          :onClick="clickSquare"
        />
      </div>
    </div>
  </div>
</template>

<script>
import Square from "./Square.vue";
import {
  rankArray,
  fileArray,
  isMoveAllowed,
  anyPossibleMove,
} from "../../util/chessHelpers";
import * as api from "../../util/apis";

export default {
  data() {
    return {
      ranks: rankArray,
      files: fileArray,
    };
  },
  components: { Square },
  props: {
    game: {
      type: Object,
      default: () => {},
    },
  },
  computed: {
    displayGame() {
      return this.game;
    },
  },
  methods: {
    getFileArray: fileArray,
    clickSquare(rank, file) {
      const square = `${file}${rank}`;
      if (!this.game.fromSquare) {
        //If no from square, set from square
        if (!anyPossibleMove(this.game, square)) {
          return;
        }
        this.game.fromSquare = square;
      } else if (this.game.fromSquare && this.game.toSquare) {
        //If from square and to square, this is a new move - refresh and set from
        if (!anyPossibleMove(this.game, this.game.fromSquare)) {
          return;
        }
        this.game.fromSquare = square;
        this.game.toSquare = null;
      } else if (square === this.game.fromSquare) {
        //If from square clicked again, unset it as the from square
        this.game.fromSquare = null;
      } else {
        if (
          //If from square but not to square, set to square
          !isMoveAllowed(this.game, this.game.fromSquare, square)
        ) {
          return;
        }
        this.game.toSquare = square;

        //Submit move
        this.submitMove();
      }
    },
    submitMove() {
      if (!this.game.fromSquare || !this.game.toSquare) {
        return;
      }
      const body = {
        ...this.game,
        fromSquare: this.game.fromSquare,
        toSquare: this.game.toSquare,
      };
      api.chessMakeMove.post(body).then((response) => {
        if (response.ok) {
          this.updateAfterMove(response.data);
        } else {
          this.errorMessage = response.message;
        }
      });
    },
    updateAfterMove(game) {
      this.game = game;
      this.$emit("gameUpdate", game);
    },
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style>
.board {
  display: flex;
  flex-flow: row;
  justify-content: center;
  border: 15px solid black;
}
.rank {
  display: flex;
  flex-flow: column;
}
</style>
