$(document).ready(function(){
    $('.nav ul li').hover(
        function() {
            $(this).addClass("active");
            $(this).find('ul').stop(false, true).slideDown();
        },
        function() {
            $(this).removeClass("active");        
            $(this).find('ul').stop(false, true).slideUp('fast');
        }
    );
});