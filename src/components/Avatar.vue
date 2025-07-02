<script setup>
import { ref, onMounted, onBeforeUnmount } from 'vue'
import { useRouter } from 'vue-router'

const showMenu = ref(false)
const menuRef = ref(null)
const router = useRouter()

const toggleMenu = () => {
  showMenu.value = !showMenu.value
}


const logout = () => {

  localStorage.removeItem('token') 
  localStorage.removeItem('user') 


  showMenu.value = false

  router.push('/login')
}


const handleClickOutside = (event) => {
  if (menuRef.value && !menuRef.value.contains(event.target)) {
    showMenu.value = false
  }
}


onMounted(() => {
  document.addEventListener('click', handleClickOutside)
})


onBeforeUnmount(() => {
  document.removeEventListener('click', handleClickOutside)
})
</script>

<template>
  <div class="relative">
    <!-- Avatar -->
    <div class="gap-3 flex items-center lg:gap-4">
      <div
        class="flex h-12 w-12 items-center justify-center rounded-full border border-[#F4F4F4]"
      >
        <svg
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          class="h-6 w-6"
        >
          <path
            d="M2.52992 14.7696C2.31727 16.1636 3.268 17.1312 4.43205 17.6134C8.89481 19.4622 15.1052 19.4622 19.5679 17.6134C20.732 17.1312 21.6827 16.1636 21.4701 14.7696C21.3394 13.9129 20.6932 13.1995 20.2144 12.5029C19.5873 11.5793 19.525 10.5718 19.5249 9.5C19.5249 5.35786 16.1559 2 12 2C7.84413 2 4.47513 5.35786 4.47513 9.5C4.47503 10.5718 4.41272 11.5793 3.78561 12.5029C3.30684 13.1995 2.66061 13.9129 2.52992 14.7696Z"
            stroke="#656565"
            stroke-width="1.5"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
          <path
            d="M8 19C8.45849 20.7252 10.0755 22 12 22C13.9245 22 15.5415 20.7252 16 19"
            stroke="#656565"
            stroke-width="1.5"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
        </svg>
      </div>

      <div class="avatar avatar-online cursor-pointer" @click.stop="toggleMenu">
        <div class="h-12 w-12 rounded-full overflow-hidden">
          <img src="/userPlaceHolder.png" alt="User" />
        </div>
      </div>
    </div>

  <transition name="fade">
      <div
        v-if="showMenu"
        ref="menuRef"
        class="absolute right-0 mt-2 w-40 bg-white shadow-lg rounded-md z-50 border border-gray-200"
      >
        <ul class="text-sm text-gray-700">
          <li
            class="px-4 py-2 hover:bg-gray-100 hover:text-main cursor-pointer"
            @click="logout"
          >
            Logout
          </li>
        </ul>
      </div>
    </transition>
  </div>
</template>

<style scoped>
.fade-enter-active, .fade-leave-active {
  transition: opacity 0.2s;
}
.fade-enter-from, .fade-leave-to {
  opacity: 0;
}
</style>
