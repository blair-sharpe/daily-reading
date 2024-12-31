import dayjs from 'dayjs';
import dayOfYear from 'dayjs/plugin/dayOfYear';
import React, { useState } from 'react';
import { IconDownload } from '@tabler/icons-react';
import html2pdf from 'html2pdf.js';
import { Button, Flex, Modal } from '@mantine/core';
import { DatePickerInput } from '@mantine/dates';
import { useMediaQuery } from '@mantine/hooks';
import { getNotesByDateRange } from '../../../idb/indexedDB';

import '@mantine/tiptap/styles.css';
import '@mantine/notifications/styles.css';

dayjs.extend(dayOfYear);

interface DownloadNotesModalProps {
  opened: boolean;
  onClose: () => void;
}

const DownloadNotesModal = ({ opened, onClose }: DownloadNotesModalProps) => {
  const isMobile = useMediaQuery('(max-width: 768px)');
  const [value, setValue] = useState<[Date | null, Date | null]>([null, null]);

  const handleDownload = async () => {
    if (value[0] && value[1]) {
      const notes = await getNotesByDateRange(
        dayjs(value[0]).dayOfYear(),
        dayjs(value[1]).dayOfYear()
      );
      const container = document.createElement('div');
      container.style.width = '190mm'; // Adjusted width to fit within A4 margins
      container.style.padding = '10mm';
      container.style.boxSizing = 'border-box';
      container.style.wordBreak = 'break-word';
      container.style.whiteSpace = 'pre-wrap';
      container.style.fontFamily = 'Arial, sans-serif';
      container.style.fontSize = '12px';
      container.style.lineHeight = '1.5';

      notes.forEach((note) => {
        const date = dayjs().dayOfYear(note.id).format('MMMM D');
        const noteElement = document.createElement('div');
        noteElement.innerHTML = `<h3>${date}:</h3>${note.content}`;
        container.appendChild(noteElement);
      });

      document.body.appendChild(container);

      const opt = {
        filename: 'notes.pdf',
        image: { type: 'jpeg', quality: 0.98 },
        html2canvas: { scale: 2, useCORS: true },
        jsPDF: { unit: 'mm', format: 'a4', orientation: 'portrait' }, // A4 size
      };

      html2pdf()
        .from(container)
        .set(opt)
        .save()
        .then(() => {
          document.body.removeChild(container);
        });
    }
  };

  return (
    <Modal
      overlayProps={{
        backgroundOpacity: 0.55,
        blur: 3,
      }}
      fullScreen={isMobile}
      size="30%"
      title="Notes"
      opened={opened}
      onClose={onClose}
    >
      <DatePickerInput
        type="range"
        label="Pick date range"
        placeholder="Pick date range"
        highlightToday
        value={value}
        onChange={setValue}
      />
      <Flex mt="lg" justify="flex-end">
        <Button rightSection={<IconDownload size={14} />} onClick={handleDownload}>
          Download
        </Button>
      </Flex>
    </Modal>
  );
};

export default DownloadNotesModal;
