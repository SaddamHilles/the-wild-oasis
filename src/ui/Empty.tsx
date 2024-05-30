interface IProps {
  resource: string;
}
function Empty({ resource }: IProps) {
  return <p>No {resource} could be found.</p>;
}

export default Empty;
