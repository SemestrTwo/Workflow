import React from 'react';
import CarsList from '../containers/cars-list';
import Details from '../containers/details';
//import '../../css/style';

const WebPage = () => (
  <div>
    <h2>Sphere:</h2>
    <CarsList />
    <hr />
    <h3>Details:</h3>
    <Details/>
  </div>
);
export default WebPage;
