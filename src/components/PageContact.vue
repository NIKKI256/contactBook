<template>
    <div>
        <!-- Ссылка на главную страницу -->
        <router-link to="/" class="back">To Contacts</router-link>

        <!-- Заголовок страницы -->
        <h1 class="title">Сontact information</h1>

        <!-- Блок для внесения изменений в поля
        виден при определенном условии -->
        <div class="edit_fields" v-if="isVisibleEdit">

            <!-- Поле для введения новых значений -->
            <input type="text" v-model="editValue">

            <!-- Кнопка сохранения изменений -->
            <button @click="changeFields(editValue)">Save</button>

        </div>

        <!-- Блок содержащий в себе:
            1. Информацию о контакте
            2. Поля для добавления доп.информации(только на англ) 
            3. Кнопка добавления новых полей -->
        <div class="information"  v-if="!isVisibleAnsw">

            <!-- Информация о контакте -->
            <!-- k-ключ для полей -->
            <!-- value-значения из ключей -->
            <h2 class="blockOfInfo"
                v-for="(value,k) in contact" :key="k.id">{{k}} - {{value}}
                
                <!-- Кнопка удаления исключена для поля id , так как это обязательное поле
                    При удалении идет запрос на подтверждение 
                    k-ключ от поля которое мы хотим удалить -->
                <button @click="goToAncw(k)" class="changebtn" v-if="k != 'id'">&times;</button>

                <!-- Кнопка редактирования
                    идет запрос на функцию(функция описана ниже)
                    k-ключ от поля которое мы редактируем 
                    value-значение от поля которое мы редактируем -->
                <button @click="editFields(k,value)" class="changebtn">Edit</button>

                <!-- Отмена (Шаг назад)
                    идет запрос на функцию(функция описана ниже)
                    k-ключ от поля к которому мы обращаемся -->
                <button @click="back(k)" class="changebtn">Back</button>

            </h2>

            <!-- Поля для добавления новой информации -->
            <div class="fields">

                <!-- Ввод для названия-->
                <input type="text" @keypress="checkLet" v-model="addKey" placeholder="For Title">

                <!-- Ввод для значения -->
                <input type="text" @keypress="checkLet" v-model="addValue" placeholder="For Value">

            </div>

                <!-- Кнопка сохранения новых полей -->
                <button class="addbtn" @click="addField()">Add Field</button>

        </div>

        <!-- Компонент для подтверждения действия "удаление поля"
            виден при определенном условии -->
        <Answ v-if="isVisibleAnsw"
            @send-del="delField"
        />

    </div>
</template>


<script>

import Answ from './Answ'//компонент подтверждения действий пользователя
import contacts from '../JsFiles/contacts' // экспорт массива контактов

export default {
    data(){
        //переменные отсортированы вручную
        //сверху вниз : arr , null , str , bool
        return{
            stepBack:[], // массив для записи предыдущего состояния поля(для функции "Шаг назад")

            contact:null, // главная переменная для управления всеми полями
            removeField:null,// переменная для удаления поля

            editKey:'',// переменная для редактирования поля (ключ)
            editValue:'',// переменная для редактирования поля(значение)
            addKey:'',// переменная для добавления поля (ключ)
            addValue:'',// переменная для добавления поля (значение)

            isVisibleAnsw:false,// условие видимости компонента "Подтверждение"
            isVisibleEdit:false // условие видимости блока "Редактирование полей"
        }
    },
    components:{
        Answ // регистрация компонента "Подтверждение"
    },
    methods:{

        //функция запрашивающая подтверждение для удаления
        //(для точного понимания загляните в компонент "Answ.vue")
        goToAncw(k){
            //присваивание значение ключа к переменной 
            //для дальнейшей работы
            this.removeField=k;
            
            this.isVisibleAnsw = !this.isVisibleAnsw;
        },

        //удаление поля при подтверждении пользователя
        //k значение ответа пользователя
        delField(k){
            this.isVisibleAnsw = !this.isVisibleAnsw;

            //удаление происходит по ключу взятого с предыдущей функции
            if(k == 1){
                this.$delete(this.contact,this.removeField);
            }
        },

        //добавление поля
        addField(){
            //k - ключ, v - значение сделаны для лучшей читабельности
            let k = this.addKey;
            let v = this.addValue;

            //добавление полей в контакт
            if(k && v){
                this.$set(this.contact,k,v);
            }
            else{
                alert('invalid fields')
            }

            //очищение переменных , так как они находятся в v-model
            this.addKey='',this.addValue='';
        },

        //проверка на введение только английских букв
        //используется в создании новых полей для поля с ключом 
        checkLet(evt) {
            
            //регулярное выражение
            var regex = new RegExp("^[a-zA-Z ]+$");

            //далее проверка происходит посимвольно
            
            var key = String.fromCharCode(!evt.charCode ? evt.which : evt.charCode);

            if (!regex.test(key)) {
                event.preventDefault();
                return false;
            }
        },

        //редактирование полей
        editFields(k,v){
            //предварительное сохранение состояния поля 
            //для "Шаг назад"
            //если объект с таким ключом уже есть - он удаляется
            for(let i = 0; i < this.stepBack.length; i++){
                if(this.stepBack[i].k=k){
                    this.stepBack.splice(k,1);
                }
            }
            
            //создание объекта
            var obj = {k,v};

            //добавление объекта в stepBack
            this.stepBack.push(obj);

            //включение видимости для полей
            this.isVisibleEdit = true;

            //переменные для дальнейшей работы
            this.editValue = v;
            this.editKey = k;
        },

        //сохранение изменений в полях
        //v - новое значение для ключа
        changeFields(v){
            
            //выключение видимости для полей
            this.isVisibleEdit = false;
            
            //задаем новые значения
            this.$set(this.contact,this.editKey,v);
        },

        //"Шаг назад"
        //k - ключ по которому мы ищем объект в stepBack
        back(k){
            //переменная для поиска
            let backKey = k;

            //создание нового объекта 
            //результатом поиска по нашей переменной в массиве объектов stepBack
            let objBack = this.stepBack.find(some => some.k === backKey);

            //вытягиваем старое значение из нашего объекта objBack
            let oldVal = objBack.v;

            //задаем старое значение 
            this.$set(this.contact,k,oldVal);
        }
    },

    created(){
        //сбор информации для нашего контакта 
        //из массива контактов
        //методом передачи route.params 
        const contact = contacts.find(contact => contact.id == this.$route.params.id);

        if(contact){
            this.contact=contact;
        }
    }
}
</script>


<style>
    *{
        color:black
    }

    .back{
        font-size: 1.5em;
        font-weight: 600;
        transition: font-size 0.5s cubic-bezier(0, 0, 1, 1) 50ms;
    }

    .back:hover{
        font-size: 1.7em;
    }

    .title{
        margin: auto;
        margin-top: 2%;
        margin-bottom: 2%;
        width: 40%;
        border:solid 2px rgb(194, 186, 186);
        border-radius: 5px;
    }

    .information{
        border:solid 2px rgb(194, 186, 186);
        border-radius: 5px;
        width: 40%;
        margin: auto;
    }

    .blockOfInfo{
        border-bottom:solid 2px rgb(109, 106, 106);
        display: flex;
        justify-content: center;
        align-items: center;
    }

    .fields{
        display: flex;
        justify-content: space-around;
    }

    .addbtn{
        margin-top: 5%;
    }

    .changebtn{
        margin-left: 2%;
    }

    /*///////////////////////////////////*/
    .edit_fields{
        width: 40%;
        margin: auto;
        display: flex;
        justify-content: space-around;
        margin-bottom: 2%;
    }
</style>