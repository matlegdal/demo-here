import React, { Component } from 'react';
import './Map.css';
import * as env from './env';
import { Route, coordsToWaypointString } from './Route';

export default class Map extends Component {
    constructor(props) {
        super(props);
        this.platform = new window.H.service.Platform({
            app_id: env.APP_ID,
            app_code: env.APP_CODE
        });
        this.defaultLayers = this.platform.createDefaultLayers();
        this.state = {
            currentPos: null,
            currentPosMarker: null
        };

        // Bindings des méthodes
        this.updatePosition = this.updatePosition.bind(this);
    }

    componentDidMount() {
        let pos = { lat: 46.830545, lng: -71.306222 };
        try {
            pos = navigator.geolocation.getCurrentPosition();
        } catch (err) {
            pos = { lat: 46.830545, lng: -71.306222 };
        }

        const map = new window.H.Map(document.getElementById('map'), this.defaultLayers.normal.map, { zoom: 15, center: pos });
        const mapEvents = new window.H.mapevents.MapEvents(map);
        const behavior = new window.H.mapevents.Behavior(mapEvents);
        const ui = window.H.ui.UI.createDefault(map, this.defaultLayers, 'fr-FR');
        const router = this.platform.getRoutingService();
        this.setState({ map, mapEvents, behavior, ui, router });

        // Permet le resizing
        window.addEventListener('resize', () => map.getViewPort().resize());

        // add marker to current position and watch the position
        navigator.geolocation.watchPosition(this.updatePosition);
    }

    addMarker(map, pos) {
        const marker = new window.H.map.Marker(pos);
        map.addObject(marker);
        return marker;
    }

    updatePosition(evt) {
        const pos = { lat: evt.coords.latitude, lng: evt.coords.longitude };
        this.setState({ currentPos: pos });
        // add marker
        if (this.state.currentPosMarker) {
            this.state.map.removeObject(this.state.currentPosMarker);
        }
        this.setState({ currentPosMarker: this.addMarker(this.state.map, pos) });
        this.state.map.setCenter(pos);
        // add route
        const home = { lat: 46.758685, lng: -71.293526 };
        if (!this.state.routes) {
            this.drawRoute(home);
        }
    }

    drawRoute(toCoords, fromCoords = this.state.currentPos, routeOptions = { mode: 'fastest;car', representation: 'display', alternatives: 2 }) {
        // add marker to destination 
        this.addMarker(this.state.map, toCoords);
        // draw route
        routeOptions['waypoint0'] = coordsToWaypointString(fromCoords);
        routeOptions['waypoint1'] = coordsToWaypointString(toCoords);
        this.setState({ routes: new Route(this.state.map, this.platform, routeOptions) });
    }

    render() {
        return (
            <div id="map"></div>
        );
    }
}