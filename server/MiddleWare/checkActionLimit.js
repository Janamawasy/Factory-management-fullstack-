// handle user actions: 
// Middleware to check user's action limit

const checkActionLimit =async (req, res, next) => {
  console.log('in CurrentActions')
    const {id:userId} = req.params; // Assuming you pass the user ID in the URL

    const urlUserDB = "http://localhost:8000/usersDB"
  
    const response = await fetch(`${urlUserDB}/${userId}`);
    const user = await response.json();

    req.user = user
  
      const currentDate = new Date();
      const lastActionDate = new Date(user.Date || currentDate);  // if user.date does not exist lastActionDate = today's date
      console.log('lastActionDate',lastActionDate)
      console.log('currentDate',currentDate)
      const isSameDay = lastActionDate.toDateString() === currentDate.toDateString();  //true: it is really the same date or user.date did not exist
      console.log('isSameDay',isSameDay)
      /// if user.Date is undefined
      if (!user.Date){
        user.Date = currentDate.toISOString().substr(0, 10);
        console.log('setting date')
        console.log('currentDate',currentDate)
        const updateResponse = await fetch(`${urlUserDB}/${userId}`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(user), // Send the updated user data
        });
        if (!updateResponse.ok) {
          console.error('Failed to update user data on the server');
        }
      }

      // if is the sameday and the user reach maximum number of actions => logging out
      if (isSameDay && user.CurrentActions >= user.Actions_Num) {
        // If it's the same day and the user has exceeded the limit, log them out
        console.log('Action limit exceeded. Logging out.')
        /// in client side, when logoutRequired is true, the page will direct to log in page
        return res.json({ logoutRequired: true });
      }
  
      // If it's a new day, reset the actions_number and CurrentActions
      if (!isSameDay) {
        user.CurrentActions = 0;
        user.Date = currentDate;
        console.log('setting CurrentActions and date')
        const updateResponse = await fetch(urlUserDB, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(user), // Send the updated user data
        });
        if (!updateResponse.ok) {
          console.log('Failed to update user data on the server');
        }
      }
      
        next();
      };
    
  
  
  module.exports = checkActionLimit