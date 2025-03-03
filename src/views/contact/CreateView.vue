<script setup lang="ts">
import { reactive, ref, onMounted, watch } from 'vue';
import { useRouter } from 'vue-router';
import { useContactStore } from '../../store/useContactStore';
import { useI18n } from 'vue-i18n';

const userStore = useContactStore();
const { t, locale } = useI18n()

interface Form {
  firstname: string;
  lastname: string;
  age: number | null;
}

interface Errors {
  firstname: boolean;
  lastname: boolean;
  age: boolean;
}

const form = reactive<Form>({
  firstname: '',
  lastname: '',
  age: null,
});


const errors = reactive<Errors>({
  firstname: false,
  lastname: false,
  age: false
})

const btnSubmit = ref<boolean>(true);
const router = useRouter();


const handleSubmit = () => {
  btnSubmit.value = false;
  const newUser = {
    firstName: form.firstname,
    lastName: form.lastname,
    age: form.age
  };

  if (validateForm()) {
    form.firstname = '';
    form.lastname = '';
    form.age = '';
    btnSubmit.value = true;
    userStore.add(newUser);
    router.push('/contact');
  } else {
    btnSubmit.value = true;
  }

};

const validateForm = () => {
  errors.firstname = form.firstname.trim() ? false : true
  errors.lastname = form.lastname.trim() ? false : true
  errors.age = form.age > 0 ? false : true
  return !errors.firstname && !errors.lastname && !errors.age
}

onMounted(() => {
  userStore.get();
}
)

watch(() => form.firstname, (newValue:string) => {
  if (newValue) errors.firstname = false
})

watch(() => form.lastname, (newValue:string) => {
  if (newValue) errors.lastname = false
})

watch(() => form.age, (newValue:string) => {
  if (newValue > 0) errors.age = false
})
</script>

<template>
  <div class="p-10 mt-5 flex flex-col gap-5">
    <div class="w-full max-w-[500px] m-auto">
      <p class="text-2xl">{{ t('contact-create') }}</p>
      <form @submit.prevent="handleSubmit">
        <div class="flex flex-col gap-2 mt-5">
          <div>
            <label for="firstname" class="block text-sm/6 font-medium text-gray-900">{{ t('firstname') }}</label>
            <div class="mt-2">
              <input type="text" id="firstname" v-model="form.firstname"
                class="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                :class="{ 'border-red-500 outline-red-500 focus:outline-red-500': errors.firstname }">
              <p v-if="errors.firstname" class="text-red-500 text-sm mt-1">{{ t('validate-firstname') }}</p>
            </div>
          </div>
          <div>
            <label for="lastname" class="block text-sm/6 font-medium text-gray-900">{{ t('lastname') }}</label>
            <div class="mt-2">
              <input type="text" id="lastname" v-model="form.lastname"
                class="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                :class="{ 'border-red-500 outline-red-500 focus:outline-red-500': errors.lastname }">
              <p v-if="errors.lastname" class="text-red-500 text-sm mt-1">{{ t('validate-lastname') }}</p>
            </div>
          </div>
          <div>
            <label for="age" class="block text-sm/6 font-medium text-gray-900">{{ t('age') }}</label>
            <div class="mt-2">
              <input type="number" id="age" v-model="form.age"
                class="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                :class="{ 'border-red-500 outline-red-500 focus:outline-red-500': errors.age }">
              <p v-if="errors.age" class="text-red-500 text-sm mt-1">{{ t('validate-age') }}</p>

            </div>
          </div>
          <div class='mt-4 flex gap-5'>
            <button v-if="btnSubmit" type="submit"
              class="w-full bg-orange-500 p-2 text-white rounded-md cursor-pointer hover:bg-orange-400"> {{ t('submit')
              }} </button>
            <button v-if="!btnSubmit" disabled type="button" class="w-full bg-orange-500 p-2 text-white rounded-md">
              {{ t('loading') }}
            </button>
            <router-link to="/contact" class='w-full'>
              <button type="button"
                class="w-full p-2 rounded-md cursor-pointer border-1 border-gray-200 hover:bg-gray-200"> {{ t('back') }}
              </button>
            </router-link>
          </div>
        </div>
      </form>
    </div>
  </div>
</template>
