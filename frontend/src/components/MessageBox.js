import { Alert } from "react-bootstrap";

export default function MessageBox(props) {
  return (
    <Alert variant={props.variant || "info"}>
      <p className="mb-0">{props.children} </p>
    </Alert>
  );
}
// {props.heading && (
//   <>
//     <Alert.Heading>
//       {props.variant ? "Error" : "Information"}
//     </Alert.Heading>
//     <hr />
//   </>
// )}
