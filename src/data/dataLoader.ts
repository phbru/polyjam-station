/* eslint-disable @typescript-eslint/no-explicit-any */
import Papa from "papaparse";

// Function to fetch and parse CSV data
export async function parseCSVData(csvFilePath: string): Promise<any[]> {
  console.log(csvFilePath);
  try {
    const response = await fetch(csvFilePath);
    if (!response.ok) {
      throw new Error(`Failed to fetch CSV: ${response.statusText}`);
    }

    const csvText = await response.text();
    return new Promise((resolve, reject) => {
      Papa.parse(csvText, {
        header: true,
        skipEmptyLines: true,
        dynamicTyping: true,
        complete: (result) => {
          resolve(result.data);
        },
        error: (error) => {
          reject(error);
        },
      });
    });
  } catch (error) {
    throw new Error(`Error fetching or parsing CSV: ${error.message}`);
  }
}
