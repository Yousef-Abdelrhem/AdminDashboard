<script setup>
import SearchBar from "../components/SearchBar.vue";
import Avatar from "../components/Avatar.vue";
import HomeCard from "../components/HomeCard.vue";
</script>

<template>
  <div class="pr-2 pl-2">
    <div class="mt-2 mb-3 flex gap-1 lg:mt-10 lg:gap-10">
      <SearchBar />
      <Avatar />
    </div>
    <section
      class="w-full rounded-xl border-2 border-[#EFEFEF] p-4 pt-5 pr-4 pb-5"
    >
      <h2 class="text-main-950 mb-6 text-2xl font-bold">Overview</h2>

      <div
        class="grid justify-center md gap-5 lg:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4"
      >
        <HomeCard  class="transition-all duration-300 hover:scale-105"/>
        <HomeCard  class="transition-all duration-300 hover:scale-105"/>
        <HomeCard  class="transition-all duration-300 hover:scale-105"/>
        <HomeCard  class="transition-all duration-300 hover:scale-105"/>
        <HomeCard  class="transition-all duration-300 hover:scale-105"/>
        <HomeCard  class="transition-all duration-300 hover:scale-105"/>
        <HomeCard  class="transition-all duration-300 hover:scale-105"/>
        <HomeCard  class="transition-all duration-300 hover:scale-105"/>

      </div>
    </section>
  </div>
</template>
