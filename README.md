# Documentation

## Collection

- Users
- Appiontments
- Schedules
- HeaderContents
- FeedContents

---------

### Users

| Field             | Type          | Desc                            |
| ----------------- |---------------|-------------------------------- |
| **Name**          | String        |                                 |
| **Email**         | String        |                                 |
| **Phone**         | Object        |{countryCode:+91, number:'asdas} |
| **Password**      | String        |                                 |
| **Sex**           | String        |                                 |
| **DOB**           | Date          |                                 |
| **Type**          | Enum          | CLIENT,DOCTOR                   |

### Appiontments

| Field             | Type          | Desc                            |
| ----------------- |---------------|-------------------------------- |
| **doctor**        | Entity        | User                            |
| **client**        | Entity        | Doctor                          |
| **time**          | DataTime      |{countryCode:+91, number:'asdas} |
| **status**        | Enum          | WAITING_APPROVAL,APPROVED,CANCEL|
| **reason**        | String        |                                 |

### Schedules

| Field                    | Type          | Desc                            |
| ------------------------ |---------------|-------------------------------- |
| **doctor**               | Entity        | User                            |
| **day**                  | Enum          | MON,TUE,WED,THR,FRI,SAT,SUN     |
| **time_slot**            | Entity        | User                            |
| **isAvailable**          | boolean       | Defaults to false               |
| **hasCreatedSchedule**   | boolean       | Defaults to false               |

### HeaderContents

| Field             | Type          | Desc                            |
| ----------------- |---------------|-------------------------------- |
| **type**          | Enum          | VIDEO, CONTENT                  |
| **title**         | String        |                                 |
| **url**           | String        |{countryCode:+91, number:'asdas} |
| **isActive**      | boolean       | Defaults to false               |

### FeedContents

| Field             | Type          | Desc                            |
| ----------------- |---------------|-------------------------------- |
| **type**          | Enum          | VIDEO, CONTENT                  |
| **title**         | String        |                                 |
| **content**       | String        |                                 |
| **url**           | String        |                                 |
| **isActive**      | boolean       | Defaults to false               |
