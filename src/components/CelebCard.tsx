import KeyboardDoubleArrowRightIcon from "@mui/icons-material/KeyboardDoubleArrowRight";
import RefreshIcon from "@mui/icons-material/Refresh";
import {
  Card,
  CardActionArea,
  CardHeader,
  CardMedia,
  IconButton,
} from "@mui/material";
import { useState, useEffect } from "react";
import { getRandomImage } from "../scripts/utils";

const padValue = 0.8;
const padding = {
  padding: padValue,
  "&:last-child": {
    paddingBottom: padValue,
  },
};

const transition = {
  transition: "all 0.3s ease",
};

const disabledStyle = {
  filter: "grayscale(80)",
  ...transition,
};

const enabledStyle = {
  ...transition,
};

const selectedStyle = {
  backgroundColor: "#019875",
  textAlign: "center",
  ...transition,
  ...padding,
};

const unselectedStyle = {
  textAlign: "center",
  ...transition,
  ...padding,
};

function CelebCard(props: {
  name: string;
  group: string;
  onSelect?: () => void;
  disabled?: boolean;
  selected?: boolean;
  height?: number;
}) {
  const height = props.height || 400;
  const width = (height / 4) * 3;
  const cardStyle = {
    width: width,
    height: height + 45,
    justifyContent: "flex-end",
    alignContent: "center",
    display: "inline-flex",
    flexDirection: "column",
  };
  const selected = props.selected;

  const [image, setImage] = useState(getRandomImage(props.group, props.name));
  const updateImage = () => setImage(getRandomImage(props.group, props.name));

  useEffect(() => {
    updateImage();
  }, [props.name]);

  return (
    <Card
      raised={selected}
      sx={
        props.disabled
          ? { ...disabledStyle, ...cardStyle }
          : {
              ...enabledStyle,
              ...cardStyle,
            }
      }
    >
      <CardActionArea
        disabled={props.disabled || false}
        onClick={props.onSelect}
        sx={{ alignItems: "center", justifyContent: "center" }}
      >
        <CardMedia
          component="img"
          sx={{
            // width: "auto",
            // margin: "auto",
            height: height,
            objectFit: "cover",
          }}
          src={image}
        />
      </CardActionArea>
      <CardHeader
        avatar={<KeyboardDoubleArrowRightIcon sx={{ color: "white" }} />}
        action={
          <IconButton onClick={updateImage}>
            <RefreshIcon />
          </IconButton>
        }
        title={props.name}
        sx={selected ? selectedStyle : unselectedStyle}
      ></CardHeader>
    </Card>
  );
}

export default CelebCard;
