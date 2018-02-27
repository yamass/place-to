(function (place) {
	const template = '<div class="source-element-container"><div class="source-element"></div></div> <div class="target-element-container"> <div class="target-element"></div> </div>';
	var test = function (id, exampleClass, elementCorner, targetCorner) {
		var $div = document.createElement("div");
		$div.id = id;
		$div.setAttribute("data-description", elementCorner + "-->" + targetCorner);
		$div.classList.add("example");
		$div.classList.add(exampleClass);
		$div.innerHTML = template;
		document.body.appendChild($div);

		var $example = $div.querySelector("#" + id + " .source-element");
		var otherElement = document.querySelector("#" + id + " .target-element");
		place($example, elementCorner).to(otherElement, targetCorner);
	};

	var corners = [
		"top left", "top center", "top right",
		"center left", "center center", "center right",
		"bottom left", "bottom center", "bottom right"
	];

	for (var i = 0; i< corners.length; i++) {
		for (var j = 0; j < corners.length; j++) {
			var elementCorner = corners[i];
			var targetCorner = corners[j];
			test("normalExample" + (i * corners.length + j), "normal", elementCorner, targetCorner);
		}
	}

	document.body.appendChild(document.createElement("hr"));

	for (var i = 0; i< corners.length; i++) {
		for (var j = 0; j < corners.length; j++) {
			var elementCorner = corners[i];
			var targetCorner = corners[j];
			test("cssGridExample" + (i * corners.length + j), "css-grid", elementCorner, targetCorner);
		}
	}
	
})(window.placeTo.place);

