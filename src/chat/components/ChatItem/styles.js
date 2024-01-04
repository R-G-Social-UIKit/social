import styled from 'styled-components';
import SideMenuItem from '~/core/components/SideMenuItem';
import UserAvatar from '~/chat/components/UserAvatar';

export const ChatItemContainer = styled(SideMenuItem)`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  height: 60px;
  margin: 0;
  padding: 0 18px 0 16px;
  border-radius: 0;
`;

export const ChatItemLeft = styled.div`
  display: flex;
  align-items: center;
`;

export const Avatar = styled(UserAvatar)`
  flex-shrink: 0;
`;

export const Title = styled.div`
  width: 135px;
  ${({ theme }) => theme.typography.bodyBold};
  text-align: left;
  color: #000;
  overflow: hidden;
  text-overflow: ellipsis;
  margin-left: 8px;
  ${({ titleLines }) =>
    titleLines < 3
      ? `
    white-space: nowrap;
    line-height: 20px;
`
      : `
    font-size: 12px;
    line-hight: 17px;
    margin-top: -3px;
    white-space: initial;
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;

`}
`;

export const UnreadCountNumber = styled.div`
  font-size: 14px;
  font-weight: 400;
  color: #666;
  font-family: serif;
`;

export const UnreadCount = styled.div`
  flex-shrink: 0;
  height: 12px;
  width: 12px;
  padding: 1px 6px;
  font-size: 13px;
  color: #fff;
  background: #ee3010;
  border-radius: 50%;
`;
