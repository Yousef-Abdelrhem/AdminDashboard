<script setup>
import AddImage from "../components/AddImage.vue";
import Avatar from "../components/Avatar.vue";
</script>
<template>
  <!-- <div class="flex h-14 w-full justify-end">
    <Avatar />
  </div>
  <AddImage /> -->

  <div class="pr-2 pl-2 mb-10">
    <div class="mt-2 mb-3 flex justify-end gap-1 lg:mt-10 lg:gap-10">
      <Avatar />
    </div>
    <section
      class="w-full rounded-xl border-2 border-[#EFEFEF] p-4 pt-5 pr-4 pb-5 "
    >
      <h2 class="text-main-950 mb-6 text-2xl font-bold">Add Product</h2>

      <div class="flex gap-4">
        <div class="flex flex-col gap-5">
          <AddImage />
          <AddImage />
          <AddImage />
          <AddImage />
        </div>

        <form
          class="flex w-full flex-col gap-6 rounded-xl border-2 border-[#B0B0B0] p-4 pt-5 pr-4 pb-5 justify-center mb-2"
        >
          <fieldset class="fieldset flex">
            <legend class="fieldset-legend font--light mb-[0.5rem]">
              Product Name
            </legend>
            <input
              type="text"
              class="input w-full focus-within:border-0"
              placeholder="Bag"
            />
          </fieldset>

          <fieldset class="fieldset">
            <legend class="fieldset-legend font--light mb-[0.5rem]">
              Product Description
            </legend>
            <textarea
              class="textarea h-[10rem] w-full resize-none p-2 text-black outline-none focus-within:border-0"
              placeholder="Small Bag"
            ></textarea>
          </fieldset>

          <fieldset class="fieldset flex">
            <legend class="fieldset-legend font--light mb-[0.5rem]">
              Product Category
            </legend>
            <select
              class="text-[0.9rem] select select-lg w-full bg-[url('data:image/svg+xml;charset=UTF-8,%3Csvg%20width%3D%2215%22%20height%3D%2211%22%20viewBox%3D%220%200%2015%2011%22%20fill%3D%22none%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%3E%3Cpath%20d%3D%22M1.50006%200.333324H13.5001C13.6216%200.333705%2013.7406%200.367214%2013.8445%200.430243C13.9484%200.493272%2014.0331%200.583434%2014.0895%200.691026C14.146%200.798617%2014.172%200.919564%2014.1648%201.04085C14.1576%201.16213%2014.1175%201.27915%2014.0487%201.37932L8.04872%2010.046C7.80006%2010.4053%207.20139%2010.4053%206.95206%2010.046L0.952057%201.37932C0.882607%201.27936%200.84188%201.16228%200.8343%201.04079C0.826721%200.919311%200.85258%200.798072%200.909066%200.690252C0.965553%200.582433%201.05051%200.492155%201.1547%200.429228C1.25889%200.366302%201.37834%200.333133%201.50006%200.333324Z%22%20fill%3D%22%23763A26%22%2F%3E%3C%2Fsvg%3E')] bg-[length:15px] bg-[right_1rem_center] bg-no-repeat pr-10 focus-within:border-0"
            >
              <option disabled selected>Large</option>
              <option>Large Apple</option>
              <option>Large Orange</option>
              <option>Large Tomato</option>
            </select>
          </fieldset>

          <fieldset class="fieldset flex">
            <legend class="fieldset-legend font--light mb-[0.5rem]">
              Product Price
            </legend>
            <input
              type="text"
              class="input w-full focus-within:border-0"
              placeholder="$200"
            />
          </fieldset>

          <fieldset class="fieldset flex">
            <legend class="fieldset-legend font--light mb-[0.5rem]">
              Product Discount
            </legend>
            <input
              type="text"
              class="input w-full focus-within:border-0"
              placeholder="20%"
            />
          </fieldset>

          <fieldset class="fieldset flex">
            <legend class="fieldset-legend font--light mb-[0.5rem]">
              Quantity In Stock
            </legend>
            <input
              type="text"
              class="input w-full focus-within:border-0"
              placeholder="200"
            />
          </fieldset>

          <button
            class="bg-main-200 hover:bg-main-300/70 flex w-[10rem] items-center justify-center gap-2 rounded-xl py-3 self-center"
          >
            <svg
              width="18"
              height="18"
              viewBox="0 0 18 18"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M9 6V12M12 9H6"
                stroke="#763A26"
                stroke-width="1.5"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
              <path
                d="M9 16.5C13.1421 16.5 16.5 13.1421 16.5 9C16.5 4.85786 13.1421 1.5 9 1.5C4.85786 1.5 1.5 4.85786 1.5 9C1.5 13.1421 4.85786 16.5 9 16.5Z"
                stroke="#763A26"
                stroke-width="1.5"
              />
            </svg>
            <span class="text-main-950 text-lg font-medium">Submit</span>
          </button>
        </form>
      </div>
    </section>
  </div>
</template>
font--light
