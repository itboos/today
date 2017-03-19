<!-- 假数据全部删除掉
 <template>
    <div class="card">
        <div class="card-header" align="center">
            <form class="form-inline">
                <input class="form-control form-control-lg wide" type="text" placeholder="搜索公众号/文章">
                <i class="fa fa-search btn btn-lg btn-outline-success" @click=""></i>
            </form>
        </div>
        <div class="card-block">
            <div class="media">
                <div class="media-left imgbox">
                    <a class="" href="#">
                        <img class="media-object rounded"
                             src="http://dl.bizhi.sogou.com/images/2014/04/22/587880.jpg">
                    </a></div>
                <div class="media-body">

                    <h4>这个导演的新片，每一部我必二刷</h4>
                    <p class="text-muted" style="margin-bottom: 0px;">
                        11月的时候，鱼叔采访了自己的偶像——蒂姆·波顿。并有机会提前看到了他的新片，然后写了一篇推文。今天电影上映，鱼叔去电影院二刷。这一次，又
                    </p>
                    <p><small class="text-muted s1">
                        <span>    <i class="fa fa-star-o fa-lg float-xs-right text-danger"></i></span>
                        <i class="fa fa-eye"></i> 2348 </small>
                        <small class="text-muted">     独立鱼电影</small>
                        <small class="text-muted s2"> 1小时前</small>
                    </p>
                </div>
            </div>
            <div class="media">
                <div class="media-left imgbox">
                    <a class="" href="#">
                        <img class="media-object rounded "
                             src="http://wx.qlogo.cn/mmhead/Q3auHgzwzM6FDWDyWSNm2AFBwFV6SFMXa20hjbFlWOyGYFQqrryIPw/0">
                    </a></div>
                <div class="media-body">

                    <h4>现在的段子，不动脑子根本就看不懂</h4>
                    <p class="text-muted" style="margin-bottom: 0px;">
                        周末，姑妈让我帮忙表照顾5岁的表弟，晚上我给他洗澡的时候，女票打来电话。因为手不方便拿，就开了免提，她问:在做什么呢？我说...
                    </p>
                    <p><small class="text-muted s1">
                        <span>    <i class="fa fa-star-o fa-lg float-xs-right text-danger"></i></span>
                        <i class="fa fa-eye"></i> 1181 </small>
                        <small class="text-muted s1"> 凤凰网 </small>
                        <small class="text-muted s2"> 3小时前</small>
                    </p>
                </div>
            </div>
        </div>
    </div>
</template>

<style>
    .form-inline .wide {
        width: 80%;
    }
    .imgbox {
        width: 100px;
        height: 120px;
        overflow: hidden;
    }
    .imgbox img{
        max-width: 100px;
        /*max-height: 120px;*/
    }
    .s1 {
        margin-right: 20px;
    }
    .s2 {
        margin-left: 20px;
    }

</style> -->

