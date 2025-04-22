<template>
    <div class="bg-white w-screen h-[56rem] md:h-[43.45rem] flex shadow-2xl">
        <!-- form  left side-->
        <div class="flex justify-center items-center h-full flex-grow-1 md:w-[50%] lg:w-[20rem] xl:w-[35rem]">
            <div class="w-92 md:w-140 flex justify-center items-center flex-col">
                <h1 class="text-[#763A26] text-3xl sm:text-4xl md:text-3xl font-bold text-center">Sign Up</h1>
                <p class="text-gray-500 text-center mb-5 text-lg sm:text-xl">Please enter your email and password and
                    confirm your password
                </p>
                <!-- username -->
                <div class="flex flex-col mb-2 w-94 sm:w-140 md:w-110 lg:w-120 xl:w-150 2xl:w-160">
                    <label for="username"
                        class="text-[#656565] font-bold text-left w-94 sm:w-140 md:w-110 lg:w-120 xl:w-150 2xl:w-160">Username</label>
                    <input id="username" v-model="username" type="text" placeholder="John Doe" @input="validateUsername"
                        class="input bg-white border-[#DCDCDC] text-gray-800 w-94 sm:w-140 md:w-110 lg:w-120 xl:w-150 2xl:w-160" />
                    <p v-if="errors.username"
                        class="text-red-400 w-94 sm:w-140 md:w-110 lg:w-120 xl:w-150 2xl:w-160 text-left mb-1">{{
                            errors.username }}</p>
                </div>
                <!-- email -->
                <div class="flex flex-col mb-2 w-94 sm:w-140 md:w-110 lg:w-120 xl:w-150 2xl:w-160">
                    <label for="email"
                        class="text-[#656565] font-bold text-left w-94 sm:w-140 md:w-110 lg:w-120 xl:w-150 2xl:w-160">E-mail</label>
                    <input id="email" v-model="email" type="text" placeholder="example@gmail.com" @input="validateEmail"
                        class="input bg-white border-[#DCDCDC] text-gray-800 w-94 sm:w-140 md:w-110 lg:w-120 xl:w-150 2xl:w-160" />
                    <p v-if="errors.email"
                        class="text-red-400 w-94 sm:w-140 md:w-110 lg:w-120 xl:w-150 2xl:w-160 text-left mb-1">{{
                            errors.email }}</p>
                </div>
                <!-- password -->
                <div class="flex flex-col mb-2 w-94 sm:w-140 md:w-110 lg:w-120 xl:w-150 2xl:w-160">
                    <label for="password"
                        class="text-[#656565] font-bold text-left w-94 sm:w-140 md:w-110 lg:w-120 xl:w-150 2xl:w-160">Password</label>
                    <label class="input bg-white border-[#DCDCDC] w-94 sm:w-140 md:w-110 lg:w-120 xl:w-150 2xl:w-160">
                        <input id="password" :type="passwordVisible ? 'text' : 'password'" v-model="password"
                            placeholder="**************" @input="validatePassword"
                            class=" bg-white border-[#DCDCDC] text-gray-800 w-94 sm:w-140 md:w-110 lg:w-120 xl:w-150 2xl:w-160" />
                        <hr class="border-[#7C7C7C] border-1 h-6 absolute right-11 top-2">
                        <svg @click="togglePasswordVisibility" v-if="!passwordVisible"
                            xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
                            stroke="currentColor" class="size-6.5 sm:size-6 md:size-6 text-[#7C7C7C] cursor-pointer">
                            <path stroke-linecap="round" stroke-linejoin="round"
                                d="M3.98 8.223A10.477 10.477 0 0 0 1.934 12C3.226 16.338 7.244 19.5 12 19.5c.993 0 1.953-.138 2.863-.395M6.228 6.228A10.451 10.451 0 0 1 12 4.5c4.756 0 8.773 3.162 10.065 7.498a10.522 10.522 0 0 1-4.293 5.774M6.228 6.228 3 3m3.228 3.228 3.65 3.65m7.894 7.894L21 21m-3.228-3.228-3.65-3.65m0 0a3 3 0 1 0-4.243-4.243m4.242 4.242L9.88 9.88" />
                        </svg>
                        <svg v-else @click="togglePasswordVisibility" xmlns="http://www.w3.org/2000/svg" fill="none"
                            viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor"
                            class="size-6.5 sm:size-6 md:size-6 text-[#7C7C7C] cursor-pointer">
                            <path stroke-linecap="round" stroke-linejoin="round"
                                d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0ZM2.458 12C3.732 7.943 7.523 5.25 12 5.25c4.478 0 8.268 2.693 9.542 6.75-1.274 4.057-5.064 6.75-9.542 6.75-4.477 0-8.268-2.693-9.542-6.75Z" />
                        </svg>
                    </label>
                    <p v-if="errors.password"
                        class="text-red-400 w-94 sm:w-140 md:w-110 lg:w-120 xl:w-150 2xl:w-160 text-left mb-1"
                        v-html="errors.password"></p>
                </div>
                <!-- confirm password -->
                <div class="flex flex-col mb-2 w-94 sm:w-140 md:w-110 lg:w-120 xl:w-150 2xl:w-160">
                    <label for="confirmpassword"
                        class="text-[#656565] font-bold text-left w-94 sm:w-140 md:w-110 lg:w-120 xl:w-150 2xl:w-160">Confirm
                        Password</label>
                    <label class="input bg-white border-[#DCDCDC] w-94 sm:w-140 md:w-110 lg:w-120 xl:w-150 2xl:w-160">
                        <input id="confirmpassword" :type="confirmPasswordVisible ? 'text' : 'password'"
                            v-model="confirmpassword" placeholder="**************" @input="validateConfirmPassword"
                            class=" bg-white border-[#DCDCDC] text-gray-800 w-94 sm:w-140 md:w-110 lg:w-120 xl:w-150 2xl:w-160" />
                        <hr class="border-[#7C7C7C] border-1 h-6 absolute right-11 top-2">
                        <svg @click="toggleConfirmPasswordVisibility" v-if="!confirmPasswordVisible"
                            xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
                            stroke="currentColor" class="size-6.5 sm:size-6 md:size-6 text-[#7C7C7C] cursor-pointer">
                            <path stroke-linecap="round" stroke-linejoin="round"
                                d="M3.98 8.223A10.477 10.477 0 0 0 1.934 12C3.226 16.338 7.244 19.5 12 19.5c.993 0 1.953-.138 2.863-.395M6.228 6.228A10.451 10.451 0 0 1 12 4.5c4.756 0 8.773 3.162 10.065 7.498a10.522 10.522 0 0 1-4.293 5.774M6.228 6.228 3 3m3.228 3.228 3.65 3.65m7.894 7.894L21 21m-3.228-3.228-3.65-3.65m0 0a3 3 0 1 0-4.243-4.243m4.242 4.242L9.88 9.88" />
                        </svg>

                        <svg v-else @click="toggleConfirmPasswordVisibility" xmlns="http://www.w3.org/2000/svg"
                            fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor"
                            class="size-6.5 sm:size-6 md:size-6 text-[#7C7C7C] cursor-pointer">
                            <path stroke-linecap="round" stroke-linejoin="round"
                                d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0ZM2.458 12C3.732 7.943 7.523 5.25 12 5.25c4.478 0 8.268 2.693 9.542 6.75-1.274 4.057-5.064 6.75-9.542 6.75-4.477 0-8.268-2.693-9.542-6.75Z" />
                        </svg>
                    </label>
                    <p v-if="errors.confirmpassword"
                        class="text-red-400 w-94 sm:w-140 md:w-110 lg:w-120 xl:w-150 2xl:w-160 text-left mb-1">{{
                            errors.confirmpassword }}</p>
                </div>
                <!-- Remember me -->
                <div class="flex items-start w-94 sm:w-140 md:w-110 lg:w-120 xl:w-150 2xl:w-160 mb-3">
                    <label class="label text-[#7C7C7C]">
                        <input type="checkbox" v-model="rememberMe"
                            class="checkbox rounded-xs text-[#7C7C7C] font-light border-[#7C7C7C]" />
                        Remember me
                    </label>
                </div>

                <div class="border-[#EFEFEF] border-t-2 w-94 sm:w-140 md:w-110 lg:w-120 xl:w-150 2xl:w-160 mb-4"></div>
                <button @click="validateForm"
                    class="btn bg-[#763A26] text-white text-xl border-0 w-94 sm:w-140 md:w-110 lg:w-120 xl:w-150 2xl:w-160">Sign
                    Up</button>
                <div class="flex flex-row gap-1 text-xl items-center mt-3 md:hidden">
                    <p class="text-gray-500">Already have an account?</p>
                    <router-link to="/login" class="text-[#763A26] underline">Login!</router-link>
                </div>
                <p v-if="serverError"
                    class="text-red-400 w-94 sm:w-140 md:w-110 lg:w-120 xl:w-150 2xl:w-160 text-center mt-3">{{ serverError
                    }}</p>
            </div>
        </div>
        <!-- image right side -->
        <div
            class="bg-[#763A26] h-full md:flex-grow-1 rounded-l-[12%] hidden sm:hidden md:flex lg:flex justify-center items-center flex-col text-white text-2xl gap-6">
            <div class="text-center">
                <p class="md:text-lg lg:text-2xl">Welcome Back!</p>
                <p class="md:text-lg lg:text-2xl">Please signup to your account</p>
            </div>
            <img class="w-30 sm:w-40 md:w-65 lg:w-80 xl:w-90 2xl:w-100" src="/login.png" alt="">
            <div class="md:flex text-xl gap-1 items-center mt-2 hidden">
                <p class="text-gray-300 md:text-sm lg:text-xl">Already have account</p>
                <router-link to="/login" class="text-white underline md:text-lg lg:text-xl">Login!</router-link>
            </div>
        </div>
    </div>
