import React, { Component } from 'react';
import './Map.css';
import * as env from './env';

export default class Map extends Component {
    constructor(props) {
        super(props);
        this.platform = new window.H.service.Platform({
            app_id: env.APP_ID,
            app_code: env.APP_CODE
        });
        this.defaultLayers = this.platform.createDefaultLayers();
        this.state = {
            zoom: 15,
            centerLocation: {
                lat: 46.830545,
                lng: -71.306222
            }
        };
    }

    componentDidMount() {
        const map = new window.H.Map(
            document.getElementById('map'),
            this.defaultLayers.normal.map,
            {
                zoom: this.state.zoom,
                center: this.state.centerLocation
            }
        );
        const mapEvents = new window.H.mapevents.MapEvents(map);
        const behavior = new window.H.mapevents.Behavior(mapEvents);
        this.setState({ map, mapEvents, behavior });
    }

    render() {
        return (
            <div id="map"></div>
        );
    }
}