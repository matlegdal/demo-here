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
            markers: [],
            currentPos: null
        };

        // Bindings des méthodes
        this.updatePosition = this.updatePosition.bind(this);
    }

    componentDidMount() {
        const fujitsu = { lat: 46.830545, lng: -71.306222 };
        const map = new window.H.Map(document.getElementById('map'), this.defaultLayers.normal.map, { zoom: 15, center: fujitsu });
        const mapEvents = new window.H.mapevents.MapEvents(map);
        const behavior = new window.H.mapevents.Behavior(mapEvents);
        const ui = window.H.ui.UI.createDefault(map, this.defaultLayers, 'fr-FR');
        const router = this.platform.getRoutingService();
        this.setState({ map, mapEvents, behavior, ui, router });

        // Permet le resizing
        window.addEventListener('resize', () => map.getViewPort().resize());

        // Add a marker to fujitsu
        this.addMarker(map, fujitsu);

        // add marker to current position
        navigator.geolocation.watchPosition(this.updatePosition);
    }

    addMarker(map, pos) {
        const marker = new window.H.map.Marker(pos);
        map.addObject(marker);
        let markers = this.state.markers.slice();
        markers.push(marker);
        this.setState({ markers });
    }

    updatePosition(evt) {
        const pos = { lat: evt.coords.latitude, lng: evt.coords.longitude };
        this.setState({ currentPos: pos });
        this.addMarker(this.state.map, pos);
        this.state.map.setCenter(pos);
        
        new Route(this.state.map, this.platform, {
            mode: 'fastest;car',
            representation: 'display',
            'waypoint0': coordsToWaypointString(pos),
            'waypoint1': coordsToWaypointString({ lat: 45.830545, lng: -71.306222 })
        });
    }

    render() {
        return (
            <div id="map"></div>
        );
    }
}