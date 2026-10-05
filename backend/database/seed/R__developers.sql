INSERT INTO developers (id, name, skills)
VALUES
	(1, 'Alice', '["Frontend"]'::jsonb),
	(2, 'Bob', '["Backend"]'::jsonb),
	(3, 'Carol', '["Frontend", "Backend"]'::jsonb),
	(4, 'Dave', '["Backend"]'::jsonb)
ON CONFLICT (id) DO UPDATE
SET name = EXCLUDED.name,
	skills = EXCLUDED.skills;
