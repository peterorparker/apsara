import { Typography } from "@mui/material";

export default function Title(props: { title: string; height?: number }) {
  const height = props.height || 400;
  const width = (height / 4) * 3;

  return (
    <Typography variant="h4" align="center" sx={{ width: width }}>
      {props.title}
    </Typography>
  );
}
