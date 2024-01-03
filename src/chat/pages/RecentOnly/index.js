import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { ChannelMembership, ChannelType, ChannelRepository } from '@amityco/js-sdk';
import { useIntl } from 'react-intl';

import { notification } from '~/core/components/Notification';
import RecentChat from '~/chat/components/RecentChat';
import Chat from '~/chat/components/Chat';
import ChatDetails from '~/chat/components/ChatDetails';

import { ApplicationContainerCommentOnly } from './styles';
import CreateChatModal from '~/chat/components/Chat/CreateChatModal';
import RecentChatBottom from '~/chat/components/RecentChatBottom';

const RecentChatOnly = ({
  membershipFilter,
  defaultChannelId,
  onMemberSelect,
  onChannelSelect,
  onAddNewChannel,
  onEditChatMember,
  setUnreadChats = () => {},
}) => {
  const { formatMessage } = useIntl();
  const [currentChannelData, setCurrentChannelData] = useState(null);
  const [shouldShowChatDetails, setShouldShowChatDetails] = useState(false);

  const showChatDetails = () => setShouldShowChatDetails(true);
  const hideChatDetails = () => setShouldShowChatDetails(false);

  const [isChatModalOpened, setChatModalOpened] = useState(false);
  const openChatModal = () => setChatModalOpened(true);

  const handleChannelSelect = (newChannelData) => {
    if (currentChannelData?.channelId === newChannelData?.channelId) return;
    hideChatDetails();
    onChannelSelect(newChannelData);
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

  useEffect(() => {
    if (!defaultChannelId) return;
    handleChannelSelect({ channelId: defaultChannelId, channelType: ChannelType.Standard });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [defaultChannelId]);

  const closeChat = () => {
    setCurrentChannelData(null);
  };

  return (
    <ApplicationContainerCommentOnly>
      {currentChannelData && (
        <div
          style={{
            width: 340,
            border: '1px solid #555',
            borderTopLeftRadius: 5,
            borderTopRightRadius: 5,
            marginRight: 8
          }}
        >
          <Chat
            size="small"
            channelId={currentChannelData.channelId}
            shouldShowChatDetails={shouldShowChatDetails}
            closeChat={closeChat}
            onChatDetailsClick={showChatDetails}
          />
        </div>
      )}
      {/* {shouldShowChatDetails && currentChannelData && (
        <ChatDetails
          channelId={currentChannelData.channelId}
          leaveChat={leaveChat}
          onEditChatMemberClick={onEditChatMember}
          onMemberSelect={onMemberSelect}
          onClose={hideChatDetails}
        />
      )} */}
      <RecentChatBottom
        selectedChannelId={currentChannelData?.channelId}
        membershipFilter={membershipFilter}
        setUnreadChats={setUnreadChats}
        onChannelSelect={handleChannelSelect}
        onAddNewChannelClick={() => {
          openChatModal();
          onAddNewChannel();
        }}
      />
      {isChatModalOpened && <CreateChatModal onClose={() => setChatModalOpened(false)} />}
    </ApplicationContainerCommentOnly>
  );
};

RecentChatOnly.propTypes = {
  membershipFilter: PropTypes.oneOf(Object.values(ChannelMembership)),
  defaultChannelId: PropTypes.string,
  onMemberSelect: PropTypes.func,
  onChannelSelect: PropTypes.func,
  onAddNewChannel: PropTypes.func,
  onEditChatMember: PropTypes.func,
};

RecentChatOnly.defaultProps = {
  membershipFilter: ChannelMembership.None,
  defaultChannelId: null,
  onMemberSelect: () => {},
  onChannelSelect: () => {},
  onAddNewChannel: () => {},
  onEditChatMember: () => {},
};

export default RecentChatOnly;
