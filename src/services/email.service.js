import nodemailer from 'nodemailer';

const isPlaceholder = (value) => !value || value.startsWith('your_');

export const isEmailConfigured = () => (
  !isPlaceholder(process.env.EMAIL_SERVICE) &&
  !isPlaceholder(process.env.EMAIL_USER) &&
  !isPlaceholder(process.env.EMAIL_PASSWORD)
);

export const sendVolunteerNotification = async (volunteer) => {
  if (!isEmailConfigured()) {
    console.warn('Volunteer email notification skipped: EMAIL_SERVICE, EMAIL_USER, or EMAIL_PASSWORD is missing.');
    return { skipped: true };
  }

  const transporter = nodemailer.createTransport({
    service: process.env.EMAIL_SERVICE,
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASSWORD
    }
  });

  await transporter.sendMail({
    from: process.env.EMAIL_USER,
    to: process.env.EMAIL_TO || process.env.EMAIL_USER,
    subject: 'New volunteer registration',
    text: [
      `Name: ${volunteer.name}`,
      `Email: ${volunteer.email}`,
      `Phone: ${volunteer.phone}`,
      `Interest: ${volunteer.interest.join(', ')}`,
      `Availability: ${volunteer.availability}`,
      `Message: ${volunteer.message || '-'}`
    ].join('\n')
  });

  return { skipped: false };
};
