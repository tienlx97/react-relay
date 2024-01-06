import * as React from 'react';
import { useFragment } from 'react-relay';
import { graphql } from 'relay-runtime';

import Card from './Card';
import Heading from './Heading';
import Image from './Image';
import PosterByline, { Props as PosterBylineProps, type } from './PosterByline';
import StoryCommentsSection from './StoryCommentsSection';
import StorySummary from './StorySummary';
import Timestamp from './Timestamp';

import type {StoryFragment$key} from './__generated__/StoryFragment.graphql';


type Props = {
  story: StoryFragment$key
};


export const StoryFragment = graphql`
  fragment StoryFragment on Story {
    title
    summary
    createdAt
    poster {
      ...PosterBylineFragment
    }
    thumbnail {
      ...ImageFragment @arguments(width: 400)
    }
    ...StoryCommentsSectionFragment
  }
`;

export default function Story({ story }: Props): React.ReactElement {

  const data = useFragment(
    StoryFragment,
    story,
  );

  return (
    <Card>
      <Heading>{data.title}</Heading>
      <PosterByline poster={data.poster} />
      <Timestamp time={data.createdAt} />
      <Image image={data.thumbnail} width={400} height={400} />
      <StorySummary summary={data.summary} />
      <StoryCommentsSection story={data} />
    </Card>
  );
}
