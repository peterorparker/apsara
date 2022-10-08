import { Typography } from "@mui/material";
import ReactMarkdown from "react-markdown";
import "../styles/default.css";

export function Score(props: { message: string }) {
  return <ReactMarkdown className="score">{props.message}</ReactMarkdown>;
}

export function Title(props: { title: string; height?: number }) {
  const height = props.height || 400;
  const width = (height / 4) * 3;

  return (
    <Typography variant="h4" align="center" sx={{ width: width }}>
      {props.title}
    </Typography>
  );
}

export function CelebNote(props: { seed: { [key: string]: string } }) {
  return (
    <Typography variant="h6" align="center">
      {props.seed.count} {props.seed.group} Celebs refreshed on{" "}
      {props.seed.timestamp}
    </Typography>
  );
}
