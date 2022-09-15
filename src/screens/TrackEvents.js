import React from 'react';
import GetCurrentLocation from '../components/GetCurrentLocation';
import WatchPosition from '../components/WatchPosition';

const trackEvent = [
  {
    id: 'getCurrentPosition',
    title: 'getCurrentPosition()',
    description: 'Asynchronously load and observe location',
    render() {
      return <GetCurrentLocation />;
    },
  },
  {
    id: 'watchPosition',
    title: 'watchPosition() / clearWatch()',
    description: 'Start / stop watching location changes',
    render() {
      return <WatchPosition />;
    },
  },
];

export default trackEvent;