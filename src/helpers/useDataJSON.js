import data_es from '@/data/data_es.json';
import data_en from '@/data/data_en.json';
import { useParams } from 'react-router';

export const useDataJson = () =>{
    const { language } = useParams();
    if(language == "es") return data_es
    if(language == "en") return data_en
    return data_es
}