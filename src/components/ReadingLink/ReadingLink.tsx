import { IconExternalLink } from '@tabler/icons-react';
import { ActionIcon } from '@mantine/core';

const ReadingLink = ({ reading }: { reading: string }) => {
  const url = `https://read.lsbible.org?q=${reading}`;

  return (
    <ActionIcon
      component="a"
      href={url}
      variant="transparent"
      color="gray"
      size="xs"
      aria-label="Open in a new tab"
      target="_blank"
      ml="9px"
    >
      <IconExternalLink />
    </ActionIcon>
  );
};

export default ReadingLink;
