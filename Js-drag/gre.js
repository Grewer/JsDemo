$(function(){

	// menus.js 115行
	Default = {
		"lable":"+",
		"maxnum":"5"
	}

	
	$(document).on('mousedown','[data-lv=2]',function(e){
		var $this = $(this);
		var x;
		var y;
		var Ismove = true;
		var ishrefnull;
		var hrefattr = $this.attr('href');
		var thislable = $this;
		var parent = $this.parent();
		var alllable = $this.parent().parent();
		var mouseDownPosiX = e.pageX; 
		var mouseDownPosiY = e.pageY; 
		var distance = $this.parent()[0].offsetTop;

		if(thislable.text()==Default.lable||parent.text() ==Default.lable){
			return false;
		}

		var all =new Array();
		var oneheight = $this.parent()[0].offsetHeight;
		var allheight = $this.parent().parent()[0].offsetHeight;
		var allnum = Math.round(allheight/oneheight);
		parent[0].style.left = '0px';
        parent[0].style.top = '0px';

        if(alllable.find('a').eq(allnum-1).text() == Default.lable)
        {
        	allnum -= 1 ;
        }
       
		document.onmousemove=function(e2){
			
			if(Ismove){
			if(hrefattr != ""){
			ishrefnull = false;
			$this.removeAttr('href');
		}

			parent.css('opacity','0.8');
			parent.css('z-index','5000');
			x = e2.pageX -mouseDownPosiX;
         	y = e2.pageY - mouseDownPosiY;
         	parent[0].style.left = x+'px';
         	parent[0].style.top = y+'px';

			alllable.css('-moz-user-select','none');
			alllable.css('-webkit-user-select','none');
			}
		}

		document.onmouseup = function(){
			Ismove = false;
			parent[0].style.left = '0px';
        	parent[0].style.top = '0px';
        	typeof(y) == 'undefined'? y=0 :y;
        	var mousetopdis=distance+e.offsetY+y;
        	for(var i=0;i<allnum;i++){
	        		all[i] = oneheight/2+i*oneheight;
	        	}

        	if(y<0){
        		
	        	for(var index in all){
	        		if(mousetopdis<all[index]){
	        			var obj = index;
	        			break;
	        		}
	        	}
	        

 				parent.insertBefore(alllable.find('li').eq(obj));
    
        	}
        	/*标签往上移*/

	        if(y>0){
	        	
	        	for(var i=all.length-1;i>=0;--i){
	        		if(mousetopdis>all[i]){
	        			var obj = i;
	        			break;
	        		}

	        	}

	        	parent.insertAfter(alllable.find('li').eq(obj));
	        

	        }
	        /*标签往下*/
	        if(y = 0){
	        	return false;
	        }


        	/*属性值的一些设置*/
        	if(ishrefnull == false){
        		thislable[0].setAttribute('href',hrefattr);
        	}

        	alllable.removeAttr('style');
        	parent.removeAttr('style');

			

		}
		

	})



})