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


console.log('Testing async/await version:');


getUserData(1)
  .then(data => console.log('User 1:', data))
  .catch(error => console.error('Error:', error.message));

getUserData(5)
  .then(data => console.log('User 5:', data))
  .catch(error => console.error('Error:', error.message));

getUserData(9)
  .then(data => console.log('User 9:', data))
  .catch(error => console.error('Error:', error.message));


getUserData(11)
  .then(data => console.log('User 11:', data))
  .catch(error => console.error('Expected error - Out of Range:', error.message));

getUserData('1')
  .then(data => console.log('User "1":', data))
  .catch(error => console.error('Expected error - Not a Number:', error.message));

getUserData(true)
  .then(data => console.log('User true:', data))
  .catch(error => console.error('Expected error - Not a Number:', error.message));