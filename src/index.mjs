import generateDocx from '../generateDocx.mjs';

const inputData = {
  date: '05/03/2024',
  to: null,
  from: 'Ben',
  subject: null,
  'full name without captlize': 'Leonardo G Urci',
  introductionText: 'Hi I\'m Leonardo, but you can call me as Urci, hope seeing you all soon!'
};

(async () => {
  const document = await generateDocx(inputData);
  document.saveDocument('test.docx')
  console.log('DOCX file generated!');
})();
