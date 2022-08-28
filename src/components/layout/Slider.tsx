import Image from 'next/image';
import React, { useState } from 'react';

import {v4 as uuidv4} from "uuid"

function Slider({ dataSlider }: any): JSX.Element {
  // PROPS
  const { displayRatio, items, title } = dataSlider;

  // STATE
  const [currentSlide, setCurrentSlide] = useState(0);

  // METHODS
  const dots = (items: any[]) => {
    return new Array(items.length).fill(0);
  };

  const changeSlideRight = () => {
    currentSlide === items.length - 1 ? setCurrentSlide(0) : setCurrentSlide(currentSlide + 1);
  };

  const changeSlideLeft = () => {
    currentSlide === 0 ? setCurrentSlide(items.length - 1) : setCurrentSlide(currentSlide - 1);
  };

  const changeSlideDot = (index) => {
    setCurrentSlide(index);
  };

  return (
    <div className="slider-container">
      <div className="arrow-container">
        <img
          onClick={() => changeSlideLeft()}
          src="/arrow_slider.png"
          width={100}
          height={100}
          className="arrow"
          id="left-arrow"
        />
        <img
          onClick={() => changeSlideRight()}
          src="/arrow_slider.png"
          width={100}
          height={100}
          className="arrow"
          id="right-arrow"
        />
      </div>
      {items.map((item, index: number) => (
        <div key={item.itemId} className={'img-and-dot-container ' + (currentSlide === index ? 'visible' : '')}>
          <p className="title-video">{item.name}</p>
          <img src={item.poster} alt={item.name} />
          <div className="dots-container">
            {dots(items).map((e, i) => (
              <div
                key={uuidv4()}
                onClick={() => changeSlideDot(i)}
                className={'dot ' + (i === index ? 'current-slide' : '')}
              ></div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}

export default Slider;
