export function Route(map, platform, routeOptions) {
    const router = platform.getRoutingService();
    const onSuccess = function (result) {
        if (result.response.route) {
            let routes = result.response.route;
            routes.forEach((route) => drawRoute(map, route));
            // map.setViewBounds(routeLine.getBounds());
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

function drawRoute(map, route) {
    let routeShape = route.shape;
    let strip = new window.H.geo.Strip();

    routeShape.forEach(function (point) {
        var parts = point.split(',');
        strip.pushLatLngAlt(parts[0], parts[1]);
    });

    let routeLine = new window.H.map.Polyline(strip, {
        style: {
            strokeColor: 'blue',
            lineWidth: 3
        }
    });

    map.addObject(routeLine);
}