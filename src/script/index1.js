define(['jlazyload'], () => {
    return {
        init: function() {
            //渲染+懒加载
            const $list = $('.dotaarea .goods .right  .normal1 ');
            $.ajax({
                url: 'http://10.31.161.33/secondstageproject/php/index1.php',
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
        }
    }
});