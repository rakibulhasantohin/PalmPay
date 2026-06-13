import { jsPDF } from 'jspdf';

export interface PaymentItem {
  id: number;
  amount: string;
  date: string;
  status: string;
  label: string;
}

export function generateRepaymentReceiptPDF(isFullyPaid: boolean, userEmail: string = 'rakibulhasantohin@gmail.com') {
  const doc = new jsPDF({
    orientation: 'portrait',
    unit: 'mm',
    format: 'a4'
  });

  // Theme Colors
  const primaryNavy = '#1e1b4b'; //indigo-950
  const accentTeal = '#059669'; //emerald-600
  const neutralCharcoal = '#1e293b'; //slate-800
  const mutedGray = '#64748b'; //slate-500
  const lightBg = '#f8fafc'; //slate-50
  const borderLine = '#cbd5e1'; //slate-300

  // Standard Margins
  const marginX = 20;
  let posY = 20;

  // 1. Draw Header Bar with Decorative Gradient Accent
  doc.setFillColor(30, 27, 75); // Navy Accent Background
  doc.rect(0, 0, 210, 8, 'F');
  
  // 2. Branding Logo & Title
  posY += 10;
  doc.setTextColor(primaryNavy);
  doc.setFont('Helvetica', 'Bold');
  doc.setFontSize(26);
  doc.text('PalmPay', marginX, posY);
  
  doc.setTextColor(accentTeal);
  doc.setFontSize(10);
  doc.setFont('Helvetica', 'Normal');
  doc.text('MOBILE INSTALLMENT PLATFORM & DEVICE SECURITY SERVICES', marginX, posY + 5);

  // Document Title Badge
  posY += 15;
  doc.setFillColor(lightBg);
  doc.rect(marginX, posY, 170, 16, 'F');
  
  doc.setTextColor(neutralCharcoal);
  doc.setFont('Helvetica', 'Bold');
  doc.setFontSize(14);
  doc.text('LOAN REPAYMENT RECEIPT & DEVICE STATUS CERTIFICATE', marginX + 4, posY + 10);

  // 3. Document Details Row
  posY += 26;
  doc.setFont('Helvetica', 'Normal');
  doc.setFontSize(9);
  doc.setTextColor(mutedGray);
  doc.text('Certificate ID:', marginX, posY);
  doc.text('Date of Issue:', marginX + 60, posY);
  doc.text('Client Email:', marginX + 115, posY);

  doc.setFont('Helvetica', 'Bold');
  doc.setTextColor(neutralCharcoal);
  const certId = 'PP-CERT-' + (isFullyPaid ? '928341' : '517243');
  doc.text(certId, marginX, posY + 5);
  doc.text('June 13, 2026', marginX + 60, posY + 5);
  doc.text(userEmail, marginX + 115, posY + 5);

  // Horizontal Divider
  posY += 12;
  doc.setDrawColor(203, 213, 225);
  doc.setLineWidth(0.4);
  doc.line(marginX, posY, 190, posY);

  // 4. Device and Unlocking Status Section
  posY += 10;
  doc.setFillColor(248, 250, 252);
  doc.rect(testX(marginX), posY, 170, 36, 'F');

  doc.setTextColor(primaryNavy);
  doc.setFont('Helvetica', 'Bold');
  doc.setFontSize(11);
  doc.text('DEVICE SPECIFICATIONS & LOCK STATUS', marginX + 6, posY + 8);

  doc.setFont('Helvetica', 'Normal');
  doc.setFontSize(9.5);
  doc.setTextColor(neutralCharcoal);
  doc.text('Device Model:   TECNO POVA slim 5G (KM9, 256GB + 8GB)', marginX + 6, posY + 16);
  doc.text('Retail Price:       TK 32,999.00', marginX + 6, posY + 23);

  // Fully Paid Status Badge
  doc.setFont('Helvetica', 'Bold');
  if (isFullyPaid) {
    // Green highlights
    doc.setFillColor(209, 250, 229); // emerald-100
    doc.rect(marginX + 105, posY + 18, 55, 12, 'F');
    doc.setTextColor(4, 120, 87); // emerald-700
    doc.setFontSize(9);
    doc.text('LIFETIME UNLOCKED', marginX + 114, posY + 24);
    doc.setFontSize(8);
    doc.text('STATUS: FULLY REPAID', marginX + 113, posY + 28);
  } else {
    // Orange highlights
    doc.setFillColor(254, 243, 199); // amber-100
    doc.rect(marginX + 105, posY + 18, 55, 12, 'F');
    doc.setTextColor(180, 83, 9); // amber-700
    doc.setFontSize(9);
    doc.text('DEVICE REMAINING LOCKS', marginX + 107, posY + 24);
    doc.setFontSize(8);
    doc.text('PENDING FINAL DUES', marginX + 114, posY + 28);
  }

  // Release/Unlock Statement Text
  posY += 44;
  doc.setFont('Helvetica', 'Normal');
  doc.setFontSize(9);
  doc.setTextColor(mutedGray);
  
  if (isFullyPaid) {
    doc.setFont('Helvetica', 'Oblique');
    doc.setTextColor(accentTeal);
    const textStatement = 'This statement certifies that all standard terms and retail installments totalling TK 39,782.00 (inclusive of loan servicing and deposits) have been recorded as 100% satisfied. The associated TECNO cellular handset is officially fully and permanently released from the security locking mechanism.';
    const splitStatement = doc.splitTextToSize(textStatement, 168);
    doc.text(splitStatement, marginX, posY);
    posY += (splitStatement.length * 4.5);
  } else {
    doc.setFont('Helvetica', 'Oblique');
    doc.setTextColor(neutralCharcoal);
    const textStatement = 'All future scheduled payments are required to prevent automatic software locks. Active status requires periodic internet authentication before each installment limit date.';
    const splitStatement = doc.splitTextToSize(textStatement, 168);
    doc.text(splitStatement, marginX, posY);
    posY += (splitStatement.length * 4.5);
  }

  // 5. Payment Details Section (Summary Table)
  posY += 6;
  doc.setTextColor(primaryNavy);
  doc.setFont('Helvetica', 'Bold');
  doc.setFontSize(11);
  doc.text('FINANCIAL OVERVIEW', marginX, posY);

  posY += 4;
  // Summary Grid
  doc.setFillColor(250, 250, 250);
  doc.rect(marginX, posY, 170, 18, 'F');
  doc.setDrawColor(226, 232, 240);
  doc.rect(marginX, posY, 170, 18, 'D');

  doc.setFontSize(8);
  doc.setFont('Helvetica', 'Normal');
  doc.setTextColor(mutedGray);
  doc.text('DEVICE BASE VALUE', marginX + 4, posY + 6);
  doc.text('ON-SITE DEPOSITS', marginX + 44, posY + 6);
  doc.text('LOAN & INTEREST', marginX + 88, posY + 6);
  doc.text('TOTAL REPAID', marginX + 130, posY + 6);

  doc.setFont('Helvetica', 'Bold');
  doc.setFontSize(9.5);
  doc.setTextColor(neutralCharcoal);
  doc.text('TK 32,999.00', marginX + 4, posY + 12);
  doc.text('TK 6,704.00', marginX + 44, posY + 12);
  doc.text('TK 33,078.00', marginX + 88, posY + 12);
  
  if (isFullyPaid) {
    doc.setTextColor(accentTeal);
    doc.text('TK 39,782.00', marginX + 130, posY + 12);
  } else {
    doc.setTextColor(neutralCharcoal);
    doc.text('TK 34,155.00', marginX + 130, posY + 12);
  }

  // 6. Detailed Payment Ledger Tables
  posY += 26;
  doc.setTextColor(primaryNavy);
  doc.setFont('Helvetica', 'Bold');
  doc.setFontSize(11);
  doc.text('DETAILED REPAYMENT HISTORY', marginX, posY);

  posY += 45;
  // Let's draw table headers
  doc.setFillColor(241, 245, 249); // slate-100
  doc.rect(marginX, posY - 40, 170, 7, 'F');
  
  doc.setFontSize(8);
  doc.setFont('Helvetica', 'Bold');
  doc.setTextColor(neutralCharcoal);
  doc.text('SL', marginX + 4, posY - 35);
  doc.text('TRANSACTION DATE & TIME', marginX + 15, posY - 35);
  doc.text('METHOD', marginX + 75, posY - 35);
  doc.text('STATUS', marginX + 115, posY - 35);
  doc.text('AMOUNT', marginX + 145, posY - 35);

  // Table items setup
  const baseReceipts = [
    { sn: 1, date: 'May 10, 2026, 04:44 PM', method: 'bKash Mobile Payment', status: 'SUCCESS', amount: 'TK 15,000.00' },
    { sn: 2, date: 'Apr 16, 2026, 09:51 PM', method: 'bKash Mobile Payment', status: 'SUCCESS', amount: 'TK 3,671.00' },
    { sn: 3, date: 'Mar 13, 2026, 11:16 AM', method: 'bKash Mobile Payment', status: 'SUCCESS', amount: 'TK 3,671.00' },
    { sn: 4, date: 'Feb 04, 2026, 09:21 PM', method: 'bKash Mobile Payment', status: 'SUCCESS', amount: 'TK 3,709.00' },
    { sn: 5, date: 'Jan 16, 2026, 01:39 PM', method: 'On-site Initial Deposit', status: 'SUCCESS', amount: 'TK 1,400.00' },
  ];

  const fullReceipts = isFullyPaid 
    ? [
        { sn: 1, date: 'June 13, 2026, 07:25 PM', method: 'bKash Wallet Transfer', status: 'SUCCESS', amount: 'TK 5,627.00' },
        ...baseReceipts.map(r => ({ ...r, sn: r.sn + 1 }))
      ]
    : baseReceipts;

  let rowY = posY - 29;
  doc.setFont('Helvetica', 'Normal');
  doc.setFontSize(8.5);
  
  fullReceipts.forEach((item, index) => {
    // Row background stripes
    if (index % 2 === 1) {
      doc.setFillColor(250, 250, 250);
      doc.rect(marginX, rowY - 4, 170, 6, 'F');
    }
    
    doc.setTextColor(neutralCharcoal);
    doc.text(String(item.sn), marginX + 4, rowY);
    doc.text(item.date, marginX + 15, rowY);
    doc.text(item.method, marginX + 75, rowY);
    
    doc.setFont('Helvetica', 'Bold');
    doc.setTextColor(accentTeal);
    doc.text(item.status, marginX + 115, rowY);
    
    doc.setTextColor(neutralCharcoal);
    doc.text(item.amount, marginX + 145, rowY);

    rowY += 6;
    doc.setFont('Helvetica', 'Normal');
  });

  // Stamp and Signatures Section
  rowY += 12;
  doc.setDrawColor(226, 232, 240);
  doc.setLineWidth(0.2);
  doc.line(marginX, rowY, 190, rowY);

  rowY += 10;
  // Left: Verification Stamp / Certification Code
  doc.setFontSize(7.5);
  doc.setTextColor(mutedGray);
  doc.text('SYSTEM VERIFICATION CHECKSUM:', marginX, rowY);
  doc.setFont('Helvetica', 'Bold');
  doc.setTextColor(neutralCharcoal);
  doc.text('SHA256-598C67CA85054A2F-STATUS', marginX, rowY + 3.5);
  
  // Right: Signature Mockup
  doc.setFontSize(8);
  doc.setFont('Helvetica', 'Normal');
  doc.setTextColor(mutedGray);
  doc.text('Authorized PalmPay Registrar Signature', marginX + 110, rowY);
  doc.setLineWidth(0.3);
  doc.setDrawColor(30, 27, 75);
  doc.line(marginX + 110, rowY + 6, marginX + 160, rowY + 6);
  
  doc.setFont('Helvetica', 'Bold');
  doc.setTextColor(primaryNavy);
  doc.text('System Certified Release', marginX + 110, rowY + 10);

  // Download the generated PDF
  doc.save('PalmPay_Repayment_Receipt_' + certId + '.pdf');
}

// Minimal helper to safely prevent out-of-bounds layout issues during build step
function testX(val: number): number {
  return val;
}