<template>
    <div class="card">
        <div class="card-header" align="center">
            <form class="form-inline" @submit.prevent>
                <input class="form-control form-control-lg wide" v-model="searchInput" type="text"
                       @keyup.enter="searchMp(1)" placeholder="搜索公众号">
                <button type="button" class="btn btn-outline-success btn-lg" :disabled="searchInput==''"
                        @click="searchMp(1)" ><i class="fa fa-search"></i></button>
            </form>
        </div>
        <div class="card-block" v-if="!isSearching && !searchResultJson">
            <h5 align="center" class="text-muted">输入关键字，搜索公众号</h5>
        </div>
        <div class="card-block" v-if="searchResultJson">
            <h6 align="center" class="text-muted">"{{ searchKey}}" 搜索到{{searchResultJson.totalItems}}条结果，共{{searchResultJson.totalPages}}页</h6>
        </div>
        <div class="card-block">
            <div class="media" v-for="(mp,index) in mpList">
                <div class="media-left imgbox">
                    <a class="" href="#">
                        <img class="media-object rounded " :src="mp.image" style="margin-top: 5px;">
                    </a></div>
                <div class="media-body">
                    <a :href="mp.encGzhUrl" target="_blank" class="nav-link"><h5 v-html="mp.name"></h5></a>
                    <p class="" style="margin-bottom: 0px;"><small> 简介：</small><small v-html="mp.summary"></small></p>
                    <p class="text-muted" style="margin-bottom: 0px;">
                        <a href="javascript:" @click="subscribe(index)">
                            <i class="fa fa-lg float-xs-right"
                               :class="{'fa-star text-danger': mp.isSubscribed, 'fa-star-o text-muted': !mp.isSubscribed,}"></i></a>
                        <small title="粉丝" class="s1"><i class="fa fa-heart-o"></i> {{ mp.rank.fans }} </small>
                        <small title="月平均发表文章" class="s1"><i class="fa fa-file-text-o"></i> {{ mp.rank.pnum }}</small>
                        <small title="平均阅读次数" class="s1"><i class="fa fa-eye"></i> {{ mp.rank.rnum }}</small>
                        <small  title="最近更新" class=" s2"> <i class="fa fa-clock-o"></i> {{ mp.date }} </small></p>
                    <p class="text-muted" style="margin-bottom: 30px;"> <small class="text-muted s1">
                        <a :href="mp.url" target="_blank" class="nav-link">{{ mp.title1}}</a>
                        <span v-html="mp.content"></span> </small> </p>
                </div>
            </div>
        </div>
        <div class="card-block" v-if="isSearching">
            <h5 align="center"><i class="fa fa-spinner fa-spin fa-lg fa-fw"></i> 正在搜索公众号</h5>
        </div>
        <div class="card card-block text-xs-right" v-if="hasNextPage && searchResultJson && !isSearching">
            <h5 class="btn btn-outline-success btn-block" @click="searchMp(page)"> 下一页 ({{page}})
                <i class="fa fa-angle-double-right"></i></h5>
        </div>
        <div class="card card-block text-xs-right" v-if="!hasNextPage && searchResultJson">
            <h5 class="btn btn-outline-success btn-block"> 最后一页了 <i class="fa fa-exclamation-triangle "></i></h5>
        </div>
    </div>
</template>

<style>
    .form-inline .wide {
        width: 80%;
    }
    .imgbox {
        width: 100px;
        height: 140px;
        overflow: hidden;
    }
    .imgbox img{
        max-width: 100px;
        /*max-height: 120px;*/
    }
    .s1 {
        margin-right: 20px;
    }
    .s2 {
        margin-left: 20px;
    }
</style>

