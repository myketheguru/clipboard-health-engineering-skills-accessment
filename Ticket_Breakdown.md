# Ticket Breakdown

We are a staffing company whose primary purpose is to book Agents at Shifts posted by Facilities on our platform. We're working on a new feature which will generate reports for our client Facilities containing info on how many hours each Agent worked in a given quarter by summing up every Shift they worked. Currently, this is how the process works:

- Data is saved in the database in the Facilities, Agents, and Shifts tables
- A function `getShiftsByFacility` is called with the Facility's id, returning all Shifts worked that quarter, including some metadata about the Agent assigned to each
- A function `generateReport` is then called with the list of Shifts. It converts them into a PDF which can be submitted by the Facility for compliance.

## You've been asked to work on a ticket. It reads:

**Currently, the id of each Agent on the reports we generate is their internal database id. We'd like to add the ability for Facilities to save their own custom ids for each Agent they work with and use that id when generating reports for them.**

Based on the information given, break this ticket down into 2-5 individual tickets to perform. Provide as much detail for each ticket as you can, including acceptance criteria, time/effort estimates, and implementation details. Feel free to make informed guesses about any unknown details - you can't guess "wrong".

You will be graded on the level of detail in each ticket, the clarity of the execution plan within and between tickets, and the intelligibility of your language. You don't need to be a native English speaker, but please proof-read your work.

## Your Breakdown Here

Given the current feature request, here are my suggestions in a list. Each item has its own acceptance criteria and implementation details. By breaking down the feature into smaller chunks, we can better estimate the time and effort needed for each task and ensure that each one is implemented correctly before moving on to the next.

Here are the proposed sub-tasks:

#### Add a new custom ID field to the Agents table in the database.

1. Implement a new custom ID field for Agents in the database

- `Description:` Add a new field to the Agents table in the database to store custom IDs for each agent.
- `Acceptance Criteria:`

  - A new column should be included in the Agents table in the database to store custom IDs.
  - The new field is nullable and can be blank.
  - On the User Interface, the field can be edited by the Facility.

- `Time/Effort estimate:` 2-4 hours
- `Implementation details:`
  - Add a new field to the Agents table in the database.
  - Update the UI to allow Facilities to input custom IDs for each Agent and store the value in the new field in the database.

#### Modify the getShiftsByFacility function to retrieve the custom ID of each Agent, if available.

2. Update getShiftsByFacility function to return custom Agent IDs

- `Description:` Update the getShiftsByFacility function to return the custom ID of each Agent instead of their internal database ID.
- `Acceptance Criteria:`

  - The `getShiftsByFacility` function should return the custom ID of each Agent, if available, instead of their internal database ID.
  - In the event that no custom ID is present, the function should return the internal database ID as fallback.

- `Time/Effort estimate:` 2-3 hours
- `Implementation details:`
  - Modify the query in the `getShiftsByFacility` function to join (leftJoinAndSelect) with the Agents table and retrieve the custom ID if present.
  - Modify the function to return the custom ID if available, otherwise return the Agent internal database ID.

#### Enhance the Facility UI to allow Facilities to input custom IDs for their Agents.

3. Update `generateReport` function to include custom Agent IDs

- `Description:` Update the `generateReport` function to include the custom ID of each Agent when generating reports for Facilities.
- `Acceptance Criteria:`

  - The `generateReport` function includes the custom ID of each Agent, if available, on the report generated for Facilities.
  - If no custom ID is available, the function should include the internal database ID as a fallback.

- `Time/Effort estimate:` 2-3 hours
- `Implementation details:`
  - Modify the PDF Report generation code in the `generateReport` function to include the custom ID of each Agent, if available.
  - If no custom ID is present, include the internal database ID as fallback.

#### Update the generateReport function to include the custom IDs of Agents on the reports.

4. Update UI to allow Facilities to input custom Agent IDs

- `Description:` Update the Facility UI to allow Facilities to input custom IDs for each Agent they work with.
- `Acceptance Criteria:`

  - The Facility UI includes a new field to input custom IDs for each Agent.
  - The Facility can input and save custom IDs for each Agent.

- `Time/Effort estimate:` 2-4 hours
- `Implementation details:`
  - Add a new input field for custom Agent IDs to the Facility UI.
  - Add functionality to save and retrieve custom IDs for each Agent in the database.
  - Update the UI to display the custom ID of each Agent, if available.

#### Write comprehensive test cases to ensure the new functionality works as expected and there are no regressions.

5. Write test cases

- `Description:` Write test cases to ensure the new feature works as intended and there are no regressions.
- `Acceptance Criteria:`

  - Ensure that test cases are written to cover all aspects of the new feature, including inputting custom IDs, retrieving Shifts with custom IDs, generating reports with custom IDs, and fallbacks to internal database IDs.
  - Ensure that all test cases are passing.

- `Time/Effort estimate:` 4-6 hours
- `Implementation details:`

  - Write test cases using a testing framework such as cypress or jest.
  - Include both unit tests and integration tests to cover all aspects of the new feature.
  - Test both positive and negative edge cases.

- `Estimated completion time:` 14hours

It's important to consider that there may be dependencies among these sub-tasks, and some tasks may be completed concurrently while others must be done sequentially. By taking this approach, we can ensure that each feature is delivered on time and with the expected quality.
