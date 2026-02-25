import PDFDocument from 'pdfkit';
import fs from 'fs';
import path from 'path';

/**
 * Generate invoice PDF for an order
 * @param {Object} order - Order object
 * @param {string} outputPath - Path to save PDF
 */
export const generateInvoicePDF = (order, outputPath) => {
  return new Promise((resolve, reject) => {
    try {
      const doc = new PDFDocument({ margin: 50 });
      const writeStream = fs.createWriteStream(outputPath);

      doc.pipe(writeStream);

      // Header
      doc
        .fontSize(20)
        .text('SACHIN MEDICAL', 50, 50)
        .fontSize(10)
        .text('123 Main Street, Mumbai, Maharashtra - 400001', 50, 75)
        .text('Phone: +91 98765 43210 | Email: info@sachinmedical.com', 50, 90)
        .text('GSTIN: 27XXXXX1234X1ZX', 50, 105);

      // Invoice title
      doc
        .fontSize(20)
        .text('TAX INVOICE', 400, 50);

      // Invoice details
      doc
        .fontSize(10)
        .text(`Invoice No: ${order.orderNumber}`, 400, 75)
        .text(`Date: ${new Date(order.createdAt).toLocaleDateString('en-IN')}`, 400, 90);

      // Line
      doc
        .moveTo(50, 130)
        .lineTo(550, 130)
        .stroke();

      // Billing details
      doc
        .fontSize(12)
        .text('Bill To:', 50, 150)
        .fontSize(10)
        .text(order.shippingAddress.name, 50, 170)
        .text(order.shippingAddress.street, 50, 185)
        .text(`${order.shippingAddress.city}, ${order.shippingAddress.state}`, 50, 200)
        .text(`Pincode: ${order.shippingAddress.pincode}`, 50, 215)
        .text(`Phone: ${order.shippingAddress.phone}`, 50, 230);

      // Table header
      const tableTop = 270;
      doc
        .fontSize(10)
        .text('Item', 50, tableTop)
        .text('Qty', 300, tableTop)
        .text('Price', 350, tableTop)
        .text('GST', 420, tableTop)
        .text('Total', 480, tableTop);

      doc
        .moveTo(50, tableTop + 15)
        .lineTo(550, tableTop + 15)
        .stroke();

      // Table rows
      let yPosition = tableTop + 25;
      order.items.forEach((item, index) => {
        const itemTotal = item.price * item.quantity;
        const gstAmount = item.gst * item.quantity;

        doc
          .fontSize(9)
          .text(item.name, 50, yPosition, { width: 240 })
          .text(item.quantity.toString(), 300, yPosition)
          .text(`₹${item.price.toFixed(2)}`, 350, yPosition)
          .text(`₹${gstAmount.toFixed(2)}`, 420, yPosition)
          .text(`₹${itemTotal.toFixed(2)}`, 480, yPosition);

        yPosition += 20;
      });

      // Summary
      yPosition += 20;
      doc
        .moveTo(50, yPosition)
        .lineTo(550, yPosition)
        .stroke();

      yPosition += 15;
      doc
        .fontSize(10)
        .text('Subtotal:', 350, yPosition)
        .text(`₹${order.pricing.itemsTotal.toFixed(2)}`, 480, yPosition);

      yPosition += 20;
      doc
        .text('GST:', 350, yPosition)
        .text(`₹${order.pricing.gstTotal.toFixed(2)}`, 480, yPosition);

      yPosition += 20;
      doc
        .text('Delivery Charge:', 350, yPosition)
        .text(`₹${order.pricing.deliveryCharge.toFixed(2)}`, 480, yPosition);

      if (order.pricing.discount > 0) {
        yPosition += 20;
        doc
          .text('Discount:', 350, yPosition)
          .text(`-₹${order.pricing.discount.toFixed(2)}`, 480, yPosition);
      }

      yPosition += 20;
      doc
        .fontSize(12)
        .text('Grand Total:', 350, yPosition)
        .text(`₹${order.pricing.totalAmount.toFixed(2)}`, 480, yPosition);

      // Payment info
      yPosition += 40;
      doc
        .fontSize(10)
        .text(`Payment Method: ${order.payment.method.toUpperCase()}`, 50, yPosition)
        .text(`Payment Status: ${order.payment.status.toUpperCase()}`, 50, yPosition + 15);

      // Footer
      doc
        .fontSize(8)
        .text('This is a computer-generated invoice and does not require a signature.', 50, 720, {
          align: 'center'
        })
        .text('Thank you for shopping with Sachin Medical!', 50, 735, {
          align: 'center'
        });

      doc.end();

      writeStream.on('finish', () => {
        resolve(outputPath);
      });

      writeStream.on('error', (error) => {
        reject(error);
      });

    } catch (error) {
      reject(error);
    }
  });
};
