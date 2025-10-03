<img width="3012" height="1572" alt="image" src="https://github.com/user-attachments/assets/569b1142-93c3-4625-8992-bc2757b4eb79" />


## [SkillSwap][site] : Deployed app

[site]: https://spontaneous-smakager-8133bf.netlify.app/

SkillSwap, built with Node.js and Express.

SkillSwap is a community building app that allows users to barter skills training amongst them and other users. A user can sign up and create a profile adding the skills they have to offer as well as the skills they want to learn. Then they can browse other users and their skills, search by skill name, category, or location. 
Once they select a skill-set and user they can start a SwapRequest, that will be sent to the selected user for them to Accept/Decline and then with orboth can change the status to in-progress or complete as they move along. 

### Plannig materials
> [Trello board][site] for user stories, concept wireframes, and ERD.

[site]: https://trello.com/b/FlkZUYks/hjl-group-skillswap

### Next Steps
* Light and dark modes for more adaptive views.  
* Additional criteria and details on Skills and Users.
* Communicate/Send messages outside of the requests process.
* Allow users to mark the completed skills of their wanted lists , change thy skill level, and option to add it to their offered skills if they feel they know enough of it. 


## What's included

- User authentication (sign up/sign in)
- User profile management
- Skill CRUD operations
- Skill swap request system
- MongoDB integration
- JWT authentication
- Input validation and error handling

## Quick Start

1. **Install dependencies**
   ```bash
   npm install
   ```

2. **Set up environment variables**
   
   Create a `.env` file in the root directory:
   ```bash
   touch .env
   ```
   
   Add these variables:
   ```
   MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/skillswap
   JWT_SECRET=your-secret-key-here
   ```

3. **Start the server**
   ```bash
   npm run dev
   ```
   
   The API will be available at http://localhost:3000

## API Routes

### Authentication
- `POST /auth/sign-up` - Create new account
- `POST /auth/sign-in` - Log in

### Users
- `GET /users/profile/me` - Get my profile
- `PUT /users/profile/me` - Update my profile
- `GET /users` - Get all users

### Skills
- `GET /skills` - Get all skills
- `GET /skills/my-skills` - Get my skills
- `POST /skills` - Create new skill
- `PUT /skills/:id` - Update skill
- `DELETE /skills/:id` - Delete skill

### Swap Requests
- `GET /swap-requests` - Get all my requests
- `GET /swap-requests/received` - Get requests sent to me
- `GET /swap-requests/sent` - Get requests I sent
- `POST /swap-requests` - Create new request
- `PUT /swap-requests/:id/accept` - Accept a request
- `PUT /swap-requests/:id/decline` - Decline a request

## Database Models

### User
- username, password.

### Skill
- skillName, category, skillLevel, timeFrame, description, type (offered/wanted)

### SwapRequest
- requester, skillProvider, skillRequested, skillOffered, status, messages

## Development

Run with automatic restarts:
```bash
npm run dev
```

The server uses nodemon for development, so changes will automatically restart the server.

## Testing

Use the included Postman collection for API testing:
- `SkillSwap_API_Collection.postman_collection.json`

SkillSwap - Back End - Link https://github.com/helenpastras/SkillSwap-BackEnd
