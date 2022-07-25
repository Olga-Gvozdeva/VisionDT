/*
const russMonth = ['January','February','March','April','May','June','July','August','September','October','November','December'];
let gamma = [];
let basket = document.querySelector('.basket');


function dropmenuClick(){
let button = document.querySelector('.logo');
let elem = document.querySelector('.dropdownMenu');
button.addEventListener('click', function() {
elem.classList.toggle('active');
});
}

function displaySize(){

let parent = document.querySelector('.right_menu');
let home = document.querySelector('.home');
let products = document.querySelector('.products');
let store = document.querySelector('.store');
let before = document.querySelector('.before');

let dropdownMenu = document.querySelector('.dropdownMenu');

let cloneHome = home.cloneNode(true);
cloneHome.innerHTML = 'Home';

let cloneProducts = products.cloneNode(true);
cloneProducts.innerHTML = 'Products';

let cloneStore = store.cloneNode(true);
cloneStore.innerHTML = 'Store';


let width = window.innerWidth;


let minResize = false;
let maxResize = false;

let f_windowWidth = function (width) {

          if (width <= 760 && !minResize) {
              minResize = true;   
              maxResize = false;
              dropdownMenu.insertBefore(cloneHome, before);
              dropdownMenu.insertBefore(cloneProducts, before);
              dropdownMenu.insertBefore(cloneStore, before);
          } 

          if (width >= 760 && !maxResize) {
              maxResize = true;
              minResize = false;
              cloneHome.remove();
              cloneProducts.remove();
              cloneStore.remove();
          }
    };
        
    f_windowWidth(width);
    $(window).on("resize", function () {
        let width = window.innerWidth;
        f_windowWidth(width); 
    });

};

function accordeon(){
    let beta = document.querySelectorAll('.sub');
    for(let elem of beta){
        elem.firstElementChild.addEventListener('click', function(){
            elem.lastElementChild.classList.toggle('openacc');
        })
    }
    
}

function slidebar(perem1, perem2, perem3){

    document.querySelector(perem1).addEventListener("click", previousSlide);
    document.querySelector(perem2).addEventListener("click", nextSlide);

    let slideIndex = 1;
    showSlides(slideIndex);

    function nextSlide() {
        showSlides(slideIndex += 1);
    }
    function previousSlide() {
        showSlides(slideIndex -= 1);  
    }
    function currentSlide(n) {
        showSlides(slideIndex = n);
    }

    function showSlides(n) {
        let i;
        let slides = document.querySelectorAll(perem3);

        if (n > slides.length) {
            slideIndex = 1
        }
        if (n < 1) {
            slideIndex = slides.length
        }

        for (let slide of slides) {
            slide.style.display = "none";
        }   
        slides[slideIndex - 1].style.display = "block"; 
    }
}

function gataka(){


  for(i in localStorage) {

    if((i.slice(0,3)) == ('art')){
    
        let l = localStorage[i].split(',');
        let obj = {
            art: i.slice(5),
            name: l[0],
            price: parseInt(l[1]),
            quantity: 1
        }
        gamma.push(obj);
    };
    
    }
    
}

function writeTable() {
    if (!gamma.length) {
        $('.table, .form').remove();
        $('.nullBasket').after('<div class="empty">Add items to Сart</div>');
        return;
    }

    let tab = $('.table');
    let hlpstr = '<div class="tr top"><div class="id"></div><div class="name">Product</div><div class="price">Price</div><div class="quantity">Num</div><div class="summa">Total</div><div class="delete"></div></div>';
    let sum = 0;
    for (item of gamma) {
        sum += (item.quantity * item.price);
        hlpstr += '<div class="tr"><div class="id" id="tovar_' + item.art + '"></div><div class="name">' + item.name + '</div><div class="price">' + item.price + '</div><div class="quantity"><button type="button">&minus;</button><span class="number">' + item.quantity + '</span><button type="button">&plus;</button></div><div class="summa">' + (item.quantity * item.price) + '</div><div class="delete"><button type="button">&times;</button></div></div>';
    }
    hlpstr += '<div class="tr bottom"><div class="text">Total:</div><div class="itog">' + sum + '</div></div>';
    tab.html(hlpstr);
}

function removeTovar(id) {
    for (let i = 0; i < gamma.length; i++) {
        if (gamma[i].art == id) {
            gamma.splice(i, 1);
            
                let key = localStorage.key(i);
                localStorage.removeItem(key);
            
            return true;
        }
    }
    return false;
}

function formValidate(form) {
    let name = $('#name').val();
    if (!name) {
        alert('Не заполнено имя!');
        return false;
    }
    let phone = $('#phone').val();
    if (!phone.match(/^((\+7)|(8))?\s?\(?\d{3}\)?\s?\d{3}\-?\d{2}\-?\d{2}$/)) {
        alert('Не заполнен номер телефона!');
        return false;
    }
    let mail = $('#mail').val();
    if (!mail.match(/^.+@.+\..+$/)) {
        alert('Не заполнен адрес почты!');
        return false;
    }
    let date = $('#date').val();
    if (!date.match(/^\d{2}\-\d{2}\-\d{4}$/)) {
        alert('Не выбрана дата!');
        return false;
    }
    let comment = $('#comment').val();
    let formData = {
        name,
        phone,
        mail,
        date,
        comment
    }
    $.ajax({
        url: 'https://jsonplaceholder.typicode.com/posts',
        data: formData,
        method: 'POST',
        success: function(response) {
            makeAlert(response);
        }
    });
}

function makeAlert(response) {
    let hlpstr = '<div class="alertbox"><button type="button">&#11198;</button><p>Ваш заказ оформлен под номером ' + response.id + '.</p></div>';
    $('body').append('<div class="screen"></div>');
    $('body').append(hlpstr);
    $('.alertbox button, .screen').click(function(){
        $('.alertbox').animate({opacity:0}, 500, function(){
            localStorage.clear();
            location.reload(true);
        });
    });
    $('.alertbox').animate({opacity:1}, 500);
}

function alertitemadd() {
    let hlpstr = '<div class="alertbox"><button type="button">&#11198;</button><p>Product added successfully</p></div>';
    $('body').append('<div class="screen"></div>');
    $('body').append(hlpstr);
    $('.alertbox button, .screen').click(function(){
        $('.alertbox').animate({opacity:0}, 500, function(){
            location.reload(true);
        });
    });
    $('.alertbox').animate({opacity:1}, 500);
}

function addChar(c) {
    c += '';
    if (c.length < 2) {
        c = '0' + c;
    }
    return c;
}

function makeCalendar(fieldDate) {
    let hlpdate = new Date();
    let curyear, curmonth, curday;
    if (fieldDate.match(/^\d{2}\-\d{2}\-\d{4}$/)) {
        [curday, curmonth, curyear] = fieldDate.split('-');
        curmonth--;
        hlpdate = new Date(curyear, curmonth, curday);
    }
    curyear = hlpdate.getFullYear();
    curmonth = hlpdate.getMonth();
    curday = hlpdate.getDate();
   
    hlpdate = new Date(curyear, curmonth);
    let prevdays = ((hlpdate.getDay() + 6) % 7); // пн - 0, вт - 1 ... сб - 5, вс - 6
    hlpdate = new Date(curyear, curmonth + 1, 0);
    let lastday = hlpdate.getDate() + prevdays; // последний день месяца + дни до начала месяца
    let weeks = Math.ceil(lastday / 7);
    let hlpstr = '<div class="dp_header"><span class="bigprev">&#10232;</span><span class="prev">&#10229;</span><strong>' + russMonth[curmonth] + ' ' + curyear + '</strong><span class="next">&#10230;</span><span class="bignext">&#10233;</span></div>';
    hlpstr += '<div class="dp_grid"><span class="headday">Пн</span><span class="headday">Вт</span><span class="headday">Ср</span><span class="headday">Чт</span><span class="headday">Пт</span><span class="headday holiday">Сб</span><span class="headday holiday">Вс</span>';
    for (let i = 0; i < weeks * 7; i++) {
        if ((i >= prevdays) && (i < lastday)) {
            let getdate = addChar(i - prevdays + 1) + '-' + addChar(curmonth + 1) + '-' + curyear;
            hlpstr += '<span class="getter';
            if ((i % 7 == 5) || (i % 7 == 6)) hlpstr += ' holiday';
            hlpstr += '" data-get="' + getdate + '">' + (i - prevdays + 1) + '</span>';
        } else {
            hlpstr += '<span class="empty"></span>';
        }
    }
    hlpstr += '</div>';
    $('#calendar').html(hlpstr);
    $('#calendar .prev').click(function(){
        makeCalendar(`01-${addChar(curmonth)}-${curyear}`);
    })
    $('#calendar .next').click(function(){
        makeCalendar(`01-${addChar(curmonth + 2)}-${curyear}`);
    })
    $('#calendar .bigprev').click(function(){
        makeCalendar(`01-${addChar(curmonth + 1)}-${curyear - 1}`);
    })
    $('#calendar .bignext').click(function(){
        makeCalendar(`01-${addChar(curmonth + 1)}-${curyear + 1}`);
    })
    $('#calendar .getter').click(function(){
        $('#date').val(this.dataset.get);
        $('.calendarbox').animate({opacity:0}, 500, function(){
            $('.calendarbox').remove();
            $('.screen').remove();
        });
    });
}

function getCalendar(fieldDate) {
    if ($('.calendarbox').length) return;
    $('body').append('<div class="screen"></div>');
    $('body').append('<div class="calendarbox"><div id="calendar"></div></div>');
    $('.screen').click(function(){
        $('.calendarbox').animate({opacity:0}, 500, function(){
            $('.calendarbox').remove();
            $('.screen').remove();
        });
    });
    makeCalendar(fieldDate);
    $('.calendarbox').animate({opacity:1}, 500);
}

function lightbox(aim) {

    let bg = $(aim).css('background-image');
    bg = bg.replace('url(','').replace(')','').replace(/\"/gi, "");

    let w = document.documentElement.clientWidth - 64;
    let h = document.documentElement.clientHeight - 64;
    let sides = aim.clientWidth / aim.clientHeight;
    if (w > sides * h) {
        w = sides * h;
    } else if (w < sides * h) {
        h = Math.floor(w / sides);
    }
    let topfix = h / 2 + 16;
    let leftfix = w / 2 + 16;

    let nameItem = aim.dataset.name;
    let infoItem = aim.dataset.info;
    hlpstr = '<div class="lightbox" style="margin-left:-' + leftfix + 'px;margin-top:-' + topfix + 'px; width:' + w + 'px;height:' + h + 'px;"><div class="lightinfo"><h2 class="lightboxh2">Products name: ' + nameItem + '</h2><img src="' + bg + '" style="width: 50%; height:' + h/2 + 'px; float: left; margin-right: 20px;"><p class="lightboxP">About item: ' + infoItem + '</p></div><div class="buttonlight"><button class="click">BUY</button><button type="button" class="closelightbox">CLOSE</button></div></div>';
    $('body').append('<div class="screen"></div>');
    $('body').append(hlpstr);

    $('.click').click(function(){
        let beta = [aim.dataset.name, aim.dataset.price];
        let keylocal = aim.dataset.article;
        localStorage.setItem(keylocal, beta);
        alertitemadd();
    });

    $('.lightbox .closelightbox, .lightbox .click, .screen').click(function(){
        $('.lightbox').animate({opacity:0}, 500, function(){
            $('.lightbox').remove();
            $('.screen').remove();
        });
    });
    $('.lightbox').animate({opacity:1}, 500);
}


function lightboxperson(aim) {

    let w = document.documentElement.clientWidth - 64;
    let h = document.documentElement.clientHeight - 64;
    let sides = aim.clientWidth / aim.clientHeight;
    if (w > sides * h) {
        w = sides * h;
    } else if (w < sides * h) {
        h = Math.floor(w / sides);
    }
    let topfix = h / 2 + 16;
    let leftfix = w / 2 + 16;
    hlpstr = '<div class="lightbox" style="margin-left:-' + leftfix + 'px;margin-top:-' + topfix + 'px; width:' + w + 'px;height:' + h + 'px;"><button type="button">&times;</button><div class="personform"> </div></div>';
    $('body').append('<div class="screen"></div>');
    $('body').append(hlpstr);
    $('.lightbox button, .screen').click(function(){
        $('.lightbox').animate({opacity:0}, 500, function(){
            $('.lightbox').remove();
            $('.screen').remove();
        });
    });
    $('.lightbox').animate({opacity:1}, 500);
}

function accStore(main, title){

    let buttonClick = document.querySelector(main);
    let titleText = document.querySelector(title);

    buttonClick.addEventListener('click', function(){
        titleText.classList.toggle('activeTitle');
    })
}

*/

