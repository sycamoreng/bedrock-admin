<template lang="">
  <div class="block md:flex h-screen">
    <div class="w-full md:w-1/2 py-5 px-8 md:px-16">
      <!-- <p class="text-left font-bold">Bedrock Admin</p> -->
      <div class="w-32 pt-8">
        <img src="@/assets/images/logo-x.png" alt="">
      </div>
      <div class="mt-20">
        <p class="text-3xl font-bold">Hello there,</p>
        <p>Sign in to access your dashboard.</p>
      </div>
      <div class="mt-10">
        <Input id="email" type="email" label="Email" placeholder="Your Email" v-model="form.email">
          <PhosphorIconEnvelopeSimple />
        </Input>
        <Input id="password" type="password" label="Password" placeholder="••••••••••" v-model="form.password">
          <PhosphorIconLockKey />
        </Input>
        <Button text="Log in" @click="handleLogin" :loading="form.loading" :disabled="!formReady || form.loading" />
      </div>
    </div>
    <div class="hidden md:block login-bg md:w-1/2 bg-cover bg-center bg-no-repeat bg-blend-multiply bg-black/40"></div>
  </div>
</template>
<script setup>
import { reactive, ref } from "vue";
const { signIn } = useAuth();

useHead({
  title: "Bedrock Admin | Residences & Apartments | Login",
});

definePageMeta({
  layout: false,
  auth: {
    unauthenticatedOnly: true,
    navigateAuthenticatedTo: '/',
  }
});

const form = reactive({
  email: null,
  password: null,
  loading: false,
});
const formReady = computed(() => {
  const emailRegex =
    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  if (form.email?.match(emailRegex) && form.password?.length >= 8) {
    return true;
  } else {
    return false;
  }
});

const handleLogin = async () => {
  try {
    form.loading = true;
    const response = await signIn({
      email: form.email,
      password: form.password,
    }, { callbackUrl: "/" });
    form.loading = false;
  } catch (err) {
    form.loading = false;
  }
};

</script>
<style>
  .login-bg {
    background-image: url(https://images.pexels.com/photos/33023001/pexels-photo-33023001.jpeg);
  }
</style>