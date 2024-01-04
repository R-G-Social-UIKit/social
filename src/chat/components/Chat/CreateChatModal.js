import React from 'react';
import { useIntl } from 'react-intl';
import { ChannelRepository } from '@amityco/js-sdk';

import Modal from '~/core/components/Modal';
import ChatComposer from '~/chat/components/Chat/ChatComposer';
import promisify from '~/helpers/promisify';
import { confirm } from '~/core/components/Confirm';
import { useSDK } from '~/core/hocs/withSDK';

const CreateChatModal = ({ onClose, listOfChats, user }) => {
  const { formatMessage } = useIntl();
  const { currentUserId, client } = useSDK();

  const handleSubmit = async (data, memberList) => {
    const newChat = { ...data, metadata: { createdBy: currentUserId, memberList } };
    await promisify(ChannelRepository.createChannel(newChat));
    onClose();
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
