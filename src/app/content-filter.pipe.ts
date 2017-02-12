import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'contentFilter'
})
export class ContentFilterPipe implements PipeTransform {

  transform(value: any, selector: any, filtr:string): any {
  	console.log(value, selector, filtr);
    return value.filter(str => {
    	var main_level = str;

    	for (let i = 0; i < selector.length; i++) {
    		main_level = main_level[selector[i]];
    	}
      
    	return main_level.includes(filtr);
    });
  }

}
