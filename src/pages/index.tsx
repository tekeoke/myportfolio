import React from 'react';
import { App, SEO } from '../components';

import type { PageProps } from 'gatsby';

const Container: React.FC<PageProps> = ({ path }) => {
  return (
    <>
      <SEO title='Top' pathname={path} />
      <App />
    </>
  );
};

export default Container;
