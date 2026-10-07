# Design Decisions

## Backend

### 1. Domain Driven Design (DDD)

DDD's entities/aggregates allow for transactional boundaries to be observed. The two main entities are:

- Tasks (or subtasks)
- Developers

Business rules lie with entities and services (use cases), while repositories only handle persistance, and controllers only handle the API layer.

#### Subtasks as Task Entity

Essentially, **subtasks are tasks with a pointer to a parent task**. Since the restrictions of subtasks and tasks are the same, they can be treated as the same domain entity.

#### Task Update Restrictions (task rules) as Service

The restrictions:

- Tasks can only be assigned to developers with the skills to complete the task
- Tasks can only be set to `Done` if all subtasks are `Done`

These restrictions are implemented on the actions. This means there are other sequence of API calls that can allow for a task to be `Done` even though some subtasks are not `Done`.

This is intentional. Because these restrictions seem more like guidance rather than concrete business rules.

- There is no reason why a backend developer cannot be assigned to do some frontend work
- Clerical Errors: What would be the resolution if a subtask was mistakenly marked as done? Would we change the status of all parent tasks?

If needed, there can be another functionality to provide warnings when these restrictions are violated. It need not be the case that these restrictions be treated as domain rules that cannot be untrue under any circumstances.

#### Skills as constants (not in DB)

The Skills can be put into the DB table. This seems to be the instruction of the Take Home Test. However, given the features that needs to be developed, it is sufficient to leave them as constants.

When the need arises (for example, the dynamic adding and removing of defined skills), it can be added into the database then. Else, there seems to be little benefit to storing them in a database. It adds overhead without providing additonal functionality or performance.

### 2. Integration Tests

Integration tests are implemented mainly for the repository layer, to ensure that the calls to the DB are correct, and transformed into the needed entities.

#### API tests

Not implemented for simplicity

## Frontend

### 3. Component Testing with Storybook

`npm run storybook`

Having immediate visual feedback, allows for confident development of components. Using Storybook, also allows for testing components that might be hard to navigate to in the full application.

`npm run test:storybook`

It is easier to write frontend tests when the dev can see the interactions. Writing component tests in storybook instead of a virtual dom, allows the dev to see exactly what parts of the interaction is problematic.

#### E2E tests

Not implemented for simplicity

## Code Repo

### 4. Common folder for API request and response objects

This allows reusability across both frontend and backend.

### 5. Git-native API client

Using bruno as the API client allows for example HTTP requests and environment to be shared across developers easily.

## AI

### 6. Unnecessary Guardrails

Since the output of the AI here is only just a data output that does not take action, it is unnecessary to place more guardrails that use AI. It would just be a waste of tokens, the worst case if someone is attempting to make a prompt injection would be that the task is misclassified.

### 7. Evals

Some evals are implemented to check the Precision and Recall of the AI classifier. If more requirements for accuracy comes, the assessment of the AI classifier can be refined.
