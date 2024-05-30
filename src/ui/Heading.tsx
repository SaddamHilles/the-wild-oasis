import { ElementType } from 'react';
import styled, { css } from 'styled-components';

// const test = css`
//   text-align: center;
// `;

interface IHeading {
  as: ElementType;
}
const Heading = styled.h1<Partial<IHeading>>`
  ${props =>
    props.as === 'h1' &&
    css`
      font-size: 3rem;
      font-weight: 600;
    `};

  ${props =>
    props.as === 'h2' &&
    css`
      font-size: 2rem;
      font-weight: 600;
    `};

  ${props =>
    props.as === 'h3' &&
    css`
      font-size: 1.5rem;
      font-weight: 500;
    `};

  line-height: 1.4;
`;

export default Heading;
