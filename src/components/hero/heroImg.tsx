import React from 'react';
import { useStaticQuery, graphql } from 'gatsby';
import {FluidObject, FixedObject} from 'gatsby-image';
import Img from "gatsby-image/withIEPolyfill"
import BackgroundImage from 'gatsby-background-image'

type HeroImgProp = {
  filename: string;
}

type AnyImageQuery = {
  allFile: Partial<{
    nodes: {
      relativePath: string;
      childImageSharp?: {
        fixed?: FixedObject;
        fluid?: FluidObject;
      };
    }[];
  }>;
};

const HeroImg: React.FC<HeroImgProp> = ({filename}) => {
  const { allFile } = useStaticQuery<AnyImageQuery>(graphql`
    query {
      allFile {
        nodes {
          relativePath
          childImageSharp {
            fluid(maxWidth: 1400, quality: 90) {
              ...GatsbyImageSharpFluid_withWebp
            }
          }
        }
      }
    }
  `);
  const targetImage = allFile.nodes?.find(({ relativePath }) => relativePath.includes(filename));
  //console.log("targetImage:"+JSON.stringify(targetImage))

  if (!targetImage) return null;
  //const imageFixed = targetImage.childImageSharp?.fixed;
  const imageFluid = targetImage.childImageSharp?.fluid;
  //console.log("imageFluid:"+JSON.stringify(imageFluid))

  //if (!imageFixed) return null;
  if (!imageFluid) return null;


  return <Img imgStyle={{objectFit: 'cover'}} fluid={imageFluid} />;
};

export default HeroImg;
