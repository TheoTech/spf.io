var translations = 0;

var get_num_translated = function(){
	return $('select').eq(0).find('option').length - 1;
};

var add_translation = function(){
	var languages = $('.modal-content').eq(1).find('option').length;
	console.log(languages);
	if(languages > 0){
		$('[aria-label="Add translation"]').eq(0).click();
		wait_for_translation();
	}else{
		add_button();
	};
};

var remove_translation = function(){
	$('.modal-content li').eq(0).children().eq(0).click();
};

var wait_for_translation = function(){
	if(get_num_translated() > translations){
		translations = get_num_translated();
		setTimeout(add_translation, 1000);
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

var auto_bulk_translate = function(){
	var translations = 0;
	remove = $('.modal-content li').length;
	for(i = 0; i < remove; i++){remove_translation()};
	wait_for_clear();
};

var add_button = function(){
	buttons = document.getElementsByClassName('btn-group')[0].getElementsByTagName('button');
	buttons[2].insertAdjacentHTML('afterend', '<button id="bulkautotranslate" class="btn btn-default"><span class="fa fa-language"></span></button>');
	document.getElementById("bulkautotranslate").addEventListener("click", auto_bulk_translate);
};

add_button();
