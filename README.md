<div align="center">
  <a href="https://www.npmjs.com/package/schoolsoft">
    <img src="https://img.shields.io/npm/v/schoolsoft" />
  </a>
  <img src="https://img.shields.io/npm/l/schoolsoft" />
  <img src="https://img.shields.io/node/v/schoolsoft?color=orange" />
  <img src="https://img.shields.io/npm/dw/schoolsoft" />
  <img src="https://img.shields.io/npm/types/schoolsoft" />
  <img src="https://img.shields.io/github/commit-activity/m/CarelessInternet/node-schoolsoft?color=red" />
</div>

# node-schoolsoft

A SchoolSoft API wrapper for both the browser and Node.js!

## Features

* Zero dependencies!
* Built with TypeScript and comes with types!
* Utilises the native `fetch` API!
  * Works with the browser, Node.js v18+, and frameworks that implement the `fetch` API like Next.js!
* Uses ESM instead of CommonJS!

## Disclaimer

This library has not been tested with guardian nor staff accounts, so please be aware that it's highly unlikely they will work with this API wrapper.

## Installation

```bash
npm i schoolsoft
```

## Documentation

<details>
  <summary>Logging In</summary>

  ### Using Functions

  #### `connect()`
  
  The recommended way of logging in is by using the `connect()` function:

  ```ts
    import { connect } from 'schoolsoft';

    const user = await connect('username', 'password', 'school');
  ```

  #### `connectWithAppKeyAndSchool()`

  If you have the user's app key and school, you can log in using only those two credentials:

  ```ts
    import { connectWithAppKeyAndSchool } from 'schoolsoft';

    const user = await connectWithAppKeyAndSchool('app key', 'school');
  ```

  ### Using the SchoolSoft Class

  You can also log in using the `SchoolSoft` class, which is what the `connect()` function uses internally:

  ```ts
    import { SchoolSoft } from 'schoolsoft';

    const school = new SchoolSoft('username', 'password', 'school');
    const user = await school.login();
  ```
</details>

<details>
  <summary>SchoolSoft Methods</summary>

  ### Get Functions

  All methods that start with `get` are known API routes that retrieve information. Here are some examples:

  ```ts
    import { connect, SchoolSoft } from 'schoolsoft';

    const schools = await SchoolSoft.getSchoolList();

    const user = await connect('username', 'password', 'school');

    // Examples of methods that retrieve information:

    const lunch = await user.getLunchMenu();
    const schedule = await user.getSchedule();

    const assignments = await user.getAssignments();
    const assignmentResult = await user.getAssignmentResult(assignments[0].id);

    const calendar = await user.getCalendar();

    // Retrieves notices (news) that are read-only, i.e. cannot be interacted with:
    const notices = await user.getNoticesLimit();
    // Retrieves notices (news) that can be interacted with:
    const actionableNotices = await user.getNoticesActionable();
    // Retrieves notices (news) that are archived:
    const archivedNotices = await user.getNoticesArchived();
  ```

  All of these methods and more can be found in the [`source code`](src/index.ts).

  ### Set Functions

  All methods that start with `set` (apart from `setAppKey()`) are known API routes that set something, such as archiving or confirming a notice. Examples:

  ```ts
    import { connect } from 'schoolsoft';

    const user = await connect('username', 'password', 'school');
    
    const { notices } = await user.getNoticesLimit();
    const actionableNotices = await user.getNoticesActionable();

    // Examples of methods that set something:

    await user.setNoticeAsArchived(notices[0].id);
    await user.setNoticeAsUnarchived(notices[0].id);
    await user.setNoticeAsRead(notices[0].id);
    await user.setNoticeAsUnread(notices[0].id);

    await user.setNoticeActionableAsConfirmed(actionableNotices[0].id);
    await user.setNoticeActionableAsConfirmed(actionableNotices[1].id, 'thanks for the information bro');
  ```

  All of these methods and more can be found in the [`source code`](src/index.ts).
</details>

## Testing

Testing is implemented with `jest`. Here's how to run the test cases:

1. Create a `.env` file in the root directory with the environment variables found in [`__tests__/environment.d.ts`](__tests__/environment.d.ts).

2. Run the test cases with `npm test`.

## Credits

Thank you to [this repository](https://github.com/Blatzar/schoolsoft-api-app) for giving me a head start.
