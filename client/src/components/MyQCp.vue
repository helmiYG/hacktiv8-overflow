<template>
<div>
    <router-link to="/myquestions/addquestion">
        <button class="btn btn-primary btn-sm btn-addd">Add Question</button>
    </router-link>
    <div class="row">
        <UserQ/> 
    </div>
    
</div>
</template>

<script>
import {mapState} from 'vuex'
import UserQ from '@/components/GetUserQ'
export default {
    components: {
        UserQ
    },
    computed: {
        ...mapState([
            'isLogout'
        ])
    },
    watch: {
        isLogout () {
            this.$router.push('/login')
        }
    }
}
</script>

<style>
.btn-addd{
    margin: 10px
}
</style>
