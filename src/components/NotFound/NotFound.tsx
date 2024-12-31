import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import { Button, Container, Group, Text, Title } from '@mantine/core';
import classes from './NotFound.module.css';

export function NotFound() {
  const navigate = useNavigate();
  const { t } = useTranslation();

  const handleOnClick = () => {
    navigate('/');
  };

  return (
    <Container className={classes.root}>
      <div className={classes.label}>{t('404')}</div>
      <Title className={classes.title}>{t('404Title')}</Title>
      <Text c="dimmed" size="lg" ta="center" className={classes.description}>
        {t('404Paragraph')}
      </Text>
      <Group justify="center">
        <Button variant="subtle" size="md" onClick={handleOnClick}>
          {t('404Button')}
        </Button>
      </Group>
    </Container>
  );
}
