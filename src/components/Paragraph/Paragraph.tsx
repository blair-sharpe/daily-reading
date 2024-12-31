import { useTranslation } from 'react-i18next';
import { Text } from '@mantine/core';
import { useMediaQuery } from '@mantine/hooks';

const maxWidth = 580;

const Paragraph = () => {
  const { t } = useTranslation();
  const isMobile = useMediaQuery('(max-width: 768px)');
  return (
    <Text
      c="dimmed"
      ta="center"
      size={isMobile ? 'md' : 'lg'}
      maw={maxWidth}
      mx="auto"
      mt="xl"
      p="0px 20px 0px 20px"
    >
      {t('paragraph')}
    </Text>
  );
};

export default Paragraph;
