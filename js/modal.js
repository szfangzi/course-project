//jquery弹窗插件封装
$.fn.modal = function (options) {
    var self = this;

    self.defaults = {
        width:600,
        height:300,
        title:'标题'
        //tmpl:$('#tmpl')
    };

    self.$popupBox = self.find('.popup-box');
    self.$popupTitle = self.find('.popup-title');

    self.init = function () {
        self.options = $.extend({}, self.defaults, options);
        self.initStyle();
        self.bindEvent();
        return self;
    };

    self.initStyle = function () {
        self.$popupBox.css({width:self.options.width, height:self.options.height, left:-self.options.width/2, top:-self.options.height/2});
        self.$popupTitle.html(self.options.title);
    };

    self.bindEvent = function () {
        self.find('h2 .close').click(function () {
            self.close();
        });
    };

    self.open = function () {
        self.show();
        self.options.openCallBack();
    };

    self.close = function () {
        self.hide();
        self.options.closeCallBack();
    };

    return self.init();
};