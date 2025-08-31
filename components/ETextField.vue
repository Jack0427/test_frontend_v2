<template>
  <div>
    <label>{{ label }}</label>
    <input 
      :id="id"
      v-model="value"
    />
  </div>
</template>

<script setup lang="ts">
interface Props {
  id?: string // 若使用者有輸入，以使用者輸入的為主，若沒有請產出一個唯一 ID
  label: string,
  modelValue: string
}

interface Emit {
  (e: 'update:modelValue', value: string): void
}

const props = withDefaults(defineProps<Props>(), {
  id: String(new Date().valueOf())
})

const emit = defineEmits<Emit>()

const value = computed({
  get:() => props.modelValue,
  set:(value) => emit('update:modelValue', value)
})

</script>

<style scoped lang="scss">
label {
  display: block;
  color: #fff;
  margin-block-end: 4px;
}
input {
  font-size: 18px;
  font-weight: bold;
  padding-inline: 18px;
  padding-block: 4px;
  width: calc(100% - 36px);
  color: #fff;
  background: #2a2a2a;
  border-radius: 4px;
  border: 1px solid #fff
}
</style>
