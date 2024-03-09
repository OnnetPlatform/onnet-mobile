import 'react-native-get-random-values';

import { faker } from '@faker-js/faker';
import _ from 'lodash';
import moment from 'moment';
import { useCallback, useEffect, useMemo, useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { useSelector } from 'react-redux';
import { EventSelector } from '@Khayat/Redux/Selectors/EventSelector';

let startDate = new Date();
let endDate = new Date().setDate(new Date().getDate() + 7);

const sort = (a: any, b: any) => (a.date > b.date ? 1 : -1);
const dObj = (data: any, title: string) => ({ data: data.sort(sort), title });

export const useFakerData = () => {
  const [data, setData] = useState<any[]>([]);
  const [length, setLength] = useState<number>(100);
  const generateEventsData = () => ({
    title: faker.name.jobTitle(),
    date: faker.date.between(startDate, endDate),
    time: Math.round(Math.random() * 24),
    duration: 60,
    users: chatUsers,
  });

  const generateChatUsers = () => ({
    name: faker.name.fullName(),
    avatar: faker.image.avatar(),
    id: uuidv4(),
    isActive: true,
    unreadCount: 0,
  });

  const eventsData = useMemo(() => {
    const array = Array.from({ length: 10 }, generateEventsData);
    setData((d) =>
      new Array().concat(d).concat(
        _(array)
          .sort(sort)
          .groupBy((n) => moment(n.date).format('dddd, MMMM Do'))
          .map(dObj)
          .value()
      )
    );
    return array;
  }, [length]);

  const chatUsers = useMemo(
    () => Array.from({ length: 100 }, generateChatUsers),
    []
  );

  const nextPage = useCallback(() => {
    startDate = new Date(endDate);
    endDate = new Date(endDate).setDate(new Date(endDate).getDate() + 7);
    setLength((l) => l + 10);
  }, []);

  return {
    eventsData,
    chatUsers,
    nextPage,
    data,
  };
};

export const useSortedData = () => {
  const { events } = useSelector(EventSelector);
  const [data, setData] = useState<(string | {})[]>([]);
  const sort = useCallback(
    () =>
      events
        .filter((item) => item.month - 1 === new Date().getMonth())
        .map((item) => {
          const nested = item.data;
          setData((stored) => [...stored, item.title.toString()]);
          nested.map((item) => setData((stored) => [...stored, item]));
        }),
    [events]
  );
  useEffect(() => {
    setData([]);
    sort();
  }, [events]);

  return data;
};
