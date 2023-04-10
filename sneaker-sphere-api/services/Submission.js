const db = require('./db');
const helper = require('../helper');
const config = require('../config');

async function getMultiple(page = 1) {
  const offset = helper.getOffset(page, config.listPerPage);

  const rows = await db.query(
    `SELECT ProductID, ProductName, Brand, Model, Quantity, Price, Color, Stock FROM Products LIMIT ${offset},${config.listPerPage}`
  );
  const data = helper.emptyOrRows(rows);
  const meta = { page };

  return {
    data,
    meta,
  };
}

async function create(submission) {
  const result = await db.query(
    `INSERT INTO Submission 
    (SubmissionID, UserID, ProductID) 
    VALUES 
    ('${submission.submissionID}', '${submission.userID}', '${submission.productID}')`
  );

  let message = 'Error in creating submission';

  if (result.affectedRows) {
    message = 'Submission created successfully';
  }

  return { message };
}

async function update(id, submission) {
  const result = await db.query(
    `UPDATE Submission 
    SET UserID='${submission.userID}', ProductID='${submission.productID}'
    WHERE SubmissionID='${id}'`
  );

  let message = 'Error in updating submission';

  if (result.affectedRows) {
    message = 'Submission updated successfully';
  }

  return { message };
}

async function remove(id) {
  const result = await db.query(
    `DELETE FROM Submission WHERE SubmissionID='${id}'`
  );

  let message = 'Error in deleting submission';

  if (result.affectedRows) {
    message = 'Submission deleted successfully';
  }

  return { message };
}

module.exports = {
  getMultiple,
  create,
  update,
  remove,
};
