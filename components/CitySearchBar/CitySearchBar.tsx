'use client'
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import React, { useEffect, useState } from 'react'
import LoadingSpinner from '../LoadingSpinner/LoadingSpinner';
import CitySearchBarItem from '../CitySearchBarItem/CitySearchBarItem';
import { WeatherDbData } from '@/models/weatherDbData';
import { useDebounce } from '@/hooks/useDebounce';

const CitySearchBar = () => {

  const [search, setSearch] = useState('');
  const debounceSearch = useDebounce(search, 1000)
  const [isShowingSearchResults, setIsShowingSearchResults] = useState(false);

  const cities = useQuery({
    queryFn: async () => {
      if (!debounceSearch) {
        setIsShowingSearchResults(false);
        return [];
      }
      try {
        const fetchedCities = await axios.get<WeatherDbData[]>(`/api/cities/${debounceSearch}`);
        if (fetchedCities.status !== 200) {
          console.error(fetchedCities);
          return [];
        }
        setIsShowingSearchResults(true);
        return fetchedCities.data;
      } catch (error) {
        console.error(error);
      }
    },
    queryKey: [debounceSearch.toLowerCase()],
    refetchOnMount: true,
    refetchOnWindowFocus: false,
  });

  useEffect(() => {
    cities.refetch();
  }, [debounceSearch])



  return (
    <div className='searchBar'>
      <div className={`searchBar__bar flex justify-between w-full max-w-[300px] border-2 relative`}>

        <input
          type='text'
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder={
            cities.isLoading ? 'loading...' : 'Search City...'
          }
          className='searchBar__input w-full h-[48px] text-[1rem] px-3 py-2'
        />
        <div className='searchBar__loadingSpinner absolute right-0 top-0 w-[48px] h-[48px] grid content-center'>
          {cities.isRefetching || cities.isRefetching ?
            <LoadingSpinner width='w-[38px]' height='h-[38px]' />
            : null}
        </div>
      </div>
      {isShowingSearchResults ? (
        <div
          className={`searchBar__results absolute z-[2] flex flex-col gap-2 border-2 
            border-gray-500 my-1 rounded-[10px] p-2 w-[300px] bg-white`}
        >
          {cities.data && cities.data.length !== 0 ? (
            cities.data.slice(0, 6).map((city) => (
              <CitySearchBarItem
                city={city}
                key={city.id}
                onClick={() => {
                  setIsShowingSearchResults(false);
                  setSearch('');
                }}
              />
            ))
          ) : (
            <CitySearchBarItem
              noResultText='No results'
              onClick={() => {
                setIsShowingSearchResults(false);
                setSearch('');
              }}
            />
          )}
        </div>
      )
        :
        null}
    </div>
  )
}


export default CitySearchBar