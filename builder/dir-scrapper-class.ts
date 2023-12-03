import fs from "fs";
interface IFileReader {
    isJSONFile(file: string): boolean;
    readText(file: string): string;
    readJSON(file: string): unknown;
}

class DirectoryScrapper implements IFileReader {
    constructor(public dirPath: string, public FileReader: IFileReader) {}
    scanFiles() {
        return fs.readdirSync(this.dirPath).reduce<Record<string, unknown>>((acc: Record<string, unknown>, file: string) => {
            if(this.isJSONFile(file)) {
                acc[file] = this.FileReader.readJSON(`${this.dirPath + "/" + file}`);
            } else {
                acc[file] = this.FileReader.readText(`${this.dirPath + "/" + file}`);
            }
            return acc;
        }, {});
    }
    isJSONFile(file: string): boolean {
        return false
    }
    readText(file: string): string {
        return ""
    }
    readJSON(file: string): unknown {
        return ""
    }
}


class FileReader implements IFileReader {
    isJSONFile(file: string): boolean {
        return file.endsWith(".json");
    }
    readText(file: string): string {
        return fs.readFileSync(file, "utf8").toString();
    }
    readJSON(file: string): unknown {
        return JSON.parse(fs.readFileSync(file, "utf8").toString())
    }
}

const fileReader = new FileReader();
const directoryScrapper = new DirectoryScrapper("./data", fileReader);

const output = directoryScrapper.scanFiles();

console.log(output);