import * as fs from 'fs/promises';

async function propertyReader(propertyName: string, filePath: string) {
  const customPropertiesFilePath = filePath;

  try {
    const customPropertiesData = await fs.readFile(customPropertiesFilePath, 'utf-8');
    const customPropertiesLines = customPropertiesData.split('\n');
    const customConfig = {};
    for (const line of customPropertiesLines) {
      const [key, value] = line.split('=');
      if (key && value) {
        customConfig[key.trim()] = value.trim();
      }
    }

    const username = customConfig[propertyName];

    return username;
  } catch (error) {
    console.error('Error reading or processing the custom properties file:', error);
    throw error;
  }
}

export async function gettestDataProperty(propertyName: string, filePath: string) {
  try {
    const username = await propertyReader(propertyName, filePath);
    if (username !== undefined) {
      return username; // Return the username from the main function
    } else {
      console.error("Username not found in properties file.");
      return undefined; // Return undefined in case of an error
    }
  } catch (error) {
    console.error('An error occurred:', error);
    return undefined; // Return undefined in case of an error
  }
}


