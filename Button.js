import * as React from 'react';
import { Button } from 'react-native-paper';

export default function ButtonExample() {
  return (
    <Button raised theme={{ roundness: 3 }}>
      Press me
    </Button>
  );
}