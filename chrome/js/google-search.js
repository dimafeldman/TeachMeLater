$(function() {

    setTimeout(function() {


            var searchQuery = document.location.href.split('q=')[1].split('&')[0];

            jQuery.ajax({
                url: '//localhost:1337/phrase/check',
                method: 'get',
                dataType: 'json',
                data: {
                    value: searchQuery
                }
            }).done(function (data) {

                for (var i = 0; i < data.phrase.length; i++) {
                    var resultUrl  = data.phrase[i].resultPage.split(',')[0],
                        $resultEle = $('a[href="' + resultUrl + '"]:not(.fl)');

                    if ($resultEle.length) {
                        $resultEle.css({'background': '#2962ff', 'color': '#fff'});
                    } else {
                        // try again - probably html didn't render yet
                        setTimeout((function() {
                            $resultEle = $('a[href="' + resultUrl + '"]:not(.fl)');
                            $resultEle.css({'background': '#2962ff', 'color': '#fff'});
                        }).call(resultUrl), 1000);
                    }
                }
            });

    }, 500);
});

