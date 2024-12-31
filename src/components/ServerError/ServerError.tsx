import { Container, Text, Title } from '@mantine/core';
import classes from './ServerError.module.css';

export function ServerError() {
  return (
    <div className={classes.root}>
      <Container>
        <div className={classes.label}>500</div>
        <Title className={classes.title}>Something bad just happened...</Title>
        <Text size="lg" ta="center" className={classes.description}>
          Our servers could not handle your request.
        </Text>
      </Container>
    </div>
  );
}
