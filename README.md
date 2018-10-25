# Assignment Update-user-Lamda-dynamodb
1: If the user data is existing username or email is given then the data is Updated.

2: Else it will throw 'User not exist'.

3: Adding additional attributes like sports as array of tags would update the data.

# Problem statement
Create an API service in AWS that will accept data from incoming connections and insert / update in AWS Dynamo DB / Cloud hosted Mongo DB

Create AWS Lambda module(s) in NodeJS 8.x to complete all the features.

Basic feature of the application should include:

Lambda to create user profile. User profile will include user_id, name, email, mobile number, address, company, title

Lambda to update user profile when the email or mobile number matches in the incoming api request


Lambda to update user interests  including sports, food, media and more. Come up with relevant fields that can be added to user profile and add the same as parameter for the function


All data should go to AWS Dynamo DB


Configure AWS API gateway and create relevant APIs for create and update user records. Configure security for the API and configure rate limiting for the APIs


Use async/await calls in the Node JS functions


Add relevant code comments and modularise the code properly. Create more than one Lambda wherever required and make inter Lambda calls if required
