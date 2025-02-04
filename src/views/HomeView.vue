<script setup lang="ts">
import HomeButton from '@/components/buttons/HomeButton.vue'
import { onMounted, ref } from 'vue'

const text = ref('asdf')

const viewConsole = () => {
  console.log(text.value)
}

onMounted(() => {})
</script>

<template>
  <div class="about">
    <h1>This is an Home page</h1>
    <HomeButton button-name="asdf" />
    <q-input v-model="text" label="Standard" />
    <q-btn color="primary" label="버튼" @click="viewConsole" />
    <div>{{ text }}</div>
  </div>
</template>
