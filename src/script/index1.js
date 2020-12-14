! function($) {
    const $index1 = $('.index1 .normal');

    $.ajax({
        url: 'http://localhost/secondstageproject/php/index1.php',
        dataType: 'json'
    }).done(function(data) {
        let $strhtml = '';
        $.each(data, function(index, value) {
            $strhtml += `
            <div>
                <a href="detail.html?sid=${value.sid}">
                    <img src="${value.url}" alt="">
                </a>
                <p>
                    ${value.title}
                </p>
                <p>
                    ￥${value.price}
                </p>
            </div>
            `;
        });
        $index1.html($strhtml);
    });
}(jQuery);