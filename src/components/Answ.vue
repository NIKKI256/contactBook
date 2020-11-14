<template>
    <div>

        <!-- Обращение к пользователю -->
        <h1>Are you sure?</h1>
        
        <!-- Запись ответа "Да" -->
        <button @click="sendReply(1)">Yes</button>

        <!-- Запись ответа "Нет" -->
        <button @click="sendReply(0)">No</button>

    </div>
</template>


<script>
export default {
    methods:{
        //отправка ответа пользователя в родительские компоненты 
        sendReply(val){
            this.$emit('send-del',val)
        }
    }
}
</script>


<style scoped>
    button{
        margin: 10px;
        width: 40px;
    }
</style>