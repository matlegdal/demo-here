export function Route(map, platform, routeOptions) {
    const router = platform.getRoutingService();
    const onSuccess = function (result) {
        var route,
            routeShape,
            strip;

        if (result.response.route) {
            route = result.response.route[0];
            routeShape = route.shape;

            strip = new window.H.geo.Strip();

            routeShape.forEach(function (point) {
                var parts = point.split(',');
                strip.pushLatLngAlt(parts[0], parts[1]);
            });

            var routeLine = new window.H.map.Polyline(strip, {
                style: {
                    strokeColor: 'blue',
                    lineWidth: 10
                }
            });

            map.addObject(routeLine);

            map.setViewBounds(routeLine.getBounds());
        }
    };
    const onError = function (err) {
        console.error('error', err);
    };

    router.calculateRoute(routeOptions, onSuccess, onError);
}

export function coordsToWaypointString(coords) {
    return `geo!${coords.lat},${coords.lng}`;
}