<template>
  <button :class="`e-btn e-btn-${color} e-btn-${lowerCase(size)}`" @click="handleClick" :disabled="disabled">
    <span v-if="text">{{ text }}</span>
    <slot v-else />
  </button>
</template>

<script setup lang="ts">
import { lowerCase } from 'lodash-es'
import { useAppStore } from '~/store/app'

interface Props {
  text?: string // 若有輸入時以此為主，若沒有就顯示 slot
  color?: 'success' | 'error' | 'warn' // 預設為 success
  size?: 'LARGE' | "SMALL" 
  disabled?: boolean
}

interface Emit {
  (e: 'click', event: MouseEvent): void
}

const status = useAppStore()

const props = withDefaults(defineProps<Props>(), {
  color: 'success',
  size: 'LARGE',
  disabled: false
})

const emit = defineEmits<Emit>()

const handleClick = (event: MouseEvent) => {
  if (!status.loading) emit('click', event)
}

</script>

<style scoped lang="scss">
.e-btn {
  margin-inline-start: 4px;
  border-radius: 4px;
  border: none;
  // success 綠
  &-success {
    background: #0d861d;
    color: #fff;
  }

  // error 紅
  &-error {
    background: #ac1e1d;
    color: #fff;
  }

  // warn 黃
  &-warn {
    background: #ffbd38;
  }

  &-large {
    padding-inline: 10px;
    padding-block: 4px;
  }

  &-small {
    padding-block: 4px;
  }

}
</style>
