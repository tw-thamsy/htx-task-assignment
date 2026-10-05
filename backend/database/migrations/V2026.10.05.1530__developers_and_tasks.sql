CREATE TABLE developers (
    id BIGINT PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    skills JSONB NOT NULL DEFAULT '[]'::jsonb
);

CREATE TABLE tasks (
    id BIGINT PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    skills_required JSONB NOT NULL DEFAULT '[]'::jsonb,
    assigned_to BIGINT REFERENCES developers(id),
    status VARCHAR(50) NOT NULL
);