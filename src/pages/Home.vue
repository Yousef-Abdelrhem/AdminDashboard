<script setup>
import SearchBar from "../components/SearchBar.vue";
import Avatar from "../components/Avatar.vue";
import HomeCard from "../components/HomeCard.vue";
import axios from "axios";
import { ref, onMounted, computed } from "vue";


const data = ref({
  totalRevenue: 0,
  numberOfOrders: 0,
  averageOrderValue: 0,
  newOrders: 0,
  newCustomers: 0
});

const cards = ref([
  { title: "Total Revenue", value: "$0", key: "totalRevenue", prefix: "$" },
  { title: "Number Of Orders", value: "0", key: "numberOfOrders" },
  { title: "Average Order Value", value: "$0", key: "averageOrderValue", prefix: "$" },
  { title: "Number Of New Customer", value: "0", key: "newCustomers" },
  { title: "Number of New Products", value: "0", key: "newProducts" },
  { title: "Number Of New Orders", value: "0", key: "newOrders" },
]);

const searchTerm = ref("");

async function fetchDashboardData() {
  try {
    const response = await axios.get("https://admin-dashboard-gilt-omega.vercel.app/dashboard/summary");
    data.value = response.data;
    console.log(data.value);
  } catch (error) {
    console.error("Error fetching dashboard data:", error);
  }
}


const filteredCards = computed(() => {
  return cards.value
    .map(card => {
      const raw = data.value[card.key];
      const formattedValue = card.prefix
        ? `${card.prefix}${raw?.toLocaleString?.() ?? 0}`
        : `${raw?.toLocaleString?.() ?? 0}`;

      return {
        ...card,
        value: formattedValue
      };
    })
    .filter(card =>
      card.title.toLowerCase().includes(searchTerm.value.toLowerCase())
    );
});


</script>

<template>
  <div class="pr-2 pl-2">
    <div class="mt-2 mb-3 flex gap-1 lg:mt-10 lg:gap-10">
      <SearchBar v-model="searchTerm"/>
      <Avatar />
    </div>
    <section class="w-full rounded-xl border-2 border-[#EFEFEF] p-4 pt-5 pr-4 pb-5">
      <h2 class="text-main-950 mb-6 text-2xl font-bold">Overview</h2>

      <!-- <div class="grid justify-center md gap-5 lg:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4">
        <HomeCard class="transition-all duration-300 hover:scale-105" title="Total Revenue" :value="data.totalRevenue" />
        <HomeCard class="transition-all duration-300 hover:scale-105" title="Number Of Orders" />
        <HomeCard class="transition-all duration-300 hover:scale-105" title="Average Order Value" />
        <HomeCard class="transition-all duration-300 hover:scale-105" title="Number Of New Cuctomer" />
        <HomeCard class="transition-all duration-300 hover:scale-105" title="Number of New Products" />
        <HomeCard class="transition-all duration-300 hover:scale-105" title="Number Of New Orders" />
        <HomeCard class="transition-all duration-300 hover:scale-105" title="Orders" />
      </div> -->
      <div class="grid justify-center md gap-5 lg:grid-cols-2 xl:grid-cols-3 [1750px]:grid-cols-4 place-items-center">
        <HomeCard v-for="(card, index) in filteredCards" :key="index" :title="card.title" :value="card.value"
          class="transition-all duration-300 hover:scale-105" />
      </div>
    </section>
  </div>
</template>
