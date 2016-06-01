var didScroll;
var lastScrollTop = 0;
var delta = 1;
var navbarHeight = 0;
var navButton = $("#main-nav-menu-button");
var nav = $("ul#navigation-menu");
var menuVisible = false;

//Show and Hide menu when menu button is clicked
$(document).ready(function(){
    navButton.click(function(){
      if(menuVisible){
        nav.css('max-height', '0em');
        menuVisible = false;
        return;
      } else {
        nav.css('max-height', '50em');
        menuVisible = true;
      }
    });
});

//Configure menu to hide when scrolling down and show when scrolling up
$(window).scroll(function(event){
    didScroll = true;
});

setInterval(function() {
    if (didScroll) {
        hasScrolled();
        didScroll = false;
    }
}, 250);

function hasScrolled() {
    var st = $(this).scrollTop();

    // Make sure they scroll more than delta
    if(Math.abs(lastScrollTop - st) <= delta)
        return;

    // If they scrolled down and are past the navbar, add class .nav-up.
    // This is necessary so you never see what is "behind" the navbar.
    if (st > lastScrollTop && st > navbarHeight){
        // Scroll Down
        $('header').removeClass('nav-down').addClass('nav-up');
    } else {
        // Scroll Up
        if(st + $(window).height() < $(document).height()) {
            $('header').removeClass('nav-up').addClass('nav-down');
        }
    }

    lastScrollTop = st;
}
