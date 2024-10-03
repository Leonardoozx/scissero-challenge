import fs from 'fs';
import {
  Document,
  Packer,
  Paragraph,
  TextRun,
  Table,
  TableRow,
  TableCell,
  WidthType,
} from 'docx';

export default class DocxHandler {
  constructor(inputData) {
    this.inputData = inputData;
    this.children = [];
  }

  /**
   * @param { "Heading 1" | "Body Text" } style
   * @param {string} text
   */
  addParagraph(style, text) {
    let paragraph;
    switch (style) {
      case 'Heading 1':
        paragraph = new Paragraph({
          children: [
            new TextRun({
              text,
              bold: true,
            }),
          ],
          heading: 'Heading 1',
        });
        break;
      case 'Body Text':
        paragraph = new Paragraph(text);
        break;
      default:
        paragraph = new Paragraph(text);
    }
    this.children.push(paragraph);
  }

  addTable(options) {
    const rows = options.rows.map((rowData) => {
      const cells = rowData.map(
        (cellText) =>
          new TableCell({
            children: [
              new Paragraph(cellText != null ? cellText.toString() : ''),
            ],
          })
      );
      return new TableRow({ children: cells });
    });

    const table = new Table({
      rows: rows,
      width: {
        size: 100,
        type: WidthType.PERCENTAGE,
      },
    });

    this.children.push(table);
  }

  async saveDocument(fileName) {
    const doc = new Document({
      sections: [
        {
          properties: {},
          children: this.children,
        },
      ],
    });

    const buffer = await Packer.toBuffer(doc);
    fs.writeFileSync(fileName, buffer);
  }
}
