import { Alert } from "react-bootstrap";

export default function MessageBox(props) {
  return (
    <Alert variant={props.variant || "info"}>
      <Alert.Heading>Error</Alert.Heading>
      <hr />
      <p className="mb-0">{props.children} </p>
    </Alert>
  );
}
