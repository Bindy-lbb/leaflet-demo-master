import 'proj4leaflet';

import "leaflet/dist/leaflet.css";
import * as $L from "leaflet";

import "leaflet.markercluster";
import "leaflet.heat";
import "leaflet.markercluster/dist/MarkerCluster.css";
import "leaflet.markercluster/dist/MarkerCluster.Default.css";

import "leaflet-measure-path";
import "leaflet-measure-path/leaflet-measure-path.css";
// import L from "../../public/tileLayer.baidu"
require('./tileLayer.baidu')
import {
  basemapLayer,
  featureLayer,
  tiledMapLayer,
  dynamicMapLayer,
  imageMapLayer
} from "esri-leaflet";

// import "esri-leaflet-renderers";
import "esri-leaflet-cluster";
import "esri-leaflet-heatmap/dist/esri-leaflet-heatmap-debug";
import Cluster from "./esri-cluster";
import Heatmap from "./esri-heatmap";

// 解决默认 maker 无法显示的问题
import icon from "leaflet/dist/images/marker-icon.png";
import iconShadow from "leaflet/dist/images/marker-shadow.png";
let DefaultIcon = $L.icon({
  iconAnchor: [13, 41],
  iconUrl: icon,
  shadowUrl: iconShadow
});
$L.Marker.prototype.options.icon = DefaultIcon;

let CursorStyle = "";

const createMap = (divId, options) => {
  let map = $L.map(divId, options);
  return map;
};

// 创建一个异步函数，用于创建地图瓦片图层
const createTileLayer = async (map, url, options) => {
  // 使用$L.tileLayer方法创建一个地图瓦片图层，传入url和options参数
  let tileLayer = await $L.tileLayer(url, options);
  // 将创建的地图瓦片图层添加到map中
  tileLayer.addTo(map);
  // 返回创建的地图瓦片图层
  return tileLayer;
};

const createControlLayers = async (map) => {
//  return await $L.Control.layers({
//     百度地图: $L.tileLayer.baidu({ layer: "vec" }).addTo(map),
//   })
await  L.tileLayer.baidu({ layer: 'vec' }).addTo(map)
}

/**
 * 创建 Icon
 *
 * @param {Oject} options
 */

const createIcon = options => {
  return $L.icon(options);
};

/**
 * 通过 [x, y] 坐标添加 Maker
 *
 * @param {Object} map
 * @param {Object} latLng
 * @param {Object} options
 *
 */
const createMakerByXY = (map, coordinate, options) => {
  let marker = $L.marker($L.latLng(coordinate[1], coordinate[0]), options);
  marker.addTo(map);
  return marker;
};
const createMakerByLatlng = (latlng, options) => {
  return $L.marker(latlng, options);
};

/**
 * 创建线要素
 *
 * @param {Object} map
 * @param {Array} linePath
 * @param {Object} lineOpts
 */
const createPolyline = (map, linePath, lineOpts) => {
  let polyline = $L.polyline(linePath, lineOpts);
  polyline.addTo(map);
  return polyline;
};

/**
 * 创建面要素
 *
 * @param {Object} map
 * @param {Array} areaPath
 * @param {Object} areaOpts
 */

const createPolygon = (map, areaPath, areaOpts) => {
  let polygon = $L.polygon(areaPath, areaOpts);
  polygon.addTo(map);
  return polygon;
};

const createCircleMaker = (latlng, size, opts) => {
  return $L.circleMarker(latlng, size, opts);
};

const createPopup = (map, options) => {
  let popup = $L.popup(options);
  return popup;
};
const createLatlonByArray = coordinate => {
  let latLng = $L.latLng(coordinate[0], coordinate[1]);
  return latLng;
};

// 创建一个标记群组
const createMakerCluster = () => {
  // 返回一个标记群组
  return $L.markerClusterGroup();
};

const getRandomLatLng = map => {
  let bounds = map.getBounds(),
    southWest = bounds.getSouthWest(),
    northEast = bounds.getNorthEast(),
    lngSpan = northEast.lng - southWest.lng,
    latSpan = northEast.lat - southWest.lat;

  return $L.latLng(
    southWest.lat + latSpan * Math.random(),
    southWest.lng + lngSpan * Math.random()
  );
};
const getLatLng = (x, y) => {
  return $L.latLng(y, x);
};

const addCursorStyle = (map, cursorStyle) => {
  CursorStyle = cursorStyle;
  $L.DomUtil.addClass(map._container, cursorStyle);
};

const removerCoursorStyle = map => {
  $L.DomUtil.removeClass(map._container, CursorStyle);
};

const addEsirBasemap = async (map, layerName) => {
  return await basemapLayer(layerName).addTo(map);
};

const addEsirTiledMapLayer = async (map, opts) => {
  return await tiledMapLayer(opts).addTo(map);
};

const addEsirDynamicMapLayer = async (map, opts) => {
  return await dynamicMapLayer(opts).addTo(map);
};
const addImageMaplayer = async (map, opts) => {
  return await imageMapLayer(opts).addTo(map);
};

const addEsirFeatureLayer = async (map, opts) => {
  return await featureLayer(opts).addTo(map);
};


const addEsirClusterLayer = async (map, opts) => {
  return await Cluster(opts).addTo(map);
};

const addEsriHeatmap = async (map, opts) => {
  return await Heatmap(opts).addTo(map);
};




export default {
  createMap,
  createTileLayer,
  createControlLayers,
  createIcon,
  createMakerByXY,
  createMakerByLatlng,
  createPolyline,
  createPolygon,
  createCircleMaker,
  createPopup,
  createLatlonByArray,
  createMakerCluster,
  getRandomLatLng,
  addCursorStyle,
  removerCoursorStyle,
  getLatLng,
  addEsirBasemap,
  addEsirFeatureLayer,
  addEsirTiledMapLayer,
  addEsirDynamicMapLayer,
  addImageMaplayer,
  addEsirClusterLayer,
  addEsriHeatmap
};
