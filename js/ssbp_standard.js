jQuery(document).ready(function(){

    // loop through each wrap
    jQuery('.ssbp-wrap').each(function(i, obj) {
        // if set one
        if(jQuery(this).hasClass('ssbp-set--one')) {
            // if onscroll is NOT enabled
            if(! jQuery(this).data('ssbp-onscroll')) {
                // show buttons
                jQuery(this).removeClass('ssbp--state-hidden');
                jQuery('.ssbp-set--one .ssbp-toggle-switch').fadeIn();
            }
        } else {
            jQuery(this).removeClass('ssbp--state-hidden');
            jQuery('.ssbp-set--two .ssbp-toggle-switch').fadeIn();
        }
    });

    // toggle switch
    jQuery('.ssbp-toggle-switch').on('click', function() {
        jQuery(this).parent().toggleClass('ssbp--state-hidden');
    });

    // upon clicking a simple share buttons plus button
	jQuery('.ssbp-btn').click(function(event){

		// don't go the the href yet
		event.preventDefault();

        // ignore ellipsis and yummly
        if (jQuery(this).data("ssbp-site") == 'Ellipsis') {
            return true;
        }

        // if yummly
        if(jQuery(this).data("ssbp-site") == 'Yummly') {
            var ys = document.createElement('script'),
                jsUrl = 'http://www.yummly.com/js/yumlet.js?type=agg&vendor=ssb';
            ys.setAttribute('type', 'text/javascript');
            ys.setAttribute('src', jsUrl);
            document.documentElement.appendChild(ys);
            return true;
        }

		// collect and compile posted data to an array
		var data = {
			    action: 'ssbp_standard',
			    title: jQuery(this).data("ssbp-title"),
			    url: jQuery(this).data("ssbp-url"),
			    site: jQuery(this).data("ssbp-site"),
			    href: jQuery(this).attr("href"),
			};

		// these share options don't need to have a popup
		if (data['site'] == 'Email' || data['site'] == 'Print' || data['site'] == 'Pinterest' || data['site'] == 'WhatsApp') {

			// not email popup button
			if (! jQuery(this).hasClass('ssbp-email-popup')) {
				// just redirect
				window.location.href = data['href'];
			}
		} else {

			// prepare popup window
			var width  = 575,
			    height = 520,
			    left   = (jQuery(window).width()  - width)  / 2,
			    top    = (jQuery(window).height() - height) / 2,
			    opts   = 'status=1' +
			             ',width='  + width  +
			             ',height=' + height +
			             ',top='    + top    +
			             ',left='   + left;

			// open the share url in a smaller window
		    window.open(data['href'], 'SSBP', opts);
		}
	});
});
