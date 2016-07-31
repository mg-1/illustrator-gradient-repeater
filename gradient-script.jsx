if (app.activeDocument.selection.length < 2) {

	alert("Please select two or more paths with fills.");

} else {

	var cycles = Number(prompt ("Repeat the gradient how many times?")) || 5;  
	var myselection = app.activeDocument.selection;
	var colors = [];

	for (var i = 0; i < myselection.length; i++) {
		var newColor = myselection[i].fillColor;
		colors.push(newColor);
	}

	var stops = colors.length * cycles - 1; // “stops” does not include default 2 stops
	var interval = 100 / (cycles * colors.length); // ... the distance between stops

	var newGradient = app.activeDocument.gradients.add();  

	newGradient.type = GradientType.LINEAR;     // asymmetric, for 3 or more colours
	//newGradient.type = GradientType.RADIAL;   // symmetric, for 3 or more colours

	//  the default 2 gradient stops (at beginning and end)
	//  should be the same colour, so that the gradient smoothly wraps around:
	newGradient.gradientStops[0].color = colors[0]; 
	newGradient.gradientStops[1].color = colors[0]; 

	// now add stops between beginning and end stops:
	for ( i = 1; i <= stops; i++ ) {

		var thisStop = newGradient.gradientStops.add();
		thisStop.rampPoint = i * interval;
		thisStop.color = colors[i % colors.length];

	}

	// to get an even result, the first and last rampPoints cannot be 0 and 100:
	newGradient.gradientStops[0].rampPoint = 0.1;
	newGradient.gradientStops[stops + 1].rampPoint = 99.9;
}
