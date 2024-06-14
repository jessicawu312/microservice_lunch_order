<template>
  <v-dialog max-width="600">
    <v-card>
      <v-row class="align-center justify-center">
        <v-col v-if="loginBtn" cols="12">
          <v-row class="align-center justify-center ma-4">
            <v-col cols="8">
              <v-text-field
                label="帳號"
                variant="underlined"
                v-model="username"
                :error-messages="loginErr ? ['帳號或密碼錯誤'] : []"
              ></v-text-field>
            </v-col>
            <v-col cols="8">
              <v-text-field
                type="password"
                label="密碼"
                variant="underlined"
                v-model="password"
                :error-messages="loginErr ? ['帳號或密碼錯誤'] : []"
              ></v-text-field>
            </v-col>
          </v-row>
          <v-row class="align-center justify-center mb-4">
            <v-col align="center" justify="center" cols="12">
              <v-btn color="primary" rounded="lg" @click="login()">
                登入
              </v-btn>
            </v-col>
            <v-col align="center" justify="center" cols="12">
              <v-btn color="secondary" rounded="lg" @click="changeToRegister()">
                註冊
              </v-btn>
            </v-col>
          </v-row>
        </v-col>
        <v-col v-if="registerBtn" cols="12">
          <v-row class="align-center justify-center ma-4">
            <v-col cols="8">
              <v-text-field
                label="帳號"
                variant="underlined"
                v-model="registerName"
              ></v-text-field>
            </v-col>
            <v-col cols="8">
              <v-text-field
                label="學號"
                variant="underlined"
                v-model="registerNumber"
              ></v-text-field>
            </v-col>

            <v-col cols="8">
              <v-text-field
                type="password"
                label="密碼"
                variant="underlined"
                v-model="registerPassword"
              ></v-text-field>
            </v-col>
          </v-row>
          <v-row class="align-center justify-center mb-4">
            <v-col align="center" justify="center" cols="12">
              <v-btn color="secondary" rounded="lg" @click="register()">
                註冊
              </v-btn>
            </v-col>
          </v-row>
        </v-col>
      </v-row>
    </v-card>
  </v-dialog>
</template>
<script setup>
import { defineEmits, onMounted, ref } from "vue";
import { userLogin, createUser } from "@/services/user";

const emit = defineEmits();

const username = ref("");
const password = ref("");
const loginErr = ref(false);
const loginBtn = ref(true);
const registerBtn = ref(false);
const registerName = ref("");
const registerPassword = ref("");
const registerNumber = ref("");

const changeToRegister = () => {
  loginBtn.value = false;
  registerBtn.value = true;
};

const register = () => {
  const content = {
    name: registerName.value,
    number: registerNumber.value,
    password: registerPassword.value,
  };
  createUser(content).then((res) => {
    if (res.data.success) {
      registerBtn.value = false;
      loginBtn.value = true;
      alert("使用者新增成功");
    } else {
      alert("使用者新增失敗");
    }
  });
};

const login = () => {
  const data = {
    name: username.value,
    password: password.value,
  };
  userLogin(data).then((res) => {
    if (res.data.success) {
      localStorage.setItem("user", JSON.stringify(res.data.data));
      loginErr.value = false;
      emit("closeDialog");
    } else {
      loginErr.value = true;
    }
  });
};
</script>

<style></style>
