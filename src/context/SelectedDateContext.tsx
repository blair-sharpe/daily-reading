import dayjs from 'dayjs';
import dayOfYear from 'dayjs/plugin/dayOfYear';
import React, { createContext, useContext, useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { fetchSummaries } from '../../api/fetchSummaries';

dayjs.extend(dayOfYear);

interface SelectedDateContextProps {
  selectedDate: dayjs.Dayjs;
  setSelectedDate: (date: dayjs.Dayjs) => void;
  handleDateChange: (date: Date | null) => void;
  summaries: string[];
  isLoading: boolean;
}

const SelectedDateContext = createContext<SelectedDateContextProps | undefined>(undefined);

export const SelectedDateProvider: React.FC<React.PropsWithChildren<{}>> = ({ children }) => {
  const [selectedDate, setSelectedDate] = useState<dayjs.Dayjs>(dayjs());

  const { data: summaries = [], isLoading } = useQuery({
    queryKey: ['summaries', selectedDate.dayOfYear()],
    queryFn: () => fetchSummaries(selectedDate.dayOfYear()),
    enabled: !!selectedDate,
    staleTime: Infinity,
  });

  const handleDateChange = (date: Date | null) => {
    if (date) {
      setSelectedDate(dayjs(date));
    } else {
      setSelectedDate(dayjs());
    }
  };

  return (
    <SelectedDateContext.Provider
      value={{ selectedDate, setSelectedDate, handleDateChange, summaries, isLoading }}
    >
      {children}
    </SelectedDateContext.Provider>
  );
};

export const useSelectedDate = (): SelectedDateContextProps => {
  const context = useContext(SelectedDateContext);
  if (!context) {
    throw new Error('useSelectedDate must be used within a SelectedDateProvider');
  }
  return context;
};
