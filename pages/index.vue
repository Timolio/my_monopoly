<script setup>
const userStore = useUserStore();

const { nickname, roomId } = storeToRefs(userStore);

const joinGame = async () => {
    if (nickname.value.trim() && roomId.value.trim()) {
        await navigateTo(`game`);
    }
};
</script>

<template>
    <div>
        <input
            v-model="nickname"
            placeholder="Придумайте псевдоним"
            type="text"
        />
        <input v-model="roomId" placeholder="Введите код игры" type="text" />
        <button @click="joinGame">Играть</button>
    </div>
</template>
