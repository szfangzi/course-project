var treeData = [];
$.ajax({
    url:'../public/json/navlist.json',
    method:'GET',
    async:false,
    success: function (data) {
        treeData = Util.nodeRecursion(data, "0");
    }
});

Vue.component('treeview', {
    name:'treeview',
    template:'<div v-for="item in data" class="node">' +
    '<template v-if="item.childs">' +
    '<span v-on:click="nodeToggle($index)">' +
    '<b v-show="item.expand">-</b><b v-else>+</b>' +
    '{{item.name}}</span>' +
    '</template>'+
    '<template v-else>'+
    '<span>*{{item.name}}</span>' +
    '</template>'+
    '<div class="node-list" v-bind:class="{show:item.expand}">'+
    '<treeview v-if="item.childs" v-bind:data="item.childs"></treeview>' +
    '</div>'+
    '</div>',
    props:['data'],
    methods:{
        nodeToggle: function (index) {
            this.data[index].expand = !this.data[index].expand;
        }
    }

});

var vm = new Vue({
    el:'#tree-view',
    data:{
        treeData:treeData
    }
});
