let view = (function(){
	let viewDependencies = [];
	let v = {
		//class view : manipulasi DOM pada HTML
		//clear: ngosongin dokumen HTML dg class target
		//add: nambahin dokumen HTML dg class target 
		//		ke array viewDependencies dg index target
		//		yg nantinya digunain di fungsi appendData() / appendArray()
		//applyData: iterasi thd property yg ada di dalam data dan
		//				menipulasi DOM HTML
		//appendData: iterasi thd property yg ada di dlm data dan
		//				nambahin dokumen html sesuai dg template yg dipilih
		clear: function(target){
			let targetDiv = $('.'+target);
			targetDiv.parent().empty();
		},
		applyData: function(target, data){
			let targetDiv = $('.' + target);
			for(let property in data){
				switch(data[property]['type']){
					case 'innerHTML':
						$(targetDiv).find('#' + property).html(data[property]['content'])
						break
					case 'styleBackground':
						let backgroundUrl = 'url("' + data[property]['content'];
						$(targetDiv).find('#' + property).css('background-image',backgroundUrl)
						break
					case 'imageSrc':
						$(targetDiv).find('#' + property).attr('src',data[property]['content']);
				}
			}
		},
		appendData: function(target, data, template){
			let targetDiv = $('.' + target);
			let html = $.parseHTML(viewDependencies[template]);
			for(let property in data){
				switch(data[property]['type']){
					case 'innerHTML':
						$(html).find('#' + property).html(data[property]['content'])
						break
					case 'imageSrc':
						$(html).find('#' + property).attr('src',data[property]['content']);
				}
			}
			$(targetDiv).append(html);
		},
		appendArray: function(target, arr, template){
			/*if (template == 'singleSlider' && idx == 0) {
				idx++
				$('.' + target).find('.' + template).addClass('active')
			}*/
			for(property in arr){
				v.appendData(target,arr[property],template)
				if(template == 'singleSlider' && property == 0){
					property++
					$('.'+target).find('.'+template).addClass('active')
				}
			}
		},
		add: function(target){
			let targetDiv = $('.'+target);
			viewDependencies[target] = $(targetDiv).parent().html();
			v.clear(target);
		}
	}
	return v;
})

let factory = (function(){
	//class factory : utk asynchronous request thd data json
	//					yg ada di folder data yg diextract dr file pendukung
	let dataDependencies = [];
	let f = {
		getData: function(url, callback, args){
			$.get(url, function(data){
				if (callback !== undefined) {
					if (args.length > 1) {
						callback(args[0],data,args[1]);
					}else{
						callback(args[0],data);
					}
				}
			})
		}
	}
	return f;
})

let app = (function(){
	return{
		ready: function(){
			this.configure();
			this.factory.getData(
				'data/applicationHeader.json',
				this.view.applyData,
				['applicationHeader'])
			this.factory.getData(
				'data/libnref.json',
				this.view.appendArray,
				['developers','singleDeveloper'])
		},
		configure: function(){
			this.view.add('singleDeveloper')
		},
		view: new view(),
		factory: new factory()
	}
}) ();

