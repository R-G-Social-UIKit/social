import React, { useState, useEffect } from 'react';
import InfiniteScroll from 'react-infinite-scroller';
import { FormattedMessage } from 'react-intl';

import ChatItem from '~/chat/components/ChatItem';
import customizableComponent from '~/core/hocs/customization';
import useChannelsList from '~/chat/hooks/useChannelsList';
import { useSDK } from '~/core/hooks/useSDK';

import {
  CreateNewChatIcon,
  RecentContainerSmall,
  RecentHeader,
  RecentHeaderLabel,
  InfiniteScrollContainer,
} from './styles';

const TrackChatSender = require('../../helpers/trackChatSender');

const RecentChatBottom = ({
  onChannelSelect,
  onAddNewChannelClick,
  selectedChannelId,
  setUnreadChats = () => {},
  trackSocialEvent = () => {},
}) => {
  const [channels, hasMore, loadMore] = useChannelsList();
  const [showFull, setShowFull] = useState(false);
  const [unreads, setUnreads] = useState(-1);
  const { currentUserId } = useSDK();

  useEffect(() => {
    // if (channels && channels.length > 0 && channels[0].metadata.lastPostedBy === currentUserId) {
    //   console.log('last message by: ', TrackChatSender.getLastSender());
    // }
    if (hasMore) {
      loadMore();
    }
    if (!hasMore && channels && channels.length > 0) {
      let unread = 0;
      // console.log('show channels data: ', channels);
      channels.forEach(c => {
        unread += c.unreadCount;
      });
      if (unread !== unreads) {
        const lastSent = TrackChatSender.getLastSender();
        lastSent.channelCount = channels[0].messageCount;
        lastSent.channelLastActivity = channels[0].lastActivity.toString();
        // console.log('last sent info: ', lastSent);
        const sameCount = lastSent.channelCount === lastSent.count;
        const sameTime = lastSent.channelLastActivity === lastSent.time;
        setUnreadChats(unread, sameCount, sameTime); // pass back to the parent.
        setUnreads(unread);
      }
    }
  }, [channels, hasMore, loadMore, unreads]);

  return (
    <RecentContainerSmall
      onClick={() => setShowFull((prev) => !prev)}
      style={showFull ? { height: '100%', maxHeight: 'calc(100vh - 78px)' } : {}}
    >
      <RecentHeader>
        <RecentHeaderLabel>
          <FormattedMessage id="chat.chats" />
          {unreads > 0 && (
            <div style={{ display: 'inline-block', fontWeight: 400, marginLeft: 12 }}>
              ({unreads})
              <div
                style={{
                  display: 'inline-block',
                  background: 'red',
                  width: 12,
                  height: 12,
                  borderRadius: '50%',
                  marginLeft: 4,
                }}
              />
            </div>)}
        </RecentHeaderLabel>
        {/* this component work only with Callback and User selector on Eko Side, during Personal Mode 
        development selector was not add as there is not specific suitable design for UI Kit.
        Need to be done internaly by ASC when needed. */}
        <CreateNewChatIcon
          data-qa-anchor="chat-create-chat-button"
          onClick={onAddNewChannelClick}
        />
      </RecentHeader>
      <InfiniteScrollContainer data-qa-anchor="chat-list">
        <InfiniteScroll
          initialLoad={false}
          hasMore={hasMore}
          loadMore={loadMore}
          useWindow={false}
          // TODO: REMOVE when SDK Provide filter by membership
          threshold={1}
          loader={hasMore && <span key={0}>Loading...</span>}
        >
          {Array.isArray(channels) &&
            channels.map((channel) => (
              <ChatItem
                key={channel.channelId}
                channel={channel}
                isSelected={selectedChannelId === channel.channelId}
                onSelect={onChannelSelect}
              />
            ))}
        </InfiniteScroll>
      </InfiniteScrollContainer>
    </RecentContainerSmall>
  );
};

export default customizableComponent('RecentChat', RecentChatBottom);
