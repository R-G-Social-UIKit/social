import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { ChannelMembership, ChannelType, ChannelRepository } from '@amityco/js-sdk';
import { useIntl } from 'react-intl';

import { notification } from '~/core/components/Notification';
import RecentChat from '~/chat/components/RecentChat';
import Chat from '~/chat/components/Chat';
import ChatDetails from '~/chat/components/ChatDetails';

import { ApplicationContainer } from './styles';
import CreateChatModal from '~/chat/components/Chat/CreateChatModal';

const ChatApplication = ({
  membershipFilter,
  defaultChannelId,
  isMobile,
  onMemberSelect,
  onChannelSelect,
  onAddNewChannel,
  onEditChatMember,
  trackSocialEvent = () => {},
}) => {
  const { formatMessage } = useIntl();
  const [currentChannelData, setCurrentChannelData] = useState(null);
  const [shouldShowChatDetails, setShouldShowChatDetails] = useState(false);

  const showChatDetails = () => setShouldShowChatDetails(true);
  const hideChatDetails = () => setShouldShowChatDetails(false);

  const [isChatModalOpened, setChatModalOpened] = useState(false);
  const openChatModal = () => setChatModalOpened(true);

  const handleChannelSelect = (newChannelData) => {
    // console.log('handle channel select', newChannelData);
    if (currentChannelData?.channelId === newChannelData?.channelId) return;
    hideChatDetails();
    // onChannelSelect(newChannelData);
    setCurrentChannelData(newChannelData);
  };

  const leaveChat = () => {
    ChannelRepository.leaveChannel(currentChannelData?.channelId)
      .then(() => {
        notification.success({
          content: formatMessage({ id: 'chat.leaveChat.success' }),
        });
      })
      .catch(() => {
        notification.error({
          content: formatMessage({ id: 'chat.leaveChat.error' }),
        });
      });

    setCurrentChannelData(null);
  };

  const onFoundExistingChannel = (channelId) => {
    setChatModalOpened(false);
    handleChannelSelect({ channelId, channelType: ChannelType.Standard });
    // setCurrentChannelData(null);
  };

  const closeChat = () => {
    setCurrentChannelData(null);
  };

  useEffect(() => {
    if (!defaultChannelId) return;
    handleChannelSelect({ channelId: defaultChannelId, channelType: ChannelType.Standard });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [defaultChannelId]);

  return (
    <ApplicationContainer isMobile={isMobile}>
      {(!isMobile || !currentChannelData) && (
        <RecentChat
          selectedChannelId={currentChannelData?.channelId}
          membershipFilter={membershipFilter}
          isMobile={isMobile}
          onChannelSelect={handleChannelSelect}
          onAddNewChannelClick={() => {
            openChatModal();
            onAddNewChannel();
          }}
        />
      )}
      {currentChannelData && (
        <Chat
          channelId={currentChannelData.channelId}
          channel={currentChannelData}
          size={isMobile ? 'mobile' : ''}
          closeChat={closeChat}
          shouldShowChatDetails={shouldShowChatDetails}
          trackChatEvent={trackSocialEvent}
          onChatDetailsClick={showChatDetails}
        />
      )}
      {/* List the chats here... */}
      {shouldShowChatDetails && currentChannelData && (
        <ChatDetails
          channelId={currentChannelData.channelId}
          isMobile={isMobile}
          leaveChat={leaveChat}
          onEditChatMemberClick={onEditChatMember}
          onMemberSelect={onMemberSelect}
          onClose={hideChatDetails}
        />
      )}
      {isChatModalOpened && (
        <CreateChatModal
          onClose={() => setChatModalOpened(false)}
          onFoundExistingChannel={onFoundExistingChannel}
        />
      )}
    </ApplicationContainer>
  );
};

ChatApplication.propTypes = {
  membershipFilter: PropTypes.oneOf(Object.values(ChannelMembership)),
  defaultChannelId: PropTypes.string,
  trackSocialEvent: PropTypes.func,
  onMemberSelect: PropTypes.func,
  onChannelSelect: PropTypes.func,
  onAddNewChannel: PropTypes.func,
  onEditChatMember: PropTypes.func,
};

ChatApplication.defaultProps = {
  membershipFilter: ChannelMembership.None,
  defaultChannelId: null,
  trackSocialEvent: () => {},
  onMemberSelect: () => {},
  onChannelSelect: () => {},
  onAddNewChannel: () => {},
  onEditChatMember: () => {},
};

export default ChatApplication;