function accStore(main, title){

    let buttonClick = document.querySelector(main);
    let titleText = document.querySelector(title);

    buttonClick.addEventListener('click', function(){
        titleText.classList.toggle('activeTitle');
    })
}

function displaySize(){

    let parent = document.querySelector('.menu');
    let home = document.querySelector('.services');
    let products = document.querySelector('.portfolio');
    let store = document.querySelector('.about');

    let dropdownMenu = document.querySelector('.menuActiv');
    
    
    let cloneHome = home.cloneNode(true);
    cloneHome.innerHTML = 'Услуги';
    
    let cloneProducts = products.cloneNode(true);
    cloneProducts.innerHTML = 'Портфолио';
    
    let cloneStore = store.cloneNode(true);
    cloneStore.innerHTML = 'О нас';
    
    
    let width = window.innerWidth;
    
    
    let minResize = false;
    let maxResize = false;
    
    let f_windowWidth = function (width) {
    
              if (width <= 1200 && !minResize) {
                  minResize = true;   
                  maxResize = false;
                  parent.classList.add('hiddenmenuActiv');
                  dropdownMenu.classList.add('hiddenmenuActiv');
                  dropdownMenu.prepend(cloneHome);
                  dropdownMenu.prepend(cloneProducts);
                  dropdownMenu.prepend(cloneStore);
              } 
    
              if (width >= 1200 && !maxResize) {
                  maxResize = true;
                  minResize = false;
                  parent.classList.remove('hiddenmenuActiv');
                  cloneHome.remove();
                  cloneProducts.remove();
                  cloneStore.remove();
              }
        };
            
        f_windowWidth(width);
        $(window).on("resize", function () {
            let width = window.innerWidth;
            f_windowWidth(width); 
        });
    
    };

    function openHamb(){

        let dropdownMenu = document.querySelector('.menuActiv');
        let hamburger = document.querySelector('.hamburger');

        hamburger.addEventListener('click', function(){
            dropdownMenu.classList.toggle('hiddenmenuActiv');
        })
    }

    function slidebar(perem1, perem2, perem3){

        document.querySelector(perem1).addEventListener("click", previousSlide);
        document.querySelector(perem2).addEventListener("click", nextSlide);
    
        let slideIndex = 1;
        showSlides(slideIndex);
    
        function nextSlide() {
            showSlides(slideIndex += 1);
        }
        function previousSlide() {
            showSlides(slideIndex -= 1);  
        }
        function currentSlide(n) {
            showSlides(slideIndex = n);
        }
    
        function showSlides(n) {
            let i;
            let slides = document.querySelectorAll(perem3);
    
            if (n > slides.length) {
                slideIndex = 1
            }
            if (n < 1) {
                slideIndex = slides.length
            }
    
            for (let slide of slides) {
                slide.style.display = "none";
            }   
            slides[slideIndex - 1].style.display = "block"; 
        }
    }

        function accordeon(){
            let beta = document.querySelectorAll('.openaccmf');
            for(let elem of beta){
                elem.addEventListener('click', function(){
                    elem.nextElementSibling.classList.toggle('openacc');
                    elem.classList.toggle('openaccmfOpn');
                })
            }
            
        }
        let myMap;
        ymaps.ready(init);
        function init () {
            myMap = new ymaps.Map('mapShops', {
                center: [55.782860, 37.669178],
                zoom: 18
            }, {
                searchControlProvider: 'yandex#search'
            });
            
        }