<template>
  <v-container>
    <v-row class="mt-8 mb-3" align="center" justify="center">
      <v-col align="center" justify="center" cols="6">
        <h2>STEP1</h2>
        <v-text-field
          class="mt-4"
          label="輸入店家名稱"
          variant="outlined"
          v-model="storeName"
        ></v-text-field>
      </v-col>
    </v-row>
    <v-row class="mt-8 mb-10" align="center" justify="center">
      <v-col align="center" justify="center" cols="6">
        <h2>STEP2</h2>
        <v-row
          v-for="item in itemArr"
          :key="item.index"
          :item="item"
          align="center"
          justify="center"
        >
          <v-col align="center" justify="start" cols="8">
            <v-text-field
              class="mt-4"
              label="輸入餐點品項"
              variant="outlined"
              v-model="item.name"
            ></v-text-field>
          </v-col>
          <v-col align="center" justify="start" cols="4">
            <v-text-field
              class="mt-4"
              label="輸入金額"
              variant="outlined"
              type="number"
              v-model="item.price"
            ></v-text-field>
          </v-col>
        </v-row>
        <v-row align="center" justify="center">
          <v-col align="center" justify="start" cols="8">
            <v-btn color="secondary" rounded="lg" @click="addItem()">
              增加餐點
            </v-btn>
          </v-col>
        </v-row>
      </v-col>
    </v-row>
    <v-row class="mt-8 mb-10" align="center" justify="center">
      <v-col align="center" justify="center" cols="6">
        <h2>STEP3</h2>
        <v-text-field
          class="mt-4"
          label="輸入取貨地點(中科大校園)"
          variant="outlined"
          v-model="groupPlace"
        ></v-text-field>
      </v-col>
    </v-row>
    <v-row class="mt-10" align="center" justify="center">
      <v-col align="center" justify="center" cols="12">
        <v-btn color="primary" size="x-large" rounded="lg" @click="newGroup()"
          >新增團購</v-btn
        >
      </v-col>
    </v-row>
  </v-container>
</template>

<script setup>
import { defineProps, defineEmits, onMounted, ref, watch } from "vue";
import { createGroups, createGroupItems } from "@/services/group";
import { useRouter } from "vue-router";

const router = useRouter();
const storeName = ref("");
const groupPlace = ref("");
const itemArr = ref([
  {
    name: "",
    price: null,
  },
]);

const addItem = () => {
  itemArr.value.push({
    name: "",
    price: null,
  });
};

const newGroup = () => {
  const content = {
    name: storeName.value,
    place: groupPlace.value,
    owner: JSON.parse(localStorage.getItem("user")).id,
  };
  createGroups(content).then((res) => {
    if (res.data.success) {
      newGroupItems(res.data.data.groupId);
    } else {
      alert("團購新增失敗");
    }
  });
};

const newGroupItems = (group_id) => {
  const content = {
    items: itemArr.value,
    group_id,
  };
  createGroupItems(content).then((res) => {
    if (res.data.success) {
      alert("團購新增成功");
      router.push({ name: "Home" });
    }
  });
};
</script>

<style></style>
