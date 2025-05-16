import nodemailer from 'nodemailer';

import adminCreationMailTemplate from './admin_creation_template.js';
import staffCreationMailTemplate from './staff_creation_template.js';
import petitionUpdateTemplate from './petition_update_template.js';
import petitionAssignedStaffTemplate from './petition_assigned_staff.js';

export async function sendMail (email, data, template) {

    let mailHTML = null;
    let subject = "";

    switch (template) {
        case 'adminCreation':
            mailHTML = adminCreationMailTemplate(data.departmentName, data.password);
            subject = "Admin Account Created";
            break;
        case 'staffCreation':
            mailHTML = staffCreationMailTemplate(data.departmentName, data.password);
            subject = "Staff Account Created";
            break;
        case 'petitionUpdate':
            mailHTML = petitionUpdateTemplate(data.title, data.status, data.id);
            subject = "Petition Status Update";
            break;
        case 'petitionAssignedStaff':
            mailHTML = petitionAssignedStaffTemplate(data.id, data.title);
            subject = "Petition Assigned to You";
            break;
        default:
            throw new Error('Invalid template type');
    }



    // Create a transporter using SMTP (example with Gmail)
    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: process.env.MAIL_ID, // Your email address
            pass: process.env.MAIL_APP_PASSWORD // Use App Passwords if using Gmail
        }
    });


    // Define the email options
    const mailOptions = {
        from: process.env.MAIL_ID,
        to: email,
        subject,
        html: mailHTML,
        name: 'Petition Management System',
    };

    // Send the email
    transporter.sendMail(mailOptions, async (error, info) => {
        if (error) {
            console.error('Error sending email:', error);
        } else {
            console.log('Email sent:', info.response);
        }
    });

}
