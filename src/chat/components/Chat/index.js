import React, { useEffect, useState } from 'react';
import { MessageRepository, ChannelRepository } from '@amityco/js-sdk';

import MessageList from '~/chat/components/MessageList';
import MessageComposeBar from '~/chat/components/MessageComposeBar';
import customizableComponent from '~/core/hocs/customization';

import ChatHeader from '~/chat/components/ChatHeader';

import { ChannelContainer } from './styles';

const channelRepo = new ChannelRepository();

const Chat = ({
  channelId,
  onChatDetailsClick,
  shouldShowChatDetails,
  size,
  closeChat,
  trackChatEvent,
}) => {

  const [channel, setChannel] = useState(null);
  const [chatMembers, setChatMembers] = useState([]);

  useEffect(() => {
    console.log('use effect: channelLiveObject');
    // const channelLiveObject = channelRepo.joinChannel({ channelId });

    // // TODO call startReading once on join, everytime a new message is received and a message list is scrolled to very bottom
    // if (channelLiveObject.model?.membership) {
    //   channelLiveObject.model.membership.startReading();
    // }

    // channelLiveObject.on('dataUpdated', (channelModel) => {
    //   if (!channelModel?.membership) {
    //     return;
    //   }

    //   channelModel.membership.startReading();
    // });

    // return () => {
    //   if (channelLiveObject?.model?.membership) {
    //     channelLiveObject.model.membership.stopReading();
    //     setChannel(channelLiveObject.model);
    //   }

    //   channelLiveObject.dispose();

      // let members;

      // const liveCollection = ChannelRepository.queryMembers({
      //   channelId,
      // //   memberships: [MemberFilter.Member],
      //  //  roles: ['role1'],
      //   // search: 'asd',
      // });

      // liveCollection.on('dataUpdated', newModels => {
      //   members = newModels;
      // });

      // liveCollection.on('dataError', error => {
      //   console.error(error);
      // });

      // members = liveCollection.models;
      // setChatMembers(members);
   //  };
  }, [channelId]);

  const sendMessage = (text) => {
    MessageRepository.createTextMessage({
      channelId,
      text,
    });
    trackChatEvent(channel, chatMembers, text);
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
