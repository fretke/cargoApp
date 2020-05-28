import React, { useEffect } from 'react';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';

import gsap from "gsap";

const useStyles = makeStyles({
  root: {
    width: '100%',
    // maxWidth: 500,
    textAlign: "center",
    justifyContent: "space-evenly"
  },
});

export default function LoadingMessage() {
  const classes = useStyles();

  useEffect(() => {
      let tl = gsap.timeline();
      tl.fromTo("#first", {x: -300}, {duration: 1, x:0, ease: "expo"})
        .fromTo("#second", {x: -300}, {duration: 1, x:0, ease: "expo"}, "-=0.8")
  }, [])

  return (
    <div className={classes.root}>
      <Typography id="first" color="primary" variant="h3" component="h4" gutterBottom>
        Your app is being loaded...
      </Typography>

      <Typography id="second" color="primary" variant="h6" component="h6" gutterBottom>
        Hold on for a few seconds
      </Typography>
    </div>
  );
}