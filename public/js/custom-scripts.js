$(function () {


	$('a[href*=#]:not([href=#])').click(function() {
        var target = $(this.hash);
        target = target.length ? target : $('[name=' + this.hash.substr(1) +']');
        if (target.length) {
            $('html,body').animate({
              scrollTop: target.offset().top
            }, 1000);
            return false;
        }
    });

    $('.popup').click(function(event) {
	    var width  = 575,
	        height = 400,
	        left   = ($(window).width()  - width)  / 2,
	        top    = ($(window).height() - height) / 2,
	        url    = this.href,
	        opts   = 'status=1' +
	                 ',width='  + width  +
	                 ',height=' + height +
	                 ',top='    + top    +
	                 ',left='   + left;
	    
	    window.open(url, 'twitter', opts);
	 
	    return false;
	});

	$('.btn-share').click(function(){
		elem = $(this);
		post_to_feed(elem.data('title'), elem.data('desc'), elem.prop('href'), elem.data('image'));

		return false;
	});
});


function post_to_feed(title, desc, url, image){
	var obj = {
		method: 'feed',
		link: url, 
		picture: image, 
		name: title, 
		description: desc
	};
	function callback(response){}
	FB.ui(obj, callback);
}