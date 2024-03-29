import styled from 'styled-components';
import { CreateChat } from '~/icons';

export const CreateNewChatIcon = styled(CreateChat).attrs({ width: 24, height: 18 })`
  cursor: pointer;
`;

export const RecentContainer = styled.div`
  display: flex;
  flex-direction: column;
  flex-shrink: 0;
  padding: 24px 0 5px 0;
  background-color: white;
  border-right: 1px solid #e3e4e8;
  ${({ isMobile }) =>
    isMobile
      ? `
    width: 100vw;
`
      : `
    width: 280px;
`}
`;

export const RecentHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-shrink: 0;
  padding-bottom: 8px;
  padding-left: 20px;
  padding-right: 16px;
  border-bottom: 1px solid #ddd;
`;

export const RecentHeaderLabel = styled.span`
  ${({ theme }) => theme.typography.title};
  line-height: 28px;
  color: ${({ theme }) => theme.palette.neutral.shade1};
`;

// TODO: change overflow-y to auto when membership filter provided by SDK
export const InfiniteScrollContainer = styled.div`
  display: flex;
  flex-direction: column;
  flex-grow: 1;
  overflow-y: scroll;
  overflow-x: hidden;
`;
