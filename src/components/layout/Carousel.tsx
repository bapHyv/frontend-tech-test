import Link from 'next/link';
import Image from 'next/image';

import { useState, useEffect } from 'react';

import { useWindowSize } from '$utils/useWindowSize';

import {v4 as uuidv4} from "uuid"


export default function Carousel({ dataCarousel }): JSX.Element {
  // PROPS
  const { items, itemsDisplayType, showMoreButtonRedirection, title } = dataCarousel;

  // STATE
  const [indexSlide, setIndexSlide] = useState(0);
  const [windowSize, setWindowSize] = useState({ width: undefined, height: undefined });

  // COMPONENT DID MOUNT
  useEffect(() => {
    function handleResize() {
      setWindowSize({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    }
    window.addEventListener('resize', handleResize);
    handleResize();
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // METHODS
  const computeLength = (items) => {
    return windowSize.width > 768 ? Math.ceil(items.length / 3) : items.length;
  };

  const makeItemsContainers = (items) => new Array(computeLength(items)).fill(0);

  const separateItems = (items: any[]): any[] => {
    let increment = 0;
    let start = 0;
    let end = 0;
    let arr = [];
    if (computeLength(items) === 3) {
      increment = 3;
      end = 3;
    } else {
      increment = 1;
      end = 1;
    }

    for (let i = 0; i < computeLength(items); i++) {
      arr.push(items.slice(start, end));
      start += increment;
      end += increment;
    }

    return arr;
  };

  const enableButton = (items) => items.length < 3;

  const changeSlideLeft = () => {
    if (indexSlide > 0) setIndexSlide(indexSlide - 1);
  };

  const changeSlideRight = (items) => {
    if (indexSlide < computeLength(items) - 1) setIndexSlide(indexSlide + 1);
  };

  const hideRightBtn = (items) => indexSlide === computeLength(items) - 1
  const hideLeftBtn = () => indexSlide === 0

  return (
    <div className="carousel-container">
      <img
        onClick={() => changeSlideLeft()}
        src="/arrow_slider.png"
        width={50}
        height={50}
        className={'carousel-arrow ' + (enableButton(items) || hideLeftBtn() ? 'hidden-arrow ' : '') }
        id="carousel-left-arrow"
      />
      <img
        onClick={() => changeSlideRight(items)}
        src="/arrow_slider.png"
        width={50}
        height={50}
        className={'carousel-arrow ' + (enableButton(items) || hideRightBtn(items) ? 'hidden-arrow ' : '') }
        id="carousel-right-arrow"
      />

      <div className="carousel-items-container">
        {makeItemsContainers(items).map((e, i) => (
          <div
            className={
              'carousel-item ' +
              (i < indexSlide ? 'left ' : '') +
              (i === indexSlide + 1 ? 'right ' : '') +
              (i >= indexSlide + 2 ? 'far' : '')
            }
            key={uuidv4()}
          >
            {separateItems(items)[i].map((item) => (
                <div className={'img-and-infos-container'} key={item.itemId}>
                  <p className="name-img-carousel">{item.name}</p>
                  <img
                    src={item.poster ? item.poster : "https://via.placeholder.com/350x200.png"}
                    alt={item.name}
                  />
                  <Link
                    href={`/videos/${item.itemId}/${item.name.toLowerCase().split(' ').join('-')}`}
                  >
                    <p className="link-img-carousel">Voir la vidéo</p>
                  </Link>
                  <p className="duration-video-carousel">{item.duration}</p>
                </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}
