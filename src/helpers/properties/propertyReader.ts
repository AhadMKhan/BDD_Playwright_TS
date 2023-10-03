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
          console.log(`Read property "${propertyName}" from file "${filePath}": ${value}`);
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
      console.error("Username not found in properties file.");
      return undefined;
    }
  } catch (error) {
    console.error('An error occurred:', error);
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
      console.log(`Read property "${propertyName}" from file "${filePath}": ${propertyValue}`);
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
      console.log(`Locator for ${propertyName}: ${locator}`);
      return locator;
    } else {
      console.error(`Locator not found for ${propertyName} in properties file.`);
      return undefined;
    }
  } catch (error) {
    console.error('An error occurred:', error);
    return undefined;
  }
}

getTestDataProperty("Username.2", "login.properties");
// getLocatorProperty("Username.xpath", "login.properties")
// getLocatorProperty("Username.id", "login.properties")
// getLocatorProperty("Username.css", "login.properties")
// getLocatorProperty("Username.starik", "login.properties")






