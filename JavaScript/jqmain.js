$(function(){

    $(window).scroll(function () {
        if ($(window).scrollTop() > 0){
            $('header').addClass('hiddentop');
        }else{
            $('header').removeClass('hiddentop');
        }
    });

    displaySize();
    openHamb();

    if($('.previous').length) slidebar('.previous','.next','.sliderItem');
    if($('#mapShops').length) $(function(){
        let myMap;
        ymaps.ready(init);
        function init () {
            myMap = new ymaps.Map('mapShops', {
                center: [55.782890, 37.669178],
                zoom: 13,
            });
            
            let myPlacemark = new ymaps.Placemark(myMap.getCenter(), {
                
    }, {
        preset: 'islands#blackAutoCircleIcon'
    });
        
            myMap.geoObjects.add(myPlacemark);
        }

    })

    $('.item').magnificPopup({
        type: 'image',
        gallery:{
          enabled:true
        }
      });

      accordeon();

      if($('.aboutDelivery').length) accStore('.aboutDelivery','.textDelivery');
      if($('.aboutReturns').length) accStore('.aboutReturns','.textReturns');



/*dropmenuClick();
gataka();
writeTable();

if($('.previous').length) slidebar('.previous','.next','.item');
if($('.previous2').length) slidebar('.previous2','.next2','.item2');

if($('.aboutDelivery').length) accStore('.aboutDelivery','.textDelivery');
if($('.aboutReturns').length) accStore('.aboutReturns','.textReturns');

$('.totop').click(function(){
    $('html').animate({scrollTop: 0}, 1000);
});

$(window).scroll(function(){

    if ($(window).scrollTop() > 150){
        $('.totop').removeClass('hiddentop');
    }else{
        $('.totop').addClass('hiddentop');
    }
});
$(window).trigger('scroll');

if ($('.table').length) {
    writeTable();
    $(document).on('click', '.quantity button:first-child', function(){
        let id = $(this).parents('.tr').find('.id').prop('id').slice(6);
        for (item of gamma) {
            if (item.art == id) {
                item.quantity--;
                if (item.quantity <= 0) removeTovar(id);
                break;
            }
        }
        writeTable();
    });
    $(document).on('click', '.quantity button:last-child', function(){
        let id = $(this).parents('.tr').find('.id').prop('id').slice(6);
        for (item of gamma) {
            if (item.art == id) {
                item.quantity++;
                break;
            }
        }
        writeTable();
    });
    $(document).on('click', '.delete button', function(){
        let id = $(this).parents('.tr').find('.id').prop('id').slice(6);
        if (removeTovar(id)) writeTable();
    });


    $('.form form').submit(function(e){
        e.preventDefault();
        formValidate(this);
    });
    $('#date').focus(function(){
        getCalendar($('#date').val());
    });

}

$('.item').click(function(){
    lightbox(this);
});

$('.person').click(function(){
    lightboxperson(this);
});  */

});