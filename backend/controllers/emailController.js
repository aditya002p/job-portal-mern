import { catchAsyncErrors } from "../middlewares/catchAsyncError.js";
import ErrorHandler from "../middlewares/error.js";
import { User } from "../models/userSchema.js";
import { Job } from "../models/jobSchema.js";
import { sendJobAlert } from "../utils/emailService.js";

export const sendJobAlerts = catchAsyncErrors(async (req, res, next) => {
  const { role } = req.user;
  if (role !== "Employer") {
    return next(
      new ErrorHandler("Only employers can send job alerts.", 400)
    );
  }

  const { jobId, candidateEmails } = req.body;

  // Validate input
  if (!jobId || !candidateEmails || !Array.isArray(candidateEmails)) {
    return next(
      new ErrorHandler("Please provide job ID and array of candidate emails.", 400)
    );
  }

  // Get job details
  const job = await Job.findById(jobId);
  if (!job) {
    return next(new ErrorHandler("Job not found.", 404));
  }

  // Verify employer owns this job
  if (job.postedBy.toString() !== req.user._id.toString()) {
    return next(
      new ErrorHandler("You can only send alerts for your own job postings.", 403)
    );
  }

  // Get sender (employer) information
  const sender = await User.findById(req.user._id);

  try {
    await sendJobAlert(
      candidateEmails.map(email => ({ email })),
      job,
      {
        name: sender.name,
        email: sender.email,
        phone: sender.phone
      }
    );

    res.status(200).json({
      success: true,
      message: "Job alerts sent successfully!",
      recipientCount: candidateEmails.length
    });
  } catch (error) {
    return next(
      new ErrorHandler("Failed to send job alerts. Please try again.", 500)
    );
  }
});