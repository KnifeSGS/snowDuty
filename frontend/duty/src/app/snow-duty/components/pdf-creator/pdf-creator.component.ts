import { Component } from '@angular/core';
import { Journal } from '../../models/journal';

import * as pdfMake from "pdfmake/build/pdfmake.js";
import * as pdfFonts from "pdfmake/build/vfs_fonts";

@Component({
  selector: 'app-pdf-creator',
  templateUrl: './pdf-creator.component.html',
  styleUrls: ['./pdf-creator.component.scss']
})
export class PdfCreatorComponent {

  constructor(
  ) {
    (window as any).pdfMake.vfs = pdfFonts.pdfMake.vfs;
  }

  test(journal: Journal) {
    console.log(journal);
  }


  getBase64ImageFromURL(url: string) {
    return new Promise((resolve, reject) => {
      const img = new Image();
      img.setAttribute("crossOrigin", "anonymous");
      img.onload = () => {
        const canvas = document.createElement("canvas");
        canvas.width = img.width;
        canvas.height = img.height;
        const ctx = canvas.getContext("2d");
        ctx!.drawImage(img, 0, 0);
        // const dataURL = canvas.toDataURL("image/png");
        const dataURL = canvas.toDataURL("image/png").replace(/^data:image\/(png|jpg);base64,/, "");
        resolve(dataURL);
      };
      img.onerror = error => {
        reject(error);
      };
      img.src = url;
    });
  }

  // buildTableBody(data, columns, c2) {
  //   var body = [];

  //   //push first and second row
  //   body.push(columns);
  //   body.push(c2);
  //   data.forEach(function (row) {
  //     var dataRow = [];
  //     columns.forEach(function (column) {
  //       if (column.text == 'timepoint' || column.text == 'cloudcover') {
  //         dataRow.push(JSON.stringify(row[column.text]));
  //       } else if (column.text == 'wind10m') {
  //         dataRow.push(row['wind10m']['direction']);
  //       } else {
  //         dataRow.push(row['wind10m']['speed']);
  //       }
  //     });
  //     body.push(dataRow);
  //   });

  //   return body;
  // }

  // table(data, columns, c2) {
  //   return {
  //     table: {
  //       headerRows: 3,
  //       body: this.buildTableBody(data, columns, c2),
  //     },
  //   };
  // }

  // generatePdf() {
  //   console.log('generatePdf');
  //   let docDefinition = {
  //     content: [
  //       { text: 'PDF Generate', style: 'header' },
  //       this.table(
  //         this.holder,
  //         //first row
  //         [
  //           { text: 'timepoint', rowSpan: 2 },
  //           { text: 'cloudcover', rowSpan: 2 },
  //           { text: 'wind10m', colSpan: 2 },
  //           '',
  //         ],
  //         //second row
  //         ['', '', { text: 'direction' }, { text: 'Speed' }]
  //       ),
  //     ],
  //   };
  //   pdfMake.createPdf(docDefinition).open();
  // }

  getChecksForJournal(journal: Journal) {
    // return new Promise((resolve, reject) => {
    //   let checks = [];
    //   for (let i = 0; i < journal.checks!.length; i++) {
    //     checks.push(journal.checks![i])
    //   }
    //   resolve(checks)
    // })
  }

