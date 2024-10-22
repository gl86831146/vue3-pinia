import { defineStore } from "pinia";

interface Transaction {
  id: number;
  type: "income" | "expense";
  amount: number;
  description: string;
}

interface AccountingState {
  transactions: Transaction[];
}

export const useAccounting = defineStore("accounting", {
  state: (): AccountingState => ({
    transactions: JSON.parse(localStorage.getItem("transactions") || "[]"),
  }),

  getters: {
    totalIncome: (state) => {
      return state.transactions
        .filter((t) => t.type === "income")
        .reduce((sum, t) => sum + t.amount, 0);
    },
    totalExpense: (state) => {
      return state.transactions
        .filter((t) => t.type === "expense")
        .reduce((sum, t) => sum + t.amount, 0);
    },
    balance: (state) => {
      return state.totalIncome - state.totalExpense;
    },
  },

  actions: {
    addTransaction(transaction: Transaction) {
      this.transactions.push(transaction);
      this.updateLocalStorage();
    },
    removeTransaction(id: number) {
      this.transactions = this.transactions.filter((t) => t.id !== id);
      this.updateLocalStorage();
    },
    updateLocalStorage() {
      localStorage.setItem("transactions", JSON.stringify(this.transactions));
    },
  },
});
