var jPM = {};

$(function() {

    jPM = $.jPanelMenu({

        menu : '#menu',
        trigge : '.menu-trigger',
        animated: false,
        beforeOpen : ( function() {
        	console.log("Hello before open");	
            if (matchMedia('only screen and (min-width: 992px)').matches) {
                $('.sidebar').css("left", "250px");
            }

        }),
        beforeClose : ( function() {

            $('.sidebar').css("left", "0");
            $('.writer-icon, .side-writer-icon').removeClass("fadeOutUp");
        })
    });
    //Commented as of now.
    //jPM.on();

    $('.select-posts,.select-categories').on('click', "#mainContent" , function () {
        $('.home-page-posts').toggleClass("hide");
        $('.home-page-categories').toggleClass("hide");

        $('.select-posts').toggleClass("active");
        $('.select-categories').toggleClass("active");

        $('.home-footer').toggleClass("hide");
    });

    $('.writer-icon').on('click', function () {
        $(this).addClass("fadeOutUp");

    });

    var graphData = [{
        // Visits
        data: [ [11, 540], [12, 600], [13,645], [14, 672], [15, 591], [16, 789], [17, 794], [18, 732], [19, 600],[20, 520], [21, 500] ],
        color: '#69d193'
    }, {
        // Returning Visits
        data: [ [11, 500], [12, 523], [13, 530], [14, 423], [15, 543], [16, 624], [17, 732], [18, 580],[19, 580], [20, 430], [21, 450] ],
        color: '#4761e2',
        points: { radius: 4, fillColor: '#4761e2' }
    }
    ];

    if( $('#graph-lines').length > 0 ) {

        $.plot($('#graph-lines'), graphData, {
            series: {
                points: {
                    show: true,
                    radius: 5
                },
                lines: {
                    show: true
                },
                shadowSize: 0
            },
            grid: {
                color: '#646464',
                borderColor: 'transparent',
                borderWidth: 20,
                hoverable: true
            },
            xaxis: {
                tickColor: 'transparent',
                tickDecimals: 0
            },
            yaxis: {
                tickSize: 100,
                label: "Price (USD)"
            }
        });

        // Bars
        $.plot($('#graph-bars'), graphData, {
            series: {
                bars: {
                    show: true,
                    barWidth: 0.9,
                    align: 'center'
                },
                shadowSize: 0
            },
            grid: {
                color: '#646464',
                borderColor: 'transparent',
                borderWidth: 20,
                hoverable: true
            },
            xaxis: {
                tickColor: 'transparent',
                tickDecimals: 0
            },
            yaxis: {
                tickSize: 1000
            }
        });
        $('#graph-bars').hide();

        $('#lines').on('click', function (e) {
            $('#bars').removeClass('active');
            $('#graph-bars').fadeOut();
            $(this).addClass('active');
            $('#graph-lines').fadeIn();
            e.preventDefault();
        });

        $('#bars').on('click', function (e) {
            $('#lines').removeClass('active');
            $('#graph-lines').fadeOut();
            $(this).addClass('active');
            $('#graph-bars').fadeIn().removeClass('hidden');
            e.preventDefault();
        });

        function showTooltip(x, y, contents) {
            $('<div id="tooltip">' + contents + '</div>').css({
                top: y - 16,
                left: x + 20
            }).appendTo('.container').fadeIn();
        }

        var previousPoint = null;

        $('#graph-lines, #graph-bars').bind('plothover', function (event, pos, item) {
            if (item) {
                if (previousPoint != item.dataIndex) {
                    previousPoint = item.dataIndex;
                    $('#tooltip').remove();
                    var x = item.datapoint[0],
                        y = item.datapoint[1];
                        showTooltip(item.pageX, item.pageY, y + ' readers on the' + x + 'th');
                }
            } else {
                $('#tooltip').remove();
                previousPoint = null;
            }
        });

        $('.chart-visitors').easyPieChart({
            animate: 3000,
            barColor : '#4761e2',
            lineWidth : 20,
            lineCap: 'butt',
            size: 150
        });

        $('.chart-downloads').easyPieChart({
            animate: 4200,
            barColor : '#4761e2',
            lineWidth : 20,
            lineCap: 'butt',
            size: 150
        });

    }//end check if graph exists

    var fullHeight = $(window).height();

    $('.hero-image-404').css("height", fullHeight );

});