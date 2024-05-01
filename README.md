# My list

Enhanced OTT Platform: My List Feature Backend Development

# Getting started
- Clone the repository
```
git clone https://github.com/vaibhav-raj/my-list.git

```
- Install dependencies
```
cd my-list
npm install
```
- Build and run the project
```
npm run dev
```
  Navigate to `http://localhost:3000/api`
  Deployed endpoint : https://my-list-rphj.onrender.com/api 

# API End Points
Certainly! Here's a neatly organized version:

---
**User Routes:**

1. **Create User:**
   - **Endpoint:** `POST /users`
   - **Payload:**
     ```json
     {
       "username": "example_user",
       "preferences": {
         "favoriteGenres": ["Action", "Comedy"],
         "dislikedGenres": ["Horror", "Romance"]
       }
     }
     ```

2. **Update User Preferences:**
   - **Endpoint:** `PUT /users/:userId`
   - **Payload:**
     ```json
     {
       "preferences": {
         "favoriteGenres": ["Action", "Comedy", "Drama"],
         "dislikedGenres": ["Romance"]
       }
     }
     ```
   - **Note:** Replace `:userId` with the actual user ID.

3. **Add to Watch History:**
   - **Endpoint:** `POST /users/:userId/watch-history`
   - **Payload:**
     ```json
     {
       "contentId": "content_id_123",
       "watchedOn": "2024-05-01T12:00:00Z",
       "rating": 4
     }
     ```
   - **Note:** Replace `:userId` with the actual user ID.

---

For adding favorite and disliked genres:

4. **Add Favorite Genres for a User:**
   - **Endpoint:** `PUT /api/users/:userId/favoriteGenres`
   - **Payload:**
     ```json
     {
       "favoriteGenres": ["Action", "Comedy", "SciFi"]
     }
     ```
   - **Example URL (assuming `userId` is `123`):** `PUT /api/users/123/favoriteGenres`

5. **Add Disliked Genres for a User:**
   - **Endpoint:** `PUT /api/users/:userId/dislikedGenres`
   - **Payload:**
     ```json
     {
       "dislikedGenres": ["Romance", "Drama"]
     }
     ```
   - **Example URL (assuming `userId` is `123`):** `PUT /api/users/123/dislikedGenres`

**TV Show Routes:**

1. **Create TV Show:**
   - **Endpoint:** `POST /tv-shows`
   - **Payload:**
     ```json
     {
       "title": "Example TV Show",
       "description": "This is an example TV show description.",
       "genres": ["Action", "Drama"],
       "episodes": [
         {
           "episodeNumber": 1,
           "seasonNumber": 1,
           "releaseDate": "2024-05-01",
           "director": "Director Name",
           "actors": ["Actor 1", "Actor 2"]
         },
         {
           "episodeNumber": 2,
           "seasonNumber": 1,
           "releaseDate": "2024-05-08",
           "director": "Director Name",
           "actors": ["Actor 1", "Actor 3"]
         }
       ]
     }
     ```

2. **Get All TV Shows:**
   - **Endpoint:** `GET /tv-shows`

3. **Get TV Show by ID:**
   - **Endpoint:** `GET /tv-shows/:tvShowId`
   - **Note:** Replace `:tvShowId` with the actual TV show ID.

4. **Update TV Show by ID:**
   - **Endpoint:** `PUT /tv-shows/:tvShowId`
   - **Payload:**
     ```json
     {
       "description": "Updated description."
     }
     ```
   - **Note:** Replace `:tvShowId` with the actual TV show ID.

5. **Delete TV Show by ID:**
   - **Endpoint:** `DELETE /tv-shows/:tvShowId`
   - **Note:** Replace `:tvShowId` with the actual TV show ID.

---

**My List Routes:**

1. **Add to My List:**
   - **Endpoint:** `POST /my-list/add-to-list/:userId/:contentId/:contentType`
   - **Note:** Replace `:userId`, `:contentId`, and `:contentType` in the URL.
     - Example URL: `/my-list/add-to-list/609c05587bc7d111e85c9c53/609c06f97bc7d111e85c9c5f/movie`

2. **Remove from My List:**
   - **Endpoint:** `DELETE /my-list/remove-from-list/:userId/:contentId`
   - **Note:** Replace `:userId` and `:contentId` in the URL.
     - Example URL: `/my-list/remove-from-list/609c05587bc7d111e85c9c53/609c06f97bc7d111e85c9c5f`

3. **List My Items:**
   - **Endpoint:** `GET /my-list/list-my-items/:userId`
   - **Note:** Replace `:userId` in the URL.
     - Example URL: `/my-list/list-my-items/609c05587bc7d111e85c9c53`

---

**Movie Routes:**

1. **Create Movie:**
   - **Endpoint:** `POST /movies`
   - **Payload:**
     ```json
     {
       "title": "Example Movie",
       "description": "This is an example movie description.",
       "genres": ["Action", "Drama"],
       "releaseDate": "2024-05-01",
       "director": "Director Name",
       "actors": ["Actor 1", "Actor 2"]
     }
     ```

2. **Get All Movies:**
   - **Endpoint:** `GET /movies`

3. **Get Movie by ID:**
   - **Endpoint:** `GET /movies/:movieId`
   - **Note:** Replace `:movieId` with the actual movie ID.

4. **Update Movie by ID:**
   - **Endpoint:** `PUT /movies/:movieId`
   - **Payload:**
     ```json
     {
       "description": "Updated description."
     }
     ```
   - **Note:** Replace `:movieId` with the actual movie ID.

5. **Delete Movie by ID:**
   - **Endpoint:** `DELETE /movies/:movieId`
   - **Note:** Replace `:movieId` with the actual movie ID.

---

These endpoints and payloads can be used in Postman to interact with the backend API for movie management.

### Contributors

- **Vaibhav**

