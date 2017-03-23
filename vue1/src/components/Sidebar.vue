
<template>
    <div class="card">
        <div class="card-header" align="center">
            <img src="http://avatar.csdn.net/1/E/E/1_kevin_qq.jpg"
                 class="avatar img-circle img-responsive" />
            <p><strong> 非梦</strong></p>
            <p class="card-title">订阅列表</p>
        </div>
        <div class="card-block">
            <p v-for="(mp, idx) in subscribeList" @mouseover="showRemove(idx)" @mouseout="hideRemove(idx)">
                <small>
                    <a class="nav-link" :href="mp.encGzhUrl" target="_blank">
                        ![](mp.image) {{ mp.mpName }} </a>
                    <a href="javascript:" @click="unsubscribeMp(mp.weixinhao)">
                        <i class="fa fa-lg float-xs-right text-danger sidebar-remove"
                           :class="{'fa-minus-circle': mp.showRemoveBtn}"></i></a></small>
            </p>
        </div>
    </div>
</template>

<script>
    export default {
        name : 'Sidebar',
        data() {
            return { }
        },
        created: function () {
            // 从LocalStorage中取出数据
            return this.$store.dispatch('initFromLS', 'init from LS');
        },
        computed : {
            subscribeList () {
                // 从store中取出数据
                return this.$store.state.subscribeList
            }
        },
        methods : {
            unsubscribeMp(weixinhao) {
                // 删除该公众号
                return this.$store.dispatch('unsubscribeMp',weixinhao);
            },
            showRemove(idx) {
                return this.subscribeList[idx]['showRemoveBtn']= true;
            },
            hideRemove(idx) {
                return this.subscribeList[idx]['showRemoveBtn']= false;
            }        
        },
        created () {
            console.log('sidebar建立....');
        }
    }
</script>