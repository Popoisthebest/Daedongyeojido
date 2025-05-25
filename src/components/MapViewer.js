import React, { useState, useEffect } from "react";
import {
  MapContainer,
  TileLayer,
  ImageOverlay,
  GeoJSON,
  Circle,
  Polyline,
  Tooltip,
} from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";

// 데이터
const mapData = {
  regions: [
    {
      name: "한성부",
      modern_name: "서울특별시",
      past_radius_km: 10,
      center: [37.5665, 126.978],
    },
    {
      name: "수원부",
      modern_name: "경기도 수원시",
      past_radius_km: 8,
      center: [37.2636, 127.0286],
    },
    {
      name: "전주부",
      modern_name: "전라북도 전주시",
      past_radius_km: 9,
      center: [35.8251, 127.1088],
    },
    {
      name: "강화부",
      modern_name: "인천 강화군",
      past_radius_km: 7,
      center: [37.7464, 126.4854],
    },
    {
      name: "개성부",
      modern_name: "개성특별시",
      past_radius_km: 8,
      center: [37.9707, 126.5657],
    },
    {
      name: "평양부",
      modern_name: "평양직할시",
      past_radius_km: 12,
      center: [39.0392, 125.7543],
    },
    {
      name: "부산부",
      modern_name: "부산광역시",
      past_radius_km: 9,
      center: [35.1796, 129.0756],
    },
    {
      name: "대구부",
      modern_name: "대구광역시",
      past_radius_km: 8,
      center: [35.8714, 128.6014],
    },
    {
      name: "인천부",
      modern_name: "인천광역시",
      past_radius_km: 7,
      center: [37.4563, 126.7052],
    },
    {
      name: "광주부",
      modern_name: "광주광역시",
      past_radius_km: 8,
      center: [35.1595, 126.8526],
    },
  ],
  past_routes: [
    {
      name: "경의로",
      coordinates: [
        [37.5665, 126.978],
        [37.2636, 127.0286],
      ],
    },
    {
      name: "호남로",
      coordinates: [
        [37.2636, 127.0286],
        [35.8251, 127.1088],
      ],
    },
    {
      name: "영남로",
      coordinates: [
        [37.2636, 127.0286],
        [35.8714, 128.6014],
      ],
    },
    {
      name: "해서로",
      coordinates: [
        [37.5665, 126.978],
        [37.7464, 126.4854],
      ],
    },
    {
      name: "관서로",
      coordinates: [
        [37.5665, 126.978],
        [39.0392, 125.7543],
      ],
    },
  ],
  modern_routes: {
    highways: [
      {
        name: "경부고속도로",
        coordinates: [
          [37.5665, 126.978],
          [35.1796, 129.0756],
        ],
      },
      {
        name: "경부선",
        coordinates: [
          [37.5665, 126.978],
          [35.8714, 128.6014],
        ],
      },
    ],
    railways: [
      {
        name: "KTX 호남선",
        coordinates: [
          [37.5665, 126.978],
          [35.8251, 127.1088],
        ],
      },
      {
        name: "경의선",
        coordinates: [
          [37.5665, 126.978],
          [37.9707, 126.5657],
        ],
      },
    ],
  },
};

