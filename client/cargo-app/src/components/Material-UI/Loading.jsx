import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import CircularProgress from '@material-ui/core/CircularProgress';
import LoadingMessage from "./LoadingMessage"

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    '& > * + *': {
      marginLeft: theme.spacing(2)
    },
    justifyContent: "space-evenly",
    padding: "200px"
  },
}));

export default function Loading() {
  const classes = useStyles();
  const [progress, setProgress] = React.useState(0);

  React.useEffect(() => {
    function tick() {
      // reset when reaching 100%
      setProgress((oldProgress) => (oldProgress >= 100 ? 0 : oldProgress + 1));
    }

    const timer = setInterval(tick, 20);
    return () => {
      clearInterval(timer);
    };
  }, []);

  return (
    <div style={{textAlign:"center"}}>
            <div className={classes.root}>
                <CircularProgress color="primary" variant="determinate" value={progress} />
            </div>
        <LoadingMessage />
    </div>
    
  );
}