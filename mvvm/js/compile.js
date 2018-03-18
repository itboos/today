/* 
    compile 类主要解析模板指令， 将模板中的变量替换成数据, 然后初始化渲染页面
    并将每个指令对应的节点绑定更新函数，添加监听数据的订阅者，一旦数据有变动，收到通知，更新视图
*/
function Compile(el, vm) {
    this.$vm = vm;
    this.$el = this.isElementNode(el) ? el : document.querySelector(el);

    if (this.$el) {
        this.$fragment = this.node2Fragment(this.$el);
        this.init();
        this.$el.appendChild(this.$fragment);
    }
}

Compile.prototype = {
    //创建文档碎片
    node2Fragment: function(el) {
        var fragment = document.createDocumentFragment(),
            child;

        // 将原生节点转移到fragment
        /*
            这里有个问题是: 父元素 this.$el 有一些子元素了， 这里创建了文档碎片， 最后又添加回去了父元素， 父元素为什么没有出现两套一样的子元素呢？
            通过断点调试和MDN 发现， 当父元素的子元素被填加到其它节点时(不管是现有的Node 还是 DocumentFragment)， 都会移动当前的子元素
            也就是说， 通过appendChild(anode), 这种形式的添加， 实际上时把 anode 从原来的节点移除, 然后再添加到新的节点上的， 也就是说
            一个被appendChild的那个节点，不能同时存在文档中的两个地方;
            即: 在编译的过程中， ragment.appendChild（）
            是一个个把父元素的子节点移除到了文档碎片节点中， 数据编译完成后， 再把整个文档碎片节点添加到父节点当中，
            这就是我们看的现象： 父元素中还是只有一份之前的那些子元素，而不是两份。
            参看文档: 
            1.https://developer.mozilla.org/en-US/docs/Web/API/Node/appendChild
            2. https://developer.mozilla.org/en-US/docs/Web/API/DocumentFragment
        */
        while (child = el.firstChild) {
            fragment.appendChild(child);
        }

        return fragment;
    },

    init: function() {
        this.compileElement(this.$fragment);
    },
    // 编译元素
    compileElement: function(el) {
        var childNodes = el.childNodes,
            me = this;

        [].slice.call(childNodes).forEach(function(node) {
            var text = node.textContent;
            var reg = /\{\{(.*)\}\}/;

            if (me.isElementNode(node)) {
                me.compile(node);

            } else if (me.isTextNode(node) && reg.test(text)) {
                // 对文字内容进行正则匹配:  如果像这种 - {{这里里面的文字}} 就可以被上面的正则匹配到
                // RegExp.$1 这个就能拿到上一次正则匹配到的那些文字: 这里里面的文字
                // RegExp.$1是RegExp的一个属性,指的是与正则表达式匹配的第一个 子匹配(以括号为标志)字符串,类推，RegExp.$2，RegExp.$3，..RegExp.$99总共可以有99个匹配
                me.compileText(node, RegExp.$1);
            }
            // 遍历编译子节点
            if (node.childNodes && node.childNodes.length) {
                me.compileElement(node);
            }
        });
    },

    compile: function(node) {
        // 获取元素节点的属性键值对: NamedNodeMap[]
        var nodeAttrs = node.attributes,
            me = this;

        [].slice.call(nodeAttrs).forEach(function(attr) {
            var attrName = attr.name;
            if (me.isDirective(attrName)) {
                var exp = attr.value;
                // 从第二位开始截取字符串
                var dir = attrName.substring(2); // text || on:click || ...
                // 事件指令
                if (me.isEventDirective(dir)) {
                     // 事件指令, 如 v-on:click
                    compileUtil.eventHandler(node, me.$vm, exp, dir);
                    // 普通指令
                } else {
                    compileUtil[dir] && compileUtil[dir](node, me.$vm, exp);
                }

                node.removeAttribute(attrName);
            }
        });
    },

    compileText: function(node, exp) {
        compileUtil.text(node, this.$vm, exp);
    },

    isDirective: function(attr) {
        return attr.indexOf('v-') == 0;
    },

    isEventDirective: function(dir) {
        // 事件指令, 如 v-on:click
        return dir.indexOf('on') === 0;
    },

    isElementNode: function(node) {
        return node.nodeType == 1;
    },

    isTextNode: function(node) {
        return node.nodeType == 3;
    }
};

// 指令处理集合
var compileUtil = {
    text: function(node, vm, exp) {
        // fun.bind(thisArg[, arg1[, arg2[, ...]]]) 当绑定函数被调用时，该参数会作为原函数运行时的 this 指向
        this.bind(node, vm, exp, 'text');
    },

    html: function(node, vm, exp) {
        this.bind(node, vm, exp, 'html');
    },
    // 处理v-model指令:
    model: function(node, vm, exp) {
        this.bind(node, vm, exp, 'model');

        var me = this,
            val = this._getVMVal(vm, exp);
        node.addEventListener('input', function(e) {
            var newValue = e.target.value;
            if (val === newValue) {
                return;
            }

            me._setVMVal(vm, exp, newValue);
            val = newValue;
        });
    },

    class: function(node, vm, exp) {
        this.bind(node, vm, exp, 'class');
    },

    bind: function(node, vm, exp, dir) {
        var updaterFn = updater[dir + 'Updater'];

        updaterFn && updaterFn(node, this._getVMVal(vm, exp));

        new Watcher(vm, exp, function(value, oldValue) {
            updaterFn && updaterFn(node, value, oldValue);
        });
    },

    // 事件处理
    eventHandler: function(node, vm, exp, dir) {
        var eventType = dir.split(':')[1],
            // 去vm实例里的事件方法，如果有的话
            fn = vm.$options.methods && vm.$options.methods[exp];

        if (eventType && fn) {
            node.addEventListener(eventType, fn.bind(vm), false);
        }
    },
   // ? 这里有点绕
    _getVMVal: function(vm, exp) {
        var val = vm;
        exp = exp.split('.');
        exp.forEach(function(k) {
            val = val[k];
        });
        return val;
    },
    // ? 这里有点绕
    _setVMVal: function(vm, exp, value) {
        var val = vm;
        exp = exp.split('.');
        exp.forEach(function(k, i) {
            // 非最后一个key，更新val的值
            if (i < exp.length - 1) {
                val = val[k];
            } else {
                val[k] = value;
            }
        });
    }
};


var updater = {
    textUpdater: function(node, value) {
        node.textContent = typeof value == 'undefined' ? '' : value;
    },

    htmlUpdater: function(node, value) {
        node.innerHTML = typeof value == 'undefined' ? '' : value;
    },

    classUpdater: function(node, value, oldValue) {
        var className = node.className;
        className = className.replace(oldValue, '').replace(/\s$/, '');

        var space = className && String(value) ? ' ' : '';

        node.className = className + space + value;
    },
    // 待看
    modelUpdater: function(node, value, oldValue) {
        node.value = typeof value == 'undefined' ? '' : value;
    }
};