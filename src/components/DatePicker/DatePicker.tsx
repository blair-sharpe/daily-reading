import { IconCalendar } from '@tabler/icons-react';
import { useTranslation } from 'react-i18next';
import { Center, rem } from '@mantine/core';
import { DatePickerInput } from '@mantine/dates';
import { useSelectedDate } from '@/context/SelectedDateContext';

const DatePicker = () => {
  const { t } = useTranslation();
  const { selectedDate, handleDateChange } = useSelectedDate();
  const icon = <IconCalendar style={{ width: rem(18), height: rem(18) }} stroke={1.5} />;

  return (
    <Center>
      <DatePickerInput
        leftSection={icon}
        dropdownType="modal"
        style={{ width: '300px' }}
        valueFormat="MMMM DD"
        placeholder={t('readingDatePlaceholder')}
        label={t('readingDateLabel')}
        highlightToday
        value={selectedDate.toDate()}
        onChange={handleDateChange}
        mt="20px"
      />
    </Center>
  );
};

export default DatePicker;
