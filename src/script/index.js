define(['jlazyload'], () => {
    return {
        init: function() {
            //渲染+懒加载
            const $list = $('.dotaarea .goods .right  .normal1 ');
            $.ajax({
                url: 'http://10.31.161.33/secondstageproject/php/index.php',
                dataType: 'json'
            }).done(function(data) {
                let $strhtml = '';
                $.each(data, function(index, value) {
                    $strhtml += `
                    <li>
                        <a href="list.html">
                            <img class="lazy" data-original="${value.url}" style="width:160px;height:160px" alt="">
                        </a>
                        <p class="goodsname">
                            ${value.title}
                        </p>
                        <p class="goodsprice">
                            ￥${value.price}
                        </p>
                        
                    </li>    
                    `;
                });
                $list.html($strhtml);
                // 渲染的下面进行懒加载操作
                $(function() { //页面加载完成
                    $("img.lazy").lazyload({
                        effect: "fadeIn" //显示方法：谈入
                    });
                });
            });
            // 
            const $list2 = $('.xiaohuarea .goods .right .normal2 ');
            $.ajax({
                url: 'http://10.31.161.33/secondstageproject/php/index2.php',
                dataType: 'json'
            }).done(function(data) {
                let $strhtml = '';
                $.each(data, function(index, value) {
                    $strhtml += `
                    <li>
                        <a href="list.html">
                            <img class="lazy" data-original="${value.url}" style="width:160px;height:160px"alt="">
                        </a>
                        <p class="goodsname">
                            ${value.title}
                        </p>
                        <p class="goodsprice">
                            ￥${value.price}
                        </p>
                        
                    </li>    
                    `;
                });
                $list2.html($strhtml);
                // 渲染的下面进行懒加载操作
                $(function() { //页面加载完成
                    $("img.lazy").lazyload({
                        effect: "fadeIn" //显示方法：谈入
                    });
                });
            });
            // 
            ! function($) {
                const $slide = $('.slide');
                const $ulist = $('.slide ul'); //运动的盒子
                const $piclist = $('.slide ul li'); //3个图片
                const $btnlist = $('.slide .circle ol li'); //3个圈圈
                const $leftarrow = $('.slide .arrow #left');
                const $rightarrow = $('.slide .arrow #right');
                let timer = null;
                let $num = 0; //存储索引值

                const $liwidth = $piclist.eq(0).width(); //1个li的宽度(图片的宽度)
                $ulist.width($liwidth * $piclist.length);


                $btnlist.on('click', function() {
                    $num = $(this).index() - 1;
                    tabSwitch();
                });

                $slide.hover(function() {
                    clearInterval(timer); //鼠标移入停止自动轮播
                    $leftarrow.show();
                    $rightarrow.show();
                }, function() {
                    $leftarrow.hide();
                    $rightarrow.hide();
                    timer = setInterval(function() { //鼠标移出继续自动轮播。
                        $rightarrow.click();
                    }, 3000);
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
                        $num = 1;
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
                }, 3000);
            }(jQuery);
            // 
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
        }
    }
});