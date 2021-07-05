数据驱动

前提:

1. 你一定得用过 vue
2. 如果没有使用过的 可以去 官网 去看一看 使用教程


# Vue 与模板

使用步骤:

1. 编写 页面 模板
   1. 直接在 HTML 标签中写 标签
   2. 使用 template
   3. 使用 单文件 ( <template /> )
2. 创建 Vue 的实例
   1. 在 Vue 的构造函数中提供: data, methods, computed, watcher, props, ...
3. 将 Vue 挂载到 页面中 ( mount )

# 数据驱动模型

Vue 的执行流程

1. 获得模板: 模板中有 "坑"
2. 利用 Vue 构造函数中所提供的数据来 "填坑", 得到可以在页面中显示的 "标签了"
3. 将标签替换页面中原来有坑的标签

Vue 利用 我们提供的数据 和 页面中 模板 生成了 一个新的 HTML 标签 ( node 元素 ),
替换到了 页面中 放置模板的位置.


我们该怎么实现???


# 简单的模板渲染



# 虚拟 DOM

目标:

1. 怎么将真正的 DOM 转换为 虚拟 DOM：
深度遍历真正的dom，凡是看到节点，转化为虚拟dom
2. 怎么将虚拟 DOM 转换为 真正的 DOM
深度遍历虚拟dom,凡是看到节点，通过createElement()或者createTextNode()，转化为真正dom
思路与深拷贝类似
虚拟dom:所有的操作在内存中，当虚拟dom的操作完成之后，只需要更新一次页面就可以了。

09在内存中描述标签，这样的dom即为虚拟dom。

