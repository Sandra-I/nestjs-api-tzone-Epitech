/* eslint-disable prettier/prettier */
import * as ejs from 'ejs';
import * as fs from 'fs';
import * as htmlPdf from 'html-pdf';
import { User } from 'src/user/entities/user.entity';
import { Payment } from 'src/payment/entities/payment.entity';
import { Plan } from 'src/plan/entities/plan.entity';

export async function generateInvoicePDF ( 
  user: User,
  payment: Payment,
  plan: Plan,
  subscription: User['subscription'][number],
): Promise<fs.ReadStream> {
  const pdfTemplate = await ejs.renderFile(
    `${process.cwd()}/src/etc/generatePDF/template.ejs`,
    {
      invoiceNumber: payment.invoiceNumber,
      createdAt: new Date(payment.date).toLocaleDateString(),
      clientName: user.lastName + ' ' + user.firstName,
      clientEmail: user.email,
      payment: {
        description: `Abonnement ${plan.name} - ${subscription.annual ? 'Annuel' : 'Mensuel'}`,
        unitPrice: payment.total,
        amount: payment.total,
      },
      totalPayment: payment.total,
    },
    // {
    //   beautify: true,
    //   async: true,
    // },
  );
  return new Promise((res) => {
    htmlPdf
      .create(pdfTemplate)
      .toStream((err, stream) => res(stream));
  });
}
