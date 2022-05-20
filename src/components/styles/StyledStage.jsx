import styled from 'styled-components';

export const StyledStage = styled.div`
  display: grid;
  grid-template-rows: repeat(
  ${props => props.height},
  calc(25vw / ${props => props.width})
  );
  grid-template-columns: repeat(${props => props.width}, 1fr);
  grid-gap: 0.08em;
  border: 0.12em solid #333;
  width: min(100%, 25vw);
  background-color: #111;
`
