import styled from 'styled-components';

export const ApplicationContainer = styled.div`
  height: 100%;
  width: 100%;
  ${({ isMobile }) =>
  isMobile
    ? `
  display: unset;
`
    : `
    display: flex;
`}
`;
