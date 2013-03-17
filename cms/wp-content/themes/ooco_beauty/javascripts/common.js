function windowresize()
{
	windowHeight=jQuery(window).height();
	
	var documentHeight=windowHeight+jQuery('footer').height();	
	
	//jQuery('aside').css("height",documentHeight);
		
	if(windowHeight<800)
	{
			
		jQuery("#footer").addClass("footer1200");
	}
	else
	{
		jQuery("#footer").removeClass("footer1200");
	}
	var wHeight = jQuery(window).height();		
	var wWidth = jQuery(window).width();
	var pHeight = jQuery('.bgImge').height();		
	var minWidth = 1280;
	
	if(pHeight>wHeight){
		jQuery('.bgImge').css('display','block');
		jQuery('.bgImge').css('width','100%');
		jQuery('.bgImge').css('height','auto');
		var topPos=Math.round(Math.abs((pHeight-wHeight)/2))
		jQuery('.bgImge').css('top',"-"+topPos+'px');
	}
	else{
		//jQuery(this).find('.theImg').css({backgroundImage:'url('+currentImg+')'});
		//jQuery('.bgImge').css('display','none');
	}
}
function onReadyAnimate()
{
	jQuery("#header").addClass("headerShow");
	jQuery("#footer").addClass("footerShow");
	jQuery(".orderbtn").addClass("orderbtnShow");
	jQuery(".home").addClass("current");
	jQuery("#clsOcooSocialMedia,#clsOcooBenefits").addClass("ShowBenefits");	
	setTimeout('jQuery(".orderbtn").removeClass("orderbtnShow");jQuery(".orderbtn").addClass("orderbtnTrans");',1000);	
	
}
var previousPage='';
var asideOpen=false;
var shopOrderOpen=false;
var nav_cur_page='';	
var nav_cur_page_id='';

jQuery(document).ready(function($){
	
	var wrapper_he=jQuery("#wrapper").height()+10;	
	
	windowresize();
	
	setTimeout('onReadyAnimate()',200);
	
	//jQuery(".slimContentContainer").niceScroll({cursorborderradius :"0px",cursorcolor:"#000"}); 
	
	jQuery("aside.animate .slimContentContainer").live("mouseenter",function(){
		jQuery(this).niceScroll({cursorborderradius :"0px",cursorcolor:"#000"}); 
	})
	
	jQuery("#menu a.clSlideIn").live("click",function(e){		
		
		e.preventDefault();		
		
		nav_cur_page=jQuery(this).attr("href");
		
		nav_cur_page_id=jQuery(this).attr("title");
		
		if(nav_cur_page_id==previousPage)
		{
			return false;
		}	
		
		
		jQuery("#menu a").removeClass("current");
		
		jQuery(this).addClass("current");
		
		jQuery("#loading").slideDown();
		
		asideOpen=true;
		
		if(shopOrderOpen)
		{
			shopOrderOpen=false;
			jQuery(".closeShop").trigger("click");
		}
		
			jQuery('#ajax').load(nav_cur_page,function(response, status, xhr){
					//alert(nav_cur_page_id);
				if (status == "error") {
						
				}
				else
				{
					setTimeout('hideLoader()',1000);
				}
			});
			return false;
		})
	
	jQuery(".shopOrderLink").live("click",function(e){
		e.preventDefault();
		
		if(shopOrderOpen)
			return false;
				
		if(asideOpen)
		{
			asideOpen=false;
			
			jQuery("#"+nav_cur_page_id).addClass("animateOut");
			
			setTimeout('jQuery("#'+nav_cur_page_id+'").removeClass("animate");',1000);
		}
		jQuery("#loading").slideDown();
		jQuery("#menu a").removeClass("current");
		
		jQuery("#menu .shopOrderLink").addClass("current");
		
		var shopOrderLink=jQuery(".shopOrderLink").attr("href");
		
		jQuery('#ajax').load(shopOrderLink,function(response, status, xhr){
				if (status == "error") {
						
				}
				else
				{
					setTimeout('showShopFrm()',1000);
				}
		 });
		
		
	})
	jQuery("a.home").live("click",function(e){
		e.preventDefault();
		
		if(asideOpen)
		{
			asideOpen=false;
						
			jQuery("#"+nav_cur_page_id).addClass("animateOut");
			
			setTimeout('jQuery("#'+nav_cur_page_id+'").removeClass("animate");',1000);
		}
		jQuery("#menu a").removeClass("current");
		
		jQuery(this).addClass("current");
		
		if(shopOrderOpen)
		{
			shopOrderOpen=false;
			jQuery(".closeShop").trigger("click");
		}
	})
	jQuery(".closeShop").live("click",function(e){
		e.preventDefault();	
		jQuery("#shopOrder").addClass("animateOut");
		shopOrderOpen=false;
		jQuery("#menu a").removeClass("current");
		setTimeout('jQuery("#shopOrder").removeClass("animate");',1000);
	})
	
	var previousClass='';
	
	jQuery(".animate .pagination a").live('click',function(e){
		//alert('call page');
		e.preventDefault();		
		
		if(previousClass=="")
			previousClass=jQuery(".animate .pagination a.first").attr("href");		
			
		//alert(previousClass);
		
		var cur_page=jQuery(this).attr("href");	
		
		jQuery(".animate .pagination a").removeClass("selected");
		
		jQuery(this).addClass("selected");
		
		jQuery(".animate .slidePage").removeClass("openTab");
		jQuery(".animate .slidePage").addClass("clsAboutCon");
		jQuery(".animate .slidePage").removeClass("addOpacity");
		
		
		//jQuery(cur_page+" .slimContentContainer").niceScroll({cursorborderradius :"0px",cursorcolor:"#000"}); 
		
		jQuery(cur_page).addClass("openTab");
			
		jQuery(cur_page).removeClass("clsAboutCon");
		
		setTimeout('jQuery("'+cur_page+'").addClass("addOpacity");',300);
		
	})	
	jQuery(window).resize(function()
	{
		windowresize();		
	})
	/*jQuery(".social_link a").live("click",function(){
		//alert('hi');
		//window.target="_blank";
		window.location=jQuery(this).attr("href");
		return true;
	})*/
	
	jQuery(".shopForms").live("click",function(e){
		e.preventDefault();
		var shopFormsURL=$(this).attr("href");
		
		$("#ajax .shopLoad").load(shopFormsURL,function(response, status, xhr){
			if (status == "error") {
						
			}
			else
			{
				//setTimeout('showShopFrm()',1000);
			}
		})
	})
})
function showShopFrm()
{
	jQuery('#loading').slideUp('fast',function(){
											   
		jQuery("#shopOrder").removeClass("animateOut");
		
		jQuery("#shopOrder").addClass("animate");
		
		shopOrderOpen=true;
		
	})
}
function hideLoader()
{
	//alert(nav_cur_page_id);
	
	jQuery('#loading').slideUp('fast',function(){
		//alert(nav_cur_page_id);
		jQuery("#ajax #"+nav_cur_page_id).addClass("animate");
		
		if(previousPage!="")
		{			
			//alert(previousPage);
			
			jQuery("#ajax #"+previousPage).addClass("animateOut");
			
			jQuery("#ajax #"+nav_cur_page_id).removeClass("animateOut");
				
			setTimeout('jQuery("'+previousPage+'").removeClass("animate");',1000);
		}
		previousPage=nav_cur_page_id;
	});	
	
}