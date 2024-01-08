import React, { useEffect, useState } from 'react';
import { MessageRepository, ChannelRepository } from '@amityco/js-sdk';

import MessageList from '~/chat/components/MessageList';
import MessageComposeBar from '~/chat/components/MessageComposeBar';
import customizableComponent from '~/core/hocs/customization';
import { useSDK } from '~/core/hocs/withSDK';
import promisify from '~/helpers/promisify';

import ChatHeader from '~/chat/components/ChatHeader';
import { ChannelContainer } from './styles';

const channelRepo = new ChannelRepository();
const trackChatSender = require('../../helpers/trackChatSender');

const Chat = ({
  channelId,
  channel,
  onChatDetailsClick,
  shouldShowChatDetails,
  size,
  closeChat,
  trackChatEvent,
}) => {

  // const [channel, setChannel] = useState(null);
  const { currentUserId } = useSDK();

  useEffect(() => {
    const channelLiveObject = channelRepo.joinChannel({ channelId });

    // TODO call startReading once on join, everytime a new message is received and a message list is scrolled to very bottom
    if (channelLiveObject.model?.membership) {
      channelLiveObject.model.membership.startReading();
    }

    channelLiveObject.on('dataUpdated', (channelModel) => {
      if (!channelModel?.membership) {
        return;
      }
      channelModel.membership.startReading();
    });

    return () => {
      if (channelLiveObject?.model?.membership) {
        channelLiveObject.model.membership.stopReading();
       //  setChannel(channelLiveObject.model);
      }

      channelLiveObject.dispose();
    }
  }, [channelId, currentUserId]);

  const sendMessage = (text) => {
    
    // put the metadata into the channel
    // can only do this if you're the owner of the channel
    // const { metadata } = channel;
    // metadata.lastPostedBy = currentUserId;
    // console.log('sendMessage', channelId, channel, metadata, text);
    // channelRepo.setMetadata({ channelId, metadata });
  

    MessageRepository.createTextMessage({
      channelId,
      text,
    });
    trackChatSender.saveLastSender(new Date(), channel.messageCount + 1);
    // console.log('sendMessage', channelId, channel, text);
    // console.log('message info:', new Date(), channel.lastActivity, channel.messageCount);
    trackChatEvent({ type: 'chat message', channel, currentUserId, text });
  };

  return (
    <ChannelContainer>
      <ChatHeader
        channelId={channelId}
        shouldShowChatDetails={shouldShowChatDetails}
        size={size}
        closeChat={closeChat}
        onChatDetailsClick={onChatDetailsClick}
      />
      <MessageList channelId={channelId} size={size} />
      <MessageComposeBar onSubmit={sendMessage} />
    </ChannelContainer>
  );
};

export default customizableComponent('Chat', Chat);
