import { Card, CardActions, Button } from "@mui/material";

export default function CardButton(props) {
  return (
    <Card variant="outlined">
      <CardActions>
        <Button size="medium" href={props.url}>
          {props.title}
        </Button>
      </CardActions>
    </Card>
  );
}
