// /src/store/mutations.js
import * as types from './mutation-types'

export default {
     // 在搜索列表中，订阅某公众号
    [types.SUBSCRIBE_MP] (state, mp) {
        state.subscribeList.push(mp);
        for(let item of state.mpList) {
            if(item.weixinhao == mp.weixinhao) {
                var idx = state.mpList.indexOf(item);
                state.mpList[idx].isSubscribed = true;
                break;
            }
        }
    },
    // 在Sidebar中，取消某公众号订阅
    [types.UNSUBSCRIBE_MP] (state, weixinhao) {
        for(let item of state.mpList) {
            if(item.weixinhao == weixinhao) {
                var idx = state.mpList.indexOf(item);
                state.mpList[idx].isSubscribed = false;
                break;
            }
        }
        for(let item of state.subscribeList) {
            if(item.weixinhao == weixinhao) {
                var idx = state.subscribeList.indexOf(item);
                console.log('unscrib:'+idx);
                break;
            }
        }
        state.subscribeList.splice(idx, 1);
    },
    // 搜索列表更新
    [types.ADD_SEARCHRESULT_LIST] (state, mps) {
        state.mpList = state.mpList.concat(mps);
    },
    // 在搜索列表中，取消某公众号订阅
    [types.UNSUBSCRIBE_SEARCHRESULT] (state, weixinhao) {
        for(let item of state.mpList) {
            if(item.weixinhao == weixinhao) {
                var idx = state.mpList.indexOf(item);
                state.mpList[idx].isSubscribed = false;
                break;
            }
        }
        for(let item of state.subscribeList) {
            if(item.weixinhao == weixinhao) {
                var idx = state.subscribeList.indexOf(item);
                console.log('unscrib:'+idx);
                break;
            }
        }
        state.subscribeList.splice(idx, 1);
    },
    // 清空搜索列表
    [types.CLEAR_SEARCHRESULT] (state, info) {
        console.log('clear search result:' + info);
        state.mpList = [];
    },
    //从LocalStorage 初始化订阅列表
    [types.INIT_FROM_LS] (state, info) {
        console.log(info + window.localStorage.getItem("subscribeList"));
        if (window.localStorage.getItem("subscribeList")) {
          state.subscribeList = JSON.parse(window.localStorage.getItem("subscribeList")) ;
        }
        else{
            state.subscribeList = [];
        } 
    }
};
