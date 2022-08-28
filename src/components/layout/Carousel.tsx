import Link from 'next/link';
import { useState, useEffect } from 'react';

import {CarouselSectionDTO, OriginsVideoCard} from '@origins-digital/types/ott';

export default function Carousel({ dataCarousel }: CarouselSectionDTO): JSX.Element {  
  // PROPS
  const { items, itemsDisplayType, showMoreButtonRedirection, title } = dataCarousel;

  // STATE
  const [indexSlide, setIndexSlide] = useState(0);
  const [windowSize, setWindowSize] = useState({ width: undefined, height: undefined });

  // METHODS
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

  const computeLength = (items: OriginsVideoCard[]) => {
    return windowSize.width > 768 ? Math.ceil(items.length / 3) : items.length;
  };

  const makeItemsContainers = (items: OriginsVideoCard[]) => new Array(computeLength(items)).fill(0);

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

  const enableButton = (items: OriginsVideoCard[]) => items.length < 3;

  const changeSlideLeft = () => {
    if (indexSlide > 0) setIndexSlide(indexSlide - 1);
  };

  const changeSlideRight = (items: OriginsVideoCard[]) => {
    if (indexSlide < computeLength(items) - 1) setIndexSlide(indexSlide + 1);
  };

  const hideLeftArrow = () => indexSlide === 0
  const hideRightArrow = (items: OriginsVideoCard[]) => indexSlide === computeLength(items) - 1

  return (
    <div className="carousel-container">
      <img
        onClick={() => changeSlideLeft()}
        src="/arrow_slider.png"
        className={'carousel-arrow ' + (enableButton(items) || hideLeftArrow() ? 'hidden-arrow' : '')}
        id="carousel-left-arrow"
      />
      <img
        onClick={() => changeSlideRight(items)}
        src="/arrow_slider.png"
        className={'carousel-arrow ' + (enableButton(items) || hideRightArrow(items) ? 'hidden-arrow' : '')}
        id="carousel-right-arrow"
      />

      <div className="carousel-items-container">
        {makeItemsContainers(items).map((e, i) => (
          <div
          key={"this_is_an_id" + i.toString()}
            className={
              'carousel-item ' +
              (i < indexSlide ? 'left ' : '') +
              (i === indexSlide + 1 ? 'right ' : '') +
              (i >= indexSlide + 2 ? 'far' : '')
            }
          >
            {separateItems(items)[i].map((item: OriginsVideoCard) => (
              <div key={item.itemId} className={'img-and-infos-container'}>
                <p className="name-img-carousel">{item.name}</p>
                <img
                  data-hover="for-hover-effect"
                  src={item.poster ? item.poster : item.posterPortrait}
                  alt={item.name}
                />
                <Link
                  href={`/videos/${item.itemId}/${item.name.toLowerCase().split(' ').join('-')}`}
                >
                  <p className="link-img-carousel">Voir la vidéo</p>
                </Link>
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}
