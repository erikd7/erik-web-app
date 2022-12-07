<template>
  <div>
    <div
      v-for="(expense, index) in expenses"
      :key="index"
      class="flex flex-nowrap"
      style="width: 300px;"
    >
      <input
        v-model="expense.label"
        placeholder="label"
        @focus="$event.target.select()"
        class="form-control block w-full px-3 py-1.5 text-base font-normal text-gray-700
          bg-white bg-clip-padding border border-solid border-gray-300 rounded m-1
          transition ease-in-out m-0 ml-0
          focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
      />
      <input
        v-model="expense.amount"
        type="number"
        :ref="`amount`"
        placeholder="amount"
        @focus="$event.target.select()"
        class="form-control block w-full px-3 py-1.5 text-base font-normal text-gray-700
          bg-white bg-clip-padding border border-solid border-gray-300 rounded m-1
          transition ease-in-out m-0 ml-0
          focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
      />
      <div class="flex-grow-0 flex-shrink-0" style="flex-basis: 30px;">
        <div
          v-if="index !== 0"
          class="cursor-pointer hover-grow text-xl h-full flex flex-row justify-center items-center"
          @click="() => removeLine(index)"
          title="Remove line"
        >
          <div style="color: #60789e;">
            <i class="fas fa-times-circle"></i>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {};
  },
  props: {
    person: {
      type: String,
      required: true
    },
    expenses: {
      type: Array,
      default: () => []
    }
  },
  watch: {
    numExpenses: {
      handler(newNum, oldNum) {
        if (newNum > oldNum || !this.expenses[newNum - 1]?.amount)
          this.$nextTick(function() {
            const amountRef = this.$refs.amount[this.$refs.amount.length - 1];
            amountRef.focus();
          });
      },
      deep: true
    }
  },
  methods: {
    removeLine(index) {
      this.expenses.splice(index, 1);
    }
  },
  computed: {
    numExpenses() {
      return this.expenses.length;
    }
  }
};
</script>

<style scoped>
.card-title {
  font-weight: bold;
  border-bottom: 1px solid #425677;
}
.card-title > div {
  padding: 0px 5px;
}
</style>
