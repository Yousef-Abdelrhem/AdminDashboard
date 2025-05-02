<script setup>
import { ref } from "vue";
const imageFile = ref(null);
const imageURL = ref(null);

function uploadImage(e) {
  const file = e.target.files[0];
  if (file) {
    imageFile.value = file;
    imageURL.value = URL.createObjectURL(file);
  }
  console.log("e.target.files", e.target.files);
  console.log(imageURL.value);
}

function deleteImage() {
  imageURL.value = null;
}
</script>
<template>
  <div
    class="border-main relative flex h-47 w-50 cursor-pointer items-center justify-center rounded-2xl border-3"
  >
    <input
      type="file"
      class="absolute z-0 h-full w-full opacity-0"
      accept="image/*"
      @change="uploadImage"
    />
    <!-- image uploaded -->
    <img
      v-if="imageURL"
      :src="imageURL"
      alt="Uploaded File"
      class="absolute h-full w-full rounded-xl object-cover"
    />
    <!-- Delete icon -->
    <svg
      width="34"
      height="31"
      viewBox="0 0 34 31"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      v-if="imageURL"
      class="absolute top-2 right-2"
      @click="deleteImage"
    >
      <rect width="34" height="31" rx="15.5" fill="white" />
      <path
        d="M8 9H26M21.0557 9L20.3731 7.59173C19.9196 6.65626 19.6928 6.18852 19.3017 5.89681C19.215 5.8321 19.1231 5.77454 19.027 5.7247C18.5939 5.5 18.0741 5.5 17.0345 5.5C15.9688 5.5 15.436 5.5 14.9957 5.73412C14.8981 5.78601 14.805 5.8459 14.7173 5.91317C14.3216 6.2167 14.1006 6.70155 13.6586 7.67126L13.0529 9"
        stroke="#656565"
        stroke-width="1.5"
        stroke-linecap="round"
      />
      <path
        d="M24.5 9L23.8803 19.0251C23.7219 21.5864 23.6428 22.8671 23.0008 23.7879C22.6833 24.2431 22.2747 24.6273 21.8007 24.916C20.8421 25.5 19.559 25.5 16.9927 25.5C14.4231 25.5 13.1383 25.5 12.179 24.9149C11.7048 24.6257 11.296 24.2408 10.9787 23.7848C10.3369 22.8626 10.2594 21.5801 10.1046 19.0152L9.5 9"
        stroke="#656565"
        stroke-width="1.5"
        stroke-linecap="round"
      />
      <path
        d="M14.5 20V14"
        stroke="#656565"
        stroke-width="1.5"
        stroke-linecap="round"
      />
      <path
        d="M19.5 20V14"
        stroke="#656565"
        stroke-width="1.5"
        stroke-linecap="round"
      />
    </svg>

    <svg
      width="68"
      height="68"
      viewBox="0 0 68 68"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      :class="imageURL ? 'absolute opacity-0' : ''"
    >
      <path
        d="M60.2082 36.8334V24.0834C60.2082 20.3261 58.7156 16.7228 56.0589 14.066C53.4021 11.4092 49.7987 9.91669 46.0415 9.91669H21.9582C18.2009 9.91669 14.5976 11.4092 11.9408 14.066C9.28406 16.7228 7.7915 20.3261 7.7915 24.0834V43.9167C7.7915 45.7771 8.15794 47.6193 8.86988 49.338C9.58182 51.0568 10.6253 52.6185 11.9408 53.934C14.5976 56.5908 18.2009 58.0834 21.9582 58.0834H39.6948"
        stroke="#763A26"
        stroke-width="2"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
      <path
        d="M8.52832 48.1667L16.2917 39.1C17.3112 38.0874 18.6493 37.4582 20.0795 37.3188C21.5097 37.1794 22.9441 37.5384 24.14 38.335C25.3359 39.1317 26.7703 39.4907 28.2005 39.3513C29.6307 39.2119 30.9688 38.5826 31.9883 37.57L38.59 30.9684C40.4869 29.065 42.9984 27.8976 45.6763 27.6744C48.3541 27.4513 51.0242 28.1869 53.21 29.75L60.2083 35.1617M22.695 28.815C23.3126 28.8113 23.9235 28.686 24.4927 28.4462C25.0619 28.2064 25.5783 27.8568 26.0124 27.4174C26.4466 26.978 26.7899 26.4575 27.0228 25.8854C27.2557 25.3133 27.3737 24.701 27.37 24.0833C27.3663 23.4657 27.2409 22.8548 27.0011 22.2856C26.7613 21.7164 26.4118 21.2 25.9724 20.7659C25.533 20.3318 25.0124 19.9885 24.4404 19.7555C23.8683 19.5226 23.256 19.4046 22.6383 19.4083C21.3909 19.4159 20.1976 19.9186 19.3209 20.806C18.4441 21.6933 17.9558 22.8926 17.9633 24.14C17.9708 25.3874 18.4736 26.5807 19.3609 27.4575C20.2483 28.3342 21.4476 28.8225 22.695 28.815Z"
        stroke="#763A26"
        stroke-width="2"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
      <path
        d="M53.0029 42.5V56.6667"
        stroke="#763A26"
        stroke-width="2"
        stroke-miterlimit="10"
        stroke-linecap="round"
      />
      <path
        d="M59.5 48.4642L53.9269 42.891C53.8058 42.7694 53.6618 42.6728 53.5033 42.607C53.3448 42.5411 53.1748 42.5072 53.0032 42.5072C52.8315 42.5072 52.6616 42.5411 52.5031 42.607C52.3446 42.6728 52.2006 42.7694 52.0795 42.891L46.5063 48.4642"
        stroke="#763A26"
        stroke-width="2"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
    </svg>
  </div>
</template>
