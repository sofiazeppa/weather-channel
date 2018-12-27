$.ajax({
	url: 'https://api.openweathermap.org/data/2.5/weather?q=Buenos%20Aires&appid=95176c8edea30e33338e0eaddd53a916&units=metric&lang=es',
	success: function(data){
		$(".city-name").append(data.name)
		let rise = new Date(data.sys.sunrise * 1000).toLocaleTimeString()
		let set = new Date(data.sys.sunset * 1000).toLocaleTimeString()
		$(".city-conditions").append(`
			<p>Temperatura actual: ${data.main.temp}</p>
			<p>Temperatura maxima: ${data.main.temp_max}</p>
			<p>Temperatura minima: ${data.main.temp_min}</p>
			<p>Condiciones actuales: ${data.weather[0].description}</p>
			<p>Velocidad del viento: ${data.wind.speed} km/h</p>
			<p>Amanecer: ${rise} am</p>
			<p>Atardecer: ${set} pm</p>
		`)
	}
})

// input
$("input[type='text']").keypress( function(event) {
	if (event.key == "Enter") {
		$(".city-conditions").empty()
		$(".city-name").empty()
		$(".message").empty()
		$.ajax({
	  		url: 'https://api.openweathermap.org/data/2.5/weather?q='+$(this).val()+'&appid=95176c8edea30e33338e0eaddd53a916&units=metric&lang=es',
	  		beforeSend: function() {
				$(".message").text("Espere...")
			},
	  		success: function(data) {
				$(".city-name").append(data.name)
				$(".message").remove()
			  	let rise = new Date(data.sys.sunrise * 1000).toLocaleTimeString()
				let set = new Date(data.sys.sunset * 1000).toLocaleTimeString()
				$(".city-conditions").append(`
					<p>Temperatura actual: ${data.main.temp}</p>
					<p>Temperatura maxima: ${data.main.temp_max}</p>
					<p>Temperatura minima: ${data.main.temp_min}</p>
					<p>Condiciones actuales: ${data.weather[0].description}</p>
					<p>Velocidad del viento: ${data.wind.speed} km/h</p>
					<p>Amanecer: ${rise} am</p>
					<p>Atardecer: ${set} pm</p>
				`)
			},
			error: function() {
				$(".message").text("Ciudad invalida, ingrese una diferente")
			}
		})		
		$(this).val("")
	}
})

