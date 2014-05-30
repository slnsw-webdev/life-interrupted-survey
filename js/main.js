//jQuery time
var current_fs, next_fs, previous_fs; //fieldsets
var left, opacity, scale; //fieldset properties which we will animate
var animating; //flag to prevent quick multi-click glitches

// hide other containers
$("#q8detailscontainer").hide();
$("#q13detailscontainer").hide();
$("#q14detailscontainer").hide();

$(".next").click(function(){
	if(animating) return false;
	animating = true;
	
	current_fs = $(this).parent();
	next_fs = $(this).parent().next();
	
	//increment progressbar
	var progressSoFar = $( "#progressbar" ).progressbar( "value" );
	var progressValue =  progressSoFar + 5;
	$( "#progressbar" ).progressbar({ value: progressValue });
	
	//show the next fieldset
	next_fs.show(); 
	
	//hide the current fieldset with style
	current_fs.animate({opacity: 0}, {
		step: function(now, mx) {
			//as the opacity of current_fs reduces to 0 - stored in "now"
			//1. scale current_fs down to 80%
			scale = 1 - (1 - now) * 0.2;
			//2. bring next_fs from the right(50%)
			left = (now * 50)+"%";
			//3. increase opacity of next_fs to 1 as it moves in
			opacity = 1 - now;
			current_fs.css({'transform': 'scale('+scale+')'});
			next_fs.css({'left': left, 'opacity': opacity});
		}, 
		duration: 800, 
		complete: function(){
			current_fs.hide();
			animating = false;
		}, 
		//this comes from the custom easing plugin
		easing: 'easeInOutBack'
	});
});

$(".previous").click(function(){
	if(animating) return false;
	animating = true;
	
	current_fs = $(this).parent();
	previous_fs = $(this).parent().prev();
	
	//decrement progressbar
	var progressSoFar = $( "#progressbar" ).progressbar( "value" );
	var progressValue =  progressSoFar - 5;
	$( "#progressbar" ).progressbar({ value: progressValue });
	
	//show the previous fieldset
	previous_fs.show(); 
	//hide the current fieldset with style
	current_fs.animate({opacity: 0}, {
		step: function(now, mx) {
			//as the opacity of current_fs reduces to 0 - stored in "now"
			//1. scale previous_fs from 80% to 100%
			scale = 0.8 + (1 - now) * 0.2;
			//2. take current_fs to the right(50%) - from 0%
			left = ((1-now) * 50)+"%";
			//3. increase opacity of previous_fs to 1 as it moves in
			opacity = 1 - now;
			current_fs.css({'left': left});
			previous_fs.css({'transform': 'scale('+scale+')', 'opacity': opacity});
		}, 
		duration: 800, 
		complete: function(){
			current_fs.hide();
			animating = false;
		}, 
		//this comes from the custom easing plugin
		easing: 'easeInOutBack'
	});
});

//$(".submit").click(function(){
//	return false;
//})

// initial load set at 5%
$( "#progressbar" ).progressbar({ value: 5 });

// set colours of progressbar
// $("#progressbar").css({ 'background': 'LightYellow' });
$("#progressbar > div").css({ 'background': '#e50046' });

// select list clicking
$(document).ready(function () {
    $("#msform li").hover(function () {
        $(this).css("background-color", "#00cc99");
		$(this).css("color", "#fff");
    }, function () {
        $(this).css("background-color", "#ededed");
		$(this).css("color", "#fff");
    });
	
	$("#msform li").click(function () {
		$(this).css("background-color", "#00cc99");
		$(this).css("color", "#fff");
    });
	
	$("#msform .single-button").click(function () {
        
		var btnRef = $(this);
		var btns = $(this).parent().children(":button");

		// find name and reset 
		$(btns).each(function() {
			if ($(this).hasClass("single-button")) {
  				$(this).css("background-color", "#ededed");
				$(this).css("color", "#777777");
				$(this).removeClass("marked");
			}
		});
				
		btnRef.css("background-color", "#00cc99");
		btnRef.css("color", "#fff");
		$(this).addClass("marked");
		
    });
	
	$("#msform .multiple-button").click(function () {
        $(this).css("background-color", "#00cc99");
		$(this).css("color", "#fff");
		$(this).addClass("marked");
    });
	
	$("#msform .multiple-large-button").click(function () {
        $(this).css("background-color", "#00cc99");
		$(this).css("color", "#fff");
		$(this).addClass("marked");
    });
	
	// open up additional text box if needed 
	
	$("#msform .single-button").click(function () {
		if ($(this).attr("name") == "q8btn" && $(this).val() == "Yes") {
			$("#q8detailscontainer").show();
		} 
		if ($(this).attr("name") == "q8btn" && $(this).val() == "No") {
			$("#q8detailscontainer").hide();
		} 
	});
	
	$("#msform .multiple-button").click(function () {
		if ($(this).attr("name") == "q13btn" && $(this).val() == "Other") {
			$("#q13detailscontainer").show();
		}
	});
	
	$("#msform .multiple-button").click(function () {
		if ($(this).attr("name") == "q14btn" && $(this).val() == "Other") {
			$("#q14detailscontainer").show();
		}
	});
	
	$("#msform .multiple-button").click(function () {
		if ($(this).attr("name") == "q14btn" && $(this).val() == "Other") {
			$("#q14detailscontainer").show();
		}
	});
	
	// Attach a submit handler to the sruvey form
	$( "#msform" ).on("submit", function( event ) {
		
		// Stop form from submitting normally
		event.preventDefault();
		
		// set posting url
		var postUrl = "process.html";
		
		// serialize form data
		var formData = "?" + $( this ).serialize();
		
		// serialize clicked buttons
		$( ".marked" ).each(function() {
			formData = formData + "&" + $(this).attr("name") + "=" + $(this).val();
		});
		
		// console.log( formData );
		
		postUrl = postUrl + formData;
		
		// submit survey data
		var jqxhr = $.get( postUrl, function() {
			// any code needed here ...
		})
		.done(function(rtndata) {
			$("#msform").hide();
			$("#confirmationPage").show();	
		})
		.fail(function() {
			if(confirm("Error occurred submitting the survey. Please try again." )) {
				location.reload();
			}
		});
		
	});
	
	// Attach a submit handler to the sruvey form
	$( "#confirmForm" ).on("submit", function( event ) {
		
		// Stop form from submitting normally
		event.preventDefault();
		// set posting url
		var emailUrl = "email.html";
		// serialize form data
		var emailData = "?" + $( this ).serialize();
		
		emailUrl = emailUrl + emailData;
		
		// submit survey data
		var jqxhr = $.get( emailUrl, function() {
			// any code needed here ...
		})
		.done(function(rtndata) {
			location.reload();
		})
		.fail(function() {
			if(confirm("Error occurred submitting the entry details. Please try again." )) {
				location.reload();
			}
		});
	
	});
	
	
	
});