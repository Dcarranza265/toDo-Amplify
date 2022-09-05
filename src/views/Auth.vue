<template>
    <amplify-authenticator></amplify-authenticator>
</template>

<script>
    import {AmplifyEventBus} from "aws-amplify-vue";
    import {Auth} from "aws-amplify"
    export default{
        name: 'AuthView',
        async mounted(){
            AmplifyEventBus.$on("authState", eventInfo =>{
                if(eventInfo === "signedIn"){
                    this.$router.push({name: 'Home'})
                }else if (eventInfo === "signedOut"){
                    this.$router.push({name: 'Auth'})
                }
            })

            try{
                await Auth.currentAuthenticatedUser()
                this.$router.push({ name: 'Home'})

            }catch(error){
                this.$router.push({ name: 'Auth'})
            }
        }
    }
</script>