import 'babel-polyfill';

import React, {Component} from 'react';
import {render} from 'react-dom';
import DeckGL from 'deck.gl/react';
import {LineLayer} from 'deck.gl';
import MapGL from 'react-map-gl';

const token = 'pk.eyJ1Ijoia2dvd3J1IiwiYSI6ImNpd244ZW42ZzAwOHkyb253Y2k5ODNiMXMifQ.w6MeTQxQavRx9xGc7tUWnA';

if (!token) {
  throw new Error('Please specify a valid mapbox token');
}

class Root extends Component {

  state = {
    viewport: {
      latitude: 37.785164,
      longitude: -122.41669,
      zoom: 16.140440,
      bearing: -20.55991,
      pitch: 60,
    },
    width: 1920,
    height: 1080,
  }

  _downloadClick(event) {
    event.target.href = document.getElementsByClassName('mapboxgl-canvas')[0]
                                .toDataURL('image/jpeg');
    event.target.download = 'map.jpg';
  }

  _downloadClickOverlay(event) {
    event.target.href = document.getElementById('deckgl-overlay')
                                .toDataURL('image/jpeg');
    event.target.download = 'overlay.jpg';
  }

  render() {

    const {viewport, width, height} = this.state;

    const layers = [new LineLayer({
      data: [{
        sourcePosition: [-122.41669, 37.7853],
        targetPosition: [-122.41669, 37.781],
      }],
    })];

    return (
      <div>
        <MapGL
          {...viewport}
          mapStyle="mapbox://styles/mapbox/dark-v9"
          onChangeViewport={v => this.setState({viewport: v})}
          preventStyleDiffing={false}
          mapboxApiAccessToken={token}
          perspectiveEnabled={true}
          preserveDrawingBuffer={true}
          width={width}
          height={height}
          >
          <DeckGL
            {...viewport}
            width={width}
            height={height}
            layers={layers}
            debug />
        </MapGL>
        <a style={{fontSize:'20px'}} onClick={this._downloadClick}>Download map</a>
        <a style={{fontSize:'20px'}} onClick={this._downloadClickOverlay}>Download overlay</a>
      </div>
    );
  }

}

const root = document.createElement('div');
document.body.appendChild(root);

render(<Root />, root);
