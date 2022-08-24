import { Card, CardActions, Button } from "@mui/material";

export interface CardButtonProps {
  url?: string;
  title?: string;
}

export default function CardButton(props: CardButtonProps) {
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
