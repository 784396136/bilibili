<template>
    <div>
        <wv-swipe :height="height" :auto="4000">
            <wv-swipe-item class="slide">
                <img height="100%" src="../assets/image/5cb4de262cf1f44821802aac563767abbce4cf5f.jpg" alt="">
            </wv-swipe-item>
            <wv-swipe-item class="slide">
                <img height="100%" src="../assets/image/c3ed762be448f65e7dba71053a3ec10e46f8c0df.jpg" alt="">
            </wv-swipe-item>
            <wv-swipe-item class="slide">
                <img height="100%" src="../assets/image/2893fc81cec478b15b866ad530d39019b116633b.jpg" alt="">
            </wv-swipe-item>
        </wv-swipe>
        <wv-cell class="button" title="马上进入" is-link to="/register"></wv-cell>
            
    </div>
</template>
<script>
export default {
    data(){
        return {
            height:'',
        }
    },
    created() { 
        this.height = document.documentElement.scrollHeight;
    },
}
</script>
<style scopend>
    .header {
        background-color: rgba(33, 117, 226, 0.8) !important;
    }
    .slide {
        overflow: hidden;
    }

    .button {
        color: #fff;
        box-sizing: border-box;
        text-align: center;
        border-top: none;
        padding: 0 30px;
        line-height: 50px;
        width: 80% !important;
        height: 50px;
        margin: 0 10%;
        position: fixed;
        bottom: 30px;
        border-radius: 23px;
        background-color: #253a74;
        letter-spacing: 5px;
    }
    .button:active {
        background-color: #323f63;
    }
    .button::before {
        border-top: none;
    }
</style>