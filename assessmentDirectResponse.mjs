/**
 * Captalizes all the first letters in the given string, example:
 * 
 * input: 'hi I like gym'
 * output: 'Hi I Like Gym' 
 * 
 * @param {string} str
 */
const capitalizeWords = (str) => {
  return str.split(' ').map(word => {
      return word.charAt(0).toUpperCase() + word.slice(1);
  }).join(' ');
}

export default async (inputData) => {
  const document = new DocxHandler(inputData);
  document.addParagraph('Heading 1', `<b>INTRODUCTION</b>`);

  const formatDate = (datetime, rawDateObject = false) =>
    (rawDateObject ? datetime : new Date(datetime * 1000)).toLocaleDateString(
      'en-GB',
      {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric',
      }
    );

  const subtractDaysFromCurrentDate = (daysToSubtract = 0) => {
    const date = new Date();
    date.setDate(date.getDate() - daysToSubtract);
    return formatDate(date, true);
  };

  document.addParagraph(
    'Body Text',
    'This assessment is a test of your ability to create welldasdasdas structured code that correctly implements specifications you will been given.'
  );

  document.addParagraph(
    'Body Text',
    'Focus on the main tasks and then come back and think about the bonus points if you have time.'
  );

  /**
     TASK 1
     We are adding a table to a document that looks like this:

     |Date:   |05/03/2024       |
     |To:     |John             |
     |From:   |Ben              |
     |Subject:|Work life balance|

     We get the values from a form the user has filled in. This is stored in inputData. Fields are optional in the form.
     If a field was not filled in the form, it will have value null. This means that sometimes we get a table looks like this:

     |Date:   |05/03/2024|
     |To:     |null      |
     |From:   |Ben       |
     |Subject:|null      |

     Not good.

     The inputData object looks something like

     {
		 "date": "05/03/2024",
		 "to" : null,
		 "from": "Ben",
		 "subject": null
     }

     DONE - Change the below code so that the Date, To, From, and Subject rows do not appear in the document if they were not filled in by the user.

     DONE - BONUS 1: Structure your code to work if have have an array of lowercased form-data field names, e.g. ['to', 'from', 'subject', 'email']. You will still need to have the uppercased field name in the first column.
     (hint: loop, function).

     DONE - BONUS 2: You now need to change your BONUS 1 code to work dynamically with all the keys in the inputData object, without knowing beforehand what the keys will be named.

     DONE - BONUS 3: Account for the keys to potentially have spaces in them, e.g. 'first name'
     */
  const rows = [];

  for (const [field, value] of Object.entries(inputData)) {
    if (value != null) {
      rows.push([capitalizeWords(field), value]);
    }
  }

  document.addTable({
    style: 'Plain Table 1',
    rows,
  });

  /**
     TASK 2

     DONE - Add a Body Text paragraph to the document with the value of field "introductionText" from the input data.
     */

  // Task 2 code here

  if (inputData.introductionText != null) {
    document.addParagraph('Body Text', inputData.introductionText);
  }

  /**

     TASK 3
     DONE - Write a function that takes a document object & text string as input, and adds a bold 'Heading 1' paragraph with the input text,
     and an empty 'Body Text' paragraph ('').

     The function signature should be 'addBoldHeaderToDocument ( document , headerText )'

     Text can be made bold by wrapping it in HTML bold tags, e.g. document.addParagraph('Heading 1', '<b>INTRODUCTION</b>');

     The user of the function should not have to include these bold tags themselves - the function should take care of adding them.

     BONUS:
     DONE - Your function should remove all existing bold tags <b> </b> from the text input before applying its own bold tags.

     In the real world, this would be useful if a user of your function did something like accidentally adding an open bold tag
     without adding a close tag.
     */

  // Task 3 code here

  const addBoldHeaderToDocument = (documentParam, headerText) => {
    const textWithoutBoldTag = headerText.replace(/<?\/?b>?/g, '')
    const formattedTextWithBoldTag = `<b>${textWithoutBoldTag}</b>`
    documentParam.addParagraph('Heading 1', formattedTextWithBoldTag);
  };

  /**

     TASK 4

     DONE - Expand the below table to include entries for the previous 7 days. For example, if today is 7 July 2022, then the table should look like:

     Day difference | Date
     0               Thursday, 7 July 2022
     1               Wednesday, 6 July 2022
     2               Tuesday, 5 July 2022
     3               ...
     4               ...
     5               ...
     6               ...
     7               ...

     Below is the data structure for the first tree rows

     const moreRows = [
     ['0', subtractDaysFromCurrentDate(0) ],
     ['1', subtractDaysFromCurrentDate(1) ],
     ['2', subtractDaysFromCurrentDate(2) ]
     ];

     DONE - BONUS: Create a function that takes an integer number and returns an array of rows (same structure as the above). Only return up to 99 rows.

     DONE - BONUS 2: In the function you create, assume that the user might not pass in an integer, or even a number. You will need to parse their
     input into a base 10 integer.

     DONE - BONUS 3: Implement error handling in your function in whatever way you think is needed. You can use console.log/error, or throw error messages.
     */

  // Task 4 code here

  const CLEAN_READING_DATE_FORMAT = 'cccc, d LLLL yyyy'; // Format example: Thursday, 7 July 2022

  /**
   * @param {string|number} days
   */
  const generatePreviousDaysTableRows = (days) => {
    const parsedDays = parseInt(days, 10);

    if (Number.isNaN(parsedDays)) {
      throw new Error(
        "You must pass a valid amount of days. Example: 10 or '10'"
      );
    }

    const rows = [];

    for (let i = 0; i <= days; i += 1) {
      rows.push([i, subtractDaysFromCurrentDate(i)]);
    }

    return rows;
  };

  const previousDaysRows = generatePreviousDaysTableRows(7);

  const previousDaysTableRow = [
    ['Day Difference', 'Date'], // Table header
    ...previousDaysRows,
  ];

  document.addTable({
    style: 'Plain Table 1',
    rows: previousDaysTableRow,
  });

  /**
     CHALLENGE TASK

     Firelex has a functionality called "Modules", which are reusable pieces of code you can write that can be imported
     into multiple applications without having to copy/replicate code.

     The below is an example of an object containing helper functions that you would return from a Module.
     The task is to complete the implementation of each of the functions.

     */

  const helpers = {
    /**
     * @param {string} inputString
     */
    reverseString: (inputString) => {
      return [...inputString].reverse().join('');
    },

    /**
     *  @param {string} inputString
     *  @param {'bold'|'italics'|'underline'} tagName
     */
    wrapStringInHTMLTags: (inputString, tagName) => {
      switch (tagName) {
        case 'bold':
          return `<b> ${inputString} </b>`;
        case 'italics':
          return `<i> ${inputString} </i>`;
        case 'underline':
          return `<u> ${inputString} </u>`;
        default:
          throw new Error('You must pass a valid `tagName`');
      }
    },

    /**
     * It considers the hour for filtering the date, so if the current date is 2024-10-10T10:00:00:00, dates before this day and this time will be considered
     *
     * @param {Date[]} dateArray
     * @param {boolean} dateArray
     */
    filterDates: (dateArray, beforeCurrentDate = true) => {
      /**
       * A good way of not considering the time for filtering would be setting the hours of date objects to 0, example:
       *
       * const currentDate().setHours(0, 0, 0, 0);
       *
       * And then setting the hours everywhere needed
       */
      const currentDatetime = new Date().getTime();

      try {
        if (beforeCurrentDate) {
          return dateArray.filter((date) => currentDatetime > date.getTime());
        }

        return dateArray.filter((date) => currentDatetime < date.getTime());
      } catch {
        throw new Error(
          'You must pass valid date objects for `dateArray` param'
        );
      }
    },
  };

  document.addParagraph(
    'Body Text',
    'This is the end of the assessment, thank you for your time.'
  );

  return document;
};
