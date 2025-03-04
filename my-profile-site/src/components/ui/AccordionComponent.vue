<script setup>
import { ref } from 'vue'

const defaultValue = ref('item-1')
const accordionItems = [
  { value: 'item-1', title: 'What are you favorite video games?', content: 'My favorite games at the moment are Lethal Company, Minecraft, Phasmophobia, Terraria, and Tetris.' },
  { value: 'item-2', title: 'Dogs or Cats?', content: 'I love both! But I have a softer spot for cats' },
  { value: 'item-3', title: 'Favorite drink?', content: 'I love cola flavored soda. There are times I drink too much so I better keep an eye on that' }
]
</script>

<template>
  <div class="accordion">
    <div v-for="item in accordionItems" :key="item.value">
      <button @click="defaultValue = item.value">{{ item.title }}</button>
      <div v-if="defaultValue === item.value">
        {{ item.content }}
      </div>
    </div>
  </div>
</template>

<style>
.accordion button {
  background: limegreen;
  color: white;
  border: none;
  padding: 10px;
  width: 100%;
  text-align: left;
  cursor: pointer;
}
</style>
