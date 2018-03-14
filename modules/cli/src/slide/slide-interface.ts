import { Arguments } from 'yargs';

export interface ISlideArgs extends Arguments {
    name: string;
    index?: number;
}