</template>

<script>
import axios from 'axios';
export default {
    data() {
        return {
            username: '',
            email: '',
            password: '',
            confirmpassword: '',
            rememberMe: false,
            passwordVisible: false,
            confirmPasswordVisible: false,
            errors: {
                username: '',
                email: '',
                password: '',
                confirmpassword: ''
            },
            serverError: ''
        };
    },
    methods: {
        validateUsername() {
            const usernamePattern = /^[a-zA-Z\s]{3,30}$/;
            if (!this.username) {
                this.errors.username = 'Username is required';
            } else if (this.username.replace(/\s/g, '').length < 3) {
                this.errors.username = 'Username must be at least 3 characters';
            } else if (!usernamePattern.test(this.username.replace(/\s/g, ''))) {
                this.errors.username = 'Username must contain only letters';
            } else {
                this.errors.username = '';
            }
        },
        validateEmail() {
            const emailPattern = /^[a-zA-Z][a-zA-Z0-9._%+-]*@[a-zA-Z.-]+\.[a-zA-Z]{2,}$/;
            if (!this.email) {
                this.errors.email = 'Email is required';
            } else if (!emailPattern.test(this.email)) {
                this.errors.email = 'Invalid email format (example@gmail.com)';
            } else {
                this.errors.email = '';
            }
        },
        validatePassword() {
            const passwordPattern = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,20}$/;
            if (!this.password) {
                this.errors.password = 'Password is required';
            } else if (!passwordPattern.test(this.password)) {
                this.errors.password =
                    'Password must be at least 8 characters long, including<br>At least one number and a Special character<br>At least one lowercase letter<br>At least one uppercase letter';
            } else {
                this.errors.password = '';
            }
        },
        validateConfirmPassword() {
            if (!this.confirmpassword) {
                this.errors.confirmpassword = 'Please confirm your password';
            } else if (this.confirmpassword !== this.password) {
                this.errors.confirmpassword = 'Passwords do not match';
            } else {
                this.errors.confirmpassword = '';
            }
        },

        togglePasswordVisibility() {
            this.passwordVisible = !this.passwordVisible;
        },
        toggleConfirmPasswordVisibility() {
            this.confirmPasswordVisible = !this.confirmPasswordVisible;
        },
        async validateForm() {

            this.validateUsername();
            this.validateEmail();
            this.validatePassword();
            this.validateConfirmPassword();

            if (
                !this.errors.username &&
                !this.errors.email &&
                !this.errors.password &&
                !this.errors.confirmpassword
            ) {
                try {
                    const response = await axios.post('https://admin-dashboard-gilt-omega.vercel.app/api/auth/register', {
                        username: this.username,
                        email: this.email,
                        password: this.password,
                        confirmPassword: this.confirmpassword
                    });

                    console.log('Sign up success!', response.data);

                    this.$router.push('/login');
                } catch (error) {
                    if (error.response) {
                        if (error.response.status === 409) {
                            this.serverError = 'Email is already in use';
                        } else if (error.response.status === 400) {
                            this.serverError = error.response.data.message || 'Invalid data. Please check your inputs';
                        } else {
                            this.serverError = 'Something went wrong. Please try again later.';
                        }
                    } else {
                        this.serverError = 'Network error. Please check your connection';
                    }
                }
            }
        }

    }

};
</script>
