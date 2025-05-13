<template>
  <div class="flex  w-screen bg-white shadow-2xl h-screen">
    <!-- form left side -->
    <div class="flex h-full flex-grow-1 items-center justify-center md:w-[50%] lg:w-[20rem] xl:w-[35rem]">
      <div class="flex w-92 flex-col items-center justify-center md:w-140">
        <h1 class="text-center text-3xl font-bold text-[#763A26] sm:text-4xl md:text-3xl">
          Login
        </h1>
        <p class="mb-5 text-center text-lg text-gray-500 sm:text-xl">
          Please enter your email and password
        </p>
        <!-- email -->
        <div class="flex flex-col mb-2 w-78 sm:w-140 md:w-110 lg:w-120 xl:w-150 2xl:w-160">
          <label for="email"
            class="text-[#656565] font-bold text-left w-78 sm:w-140 md:w-110 lg:w-120 xl:w-150 2xl:w-160">E-mail</label>
          <input id="email" v-model="email" type="text" placeholder="example@gmail.com" @input="validateEmail"
            class="input bg-white border-[#DCDCDC] text-gray-800 w-78 sm:w-140 md:w-110 lg:w-120 xl:w-150 2xl:w-160" />
          <p v-if="errors.email" class="text-red-400 w-78 sm:w-140 md:w-110 lg:w-120 xl:w-150 2xl:w-160 text-left mb-1">
            {{ errors.email }}</p>
        </div>
        <!-- password -->
        <div class="flex flex-col mb-2 w-78 sm:w-140 md:w-110 lg:w-120 xl:w-150 2xl:w-160">
          <label for="password"
            class="text-[#656565] font-bold text-left w-78 sm:w-140 md:w-110 lg:w-120 xl:w-150 2xl:w-160">Password</label>
          <label class="input bg-white border-[#DCDCDC] w-78 sm:w-140 md:w-110 lg:w-120 xl:w-150 2xl:w-160">
            <input id="password" :type="passwordVisible ? 'text' : 'password'" v-model="password"
              placeholder="**************" @input="validatePassword"
              class=" bg-white border-[#DCDCDC] text-gray-800 w-78 sm:w-140 md:w-110 lg:w-120 xl:w-150 2xl:w-160" />
            <hr class="border-[#7C7C7C] border-1 h-6 absolute right-11 top-2">
            <svg @click="togglePasswordVisibility" v-if="!passwordVisible" xmlns="http://www.w3.org/2000/svg"
              fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor"
              class="size-6.5 sm:size-6 md:size-6 text-[#7C7C7C] cursor-pointer">
              <path stroke-linecap="round" stroke-linejoin="round"
                d="M3.98 8.223A10.477 10.477 0 0 0 1.934 12C3.226 16.338 7.244 19.5 12 19.5c.993 0 1.953-.138 2.863-.395M6.228 6.228A10.451 10.451 0 0 1 12 4.5c4.756 0 8.773 3.162 10.065 7.498a10.522 10.522 0 0 1-4.293 5.774M6.228 6.228 3 3m3.228 3.228 3.65 3.65m7.894 7.894L21 21m-3.228-3.228-3.65-3.65m0 0a3 3 0 1 0-4.243-4.243m4.242 4.242L9.88 9.88" />
            </svg>
            <svg v-else @click="togglePasswordVisibility" xmlns="http://www.w3.org/2000/svg" fill="none"
              viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor"
              class="size-6.5 sm:size-6 md:size-6 text-[#7C7C7C] cursor-pointer">
              <path stroke-linecap="round" stroke-linejoin="round" d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0ZM2.458 

                12C3.732 7.943 7.523 5.25 12 
                5.25c4.478 0 8.268 2.693 9.542 
                6.75-1.274 4.057-5.064 6.75-9.542 
                6.75-4.477 0-8.268-2.693-9.542-6.75Z" />
            </svg>
          </label>

          <p v-if="errors.password"
            class="text-red-400 w-78 sm:w-140 md:w-110 lg:w-120 xl:w-150 2xl:w-160 text-left mb-1">{{ errors.password }}

          </p>
        </div>

        <div class="mb-3 flex w-78 items-start sm:w-140 md:w-110 lg:w-120 xl:w-150 2xl:w-160">
          <label class="label text-[#7C7C7C]">
            <input type="checkbox" v-model="rememberMe"
              class="checkbox rounded-xs border-[#7C7C7C] font-light text-[#7C7C7C]" />
            Remember me
          </label>
        </div>


        <div class="border-[#EFEFEF] border-t-2 w-78 sm:w-140 md:w-110 lg:w-120 xl:w-150 2xl:w-160 mb-4"></div>
        <button @click="validateForm"
          class="btn bg-[#763A26] text-white text-xl border-0 w-78 sm:w-140 md:w-110 lg:w-120 xl:w-150 2xl:w-160">Login</button>
        <div class="flex flex-row gap-1 text-lg items-center mt-3 md:hidden">


          <p class="text-gray-500">Don't have an account?</p>
          <router-link to="/signup" class="text-[#763A26] underline">Sign Up!</router-link>
        </div>

        <p v-if="serverError" class="text-red-400 w-78 sm:w-140 md:w-110 lg:w-120 xl:w-150 2xl:w-160 text-center mt-3">
          {{ serverError }}</p>


      </div>
    </div>
    <!-- image right side -->
    <div
      class="hidden h-full flex-col items-center justify-center gap-6 rounded-l-[12%] bg-[#763A26] text-2xl text-white sm:hidden md:flex md:flex-grow-1 lg:flex">
      <div class="text-center">
        <p class="md:text-lg lg:text-2xl">Welcome Back!</p>
        <p class="md:text-lg lg:text-2xl">Please login to your account</p>
      </div>

      <img class="w-30 sm:w-40 md:w-65 lg:w-80 xl:w-90 2xl:w-100" src="/login.png" alt="">
      <div class="md:flex text-xl gap-1 items-center mt-2 hidden">
        <p class="text-gray-300 md:text-sm lg:text-xl">Don't have an account?</p>
        <router-link to="/signup" class="text-white underline md:text-lg lg:text-xl">Sign Up!</router-link>


      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";

