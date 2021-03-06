// =>  （转化为虚拟dom）  
// {tag:'div',data:{id:'outer',class:'border'},children:[],value:'I am your father'}
// 01-patchText.html
class VNode {
    /*tag:标签名，
     *value:节点值
     *type:节点类型
     *data:属性组成的对象
     *children:子元素
    */
    constructor(tag, value, type, data) {
        this.tag = tag && tag.toLowerCase();
        this.value = value;
        this.type = type;
        this.data = data;
        this.children = [];
    }
    /*追加子元素--虚拟dom*/
    appendChild(vnode) {
        this.children.push(vnode)
    }
}
//真实dom转化为虚拟dom
function getVNode(node) {
    var _vnode;
    if (node.nodeType == 1) {
        // 1.处理属性,将node.attributes伪数组转为对象
        var attrs = {};
        for (var i = 0, len = node.attributes.length; i < len; i++) {
            var $attr = node.attributes[i];
            attrs[$attr.nodeName] = $attr.nodeValue;
        }
        //元素节点
        _vnode = new VNode(node.nodeName, undefined, node.nodeType, attrs);
        // 2.处理子元素(递归：将子元素转化为虚拟dom，并添加到父元素中)
        for (var j = 0, len = node.childNodes.length; j < len; j++) {
            _vnode.appendChild(getVNode(node.childNodes[j]))
        }
    } else if (node.nodeType == 3) {
        // 文本节点
        _vnode = new VNode(undefined, node.nodeValue, node.nodeType, undefined);
    }
    return _vnode;
}

// 将虚拟dom转化为真实dom
function parseVNode(vnode) {
    var _node;
    if (vnode.type == 1) {
        // 元素节点
        _node = document.createElement(vnode.tag);
        // 1.处理属性
        Object.keys(vnode.data).forEach((attrName) => {
            _node.setAttribute(attrName, vnode.data[attrName]);
        })
        // 2.处理子元素
        Object.keys(vnode.children).forEach((subvnode) => {
            _node.appendChild(parseVNode(vnode.children[subvnode]));
        })
    } else if (vnode.type == 3) {
        // 文本节点
        _node = document.createTextNode(vnode.value);
    }
    return _node;
}