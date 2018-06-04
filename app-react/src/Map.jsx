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

        // positions to fake movements
    
        // Bindings des méthodes
        this.updatePosition = this.updatePosition.bind(this);
        this.fakeTracker = this.fakeTracker.bind(this);
    }

    componentDidMount() {
        let pos = { lat: 46.830545, lng: -71.306222 };
        const map = new window.H.Map(document.getElementById('map'), this.defaultLayers.normal.map, { zoom: 15, center: pos });
        const mapEvents = new window.H.mapevents.MapEvents(map);
        const behavior = new window.H.mapevents.Behavior(mapEvents);
        const ui = window.H.ui.UI.createDefault(map, this.defaultLayers, 'fr-FR');
        this.setState({ map, mapEvents, behavior, ui });

        // Permet le resizing
        window.addEventListener('resize', () => map.getViewPort().resize());

        // add marker to current position and watch the position
        // navigator.geolocation.getCurrentPosition(this.updatePosition);
        // navigator.geolocation.watchPosition(this.updatePosition);
        this.fakeTracker();
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
        if(this.state.routes){
            this.state.map.removeObject(this.state.routes.routeLineGroup);
        }
        const home = { lat: 46.758685, lng: -71.293526 };
        this.drawRoute(home);
    }

    fakeUpdatePosition(pos) {
        this.setState({ currentPos: pos });
        // add marker
        if (this.state.currentPosMarker) {
            this.state.map.removeObject(this.state.currentPosMarker);
        }
        this.setState({ currentPosMarker: this.addMarker(this.state.map, pos) });
        this.state.map.setCenter(pos);
        // add route
        if(this.state.routes){
            this.state.map.removeObject(this.state.routes.routeLineGroup);
        }
        const home = { lat: 46.758685, lng: -71.293526 };
        this.drawRoute(home);
    }

    fakeTracker() {
        let self = this;
        let i = 0;
        let positions = ["46.8300179,-71.3066824", "46.8299103,-71.3071275", "46.8298781,-71.3077497", "46.8298137,-71.3080287", "46.8297172,-71.3074279", "46.829803,-71.3069451", "46.8299747,-71.306355", "46.8302214,-71.3057864", "46.8304574,-71.305443", "46.8306613,-71.3052392", "46.8307149,-71.3050246", "46.8307042,-71.3046813", "46.8305004,-71.3043487", "46.8284619,-71.3024926", "46.8276572,-71.301688", "46.8267453,-71.3008082", "46.8251467,-71.2992954", "46.8246317,-71.2988341", "46.824224,-71.2985015", "46.8150187,-71.2898755", "46.8145144,-71.2894678", "46.8143427,-71.2893605", "46.813935,-71.2891781", "46.8136132,-71.2890816", "46.8134093,-71.2890387", "46.8131948,-71.2890279", "46.8127871,-71.2890494", "46.8120468,-71.2891781", "46.8082058,-71.2899184", "46.806972,-71.2901759", "46.8066823,-71.290251", "46.805867,-71.290369", "46.8055987,-71.290369", "46.8052554,-71.2903368", "46.8050516,-71.2902939", "46.8048155,-71.2902296", "46.8046653,-71.2901652", "46.8041182,-71.2898648", "46.8038821,-71.2897038", "46.8034959,-71.2893498", "46.8032598,-71.2891138", "46.8030024,-71.2887812", "46.8023479,-71.2877405", "46.8021548,-71.2874079", "46.8017578,-71.2869573", "46.8014359,-71.2866783", "46.8009317,-71.286335", "46.8005669,-71.2861848", "46.8003201,-71.2861097", "46.8000948,-71.2860668", "46.7998803,-71.2860453", "46.7994833,-71.286056", "46.7992151,-71.2861097", "46.7986143,-71.2863457", "46.7983031,-71.2865388", "46.7978203,-71.2868714", "46.7975521,-71.2870216", "46.7971981,-71.2872684", "46.7969835,-71.2874401", "46.7966723,-71.2876332", "46.7961144,-71.2879121", "46.7955565,-71.2880945", "46.7947197,-71.2883091", "46.794076,-71.2884271", "46.7925847,-71.288749", "46.7920053,-71.2889957", "46.7916512,-71.2892318", "46.7914581,-71.289382", "46.7911685,-71.2896609", "46.7905247,-71.2904119", "46.7903852,-71.2905514", "46.7901063,-71.2908089", "46.789881,-71.2909806", "46.789763,-71.291045", "46.7894089,-71.2911952", "46.7889798,-71.2913024", "46.7888188,-71.2913132", "46.7884862,-71.2913024", "46.7881322,-71.2912059", "46.7878103,-71.2910771", "46.7872953,-71.2907553", "46.7869949,-71.2904549", "46.7863834,-71.2896502", "46.7861688,-71.2893283", "46.7858362,-71.2888885", "46.7856431,-71.2886417", "46.7854714,-71.2884593", "46.7849135,-71.2879658", "46.7845488,-71.2876868", "46.7840552,-71.2872684", "46.7837226,-71.2869573", "46.7831862,-71.2864101", "46.7826927,-71.2858093", "46.782285,-71.2853479", "46.7809331,-71.2836957", "46.7806542,-71.2833631", "46.7803645,-71.2830627", "46.7791843,-71.281625", "46.7782402,-71.2805092", "46.7780471,-71.2803054", "46.7762768,-71.2782347", "46.7753112,-71.2771511", "46.774056,-71.27581", "46.7739058,-71.2755418", "46.773423,-71.2765181", "46.7708373,-71.281507", "46.7670929,-71.2888134", "46.7659664,-71.2909269", "46.7645073,-71.2938237", "46.7635095,-71.2926114", "46.7629945,-71.293577", "46.7629516,-71.2937164", "46.7629623,-71.2938237", "46.7630267,-71.2939417", "46.7635095,-71.294564", "46.7635739,-71.294682", "46.7635846,-71.2947786", "46.7635524,-71.2948859", "46.7629302,-71.2959695", "46.7627156,-71.2962592", "46.7624795,-71.2964523", "46.7622006,-71.2966454", "46.7618787,-71.2967956", "46.7616642,-71.2968385", "46.7613852,-71.2968385", "46.7611921,-71.2968171", "46.7610097,-71.2967741", "46.7608058,-71.2966883", "46.7593145,-71.2957978", "46.7595291,-71.2949395", "46.7585587,-71.2937415"];
        setInterval(function () {
            let [lat, lng] = positions[i].split(',').map(s => Number(s));
            self.fakeUpdatePosition({ lat, lng });
            i++;
        }, 3000);
    }

    drawRoute(toCoords, fromCoords = this.state.currentPos, routeOptions = {
        mode: 'fastest;car',
        representation: 'display',
        alternatives: 2,
        routeattributes: 'waypoints,summary,shape,legs',
        maneuverattributes: 'direction,action',
    }) {
        // add marker to destination 
        this.addMarker(this.state.map, toCoords);
        // Add waypoints to route
        routeOptions['waypoint0'] = coordsToWaypointString(fromCoords);
        routeOptions['waypoint1'] = coordsToWaypointString(toCoords);

        // draw routes
        const routes = new Route(this.state.map, this.platform, routeOptions);
        this.setState({ routes });
    }

    render() {
        return (
            <div id="map"></div>
        );
    }
}