<script>
    export default {
        name : 'SearchResult',
        data() {
            return {
                searchKey: '',
                searchInput: '',    // 输入框的值
                searchResultJson: '',
                isSearching: false,
                page: 1,
                hasNextPage: true
            }
        },
        computed : {
            subscribeList() {
                // 从store中取出数据
                return this.$store.state.subscribeList
            },
            mpList() {
                // 从store中取出数据
                return this.$store.state.mpList
            }
        },
        methods:{
            searchMp(pg) {
                this.isSearching = true;
                if (pg==1) {
                    this.searchKey = this.searchInput;
                    this.$store.dispatch('clearSearchResult', 'clear search result');
                    this.page = 1;
                    this.hasNextPage = true
                }
                this.$nextTick(function () { });
                this.$http.jsonp("http://weixin.sogou.com/weixinwap?_rtype=json&ie=utf8",
                    {
                        params: {
                            page: pg,
                            type: 1, //公众号
                            query: this.searchKey
                        },
                        jsonp:'cb'
                    }).then(function(res){
                    this.searchResultJson = JSON.parse(res.bodyText);
                    var mpXmls = this.searchResultJson.items;
                    var i, xmlDoc, mpResult, onePageResults=[];
                    for (i in mpXmls) {
                        mpResult = {};
                        xmlDoc = new DOMParser().parseFromString(mpXmls[i], 'text/xml');
                        mpResult['title'] = xmlDoc.getElementsByTagName("title")[1].childNodes[0].nodeValue;
                        mpResult['name'] = xmlDoc.getElementsByTagName("name")[0].childNodes[0].nodeValue.replace('', '<span class="text-success">').replace('', '</span>');
                        try     {
                            mpResult['summary'] = xmlDoc.getElementsByTagName("summary")[0].childNodes[0].nodeValue.replace('', '<span class="text-success">').replace('', '</span>')
                        }catch (e)  {
                            mpResult['summary'] = '无介绍'
                        }

                        mpResult['encGzhUrl'] = xmlDoc.getElementsByTagName("encGzhUrl")[0].childNodes[0].nodeValue;    // 主页链接
                        try     {
                            mpResult['url'] = xmlDoc.getElementsByTagName("url")[2].childNodes[0].nodeValue;        // 最新更新文章
                            mpResult['title1'] = xmlDoc.getElementsByTagName("title1")[0].childNodes[0].nodeValue;
                        }                        catch (e)  {
                            mpResult['url'] =  '';
                            mpResult['title1'] =  ''
                        }
                        try     {
                            mpResult['content'] = xmlDoc.getElementsByTagName("content")[0].childNodes[0].nodeValue.replace('', '<span class="text-success">').replace('', '</span>');
                        }                        catch (e)  {
                            mpResult['content'] = ''
                        }
                        mpResult['date'] = xmlDoc.getElementsByTagName("date")[1].childNodes[0].nodeValue;
                        mpResult['image'] = xmlDoc.getElementsByTagName("image")[0].childNodes[0].nodeValue;
                        mpResult['weixinhao'] = xmlDoc.getElementsByTagName("weixinhao")[0].childNodes[0].nodeValue;
                        mpResult['openid'] = xmlDoc.getElementsByTagName("id")[0].childNodes[0].nodeValue;
                        var rank = xmlDoc.getElementsByTagName("rank")[0].attributes;
                        mpResult['rank'] = {};
                        mpResult['rank']['fans'] = rank.fans.nodeValue; // 粉丝数
                        mpResult['rank']['rnum'] = rank.rnum.nodeValue; // 月发文 篇
                        mpResult['rank']['pnum'] = rank.pnum.nodeValue; // 平均阅读
                        mpResult['isSubscribed'] = false;
                        for(let item of this.subscribeList) {
                            if(item.weixinhao == mpResult['weixinhao'] ) {
                                mpResult['isSubscribed'] = true;
                                break
                            }
                        }
                        onePageResults.push(mpResult);
                    }
                    this.$store.dispatch('addSearchResultList', onePageResults);
                    this.searchInput = '';
                    this.page = this.page+1;
                    if (this.page > this.searchResultJson.totalPages) {
                        this.hasNextPage = false;
                    }
                    this.isSearching = false;
                },function(){
                    this.isSearching = false;
                    alert('Sorry, 网络似乎有问题')
                });
            },
            subscribe(idx) {
                if (this.mpList[idx].isSubscribed== true ) {
                    // 删除该公众号
                    return this.$store.dispatch('unsubSearchResult',this.mpList[idx].weixinhao);
                }
            // 如果Mp添加了新的属性，在这里增加
                var mp = {
                    mpName : this.mpList[idx].title,
                    image : this.mpList[idx].image,
                    date : this.mpList[idx].date,   // 最近更新
                    weixinhao : this.mpList[idx].weixinhao,
                    encGzhUrl : this.mpList[idx].encGzhUrl,
                    openid : this.mpList[idx].openid,
                    subscribeDate : new Date().getTime(),
                    showRemoveBtn: false
                };
                for(let item of this.subscribeList) {
                    // 如果已经订阅，则什么也不做
                    if(item.mpName == mp.mpName) return false
                }
                this.$store.dispatch('subscribeMp', mp);
              //  this.mpList[idx].isSubscribed = true;
            }
        }
    }
</script>