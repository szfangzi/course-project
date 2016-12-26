(function (window){

  Vue.component('art', {
    template:'<article v-for="item in list">'+
    '<div class="title"><h2><div class="name">{{item.name}}</div><div class="author">{{item.author}}</div></h2></div>'+
    '<ul class="msg"><li>September 15th, 2016</li><li><a href="javascript:;">Apps</a> <a href="javascript:;">Personalization</a></li><li><a href="javascript:;">4 Comments</a></li></ul><p>Once upon a time, in the not-so-distant past, people considered websites to be a prime indication of how users’ attention was brief and unforgiving. Remember the dreaded bounce rate?</p><a href="javascript:;" class="imgLink"><img src="../public/img/mobile-banners-preview-opt.png" width="500" height="358" alt="Driving App Engagement With Personalization Techniques"></a><p>Remember the numerous times you worried that your content and graphics might not be 100% clear to users? That was nothing. Compared to mobile, engaging users on the web is a piece of cake.</p><a href="javascript:;" class="moreBtn">Read more...</a></article>',
    props:['list']
  });

  Vue.component('page', {
    template:
    '<div class="pgs clearfix">'+
    '<a href="javascript:;" class="pg" v-on:click="test"  v-for="i in indexs" v-bind:class="{active:i==pageObj.current}">{{i}}</a>'+
    '</div>',
    props:['pageObj'],
    computed: {
      //页码生成
      indexs: function(){
        var arr = [];
        for (var i = 1; i <= this.pageObj.total; i++) {
          arr.push(i);
        }
        return arr;
      }
    }
  });

   var vm = new Vue({
    el:'.list',
    data:{
      list:[],
      pageObj:{}
    }
  });

    $.get('../public/api/page.php', {p:1}, function (data) {
      data = JSON.parse(data);
      vm.list = data.list;
      var obj = {};
      obj.total = data.total;
      obj.current = data.current;
      vm.pageObj = obj;
      $('body').animate({"scrollTop":0}, 500);
    });



}(window));
