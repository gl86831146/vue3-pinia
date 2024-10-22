<template>
    <div>
        <h1>记账应用</h1>
        <form @submit.prevent="addTransaction">
            <select v-model="type">
                <option value="income">收入</option>
                <option value="expense">支出</option>
            </select>
            <input v-model="amount" type="number" placeholder="金额" required />
            <input v-model="description" type="text" placeholder="描述" required />
            <button type="submit">添加记录</button>
        </form>

        <h2>交易记录</h2>
        <ul>
            <li v-for="transaction in accountingStore.transactions" :key="transaction.id">
                {{ transaction.type }}: {{ transaction.amount }} - {{ transaction.description }}
                <button @click="removeTransaction(transaction.id)">删除</button>
            </li>
        </ul>
        <p></p>
        <h2>统计信息</h2>
        <p>总收入: {{ accountingStore.totalIncome }}</p>
        <p>总支出: {{ accountingStore.totalExpense }}</p>
        <p>当前余额: {{ accountingStore.balance }}</p>


    </div>
</template>

<script lang="ts" setup>
import { ref } from "vue";
import { useAccounting } from "../stores/useAccounting";

const accountingStore = useAccounting();
const type = ref("income");
const amount = ref(0);
const description = ref("");

const addTransaction = () => {
    const newTransaction = {
        id: Date.now(),
        type: type.value,
        amount: Number(amount.value),
        description: description.value,
    };
    accountingStore.addTransaction(newTransaction);
    amount.value = 0;
    description.value = "";
};

const removeTransaction = (id: number) => {
    accountingStore.removeTransaction(id);
};  
</script>