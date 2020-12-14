! function($){
    const $slide = $('.slide');
    const $ulist = $('.slide ul'); //运动的盒子
    const $piclist = $('.slide ul li'); //3个图片
    const $btnlist = $('.slide .circle a'); //3个圈圈
    const $leftarrow = $('.slide .leftarrow ');
    const $rightarrow = $('.slide  .rightarrow ');
    let timer = null;
    let $num = 0; //存储索引值

    const $liwidth = $piclist.eq(0).width(); //1个li的宽度(图片的宽度)
    $ulist.width($liwidth * $piclist.length);
    

    $btnlist.on('click', function() {
        $num = $(this).index() -1; 
        tabSwitch();
    });

    $piclist.hover(function() {
        clearInterval(timer); //鼠标移入停止自动轮播
        $leftarrow.show();
        $rightarrow.show();
    }, function() {
        $leftarrow.hide();
        $rightarrow.hide();
        timer = setInterval(function() { //鼠标移出继续自动轮播。
            $rightarrow.click();
        }, 2000);
    });

    $rightarrow.on('click', function() {
        tabSwitch();
    });

    $leftarrow.on('click', function() {
        $num -= 2; 
        tabSwitch();
    });

    function tabSwitch() {
        $num++; 
        if ($num === $btnlist.length + 1) {
            $ulist.css('left', 0);
            $num = 0;
        }
        //判断左箭头
        if ($num === -1) {
            $ulist.css('left', -$liwidth * $btnlist.length);
            $num = $btnlist.length - 1;
        }

        //判断小圈圈
        if ($num === $btnlist.length) {
            $btnlist.eq(0).addClass('active').siblings('li').removeClass('active');
        } else {
            $btnlist.eq($num).addClass('active').siblings('li').removeClass('active');
        }


        $ulist.stop(true).animate({
            left: -$liwidth * $num
        });
        // $('title').html($num); //html():相当于原生js里面innerHTML
    }

    //6.自动轮播
    timer = setInterval(function() {
        $rightarrow.click();
    }, 2000);
}(jQuery);