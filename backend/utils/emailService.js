import nodemailer from 'nodemailer';

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASSWORD
  }
});

export const sendJobAlert = async (candidates, jobDetails, senderInfo) => {
  const emailPromises = candidates.map(candidate => {
    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: candidate.email,
      subject: `New Job Alert: ${jobDetails.title}`,
      html: `
        <h2>New Job Opportunity</h2>
        <h3>${jobDetails.title}</h3>
        
        <h4>Job Details:</h4>
        <p><strong>Company:</strong> ${senderInfo.name}</p>
        <p><strong>Location:</strong> ${jobDetails.location}</p>
        <p><strong>Category:</strong> ${jobDetails.category}</p>
        <p><strong>Salary:</strong> ${jobDetails.fixedSalary ? 
          `$${jobDetails.fixedSalary}` : 
          `$${jobDetails.salaryFrom} - $${jobDetails.salaryTo}`}</p>
        
        <h4>Description:</h4>
        <p>${jobDetails.description}</p>
        
        <h4>Contact Information:</h4>
        <p>Email: ${senderInfo.email}</p>
        <p>Phone: ${senderInfo.phone}</p>
        
        <p>Best regards,<br>${senderInfo.name}</p>
      `
    };

    return transporter.sendMail(mailOptions);
  });

  return Promise.all(emailPromises);
};