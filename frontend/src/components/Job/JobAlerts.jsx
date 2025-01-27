import React, { useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { Card, CardHeader, CardTitle, CardContent } from "../ui/card";

const JobAlerts = ({ jobId, jobTitle }) => {
  const [emails, setEmails] = useState("");
  const [sending, setSending] = useState(false);

  const handleSendAlerts = async (e) => {
    e.preventDefault();

    // Convert comma-separated emails to array and trim whitespace
    const candidateEmails = emails.split(",").map((email) => email.trim());

    // Basic validation
    if (candidateEmails.length === 0) {
      toast.error("Please enter at least one email address");
      return;
    }

    setSending(true);
    try {
      const response = await axios.post(
        "http://localhost:4000/api/v1/email/send-job-alerts",
        {
          jobId,
          candidateEmails,
        },
        {
          withCredentials: true,
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      toast.success(response.data.message || "Job alerts sent successfully!");
      setEmails(""); // Clear input after successful send
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to send job alerts");
    } finally {
      setSending(false);
    }
  };

  return (
    <Card className="w-full max-w-md mx-auto">
      <CardHeader>
        <CardTitle>Send Job Alerts</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSendAlerts} className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-1">
              Job Title: <span className="font-normal">{jobTitle}</span>
            </label>
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">
              Candidate Emails
              <span className="text-xs text-gray-500 ml-1">
                (comma-separated)
              </span>
            </label>
            <textarea
              className="w-full min-h-24 p-2 border rounded-md"
              value={emails}
              onChange={(e) => setEmails(e.target.value)}
              placeholder="candidate1@example.com, candidate2@example.com"
              disabled={sending}
            />
          </div>
          <button
            type="submit"
            className={`w-full py-2 px-4 rounded-md bg-blue-600 text-white hover:bg-blue-700 
              ${sending ? "opacity-50 cursor-not-allowed" : ""}`}
            disabled={sending}
          >
            {sending ? "Sending..." : "Send Job Alerts"}
          </button>
        </form>
      </CardContent>
    </Card>
  );
};

export default JobAlerts;