export default {
  data() {
    return {
      email: "",
      password: "",
      rememberMe: false,
      passwordVisible: false,
      errors: {
        email: "",
        password: "",
      },
      serverError: "",
    };
  },
  methods: {
    validateEmail() {
      if (!this.email) {
        this.errors.email = "Email is required";
      } else if (!/\S+@\S+\.\S+/.test(this.email)) {
        this.errors.email = "Invalid email format";
      } else {
        this.errors.email = "";
      }
    },
    validatePassword() {
      if (!this.password) {
        this.errors.password = "Password is required";
      } else {
        this.errors.password = "";
      }
    },
    togglePasswordVisibility() {
      this.passwordVisible = !this.passwordVisible;
    },
    async validateForm() {
      this.validateEmail();

      this.errors.password = "";

      if (!this.password) {
        this.errors.password = "Password is required";
      }

      if (!this.errors.email && !this.errors.password) {
        try {
          const response = await axios.post(
            "https://admin-dashboard-gilt-omega.vercel.app/api/auth/login",
            {
              email: this.email,
              password: this.password,
            },
          );

          console.log("Login success!", response.data);

          if (response.data.token) {
            localStorage.setItem("token", response.data.token);
          } else {
            console.error("Login succeeded but token is missing!");
          }

          this.$router.push("/");
        } catch (error) {
          if (error.response) {
            if (error.response.status === 409) {
              this.serverError = "Email is already in use";
            } else if (error.response.status === 400) {
              this.serverError =
                error.response.data.message ||
                "Invalid data. Please check your inputs";
            } else {
              this.serverError =
                "Something went wrong. Please try again later.";
            }
          } else {
            this.serverError = "Network error. Please check your connection";
          }
        }
      }
    },
  },
};
</script>
