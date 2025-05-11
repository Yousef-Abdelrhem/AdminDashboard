<script setup>
import { ref, onMounted, onBeforeUnmount } from "vue";
import Avatar from "../components/Avatar.vue";

const currentPage = ref(1);
const totalPages = ref(10);
const cost = ref(200);

function getVisiblePages() {
  const pages = [];
  const range = 3;

  if (currentPage.value <= range) {
    for (let i = 1; i <= Math.min(range, totalPages.value); i++) {
      pages.push(i);
    }
  } else if (currentPage.value >= totalPages.value - range) {
    for (let i = totalPages.value - range + 1; i <= totalPages.value; i++) {
      pages.push(i);
    }
  } else {
    for (
      let i = currentPage.value - range;
      i <= currentPage.value + range;
      i++
    ) {
      pages.push(i);
    }
  }

  if (pages[0] > 1) {
    pages.unshift("...");
  }
  if (pages[pages.length - 1] < totalPages.value) {
    pages.push("...");
  }

  return pages;
}

function handlePageChange(page) {
  if (page >= 1 && page <= totalPages.value) {
    currentPage.value = page;
  }
}
const isEditable = ref(false);
const toggleEdit = () => {
  isEditable.value = !isEditable.value;
};

const shippingMethods = ref([
  { name: "Standard Shipping", cost: "$5", delivery: "3-5", active: true },
  { name: "Express Shipping", cost: "$10", delivery: "1-2", active: false },
  { name: "Store Pickup", cost: "Free", delivery: "Same Day", active: false },
]);

const users = ref([
  {
    name: "Mishal",
    email: "mishal@example.com",
    role: "Admin",
    active: true,
  },
  {
    name: "Sara",
    email: "sara@example.com",
    role: "Super Admin",
    active: false,
  },
  {
    name: "Ali",
    email: "ali@example.com",
    role: "Admin",
    active: true,
  },
]);

const deleteUser = (index) => {
  users.value.splice(index, 1);
};

const showDropdown = ref(null);
const showModal = ref(false);
const showModal2 = ref(false);
const isEditMode = ref(false);
const methodForm = ref({
  name: "",
  cost: "",
  from: "",
  to: "",
  active: true,
});

const openDropdown = (index) => {
  showDropdown.value = index === showDropdown.value ? null : index;
};

const openModal = (method = null) => {
  isEditMode.value = !!method;
  if (method) {
    methodForm.value = { ...method, from: "", to: "" };
  } else {
    methodForm.value = {
      name: "",
      cost: "",
      from: "",
      to: "",
      active: true,
    };
  }
  showModal.value = true;
};

const closeModal = () => {
  showModal.value = false;
};

const openModal2 = (method = null) => {
  isEditMode.value = !!method;
  if (method) {
    methodForm.value = { ...method, from: "", to: "" };
  } else {
    methodForm.value = {
      name: "",
      cost: "",
      from: "",
      to: "",
      active: true,
    };
  }
  showModal2.value = true;
};

const closeModal2 = () => {
  showModal2.value = false;
};

const deleteMethod = (index) => {
  shippingMethods.value.splice(index, 1);
  showDropdown.value = null;
};

const closeDropdown = (event) => {
  const dropdownBtn = event.target.closest("button");
  const dropdownMenu = event.target.closest(".dropdown-menu");
  if (!dropdownBtn && !dropdownMenu) {
    showDropdown.value = null;
  }
};
onMounted(() => {
  document.addEventListener("click", closeDropdown);
});
onBeforeUnmount(() => {
  document.removeEventListener("click", closeDropdown);
});
</script>

