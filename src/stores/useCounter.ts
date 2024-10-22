import { defineStore } from "pinia";

// 定义 CounterState 的接口
interface CounterState {
  count: number;
}

// 定义 Store，名为 counter
export const useCounter = defineStore("counter", {
  state: (): CounterState => ({
    count: 0,
  }),

  getters: {
    doubleCount: (state): number => state.count * 2,
  },

  actions: {
    increment() {
      this.count++;
    },
    decrement() {
      this.count--;
    },
  },
});
