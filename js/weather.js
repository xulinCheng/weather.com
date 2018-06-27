
$(function(){
	let weather;
	$.ajax({
		url: 'https://www.toutiao.com/stream/widget/local_weather/data/?city=太原',
		dataType: 'jsonp',
		success:function(obj){
			weather=obj.data.weather;
			console.log(weather);
			render();
		}
	})
	function render(){
		$('.city').html(weather.city_name);
		$('.current_temperature').html('&nbsp;'+weather.current_temperature+'°');
		$('.current_condition').html(weather.current_condition);
		$('.current_temperature1').html(weather.wind_direction);

		//aqi值
		$('.cen-num').html(weather.aqi);
		//aqi等级
		$('.cen-text').html(weather.quality_level);
		//今天的温度
		$('.tom-left-top span').eq(1).html(weather.dat_high_temperature+'/'+weather.dat_low_temperature+'°');
		//今天的天气
		$('.tom-left-bottom p').html(weather.dat_condition);
		$('.tom-left-bottom img').attr('src',`img/${weather.dat_weather_icon_id}.png`);
		//明天的温度
		$('.tom-right-top span').eq(1).html(weather.tomorrow_high_temperature+'/'+weather.tomorrow_low_temperature+'°');
		//明天的天气
		$('.tom-right-bottom p').html(weather.tomorrow_condition);
		$('.tom-right-bottom img').attr('src',`img/${weather.tomorrow_weather_icon_id}.png`);
		
		//全天24小时天气状况
		weather.hourly_forecast.forEach((e,i)=>{
			let str=`<li class="list">
                    <span class="time">${e.hour}:00</span>
                    <img src="img/${e.weather_icon_id}.png" alt="">
                    <p class="">${e.temperature}°</p>
                </li>`
            $('.contain ul').append(str);
		})
		//未来两周的天气
		weather.forecast_list.forEach((e,i)=>{
			console.log(e);
			let month=e.date.slice(5,7);
			let day=e.date.slice(8,10);
			/*console.log(month,day);*/
			let str=`<li class="list1">
                    <span class="time">${month}/${day}</span>
                    <span class="weather">${e.condition}</span>
                    <img src="img/${e.weather_icon_id}.png" alt="" >
                    <p class="high_temperature">${e.high_temperature}°</p>
                    <p class="low_temperature">${e.low_temperature}°</p>
                    <span class="weather-lever">${e.wind_direction}</span>
                    <span class="lever">${e.wind_level}级</span>
                </li>`
            $('.contain2 ul').append(str);
		})
	}
	render();
})