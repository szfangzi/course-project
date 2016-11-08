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
    '<b v-show="item.expand">-</b><b v-else>+</b>' +
    '</template>'+
    '<span>{{item.name}}</span>' +
    '<treeview v-if="item.childs" v-bind:data="item.childs" ></treeview>' +
    '</div>',
    props:['data']

});

var vm = new Vue({
    el:'#tree-view',
    data:{
        treeData:treeData
    },
    methods:{
        open: function (index) {

        },
        close: function (index) {

        }
    }
});
