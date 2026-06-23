import logging
from app.core import config

logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

def send_contact_email(name: str, email: str, subject: str, message: str) -> bool:
    """
    Sends an email notification for a new contact form submission using Resend API.
    Falls back to logging the contact info if Resend API key is not configured.
    """
    logger.info(f"Received contact submission from {name} ({email}) - Subject: {subject}")
    
    # Check if we have valid Resend API key
    if not config.RESEND_API_KEY:
        logger.warning("RESEND_API_KEY is not configured. Logging message locally instead of sending email.")
        logger.info(f"--- Contact Form Message ---\nName: {name}\nEmail: {email}\nSubject: {subject}\nMessage: {message}\n----------------------------")
        return True

    try:
        import resend
        
        resend.api_key = config.RESEND_API_KEY
        
        params = {
            "from": "Portfolio Contact <onboarding@resend.dev>",
            "to": [config.RECIPIENT_EMAIL],
            "subject": f"Portfolio Contact: {subject}",
            "html": f"""
            <html>
            <body style="font-family: Arial, sans-serif; line-height: 1.6; color: #333;">
                <h2 style="color: #6366f1;">New Contact Form Submission</h2>
                <p>You have received a new message from your portfolio contact form:</p>
                <table style="border-collapse: collapse; width: 100%; max-width: 600px;">
                    <tr style="background-color: #f8f9fa;">
                        <td style="padding: 12px; border: 1px solid #dee2e6; font-weight: bold;">Name:</td>
                        <td style="padding: 12px; border: 1px solid #dee2e6;">{name}</td>
                    </tr>
                    <tr>
                        <td style="padding: 12px; border: 1px solid #dee2e6; font-weight: bold;">Email:</td>
                        <td style="padding: 12px; border: 1px solid #dee2e6;"><a href="mailto:{email}">{email}</a></td>
                    </tr>
                    <tr style="background-color: #f8f9fa;">
                        <td style="padding: 12px; border: 1px solid #dee2e6; font-weight: bold;">Subject:</td>
                        <td style="padding: 12px; border: 1px solid #dee2e6;">{subject}</td>
                    </tr>
                </table>
                <h3 style="margin-top: 20px; color: #6366f1;">Message:</h3>
                <p style="background-color: #f8f9fa; padding: 15px; border-left: 4px solid #6366f1; margin: 10px 0;">{message}</p>
                <p style="margin-top: 30px; color: #666; font-size: 12px;">This message was sent from your portfolio contact form.</p>
            </body>
            </html>
            """
        }
        
        r = resend.Emails.send(params)
        logger.info(f"Notification email sent successfully via Resend. ID: {r['id']}")
        return True
    except Exception as e:
        logger.error(f"Failed to send email notification via Resend: {str(e)}")
        # We return True because we still want the contact form to submit successfully from the user's perspective, 
        # even if email delivery fails.
        return False
