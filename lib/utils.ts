export class Utils {
    static replace(inputStr: string, parameters: any): string {
        var outputStr = inputStr;
        for (var key in parameters) {
            outputStr = outputStr.replace("{" + key + "}", parameters[key]);
        }
        return outputStr;
    } 
}