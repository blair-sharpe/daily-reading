import { Text, Title } from '@mantine/core';
import { useMediaQuery } from '@mantine/hooks';
import classes from './ReadinTitle.module.css';

const ReadingTitle = () => {
  const isMobile = useMediaQuery('(max-width: 768px)');
  return (
    <Title className={classes.title} ta="center" mt={isMobile ? 50 : 100}>
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
