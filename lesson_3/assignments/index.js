// Importing database functions. DO NOT MODIFY THIS LINE.
import { central, db1, db2, db3, vault } from "./databases.js";

async function getUserData(id) {
  const dbs = {
    db1: db1,
    db2: db2,
    db3: db3
  };

  try {
    if (typeof id !== 'number') {
      throw new Error('Invalid Input -- Not a Number');
    }

    const dbName = await central(id);
    
    const [basicInfo, personalInfo] = await Promise.all([
      dbs[dbName](id),
      vault(id)
    ]);

    return {
      id: id,
      name: personalInfo.name,
      username: basicInfo.username,
      email: personalInfo.email,
      address: {
        street: personalInfo.address.street,
        suite: personalInfo.address.suite,
        city: personalInfo.address.city,
        zipcode: personalInfo.address.zipcode,
        geo: {
          lat: personalInfo.address.geo.lat,
          lng: personalInfo.address.geo.lng
        }
      },
      phone: personalInfo.phone,
      website: basicInfo.website,
      company: {
        name: basicInfo.company.name,
        catchPhrase: basicInfo.company.catchPhrase,
        bs: basicInfo.company.bs
      }
    };
  } catch (error) {
    throw new Error(`Failed to fetch user data: ${error.message}`);
  }
}


async function runAllTests() {
  console.log('Testing async/await version:');
  console.time('Total Time for All Operations');
  
  try {
   
    const user1 = await getUserData(1);
    console.log('User 1:', user1);
    
    const user5 = await getUserData(5);
    console.log('User 5:', user5);
    
    const user9 = await getUserData(9);
    console.log('User 9:', user9);
    
    
    try {
      await getUserData(11);
    } catch (error) {
      console.error('Expected error - Out of Range:', error.message);
    }
    
    try {
      await getUserData('1');
    } catch (error) {
      console.error('Expected error - Not a Number:', error.message);
    }
    
    try {
      await getUserData(true);
    } catch (error) {
      console.error('Expected error - Not a Number:', error.message);
    }
    
  } finally {
    console.timeEnd('Total Time for All Operations');
  }
}


runAllTests();