<script type="text/javascript" src="http://maps.google.com/maps/api/js?sensor=true"></script>
        <script type="text/javascript">
            var loadMap = function() 
            {
                var myOptions = {
                  center: new google.maps.LatLng(3, 3),
                  zoom: <%=zoom%>,
                  mapTypeId: google.maps.MapTypeId.ROADMAP
                };
                var map = new google.maps.Map(document.getElementById("map"),
                    myOptions);
            };
            window.onload= loadMap;
        </script>