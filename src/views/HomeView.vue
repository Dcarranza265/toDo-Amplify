<template>
  <div class="container">
    <h1 class="text-center">To-Do App</h1>
        <form>
            <input v-model="newActivity" @keydown.enter.prevent="addActivity" type="text" placeholder="Ingrese tarea" class="form-control my-2">
            <button class="btn btn-block btn-primary" @click.prevent="addActivity" type="submit">Agregar</button>
        </form>
        <div class="mt-3">          
          <b-list-group>
            <b-list-group-item v-for="(item, index) in listActivities" :key="index">
              <p class="m-0">{{item.tarea}}</p> 
              <h3 class="m-0">                
                  <b-icon icon="check-circle-fill" class="text-success" role="button"></b-icon>
                  <b-icon icon="dash-circle-fill" class="text-danger"  role="button"></b-icon>
              </h3>
            </b-list-group-item>
          </b-list-group>
          
        </div> 
        <to-do-tasks></to-do-tasks>       
  </div>
  

  


</template>
<script>
import ToDoTasks from '../components/ToDoTasks.vue'
import {Auth, API, graphqlOperation } from 'aws-amplify';
import * as queries from "../graphql/queries"  
import * as mutations from "../graphql/mutations"  
import * as subscriptions from "../graphql/subscriptions"  

export default {
  name: 'HomeView',
  data(){
    return{
      listActivities: [],
      newActivity: ""
    }
  },
  components:{
    ToDoTasks
  },
  async mounted(){
    const currentUser = await Auth.currentAuthenticatedUser();
    const that = this
    API.graphql(graphqlOperation(subscriptions.onCreateTodo,{owner: currentUser.username})
    ).subscribe({next: action =>{
      that.listActivities.push(action.value.data.onCreateTodo)
    }});
  },
  async created(){
    const {data} = await API.graphql(graphqlOperation(queries.listTodos))
    data.listActivities.listTodos.items.forEach(item => {
      this.listActivities.push(item)

    })
  },
  methods: {
    async addActivity(){
      await API.graphql(graphqlOperation(mutations.createTodo, {
        input: {tarea: this.newActivity}
      }))
    }

  }
}
</script>


