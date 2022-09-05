<template>
    <div class="container mt-5 py-3 bg-dark principal">
        <h3 class="text-center text-light">To-Do App (Solo con Vue)</h3>
        <form>
            <input v-model="task" @keydown.enter.prevent="addTask" type="text" placeholder="Ingrese tarea" class="form-control my-2">
            <button class="btn btn-block btn-primary" @click.prevent="addTask" type="submit">Agregar</button>
        </form>
        <div class="mt-3">         
            <div class="alert alert-warning d-flex justify-content-between align-items-center" v-for="(task,index) in tasks" :key="index">
                <p class="m-0"><span :class="{'completed' : task.estado == true}">{{task.text}}</span></p> 
                <h3 class="m-0">                
                    <b-icon icon="check-circle-fill" @click="cambiarEstado(index)" class="text-success mx-2" role="button"></b-icon>
                    <b-icon icon="trash-fill" @click="deleteTask(index)" class="text-danger"  role="button"></b-icon>
                </h3>
            </div>                     
                   
        </div>                        
    </div>
</template>

<script>
    export default{
        name: 'ToDoTasks',
        data(){
            return{
                task :'',
                tasks: [
                    {
                        text: "Pasar la prueba",
                        estado: false
                    },
                    {
                        text: "Correr",
                        estado: false
                    }

                ]
            }
        },
        methods:{
            addTask(){
                if(this.task.length === 0) {
                    return alert('Tarea en blanco')
                }
                this.tasks.push({
                    text: this.task,
                    estado: false
                })
                this.task = ''
            },
            deleteTask(index){
                this.tasks.splice(index,1)
            },
            cambiarEstado(index){
                if(this.tasks[index].estado == false){                    
                    this.tasks[index].estado = true                     
                }else{
                    this.tasks[index].estado = false
                }                
            }
        }
    }

</script>

<style scoped>
    .completed{
        text-decoration: line-through ;
    }
    .principal{
    max-width: 47rem !important;
    border-radius: 5px;
}
</style>