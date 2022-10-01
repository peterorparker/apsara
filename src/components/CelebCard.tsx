import {
  Card,
  CardActionArea,
  CardContent,
  CardMedia,
  Typography,
} from "@mui/material";
import { useRef } from "react";
import data from "../data/celebs.json";
import "../styles/default.css";

const padding = {
  padding: 0.5,
};
const background = {
  backgroundColor: "#019875",
};

function CelebCard(props: {
  name: string;
  group: string;
  onClick?: () => void;
  disabled?: boolean;
  selected?: boolean;
  height?: number;
}) {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const getRandom = (data: any) => {
    const files = data.files[props.group][props.name];
    return "/apsara/" + files[Math.floor(Math.random() * files.length)];
  };

  const height = props.height || 400;
  const width = (height / 4) * 3;
  const selected = props.selected;

  const url = useRef(getRandom(data)).current;

  return (
    <Card raised={selected} sx={{ width: width }}>
      <CardActionArea
        sx={props.disabled ? { ...background, filter: "grayscale(80)" } : {}}
        disabled={props.disabled || false}
        onClick={props.onClick}
      >
        <CardMedia component="img" height={height} src={url} />
        <CardContent sx={selected ? { ...background, ...padding } : padding}>
          <Typography
            variant="subtitle1"
            align="center"
            sx={{ fontWeight: 800 }}
          >
            {props.name}
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card>
  );
}

export default CelebCard;
