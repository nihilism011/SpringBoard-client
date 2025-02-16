<script lang="ts" setup>
import axiosInstance from '@/utils/axiosInstance';
import { ref } from 'vue';

  const card = ref(false);
  const username = ref('');
  const password = ref('');

  const login = async () => {
    try {
      const res = await axiosInstance.post('/login', new URLSearchParams({
      username : username.value,
      password : password.value
    }), {
      headers: {
        'Content-Type' : 'application/x-www-form-urlencoded',
      }
    }
  );
      sessionStorage.setItem('accessToken', res.data.payload);
      console.log(res);
    } catch (e){
      console.log(e);
    }

  }
  const logout = async () => {
    try{
      const res = await axiosInstance.post('/logout',{ withCredentials: true });
      sessionStorage.removeItem('accessToken');
      console.log(res);
    } catch (e){
      console.log(e);
    }

  }

</script>
<template>
  <div class="q-pa-md q-gutter-sm" >
    <q-btn label="Login" color="primary" @click="card = true" />
    <q-btn label="Logout" color="primary" @click="logout" />
    <q-btn label="Join" color="primary" @click=" async ()=>{
       const res = await axiosInstance.post('/join',
       {
        email: '1',
        password: '1',
        name: '1'
      })
      console.log(res);

    }" />

    <q-btn label="Test" color="primary" @click=" async ()=>{
       const res = await axiosInstance.get('/checkLogin')
       console.log(res);
      }" />

    <q-dialog v-model="card" >
      <q-card class="my-card dia">

        <q-card-section>
            <div class="col text-h6 ellipsis">
              로그인
            </div>
        </q-card-section>
        <q-card-section>
          <q-input outlined v-model="username" label="ID"/>
        </q-card-section>
        <q-card-section>
          <q-input outlined v-model="password" label="Password" />
        </q-card-section>

        <q-separator />

        <q-card-actions align="right">
          <q-btn v-close-popup flat color="primary" label="로그인" @click="login" />
        </q-card-actions>
      </q-card>
    </q-dialog>

  </div>
</template>
<style scoped>
  .dia{
    width: 350px;
  }
</style>
