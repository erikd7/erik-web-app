<template>
  <div>
    <div class="flex flex-row flex-wrap justify-center">
      <CardTile
        v-for="[person, personInfo] in Object.entries(data)"
        class="flex flex-col px3"
        :color="personInfo.color"
        :key="person"
        :ref="`expense-list-${person}`"
      >
        <template v-slot:header>
          <div>
            <div
              v-if="editingName === person"
              class="flex flex-row flex-nowrap"
            >
              <input
                :ref="`name-edit-${person}`"
                :value="person"
                placeholder="name"
                @blur="changeName"
                @keypress.enter="changeName"
                @focus="$event.target.select()"
                class="form-control block w-full px-3 py-1.5 text-base font-normal text-gray-700
                bg-white bg-clip-padding border border-solid border-gray-300 rounded m-1
                transition ease-in-out m-0 ml-0
                focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
              />
              <button
                class="button m-1"
                @mousedown="() => removePerson(person)"
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
              <div class="border-b basis-50">
                Payouts
              </div>
            </div>
          </div>
          <div v-for="person in Object.keys(data)" class="table-row">
            <div>
              {{ person }}
            </div>
            <div>
              {{ formatDollar(personTotals[person]) }} ({{
                formatDollar(perPersonBalance[person])
              }})
            </div>
            <div class="flex flex-col flex-nowrap basis-50">
              <div v-for="payout in payouts[person]">
                <a>{{ formatDollar(payout.amount) }}</a>
                <a class="mx-0.5"><i class="fas fa-arrow-right"></i></a>
                <a>{{ payout.to }}</a>
              </div>
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
          expenses: [{ label: "Item 1", amount: 0 }],
          total: 0
        },
        Lindsay: {
          color: this.randomColor("Lindsay"),
          expenses: [{ label: "Item 2", amount: 0 }],
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
        this.personTotals = Object.entries(this.data).reduce(
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
      this.$nextTick(function() {
        const nameRef = this.$refs[`name-edit-${this.defaultName}`][0];
        nameRef.focus();
      });
    },
    addLineForPerson(person) {
      this.data[person].expenses.push({ amount: "" });
    },
    removePerson(person) {
      this.$delete(this.data, person);
    },
    toggleNameEdit(name) {
      this.editingName = this.editingName ? "" : name;
      if (this.editingName) {
        this.$nextTick(function() {
          const nameRef = this.$refs[`name-edit-${name}`][0];
          nameRef.focus();
        });
      }
    },
    changeName(event) {
      const localEditingName = this.editingName;
      if (!localEditingName) return;
      this.toggleNameEdit();

      const newName = event.target.value;
      if (newName && newName !== localEditingName) {
        this.$set(this.data, newName, {
          ...this.data[localEditingName],
          color: this.randomColor(newName)
        });
        this.$delete(this.data, localEditingName);
      }
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
    payouts() {
      return helpers.splitter(this.perPersonBalance);
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
  flex-basis: 25%;
  align-self: center;
}
.result-card > div {
  flex-grow: 1;
}
.basis-50 {
  flex-basis: 50% !important;
}
@media only screen and (min-width: 650px) {
  .result-card > div {
    width: 500px;
    flex-grow: 0;
  }
}
</style>
