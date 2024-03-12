import { WeatherDbData } from '@/models/weatherDbData'
import { useChoseCity } from '@/store/useChosenCity';
import React from 'react'

interface ICitySearchBarItemProps {
  city?: WeatherDbData;
  noResultText: string;
  onClick: () => void;
}


const CitySearchBarItem = ({ city, onClick, noResultText }: ICitySearchBarItemProps) => {
  const { setChosenCity } = useChoseCity();
  return (
    <div
      onClick={() => {
        if (city) {
          setChosenCity(city);
        }
        onClick();
      }}
      className={`searchBarResult px-3 py-2 border-b-2 rounded-[10px] transition-colors duration-200 text-black bg-white w-full
    hover:text-white hover:bg-[var(--sky-color)]`}>
      <div
        className={`searchBarResult__container gap-3 flex justify-start relative`}
      >
        {noResultText ? <span
          className=' searchBarResult__noResultText'
        >{noResultText}</span> : ''}
        {city ? city.name.length <= 28
          ? city.name
          : <span
            className={`searchBarResult__cityName`}
          >{city.name.slice(0, 28)}...</span>
          : ''
        }
        <span
          className={`searchBarResult__country absolute top-0 right-0 opacity-0 font-bold`}
        >
          {city ? city.country : ''}
        </span>
      </div>
    </div>
  )
}

export default CitySearchBarItem