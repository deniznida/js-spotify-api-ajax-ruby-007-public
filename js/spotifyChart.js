function init(){
  getSpotifyTracks(function(parsed_json) {
    var tracks = extractTop20Tracks(parsed_json.tracks);
    var ctx = $("#SpotifyChart").get(0).getContext("2d");
    var myLineChart = new Chart(ctx).Bar(chartData(extractNames(tracks), extractNumberOfStreams(tracks)), {});
  });
}

$(document).ready(function() {
  init();
});

function getSpotifyTracks(funktion) {
	$.ajax({
		url: "http://charts.spotify.com/api/tracks/most_streamed/global/daily/latest",
		jsonp: "callback",
		dataType: "jsonp",
		data: {

			q: "tracks",
			format: "json"
		}, 
		
		success: function(parsed_json){
			//console.log(responce);
			funktion(parsed_json);
		}
	})
}

function getSpotifyTracks(callback) {
	var url = "http://charts.spotify.com/api/tracks/most_streamed/us/weekly/latest?callback=?";
	$.getJSON(url, callback);
}

function extractTop20Tracks(allTheTracks){
	return allTheTracks.slice(0, 20);
}

function extractNumberOfStreams(tracks){
  return tracks.map(function(track){ //returns new array
		return track.num_streams	//returns tracks stream
	});
}

function extractNames(tracks){
	return tracks.map(function(track){
	// 	if (track.trackname.length > 40){
	// 		return track.track_name.substring(0, 38);
	// 	} else {
	// 		return track.track_name
	// 	}
		return track.track_name;
	})

}

function chartData(names, streams){
 var dataObject = {};
 dataObject.labels = names; 
 dataObject.datasets = [ 
                         {
                           label : 'Spotify Chart of Top 20 Streamed Songs on Spotify with their Steam Count', 
                           fillColor : 'rgba(220,220,220,0.5)',
                           strokeColor : 'rgba(220,220,220,0.8)',
                           highlightFill : 'rgba(220,220,220,0.75)',
                           highlightStroke : 'rgba(220,220,220,1)', 
                           data : streams
                         }
                       ]
 return dataObject
};







