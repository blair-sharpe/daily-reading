import { IconDownload } from '@tabler/icons-react';
import { useTranslation } from 'react-i18next';
import { Button, Flex } from '@mantine/core';
import { useMediaQuery } from '@mantine/hooks';

const dailyReadingFilePath = './reading.pdf';
const flexStyle = { width: '100%' };
const size = 14;
const fileName = 'dual-chronological-reading.pdf';

const handleDownload = () => {
  const link = document.createElement('a');
  link.href = dailyReadingFilePath;
  link.download = fileName;
  link.click();
};

const DownloadPlanButton = () => {
  const { t } = useTranslation();
  const isMobile = useMediaQuery('(max-width: 768px)');
  return (
    <Flex direction="row-reverse" style={flexStyle}>
      <Button
        m="20px 40px 0px 0px"
        variant="outline"
        size={isMobile ? 'compact-xs' : 'md'}
        color="gray"
        rightSection={<IconDownload size={size} />}
        onClick={handleDownload}
      >
        {t('downloadPlanButton')}
      </Button>
    </Flex>
  );
};

export default DownloadPlanButton;
