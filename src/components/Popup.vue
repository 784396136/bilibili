<template>
    <div>
        <mu-snackbar :color="$store.state.color.color" :open.sync="$store.state.color.open" style="width:50%;margin:0 auto;">
            <mu-icon left :value="$store.state.color.type"></mu-icon>
            {{$store.state.color.message}}
            <mu-button flat slot="action" color="#fff" @click="$store.state.color.open = false">
                <mu-icon value="close"></mu-icon>
            </mu-button>
        </mu-snackbar>
    </div>
</template>
<script>
export default {
    // 消息提示框
    data(){
        return{
            
        }
    }
}
</script>