// 마커 데이터
const locations = {
  type: "FeatureCollection",
  features: [
    {
      type: "Feature",
      properties: {
        name: "서울",
        oldName: "한양",
        description: "조선의 수도였던 한양은 현재 대한민국의 수도 서울입니다.",
      },
      geometry: {
        type: "Point",
        coordinates: [126.978, 37.5665],
      },
    },
    {
      type: "Feature",
      properties: {
        name: "수원",
        oldName: "수원부",
        description: "조선시대 수원부는 현재 경기도 수원시입니다.",
      },
      geometry: {
        type: "Point",
        coordinates: [127.0286, 37.2636],
      },
    },
    {
      type: "Feature",
      properties: {
        name: "전주",
        oldName: "전주부",
        description: "조선시대 전주부는 현재 전라북도 전주시입니다.",
      },
      geometry: {
        type: "Point",
        coordinates: [127.1088, 35.8251],
      },
    },
    {
      type: "Feature",
      properties: {
        name: "강화",
        oldName: "강화부",
        description:
          "고려가 몽골과의 전쟁 중 임시 수도로 사용했던 강화도입니다.",
      },
      geometry: {
        type: "Point",
        coordinates: [126.4854, 37.7464],
      },
    },
    {
      type: "Feature",
      properties: {
        name: "개성",
        oldName: "개성부",
        description: "고려의 수도였던 송악은 현재 개성특별시입니다.",
      },
      geometry: {
        type: "Point",
        coordinates: [126.5657, 37.9707],
      },
    },
    {
      type: "Feature",
      properties: {
        name: "평양",
        oldName: "평양부",
        description: "고구려의 수도였던 평양성은 현재 북한의 수도입니다.",
      },
      geometry: {
        type: "Point",
        coordinates: [125.7543, 39.0392],
      },
    },
    {
      type: "Feature",
      properties: {
        name: "부산",
        oldName: "부산부",
        description: "조선시대 주요 항구였던 부산포는 현재 부산광역시입니다.",
      },
      geometry: {
        type: "Point",
        coordinates: [129.0756, 35.1796],
      },
    },
    {
      type: "Feature",
      properties: {
        name: "대구",
        oldName: "대구부",
        description: "조선시대 대구부는 현재 대구광역시입니다.",
      },
      geometry: {
        type: "Point",
        coordinates: [128.6014, 35.8714],
      },
    },
    {
      type: "Feature",
      properties: {
        name: "인천",
        oldName: "인천부",
        description: "조선시대 인천부는 현재 인천광역시입니다.",
      },
      geometry: {
        type: "Point",
        coordinates: [126.7052, 37.4563],
      },
    },
    {
      type: "Feature",
      properties: {
        name: "광주",
        oldName: "광주부",
        description: "조선시대 광주부는 현재 광주광역시입니다.",
      },
      geometry: {
        type: "Point",
        coordinates: [126.8526, 35.1595],
      },
    },
  ],
};

// 현재 행정구역 GeoJSON 데이터
const modernRegions = {
  type: "FeatureCollection",
  features: [
    {
      type: "Feature",
      properties: {
        name: "서울특별시",
        oldName: "한성부",
      },
      geometry: {
        type: "Polygon",
        coordinates: [
          [
            [126.8, 37.4],
            [127.1, 37.4],
            [127.1, 37.7],
            [126.8, 37.7],
            [126.8, 37.4],
          ],
        ],
      },
    },
    {
      type: "Feature",
      properties: {
        name: "수원시",
        oldName: "수원부",
      },
      geometry: {
        type: "Polygon",
        coordinates: [
          [
            [126.9, 37.1],
            [127.1, 37.1],
            [127.1, 37.4],
            [126.9, 37.4],
            [126.9, 37.1],
          ],
        ],
      },
    },
    {
      type: "Feature",
      properties: {
        name: "전주시",
        oldName: "전주부",
      },
      geometry: {
        type: "Polygon",
        coordinates: [
          [
            [127.0, 35.7],
            [127.2, 35.7],
            [127.2, 36.0],
            [127.0, 36.0],
            [127.0, 35.7],
          ],
        ],
      },
    },
    {
      type: "Feature",
      properties: {
        name: "강화군",
        oldName: "강화부",
      },
      geometry: {
        type: "Polygon",
        coordinates: [
          [
            [126.3, 37.6],
            [126.6, 37.6],
            [126.6, 37.9],
            [126.3, 37.9],
            [126.3, 37.6],
          ],
        ],
      },
    },
    {
      type: "Feature",
      properties: {
        name: "개성특별시",
        oldName: "개성부",
      },
      geometry: {
        type: "Polygon",
        coordinates: [
          [
            [126.4, 37.8],
            [126.7, 37.8],
            [126.7, 38.1],
            [126.4, 38.1],
            [126.4, 37.8],
          ],
        ],
      },
    },
    {
      type: "Feature",
      properties: {
        name: "평양직할시",
        oldName: "평양부",
      },
      geometry: {
        type: "Polygon",
        coordinates: [
          [
            [125.5, 38.8],
            [125.9, 38.8],
            [125.9, 39.2],
            [125.5, 39.2],
            [125.5, 38.8],
          ],
        ],
      },
    },
    {
      type: "Feature",
      properties: {
        name: "부산광역시",
        oldName: "부산부",
      },
      geometry: {
        type: "Polygon",
        coordinates: [
          [
            [128.9, 35.0],
            [129.2, 35.0],
            [129.2, 35.3],
            [128.9, 35.3],
            [128.9, 35.0],
          ],
        ],
      },
    },
    {
      type: "Feature",
      properties: {
        name: "대구광역시",
        oldName: "대구부",
      },
      geometry: {
        type: "Polygon",
        coordinates: [
          [
            [128.4, 35.7],
            [128.7, 35.7],
            [128.7, 36.0],
            [128.4, 36.0],
            [128.4, 35.7],
          ],
        ],
      },
    },
    {
      type: "Feature",
      properties: {
        name: "인천광역시",
        oldName: "인천부",
      },
      geometry: {
        type: "Polygon",
        coordinates: [
          [
            [126.5, 37.3],
            [126.8, 37.3],
            [126.8, 37.6],
            [126.5, 37.6],
            [126.5, 37.3],
          ],
        ],
      },
    },
    {
      type: "Feature",
      properties: {
        name: "광주광역시",
        oldName: "광주부",
      },
      geometry: {
        type: "Polygon",
        coordinates: [
          [
            [126.7, 35.0],
            [127.0, 35.0],
            [127.0, 35.3],
            [126.7, 35.3],
            [126.7, 35.0],
          ],
        ],
      },
    },
  ],
};

