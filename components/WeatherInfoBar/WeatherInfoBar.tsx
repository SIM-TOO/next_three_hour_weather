'use client';
import { getWeatherLink } from '@/services/weatherLink';
import { useChosenCity } from '@/store/useChosenCity';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import React, { Fragment, useEffect, useState } from 'react';

const WeatherInfoBar = () => {
  const { chosenCity } = useChosenCity();
  const [dayShowing, setDayShowing] = useState(0);
  const [sixDaysInfo] = useState(new Map());

  useEffect(() => {
    setDayShowing(0);
  },[chosenCity.id]);

  const weather = useQuery({
    queryFn: async () => {
      const weatherLink = getWeatherLink(chosenCity.coord);
      if (!weatherLink) return null;
      const { data: fetchedWeather } = await axios.get(
        weatherLink
      );
      const sixDaysInfoKeys = [...sixDaysInfo.keys()];
      sixDaysInfoKeys.map((key) => {
        sixDaysInfo.set(key, []);
      });
      fetchedWeather.list.forEach((listInfoItem) => {
        const listInfoItemDay = listInfoItem.dt_txt.split(' ')[0];
        const mapDayWeather = sixDaysInfo.get(listInfoItemDay);
        if (!mapDayWeather?.length) {
          sixDaysInfo.set(listInfoItemDay, [listInfoItem]);
        }
        if (mapDayWeather?.length) {
          mapDayWeather.push(listInfoItem);
        }
      });
      return fetchedWeather;
    },
    queryKey: [chosenCity.id],
    onError: (e) => {
      console.error(e);
    },
  });
  console.log('six : ',sixDaysInfo);

  if (weather.isLoading) return <div>loading...</div>;

  return  <div> 111  </div>
};

export default WeatherInfoBar;
