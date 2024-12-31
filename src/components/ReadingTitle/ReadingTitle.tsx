import { Text, Title } from '@mantine/core';
import classes from './ReadinTitle.module.css';

const ReadingTitle = () => {
  return (
    <Title className={classes.title} ta="center" mt={40}>
      Daily{' '}
      <Text
        inherit
        variant="gradient"
        component="span"
        gradient={{ from: '#2E3192', to: '#1BFFFF' }}
      >
        Reading
      </Text>
    </Title>
  );
};

export default ReadingTitle;
