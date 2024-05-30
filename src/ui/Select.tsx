import styled from 'styled-components';

interface IStyledSelect {
  type: 'white' | 'black';
}
export const StyledSelect = styled.select<IStyledSelect>`
  font-size: 1.4rem;
  padding: 0.8rem 1.2rem;
  border: 1px solid
    ${props =>
      props.type === 'white'
        ? 'var(--color-grey-100)'
        : 'var(--color-grey-300)'};
  border-radius: var(--border-radius-sm);
  background-color: var(--color-grey-0);
  font-weight: 500;
  box-shadow: var(--shadow-sm);
`;
