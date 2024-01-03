import React, { useEffect } from 'react';

import customizableComponent from '~/core/hocs/customization';
import { backgroundImage as userBackgroundImage } from '~/icons/User';
import { backgroundImage as communityBackgroundImage } from '~/icons/Community';
import useChatInfo from '~/chat/hooks/useChatInfo';
import useChannelMembers from '~/chat/hooks/useChannelMembers';

import {
  ChatItemLeft,
  Title,
  Avatar,
  ChatItemContainer,
  UnreadCount,
  UnreadCountNumber,
} from './styles';

function getNormalizedUnreadCount(channelUnreadCount) {
  // Within this range the unread counter will show an actuall number
  const ACTUAL_NUMBER_AS_COUNTER_EDGES = {
    BOTTOM: 1,
    TOP: 99,
  };

  if (!channelUnreadCount) return '';

  if (channelUnreadCount < ACTUAL_NUMBER_AS_COUNTER_EDGES.BOTTOM) return '';

  if (channelUnreadCount <= ACTUAL_NUMBER_AS_COUNTER_EDGES.TOP) return channelUnreadCount;

  return `${ACTUAL_NUMBER_AS_COUNTER_EDGES.TOP}+`;
}

const ChatItem = ({ channel, isSelected, onSelect }) => {
  const { chatName, chatAvatar } = useChatInfo({ channel });

  // get all the chat (channel) members
  // const [members, hasMore, loadMore] = useChannelMembers(chatName, channel.memberCount);
  // console.log('chat name', chatName);
  // useEffect(() => {
  //   console.log('*************************** use effect chat members');
  //   if (members  && members.length > 0) {
  //     console.log('*************************** use effect chat memberscount: ', members.length);
  //     if (hasMore) {
  //       console.log( '*************************** use effect chat memberscout: hasMoreMembers = true');
  //       loadMore();
  //     } else {
  //       // dump the members
  //       console.log('*************************** use effect chat members: ', members);
  //     }
  //   }
  // }, [members, hasMore, loadMore]);

  const handleChatItemClick = (e) => {
    e.stopPropagation();
    onSelect({ channelId: channel.channelId, channelType: channel.type });
  };

  const normalizedUnreadCount = getNormalizedUnreadCount(channel.unreadCount);

  return (
    <ChatItemContainer
      data-qa-anchor="chat-item"
      active={isSelected}
      title={chatName}
      onClick={handleChatItemClick}
    >
      <ChatItemLeft>
        <Avatar
          avatarUrl={chatAvatar}
          defaultImage={channel.memberCount > 2 ? communityBackgroundImage : userBackgroundImage}
        />
        <Title>{chatName}</Title>
      </ChatItemLeft>
      {normalizedUnreadCount && (
        <>
        <UnreadCountNumber>({normalizedUnreadCount})</UnreadCountNumber>
        <UnreadCount data-qa-anchor="chat-item-unread-count" />
        </>
      )}
    </ChatItemContainer>
  );
};

export default customizableComponent('ChatItem', ChatItem);
