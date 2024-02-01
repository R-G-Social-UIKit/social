import React from 'react';
import { FormattedMessage } from 'react-intl';
import { ChannelRepository } from '@amityco/js-sdk';
import { useSDK } from '~/core/hocs/withSDK';

import UserAvatar from '~/chat/components/UserAvatar';
import customizableComponent from '~/core/hocs/customization';
import useLiveObject from '~/core/hooks/useLiveObject';
import { backgroundImage as userBackgroundImage } from '~/icons/User';
import { backgroundImage as communityBackgroundImage } from '~/icons/Community';
import useChatInfo from '~/chat/hooks/useChatInfo';

import {
  ChatHeaderContainer,
  DetailsIcon,
  Channel,
  ChannelInfo,
  ChannelName,
  MemberCount,
  HeaderCloseIcon,
} from './styles';

const ChatHeader = ({ channelId, onChatDetailsClick, shouldShowChatDetails, size, closeChat }) => {
  const channel = useLiveObject(() => ChannelRepository.getChannel(channelId), [channelId]);
  const { chatName, chatAvatar } = useChatInfo({ channel });
  const { currentUserId } = useSDK();

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
    if (channel.metadata && channel.metadata.memberList && channel.metadata.memberList.length === 2) {
      channel.metadata.memberList.forEach((member) => {
        if (member.id !== currentUserId) {
          avatar = member.avatar;
        }
      })
    }
    return avatar;
  }


  const onClose = () => {
    if (closeChat) {
      closeChat(channelId);
    }
  };

  return (
    <ChatHeaderContainer data-qa-anchor="chat-header" size={size}>
      <Channel size={size}>
        <UserAvatar
          avatarUrl={getChatAvatar()}
          defaultImage={channel.memberCount > 2 ? communityBackgroundImage : userBackgroundImage}
        />
        <ChannelInfo data-qa-anchor="chat-header-channel-info">
          <ChannelName data-qa-anchor="chat-header-channel-info-channel-name">
            {getChatName()}
          </ChannelName>
          <MemberCount data-qa-anchor="chat-header-channel-info-member-count">
            <FormattedMessage id="chat.members.count" values={{ count: channel.memberCount }} />
          </MemberCount>
        </ChannelInfo>
      </Channel>
      {!shouldShowChatDetails && size !== 'small' && size !== 'mobile' && (
        <DetailsIcon onClick={onChatDetailsClick} />
      )}
      {(size === 'small' || size === 'mobile') && <HeaderCloseIcon onClick={onClose} />}
    </ChatHeaderContainer>
  );
};

export default customizableComponent('ChatHeader', ChatHeader);
