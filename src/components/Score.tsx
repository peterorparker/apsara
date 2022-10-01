import { Typography } from "@mui/material";
import ReactMarkdown from "react-markdown";
import "../styles/default.css";

export default function Score(props: { message: string }) {
  return (
    // <Typography variant="body1" align="center">
    //   <pre style={{ fontFamily: "inherit" }}>{props.message}</pre>
    // </Typography>
    <ReactMarkdown className="score">{props.message}</ReactMarkdown>
  );
}
