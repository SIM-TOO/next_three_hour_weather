import { WeatherDbData } from '@/models/weatherDbData';
import { create } from 'zustand';

export interface chosenCityState {
    chosenCity: WeatherDbData;
    setChosenCity: (newCity: WeatherDbData) => void;
}

export const useChoseCity = create<chosenCityState>((set) => ({
    chosenCity: {
        id: 0,
        name: '',
        coord: {
            lat: 0,
            lon: 0
        }
    } as WeatherDbData,
    setChosenCity: (newCity: WeatherDbData) => set(() => {
        return { chosenCity: newCity }
    })
}))
