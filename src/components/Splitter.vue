<template>
  <div>
    <div class="flex flex-row flex-wrap justify-center">
      <CardTile
        v-for="[person, personInfo] in Object.entries(data)"
        class="flex flex-col px3"
        :color="personInfo.color"
        :key="person"
      >
        <template v-slot:header>
          <div>
            <div
              v-if="editingName === person"
              class="flex flex-row flex-nowrap"
            >
              <input
                :ref="`name-edit-${person}`"
                :value="editingName"
                placeholder="name"
                @blur="changeName"
                @keypress.enter="changeName"
                class="form-control block w-full px-3 py-1.5 text-base font-normal text-gray-700
                bg-white bg-clip-padding border border-solid border-gray-300 rounded m-1
                transition ease-in-out m-0 ml-0
                focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
              />
              <button
                class="button m-1"
                @click="() => removePerson(person)"
                title="Remove person"
              >
                <i class="fas fa-trash"></i>
              </button>
            </div>
            <div
              v-if="editingName !== person"
              @click="() => toggleNameEdit(person)"
              title="Tap to change name"
              class="cursor-pointer"
            >
              {{ person }}
            </div>
          </div>
        </template>
        <template v-slot:body>
          <div class="p-1">
            <ExpenseList :person="person" :expenses="personInfo?.expenses" />
          </div>
        </template>
        <template v-slot:footer>
          <div class="flex flex-row justify-between">
            <button
              class="button w-24 justify-center"
              @click="() => addLineForPerson(person)"
              :disabled="personInfo.expenses?.length > 10"
              :title="`Add line for ${person}`"
            >
              <i class="fas fa-plus"></i>
            </button>
            <div class="text-right pr-10px self-center font-bold">
              {{ formatDollar(personTotals[person]) }}
            </div>
          </div>
        </template>
      </CardTile>
    </div>
    <div class="flex justify-center">
      <button
        class="button m-1 w-32"
        @click="addPerson"
        :disabled="data[defaultName] || Object.keys(data)?.length > 10"
        title="Add person"
      >
        <i class="fas fa-plus"></i>
      </button>
    </div>
    <div class="flex flex-row flex-wrap justify-center result-card">
      <CardTile class="flex flex-col px3">
        <template v-slot:header>
          <div>Total: {{ formatDollar(totalExpense) }}</div>
          <div>Per Person: {{ formatDollar(perPersonExpense) }}</div>
        </template>
        <template v-slot:body>
          <div class="flex flex-col">
            <div class="table-row">
              <div class="border-b">
                Name
              </div>
              <div class="border-b">
                Expense
              </div>
              <div class="border-b">
                Balance
              </div>
            </div>
          </div>
          <div v-for="person in Object.keys(data)" class="table-row">
            <div>
              {{ person }}
            </div>
            <div>
              {{ formatDollar(personTotals[person]) }}
            </div>
            <div>
              {{ formatDollar(perPersonBalance[person]) }}
            </div>
          </div>
        </template>
      </CardTile>
    </div>
  </div>
</template>

<script>
import CardTile from "../SharedComponents/CardTile";
import ExpenseList from "../SharedComponents/Splitter/ExpensesList.vue";
import uniqolor from "uniqolor";
import helpers from "../util/helpers";

export default {
  components: { CardTile, ExpenseList },
  props: {
    resume: {
      type: Object,
      default: () => {}
    }
  },
  data() {
    return {
      data: {
        Erik: {
          color: this.randomColor("Erik"),
          expenses: [{ label: "Rent", amount: 0 }],
          total: 0
        },
        Lindsay: {
          color: this.randomColor("Lindsay"),
          expenses: [{ label: "Electric", amount: 0 }],
          total: 0
        }
      },
      personTotals: { Erik: 0, Lindsay: 0 },
      defaultName: "name",
      editingName: undefined
    };
  },
  watch: {
    data: {
      handler() {
        const res = Object.entries(this.data).reduce(
          (totals, [person, personInfo]) => {
            totals[person] = personInfo.expenses.reduce(
              (personalTotal, expense) =>
                personalTotal + Number(expense.amount),
              0
            );
            return totals;
          },
          {}
        );
        this.personTotals = res;
      },
      deep: true
    }
  },
  methods: {
    formatDollar(input) {
      return helpers.formatDollar(input);
    },
    randomColor(input) {
      return uniqolor(input, { lightness: 70 }).color;
    },
    addPerson() {
      this.$set(this.data, this.defaultName, {
        expenses: [{ amount: "" }],
        total: 0,
        color: this.randomColor(this.defaultName)
      });
      this.editingName = this.defaultName;
      //console.log(`all refs`, this.$refs); /* //!DELETE */
      //console.log(`ref key`, `name-edit-${this.defaultName}`); /* //!DELETE */
      //const myRef = this.$refs[`name-edit-name`];
      //console.log(`myref`, myRef); /* //!DELETE */
      //myRef.focus();
    },
    addLineForPerson(person) {
      this.data[person].expenses.push({ amount: "" });
    },
    removePerson(person) {
      this.$delete(this.data, person);
    },
    toggleNameEdit(name) {
      this.editingName = this.editingName ? "" : name;
    },
    changeName({ target: eventTarget }) {
      const newName = eventTarget.value;
      if (newName !== this.editingName) {
        this.$set(this.data, newName, {
          ...this.data[this.editingName],
          color: this.randomColor(newName)
        });
        this.$delete(this.data, this.editingName);
      }
      this.toggleNameEdit();
    }
  },
  computed: {
    totalExpense() {
      return Object.values(this.personTotals).reduce(
        (total, personTotal) => total + personTotal,
        0
      );
    },
    perPersonExpense() {
      return this.totalExpense / Object.keys(this.personTotals).length;
    },
    perPersonBalance() {
      return Object.entries(this.personTotals).reduce(
        (acc, [person, personTotal]) => ({
          ...acc,
          [person]: personTotal - this.perPersonExpense
        }),
        {}
      );
    },
    result() {
      return {
        Erik: { amount: 0, to: undefined },
        Lindsay: { amount: 0, to: undefined }
      };
    }
  }
};
</script>
<style scoped>
.table-row {
  display: flex;
  flex-direction: row;
  flex-wrap: nowrap;
  padding: 5px;
}
.table-row > div {
  padding: 5px;
  flex-grow: 1;
  flex-basis: 50px;
}
.result-card > div {
  flex-grow: 1;
}
@media only screen and (min-width: 650px) {
  .result-card > div {
    width: 400px;
    flex-grow: 0;
  }
}
</style>
