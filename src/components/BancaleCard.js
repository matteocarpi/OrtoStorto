import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import { List, ListItem, Divider } from '@material-ui/core';
import { useHistory } from 'react-router-dom';

const useStyles = makeStyles({
  root: {
    minWidth: 275,
  },
  bullet: {
    display: 'inline-block',
    margin: '0 2px',
    transform: 'scale(0.8)',
  },
  title: {
    fontSize: 14,
  },
  pos: {
    marginBottom: 12,
  },
});

export default function BancaleCard(props) {
  const classes = useStyles();

  let history = useHistory();
  return (
    <Card className={classes.root}>
      <CardContent>
        <Typography variant="h4" component="h2">
          {props.name}
        </Typography>
        <Typography className={classes.pos} color="textSecondary">
          {props.family}
        </Typography>
        <Typography variant="h6">{props.guests && props.guests.length > 0 ? 'Colture' : 'Spazio Libero!'}</Typography>
        <List>
          {props.guests && props.guests.map(guest => {
            return (
              <>
                <ListItem key={guest.name}>{guest.name}</ListItem>
                <Divider />
              </>
            );
          })}
        </List>
      </CardContent>
      <CardActions>
        <Button onClick={() => history.push(props.url)} to={props.url} size="small">Dettagli</Button>
      </CardActions>
    </Card>
  );
}