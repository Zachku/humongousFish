<script type="text/javascript" src="http://maps.google.com/maps/api/js?sensor=true"></script>
<script type="text/javascript">
    var loadMap = function() 
    {
        var myOptions = {
          center: { lat: <%- catch1.coordLatitude %>, lng: <%- catch1.coordLongitude %>},
          zoom: 5,
          mapTypeId: google.maps.MapTypeId.ROADMAP
        };
        var map = new google.maps.Map(document.getElementById("mapCanvas"),
            myOptions);
        var myLatLng = new google.maps.LatLng(
        	<%- catch1.coordLatitude %>,
          	<%- catch1.coordLongitude %>);
        var marker = new google.maps.Marker({
	    	position: myLatLng,
	    	map: map,
	    	draggable:true,
	    	title:"Catch"
		});

		google.maps.event.addListener(marker, 'dragend', function() 
		{
		    var latitudeField = document.getElementById("coordLatitude");
			latitudeField.value = marker.getPosition().lat();
			var longitudeField = document.getElementById("coordLongitude");
			longitudeField.value = marker.getPosition().lng();
			document.getElementById("submitCatch").click();
		});
    };
    window.onload= loadMap;
</script>