<template>
  <div
    class="square"
    :class="{
      'selected-from-square': selectedFrom,
      'selected-to-square': selectedTo,
      'last-from-square': lastFrom,
      'last-to-square': lastTo,
      'dark-square': even,
      'light-square': !even,
    }"
    :title="tooltip"
    @click="onClick(rank, file)"
  >
    {{ pieceDisplay }}
  </div>
</template>

<script>
import {
  squareLabel,
  squareIsEven,
  getDisplayPiece,
} from "../../util/chessHelpers";

export default {
  data() {
    return {
      tooltip: squareLabel(this.rank, this.file),
      even: squareIsEven(this.rank, this.file),
    };
  },
  props: {
    rank: {
      type: Number,
      default: null,
    },
    file: {
      type: String,
      default: "",
    },
    piece: {
      type: String,
      default: "",
    },
    selectedFrom: {
      type: Boolean,
      default: false,
    },
    selectedTo: {
      type: Boolean,
      default: false,
    },
    lastFrom: {
      type: Boolean,
      default: false,
    },
    lastTo: {
      type: Boolean,
      default: false,
    },
    onClick: {
      type: Function,
      default: () => {},
    },
    startDrag: {
      type: Function,
      default: () => {},
    },
    onDrop: {
      type: Function,
      default: () => {},
    },
  },
  computed: {
    pieceDisplay() {
      return getDisplayPiece(this.piece);
    },
  },
  methods: {},
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style>
.square {
  height: calc(0.7 * 100vmin / 8);
  width: calc(0.7 * 100vmin / 8);
  border: none;
  font-size: calc(0.7 * 100vmin / 8);
  padding: 5px;
  text-align: center;
  display: flex;
  justify-content: center;
  align-items: center;
  -webkit-user-select: none; /* Safari */
  -moz-user-select: none; /* Firefox */
  -ms-user-select: none; /* IE10+/Edge */
  user-select: none; /* Standard */
}
.square:hover {
  filter: drop-shadow(2px 4px 6px black);
  font-size: calc(1.1 * 0.7 * 100vmin / 8);
}
.dark-square {
  background-color: lightslategrey;
}
.light-square {
  background-color: white;
}
.selected-from-square {
  background-color: #499c49;
}
.selected-to-square {
  background-color: #75d875;
}
.last-from-square {
  background-color: #909c49;
}
.last-to-square {
  background-color: #c6d875;
}
</style>
