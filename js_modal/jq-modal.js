-(function(){
	var Modal = function(){},modal
	var version = 2.0;
	var call;
	Modal.prototype = {
		init:function(str){
			this.createEntity(str);
		},
		createEntity:function(str){
			var bg = document.createElement('div');
			bg.id = 'GrewerModal'
			bg.style.position = 'fixed'
			bg.style.top = 0
			bg.style.right = 0
			bg.style.bottom = 0
			bg.style.left = 0;
			bg.style.zIndex = 9998;
			bg.style.backgroundColor = 'rgba(0, 0, 0,0.6)';
			document.body.appendChild(bg);
			this.addListen(bg);


			var E = document.createElement('div');
			E.style.opacity = 1;
			E.style.position = 'relative';
			E.style.boxSizing = 'boder-box';
			E.style.margin = '50px auto';
			E.style.padding = '20px';
			E.style.width = '600px';
			E.style.backgroundColor = '#fff';
			E.style.zIndex = 9999;
			E.style.borderRadius = '4px'
			bg.appendChild(E);

			var close  = document.createElement('button');
			close.innerText = 'x';
			close.style.border = 'none'
			close.style.overflow = 'visible'
			close.style.font = 'inherit'
			close.style.color = 'inherit'
			close.style.textTransform = 'none';
			close.style.padding = 0;
			close.style.background = 0;
			close.style.display = 'inline-block'
			close.style.boxSizing = 'content-box'
			close.style.width = '20px'
			close.style.lineHeight = '20px'
			close.style.textAlign = 'middle'
			close.style.opacity = '0.3'
			close.style.float = 'right'
			close.style.margin = '-10px -10px 0 0'
			close.style.cursor = 'pointer'
			close.style.outline = 0
			E.appendChild(close);
			this.addListen(close);

			var head = document.createElement('div');
			head.style.margin = '-20px -20px 15px -20px'
			head.style.padding = '20px'
			head.style.borderBottom = '1px solid #e5e5e5'
			head.style.borderRadius = '4px 4px 0 0'
			E.appendChild(head);

			var h = document.createElement('h2');
			h.innerText = str;
			head.appendChild(h);

			var button = document.createElement('button');
			button.innerText = '确定';
			button.style.cursor = 'pointer';
			button.style.backgroundColor = 'rgb(0, 175, 242)';
			button.style.color = '#fff';
			button.style.borderBottonColor = 'rgba(0,0,0,.4)'
			button.style.textShadow = '0 -1px 0 rgba(0,0,0,.2)';
			button.style.textAlign = 'center'
			button.style.margin = 'auto';
			button.style.overflow = 'visible';
			button.style.font = 'inherit';
			button.style.textTransform = 'none'
			button.style.display = 'block';
			button.style.boxSizing = 'border-box'
			button.style.padding = '0 12px'
			button.style.verticalAlign = 'middle'
			button.style.lineHeight = '28px';
			button.style.minHeight = '30px';
			button.style.fontSize = '1rem'
			button.style.textDecoration = 'none'
			button.style.border = '1px solid rgba(0,0,0,.2)'
			button.style.borderRadius = '4px'
			button.style.backgroundOrigin = 'border-box';
			button.style.outline = 0;
			E.appendChild(button);
			this.addListen(button);
		},
		addListen:function(obj){
			obj.addEventListener('click',function(ev){
				if(ev.target.id === 'GrewerModal' || ev.target.innerText === 'x' || ev.target.innerText === '确定'){
                    ev.stopPropagation();
					$('#GrewerModal').hide();
					call && call();
					call = null;
                }
			},false)
		},
		show:function(str){
			$('#GrewerModal').show().find('h2').text(str);
		},

	}
	$.extend({
		alertMSG:function(str,callback){
			str = str || '';
			call = callback;
			return typeof modal == 'object' ? modal.show(str):(modal = new Modal,modal.init(str));
		}
	})
})()