import { Box } from '@mantine/core';
import DatePicker from '@/components/DatePicker/DatePicker';
import DownloadPlanButton from '@/components/DownloadPlan/DownloadPlanButton';
import Paragraph from '@/components/Paragraph/Paragraph';
import ReadingSummary from '@/components/ReadingSummary/ReadingSummary';
import ReadingTitle from '@/components/ReadingTitle/ReadingTitle';
import TextEditor from '@/components/TextEditor/TextEditor';

import '@mantine/dates/styles.css';

export function ReadingPlanPage() {
  return (
    <>
      <DownloadPlanButton />
      <ReadingTitle />
      <Paragraph />
      <DatePicker />
      <ReadingSummary />
      <TextEditor />
      <Box style={{ height: 100 }} />
    </>
  );
}
