import { AppBar, IconButton, Link, Toolbar, Typography } from "@mui/material";
import ArrowBackIosTwoToneIcon from "@mui/icons-material/ArrowBackIosTwoTone";

export interface CustomAppBarProps {
  backurl?: string;
  title?: string;
}

export default function CustomAppBar(props: CustomAppBarProps) {
  return (
    <AppBar
      position="absolute"
      color="default"
      elevation={0}
      sx={{
        position: "relative",
        borderBottom: (t) => `1px solid ${t.palette.divider}`,
      }}
    >
      <Toolbar>
        {props.backurl ? (
          <IconButton disableRipple={true} href={props.backurl}>
            <ArrowBackIosTwoToneIcon sx={{ mr: 2 }} />
          </IconButton>
        ) : (
          <></>
        )}
        <div></div>
        <Typography variant="h6" color="inherit" noWrap>
          {props.title}
        </Typography>
      </Toolbar>
    </AppBar>
  );
}
