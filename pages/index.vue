<template>
<div class="main">
  <div class="card">
    <form>
      <ETextField 
        :label="$t('name')"
        v-model.trim="formData.name"
      />
      <ETextField 
        :label="$t('age')"
        v-model.trim="formData.age"
        class="mt-2"
      />
      <p class="btn-group">
        <EBtn 
          :text="$t('update')"
          type="button"
          :disabled="updateBtnDisabled"
          @click="handleClick('UPDATE')"
        />
        <EBtn 
          :text="$t('add')"
          color="warn"
          type="button"
          :disabled="addBtnDisabled"
          @click="handleClick('ADD')"
        />
      </p>
    </form>
  </div>
  <div class="card mt-8">
    <table>
      <thead>
        <tr>
          <th>#</th>
          <th>{{ $t('name') }}</th>
          <th>{{ $t('age') }}</th>
          <th>{{ $t('operate') }}</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(item, idx) in user.users" :key="idx">
          <td>{{ item.id }}</td>
          <td>{{ item.name }}</td>
          <td>{{ item.age }}</td>
          <td>
            <EBtn size="SMALL" color="success" :text="$t('update')" @click="handleTableClick('UPDATE', item)"/>
            <EBtn size="SMALL" color="error" :text="$t('delete')" @click="handleTableClick('DELETE', item)" />
          </td>
        </tr>
      </tbody>
    </table>
  </div>
  <EDialog 
    ref="dialogRef"
    :name="name"
    :type="action"
    :message="'13'"
    @confirm="handleConfirm"
  />
</div>
</template>

<script setup lang="ts">
import EBtn from '~/components/EBtn.vue'
import { useAppStore } from '~/store/app'
import type { User } from '~/types/user'

type actionType = 'ADD' | 'UPDATE' | 'DELETE'

interface Form extends Omit<User, 'id' | 'age'> {
  age: string
}
const formData = reactive<Form>({
  name: '',
  age: ''
})
const user = useAppStore()

await useAsyncData('posts', async() => {
  user.fetchUsers()
})

const dialogRef = ref()
const action = ref<actionType>('ADD')
const targetItem = ref<User>()
const name = computed(() => action.value === 'ADD' ? formData.name : targetItem.value!.name)
const addBtnDisabled = computed(() => !formData.name || isNaN(Number(formData.age)) || !formData.age.length)
const updateBtnDisabled = computed(() => !formData.name || isNaN(Number(formData.age)) || !formData.age.length || !targetItem.value?.id)

const handleClick = (type: actionType) => {
  action.value = type
  dialogRef.value?.open();
}

const handleTableClick = (type: actionType, target: User) => {
  action.value = type
  targetItem.value = target
  if(type === 'DELETE') dialogRef.value?.open()
  else {
    formData.name = target.name
    formData.age = String(target.age)
  }
  
}

const handleConfirm = () => {
  switch (action.value) {
    case 'ADD':
      user.addUser({
        name: formData.name,
        age: Number(formData.age)
      })
      break;

    case 'DELETE':
      user.removeUser(targetItem.value!.id)
      targetItem.value = undefined
      break;

    case 'UPDATE':
      user.updateUser({
        name: formData.name,
        age: Number(formData.age),
        id: targetItem.value!.id
      })
      targetItem.value = undefined
      break;
  }
  dialogRef.value.close()
}
</script>

<style scoped lang="scss">
.card {
  border-radius: 32px;
  border: solid 1px #898989;
  width: 375px;
  padding-inline: 40px;
  padding-block: 32px;
  @media (max-width: 480px) {
    width: 280px;
    padding-inline: 10px;
  }
}
.main {
  padding-inline: 40px;
  padding-block: 60px;
  display: grid;
  justify-content: center;
}
.btn-group {
  text-align: right;
  margin-block-start: 32px;
}
</style>
