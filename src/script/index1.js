define(['jlazyload'], () => {
    return {
        init: function() {
            //渲染+懒加载
            const $list = $('.dotaarea .goods .right  .normal ');
            $.ajax({
                url: 'http://localhost/secondstageproject/php/index1.php',
                dataType: 'json'
            }).done(function(data) {
                let $strhtml = '';
                $.each(data, function(index, value) {
                    $strhtml += `
                    <li>
                        <a href="detail.html?sid=${value.sid}">
                            <img src="${value.url}" style="width:160px;height:160px"alt="">
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
        }
    }
});