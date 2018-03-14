import { Arguments } from 'yargs';

export interface IChapterArgs extends Arguments {
    name: string;
    index?: number;
}
