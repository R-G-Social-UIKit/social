import React, { useState } from 'react';

import customizableComponent from '~/core/hocs/customization';
import { backgroundImage as userBackgroundImage } from '~/icons/User';
import { backgroundImage as communityBackgroundImage } from '~/icons/Community';
import useChatInfo from '~/chat/hooks/useChatInfo';
import { useSDK } from '~/core/hocs/withSDK';

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
  const { currentUserId } = useSDK();

  const handleChatItemClick = (e) => {
    e.stopPropagation();
    onSelect(channel);
  };

  const getChatName = () => {
    let name = chatName;
    if (channel.metadata && channel.metadata.memberList) {
      name = '';
      const users = [];
      channel.metadata.memberList.forEach((member, index) => {
        if (member.id !== currentUserId) {
          users.push(member.name);
        }
      });
      if (users.length > 0) {
        name = users.join(', ');
      }
    }
    return name;
  }

  const getChatAvatar = () => {
    let avatar = chatAvatar;
    if (channel.metadata && channel.metadata.memberList && channel.memberCount === 2) {
      channel.metadata.memberList.forEach((member) => {
        if (member.id !== currentUserId) {
          avatar = member.avatar;
        }
      })
    }
    return avatar;
  }

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
          avatarUrl={getChatAvatar()}
          defaultImage={channel.memberCount > 2 ? communityBackgroundImage : userBackgroundImage}
        />
        <Title titleLines={channel.memberCount}>{getChatName()}</Title>
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
