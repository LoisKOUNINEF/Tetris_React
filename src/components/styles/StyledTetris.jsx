import styled from 'styled-components';
import bgImage from '../../img/bg.png';

export const StyledTetrisWrapper = styled.div`
  width: 100vw;
  height: 100vh;
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  align-items: center;
  background: url(${bgImage}) #000;
  background-size: cover;
  overflow: hidden;
`

export const StyledTetris = styled.div`
  display: flex;
  flex-wrap: wrap;
  align-items: flex-start;
  padding: 3em;
  margin: 0 auto;
  width: min(100%, 80rem);

  aside {
    width: 100%;
    max-width: 15rem;
    display: block;
    padding: 0 1.5em;
  }
`
