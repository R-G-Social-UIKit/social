import styled from 'styled-components';
import { Bars, Close } from '~/icons';

export const DetailsIcon = styled(Bars).attrs({ width: 16, height: 16 })`
  cursor: pointer;
  fill: ${({ theme }) => theme.palette.neutral.main};
  align-self: center;
`;

export const ChatHeaderContainer = styled.div`
  height: 76px;
  padding: 0 20px;
  background: ${({ theme }) => theme.palette.system.background};
  border-top: 1px solid #e3e4e8;
  border-bottom: 1px solid #e3e4e8;
  display: flex;
  justify-content: space-between;
  border-top-left-radius: 5px;
  border-top-right-radius: 5px;
  ${({ size }) =>
    size === 'small'
      ? `
    height: 56px;
`
      : `
    height: 76px;
`}
`;

export const Channel = styled.div`
  display: flex;
  align-items: center;
  ${({ size }) =>
  size === 'small'
    ? `
    width: unset;
`
    : `
    height: 74px;
`}
`;

export const ChannelInfo = styled.div`
  margin-left: 8px;
`;

export const ChannelName = styled.div`
  font-weight: 600;
  font-size: 14px;
  color: #000000;
`;

export const MemberCount = styled.div`
  font-size: 12px;
  color: #999999;
`;

export const HeaderCloseIcon = styled(Close).attrs({ width: 20, height: 20 })`
  color: ${({ theme }) => theme.palette.neutral.main};
  cursor: pointer;
  margin-top: 12px;
`;
