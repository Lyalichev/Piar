$(document).ready(function () {

    // Loader Page
    $('#loading').fadeOut(500);

    // Partners
    var partner = new Swiper('.swiper-partner', {
        loop: true,
        slidesPerView: 5,
        spaceBetween: 30,
        autoplay: {
            delay: 2500,
            disableOnInteraction: false
        },
        breakpoints: {
            599: {
                slidesPerView: 3
            }
        }
    });

    // Alert
    $('#js-submit').on('click', function () {
        alertShow($('.alert[data-answer="successful"]'));
    });

    function alertShow(e) {
        $(e).addClass('active');
        setTimeout(function () {
            $(e).removeClass('active');
        }, 5000);
    }

    // link video
    $('.link-v').on('keyup', function () {
        if ($(this).val().length >= 1) {
            createVideo($(this).val());
        } else {
            $('.thumb-wrap').html('<img class="zaglushka" src="img/zaglushka.png" alt="">');
            $('.name-video').removeClass('active');
            $('.thumb-wrap').removeClass('active');
        }
    });

    function parseVideo(url) {

        var regExpVimeo = (/^.*(vimeo\.com\/)((channels\/[A-z]+\/)|(groups\/[A-z]+\/videos\/))?([0-9]+)/);
        var regExpYoutube = /^.*((youtu.be\/)|(v\/)|(\/u\/\w\/)|(embed\/)|(watch\?))\??v?=?([^#\&\?]*).*/;
        var type, id, parseUrl;

        if (url.indexOf('youtu') > -1) {
            type = 'youtube';
            id = url.match(regExpYoutube)[7];

        } else if (url.indexOf('vimeo') > -1) {
            type = 'vimeo';
            id = url.match(regExpVimeo)[5];
        } else {
            $('.name-video').removeClass('active');
        }

        var videoData = {
            type: type,
            id: id
        };

        return videoData
    }

    function createVideo(url) {
        var videoObj = parseVideo(url);
        if (videoObj.type === 'youtube') {
            $('.thumb-wrap').html('<iframe src="https://www.youtube.com/embed/' + videoObj.id + '" frameborder="0"></iframe>').addClass('active');
            videoTitleYoutube(url);
        } else if (videoObj.type === 'vimeo') {
            $('.thumb-wrap').html('<iframe src="http://player.vimeo.com/video/' + videoObj.id + '" frameborder="0"></iframe>').addClass('active');
            videoTitleVimeo(url);
        } else {
            $('.thumb-wrap').html('<img class="zaglushka" src="img/zaglushka.png" alt="">').removeClass('active');
        }
    }

    function videoTitleYoutube(url) {
        var videoObj = parseVideo(url);
        var apiKey = 'AIzaSyBKVz3-ZRlJxNG15XO-fnyynOFDH83fxxw';
        $.get("https://www.googleapis.com/youtube/v3/videos?part=snippet&id=" + videoObj.id + "&key=" + apiKey, function (data) {
            $('.name-video').addClass('active').find('input').val(data.items[0].snippet.title);
        });
    }

    function videoTitleVimeo(url) {
        var videoObj = parseVideo(url);
        $.get("http://vimeo.com/api/v2/video/" + videoObj.id + ".json", function (data) {
            $('.name-video').addClass('active').find('input').val(data[0].title);
        });
    }

    // Tabs
    if ($('*').hasClass('createTab')) {
        $('#createTab').responsiveTabs({
            startCollapsed: 'accordion'
        });
    }

    // Range
    if ($('*').hasClass('js-view')) {
        $("#views").ionRangeSlider({
            type: "single",
            min: 0,
            max: 100000,
            from: 500,
            from_min: 500,
            step: 100,
            grid: true,
            grid_num: 10,
            onChange: function (data) {
                allSumFirst(data.from);
            }
        });
    }

    // Range sex
    if ($('*').hasClass('js-old')) {
        $("#old").ionRangeSlider({
            type: "double",
            min: 0,
            max: 100,
            grid: true,
            values: ["0+", 18, 25, 35, 45, "100+"]
        });
    }

    // Calc
    $('#desc-area').on('keyup', function () {
        if ($(this).val() !== '') {
            $('.sum-rub').text((500 * 0.9) + ' ' + 'руб');
        } else {
            $('.sum-rub').text((500 * 0.8) + ' ' + 'руб')
        }
    });

    function allSumFirst(val) {
        $('.view-val-num').text(val);
        var value = val;
        var textareaVal = $('#desc-area');

        if (textareaVal.val() !== '') {
            $('.sum-rub').text((val * 0.9) + ' ' + 'руб')
        } else {
            $('.sum-rub').text((val * 0.8) + ' ' + 'руб')
        }

        $('#desc-area').on('keyup', function () {
            if ($(this).val() !== '') {
                $('.sum-rub').text((val * 0.9) + ' ' + 'руб');
            } else {
                $('.sum-rub').text((val * 0.8) + ' ' + 'руб')
            }
        });
    }

    // Description for Video
    $('.desc-title').on('click', function () {
        $('.desc-for-video').toggleClass('active');
    });

    // Soc platform
    $('#soc-active').on('change', function () {
        if ($(this).is(':checked')) {
            $('.more-info-soc').addClass('active');
        } else {
            $('.more-info-soc').removeClass('active');
        }
    });

    $('.categories .title-sec').on('click', function () {
        $('.show-cat').toggleClass('active');
    });

    $('.show-setting  .title-sec').on('click', function () {
        $('.show-setting').toggleClass('active');
    });

    // Tel mask
    if ($('*').hasClass('mask-input')) {
        $(".mask-input").mask("+380 (99) 999-9999");
    }

    // Add Site
    $('.js-add-site').on('click', function (e) {
        e.preventDefault();
        $(this).closest('.add-site').toggleClass('active')
    });

    //create platforms
    $('.select-add .radio').on('click', function () {
        var i = $(this).index();
        $('.add-plat-result .res-card').removeClass('active').eq(i).addClass('active');
    })

    // Progress
    if ($('*').hasClass('progress')) {
        $('.progress').circleProgress({
            value: 0.75,
            size: 100,
            fill: {
                gradient: ["#4274f4", "#ed5565"]
            }
        }).on('circle-animation-progress', function (event, progress, stepValue) {
            $(this).find('span').text(stepValue.toFixed(2).substr(2) + "%");
        });
    }

    // Select Filter
    if ($('*').hasClass('filters')) {
        $('.filters').niceSelect();
    }

    // Datepicker
    if ($('*').hasClass('date-stat')) {
        $('.date-stat').datepicker();
    }

    // Copy
    $('.copy').on('click', function () {
        $('.link-ref').select();
        document.execCommand('copy');
        alertShow($('.alert[data-answer="successful"]'));
    });

    // Burger
    $('.burger-nav').on('click', function () {
       $('.nav').addClass('active');

       $('.exit-mob').on('click', function () {
           $('.nav').removeClass('active');
       });
    });
});