  async generatePDF(journal: any, shifts: any) {
    const journalDate = new Date(journal.date).toLocaleDateString();
    let docDefinition = {
      header:
        [
          {
            image: 'header',
            width: 300,
            style: 'header',
            marginLeft: 150,
            marginTop: 20,
            marginBottom: 20,

          },
        ],

      content: [
        {
          marginTop: 40,
          layout: 'noBorders',
          table: {
            headerRows: 1,
            widths: ['*', 'auto', '*'],
            body: [
              [
                {
                  text: 'Azonosító kód:VKSZ-KÖT-01',
                  alignment: 'center',
                }, {
                  text: 'Ügyeleti napló',
                  bold: true,
                  alignment: 'center',
                }, {
                  text: 'Verzió száma: 2',
                  alignment: 'center',
                }]
            ]
          }
        }, {
          marginTop: 20,
          layout: 'headerLineOnly',
          table: {
            headerRows: 1,
            widths: ['auto', '*', 'auto', '*'],
            body: [
              [
                {
                  text: 'Ügyeletvezető:',
                  alignment: 'right',
                }, {
                  text: journal.worker.full_name,
                  bold: true,
                  alignment: 'left',
                }, {
                  text: 'Dátum:',
                  alignment: 'right',
                }, {
                  text: journalDate,
                  alignment: 'left',
                }]
            ]
          }
        }, {
          marginTop: 20,
          fontSize: 10,
          layout: 'headerLineOnly',
          table: {
            headerRows: 1,
            widths: ['auto', 'auto', 'auto', 'auto', 'auto', '*'],
            body: [
              [{
                text: 'ellenőrzés',
                alignment: 'center',
                style: 'headerCell'
              }, {
                text: 'hőmérséklet (°C)',
                alignment: 'center',
                style: 'headerCell'
              }, {
                text: 'csapadék',
                alignment: 'center',
                style: 'headerCell'
              }, {
                text: 'égbolt',
                alignment: 'center',
                style: 'headerCell'
              }, {
                text: 'látási viszonyok',
                alignment: 'center',
                style: 'headerCell'
              }, {
                text: 'utak felületének állapota',
                style: 'headerCell'
              }],
              ...journal.checks?.map((checks: any) => [
                checks.checking,
                checks.temperature,
                checks.percipitation,
                checks.sky,
                checks.visibility,
                checks.roads
              ])
            ]

          },
        }, {
          marginTop: 20,
          fontSize: 10,
          layout: {
            fillColor: function (rowIndex: number, node: any, columnIndex: any) {
              return (rowIndex === 0) ? '#eeffee' : null
            }
          },
          table: {
            headerRows: 1,
            alignment: 'center',
            widths: ['*', 'auto', 'auto', 'auto', 'auto', 'auto', 'auto', 'auto', 'auto', 'auto', 'auto', '*'],
            body: [
              [{
                text: 'Ügyeletben dolgozók',
                alignment: 'center',
                style: 'shiftHeader'
              }, {
                text: 'műszak',
                alignment: 'center',
                style: 'shiftHeader'
              }, {
                text: 'gépek',
                alignment: 'center',
                style: 'shiftHeader'
              }, {
                text: 'só (t)',
                alignment: 'center',
                style: 'shiftHeader'
              }, {
                text: 'bazalt (t)',
                alignment: 'center',
                style: 'shiftHeader'
              }, {
                text: 'CaCl2 (t)',
                alignment: 'center',
                style: 'shiftHeader'
              }, {
                text: 'Kalcinol (l)',
                alignment: 'center',
                style: 'shiftHeader'
              }, {
                text: 'keverék (t)',
                alignment: 'center',
                style: 'shiftHeader'
              }, {
                text: 'Zeokal (t)',
                alignment: 'center',
                style: 'shiftHeader'
              }, {
                text: 'km',
                alignment: 'center',
                style: 'shiftHeader'
              }, {
                text: 'üzemóra',
                alignment: 'center',
                style: 'shiftHeader'
              }, {
                text: 'elrendelt szórási mennyiség (g/m2)',
                alignment: 'center',
                style: 'shiftHeader'
              },
              ],
              ...shifts.map((shifts: any) => [
                shifts.onDuty.full_name,
                shifts.daytime ? 'nappali' : 'esti',
                shifts.machine,
                shifts.salt,
                shifts.basalt,
                shifts.cacl2,
                shifts.kalcinol,
                shifts.mixture,
                shifts.zeokal,
                shifts.km,
                shifts.workHour,
                shifts.orderedQuantity
              ])
            ]

          },
        }, {
          marginTop: 20,
          fontSize: 10,
          layout: {
            fillColor: function (rowIndex: number, node: any, columnIndex: any) {
              return (rowIndex === 0) ? '#eeffee' : null
            }
          },
          table: {
            headerRows: 1,
            alignment: 'center',
            widths: ['auto', '*'],
            body: [
              // [{
              //   text: '',
              //   alignment: 'center',
              //   style: 'shiftHeader'
              // }, {
              //   text: 'Megjegyzések:',
              //   alignment: 'center',
              //   style: 'shiftHeader'
              // },
              // ],
              ...journal.comment.map((comment: any) => [comment[0], comment[1]])
            ]

          },
        }, {
          marginTop: 20,
          layout: 'noBorders',
          table: {
            headerRows: 1,
            widths: ['*'],
            body: [
              [
                {
                  text: 'Az alvállalkozók munkavégzéséről készített melléklet kitöltése minden ügyeletvezető számára KÖTELEZŐ!',
                  alignment: 'center',
                  bold: true
                },]
            ]
          }
        }, {
          marginTop: 20,
          layout: 'noBorders',
          table: {
            headerRows: 1,
            widths: ['*', 'auto'],
            body: [
              [
                {
                  text: 'Mikortól hatályos: 2021. November 23.',
                  alignment: 'left',
                  bold: true,
                  italic: true
                }, {
                  text: 'Oldalszám: 1/1',
                  alignment: 'right',
                  bold: true,
                  italic: true
                },]
            ]
          }
        },

      ],

      images: {
        header: 'data:image/png;base64,' + await this.getBase64ImageFromURL(
          '../../../../assets/hokotro/images/header_logo.png')
      },

      styles: {
        header: {
        },
        headerCell: {
          bold: true,
          fontSize: 9
        },
        shiftHeader: {
          bold: true,
          fontSize: 6
        },
      }
    };

    console.log(journal);
    pdfMake.createPdf(docDefinition).open({}, window);
  }

}
