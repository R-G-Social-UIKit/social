import styled from 'styled-components';
import UiKitAvatar from '~/core/components/Avatar';

import { Close, EllipsisV, Save, Trash } from '~/icons';

export const EditingContainer = styled.div`
  display: flex;
  align-items: center;
`;

export const EditingInput = styled.input`
  height: 34px;
  padding: 6px;
  margin: 5px;
  outline: none;
  border: 1px solid #e3e4e8;
  border-radius: 4px;
`;

export const SaveIcon = styled(Save)`
  opacity: 0.7;
  padding: 0 10px;
  cursor: pointer;
`;

export const DeleteIcon = styled(Trash)`
  opacity: 0.7;
  padding: 0 10px;
  cursor: pointer;
`;

export const CloseIcon = styled(Close)`
  opacity: 0.7;
  padding: 0 10px;
  cursor: pointer;
`;

export const MessageOptionsIcon = styled(EllipsisV).attrs({ width: 11, height: 11 })`
  opacity: 0.5;
  margin: 0 5px;
  cursor: pointer;
`;

export const Avatar = styled(UiKitAvatar)`
  margin-right: auto;
  ${({ size }) =>
    size === 'small'
      ? `
    width: 30px;
    height: 30px;
`
      : `
    width: 40px;
`}
`;

export const MessageReservedRow = styled.div`
  display: flex;
  width: 100%;
  ${({ isIncoming }) => !isIncoming && 'justify-content: flex-end;'}
`;

export const MessageWrapper = styled.div`
  display: flex;
  max-width: 60%;
`;

export const MessageContainer = styled.div`
${({ size }) =>
    size === 'small'
      ? `
  min-width: 195px;
`
      : `
  min-width: 25vw;
`}
`;

export const AvatarWrapper = styled.div`
  flex-shrink: 0;
  ${({ size }) =>
    size === 'small'
      ? `
      width: 36px;
`
      : `
      width: 52px;
`}
`;

export const UserName = styled.div`
  color: ${({ theme }) => theme.palette.neutral.main};
  font-size: 14px;
  font-weight: 600;
  margin-bottom: 4px;
`;

const CommonMessageBody = styled.div`
  display: flex;
  flex-direction: column;
  margin-bottom: 8px;
  padding: 8px;
  word-break: break-word;

  & pre {
    white-space: pre-wrap;
  }
`;

export const GeneralMessageBody = styled(CommonMessageBody)`
  ${({ theme, isIncoming }) =>
    isIncoming
      ? `
      background: ${theme.palette.neutral.shade4};
      color: #fff;
      border-radius: 0px 14px 14px 14px;
    `
      : `
      background: #9a9dab;
      color: #fff;
      border-radius: 14px 0px 14px 14px;
  `}
`;

export const DeletedMessageBody = styled(CommonMessageBody)`
  text-align: ${({ isIncoming }) => (isIncoming ? 'left' : 'right')};
`;

export const UnsupportedMessageBody = styled(CommonMessageBody)`
  text-align: center;
  background: ${({ theme }) => theme.palette.neutral.shade4};
  border-radius: 10px;
`;

export const MessageDate = styled.div`
  font-size: 13px;
  opacity: 0.5;
  margin-left: auto;
`;

export const BottomLine = styled.div`
  margin-top: 3px;
  display: flex;
  align-items: center;
`;
