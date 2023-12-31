import styled from 'styled-components';

export const InfiniteScrollContainer = styled.div`
  display: flex;
  flex-direction: column-reverse;
  flex-grow: 1;
  overflow: auto;
  background: #f7f7f8;
`;

export const MessageListContainer = styled.div`
  display: flex;
  flex-direction: column-reverse;
  padding: 8px 20px;
  max-height: calc(100vh - 200px);
`;