const MapViewer = ({ onLocationClick }) => {
  const [showPastRegions, setShowPastRegions] = useState(false);
  const [showModernRegions, setShowModernRegions] = useState(false);
  const [showPastRoutes, setShowPastRoutes] = useState(false);
  const [showModernRoutes, setShowModernRoutes] = useState(false);

  const pointToLayer = (feature, latlng) => {
    return L.circleMarker(latlng, {
      radius: 8,
      fillColor: "#ff7800",
      color: "#000",
      weight: 1,
      opacity: 1,
      fillOpacity: 0.8,
    });
  };

  const onEachFeature = (feature, layer) => {
    layer.on({
      click: () => {
        const locationInfo = {
          ...feature.properties,
          pastRoutes: mapData.past_routes.filter((route) =>
            route.coordinates.some(
              (coord) =>
                Math.abs(coord[0] - feature.geometry.coordinates[1]) < 0.1 &&
                Math.abs(coord[1] - feature.geometry.coordinates[0]) < 0.1
            )
          ),
          modernRoutes: {
            highways: mapData.modern_routes.highways.filter((route) =>
              route.coordinates.some(
                (coord) =>
                  Math.abs(coord[0] - feature.geometry.coordinates[1]) < 0.1 &&
                  Math.abs(coord[1] - feature.geometry.coordinates[0]) < 0.1
              )
            ),
            railways: mapData.modern_routes.railways.filter((route) =>
              route.coordinates.some(
                (coord) =>
                  Math.abs(coord[0] - feature.geometry.coordinates[1]) < 0.1 &&
                  Math.abs(coord[1] - feature.geometry.coordinates[0]) < 0.1
              )
            ),
          },
        };
        onLocationClick(locationInfo);
      },
      mouseover: (e) => {
        const layer = e.target;
        layer.setStyle({
          radius: 10,
          fillColor: "#ff9500",
          color: "#000",
          weight: 2,
          opacity: 1,
          fillOpacity: 0.8,
        });
      },
      mouseout: (e) => {
        const layer = e.target;
        layer.setStyle({
          radius: 8,
          fillColor: "#ff7800",
          color: "#000",
          weight: 1,
          opacity: 1,
          fillOpacity: 0.8,
        });
      },
    });
  };

  // km를 위도/경도 차이로 변환하는 함수
  const kmToLatLng = (km, lat) => {
    return km * 1000; // 미터 단위로 변환
  };

  return (
    <div className="relative h-full">
      {/* 컨트롤 패널 */}
      <div className="absolute top-32 left-4 z-[1000] bg-white p-4 rounded-lg shadow-lg">
        <div className="space-y-2">
          <label className="flex items-center space-x-2">
            <input
              type="checkbox"
              checked={showPastRegions}
              onChange={(e) => setShowPastRegions(e.target.checked)}
              className="form-checkbox h-4 w-4 text-blue-600"
            />
            <span>과거 생활권</span>
          </label>
          <label className="flex items-center space-x-2">
            <input
              type="checkbox"
              checked={showModernRegions}
              onChange={(e) => setShowModernRegions(e.target.checked)}
              className="form-checkbox h-4 w-4 text-blue-600"
            />
            <span>현재 행정구역</span>
          </label>
          <label className="flex items-center space-x-2">
            <input
              type="checkbox"
              checked={showPastRoutes}
              onChange={(e) => setShowPastRoutes(e.target.checked)}
              className="form-checkbox h-4 w-4 text-blue-600"
            />
            <span>과거 도로망</span>
          </label>
          <label className="flex items-center space-x-2">
            <input
              type="checkbox"
              checked={showModernRoutes}
              onChange={(e) => setShowModernRoutes(e.target.checked)}
              className="form-checkbox h-4 w-4 text-blue-600"
            />
            <span>현대 교통망</span>
          </label>
        </div>
      </div>

      <MapContainer
        center={[37.5, 127.5]}
        zoom={6}
        style={{ height: "100%", width: "100%" }}
      >
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        />
        <ImageOverlay
          url="/daedong_map_overlay.jpg"
          bounds={[
            [33.2, 124],
            [43, 131.2],
          ]}
          opacity={0.7}
        />
        <GeoJSON
          data={locations}
          pointToLayer={pointToLayer}
          onEachFeature={onEachFeature}
        />

        {/* 과거 생활권 표시 */}
        {showPastRegions &&
          mapData.regions.map((region, index) => {
            return (
              <Circle
                key={`past-region-${index}`}
                center={region.center}
                radius={kmToLatLng(region.past_radius_km)}
                pathOptions={{
                  color: "#8B4513",
                  fillColor: "#8B4513",
                  fillOpacity: 0.2,
                  weight: 2,
                }}
              >
                <Tooltip permanent>
                  {region.name} → {region.modern_name}
                </Tooltip>
              </Circle>
            );
          })}

        {/* 과거 도로망 표시 */}
        {showPastRoutes &&
          mapData.past_routes.map((route, index) => (
            <Polyline
              key={`past-route-${index}`}
              positions={route.coordinates}
              pathOptions={{
                color: "#8B4513",
                weight: 3,
                opacity: 0.7,
                dashArray: "5, 10",
              }}
            >
              <Tooltip permanent>{route.name}</Tooltip>
            </Polyline>
          ))}

        {/* 현대 고속도로 표시 */}
        {showModernRoutes &&
          mapData.modern_routes.highways.map((route, index) => (
            <Polyline
              key={`highway-${index}`}
              positions={route.coordinates}
              pathOptions={{
                color: "#4169E1",
                weight: 3,
                opacity: 0.7,
              }}
            >
              <Tooltip permanent>{route.name}</Tooltip>
            </Polyline>
          ))}

        {/* 현대 철도 표시 */}
        {showModernRoutes &&
          mapData.modern_routes.railways.map((route, index) => (
            <Polyline
              key={`railway-${index}`}
              positions={route.coordinates}
              pathOptions={{
                color: "#FF4500",
                weight: 3,
                opacity: 0.7,
                dashArray: "10, 10",
              }}
            >
              <Tooltip permanent>{route.name}</Tooltip>
            </Polyline>
          ))}

        {/* 현재 행정구역 표시 */}
        {showModernRegions && (
          <GeoJSON
            data={modernRegions}
            style={{
              color: "#4169E1",
              weight: 2,
              fillColor: "#4169E1",
              fillOpacity: 0.1,
            }}
            onEachFeature={(feature, layer) => {
              layer.bindTooltip(
                `${feature.properties.oldName} → ${feature.properties.name}`,
                { permanent: true }
              );
            }}
          />
        )}
      </MapContainer>
    </div>
  );
};

export default MapViewer;
