'use strict';
import mail from 'nodemailer';
import smtpTransport from 'nodemailer-smtp-transport';

class EmailController {

  // Make it load as backgroup service emit socket action to load
  static sendEmail(data) {
    // Send email    
    const transporter = mail.createTransport(smtpTransport({
      host: 'XRDCWPMSGEGS01.hca.corpad.net',
      port: 25
    }));

    transporter.verify(function(error, success) {
      if (error) {
            console.log(error);
      } else {
            console.log('Server is ready to take our messages');
      }
    });

    transporter.sendMail({
      from: 'no-reply@hcahealthcare.com',
      to: data.contactEmail,
      subject: data.appName + ' (' + data.env + ' ' + data.healthStatus + ')',
      html: 'Hi Team, <br /><h2>Application Monitoring</h2> <p>Application name: ' + data.displayName + '<br />Health Status: ' + data.healthStatus + '<br />Environment: ' + data.env + '<br /></p>'
    }).catch(function(error) {
      console.log("Email error " + error);
    });
  }
}

export default EmailController;