import path from "node:path";
import fs from "node:fs";

export const readDummyFile = async <T>(fileName: string): Promise<T>  => {
    const filePath = path.join(process.cwd(), 'data', fileName);

    // Read the file contents asynchronously
    const fileContents = await fs.promises.readFile(filePath, 'utf-8');

    // Parse the JSON data
    return JSON.parse(fileContents) as T;
}