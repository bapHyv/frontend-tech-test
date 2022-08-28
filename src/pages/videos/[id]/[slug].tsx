import Layout from '$components/layout/Layout';

import Link from 'next/link';

import Cms from 'src/services/Cms';
import { useQuery } from 'react-query';

import generateRandomId from '$utils/generateRandomId';

import {Tag, Category, SectionContent, OriginsEventCard, OriginsVideoCard, Image} from "@origins-digital/types/ott"

export async function getStaticPaths() {
  const dataPage = await Cms.getPageContent('home', {});

  const videoIdsAndSlugs = (components: SectionContent) => {
    const videos = components.find(
      (component: OriginsEventCard | OriginsVideoCard | Image) => component._kenticoItemType === 'section_static_carousel',
    ).items;

    return videos.map((video: OriginsVideoCard) => {
      return {
        params: {
          id: video.itemId,
          slug: video.name.toLowerCase().split(' ').join('-'),
        },
      };
    });
  };

  const paths = await videoIdsAndSlugs(dataPage.components);

  return {
    paths,
    fallback: false,
  };
}

export async function getStaticProps({ params }) {
  const dataVideo = await Cms.getVideo(params.id, {});

  return {
    props: { dataVideo },
  };
}

export default function Videos({ dataVideo }) {
  const { relatedVideos, video } = dataVideo;

  const lorem = `Lorem ipsum, 
  dolor sit amet consectetur adipisicing elit. 
  Delectus sit, officia ducimus ea illo nisi 
  sint provident modi recusandae ab rem aliquid 
  reprehenderit soluta iure impedit aspernatur, 
  possimus non id.`;

  return (
    <div className="video-detail-container">
      <Link href="/">
        <span className="back-home-btn">Retour à l'accueil</span>
      </Link>
      <div className="img-and-ctrls-container">
        <img src={video.poster} alt={video.name} />
        <div className="play-btn-bg"></div>
        <div className="play-btn"></div>
        <div className="bar-duration-bg"></div>
        <div className="bar-duration"></div>
        <div className="dot-duration"></div>
      </div>
      <h1 className="title-video-detail">{video.name}</h1>
      <div className="informations-video-detail">
        <div className="categories-video-detail">
          CATEGORIES: {video.Categories.map((cat: Category) => (
            <span className="category-video-detail">
                {cat.name}
            </span>
            ))}
        </div>
        <div className="tags-video-detail">
          TAGS:{' '}
          {video.tags.map((tag: Tag) => (
            <span key={generateRandomId(15)} className="tag-video-detail">{"#" + tag.name}</span>
          ))}
        </div>
        <p className="description-video-detail">
          Description: {video.description || lorem + lorem}
        </p>
      </div>
    </div>
  );
}
