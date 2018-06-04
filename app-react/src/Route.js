export class Route {
    constructor(map, platform, routeOptions) {
        this.router = platform.getRoutingService();
        this.router.calculateRoute(routeOptions, (result) => this.onSuccess(map, result), (err) => this.onError(map, err));
    }

    onSuccess(map, result) {
        if (result.response.route) {
            let routeLineGroup = new window.H.map.Group();
            this.routes = result.response.route.map(route => {
                let routeLine = drawRoute(map, route);
                routeLineGroup.addObject(routeLine);
                return {
                    route,
                    routeLine
                };
            });
            map.addObject(routeLineGroup);
            map.setViewBounds(routeLineGroup.getBounds());
        }
    }

    onError(map, err) {
        console.error('error', err);
    }
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

    let routeLine = new window.H.map.Polyline(strip);

    return routeLine;
}