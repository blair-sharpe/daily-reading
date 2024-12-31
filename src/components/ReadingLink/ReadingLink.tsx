import { IconExternalLink } from '@tabler/icons-react';
import { Button } from '@mantine/core';

const ReadingLink = ({ reading }: { reading: string }) => {
  const url = `https://read.lsbible.org?q=${reading}`;

  return (
    <Button
      component="a"
      href={url}
      variant="transparent"
      aria-label="Open in a new tab"
      rightSection={<IconExternalLink size={14} />}
      color="black"
      size="sm"
      pl="0px"
      pb="0px"
    >
      {reading}
    </Button>
  );
};

export default ReadingLink;
