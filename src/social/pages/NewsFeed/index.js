import React from 'react';
import { PostTargetType } from '@amityco/js-sdk';

import { PageTypes } from '~/social/constants';
import Feed from '~/social/components/Feed';

import { useNavigation } from '~/social/providers/NavigationProvider';

import { Wrapper } from './styles';

const NewsFeed = (props) => {
  const { defaultCommunityId, trackSocialEvent } = props;
  const { onChangePage } = useNavigation();

  // const onPostCreated = (post) => {
  // }

  const onPostEvent = (post) => {
    if (trackSocialEvent) {
      trackSocialEvent({ type: 'post', ...post });
    } else {
      console.log( 'error: cannot do track post event from newsfeed');
    }
  }
  return (
    <Wrapper data-qa-anchor="news-feed">
      <Feed
        targetType={PostTargetType.GlobalFeed}
        goToExplore={() => onChangePage(PageTypes.Explore)}
        defaultCommunityId={defaultCommunityId}
        showPostCreator
        trackSocialEvent={onPostEvent}
        // onPostCreated={onPostCreated}
      />
    </Wrapper>
  );
};

export default NewsFeed;
