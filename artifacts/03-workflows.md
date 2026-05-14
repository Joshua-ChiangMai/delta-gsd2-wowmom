# Workflows

## Context Status

The formal WOW Mom App specification was not present in the workspace. These workflows are provisional and intended as a review scaffold for specification-driven development.

## Workflow 1: Onboard Primary Caregiver

Goal:

Create a usable starting context for the primary caregiver.

Actors:

- Mom / Primary Caregiver
- System

Steps:

1. User signs up or signs in.
2. System creates a user account.
3. User creates or joins a household.
4. User enters basic household preferences.
5. User optionally creates child profiles.
6. System initializes default notification preferences.
7. User lands in the main household workspace.

Outputs:

- user account
- household profile
- primary caregiver membership
- optional child profiles

Open validation:

- Is onboarding centered on household setup, child setup, wellness goals, or service matching?

## Workflow 2: Invite Caregiver Or Support Member

Goal:

Allow trusted people to participate in the household support model.

Actors:

- Primary Caregiver
- Invitee
- System

Steps:

1. Primary caregiver enters invitee contact information.
2. Primary caregiver selects intended role and access scope.
3. System creates an invitation.
4. System sends invitation notification.
5. Invitee accepts invitation.
6. System creates household membership.
7. Invitee receives access according to assigned permissions.

Outputs:

- invitation
- household membership
- role assignment

Business rules:

- invitations should expire
- access should be revocable
- sensitive information should require explicit permission

## Workflow 3: Create And Assign Task

Goal:

Coordinate care or household responsibilities.

Actors:

- Primary Caregiver
- Caregiver / Support Member
- System

Steps:

1. User creates a task with title, details, priority, and due date.
2. User optionally links the task to a child, routine, event, or support request.
3. User assigns the task to themselves or another household member.
4. System notifies the assignee.
5. Assignee updates status.
6. System records completion history.

Outputs:

- task
- assignment
- notification
- completion record

Business rules:

- only authorized users can assign tasks
- assignees should only see tasks within their access scope

## Workflow 4: Create Routine

Goal:

Model repeated activities and reduce manual coordination.

Actors:

- Primary Caregiver
- Partner / Co-Parent
- System

Steps:

1. User creates a routine.
2. User defines schedule pattern and steps.
3. User links routine to household or child profile.
4. System activates routine.
5. System generates reminders or tasks according to schedule.
6. Users complete routine instances.

Outputs:

- routine definition
- generated reminders or tasks
- routine completion history

Open validation:

- Does the specification require recurring task generation or simple reminders?

## Workflow 5: Request Help

Goal:

Let a caregiver ask trusted people for support.

Actors:

- Primary Caregiver
- Support Member
- System

Steps:

1. User creates a support request.
2. User selects request type, time needed, and audience.
3. System notifies eligible support members.
4. Support member accepts, declines, or asks for clarification.
5. System updates request status.
6. Accepted request becomes a task or event.
7. User receives confirmation.

Outputs:

- support request
- response
- optional task or event

Business rules:

- requests may need expiration or cancellation
- request visibility should be scoped by trust level

## Workflow 6: Manage Family Calendar

Goal:

Keep household events visible and coordinated.

Actors:

- Household Member
- System

Steps:

1. User creates an event.
2. User adds participants, location, and linked child if applicable.
3. System notifies participants.
4. Participants view event in shared calendar.
5. User updates or cancels event as needed.
6. System distributes changes.

Outputs:

- event
- participant list
- notifications

## Workflow 7: Capture Note Or Journal Entry

Goal:

Record care context, observations, or reflections.

Actors:

- Primary Caregiver
- Partner / Co-Parent
- Babysitter / External Caregiver
- System

Steps:

1. User creates a note.
2. User links note to child, event, task, or household.
3. User selects visibility.
4. System stores note.
5. Authorized users can view or respond.

Outputs:

- note
- visibility scope
- optional linked domain object

Business rules:

- private notes should remain private by default
- child-sensitive notes should be auditable and permissioned

## Workflow 8: Notification And Reminder Delivery

Goal:

Keep users aware of assignments, schedule changes, and requests.

Actors:

- System
- User

Steps:

1. Domain event occurs.
2. System determines recipients.
3. System applies user notification preferences.
4. System sends notification through selected channel.
5. User reads or acts on notification.
6. System records delivery and read status.

Outputs:

- notification
- delivery status
- read status

## Cross-Workflow Concerns

- household-scoped authorization
- privacy for child and family data
- invitation lifecycle
- auditability for sensitive access
- recurring schedules and timezone handling
- notification preferences and quiet hours
- graceful handling of temporary caregivers

