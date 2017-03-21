<!-- <template>
    <div class="card">
        <div class="card-header" align="center">
            <img src="http://avatar.csdn.net/1/E/E/1_kevin_qq.jpg"
                 class="avatar img-circle img-responsive" />
            <p><strong> 非梦</strong></p>
            <p class="card-title">1天前 阅读</p>
        </div>
        <div class="card-block">
            <p>
                <img src="http://wx.qlogo.cn/mmhead/Q3auHgzwzM6FDWDyWSNm2AFBwFV6SFMXa20hjbFlWOyGYFQqrryIPw/0"
                     class="mpavatar img-circle img-responsive" />
                <span class="tag tag-danger tag-pill float-xs-right">12</span>
                创意科技生活
            </p>
            <p>
                <img src="http://wx.qlogo.cn/mmhead/Q3auHgzwzM5VP8rbv4fBibDLRoibcezeC7aMx2qs4hfUWtw8Cp6PDZ7Q/0"
                     class="mpavatar img-circle img-responsive" />
                <span class="tag tag-danger tag-pill float-xs-right">3</span>
                科技每日推送
            </p>
        </div>
    </div>
</template>

<style>
    .avatar {
        height: 75px;
        margin: 0 auto;
        margin-top: 10px;
        margin-bottom: 10px;
    }
    .mpavatar {
        height: 30px;
        margin: 0 auto;
        margin-top: 2px;
        margin-bottom: 2px;
    }
    .img-circle {
        border-radius: 50%;
    }
</style> -->

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