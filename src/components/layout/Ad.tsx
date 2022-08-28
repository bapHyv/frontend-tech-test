import {AdvertisementSection} from '@origins-digital/types/ott'

export default function Ad({ dataAd }: AdvertisementSection): JSX.Element {
  const { image, redirectionTarget } = dataAd;
  return (
    <div className="ad-container">
      <a href={redirectionTarget} target="_blank">
        <img className="img-ad" src={image[0].image.url} alt={image[0].image.name} />
      </a>
    </div>
  );
}
