function editpic(){
		var fileObj = document.getElementById("file").files;
          $('.container').show();
          // $('#readcrop').attr('src',fileObj.value);
          if (!window.FileReader) return;  
          
          
            for (var i = 0, f; f = fileObj[i]; i++) {    
      
          if (!f.type.match('image.*')) {    
              continue;    
          }    
          var reader = new FileReader();    
      
          reader.onload = (function(theFile) {    
      
              return function(e) {    
                  // img 元素  
                  document.getElementById('readcrop').src = e.target.result; 
                  resizeableImage($('.resize-image'));  
             	//editpic.js 的创建对象函数
              };    
      		
          })(f); 
           
          reader.readAsDataURL(f);  
	     }
}

function cancel(){
	$('.container').hide();
  $('.resize-image').siblings('span').remove();
  $('.resize-image').unwrap();

}

$(function(){
  $('#cli').click(function(){
  $('#file').click();
})
})

