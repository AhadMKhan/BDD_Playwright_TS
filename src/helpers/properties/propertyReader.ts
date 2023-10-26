import * as fs from 'fs/promises';

async function propertyReader(propertyName: string, filePath: string) {
  try {
    const customPropertiesData = await fs.readFile(filePath, 'utf-8');
    const lines = customPropertiesData.split(/\n/);

    for (const line of lines) {
      const trimmedLine = line.trim();
      const separatorIndex = trimmedLine.indexOf('=');

      if (separatorIndex !== -1) {
        const key = trimmedLine.slice(0, separatorIndex).trim();
        if (key === propertyName) {
          const value = trimmedLine.slice(separatorIndex + 1).trim();
          return value;
        }
      }
    }

    console.error(`Property "${propertyName}" not found in file "${filePath}"`);
    return undefined;
  } catch (error) {
    console.error('Error reading or processing the custom properties file:', error);
    throw error;
  }
}

function getPropertyFileName(pageName: string): string {
  const words = pageName.split(' ');
  const filteredWords = words.filter(word => word.trim() !== '');
  const result = filteredWords.join('');

  return result;
}

export async function getTestDataProperty(propertyName: string, filePath: string) {
  filePath = getPropertyFileName(filePath)
  try {
    const username = await propertyReader(propertyName, `src\\testData\\${filePath}`);
    if (username !== undefined) {
      return username;
      
    } else {
      console.error(`Test Data Property not found for ${propertyName} in properties file.`);
      return undefined;
    }
  } catch (error) {
    console.error('An error occurred in Test Data Property:', error);
    return undefined;
  }
}

async function locatorPropertyReader(propertyName: string, filePath: string) {
  try {
    const customPropertiesData = await fs.readFile(filePath, 'utf-8');
    const regex = new RegExp(`${propertyName}\\s*=\\s*(.*)`);
    const match = customPropertiesData.match(regex);

    if (match && match[1]) {
      const propertyValue = match[1].trim();
      return propertyValue;
    } else {
      console.error(`Property "${propertyName}" not found in file "${filePath}"`);
      return undefined;
    }
  } catch (error) {
    console.error('Error reading or processing the custom properties file:', error);
    throw error;
  }
}

export async function getLocatorProperty(propertyName: string, filePath: string) {
  filePath = getPropertyFileName(filePath);
  try {
    const locator = await locatorPropertyReader(propertyName, `src\\locators\\${filePath}`);
    if (locator !== undefined) {
      return locator;
    } else {
      console.error(`Locator not found for ${propertyName} in properties file.`);
      return undefined;
    }
  } catch (error) {
    console.error('An error occurred in Locator Property:', error);
    return undefined;
  }
}

export async function readRequestJsonFile(filePath) {
  filePath = getPropertyFileName(filePath);
  console.log(filePath)

  try {
    const jsonData = await fs.readFile(`src\\resources\\apiRequestsBody\\${filePath}.json`, 'utf-8');
    const parsedData = JSON.parse(jsonData);
    console.log(parsedData)
    return parsedData;
  } catch (error) {
    console.error(`Error reading or parsing the JSON file at "${filePath}":`, error);
    throw error;
  }
}

export async function readResponseJsonFile(filePath) {
  filePath = getPropertyFileName(filePath);
  console.log(filePath)

  try {
    const jsonData = await fs.readFile(`src\\resources\\apiResponseBody\\${filePath}.json`, 'utf-8');
    const parsedData = JSON.parse(jsonData);
    console.log(parsedData)
    return parsedData;
  } catch (error) {
    console.error(`Error reading or parsing the JSON file at "${filePath}":`, error);
    throw error;
  }
}