<template>
  <div class="p-6">
    <div class="mb-6 flex items-center justify-end">
      <Avatar />
    </div>

    <div class="mb-8 rounded-xl bg-white p-6 shadow">
      <h2 class="text-brown-800 mb-4 text-xl font-bold">
        Store Website Settings
      </h2>
      <div class="grid gap-4 sm:grid-cols-1">
        <div>
          <label class="text-[#7C7C7C]">Store Name</label>
          <input
            type="text"
            :readonly="!isEditable"
            value="Craftopia"
            class="w-full rounded border border-gray-300 px-3 py-2 text-[#3D3D3D] focus:border-[#763A26] focus:outline-none"
            :style="{ 'pointer-events': isEditable ? 'auto' : 'none' }"
          />
        </div>
        <div>
          <label class="text-[#7C7C7C]">Store URL</label>
          <input
            type="text"
            :readonly="!isEditable"
            value="https://craftopia.com"
            class="w-full rounded border border-gray-300 px-3 py-2 text-[#3D3D3D] focus:border-[#763A26] focus:outline-none"
            :style="{ 'pointer-events': isEditable ? 'auto' : 'none' }"
          />
        </div>
        <div>
          <label class="text-[#7C7C7C]">Currency</label>
          <select
            :disabled="!isEditable"
            class="w-full appearance-none rounded border border-gray-300 bg-white px-3 py-2 text-[#3D3D3D] focus:border-[#763A26] focus:outline-none"
          >
            <option value="USD">USD</option>
            <option value="EGP">EGP</option>
          </select>
        </div>
        <div>
          <label class="text-[#7C7C7C]">Default Language</label>
          <select
            :disabled="!isEditable"
            class="w-full rounded border border-gray-300 bg-white px-3 py-2 text-[#3D3D3D] focus:border-[#763A26] focus:outline-none"
          >
            <option selected>English</option>
            <option>Arabic</option>
          </select>
        </div>
      </div>

      <div class="mt-6 flex justify-center gap-20">
        <button
          @click="toggleEdit"
          class="flex items-center gap-2 rounded-[6px] bg-[#F1D6B7] px-10 py-2 text-[#763A26]"
        >
          <svg
            v-if="isEditable"
            width="28"
            height="28"
            viewBox="0 0 18 18"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M2.25 13.4856V9.53063C2.25 6.80562 2.25 5.44311 3.07376 4.59655C3.89753 3.75 5.22335 3.75 7.875 3.75C10.5266 3.75 11.8525 3.75 12.6763 4.59655C13.5 5.44311 13.5 6.80562 13.5 9.53063V13.4856C13.5 15.215 13.5 16.0797 12.9566 16.3892C11.9043 16.9886 9.93037 14.9889 8.99295 14.3868C8.44927 14.0376 8.17747 13.863 7.875 13.863C7.57253 13.863 7.30069 14.0376 6.75704 14.3868C5.81963 14.9889 3.84572 16.9886 2.7934 16.3892C2.25 16.0797 2.25 15.215 2.25 13.4856Z"
              stroke="#763A26"
              stroke-width="1.125"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
            <path
              d="M6.75 1.5H8.25C11.7855 1.5 13.5533 1.5 14.6516 2.59835C15.75 3.6967 15.75 5.46446 15.75 9V13.5"
              stroke="#763A26"
              stroke-width="1.125"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
          </svg>
          <svg
            v-else
            width="28"
            height="28"
            viewBox="0 0 21 22"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M14.3718 4.52945L15.238 3.66321C15.9557 2.9456 17.1192 2.9456 17.8368 3.66321C18.5544 4.38083 18.5544 5.54431 17.8368 6.26193L16.9705 7.12818M14.3718 4.52945L8.54488 10.3563C8.10081 10.8005 7.78579 11.3568 7.63347 11.9661L7 14.5L9.53391 13.8665C10.1432 13.7142 10.6995 13.3992 11.1437 12.9551L16.9705 7.12818M14.3718 4.52945L16.9705 7.12818"
              stroke="#763A26"
              stroke-width="1.5"
              stroke-linejoin="round"
            />
            <path
              d="M16.6249 12.3125C16.6249 15.1891 16.6249 16.6273 15.8305 17.5954C15.6851 17.7726 15.5226 17.9351 15.3453 18.0805C14.3773 18.875 12.939 18.875 10.0624 18.875H9.625C6.32517 18.875 4.67526 18.875 3.65014 17.8498C2.62503 16.8248 2.625 15.1748 2.625 11.875V11.4375C2.625 8.56095 2.625 7.12269 3.41945 6.15464C3.5649 5.97741 3.72741 5.8149 3.90464 5.66945C4.87269 4.875 6.31095 4.875 9.1875 4.875"
              stroke="#763A26"
              stroke-width="1.5"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
          </svg>

          {{ isEditable ? "Save" : "Edit" }}
        </button>
      </div>
    </div>

    <div class="mb-8 rounded-xl bg-white p-6 shadow">
      <div class="mb-4 flex items-center justify-between">
        <h2 class="text-brown-800 text-xl font-bold">
          Shipping Methods Configuration
        </h2>
        <button
          @click="openModal2()"
          class="flex items-center justify-center gap-2 rounded bg-[#F1D6B7] px-4 py-2 text-[#763A26]"
        >
          <svg
            width="20"
            height="20"
            viewBox="0 0 19 18"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M9.5 6V12M12.5 9H6.5"
              stroke="#763A26"
              stroke-width="1.5"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
            <path
              d="M9.5 16.5C13.6421 16.5 17 13.1421 17 9C17 4.85786 13.6421 1.5 9.5 1.5C5.35786 1.5 2 4.85786 2 9C2 13.1421 5.35786 16.5 9.5 16.5Z"
              stroke="#763A26"
              stroke-width="1.5"
            />
          </svg>
          Method
        </button>
      </div>

      <div class="overflow-auto rounded-lg border border-gray-200">
        <table class="w-full table-auto">
          <thead>
            <tr class="bg-white text-[#7C7C7C]">
              <th class="px-3 py-5 text-sm sm:text-lg">Method Name</th>
              <th class="px-3 py-5 text-sm sm:text-lg">Cost</th>
              <th class="px-3 py-5 text-sm sm:text-lg">Estimated Delivery</th>
              <th class="px-3 py-5 text-sm sm:text-lg">Active</th>
              <th class="px-3 py-5 text-sm sm:text-lg">Actions</th>
            </tr>
          </thead>
          <tbody>
            <tr
              v-for="(method, index) in shippingMethods"
              :key="index"
              :class="{ 'bg-[#F9D4AD]': index % 2 === 0 }"
            >
              <td class="py-3 text-center text-sm text-[#3D3D3D] sm:text-lg">
                {{ method.name }}
              </td>
              <td class="py-3 text-center text-sm text-[#3D3D3D] sm:text-lg">
                {{ method.cost }}
              </td>
              <td class="py-3 text-center text-sm text-[#3D3D3D] sm:text-lg">
                {{ method.delivery }}
              </td>
              <td class="py-3 text-center text-sm text-[#3D3D3D] sm:text-lg">
                <label
                  class="relative inline-flex cursor-pointer items-center text-[#3D3D3D]"
                >
                  <input
                    type="checkbox"
                    v-model="method.active"
                    class="peer sr-only"
                  />
                  <div
                    class="h-6 w-11 rounded-full bg-gray-300 transition-all peer-checked:bg-[#24B443]"
                  ></div>
                  <div
                    class="absolute top-0.5 left-0.5 h-5 w-5 rounded-full bg-white transition-transform peer-checked:translate-x-full"
                  ></div>
                </label>
              </td>
              <td class="relative py-3 text-center text-sm sm:text-lg">
                <button
                  @click="openDropdown(index)"
                  class="cursor-pointer font-bold text-[#763A26]"
                >
                  ⋮
                </button>
                <div
                  v-if="showDropdown === index"
                  class="dropdown-menu absolute right-0 z-40 mt-2 w-50 rounded border border-gray-200 bg-white shadow"
                >
                  <button
                    @click="openModal2(method)"
                    class="icon-wrapper group flex w-full items-center gap-2 border-b border-gray-300 px-3 py-1 text-left text-[#B0B0B0] hover:text-[#763A26]"
                  >
                    <div class="icon-wrapper group">
                      <svg
                        width="20"
                        height="20"
                        viewBox="0 0 18 18"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                        class="icon-svg transition-all duration-300"
                      >
                        <path
                          d="M12.3187 3.45382L13.0612 2.71132C13.6763 2.09623 14.6736 2.09623 15.2887 2.71132C15.9037 3.32643 15.9037 4.3237 15.2887 4.9388L14.5462 5.68129M12.3187 3.45382L7.32419 8.4483C6.94355 8.829 6.67353 9.30585 6.54298 9.82807L6 12L8.17192 11.457C8.69415 11.3265 9.171 11.0564 9.5517 10.6758L14.5462 5.68129M12.3187 3.45382L14.5462 5.68129"
                          class="icon-path"
                          stroke="#B0B0B0"
                          stroke-width="1.5"
                          stroke-linejoin="round"
                        />
                        <path
                          d="M14.2499 10.125C14.2499 12.5906 14.2499 13.8234 13.569 14.6532C13.4443 14.8051 13.3051 14.9443 13.1531 15.069C12.3234 15.75 11.0905 15.75 8.62492 15.75H8.25C5.42157 15.75 4.00737 15.75 3.12869 14.8713C2.25002 13.9927 2.25 12.5784 2.25 9.75V9.375C2.25 6.90939 2.25 5.67659 2.93095 4.84683C3.05563 4.69493 3.19493 4.55563 3.34683 4.43095C4.17659 3.75 5.40939 3.75 7.875 3.75"
                          class="icon-path"
                          stroke="#B0B0B0"
                          stroke-width="1.5"
                          stroke-linecap="round"
                          stroke-linejoin="round"
                        />
                      </svg>
                    </div>
                    Edit
                  </button>
                  <button
                    @click="deleteMethod(index)"
                    class="icon-wrapper group flex w-full items-center gap-2 px-3 py-1 text-left text-[#B0B0B0] hover:text-[#763A26]"
                  >
                    <div class="icon-wrapper group">
                      <svg
                        class="icon-path"
                        width="20"
                        height="20"
                        viewBox="0 0 18 18"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          class="icon-path"
                          d="M14.625 4.125L14.1602 11.6438C14.0414 13.5648 13.9821 14.5253 13.5006 15.2159C13.2625 15.5573 12.956 15.8455 12.6005 16.062C11.8816 16.5 10.9192 16.5 8.99452 16.5C7.06734 16.5 6.10372 16.5 5.38429 16.0612C5.0286 15.8443 4.722 15.5556 4.48401 15.2136C4.00266 14.5219 3.94459 13.5601 3.82846 11.6364L3.375 4.125"
                          stroke="#B0B0B0"
                          stroke-width="1.5"
                          stroke-linecap="round"
                        />
                        <path
                          class="icon-path"
                          d="M2.25 4.125H15.75M12.0418 4.125L11.5298 3.0688C11.1897 2.3672 11.0196 2.01639 10.7263 1.79761C10.6612 1.74908 10.5923 1.7059 10.5203 1.66852C10.1954 1.5 9.80558 1.5 9.02588 1.5C8.2266 1.5 7.827 1.5 7.49676 1.67559C7.42357 1.71451 7.35373 1.75943 7.28797 1.80988C6.99123 2.03753 6.82547 2.40116 6.49396 3.12844L6.03969 4.125"
                          stroke="#B0B0B0"
                          stroke-width="1.5"
                          stroke-linecap="round"
                        />
                        <path
                          class="icon-path"
                          d="M7.125 12.375V7.875"
                          stroke="#B0B0B0"
                          stroke-width="1.5"
                          stroke-linecap="round"
                        />
                        <path
                          class="icon-path"
                          d="M10.875 12.375V7.875"
                          stroke="#B0B0B0"
                          stroke-width="1.5"
                          stroke-linecap="round"
                        />
                      </svg>
                    </div>
                    Delete
                  </button>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>

    <div class="mb-8 rounded-xl bg-white p-6 shadow">
      <div class="mb-4 flex items-center justify-between">
        <h2 class="text-brown-800 text-xl font-bold">
          Manage User Roles and Permissions
        </h2>
        <button
          @click="openModal()"
          class="flex items-center justify-center gap-2 rounded bg-[#F1D6B7] px-6 py-2 text-[#763A26]"
        >
          <svg
            width="20"
            height="20"
            viewBox="0 0 19 18"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M9.5 6V12M12.5 9H6.5"
              stroke="#763A26"
              stroke-width="1.5"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
            <path
              d="M9.5 16.5C13.6421 16.5 17 13.1421 17 9C17 4.85786 13.6421 1.5 9.5 1.5C5.35786 1.5 2 4.85786 2 9C2 13.1421 5.35786 16.5 9.5 16.5Z"
              stroke="#763A26"
              stroke-width="1.5"
            />
          </svg>
          User
        </button>
      </div>

      <div class="overflow-auto rounded-lg border border-gray-200">
        <table class="w-full">
          <thead>
            <tr class="bg-white text-[#7C7C7C]">
              <th class="px-3 py-5 text-sm sm:text-lg">User Name</th>
              <th class="px-3 py-5 text-sm sm:text-lg">Email</th>
              <th class="px-3 py-5 text-sm sm:text-lg">Role</th>
              <th class="px-3 py-5 text-sm sm:text-lg">Active</th>
              <th class="px-3 py-5 text-sm sm:text-lg">Actions</th>
            </tr>
          </thead>
          <tbody>
            <tr
              v-for="(user, index) in users"
              :key="index"
              :class="{ 'bg-[#F9D4AD]': index % 2 === 0 }"
            >
              <td class="py-3 text-center text-sm text-[#3D3D3D] sm:text-lg">
                {{ user.name }}
              </td>
              <td class="py-3 text-center text-sm text-[#3D3D3D] sm:text-lg">
                {{ user.email }}
              </td>

              <td class="flex h-12 items-center justify-center text-center">
                <select
                  v-model="user.role"
                  class="custom-role-select mx-auto h-10 rounded border"
                  :class="{
                    admin: user.role === 'Admin',
                    'super-admin': user.role === 'Super Admin',
                  }"
                >
                  <option value="Admin">Admin</option>
                  <option value="Super Admin">Super Admin</option>
                </select>
              </td>

              <td class="py-3 text-center text-sm text-[#3D3D3D] sm:text-lg">
                <label class="relative inline-flex cursor-pointer items-center">
                  <input
                    type="checkbox"
                    v-model="user.active"
                    class="peer sr-only"
                  />
                  <div
                    class="h-6 w-11 rounded-full bg-gray-300 transition-all peer-checked:bg-[#24B443]"
                  ></div>
                  <div
                    class="absolute top-0.5 left-0.5 h-5 w-5 rounded-full bg-white transition-transform peer-checked:translate-x-full"
                  ></div>
                </label>
              </td>

              <td class="flex items-center justify-center py-3">
                <button
                  @click="deleteUser(index)"
                  class="text-[#B0B0B0] hover:text-[#763A26]"
                >
                  <svg
                    class="icon-path"
                    width="20"
                    height="20"
                    viewBox="0 0 18 18"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M14.625 4.125L14.1602 11.6438C14.0414 13.5648 13.9821 14.5253 13.5006 15.2159C13.2625 15.5573 12.956 15.8455 12.6005 16.062C11.8816 16.5 10.9192 16.5 8.99452 16.5C7.06734 16.5 6.10372 16.5 5.38429 16.0612C5.0286 15.8443 4.722 15.5556 4.48401 15.2136C4.00266 14.5219 3.94459 13.5601 3.82846 11.6364L3.375 4.125"
                      stroke="#454545"
                      stroke-width="1.5"
                      stroke-linecap="round"
                    />
                    <path
                      d="M2.25 4.125H15.75M12.0418 4.125L11.5298 3.0688C11.1897 2.3672 11.0196 2.01639 10.7263 1.79761C10.6612 1.74908 10.5923 1.7059 10.5203 1.66852C10.1954 1.5 9.80558 1.5 9.02588 1.5C8.2266 1.5 7.827 1.5 7.49676 1.67559C7.42357 1.71451 7.35373 1.75943 7.28797 1.80988C6.99123 2.03753 6.82547 2.40116 6.49396 3.12844L6.03969 4.125"
                      stroke="#454545"
                      stroke-width="1.5"
                      stroke-linecap="round"
                    />
                    <path
                      d="M7.125 12.375V7.875M10.875 12.375V7.875"
                      stroke="#454545"
                      stroke-width="1.5"
                      stroke-linecap="round"
                    />
                  </svg>
                </button>
              </td>
            </tr>
          </tbody>
        </table>

        <div class="pagination my-4 flex justify-center gap-1 text-gray-600">
          <button
            class="flex h-12 w-12 items-center justify-center rounded border-2 border-[#F1D6B7]"
            @click="handlePageChange(currentPage - 1)"
            :disabled="currentPage === 1"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              class="size-4"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="1.5"
                d="M15.75 19.5 8.25 12l7.5-7.5"
              />
            </svg>
          </button>

          <span
            v-for="(page, index) in getVisiblePages()"
            :key="index"
            class="flex h-12 w-12 cursor-pointer items-center justify-center rounded border-2 border-[#F1D6B7]"
            :class="{
              'text-main-900 bg-[#F1D6B7] font-bold': currentPage === page,
            }"
            @click="handlePageChange(page)"
          >
            {{ page }}
          </span>

          <button
            class="flex h-12 w-12 items-center justify-center rounded border-2 border-[#F1D6B7]"
            @click="handlePageChange(currentPage + 1)"
            :disabled="currentPage === totalPages"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              class="size-4"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="1.5"
                d="m8.25 4.5 7.5 7.5-7.5 7.5"
              />
            </svg>
          </button>
        </div>
      </div>
    </div>

    <div
      v-if="showModal"
      class="fixed inset-0 z-50 flex items-center justify-center"
      style="background-color: rgba(0, 0, 0, 0.5)"
    >
      <div class="relative w-[500px] rounded-lg bg-white p-4 shadow">
        <button
          @click="closeModal"
          class="absolute top-3 right-3 text-gray-500 hover:text-gray-800"
        >
          <svg
            width="30"
            height="30"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M9.16937 15.58C8.97937 15.58 8.78938 15.51 8.63938 15.36C8.34938 15.07 8.34938 14.59 8.63938 14.3L14.2994 8.63999C14.5894 8.34999 15.0694 8.34999 15.3594 8.63999C15.6494 8.92999 15.6494 9.40998 15.3594 9.69998L9.69937 15.36C9.55937 15.51 9.35937 15.58 9.16937 15.58Z"
              fill="#292D32"
            />
            <path
              d="M14.8294 15.58C14.6394 15.58 14.4494 15.51 14.2994 15.36L8.63938 9.69998C8.34938 9.40998 8.34938 8.92999 8.63938 8.63999C8.92937 8.34999 9.40937 8.34999 9.69937 8.63999L15.3594 14.3C15.6494 14.59 15.6494 15.07 15.3594 15.36C15.2094 15.51 15.0194 15.58 14.8294 15.58Z"
              fill="#292D32"
            />
            <path
              d="M15 22.75H9C3.57 22.75 1.25 20.43 1.25 15V9C1.25 3.57 3.57 1.25 9 1.25H15C20.43 1.25 22.75 3.57 22.75 9V15C22.75 20.43 20.43 22.75 15 22.75ZM9 2.75C4.39 2.75 2.75 4.39 2.75 9V15C2.75 19.61 4.39 21.25 9 21.25H15C19.61 21.25 21.25 19.61 21.25 15V9C21.25 4.39 19.61 2.75 15 2.75H9Z"
              fill="#292D32"
            />
          </svg>
        </button>

        <h3 class="mb-4 text-lg font-semibold text-[#763A26]">
          {{ isEditMode ? "Edit" : "Add" }} User
        </h3>

        <div class="flex flex-col gap-3 space-y-3">
          <div>
            <label class="mb-1 block text-lg text-[#763A26]">User Name</label>
            <input
              type="text"
              placeholder="User Name"
              class="w-full rounded border border-gray-400 px-3 py-2 focus:border-[#763A26] focus:outline-none"
            />
          </div>
          <div>
            <label class="mb-1 block text-lg text-[#763A26]">User Email</label>
            <input
              type="text"
              placeholder="User Email"
              class="w-full rounded border border-gray-400 px-3 py-2 focus:border-[#763A26] focus:outline-none"
            />
          </div>

          <div>
            <label class="mb-1 block text-lg text-[#763A26]"
              >User Password</label
            >
            <input
              type="text"
              placeholder="User Password"
              class="w-full rounded border border-gray-400 px-3 py-2 focus:border-[#763A26] focus:outline-none"
            />
          </div>
          <div>
            <label class="mb-1 block text-lg text-[#763A26]">User Role</label>
            <select
              class="w-full rounded border border-gray-400 px-3 py-2 focus:border-[#763A26] focus:outline-none"
            >
              <option disabled value="">Select Role</option>
              <option value="admin">Admin</option>
              <option value="super_admin">Super Admin</option>
            </select>
          </div>

          <label class="flex items-center gap-3">
            <span class="text-lg text-[#763A26]">Active</span>
            <label class="relative inline-flex cursor-pointer items-center">
              <input
                type="checkbox"
                v-model="methodForm.active"
                class="peer sr-only"
              />
              <div
                class="peer h-6 w-11 rounded-full bg-gray-300 peer-checked:bg-green-500 after:absolute after:top-[2px] after:left-[2px] after:h-5 after:w-5 after:rounded-full after:bg-white after:transition-all peer-checked:after:translate-x-full"
              ></div>
            </label>
          </label>
        </div>

        <div class="mt-5 flex flex-col justify-end gap-2">
          <button
            @click="closeModal"
            class="rounded bg-[#763A26] px-4 py-2 text-lg text-white"
          >
            {{ isEditMode ? "Save" : "Add" }}
          </button>
          <button
            @click="closeModal"
            class="rounded bg-gray-300 px-4 py-2 text-lg"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>

    <div
      v-if="showModal2"
      class="fixed inset-0 z-50 flex items-center justify-center"
      style="background-color: rgba(0, 0, 0, 0.5)"
    >
      <div class="relative w-[500px] rounded-lg bg-white p-4 shadow">
        <button
          @click="closeModal2"
          class="absolute top-3 right-3 text-gray-500 hover:text-gray-800"
        >
          <svg
            width="30"
            height="30"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M9.16937 15.58C8.97937 15.58 8.78938 15.51 8.63938 15.36C8.34938 15.07 8.34938 14.59 8.63938 14.3L14.2994 8.63999C14.5894 8.34999 15.0694 8.34999 15.3594 8.63999C15.6494 8.92999 15.6494 9.40998 15.3594 9.69998L9.69937 15.36C9.55937 15.51 9.35937 15.58 9.16937 15.58Z"
              fill="#292D32"
            />
            <path
              d="M14.8294 15.58C14.6394 15.58 14.4494 15.51 14.2994 15.36L8.63938 9.69998C8.34938 9.40998 8.34938 8.92999 8.63938 8.63999C8.92937 8.34999 9.40937 8.34999 9.69937 8.63999L15.3594 14.3C15.6494 14.59 15.6494 15.07 15.3594 15.36C15.2094 15.51 15.0194 15.58 14.8294 15.58Z"
              fill="#292D32"
            />
            <path
              d="M15 22.75H9C3.57 22.75 1.25 20.43 1.25 15V9C1.25 3.57 3.57 1.25 9 1.25H15C20.43 1.25 22.75 3.57 22.75 9V15C22.75 20.43 20.43 22.75 15 22.75ZM9 2.75C4.39 2.75 2.75 4.39 2.75 9V15C2.75 19.61 4.39 21.25 9 21.25H15C19.61 21.25 21.25 19.61 21.25 15V9C21.25 4.39 19.61 2.75 15 2.75H9Z"
              fill="#292D32"
            />
          </svg>
        </button>

        <h3 class="mb-4 text-lg font-semibold text-[#763A26]">
          {{ isEditMode ? "Edit" : "Add" }} Method
        </h3>

        <div class="flex flex-col gap-3 space-y-3">
          <div>
            <label class="mb-1 block text-lg text-[#763A26]">Method Name</label>
            <input
              type="text"
              placeholder="Method Name"
              class="w-full rounded border border-gray-400 px-3 py-2 focus:border-[#763A26] focus:outline-none"
            />
          </div>
          <div class="relative mt-2 w-full">
            <label class="block text-lg text-[#763A26]">Cost</label>

            <input
              type="range"
              v-model="cost"
              min="200"
              max="600"
              step="1"
              class="w-full accent-[#763A26]"
            />

            <div
              class="absolute top-10 mt-1 text-sm text-[#763A26]"
              :style="{
                left: `${(cost - 200) / 4}%`,
                transform: 'translateX(-50%)',
              }"
            >
              {{ cost }}$
            </div>

            <div
              class="mt-2 flex justify-between text-sm font-medium text-[#763A26]"
            >
              <span>200$</span>
              <span>600$</span>
            </div>
          </div>
          <div class=" flex  flex-col">
            <label class="mb-1 block text-lg text-[#763A26]"
              >Estimated Delivery</label
            >
            <div class=" flex gap-4">


                <div>
    
                    <label for="">From</label>
                    <input
                      type="text"
                      placeholder="From"
                      class="w-full rounded border border-gray-400 px-3 py-2 focus:border-[#763A26] focus:outline-none"
                    />
                </div>
                <div>
    
                    <label for="">To</label>
                    <input
                      type="text"
                      placeholder="To"
                      class="w-full rounded border border-gray-400 px-3 py-2 focus:border-[#763A26] focus:outline-none"
                    />
                </div>
            </div>

            
          </div>

          <label class="flex items-center gap-3">
            <span class="text-lg text-[#763A26]">Active</span>
            <label class="relative inline-flex cursor-pointer items-center">
              <input
                type="checkbox"
                v-model="methodForm.active"
                class="peer sr-only"
              />
              <div
                class="peer h-6 w-11 rounded-full bg-gray-300 peer-checked:bg-green-500 after:absolute after:top-[2px] after:left-[2px] after:h-5 after:w-5 after:rounded-full after:bg-white after:transition-all peer-checked:after:translate-x-full"
              ></div>
            </label>
          </label>
        </div>

        <div class="mt-5 flex flex-col justify-end gap-2">
          <button
            @click="closeModal2"
            class="rounded bg-[#763A26] px-4 py-2 text-lg text-white"
          >
            {{ isEditMode ? "Save" : "Add" }}
          </button>
          <button
            @click="closeModal2"
            class="rounded bg-gray-300 px-4 py-2 text-lg"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  </div>
