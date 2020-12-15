! function($) {

    var $loutinav = $('#loutinav'); //整个楼梯
    var $louti = $('#loutinav li').not('.gotop'); //获取9个li，排除last
    var $louceng = $('.louceng'); //9个楼层
    //第一步：显示隐藏左侧的楼梯：触发滚轮，根据对应的scrollTop值确定是否显示左侧的楼梯。
    //滚动条top>=400 显示左侧楼梯

    //封装函数
    function scroll() {
        var $scrolltop = $(window).scrollTop(); //获取滚动条的top值
        if ($scrolltop >= 400) {
            $loutinav.show();
        } else {
            $loutinav.hide();
        }
        // $('title').html($scrolltop);
        // 第四步：通过触发滚动条，通过楼层将对应的楼梯添加激活的样式。
        // 如果楼层的top值>滚动条的top值,给楼层对应的楼梯添加激活状态。
        $louceng.each(function(index, element) {
            var $loucengtop = $(element).offset().top; //每一个楼层的top值。
            if ($loucengtop >= $scrolltop) {
                //每次触发滚动条，滚动条的top值都会发生变化。
                $louti.removeClass('active'); //移除前面所有的激活状态
                $louti.eq(index).addClass('active'); //给满足条件的添加状态
                return false; //终止循环
            }
        });

    }
    scroll();


    $(window).on('scroll', function() {
        scroll();
    });

    //第二步：点击左侧的楼梯，楼层运动到对应的位置
    //思路：将每个楼层的top值求出，然后给滚动条的top值
    //document.documentElement.scrollTop = 100;

    $louti.on('click', function() {
        //点击楼梯，会触发滚轮事件，这个时候激活状态一直加载。干掉滚轮事件。
        $(window).off('scroll');
        //求出每个楼层的top值。
        $(this).addClass('active').siblings('li').removeClass('active'); //当前点击的添加类名。
        var $loucengtop = $louceng.eq($(this).index()).offset().top; //每个楼层的top
        $('html').animate({
            scrollTop: $loucengtop //每个楼层的top值求出，然后给滚动条的top值
        }, function() {
            $(window).on('scroll', function() {
                scroll();
            });
        });
    });

    //第三步：回到顶部
    $('.gotop').on('click', function() {
        $('html').animate({
            scrollTop: 0
        });
    });


}(jQuery);