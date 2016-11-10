(function (window){

  var searchBtn = document.querySelector('.searchBtn');
  var searchBox = document.querySelector('.searchBox');
  var menuBtn = document.querySelector('.menuBtn');
  var nav = document.querySelector('header nav');
  var toTopBtn = document.querySelector('.toTopBtn');
  var loginOpenBtn = document.querySelector('.login-open');
  var maskWrapper = document.querySelector('.maskWrapper');
  var closeBtn = maskWrapper.querySelector('.close');

  searchBtn.addEventListener('click', function (e) {

    if(menuBtn.classList.contains('active')){
      menuBtn.click();
    }
    this.classList.toggle('active');
    searchBox.classList.toggle('hide');
    if(searchBtn.classList.contains('active')){
      searchBox.querySelector('input').focus();
    }
  });
  menuBtn.addEventListener('click', function (e) {
    if(searchBtn.classList.contains('active')){
      searchBtn.click();
    }
    this.classList.toggle('active');
    nav.classList.toggle('hide');
  });

  toTopBtn.addEventListener('click', function (e) {
    $('body').animate({"scrollTop":0}, 500);
  });

  $.get('../public/json/page1.json', function (data) {
    var html = '';
    for (var i = 0; i < data.list.length; i++) {
      html += '<article>\
          <div class="title">\
          <h2>\
          <div class="name">'+
        data.list[i].name
        +'</div>\
      <div class="author">'+
        data.list[i].author
        +'</div>\
      </h2>\
      </div>\
      <ul class="msg">\
          <li>September 15th, 2016</li>\
      <li><a href="javascript:;">Apps</a> <a href="javascript:;">Personalization</a></li>\
      <li><a href="javascript:;">4 Comments</a></li>\
      </ul>\
      <p>Once upon a time, in the not-so-distant past, people considered websites to be a prime indication of how\
      users’ attention was brief and unforgiving. Remember the dreaded bounce rate?</p>\
       <a href="javascript:;" class="imgLink"><img src="img/mobile-banners-preview-opt.png" width="500" height="358" alt="Driving App Engagement With Personalization Techniques"></a>\
          <p>Remember the numerous times you worried that your content and graphics might not be 100% clear to users?\
          That was nothing. Compared to mobile, engaging users on the web is a piece of cake.</p>\
      <a href="javascript:;" class="moreBtn">Read more...</a>\
      </article>';
    }
    $('.article-list').html(html);
    //
    var tmpl = $('#page-tmpl').html();
    var html = ejs.render(tmpl, {data:data});
    $('.page').html(html);

  });

  //分页
  var current = 1;
  $('.list .page').on('click', '.pg', function () {
    var $this = $(this);
    var num = $this.html();
    current = parseInt(num);
    $.get('../public/json/page'+num+'.json', function (data) {
      var list = data.list;
      var tmpl = $('#article-tmpl').html();
      var html = ejs.render(tmpl, {list:list});
      $('.article-list').html(html);
      $('body').animate({"scrollTop":0}, 500);

      var tmpl = $('#page-tmpl').html();
      var html = ejs.render(tmpl, {data: data});
      $('.page').html(html);
    });

  }).on('click', '.prev a', function () {
    current = current-1;
    $.get('../public/json/page'+current+'.json', function (data) {
      var list = data.list;
      var tmpl = $('#article-tmpl').html();
      var html = ejs.render(tmpl, {list:list});
      $('.article-list').html(html);
      $('body').animate({"scrollTop":0}, 500);

      var tmpl = $('#page-tmpl').html();
      var html = ejs.render(tmpl, {data: data});
      $('.page').html(html);
    });

  }).on('click', '.next a', function () {
    current = current+1;
    $.get('../public/json/page'+current+'.json', function (data) {
      var list = data.list;
      var tmpl = $('#article-tmpl').html();
      var html = ejs.render(tmpl, {list:list});
      $('.article-list').html(html);
      $('body').animate({"scrollTop":0}, 500);

      var tmpl = $('#page-tmpl').html();
      var html = ejs.render(tmpl, {data: data});
      $('.page').html(html);
    });
  });

  //搜索
  $('.searchInputBox .searchBtn').click(function () {
    var list = [];
    var txt = $('aside .searchInputBox input[type=text]').val();
    $.get('../public/json/list.json', function (data) {
      for (var k in data) {
        if(data[k].name.indexOf(txt) != -1){
          list.push(data[k]);
        }
      }
      var tmpl = $('#article-tmpl').html();
      var html = ejs.render(tmpl, {list: list});
      $('.article-list').html(html);
      $('.page').html('');
    });

  });


  //弹窗
  var loginPopup = $('#popup-wrapper').modal({
    width:800,
    height:400,
    openCallBack:function(){
      location.hash = 'login';
    },
    closeCallBack:function(){
      location.hash = '';
    }
  });

  loginOpenBtn.addEventListener('click', function (e) {
    loginPopup.open();
  });


  //hashchange模拟路由保存弹窗登录状态
  if(location.hash == "#login" && localStorage){
    loginPopup.open();
  }

  $('.ctrl .btn-login').click(function (e) {
    var username = $('#username').val();
    var password = $('#password').val();
    $.get('../public/json/user.json', function (data) {
      var flag = false;
      for(var k in data) {
        if(data[k].name == username && data[k].pass == password){
          flag = true;
          localStorage.user = data[k].name;
        }
      }

      if(flag){
        alert('登录成功！');
        $('.user-float').addClass('on');
        loginPopup.close();
      }else{
        alert('账号密码错误！');
      }

    });

  });

  $('.btn-esc').click(function (e) {
    localStorage.removeItem('user');
    $('.user-float').removeClass('on');
    alert('已退出！');
  });

  if(localStorage.user){
    $('.user-float').addClass('on');
  }else{
    $('.user-float').removeClass('on');
  }


}(window));
