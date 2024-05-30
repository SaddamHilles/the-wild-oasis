import { ReactNode } from 'react';
import styled from 'styled-components';

const StyledDataItem = styled.div`
  display: flex;
  align-items: center;
  gap: 1.6rem;
  padding: 0.8rem 0;
`;

const Label = styled.span`
  display: flex;
  align-items: center;
  gap: 0.8rem;
  font-weight: 500;

  & svg {
    width: 2rem;
    height: 2rem;
    color: var(--color-brand-600);
  }
`;

interface IDataItem {
  icon: ReactNode;
  children: ReactNode;
  label: string;
}
function DataItem({ icon, label, children }: IDataItem) {
  return (
    <StyledDataItem>
      <Label>
        {icon}
        <span>{label}</span>
      </Label>
      {children}
    </StyledDataItem>
  );
}

export default DataItem;
