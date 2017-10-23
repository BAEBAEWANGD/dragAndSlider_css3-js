const data = [
  {index:1},
  {index:2},
  {index:3},
  {index:4},
  {index:5},
  {index:6}
];
function g(idClass) {
	let method = idClass.substr(0,1) === '.' ? 'getElementsByClassName'
	                                         : 'getElementById';
	return document[method](idClass.substr(1)); 
}
function addSlider(){
	const tpl_main = g('#main-content').innerHTML
	                             .replace(/^\s*/,'')
	                             .replace(/\s*$/,'');
	const tpl_ctrl = g('#ctrl-content').innerHTML
	                             .replace(/^\s*/,'')
	                             .replace(/\s*$/,'');
	let out_main = [];
	let out_ctrl = [];
	for(let i in data){
		const _content_main = tpl_main.replace(/{{index}}/g,data[i].index);
		const _content_ctrl = tpl_ctrl.replace(/{{index}}/g,data[i].index);

		out_main.push(_content_main);
		out_ctrl.push(_content_ctrl);
	}
	g('#main-content').innerHTML = out_main.join('');
	g('#ctrl-content').innerHTML = out_ctrl.join('');
}
window.onload = function(){
	addSlider();
	// g('#main-1').className += ' main-active';
	// g('#ctrl-1').className += ' ctrl-active';
	switchButton(1);
}

//click circle clear timer
// g('.ctrl-i').onclick = function(){
// 	window.clearInterval(timer);
// }
// //onclick event maopao
g('#ctrl-content').onclick = function(){
		window.clearInterval(timer);
}

function switchButton(index){
	// window.clearInterval(timer);
	let ctrl = g('#ctrl-' + index);
	let main = g('#main-' + index);

	const clear_main = g('.main-i');
	const clear_ctrl = g('.ctrl-i');
	for(let i = 0; i < clear_ctrl.length; i++){
		clear_main[i].className = clear_main[i].className.replace(/main-active/,'');
		clear_ctrl[i].className = clear_ctrl[i].className.replace(/ctrl-active/,'');
	}
	ctrl.className += ' ctrl-active';
	main.className += ' main-active';
}
// let i = Number(g('.ctrl-active')[0].id.split('')[Number(g('.ctrl-active')[0].id.split('').length) - 1]);
// let i = Number(g('.ctrl-active')[0].id.substr(length-1));
// 
// 
let i = 1;
//onclick change picture
g('#ctrl-left').onclick = function(){
	i = Number(g('.ctrl-active')[0].id.substr(length-1));
	if( i === 1 ){
		switchButton(data.length);
		i = data.length;
	}else{
		switchButton(i-1);
		i--;
	}
	window.clearInterval(timer);
}
g('#ctrl-right').onclick = function(){
	i = Number(g('.ctrl-active')[0].id.substr(length-1));
	if( i === data.length ){
		switchButton(1);
		i = 1;
	}else{
		switchButton(i+1);
		i++;
	}
	window.clearInterval(timer);
}

const timer = window.setInterval(autoChange,2000);
function autoChange(){
	if( i === data.length){
		i = 0;
	}else{
		switchButton(data[i].index);
		i++;
	}
}

// 再次重启定时器未实现
//mouseout restart run
//
// g('#slider').onmouseleave = function(){
// 	// setTimeout(function(){
// 	// 	timer = window.setInterval(autoChange,2000);	
// 	// },5000)
// 	timer = window.setInterval(autoChange,2000);
// }