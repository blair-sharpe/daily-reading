import { IconVocabulary } from '@tabler/icons-react';
import { Accordion, Box, Skeleton } from '@mantine/core';
import { useSelectedDate } from '@/context/SelectedDateContext';
import { Readings } from '../../../api/fetchSummaries';
import readings from '../../../readings.json';
import ReadingLink from '../ReadingLink/ReadingLink';
import classes from './ReadingSummary.module.css';

const iconSize = 20;

const readingsData: Readings = readings;

const ReadingSummary = () => {
  const { isLoading, summaries, selectedDate } = useSelectedDate();
  const todaysReading = readingsData[selectedDate.dayOfYear().toString()]?.readings;

  return (
    <Box m="30px auto auto auto" size="sm" className={classes.summary}>
      {isLoading ? (
        <Skeleton height="90px" radius="xl" />
      ) : (
        <Accordion variant="separated">
          {summaries?.map((summary, index) => (
            <Accordion.Item key={index} value={`Reading ${index + 1}`}>
              <Accordion.Control icon={<IconVocabulary size={iconSize} />}>
                <ReadingLink reading={todaysReading[index]} />
              </Accordion.Control>
              <Accordion.Panel>{summary}</Accordion.Panel>
            </Accordion.Item>
          ))}
        </Accordion>
      )}
    </Box>
  );
};

export default ReadingSummary;
