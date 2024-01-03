import styled from 'styled-components';
import { CreateChat } from '~/icons';

export const CreateNewChatIcon = styled(CreateChat).attrs({ width: 24, height: 18 })`
  cursor: pointer;
`;

export const RecentContainer = styled.div`
  display: flex;
  flex-direction: column;
  flex-shrink: 0;
  width: 280px;
  padding: 24px 0 5px 0;
  background-color: white;
  border-right: 1px solid #e3e4e8;
`;
export const RecentContainerSmall = styled.div`
  display: flex;
  flex-direction: column;
  display: flex;
  flex-direction: column;
  flex-shrink: 0;
  width: 280px;
  padding: 12px 0 5px 0;
  background-color: white;
  border: 1px solid #555;
  border-top-left-radius: 5px;
  height: 54px;
`;
export const RecentHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-shrink: 0;
  margin-bottom: 5px;
  padding-left: 20px;
  padding-right: 16px;
  padding-bottom: 8px;
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
