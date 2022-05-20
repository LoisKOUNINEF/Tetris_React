import styled from 'styled-components';

export const StyledDisplay = styled.div`
  box-sizing: border-box;
  display: flex;
  align-items: center;
  margin: 0 0 1.5em 0;
  padding: 1.5em;
  border: 4px solid #333;
  min-height: 30px;
  width: 100%;
  border-radius: 1.5em;
  color: ${props => (props.gameOver ? 'red' : '#999')};
  background-color: #000;
  font-family: Pixel, Arial, Helvetica, sans-serif;
  font-size: 0.8rem;
`
