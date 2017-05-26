(function(w){
        w.g = g = {};
        G = function(){};
                g.version = 1.0;
        g.get = function(url,arr){
            if(typeof arr !== "object"){
                console.error('数据错误,需要数据对象');
                return;
            }
            var convarr = g.convarr(arr);
            var g_get = new G();
            g_get.get(url+'?'+convarr);
            return g_get;
        }
 
 
         
        g.post = function(url,data){
            if(typeof data !== "object"){
                console.error('数据错误,需要数据对象');
                return;
            }
            var convarr = g.convarr(data);
            var g_post = new G();
            g_post.post(url,convarr);
            return g_post;
        }
        g.convarr = function(data){
            var convarr = "" ;  
            for(var c in data){  
              convarr+= c + "=" + data[c] + "&";  
            }
            convarr=convarr.substring(0,convarr.length-1);
            return convarr;
        }
         
        G.prototype = {
            constructor: 'G',
            get:function(url,arr){
                this.p = new Pro();
                var thisG = this;
                var p = this.p;
                var obj=new XMLHttpRequest();
                obj.open('GET',url,true);
                obj.send(null);
                obj.onreadystatechange=function(){
                    if (obj.readyState == 4){ 
                        if(obj.status == 200){
                            p.done(thisG.success,obj.responseText);
                            p.resolve();
                        }else{
                            p.fail(thisG.fail,obj.responseText);
                            p.reject();
                        }
                    }
                };
                return this;
            },
            post:function(url,data){
                this.pp = new Pro();
                var thisG = this;
                var p = this.pp;
                var obj = new XMLHttpRequest();
                obj.open("POST", url, true);
                obj.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
                obj.send(data);
                obj.onreadystatechange = function () {
                    if (obj.readyState == 4){ 
                        if(obj.status == 200){
                            p.done(thisG.success,obj.responseText);
                            p.resolve();
                        }else{
                            p.fail(thisG.fail,obj.responseText);
                            p.reject();
                        }
                    }
                }
            },
            success:function(callback){
                this.success = callback;
                return this;
            },
            fail:function(callback){
                this.fail = callback;
                return this;
            }
             
             
        }
         
      
 
        var Pro = function() {
            this.doneList = {fun:[],data:[]};
            this.failList = {fun:[],data:[]};
            this.state = 'pending';
             
        };
 
        Pro.prototype = {
            constructor: 'Pro',
            resolve: function() {
                this.state = 'resolved';
                var list = this.doneList.fun;
                var data = this.doneList.data;
                for(var i = 0, len = list.length; i < len; i++) {
                    list[0].call(this,data[0]);
                    list.shift();
                    data.shift();
                }
            },
            reject: function() {
                this.state = 'rejected';
                var list = this.failList.fun;
                var data = this.failList.data;
                for(var i = 0, len = list.length; i < len; i++){
                    list[0].call(this,data[0]);
                    list.shift();
                    data.shift();
                }
            },
            done: function(func,data) {
                if(typeof func === 'function') {
                    this.doneList.fun.push(func);
                }
                var data = data || '';
                this.doneList.data.push(data);
                return this;
            },
            fail: function(func,data) {
                if(typeof func === 'function') {
                    this.failList.fun.push(func);
                }
                var data = data || '';
                this.failList.data.push(data);
                return this;
            }
        };
    })(window);
