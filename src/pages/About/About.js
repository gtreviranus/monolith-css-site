import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import './About.scss';

import Bio from './Bio/Bio';

export const About = () => {
  return (
    <div id="about">
      <Bio text="Woohoo, you did it." />
    </div>
  );
}