import { Pipe, PipeTransform } from "@angular/core";

@Pipe({
  name: "stringLimit",
})
export class StringLimitPipe implements PipeTransform {
  transform(value: string, length: number = null, type: string = null): string {
    const biggestWord = 50;
    const elipses = "...";

    // ////////////console.log('value', value);
    if (value === "undefined" || value === null || value == '') {
      return "Sin descripción";
    }

    if (value.length <= length) return value;
    if (length < elipses.length) return "";

    if (length != null) {
      //.. truncate to about correct lenght
      let truncatedText = value.slice(0, length + biggestWord);

      //.. now nibble ends till correct length
      while (truncatedText.length > length - elipses.length) {
        let lastSpace = truncatedText.lastIndexOf(" ");

        if (lastSpace === -1) {
          truncatedText = "";
          break;
        }
        truncatedText = truncatedText
          .slice(0, lastSpace)
          .replace(/[!,.?]$/, "");
      }
      return truncatedText + elipses;
    }
  }
}
