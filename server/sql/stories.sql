SELECT story.*,
-- this is where we total up relavent values for ordering
(
  -- +1 per read
  (
    SELECT COUNT(*) FROM read
    WHERE read."storyId" = story.id

  -- +1 per score
  ) + (
    SELECT SUM(rating.score) FROM rating
    WHERE rating."storyId" = story.id
  
  -- +3 per chapter
  ) + (
    SELECT COUNT(*)*3 FROM chapter
    WHERE chapter."storyId" = story.id
    AND status = $1

  -- convert date epoch in hours and add to weight
  ) + (
    EXTRACT(EPOCH FROM story."publishedAt") / (60 * 60)
  )
) AS weight
FROM story
LEFT JOIN "user"
  ON "user".id = story."authorId"
LEFT OUTER JOIN story_genre
  ON story_genre."storyId" = story.id
LEFT OUTER JOIN genre
  ON genre.id = story_genre."genreId"
WHERE status = $1
AND (
  "user"."penName" ILIKE '%' || $4 || '%' OR
  story.title ILIKE '%' || $4 || '%' OR 
  genre.name ILIKE '%' || $4 || '%'
)
ORDER BY weight DESC
LIMIT $2 OFFSET $3;
