const adminCreationMailTemplate = (departmentName, password) => `<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
<head>
  <meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />
  <title>Department Admin Confirmation</title>
</head>
<body style="margin: 0; padding: 0; font-family: Arial, Helvetica, sans-serif; background-color: #f5f5f5;">
  <table border="0" cellpadding="0" cellspacing="0" width="100%" style="max-width: 600px; margin: 20px auto; background-color: #ffffff; border-radius: 8px; overflow: hidden; box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);">
    <!-- Header -->
    <tr>
      <td style="padding: 30px 20px; text-align: center; background-color: #4a6fdc; background-image: linear-gradient(to right, #4a6fdc, #3b5cb8); color: #ffffff; border-bottom: 1px solid #e0e0e0;">
        <table border="0" cellpadding="0" cellspacing="0" width="100%">
          <tr>
            <td style="text-align: center;">
              <h1 style="margin: 0; font-size: 28px; font-weight: bold; letter-spacing: 1px; color: #ffffff;">Department Admin Confirmation</h1>
            </td>
          </tr>
        </table>
      </td>
    </tr>
    
    <!-- Content -->
    <tr>
      <td style="padding: 40px 30px;">
        <table border="0" cellpadding="0" cellspacing="0" width="100%">
          <!-- Welcome Message -->
          <tr>
            <td style="padding-bottom: 30px; color: #333333; font-size: 16px; line-height: 24px; text-align: center;">
              <p style="margin: 0; font-size: 18px;">You have been added as an Admin of ${departmentName} Department</p>
            </td>
          </tr>
          
          <!-- Password Box -->
          <tr>
            <td style="padding-bottom: 30px;">
              <table border="0" cellpadding="0" cellspacing="0" width="100%" style="border: 1px solid #e0e0e0; border-radius: 6px; overflow: hidden; background-color: #ffffff;">
                <tr>
                  <td style="padding: 15px; background-color: #f2f6ff; font-weight: bold; color: #333333; text-align: center; border-bottom: 1px solid #e0e0e0;" colspan="2">
                    YOUR LOGIN CREDENTIALS
                  </td>
                </tr>
                <tr>
                  <td style="padding: 15px; font-weight: bold; width: 120px; color: #555555; border-right: 1px solid #e0e0e0;">Password:</td>
                  <td style="padding: 15px; color: #333333; font-family: 'Courier New', monospace; font-size: 16px; letter-spacing: 1px; background-color: #f9f9f9;">${password}</td>
                </tr>
              </table>
            </td>
          </tr>
          
          <!-- Login Instructions -->
          <tr>
            <td style="padding: 20px; background-color: #f2f6ff; border-left: 4px solid #4a6fdc; color: #333333; font-size: 16px; line-height: 24px; margin-bottom: 30px; border-radius: 0 4px 4px 0;">
              <p style="margin: 0;">Use this same email to login to your account.</p>
            </td>
          </tr>
          
          <!-- Divider -->
          <tr>
            <td style="padding: 20px 0;">
              <table border="0" cellpadding="0" cellspacing="0" width="100%">
                <tr>
                  <td style="border-bottom: 1px solid #e0e0e0;"></td>
                </tr>
              </table>
            </td>
          </tr>
          
          <!-- Footer Note -->
          <tr>
            <td style="color: #777777; font-size: 14px; text-align: center; font-style: italic;">
              <p style="margin: 0;">This is an automated message, please do not reply.</p>
            </td>
          </tr>
        </table>
      </td>
    </tr>
    
    <!-- Footer -->
    <tr>
      <td style="padding: 20px; text-align: center; background-color: #f5f7fa; color: #555555; font-size: 12px; border-top: 1px solid #e0e0e0;">
        <p style="margin: 0;">&copy; 2025 Petition System. All rights reserved.</p>
      </td>
    </tr>
  </table>
</body>
</html>`

export default adminCreationMailTemplate;
