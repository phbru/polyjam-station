import Papa from "papaparse";

export async function parseCsvFile(filePath: string): Promise<any[]> {
  try {
    const response = await fetch(filePath);
    if (!response.ok) {
      throw new Error("Failed to fetch CSV file");
    }

    const csvString = await response.text();

    return new Promise<any[]>((resolve, reject) => {
      Papa.parse(csvString, {
        header: true,
        dynamicTyping: true,
        transformHeader: (header) => {
          // Replace empty header with a custom key (e.g., 'Date')
          return header || "Date";
        },
        complete: (result) => {
          resolve(result.data);
        },
        error: (error) => {
          reject(new Error("CSV parsing error: " + error.message));
        },
      });
    });
  } catch (error) {
    throw new Error("CSV fetch error: " + error.message);
  }
}

export function convertData(dataTable) {
  const something = {};
  for (const row of dataTable) {
    const dateContent = {};
    for (const entry of Object.entries(row)) {
      if (entry[0] !== "Date") {
        dateContent[entry[0]] = entry[1];
      }
    }

    something[row["Date"]] = dateContent;
  }
  console.log(something);
}
