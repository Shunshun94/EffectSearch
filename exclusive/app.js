


var invertedIndex;
if(com.hiyoko.dx3.search.invertedIndex){
	invertedIndex = com.hiyoko.dx3.search.invertedIndex;
} else {
	invertedIndex = com.hiyoko.dx3.search.util.generateInvertedIndexFromJson(com.hiyoko.dx3.search.effectList);
}

search = new com.hiyoko.dx3.search.Search(invertedIndex, com.hiyoko.dx3.search.effectList, [
	new com.hiyoko.dx3.search.option.OptionBox(
		"effect-search-search-options-syndrome",
		"シンドローム", com.hiyoko.dx3.search.EffectUtil.Syndromes
	),
	new com.hiyoko.dx3.search.option.OptionBox(
		"effect-search-search-options-skill",
		"技能", com.hiyoko.dx3.search.EffectUtil.Skills
	)
	]);

$("#effect-search-search-input-exec").click(function(e){
	var searchWord = $("#effect-search-search-input-word").val();
	if(searchWord.trim() === ""){return;}
	$("#effect-search-search-result").empty();
	var $block = $("<div></div>");
	var list = search.search(searchWord);
	search.eachEffects(list, function(effect){
		$block.append(com.hiyoko.dx3.search.EffectUtil.EffectToTable(effect));
	});
	$("#effect-search-search-result").append($block);
});

$("#effect-search-search-input-exec-all").click(function(e){
	$("#effect-search-search-result").empty();
	var $block = $("<div></div>");
	var list = search.search("全件表示");
	search.eachEffects(list, function(effect){
		$block.append(com.hiyoko.dx3.search.EffectUtil.EffectToTable(effect));
	});
	$("#effect-search-search-result").append($block);
});

$("#effect-search-search-options-button").click(function(e){
	$("#effect-search-search-options-button").hide();
	$("#effect-search-search-options").show(300);
});
$("#effect-search-search-options-button-close").click(function(e){
	$("#effect-search-search-options-button").show();
	$("#effect-search-search-options").hide();	
});