</template>
<style scoped>
.text-brown-800 {
  color: #4b2e1f;
}
select {
  color: #3d3d3d !important;
}
.custom-slider {
  accent-color: #763a26;
}
.group:hover .icon-path {
  stroke: #763a26;
}
.custom-role-select {
  padding-right: 1rem;
  text-align: center;
  display: flex;
  justify-content: center;
  align-items: center;
  border: none;
  border-radius: 9999px;
  font-size: 0.875rem;
  font-weight: 600;
  cursor: pointer;
  width: 140px;
  outline: none;
  box-shadow: none;
}

.custom-role-select.admin {
  background-color: #b6a7f5 !important;
  color: black !important;
}

.custom-role-select.super-admin {
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #51d16f !important;
  color: black !important;
}

@media (max-width: 640px) {
  .custom-role-select {
    font-size: 0.75rem !important;
    width: 10px !important;
    padding-right: 0.5rem !important;
  }
}

@media (max-width: 768px) {
  .custom-role-select {
    font-size: 0.8rem !important;
    width: 10px !important;
  }
}
@media (max-width: 2000px) {
  .custom-role-select {
    font-size: 0.8rem !important;
    width: 130px !important;
  }
}

@media (max-width: 640px) {
  .table-auto {
    display: block;
    overflow-x: auto;
    white-space: nowrap;
  }

  .table-auto th,
  .table-auto td {
    display: block;
    text-align: right;
    padding: 8px;
  }

  .table-auto th {
    background-color: #f3f3f3;
    font-size: 14px;
    text-align: left;
  }

  .table-auto td {
    text-align: left;
  }

  .dropdown-menu {
    position: static;
    box-shadow: none;
  }
}
</style>
