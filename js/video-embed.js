(function($){

/*
jQuery(document).ready(function($){


    $( "#tabs" ).tabs();

});
*/

	/*
	*  acf/setup_fields
	*
	*  This event is triggered when ACF adds any new elements to the DOM. 
	*
	*  @type	function
	*  @since	1.0.0
	*  @date	01/01/12
	*
	*  @param	event		e: an event object. This can be ignored
	*  @param	Element		postbox: An element which contains the new HTML
	*
	*  @return	N/A
	*/
	
	
	
	
	//GetContent(document.getElementById(&quot;id_field&quot;).value,&quot;id&quot;);"
	//GetContent(document.getElementById(&quot;search_field&quot;).value,&quot;search&quot;);
	$(document).live('acf/setup_fields', function(e, postbox){
	

/*
	    $(".videoSearchForm form").submit(function(e){
	    	alert("ss");
		    return false;
	    });
*/
	    
		$('.input').keydown(function(event){
			if(event.keyCode == 13) {

				$searchTerm = $(this).val();
			
				//alert($searchTerm);
				GetContent($(this).val(),"search");

				return false;
			}
		});

	    
	    
/*
    $("form").submit(function(e){
        e.preventDefault();
    });
*/
	
	
	
		$('.videoSearchSubmit').live('click', function(){
			//$searchTerm = GetContent($(this).prev('.videoSearchBox').val(),"search");
			$searchTerm = $(this).prev('.videoSearchBox').val();
			
			//alert($searchTerm);
			GetContent($(this).prev('.videoSearchBox').val(),"search");

			
			
			return false;
		});
	
	
	

	
	

		
/*
		
		//Setup progress bars of all limiter fields
		$(postbox).find('.limiterField').each(function(){
			characterLimit(this);
		});
		
		//Run characterLimit() when the field is being used
		$(postbox).find('.limiterField').live("keyup focus", function() {
			characterLimit(this);
		});
*/
		
	


	//$(".acf-vf-ContentPane").hide();
/*
	$(postbox).find('.acf-vf .acf-vf-ContentPane').first().each(function(){
		
	$(this).show();
	});
*/

/*
	$('.acf-vf-ContentSelect').live('click', function(){
		
		console.log($(this).attr('data-pane-select'));
		
		// vars
		var videoPane = '.'+$(this).attr('data-pane-select');
		
		
		
		
		//alert(videoPane);
		// active class
		$(this).parent().parent().children(".acf-vf-container").children(".acf-vf-ContentPane").hide();
		
		
		$(this).parent().parent().find(videoPane).show();
		//$('.noob').hide();
		
		
		//$(this).closest('.'+$(this).attr('data-pane-select')).addClass('active').siblings('.view-list-li').removeClass('active');

		// gallery class
		//gallery.removeClass('view-list');
		
		
		return false;
			
	});
*/
	
	

/*
	$('.acf-gallery .toolbar .view-list').live('click', function(){
		
		// vars
		var gallery = $(this).closest('.acf-gallery');
		
		
		// active class
		$(this).parent().addClass('active').siblings('.view-grid-li').removeClass('active');
		
		
		// gallery class
		gallery.addClass('view-list');
		
		
		return false;
			
	});
*/





		//Basic youtube search....


		function GetContent(foreign_id,view_type)
		{
			var default_id = "itpdwd"; // Define default YouTube username ID here
			var max_videos = 4;  // How many to show
			var url;

			if (!foreign_id)
			{	foreign_id = default_id;
				view_type = "id";
			}
			
			// Compute the request URL (either by username or by search term)
			//  Note: "alt=json-in-script&callback=?" params are in URL to allow cross-domain JSON using jQuery
			//  See: http://docs.jquery.com/Ajax/jQuery.getJSON#urldatacallback
			
			
			url = "http://gdata.youtube.com/feeds/api/videos?vq=" + escape(foreign_id) + "&max-results=6&v=2&alt=json-in-script&callback=?";
			
			
			// Clear the HTML display
			document.getElementById("videos").innerHTML = "";
			
			// Get the data from the web service and process
			$.getJSON(url,
				function(data)
				{
					$.each(data.feed.entry, function(i,item)
					{
						// Extract video ID from the videos API ID
						var api_id = item.id.$t; api_id.match(/\/(\w+?)$/);
						var id = item.media$group.yt$videoid.$t;
						
						var title = item.title.$t;
						console.log(item);
						var thumbnail = item.media$group.media$thumbnail[2].url;
						// Get first 10 chars of date_taken, which is the date: YYYY-MM-DD
						var date_pub = item.published.$t.substring(0, 10);
						
						// Collect the authors
						var author_text = "";
						$.each(item.author, function(j,item2)
						{	if (author_text) author_text += ", ";
							author_text += '<a href="' + item2.uri.$t + '">' + item2.name.$t + '</a>';
						});
						
						
						//sdSJ1--kBZ4
						var text = "<img src='"+thumbnail+"' />";
							

						
						// Now append to the HTML display
						$(text).appendTo(".acf-vf-results");
						
						
						
						
						// Format the HTML for this video
						var text = '<div align="left" class="video">' +
							'<b class="title">' + title + '</b><br/>' +
							'Published: ' + date_pub + ' by ' + author_text + '<br/>' +id+
							'<iframe width="560" height="315" src="http://www.youtube.com/embed/'+id+'" frameborder="0" allowfullscreen></iframe></div>';
							

						
						// Now append to the HTML display
						//$(text).appendTo(".acf-vf-results");
			
					});
				}
			);
		
		}


	});

			


})(jQuery);



/*

Use this function to process the search box

function processURL(url, success){
    var id;

    if (url.indexOf('youtube.com') > -1) {
        id = url.split('/')[1].split('v=')[1].split('&')[0];
        return processYouTube(id);
    } else if (url.indexOf('youtu.be') > -1) {
        id = url.split('/')[1];
        return processYouTube(id);
    } else if (url.indexOf('vimeo.com') > -1) {
        if (url.match(/^vimeo.com\/[0-9]+/)) {
            id = url.split('/')[1];
        } else if (url.match(/^vimeo.com\/channels\/[\d\w]+#[0-9]+/)) {
            id = url.split('#')[1];
        } else if (url.match(/vimeo.com\/groups\/[\d\w]+\/videos\/[0-9]+/)) {
            id = url.split('/')[4];
        } else {
            throw new Error('Unsupported Vimeo URL');
        }

        $.ajax({
            url: 'http://vimeo.com/api/v2/video/' + id + '.json',
            dataType: 'jsonp',
            success: function(data) {
                sucess(data[0].thumbnail_large);
            }
        });
    } else {
        throw new Error('Unrecognised URL');
    }

    function processYouTube(id) {
        if (!id) {
            throw new Error('Unsupported YouTube URL');
        }

        sucess('http://i2.ytimg.com/vi/' + id + '/hqdefault.jpg');
    }
}
*/

