<template>
  <v-container
    fluid
    style="height: 100vh"
    class="d-flex align-center justify-center"
  >
    <v-row>
      <v-col align="center" justify="center" cols="12">
        <v-btn
          color="primary"
          size="x-large"
          rounded="lg"
          @click="loginOrOut()"
          >{{ loginText }}</v-btn
        >
      </v-col>
      <v-col align="center" justify="center" cols="12">
        <v-btn
          :readonly="disableBtn"
          color="primary"
          size="x-large"
          rounded="lg"
          @click="order()"
          >我要跟團</v-btn
        >
      </v-col>
      <v-col align="center" justify="center" cols="12">
        <v-btn
          :readonly="disableBtn"
          color="primary"
          size="x-large"
          rounded="lg"
          @click="group()"
          >我要開團</v-btn
        >
      </v-col>
      <v-col align="center" justify="center" cols="12">
        <v-btn
          :readonly="disableBtn"
          color="primary"
          size="x-large"
          rounded="lg"
          @click="checkOrder()"
          >查看訂單</v-btn
        >
      </v-col>
      <v-col v-if="disableBtn" align="center" justify="center" cols="12">
        <v-row align="center" justify="center">
          <v-col align="center" justify="center" cols="auto">
            <v-icon icon="mdi-alert-circle" color="alert" />
          </v-col>
          <v-col align="center" justify="center" cols="auto">
            <h3 style="color: #800808">請先登入</h3>
          </v-col>
        </v-row>
      </v-col>
    </v-row>
    <Account
      v-if="isLogin"
      v-model="isLogin"
      @closeDialog="closeDialog()"
    ></Account>
  </v-container>
</template>

<script setup>
import { useRouter } from "vue-router";
import { onMounted, ref } from "vue";

const router = useRouter();
const isLogin = ref(false);
const loginText = ref("");
const disableBtn = ref(false);

onMounted(() => {
  checkUserStatus();
});

const order = () => {
  router.push({ name: "Order" });
};
const group = () => {
  router.push({ name: "Group" });
};
const checkUserStatus = () => {
  const userStatus = localStorage.getItem("user");
  if (userStatus == null) {
    loginText.value = "會員登入";
    disableBtn.value = true;
  } else {
    loginText.value = "會員登出";
    disableBtn.value = false;
  }
};
const closeDialog = () => {
  checkUserStatus();
  isLogin.value = false;
};
const loginOrOut = () => {
  const userStatus = localStorage.getItem("user");
  if (userStatus == null) {
    isLogin.value = true;
  } else {
    localStorage.removeItem("user");
    checkUserStatus();
  }
};
const checkOrder = () => {
  router.push({ name: "CheckGroup" });
};
</script>
