import { Pipe, PipeTransform } from '@angular/core';
import { stringify } from 'querystring';

@Pipe({
	name: 'summary'
})
export class SummaryPipe implements PipeTransform {

	transform(value: string, limit?: number[], titleCase?:boolean): any {
		
		if(value == null)
		return null;
		
		let start = (limit[1]) ? limit[1] : 0;
		let length = (limit[0]) ? limit[0] : 20;
		let summary = value.substr(start, length);

		if(titleCase)
		{
			let words: string[] = summary.split(' ');

			words.forEach( (word:string, i: number) => {
				if(i > 0 && this.isPreposition(word))
					words[i] = word.toLowerCase();
				else
					words[i] = this.toTitleCase(word);
			});

			summary = words.join(' ');
		}

		return summary;
	}

	private isPreposition(word: string) : boolean {
		let preposition: string[] = [
			'of',
			'with',
			'at',
			'from',
			'into',
			'during',
			'including',
			'until',
			'against',
			'among',
			'throughout',
			'despite',
			'towards',
			'upon',
			'concerning',
			'to',
			'in',
			'for',
			'on',
			'by',
			'about',
			'like',
			'through',
			'over',
			'before',
			'between',
			'after',
			'since',
			'without',
			'under',
			'within',
			'along',
			'following',
			'across',
			'behind',
			'beyond',
			'plus',
			'except',
			'but',
			'up',
			'out',
			'around',
			'down',
			'off',
			'above',
			'near'
		];

		return preposition.includes(word.toLowerCase());
	}
	
	private toTitleCase(word: string) : string {
		return word.substr(0,1).toUpperCase()+word.substr(1).toLowerCase();
	}
}
