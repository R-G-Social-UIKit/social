import React, { useEffect } from 'react';
import { useIntl } from 'react-intl';
import { ChannelRepository } from '@amityco/js-sdk';

import Modal from '~/core/components/Modal';
import ChatComposer from '~/chat/components/Chat/ChatComposer';
import promisify from '~/helpers/promisify';
import { confirm } from '~/core/components/Confirm';
import { useSDK } from '~/core/hocs/withSDK';
import useUser from '~/core/hooks/useUser';
import useChannelsList from '~/chat/hooks/useChannelsList';
import useChannelMembers from '~/chat/hooks/useChannelMembers';

const CreateChatModal = ({ onClose, onFoundExistingChannel }) => {
  const { formatMessage } = useIntl();
  const { currentUserId, client } = useSDK();
  const { user } = useUser(currentUserId);
  const [channels, hasMore, loadMore] = useChannelsList();
  // const [members, hasMoreMembers = hasMore, loadMoreMembers = loadMore] = useChannelMembers();

  useEffect(() => {
    // if (channels && channels.length > 0 && channels[0].metadata.lastPostedBy === currentUserId) {
    //   console.log('last message by: ', TrackChatSender.getLastSender());
    // }
    if (hasMore) {
      loadMore();
    }
    if (!hasMore && channels && channels.length > 0) {
      // all channels are read in by this time.
    }
  }, [channels, hasMore, loadMore]);

  const getMembership = async (channelId) => {
    const liveCollection = ChannelRepository.queryMembers({ channelId });
    const communityMembers = await promisify(liveCollection);
    return communityMembers;
    // console.log('possible membership', channelId, communityMembers);
  };

  const handleSubmit = async (data, memberList) => {
    memberList.push({
      name: user.displayName,
      avatar: user.avatarCustomUrl,
      id: user.userId,
    });

    // first see if this chat already exists!!!
    const newMemberCount = memberList.length;
    const possibleChannels = [];
    channels.forEach(channel => {
      if (channel.memberCount === newMemberCount) {
        possibleChannels.push(channel.channelId);
      }
    });

    // no chats found at this length
    if (possibleChannels.length === 0) {
      const newChat = { ...data, metadata: { createdBy: currentUserId, memberList } };
      await promisify(ChannelRepository.createChannel(newChat));
      onClose();
    }

    // well, there are some... let's look at the membership
    const memberIds = memberList.map(m => m.id);
    let existingChannel = null;
    channels.forEach(async (channel, index) => {
      if (!existingChannel && channel.memberCount === newMemberCount) {
        const nextMemberList =
          channel.metadata && channel.metadata.memberList ? channel.metadata.memberList : [];
        let isMatch = nextMemberList.length > 0;
        nextMemberList.forEach((member) => {
          if (!memberIds.includes(member.id)) {
            isMatch = false; // :(
          }
        });
        if (isMatch) {
          // eslint-disable-next-line require-atomic-updates
          existingChannel = channel;
        }
      }
    });

    if (existingChannel) {
      onFoundExistingChannel(existingChannel.channelId);
    } else {
      const newChat = { ...data, metadata: { createdBy: currentUserId, memberList } };
      await promisify(ChannelRepository.createChannel(newChat));
      onClose();
    }
  };

  const closeConfirm = () =>
    confirm({
      title: formatMessage({ id: 'CommunityCreationModal.title' }),
      content: formatMessage({ id: 'CommunityCreationModal.content' }),
      cancelText: formatMessage({ id: 'CommunityCreationModal.cancelText' }),
      okText: formatMessage({ id: 'CommunityCreationModal.okText' }),
      onOk: onClose,
    });

  return (
    <Modal
      data-qa-anchor="create-chat-modal"
      title={formatMessage({ id: 'chat_modal.title' })}
      onCancel={closeConfirm}
    >
      <ChatComposer onSubmit={handleSubmit} onCancel={closeConfirm} />
    </Modal>
  );
};

export default CreateChatModal;
