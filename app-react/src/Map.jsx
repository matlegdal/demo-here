import React, { Component } from 'react';
import './Map.css';
import * as env from './env';
// import H from 'here-js-api/scripts/mapsjs-core';
// import 'here-js-api/scripts/mapsjs-service';

export default class Map extends Component {
    constructor(props) {
        super(props);
        this.platform = new window.H.service.Platform({
            app_id: env.APP_ID,
            app_code: env.APP_CODE
        });
        this.defaultLayers = this.platform.createDefaultLayers();
    }

    componentDidMount() {
        this.map = new window.H.Map(
            document.getElementById('map'),
            this.defaultLayers.normal.map,
            {
                zoom: 10,
                center: { lat: 52.5, lng: 13.4 }
            }
        );
    }

    render() {
        return (
            <div id="map"></div>
        );
    }
}