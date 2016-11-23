"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var core_1 = require('@angular/core');
var AppComponent = (function () {
    function AppComponent() {
    }
    //    constructor(private restangular: Restangular) {
    //    }
    AppComponent.prototype.ngOnInit = function () {
        //        this.restangular.all('Annotations').getList().toPromise().then(function(annotations) {
        //            console.log(annotations);
        //        });
        var xmlhttp = new XMLHttpRequest();
        Gp.Services.getConfig({
            apiKey: 'ggza1od6vjtholc23lqhnxrr',
            onSuccess: function (response) {
                // TODO export en conf
                var foldersToAdd = [
                    {
                        name: 'ortho',
                        visible: true,
                        title: 'Orthophoto GeoTIFF',
                        description: 'Orthophoto importé Batidrône'
                    },
                    {
                        name: 'mns',
                        visible: false,
                        title: 'MNS GeoTIFF',
                        description: 'Test de MNS Batidrône'
                    }
                ];
                var layers = [];
                var layersConf = [];
                // ADD BASE LAYERS
                // couche OSM (non Géoportail)
                var osm = new ol.layer.Tile({
                    source: new ol.source.OSM(),
                    visible: true
                });
                layers.push(osm);
                var osmConf = {
                    layer: osm,
                    config: {
                        title: "OpenStreet Map",
                        description: "Couche OpenStreet Map"
                    }
                };
                layersConf.push(osmConf);
                // Cartes IGN
                var ign = new ol.layer.GeoportalWMTS({
                    layer: "GEOGRAPHICALGRIDSYSTEMS.MAPS",
                    olParams: {
                        opacity: 1,
                        visible: false
                    }
                });
                layers.push(ign);
                // Photographies aériennes
                var sat = new ol.layer.GeoportalWMTS({
                    layer: "ORTHOIMAGERY.ORTHOPHOTOS",
                    olParams: {
                        opacity: 0.7,
                        visible: false
                    }
                });
                layers.push(sat);
                // Parcelles cadastrales
                var cadas = new ol.layer.GeoportalWMTS({
                    layer: "CADASTRALPARCELS.PARCELS",
                    olParams: {
                        opacity: 0.4,
                        visible: false
                    }
                });
                layers.push(cadas);
                // PARSE ORTHOS
                var originX, originY, zoomMin, zoomMax;
                foldersToAdd.forEach(function (folder) {
                    xmlhttp.open("GET", document.URL + 'layers/' + folder.name + '/tilemapresource.xml', false);
                    xmlhttp.setRequestHeader("Content-Type", "text/xml");
                    xmlhttp.send(null);
                    var response = xmlhttp.responseXML.firstChild.children;
                    var SRS = response[2].innerHTML;
                    var minx = Number(response[3].attributes[0].nodeValue);
                    var miny = Number(response[3].attributes[1].nodeValue);
                    var maxx = Number(response[3].attributes[2].nodeValue);
                    var maxy = Number(response[3].attributes[3].nodeValue);
                    if (!originX)
                        originX = Number(response[4].attributes[0].nodeValue);
                    if (!originY)
                        originY = Number(response[4].attributes[1].nodeValue);
                    if (!zoomMin)
                        zoomMin = Number(response[6].firstElementChild.attributes[0].nodeValue);
                    if (!zoomMax)
                        zoomMax = Number(response[6].lastElementChild.attributes[0].nodeValue);
                    var mapExtent = ol.proj.transformExtent([minx, miny, maxx, maxy], 'EPSG:4326', SRS);
                    var layer = new ol.layer.Tile({
                        extent: mapExtent,
                        source: new ol.source.XYZ({
                            attributions: [new ol.Attribution({ html: 'Batidrônes' })],
                            url: document.URL + 'layers/' + folder.name + '/{z}/{x}/{y}.png',
                            tilePixelRatio: 1.000000,
                            minZoom: zoomMin,
                            maxZoom: zoomMax
                        }),
                        visible: folder.visible
                    });
                    layers.push(layer);
                    var layerConf = {
                        layer: layer,
                        config: {
                            title: folder.title,
                            description: folder.description
                        }
                    };
                    layersConf.push(layerConf);
                });
                // ADD MAP
                var map = new ol.Map({
                    target: 'map',
                    layers: layers,
                    view: new ol.View({
                        center: ol.proj.fromLonLat([originX, originY]),
                        zoom: zoomMin
                    })
                });
                var layerSwitcher = new ol.control.LayerSwitcher({
                    layers: layersConf,
                    options: {
                        collapsed: false
                    }
                });
                map.addControl(layerSwitcher);
                // ADD CUSTOM CONTROLS TO MAP
                //Draw
                AppComponent.draw = new ol.control.Drawing({
                    collapsed: false,
                    // marker custo point rouge au lieu de pin map
                    markersList: [
                        {
                            src: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAUAAAAFCAYAAACNbyblAAAAHElEQVQI12P4//8/w38GIAXDIBKE0DHxgljNBAAO9TXL0Y4OHwAAAABJRU5ErkJggg==",
                            anchor: [0.5, 0.5]
                        }
                    ]
                });
                map.addControl(AppComponent.draw);
                // Recherche
                var searchControl = new ol.control.SearchEngine({});
                map.addControl(searchControl);
                // Reverse Geocode
                var rvControl = new ol.control.ReverseGeocode({});
                map.addControl(rvControl);
                // Latitude,longitude et altitude dynamiques
                var mpControl = new ol.control.GeoportalMousePosition({
                    collapsed: false
                });
                map.addControl(mpControl);
                // Crédits
                var attControl = new ol.control.GeoportalAttribution({});
                map.addControl(attControl);
                //new rlz (BETA) - instruments de mesure
                /**
                var measureLenghtControl = new ol.control.MeasureLength({
                });
                map.addControl(measureLenghtControl);
                var measureAreaControl = new ol.control.MeasureArea({
                });
                map.addControl(measureAreaControl);
                var measureAzimuth = new ol.control.MeasureAzimuth({
                });
                map.addControl(measureAzimuth);
                */
            }
        });
    };
    AppComponent.prototype.ngAfterViewInit = function () {
        // remove loader
        document.getElementById('map').style.backgroundImage = 'none';
        //document.getElementById('loader').style.display = 'none';
    };
    AppComponent.prototype.saveToDatabase = function () {
        var kml = AppComponent.draw.exportFeatures();
        if (kml) {
            console.log(kml);
        }
        else {
            alert("Désolé, il semble qu'il n'y a rien à sauvegarder.");
        }
    };
    AppComponent = __decorate([
        core_1.Component({
            selector: 'my-map-app',
            templateUrl: 'app.component.html'
        }), 
        __metadata('design:paramtypes', [])
    ], AppComponent);
    return AppComponent;
}());
exports.AppComponent = AppComponent;
//# sourceMappingURL=app.component.js.map