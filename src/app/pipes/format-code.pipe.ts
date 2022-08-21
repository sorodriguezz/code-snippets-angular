import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'formatCode'
})
export class FormatCodePipe implements PipeTransform {

  transform(code: string): string {

    let a = code;

    a = a.replace("{","{ \n");
    a = a.replace("}","\n}");
    a = a.replace(";","; \n");

    console.log(a);

    return a;
  }


}
