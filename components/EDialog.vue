<template>
  <dialog
    ref="dialogRef"
  >
    <div class="mb-5">
      <p>{{ message }}</p>
    </div>
    <EBtn @click="handleConfirm" :text="$t('submit')" />
    <EBtn @click="close" :text="$t('cancel')" color="error" />
  </dialog>
</template>
<script setup lang="ts">
interface Props {
  name: string
  type: 'ADD' | 'UPDATE' | 'DELETE' | 'SUCCESS' | 'FAIL',
  message: string
}

interface Emit {
  (e: 'confirm'): void
  (e: 'cancel'): void
}
const props = withDefaults(defineProps<Props>(), {})
const emit = defineEmits<Emit>()
const { t } = useI18n()

const dialogRef = ref<HTMLDialogElement>();

const message = computed(() => {
  switch (props.type) {
    case 'ADD':
      return t('add_message', {name: props.name})
    case 'UPDATE':
      return t('update_message', {name: props.name})
    case 'DELETE':
      return t('delete_message', {name: props.name})
    case 'SUCCESS':
      return t('success')
    case 'FAIL':
      return t('fail')
  }
})

const open = async () => {
  await nextTick();
  dialogRef.value?.showModal();
};

const close = () => {
  dialogRef.value?.close();
};

const handleConfirm = () => {
  emit('confirm');
};

defineExpose({ open, close });
</script>
<style lang="scss">
dialog {
  margin-block-start: 100px;
  padding-inline: 100px;
}
</style>
