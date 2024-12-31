import { useState } from 'react';
import { IconDownload } from '@tabler/icons-react';
import { useTranslation } from 'react-i18next';
import { Burger, Button, Drawer, Flex, Menu, rem } from '@mantine/core';
import { useDisclosure, useMediaQuery } from '@mantine/hooks';
import DownloadNotesModal from '../DownloadNotesModal/DownloadNotesModal';

const flexStyle = {
  justifyContent: 'flex-end',
  alignItems: 'center',
};

const handleDownload = () => {
  // Your download logic here
  const fileName = 'plan.pdf';
  const link = document.createElement('a');
  link.href = '/path/to/your/file.pdf';
  link.download = fileName;
  link.click();
};

const DownloadPlanButton = () => {
  const { t } = useTranslation();
  const isMobile = useMediaQuery('(max-width: 768px)');
  const size = isMobile ? 'compact-xs' : 'sm';
  const [opened, { open, close }] = useDisclosure(false);
  const [drawerOpened, setDrawerOpened] = useState(false);

  const toggleDrawer = () => setDrawerOpened((prev) => !prev);

  return (
    <>
      <Flex direction="row" style={flexStyle} align="center">
        <div style={{ marginTop: '40px', paddingRight: isMobile ? '20px' : '100px' }}>
          {isMobile ? (
            <>
              <Burger opened={drawerOpened} onClick={toggleDrawer} />
              <Drawer
                opened={drawerOpened}
                onClose={toggleDrawer}
                title="Downloads"
                padding="md"
                size="sm"
              >
                <Button
                  fullWidth
                  onClick={handleDownload}
                  leftSection={<IconDownload style={{ width: rem(14), height: rem(14) }} />}
                >
                  {t('downloadPlanButton')}
                </Button>
                <Button
                  fullWidth
                  onClick={() => {
                    toggleDrawer();
                    open();
                  }}
                  leftSection={<IconDownload style={{ width: rem(14), height: rem(14) }} />}
                  mt="md"
                >
                  Notes
                </Button>
              </Drawer>
            </>
          ) : (
            <Menu trigger="click-hover" openDelay={100} closeDelay={400} shadow="md" width={200}>
              <Menu.Target>
                <Button size={size}>Downloads</Button>
              </Menu.Target>
              <Menu.Dropdown>
                <Menu.Item
                  onClick={handleDownload}
                  leftSection={<IconDownload style={{ width: rem(14), height: rem(14) }} />}
                >
                  {t('downloadPlanButton')}
                </Menu.Item>
                <Menu.Item
                  onClick={open}
                  leftSection={<IconDownload style={{ width: rem(14), height: rem(14) }} />}
                >
                  Notes
                </Menu.Item>
              </Menu.Dropdown>
            </Menu>
          )}
        </div>
      </Flex>
      <DownloadNotesModal opened={opened} onClose={close} />
    </>
  );
};

export default DownloadPlanButton;
