<template>
    <div>
        <!-- Заголовок -->
        <h1>Contact Book</h1> 

        <!-- Существующие контакты -->
        <div class="contacts" v-if="!isVisibleAnsw">
            
            <!-- Если массив будет пуст - появится сообщение об этом -->
            <div v-if="contacts.length <= 0">

                <h1>Contact book is empty</h1>

            </div>

            <!-- Перечень существующих контактов 
                cont - переменная контакта
                i - индекс контакта -->
            <div v-for="(cont,i) in contacts" :key="i" class="contact">
                
                <!-- Ссылка на контакт с передачей его id в массиве -->
                <router-link :to="{ name: 'contact', params: { id:cont.id}}">
                    
                    <!-- Вывод Индекса, Имя и Фамилии контакта -->
                    <b>{{i + 1}}</b> - {{cont.name}} {{cont.surname}}

                </router-link>

                <!-- Кнопка удаления контакта -->
                <button class="btn" @click="goToAncw(i)">Delete</button>

            </div>

        </div>

        <!-- Компонент для подтверждения действия "удаление контакта"
            виден при определенном условии -->
        <Answ v-if="isVisibleAnsw"
            @send-del="removeContact"
        />
        
        <!-- Кнопка добавления контакта 
            переход на комопнент добавления через пуш строки роута
            виден при определенном условии -->
        <button class="addCont" 
        @click="$router.push('addContact')" 
        v-if="!isVisibleAnsw">
            Add contact</button>

    </div>
</template>


<script>

import Answ from './Answ'//компонент подтверждения действий пользователя
import contacts from '../JsFiles/contacts.js'// экспорт массива контактов

export default {
    data(){
        //переменные отсортированы вручную
        //сверху вниз : arr , null , bool
        return{
            contacts:[], //главная переменная для управления всеми контактами
            removeId:null, //переменная для удаления контакта
            isVisibleAnsw:false //поле видимости для компонента "Answ"
        }
    },
    components:{
        Answ// регистрация компонента "Подтверждение"
    },
    methods:{

        //функция запрашивающая подтверждение для удаления
        //(для точного понимания загляните в компонент "Answ.vue")
        goToAncw(id){
            //присваивание значение id к переменной 
            //для дальнейшей работы
            this.removeId=id
            this.isVisibleAnsw = !this.isVisibleAnsw
        },
        
        //удаление поля при подтверждении пользователя
        //val значение ответа пользователя
        removeContact(val){

            this.isVisibleAnsw = !this.isVisibleAnsw

            //удаление из контактов по removeId
            if(val == 1){
                this.contacts.splice(this.removeId,1)
            }
        }
    },
    mounted(){
        //присваивание переменной значению эскпортированного массива
        this.contacts=contacts
    }
}
</script>


<style scoped>
    *{
        color:black;
    }

    .contacts{
        display:grid;
        grid-row-gap: 5px;
    }

    .contact{
        display: flex;
        align-items: center ;
        justify-content: space-between;
        font-size: 1.5em;
        margin: auto;
        width: 40%;
        border: solid 1px black;
        border-radius: 5px;
        transition: width 0.5s cubic-bezier(0, 0, 1, 1) 50ms;
    }

    .contact:hover{
        width: 35%;
    }

    .addCont{
        margin-top:5%;
        width: 40%;
        height: 40px;
        font-size: 1.5em;
    }
</style>