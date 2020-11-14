<template>

    <!-- Форма для заполнения полей нового контакта 
        перезагрузка страницы отключена -->
    <form @submit.prevent="createContact">
        
        <!-- Ссылка на главную страницу -->
        <router-link to="/" class="back">To Contacts</router-link>
        
        <!-- Поле для ввода номера телефона -->
        <div class="field">
            <h1>Phone number</h1>
            <input type="number" v-model="number" class="number">
        </div>
        
        <!-- Поле для ввода имени -->
        <div class="field">
            <h1>Name</h1>
            <input type="text" v-model="name">
        </div>
        
        <!-- Поле для ввода фамилии -->
        <div class="field">
            <h1>Surname</h1>
            <input type="text" v-model="surname">
        </div>
        
        <!-- Поле для ввода описания -->
        <div class="field">
            <h1>Description</h1>
            <input type="text" v-model="description">
        </div>
        
        <!-- Кнопка для создания -->
        <button class="btn" type="submit">Create</button>
    </form>
</template>


<script>
import contacts from '../JsFiles/contacts.js' // экспорт массива контактов
export default {
    data(){
        return{
            //переменные для сбора информации через v-model
            number:'',
            name:'',
            surname:'',
            description:''
        }
    },
    methods:{
        //создание контакта
        createContact(){
            //проверка полей на то что они не пустые
            if(this.name && this.number
            &&this.surname && this.description){
                //создание объекта контакта для пуша в массив всех контактов
                var newContact={
                    id:Date.now(),//id всегда будет уникальным
                    number:this.number,
                    name:this.name,
                    surname:this.surname,
                    description:this.description
                }

                //добавление контакта в массив
                contacts.push(newContact)

                //сообщение о его успешном добавлении
                alert('Contact created')

            }
            else{
                //сообщение о некорректности полей
                alert('There are invalid fields')
            }

            //очищение переменных , так как они находятся в v-model
            this.name='',this.number='',
            this.surname='',this.description=''
        }
    }
}
</script>


<style scoped>

    input[type='text'],input[type='number'],.btn{
        height: 40px;
        width: 55%  ;
        font-size: 1.5em;
    }

    form{
        width: 40%;
        margin: auto;
        margin-top: 5%;
    }

    .field{
        display: flex;
        justify-content: space-between;
        align-items: center;
        width: 100%;
        border-top: solid 1px black;
        margin-top: 1%;
    }

    .btn{
        width: 100%;
        height: 40px;
        font-size: 1.5em;
    }

    .number{
        -moz-appearance: textfield;
    }
    
    .number::-webkit-inner-spin-button { 
        display: none;
    }
    
</style>