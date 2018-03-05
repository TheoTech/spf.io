// this is the code which will be injected into a given page...

(function() {

	var translations = 0;

	var open_dialog = function(){
		if(document.getElementById('addTranslationModal').style.display != 'block'){
			document.querySelectorAll('[title="Add translation"]')[0].click();
		};
	};

	var close_dialog = function(){
		if(document.getElementById('addTranslationModal').style.display != 'none'){
			document.querySelectorAll('[aria-label="Add translation"]')[0].parentElement.getElementsByTagName('button')[0].click();
		};
	};

	var get_num_translated = function(){
		return document.getElementsByTagName('select')[0].getElementsByTagName('option').length - 1;
	};

	var add_translation = function(){
		open_dialog();
		try{
			var languages = document.getElementsByClassName('modal-content')[1].getElementsByTagName('option').length;
		}catch(e){
			var languages = 0;
		};
		console.log(languages);
		if(languages > 0){
			document.querySelectorAll('[aria-label="Add translation"]')[0].click();
			wait_for_translation();
		}else{
			close_dialog();
		};
	};

	var remove_translation = function(){
		document.getElementsByClassName('modal-content')[1].getElementsByTagName('li')[0].getElementsByTagName('span')[0].click();
	};

	var wait_for_translation = function(){
		if(get_num_translated() > translations){
			translations = get_num_translated();
			setTimeout(add_translation, 500);
		}else{
			setTimeout(wait_for_translation, 100);
		};
	};

	var wait_for_clear = function(){
		if(get_num_translated() > 0){
			setTimeout(wait_for_clear, 100);
		}else{
			add_translation();
		};
	};		

	try{
		var remove = document.getElementsByClassName('modal-content')[1].getElementsByTagName('li').length;
	}catch(e){
		var remove = 0;
	};

	open_dialog();

	for(i = 0; i < remove; i++){
		remove_translation();
	};

	wait_for_clear();

})();
